(function (global) {
    const Browser = global.Browser;
    const EpubPress = global.EpubPress;

    Browser.onForegroundMessage((request) => {
        if (request.action === 'download') {
            Browser.setLocalStorage({ downloadState: true });
            Browser.getLocalStorage(['email', 'filetype']).then((state) => {
                EpubPress.requestEbook(request.book).then((id) => { // eslint-disable-line
                    return EpubPress.downloadEbook({
                        id,
                        filetype: state.filetype,
                        email: state.email,
                    });
                }).then(() => {
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
}(window));
