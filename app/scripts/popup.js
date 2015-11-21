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
        console.log(tabs);
    }).catch(function(error) {
        console.log(error);
        console.log(':\'(');
    });
};
