function initializeUi() {
    let date = Date();
    date = date.slice(0, date.match(/\d{4}/).index + 4);
    document.getElementById('book-title').placeholder = `EpubPress - ${date}`;
}

initializeUi();
