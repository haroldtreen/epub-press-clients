import EpubPress from 'epub-press-js';
import $ from 'jquery';

import Browser from './browser';
import UI from './ui';
import { buildTextExport } from './text';

const manifest = Browser.getManifest();
const TEXT_FILENAME = 'epub.txt';

function downloadTextExport(book, sections) {
    const textExport = buildTextExport(book, sections);
    if (!textExport) {
        return Promise.reject(new Error('No text content could be extracted.'));
    }

    const blob = new Blob([textExport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    return Browser.download({
        url,
        filename: TEXT_FILENAME,
        conflictAction: 'overwrite',
        saveAs: false,
    }).then(() => {
        URL.revokeObjectURL(url);
    }).catch((error) => {
        URL.revokeObjectURL(url);
        throw error;
    });
}

function getSelectedItems() {
    const selectedItems = [];
    $('input.article-checkbox').each((index, checkbox) => {
        if ($(checkbox).prop('checked')) {
            selectedItems.push({
                url: $(checkbox).prop('value'),
                id: Number($(checkbox).prop('name')),
                title: $(checkbox).siblings('span').text(),
            });
        }
    });
    return selectedItems;
}

function buildBook(sections) {
    return {
        title: $('#book-title').val() || $('#book-title').attr('placeholder'),
        description: $('#book-description').val() || undefined,
        sections,
    };
}

function handleDownload(mode) {
    const selectedItems = getSelectedItems();

    if (selectedItems.length <= 0) {
        $('#alert-message').text('No articles selected!');
        return;
    }

    Browser.getTabsHtml(selectedItems).then((sections) => {
        UI.showSection('#downloadSpinner');
        const book = buildBook(sections);

        if (mode === 'text') {
            UI.updateStatus(10, 'Generating text...');
            downloadTextExport(book, sections)
                .then(() => UI.updateStatus(100, 'Done!'))
                .then(() => {
                    UI.showSection('#downloadSuccess');
                })
                .catch((error) => {
                    UI.showSection('#downloadFailed');
                    UI.setErrorMessage(error && error.message ? error.message : String(error));
                });
        } else {
            Browser.sendMessage({
                action: 'download',
                filetype: 'epub',
                book,
            });
        }
    }).catch((error) => {
        UI.setErrorMessage(`Could not find tab content: ${error}`);
    });
}

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

$('#download-epub').click(() => handleDownload('epub'));
$('#download-text').click(() => handleDownload('text'));


/*
Settings Management
*/

function setExistingSettings(cb) {
    Browser.getLocalStorage(['email']).then((state) => {
        $('#settings-email-text').val(state.email);
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
