import EpubPress from 'epub-press-js';
import Browser from './browser';

const manifest = Browser.getManifest();

EpubPress.BASE_API = `${manifest.homepage_url}/api/v1`;

Browser.onForegroundMessage((request) => {
    if (request.action === 'download') {
        Browser.setLocalStorage({ downloadState: true, publishStatus: '{}' });
        Browser.getLocalStorage(['email', 'filetype']).then((state) => {
            const book = new EpubPress(Object.assign({}, request.book));
            book.on('statusUpdate', (status) => {
                Browser.setLocalStorage({ publishStatus: JSON.stringify(status) });
                Browser.sendMessage({
                    action: 'publish',
                    progress: status.progress,
                    message: status.message,
                });
            });
            book.publish()
                .then(() => { // eslint-disable-line
                    const email = state.email && state.email.trim();
                    const filetype = state.filetype;
                    return email ? book.email(email, filetype) : Browser.download({
                        filename: `${book.getTitle()}.${filetype || book.getFiletype()}`,
                        url: book.getDownloadUrl(filetype),
                    });
                })
                .then(() => {
                    Browser.setLocalStorage({ downloadState: false, publishStatus: '{}' });
                    Browser.sendMessage({ action: 'download', status: 'complete' });
                })
                .catch((e) => {
                    Browser.setLocalStorage({ downloadState: false, publishStatus: '{}' });
                    Browser.sendMessage({ action: 'download', status: 'failed', error: e.message });
                });
        });
    }
});
