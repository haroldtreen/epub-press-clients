import EpubPress from 'epub-press-js';
import Browser from './browser';

const manifest = Browser.getManifest();
const DOWNLOAD_TIMEOUT = 300000; // 30 second timeout for downloads

EpubPress.BASE_API = `${manifest.homepage_url}api/v1`;

function timeoutDownload() {
    Browser.setLocalStorage({ downloadState: false, publishStatus: '{}' });
    Browser.sendMessage({
        action: 'download',
        status: 'failed',
        error: 'Download timed out',
    });
}

Browser.onForegroundMessage((request) => {
    if (request.action === 'download') {
        Browser.setLocalStorage({ downloadState: true, publishStatus: '{}' });
        const timeout = setTimeout(timeoutDownload, DOWNLOAD_TIMEOUT);

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
                .then(() => {
                    const email = state.email && state.email.trim();
                    const { filetype } = state;
                    return email
                        ? book.email(email, filetype)
                        : Browser.download({
                            filename: `${book.getTitle()}.${filetype || book.getFiletype()}`,
                            url: book.getDownloadUrl(filetype),
                        });
                })
                .then(() => {
                    clearTimeout(timeout);
                    Browser.setLocalStorage({ downloadState: false, publishStatus: '{}' });
                    Browser.sendMessage({ action: 'download', status: 'complete' });
                })
                .catch((e) => {
                    clearTimeout(timeout);
                    Browser.setLocalStorage({ downloadState: false, publishStatus: '{}' });
                    Browser.sendMessage({ action: 'download', status: 'failed', error: e.message });
                });
        });
    }
});
