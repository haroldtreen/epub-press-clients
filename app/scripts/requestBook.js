// const BASE_URL = 'http://epub.press';
const BASE_URL = 'http://localhost:3000';

function requestEbook(params) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${BASE_URL}/api/books`,
            method: 'POST',
            data: JSON.stringify(params),
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

function downloadEbook(id, filetype) {
    return new Promise((resolve) => {
        if (id) {
            const queryString = $.param({ id, filetype });
            chrome.downloads.download(
                { url: `${BASE_URL}/api/books/download?${queryString}` },
                () => resolve()
            );
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
            requestEbook({
                urls: request.urls,
                filetype: state.filetype,
                email: state.email,
            }).then((id) => {
                downloadEbook(id, state.filetype);
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
