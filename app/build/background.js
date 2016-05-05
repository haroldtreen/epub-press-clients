'use strict';

(function (global) {
    var Browser = global.Browser;
    var EpubPress = global.EpubPress;

    Browser.onForegroundMessage(function (request) {
        if (request.action === 'download') {
            Browser.setLocalStorage({ downloadState: true });
            Browser.getLocalStorage(['email', 'filetype']).then(function (state) {
                EpubPress.requestEbook(request.book).then(function (id) {
                    // eslint-disable-line
                    return EpubPress.downloadEbook({
                        id: id,
                        filetype: state.filetype,
                        email: state.email
                    });
                }).then(function () {
                    Browser.setLocalStorage({ downloadState: false });
                    Browser.sendMessage(null, { action: 'download', status: 'complete' });
                }).catch(function (e) {
                    console.log('Error: ' + e);
                    Browser.setLocalStorage({ downloadState: false });
                    Browser.sendMessage(null, { action: 'download', status: 'failed', error: e });
                });
            });
        }
    });
})(window);