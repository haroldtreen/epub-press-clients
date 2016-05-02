const Browser = window.Browser;
const EpubPress = window.EpubPress;

Browser.onForegroundMessage((request) => {
    if (request.action === 'download') {
        Browser.setLocalStorage({ downloadState: true });
        Browser.getLocalStorage(['email', 'filetype']).then((state) => {
            EpubPress.requestEbook(request.sections).then((id) =>
                EpubPress.downloadEbook({ id, filetype: state.filetype, email: state.email })
            ).then(() => {
                Browser.setLocalStorage({ downloadState: false });
                Browser.sendMessage(null, { action: 'download', status: 'complete' });
            }).catch((e) => {
                console.log(`Error: ${e}`);
                Browser.setLocalStorage({ downloadState: false });
                Browser.sendMessage(null, { action: 'download', status: 'failed', error: e });
            });
        });
    }
});
