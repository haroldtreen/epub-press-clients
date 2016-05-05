'use strict';

(function (global) {
    var Browser = global.Browser;
    var EpubPress = global.EpubPress;
    var UI = global.UI;

    /*
    Download Form
    */

    function getCheckbox(props) {
        var html = '<div class="checkbox">\n        <label>\n        <input class=\'article-checkbox\' type="checkbox" value="' + props.url + '" name="' + props.id + '">\n        <span>' + props.title + '</span>\n        </label>\n        </div>';
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
            $('#alert-message').text('No articles selected!');
        } else {
            Browser.getTabsHtml(selectedItems).then(function (sections) {
                UI.showSection('#downloadSpinner');
                Browser.sendMessage(null, {
                    action: 'download',
                    book: {
                        title: $('#book-title').val() || undefined,
                        description: $('#book-description').val() || undefined,
                        sections: sections
                    }
                });
            }).catch(function (error) {
                UI.setErrorMessage('Could not find tab content: ' + error);
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
        }).catch(function (error) {
            UI.setErrorMessage('Could not load settings: ' + error);
        });
    }

    $('#settings-btn').click(function () {
        setExistingSettings(function () {
            UI.showSection('#settingsForm');
        });
    });

    $('#settings-save-btn').click(function () {
        Browser.setLocalStorage({
            email: $('#settings-email-text').val(),
            filetype: $('#settings-filetype-select').val()
        });
        UI.showSection('#downloadForm');
    });

    $('#settings-cancel-btn').click(function () {
        UI.showSection('#downloadForm');
    });

    /*
    Messaging
    */

    Browser.onBackgroundMessage(function (request) {
        if (request.action === 'download') {
            if (request.status === 'complete') {
                UI.showSection('#downloadSuccess');
            } else {
                UI.showSection('#downloadFailed');
                if (request.error) {
                    UI.setErrorMessage(request.error);
                }
            }
        }
    });

    /*
    Startup
    */

    global.onload = function () {
        // eslint-disable-line
        Browser.getLocalStorage('downloadState').then(function (state) {
            if (state.downloadState) {
                UI.showSection('#downloadSpinner');
            } else {
                EpubPress.checkForUpdates();
                UI.showSection('#downloadForm');
                Browser.getCurrentWindowTabs().then(function (tabs) {
                    tabs.forEach(function (tab) {
                        $('#tab-list').append(getCheckbox({
                            title: tab.title,
                            url: tab.url,
                            id: tab.id
                        }));
                    });
                }).catch(function (error) {
                    UI.setErrorMessage('Searching tabs failed: ' + error);
                });
            }
            return null;
        });
    };
})(window);