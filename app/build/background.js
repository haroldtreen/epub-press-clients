'use strict';

var Browser = window.Browser;
var EpubPress = window.EpubPress;

Browser.onForegroundMessage(function (request) {
    if (request.action === 'download') {
        Browser.setLocalStorage({ downloadState: true });
        Browser.getLocalStorage(['email', 'filetype']).then(function (state) {
            EpubPress.requestEbook(request.sections).then(function (id) {
                return EpubPress.downloadEbook({ id: id, filetype: state.filetype, email: state.email });
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