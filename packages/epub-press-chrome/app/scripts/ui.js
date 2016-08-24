import Browser from './browser';

class UI {
    static initializeUi() {
        let date = Date();
        date = date.slice(0, date.match(/\d{4}/).index + 4);
        document.getElementById('book-title').placeholder = `EpubPress - ${date}`;
    }

    static setErrorMessage(msg) {
        $('#failure-message').text(msg);
    }

    static showSection(section) {
        UI.SECTIONS_SELECTORS.forEach((selector) => {
            if (selector === section) {
                $(selector).show();
            } else {
                $(selector).hide();
            }
        });
    }

    static setAlertMessage(message) {
        $('#alert-message').text(message);
    }

    static getCheckbox(props) {
        const html = `<div class="checkbox">
        <label>
        <input class='article-checkbox' type="checkbox" value="${props.url}" name="${props.id}">
        <span>${props.title}</span>
        </label>
        </div>`;
        return html;
    }

    static initializeTabList() {
        Browser.getCurrentWindowTabs().then((tabs) => {
            tabs.forEach((tab) => {
                $('#tab-list').append(UI.getCheckbox({
                    title: tab.title,
                    url: tab.url,
                    id: tab.id,
                }));
            });
        }).catch((error) => {
            UI.setErrorMessage(`Searching tabs failed: ${error}`);
        });
    }
}

UI.SECTIONS_SELECTORS = [
    '#downloadForm',
    '#settingsForm',
    '#downloadSpinner',
    '#downloadSuccess',
    '#downloadFailed',
];

module.exports = UI;
