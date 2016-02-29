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

$('#download').click(() => {

});

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
        $('#downloadForm').hide();
        $('#downloadSpinner').show();
        chrome.runtime.sendMessage(null, { action: 'download', urls: selectedUrls }, {}, (res) => {
            console.log(res);
            $('body').replaceWith('<h1 style="margin: 20px;">SUCCESS!</h1>');
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender) => {
    console.log(request);
    console.log(sender);
});

window.onload = () => {
    chrome.storage.local.get('downloadState', (state) => {
        console.log();
        if (state.downloadState) {
            $('#downloadForm').hide();
            $('#downloadSpinner').show();
        } else {
            $('#downloadForm').show();
            $('#downloadSpinner').hide();

            getCurrentWindowTabs().then((tabs) => {
                tabs.filter((tab) => {
                    return tab.url.indexOf('http') > -1;
                }).forEach((tab) => {
                    $('#tab-list').append(getCheckbox(tab.title, tab.url));
                });
            });
        }
    });
};
