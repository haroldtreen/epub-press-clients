'use strict';

// const BASE_URL = 'http://epub.press';
var BASE_URL = 'http://localhost:3000';

function requestEbook(params) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: BASE_URL + '/api/books',
            method: 'POST',
            data: JSON.stringify(params),
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

function downloadEbook(id, filetype) {
    return new Promise(function (resolve) {
        if (id) {
            var queryString = $.param({ id: id, filetype: filetype });
            chrome.downloads.download({ url: BASE_URL + '/api/books/download?' + queryString }, function () {
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
        chrome.storage.local.get(['email', 'filetype'], function (state) {
            requestEbook({
                urls: request.urls,
                filetype: state.filetype,
                email: state.email
            }).then(function (id) {
                downloadEbook(id, state.filetype);
            }).then(function () {
                chrome.storage.local.set({ downloadState: false });
                chrome.runtime.sendMessage(null, { action: 'download', status: 'complete' });
            }).catch(function (e) {
                chrome.storage.local.set({ downloadState: false });
                chrome.runtime.sendMessage(null, { action: 'download', status: 'failed', error: e });
            });
        });
    }
});