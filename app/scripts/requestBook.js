const BASE_URL = chrome.runtime.getManifest().homepage_url;

function requestEbook(sections) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${BASE_URL}/api/books`,
            method: 'POST',
            data: JSON.stringify({ sections }),
            contentType: 'application/json',
        }).done((response) => {
            console.log(response);
            resolve(response.id);
        }).fail((xhr, err) => {
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

            if (params.email && params.email.length > 0) {
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
            requestEbook(request.sections).then((id) =>
                downloadEbook({ id, filetype: state.filetype, email: state.email })
            ).then(() => {
                chrome.storage.local.set({ downloadState: false });
                chrome.runtime.sendMessage(null, { action: 'download', status: 'complete' });
            }).catch((e) => {
                console.log(`Error: ${e}`);
                chrome.storage.local.set({ downloadState: false });
                chrome.runtime.sendMessage(null, { action: 'download', status: 'failed', error: e });
            });
        });
    }
});
