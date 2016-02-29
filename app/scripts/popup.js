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
    $('input.article-checkbox').each((index, checkbox) => {
        $(checkbox).prop('checked', true);
    });
});

$('#select-none').click(() => {
    $('input.article-checkbox').each((index, checkbox) => {
        $(checkbox).prop('checked', false);
    });
});

function requestEbook(urls) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/api/books',
            method: 'POST',
            data: JSON.stringify({ urls }),
            contentType: 'application/json'
        }).done((response) => {
            console.log(response);
            resolve(response.id);
        }).fail((err) => {
            console.log(err);
            reject(err);
        }).always((xhr, status, err) => {
            console.log(status);
            console.log(err);
        });
    });
}

function downloadEbook(id) {
    return new Promise((resolve) => {
        chrome.downloads.download(
            { url: `http://localhost:3000/api/books/download?id=${id}` },
            () => resolve()
        );
    });
}

$('#download').click(() => {
    const selectedUrls = [];
    $('input.article-checkbox').each((index, checkbox) => {
        if ($(checkbox).prop('checked')) {
            selectedUrls.push($(checkbox).prop('value'));
        }
    });

    if (selectedUrls.length <= 0) {
        alert('No articles selected!');
    } else {
        requestEbook(selectedUrls).then((ebookId) =>
            downloadEbook(ebookId)
        ).then(() => {
            $('body').replaceWith('<h1 style="margin: 20px;">SUCCESS!</h1>');
        });
    }
});

window.onload = () => {
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
    });
};
