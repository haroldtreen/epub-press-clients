import EpubPress from 'epub-press-js';
import Browser from './browser';

const manifest = Browser.getManifest();
const defaultBase = EpubPress.BASE_URL;

['BASE_URL', 'PUBLISH_URL', 'DOWNLOAD_URL', 'VERSION_URL'].forEach((url) => {
    EpubPress[url] = EpubPress[url] && EpubPress[url].replace(defaultBase, manifest.homepage_url);
});

Browser.onForegroundMessage((request) => {
    if (request.action === 'download') {
        Browser.setLocalStorage({ downloadState: true });
        Browser.getLocalStorage(['email', 'filetype']).then((state) => {
            const book = new EpubPress(Object.assign({}, request.book));
            book
            .publish()
            .then(() => { // eslint-disable-line
                const email = state.email && state.email.trim();
                const filetype = state.filetype;
                return email ? book.emailDelivery(email, filetype) : book.download(filetype);
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
