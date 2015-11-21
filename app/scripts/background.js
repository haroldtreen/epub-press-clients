'use strict';

chrome.runtime.onInstalled.addListener(details => {
    console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

chrome.windows.getCurrent((currentWindow) => {
    console.log(currentWindow);
    chrome.tabs.getAllInWindow(currentWindow.id, (tabs) => {
        console.log(tabs);
    });
});

console.log('\'Allo \'Allo! Event Page for Browser Action');
