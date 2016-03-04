'use strict';

var getCurrentWindowTabs = function getCurrentWindowTabs() {
    var djs = 'd';
    return new Promise(function (resolve, reject) {
        chrome.windows.getCurrent(function (currentWindow) {
            chrome.tabs.getAllInWindow(currentWindow.id, function (tabs) {
                if (tabs) {
                    resolve(tabs);
                } else {
                    reject('No tabs!');
                }
            });
        });
    });
};

var SECTIONS_SELECTORS = ['#downloadForm', '#downloadSpinner', '#downloadSuccess', '#downloadFailed'];

function showSection(section) {
    SECTIONS_SELECTORS.forEach(function (selector) {
        if (selector === section) {
            $(selector).show();
        } else {
            $(selector).hide();
        }
    });
}

function getCheckbox(title, url) {
    var html = '<div class="checkbox">\n                  <label>\n                  <input class=\'article-checkbox\' type="checkbox" value="' + url + '">' + title + '\n                  </label>\n                  </div>';
    return html;
};

function isBackgroundMsg(sender) {
    return sender.url.indexOf('background_page') > -1;
}

$('#select-all').click(function () {
    $('input.article-checkbox').each(function (index, checkbox) {
        $(checkbox).prop('checked', true);
    });
});

$('#select-none').click(function () {
    $('input.article-checkbox').each(function (index, checkbox) {
        $(checkbox).prop('checked', false);
    });
});

$('#download').click(function () {
    var selectedUrls = [];
    $('input.article-checkbox').each(function (index, checkbox) {
        if ($(checkbox).prop('checked')) {
            selectedUrls.push($(checkbox).prop('value'));
        }
    });

    if (selectedUrls.length <= 0) {
        alert('No articles selected!');
    } else {
        showSection('#downloadSpinner');
        chrome.runtime.sendMessage(null, { action: 'download', urls: selectedUrls });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender) {
    console.log(sender);
    if (request.action === 'download' && isBackgroundMsg(sender)) {
        if (request.status === 'complete') {
            showSection('#downloadSuccess');
        } else {
            showSection('#downloadFailed');
        }
    }
});

window.onload = function () {
    chrome.storage.local.get('downloadState', function (state) {
        if (state.downloadState) {
            showSection('#downloadSpinner');
        } else {
            showSection('#downloadForm');

            getCurrentWindowTabs().then(function (tabs) {
                tabs.filter(function (tab) {
                    return tab.url.indexOf('http') > -1;
                }).forEach(function (tab) {
                    $('#tab-list').append(getCheckbox(tab.title, tab.url));
                });
            });
        }
    });
};