(function (global) {
    const Browser = global.Browser;
    const EpubPress = global.EpubPress;
    const UI = global.UI;

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
                Browser.sendMessage(null,
                    {
                        action: 'download',
                        book: {
                            title: $('#book-title').val() || undefined,
                            description: $('#book-description').val() || undefined,
                            sections,
                        },
                    }
                );
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

    global.onload = () => { // eslint-disable-line
        Browser.getLocalStorage('downloadState').then((state) => {
            if (state.downloadState) {
                UI.showSection('#downloadSpinner');
            } else {
                EpubPress.checkForUpdates();
                UI.showSection('#downloadForm');
                Browser.getCurrentWindowTabs().then((tabs) => {
                    tabs.forEach((tab) => {
                        $('#tab-list').append(getCheckbox({
                            title: tab.title,
                            url: tab.url,
                            id: tab.id,
                        }));
                    });
                });
            }
            return null;
        });
    };
}(window));
