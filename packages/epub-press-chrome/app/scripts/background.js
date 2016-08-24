import EpubPress from 'epub-press-js';
import Browser from './browser';

const defaultBase = EpubPress.BASE_URL;

// ['BASE_URL', 'PUBLISH_URL', 'DOWNLOAD_URL', 'VERSION_URL'].forEach((url) => {
//     EpubPress[url] = EpubPress[url] && EpubPress[url].replace(defaultBase, 'http://localhost:3000');
// });

Browser.onForegroundMessage((request) => {
    if (request.action === 'download') {
        Browser.setLocalStorage({ downloadState: true });
        Browser.getLocalStorage(['email', 'filetype']).then((state) => {
            const book = new EpubPress(Object.assign({}, request.book, {
                email: state.email,
                filetype: state.filetype,
            }));
            book
            .publish()
            .then(() => { // eslint-disable-line
                return book.download();
            })
            .then(() => {
                Browser.setLocalStorage({ downloadState: false });
                Browser.sendMessage(null, { action: 'download', status: 'complete' });
            })
            .catch((e) => {
                Browser.setLocalStorage({ downloadState: false });
                Browser.sendMessage(
                    null,
                    { action: 'download', status: 'failed', error: e.message }
                );
            });
        });
    }
});
