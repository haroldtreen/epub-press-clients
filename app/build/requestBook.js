'use strict';

function requestEbook(urls) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: 'http://epub.press/api/books',
            method: 'POST',
            data: JSON.stringify({ urls: urls }),
            contentType: 'application/json'
        }).done(function (response) {
            console.log(response);
            resolve(response.id);
        }).fail(function (err) {
            console.log(err);
            reject(err);
        }).always(function (xhr, status, err) {
            console.log(status);
            console.log(err);
        });
    });
}

function downloadEbook(id) {
    return new Promise(function (resolve) {
        if (id) {
            chrome.downloads.download({ url: 'http://epub.press/api/books/download?id=' + id }, function () {
                return resolve();
            });
        }
    });
}

function isPopupMsg(sender) {
    return sender.url.indexOf('popup') > -1;
}

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === 'download' && isPopupMsg(sender)) {
        chrome.storage.local.set({ downloadState: true });
        requestEbook(request.urls).then(function (id) {
            downloadEbook(id);
        }).then(function () {
            chrome.storage.local.set({ downloadState: false });
            chrome.runtime.sendMessage(null, { action: 'download', status: 'complete' });
        }).catch(function (e) {
            chrome.storage.local.set({ downloadState: false });
            chrome.runtime.sendMessage(null, { action: 'download', status: 'failed', error: e });
        });
    }
});