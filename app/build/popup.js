'use strict';

var Browser = window.Browser;
var EpubPress = window.EpubPress;

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

function getCheckbox(props) {
    var html = '<div class="checkbox">\n                    <label>\n                        <input class=\'article-checkbox\' type="checkbox" value="' + props.url + '" name="' + props.id + '">\n                        <span>' + props.title + '</span>\n                    </label>\n                  </div>';
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
    var selectedItems = [];
    $('input.article-checkbox').each(function (index, checkbox) {
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
        Browser.getTabsHtml(selectedItems).then(function (sections) {
            showSection('#downloadSpinner');
            Browser.sendMessage(null, {
                action: 'download',
                book: {
                    title: $('#book-title').val() || undefined,
                    description: $('#book-description').val() || undefined,
                    sections: sections
                }
            });
        });
    }
});

/*
    Settings Management
*/

function setExistingSettings(cb) {
    Browser.getLocalStorage(['email', 'filetype']).then(function (state) {
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
    Browser.setLocalStorage({
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

Browser.onBackgroundMessage(function (request) {
    if (request.action === 'download') {
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

window.onload = function () {
    Browser.getLocalStorage('downloadState').then(function (state) {
        if (state.downloadState) {
            showSection('#downloadSpinner');
        } else {
            EpubPress.checkForUpdates();
            showSection('#downloadForm');
            Browser.getCurrentWindowTabs().then(function (tabs) {
                tabs.forEach(function (tab) {
                    $('#tab-list').append(getCheckbox({
                        title: tab.title,
                        url: tab.url,
                        id: tab.id
                    }));
                });
            });
        }
    });
};