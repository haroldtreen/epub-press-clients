import Promise from 'bluebird';

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
        return sender.url.indexOf('popup') < 0;
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
                        reject(new Error('No tabs!'));
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
        const htmlPromises = tabs.map((tab) => { // eslint-disable-line
            return new Promise((resolve) => {
                chrome.tabs.executeScript(tab.id, { code }, (html) => {
                    const updatedTab = tab;
                    if (html && html[0] && html[0].match(/html/i)) {
                        updatedTab.html = html[0];
                    } else {
                        updatedTab.html = null;
                    }
                    resolve(updatedTab);
                });
            });
        });

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
        chrome.runtime.sendMessage(...args);
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
                    const downloadListener = (downloadInfo) => { // eslint-disable-line
                        if (downloadInfo.id === downloadId) {
                            if (downloadInfo.error) {
                                chrome.downloads.onChanged.removeListener(downloadListener);
                                reject(downloadInfo.error);
                            } else if (downloadInfo.endTime || downloadInfo.state.current === 'complete') {
                                chrome.downloads.onChanged.removeListener(downloadListener);
                                resolve();
                            }
                        }
                    };
                    chrome.downloads.onChanged.addListener(downloadListener);
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

    static getErrorMsg(location, xhr) {
        let msg = location ? `${location}:  ` : '';

        msg += xhr.responseText ||
                Browser.ERROR_CODES[xhr.statusText] ||
                Browser.ERROR_CODES[xhr.status] ||
                Browser.ERROR_CODES[xhr.current] ||
                'Unknown';

        return msg;
    }
}

Browser.ERROR_CODES = {
    // Book Create Errors
    0: 'Server is down. Please try again later.',
    400: 'There was a problem with the request. Is EpubPress up to date?',
    404: 'Resource not found.',
    500: 'Unexpected server error.',
    503: 'Server took too long to respond.',
    timeout: 'Request took too long to complete.',
    error: undefined,
    // Download Errors
    SERVER_FAILED: 'Server error while downloading.',
    SERVER_BAD_CONTENT: 'Book could not be found',
};

export default Browser;
