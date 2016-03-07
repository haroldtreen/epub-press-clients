const BASE_URL = 'http://epub.press';
// const BASE_URL = 'http://localhost:3000';

function requestEbook(urls) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${BASE_URL}/api/books`,
            method: 'POST',
            data: JSON.stringify({ urls }),
            contentType: 'application/json',
        }).done((response) => {
            console.log(response);
            resolve(response.id);
        }).fail((err) => {
            console.log(err);
            reject(err);
        }).always((xhr, status, err) => {
            console.log(status);
            console.log(err);
        });
    });
}

function downloadEbook(params) {
    return new Promise((resolve) => {
        if (params.id) {
            const queryString = $.param(params);
            const url = `${BASE_URL}/api/books/download?${queryString}`;

            if (params.email.length > 0) {
                $.ajax({ url }).done((response) => {
                    console.log(response);
                    resolve();
                });
            } else {
                chrome.downloads.download({ url }, () => resolve());
            }
        }
    });
}

function isPopupMsg(sender) {
    return sender.url.indexOf('popup') > -1;
}

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === 'download' && isPopupMsg(sender)) {
        chrome.storage.local.set({ downloadState: true });
        chrome.storage.local.get(['email', 'filetype'], (state) => {
            requestEbook(request.urls).then((id) => {
                return downloadEbook({ id, filetype: state.filetype, email: state.email });
            }).then(() => {
                chrome.storage.local.set({ downloadState: false });
                chrome.runtime.sendMessage(null, { action: 'download', status: 'complete' });
            }).catch((e) => {
                chrome.storage.local.set({ downloadState: false });
                chrome.runtime.sendMessage(null, { action: 'download', status: 'failed', error: e });
            });
        });
    }
});
