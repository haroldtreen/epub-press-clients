'use strict';

var BASE_URL = 'http://epub.press';
// const BASE_URL = 'http://localhost:3000';

function requestEbook(urls) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: BASE_URL + '/api/books',
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

function downloadEbook(params) {
    return new Promise(function (resolve) {
        if (params.id) {
            var queryString = $.param(params);
            var url = BASE_URL + '/api/books/download?' + queryString;

            if (params.email.length > 0) {
                $.ajax({ url: url }).done(function (response) {
                    console.log(response);
                    resolve();
                });
            } else {
                chrome.downloads.download({ url: url }, function () {
                    return resolve();
                });
            }
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
            requestEbook(request.urls).then(function (id) {
                return downloadEbook({ id: id, filetype: state.filetype, email: state.email });
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