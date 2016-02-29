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

const getCheckbox = (title, url) => {
    const html = `<div class="checkbox">
                  <label>
                  <input class='article-checkbox' type="checkbox" value="${url}">${title}
                  </label>
                  </div>`;
    return html;
};

$('#select-all').click(() => {
    console.log('all');
    $('input.article-checkbox').each((index, checkbox) => {
        $(checkbox).prop('checked', true);
    });
});

$('#select-none').click(() => {
    $('input.article-checkbox').each((index, checkbox) => {
        $(checkbox).prop('checked', false);
    });
});

window.onload = () => {
    console.log('opened');
    getCurrentWindowTabs().then((tabs) => {
        tabs.filter((tab) => {
            return tab.url.indexOf('http') > -1;
        }).forEach((tab) => {
            $('#tab-list').append(getCheckbox(tab.title, tab.url));
        });

        // $.post('http://localhost:3000/api/books/publish', { 'urls': urlss }, (response) => {
        //     console.log(response.bookId);
        //     $('#c-tabs-list').append('<h1>Response: ' + JSON.stringify(response) + '</h1>');
        //
        //     chrome.downloads.download({ url: 'http://localhost:3000/api/books/download?bookId=' + response.bookId }, () => {
        //         $('#c-tabs-list').append('<h1>SUCCESS</h1>');
        //     });
        // });
    }).catch((error) => {
        console.log(error);
        console.log(':\'(');
    });
};
