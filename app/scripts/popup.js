'use strict';

console.log('\'Allo \'Allo! Popup');

var getCurrentWindowTabs = () => {
    console.log('in');
    return new Promise((resolve, reject) => {
        chrome.windows.getCurrent((currentWindow) => {
            console.log(currentWindow);
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

window.onload = () => {
    console.log('opened');
    getCurrentWindowTabs().then(function(tabs) {
        var list = ['<ul>'];
        tabs.forEach((tab) => {
            var item = ['<li>'];
            item.push('Title: ' + tab.title + ', Url: ' + tab.url);
            item.push('</li>');
            list.push(item.join(''));
        });
        list.push('</ul>');
        $('#c-tabs-list').append(list.join(''));

        var urlss = tabs.map((tab) => {
            return tab.url;
        }).filter((url) => {
            return url.indexOf('http') > -1;
        });

        $.post('http://localhost:3000/api/books/publish', { 'urls': urlss }, (response) => {
            console.log(response.bookId);
            $('#c-tabs-list').append('<h1>Response: ' + JSON.stringify(response) + '</h1>');

            chrome.downloads.download({ url: 'http://localhost:3000/api/books/download?bookId=' + response.bookId }, () => {
                $('#c-tabs-list').append('<h1>SUCCESS</h1>');
            });
        });
    }).catch(function(error) {
        console.log(error);
        console.log(':\'(');
    });
};
