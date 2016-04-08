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

function getCheckbox(props) {
    const html = `<div class="checkbox">
                    <label>
                        <input class='article-checkbox' type="checkbox" value="${props.url}" name="${props.id}">
                        <span>${props.title}</span>
                    </label>
                  </div>`;
    return html;
}

function getTabsHtml(tabs) {
    const code = 'document.documentElement.outerHTML';
    const htmlPromises = tabs.map((tab) =>
        new Promise((resolve) => {
            chrome.tabs.executeScript(tab.id, { code }, (html) => {
                const updatedTab = tab;
                if (html[0] && html[0].match(/html/i)) {
                    updatedTab.html = html[0];
                } else {
                    updatedTab.html = null;
                }
                resolve(updatedTab);
            });
        })
    );

    return Promise.all(htmlPromises);
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
    const selectedItems = [];
    $('input.article-checkbox').each((index, checkbox) => {
        if ($(checkbox).prop('checked')) {
            selectedItems.push({
                url: $(checkbox).prop('value'),
                id: Number($(checkbox).prop('name'))
            });
        }
    });


    if (selectedItems.length <= 0) {
        alert('No articles selected!');
    } else {
        getTabsHtml(selectedItems).then((sections) => {
            showSection('#downloadSpinner');
            chrome.runtime.sendMessage(null, { action: 'download', sections });
        })
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
        chrome.windows.getCurrent({ populate: true }, (currentWindow) => {
            if (currentWindow.tabs) {
                const websiteTabs = currentWindow.tabs.filter((tab) => tab.url.indexOf('http') > -1);
                resolve(websiteTabs);
            } else {
                reject('No tabs!');
            }
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
                tabs.forEach((tab) => {
                    $('#tab-list').append(getCheckbox({
                        title: tab.title,
                        url: tab.url,
                        id: tab.id,
                    }));
                });
            });
        }
    });
};
