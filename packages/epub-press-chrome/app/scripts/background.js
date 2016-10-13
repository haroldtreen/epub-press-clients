import EpubPress from 'epub-press-js';
import Browser from './browser';

const manifest = Browser.getManifest();

Browser.onForegroundMessage((request) => {
    if (request.action === 'download') {
        Browser.setLocalStorage({ downloadState: true, publishStatus: '{}' });
        Browser.getLocalStorage(['email', 'filetype']).then((state) => {
            const book = new EpubPress(Object.assign({}, request.book));
            book.on('statusUpdate', (status) => {
                Browser.setLocalStorage({ publishStatus: JSON.stringify(status) });
                Browser.sendMessage(null, {
                    action: 'publish',
                    progress: status.progress,
                    message: status.message,
                });
            });
            book.publish()
                .then(() => { // eslint-disable-line
                    const email = state.email && state.email.trim();
                    const filetype = state.filetype;
                    return email ? book.email(email, filetype) : book.download(filetype);
                })
                .then(() => {
                    Browser.setLocalStorage({ downloadState: false, publishStatus: '{}' });
                    Browser.sendMessage(null, { action: 'download', status: 'complete' });
                })
                .catch((e) => {
                    Browser.setLocalStorage({ downloadState: false, publishStatus: '{}' });
                    Browser.sendMessage(
                        null,
                        { action: 'download', status: 'failed', error: e.message }
                    );
                });
        });
    }
});
