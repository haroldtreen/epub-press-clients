(function (global) {
    function initializeUi() {
        let date = Date();
        date = date.slice(0, date.match(/\d{4}/).index + 4);
        document.getElementById('book-title').placeholder = `EpubPress - ${date}`;
    }

    initializeUi();

    class UI {
        static setErrorMessage(msg) {
            $('#failure-message').text(msg);
        }
    }

    global.UI = UI; // eslint-disable-line
}(window));
