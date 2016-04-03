'use strict';

const MANIFEST = chrome.runtime.getManifest();
const BASE_URL = MANIFEST.homepage_url;

/*
    State Management
*/

const SECTIONS_SELECTORS = [
    '#downloadForm',
    '#settingsForm',
    '#downloadSpinner',
    '#downloadSuccess',
    '#downloadFailed',
];

function showSection(section) {
    SECTIONS_SELECTORS.forEach((selector) => {
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
    const html = `<div class="checkbox">
                    <label>
                        <input class='article-checkbox' type="checkbox" value="${url}">
                        <span>${title}</span>
                    </label>
                  </div>`;
    return html;
}

$('#select-all').click(() => {
    $('input.article-checkbox').each((index, checkbox) => {
        $(checkbox).prop('checked', true);
    });
});

$('#select-none').click(() => {
    $('input.article-checkbox').each((index, checkbox) => {
        $(checkbox).prop('checked', false);
    });
});

$('#download').click(() => {
    const selectedUrls = [];
    $('input.article-checkbox').each((index, checkbox) => {
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
    chrome.storage.local.get(['email', 'filetype'], (state) => {
        $('#settings-email-text').val(state.email);
        $('#settings-filetype-select').val(state.filetype);
        cb();
    });
}

$('#settings-btn').click(() => {
    setExistingSettings(() => {
        showSection('#settingsForm');
    });
});

$('#settings-save-btn').click(() => {
    chrome.storage.local.set({
        email: $('#settings-email-text').val(),
        filetype: $('#settings-filetype-select').val(),
    });
    showSection('#downloadForm');
});

$('#settings-cancel-btn').click(() => {
    showSection('#downloadForm');
});

/*
    Messaging
*/

function isBackgroundMsg(sender) {
    return sender.url.indexOf('background_page') > -1;
}

chrome.runtime.onMessage.addListener((request, sender) => {
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
    const apiSupported = Number(versionData.minCompatible.replace('.', ''));
    const currentVersion = Number(MANIFEST.version.replace('.', ''));

    if (apiSupported > currentVersion) {
        if (versionData.message) {
            $('#status-server').text(versionData.message);
        }
    }
}

function checkForUpdates() {
    $.ajax({
        url: `${BASE_URL}/api/version`,
        contentType: 'application/json',
    }).done((versionData) => {
        console.log(versionData);
        compareVersion(versionData);
    }).fail((xhr, err) => {
        console.error('Version Check Failed:');
        console.error(err);
    });
}

function getCurrentWindowTabs() {
    return new Promise((resolve, reject) => {
        chrome.windows.getCurrent((currentWindow) => {
            chrome.tabs.getAllInWindow(currentWindow.id, (tabs) => {
                if (tabs) {
                    resolve(tabs);
                } else {
                    reject('No tabs!');
                }
            });
        });
    });
}

window.onload = () => {
    chrome.storage.local.get('downloadState', (state) => {
        if (state.downloadState) {
            showSection('#downloadSpinner');
        } else {
            checkForUpdates();
            showSection('#downloadForm');
            getCurrentWindowTabs().then((tabs) => {
                tabs.filter((tab) => {
                    return tab.url.indexOf('http') > -1;
                }).forEach((tab) => {
                    $('#tab-list').append(getCheckbox(tab.title, tab.url));
                });
            });
        }
    });
};
