import EpubPress from 'epub-press-js';
import $ from 'jquery';

import Browser from './browser';
import UI from './ui';

const manifest = Browser.getManifest();

/*
Download Form
*/

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
                id: Number($(checkbox).prop('name')),
            });
        }
    });


    if (selectedItems.length <= 0) {
        $('#alert-message').text('No articles selected!');
    } else {
        Browser.getTabsHtml(selectedItems).then((sections) => {
            UI.showSection('#downloadSpinner');
            Browser.sendMessage({
                action: 'download',
                book: {
                    title: $('#book-title').val() || $('#book-title').attr('placeholder'),
                    author: $('#book-author').val() || 'EpubPress',
                    description: $('#book-description').val() || undefined,
                    sections,
                },
            });
        }).catch((error) => {
            UI.setErrorMessage(`Could not find tab content: ${error}`);
        });
    }
});


/*
Settings Management
*/

function setExistingSettings(cb) {
    Browser.getLocalStorage(['email', 'filetype']).then((state) => {
        $('#settings-email-text').val(state.email);
        $('#settings-filetype-select').val(state.filetype);
        cb();
    }).catch((error) => {
        UI.setErrorMessage(`Could not load settings: ${error}`);
    });
}

$('#settings-btn').click(() => {
    setExistingSettings(() => {
        UI.showSection('#settingsForm');
    });
});

$('#settings-save-btn').click(() => {
    Browser.setLocalStorage({
        email: $('#settings-email-text').val(),
        filetype: $('#settings-filetype-select').val(),
    });
    UI.showSection('#downloadForm');
});

$('#settings-cancel-btn').click(() => {
    UI.showSection('#downloadForm');
});

/*
Messaging
*/

Browser.onBackgroundMessage((request) => {
    if (request.action === 'download') {
        if (request.status === 'complete') {
            UI.updateStatus(100, 'Done!').then(() => {
                UI.showSection('#downloadSuccess');
            });
        } else {
            UI.showSection('#downloadFailed');
            if (request.error) {
                UI.setErrorMessage(request.error);
            }
        }
    } else if (request.action === 'publish') {
        UI.updateStatus(request.progress, request.message);
    }
});

/*
Startup
*/

window.onload = () => {
    UI.initializeUi();
    Browser.getLocalStorage('downloadState').then((state) => {
        if (state.downloadState) {
            Browser.getLocalStorage('publishStatus').then((publishState) => {
                const status = JSON.parse(publishState.publishStatus);
                UI.updateStatus(status.progress, status.message);
                UI.showSection('#downloadSpinner');
            });
        } else {
            EpubPress.checkForUpdates('epub-press-chrome', manifest.version).then((message) => {
                if (message) {
                    UI.setAlertMessage(message);
                }
            });
            UI.showSection('#downloadForm');
            UI.initializeTabList();
        }
        return null;
    });
};
