'use strict';

var MANIFEST = chrome.runtime.getManifest();
var BASE_URL = MANIFEST.homepage_url;

/*
    State Management
*/

var SECTIONS_SELECTORS = ['#downloadForm', '#settingsForm', '#downloadSpinner', '#downloadSuccess', '#downloadFailed'];

function showSection(section) {
    SECTIONS_SELECTORS.forEach(function (selector) {
        if (selector === section) {
            $(selector).show();
        } else {
            $(selector).hide();
        }
    });
}

/*
    Download Form
*/

function getCheckbox(title, url) {
    var html = '<div class="checkbox">\n                    <label>\n                        <input class=\'article-checkbox\' type="checkbox" value="' + url + '">\n                        <span>' + title + '</span>\n                    </label>\n                  </div>';
    return html;
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

/*
    Settings Management
*/

function setExistingSettings(cb) {
    chrome.storage.local.get(['email', 'filetype'], function (state) {
        $('#settings-email-text').val(state.email);
        $('#settings-filetype-select').val(state.filetype);
        cb();
    });
}

$('#settings-btn').click(function () {
    setExistingSettings(function () {
        showSection('#settingsForm');
    });
});

$('#settings-save-btn').click(function () {
    chrome.storage.local.set({
        email: $('#settings-email-text').val(),
        filetype: $('#settings-filetype-select').val()
    });
    showSection('#downloadForm');
});

$('#settings-cancel-btn').click(function () {
    showSection('#downloadForm');
});

/*
    Messaging
*/

function isBackgroundMsg(sender) {
    return sender.url.indexOf('background_page') > -1;
}

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

/*
    Startup
*/

function compareVersion(versionData) {
    var apiSupported = Number(versionData.minCompatible.replace('.', ''));
    var currentVersion = Number(MANIFEST.version.replace('.', ''));

    if (apiSupported > currentVersion) {
        if (versionData.message) {
            $('#status-server').text(versionData.message);
        }
    }
}

function checkForUpdates() {
    $.ajax({
        url: BASE_URL + '/api/version',
        contentType: 'application/json'
    }).done(function (versionData) {
        console.log(versionData);
        compareVersion(versionData);
    }).fail(function (xhr, err) {
        console.error('Version Check Failed:');
        console.error(err);
    });
}

function getCurrentWindowTabs() {
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
}

window.onload = function () {
    chrome.storage.local.get('downloadState', function (state) {
        if (state.downloadState) {
            showSection('#downloadSpinner');
        } else {
            checkForUpdates();
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