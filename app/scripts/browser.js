class Browser {
    static isValidUrl(url) {
        let matchesValid = true;
        let matchesInvalid = false;

        const invalidRegex = [/\.pdf$/i, /\.jpg$/i, /\.png$/, /\.gif$/];
        const validRegex = [/^http/];

        invalidRegex.forEach((regex) => {
            matchesInvalid = matchesInvalid || regex.test(url);
        });
        validRegex.forEach((regex) => {
            matchesValid = matchesValid && regex.test(url);
        });

        return matchesValid && !matchesInvalid;
    }

    static filterUrls(urls) {
        return (urls || []).filter(Browser.isValidUrl);
    }

    static isBackgroundMsg(sender) {
        return sender.url.indexOf('background_page') > -1;
    }

    static isPopupMsg(sender) {
        return sender.url.indexOf('popup') > -1;
    }

    static getCurrentWindowTabs() {
        let promise;
        if (chrome) {
            promise = new Promise((resolve, reject) => {
                chrome.windows.getCurrent({ populate: true }, (currentWindow) => {
                    if (currentWindow.tabs) {
                        const websiteTabs = currentWindow.tabs.filter(
                            (tab) => Browser.isValidUrl(tab.url)
                        );
                        resolve(websiteTabs);
                    } else {
                        reject('No tabs!');
                    }
                });
            });
        } else {
            promise = new Promise((resolve) => { resolve(null); });
        }
        return promise;
    }

    static getTabsHtml(tabs) {
        const code = 'document.documentElement.outerHTML';
        const htmlPromises = tabs.map((tab) =>
            new Promise((resolve) => {
                chrome.tabs.executeScript(tab.id, { code }, (html) => {
                    const updatedTab = tab;
                    if (html[0] && html[0].match(/html/i)) {
                        updatedTab.html = html[0];
                    } else {
                        updatedTab.html = null;
                    }
                    resolve(updatedTab);
                });
            })
        );

        return Promise.all(htmlPromises);
    }

    static getLocalStorage(fields) {
        let promise;
        if (chrome) {
            promise = new Promise((resolve) => {
                chrome.storage.local.get(fields, (state) => {
                    resolve(state);
                });
            });
        }
        return promise;
    }

    static setLocalStorage(keyValues) {
        chrome.storage.local.set(keyValues);
    }

    static sendMessage(...args) {
        chrome.runtime.sendMessage.apply(chrome.runtime, args);
    }

    static onBackgroundMessage(cb) {
        chrome.runtime.onMessage.addListener((request, sender) => {
            if (Browser.isBackgroundMsg(sender)) {
                cb(request, sender);
            }
        });
    }

    static onForegroundMessage(cb) {
        chrome.runtime.onMessage.addListener((request, sender) => {
            if (Browser.isPopupMsg(sender)) {
                cb(request, sender);
            }
        });
    }

    static download(params) {
        let promise;
        if (chrome) {
            promise = new Promise((resolve, reject) => {
                chrome.downloads.download(params, (downloadId) => {
                    let downloadListener = chrome.downloads.onChanged.addListener((downloadInfo) => {
                        if (downloadInfo.id === downloadId) {
                            if (downloadInfo.error) {
                                console.log(downloadInfo.error);
                                chrome.downloads.onChanged.removeListener(downloadListener);
                                reject(downloadInfo.error);
                            } else if (downloadInfo.endTime) {
                                console.log('end time: ', downloadInfo.endTime);
                                chrome.downloads.onChanged.removeListener(downloadListener);
                                resolve(downloadInfo.endTime);
                            }
                        }
                    });
                });
            });
        }
        return promise;
    }

    static baseUrl() {
        return chrome.runtime.getManifest().homepage_url;
    }

    static getManifest() {
        return chrome.runtime.getManifest();
    }
}


window.Browser = Browser;
