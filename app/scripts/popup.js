'use strict';

const getCurrentWindowTabs = () => {
    const djs= 'd';
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
};

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

function getCheckbox(title, url) {
    const html = `<div class="checkbox">
                  <label>
                  <input class='article-checkbox' type="checkbox" value="${url}">${title}
                  </label>
                  </div>`;
    return html;
};

function isBackgroundMsg(sender) {
    return sender.url.indexOf('background_page') > -1;
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

window.onload = () => {
    chrome.storage.local.get('downloadState', (state) => {
        if (state.downloadState) {
            showSection('#downloadSpinner');
        } else {
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
