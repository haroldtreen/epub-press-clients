import Promise from 'bluebird';
import sanitize from 'sanitize-filename';

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
        return !sender.url || sender.url.indexOf('popup') < 0;
    }

    static isPopupMsg(sender) {
        return sender.url && sender.url.indexOf('popup') > -1;
    }

    static getCurrentWindowTabs() {
        let promise;
        if (chrome) {
            promise = new Promise((resolve, reject) => {
                chrome.windows.getCurrent({ populate: true }, (currentWindow) => {
                    if (currentWindow.tabs) {
                        const websiteTabs = currentWindow.tabs.filter(tab => Browser.isValidUrl(tab.url));
                        resolve(websiteTabs);
                    } else {
                        reject(new Error('No tabs!'));
                    }
                });
            });
        } else {
            promise = new Promise((resolve) => {
                resolve(null);
            });
        }
        return promise;
    }

    static getTabsHtml(tabs) {
        const func = () => document.documentElement.outerHTML;
        const htmlPromises = tabs.map(
            tab => new Promise((resolve) => {
                chrome.scripting.executeScript(
                    { target: { tabId: tab.id }, func },
                    (results) => {
                        const updatedTab = tab;
                        const html = results && results[0] && results[0].result;
                        if (html && html.match(/html/i)) {
                            updatedTab.html = html;
                        } else {
                            updatedTab.html = null;
                        }
                        resolve(updatedTab);
                    }
                );
            }),
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
        // In MV3 sendMessage returns a promise that rejects with "Receiving
        // end does not exist" when no popup is open. These are best-effort UI
        // updates (the popup restores state from storage on reopen), so the
        // rejection is expected and safe to ignore.
        const result = chrome.runtime.sendMessage(...args);
        if (result && typeof result.catch === 'function') {
            result.catch(() => {});
        }
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

    static connect(name = 'epub-press') {
        return chrome.runtime.connect({ name });
    }

    static onPortConnection(cb) {
        chrome.runtime.onConnect.addListener(cb);
    }

    // A MV3 service worker is evicted after ~30s idle. The popup port only
    // keeps it alive while the popup is open, but the popup closes as soon as
    // it loses focus — so a long publish (e.g. "Fetching Images") can outlive
    // the worker and stall. Pinging an extension API under the idle limit
    // resets the timer, keeping the worker alive for the whole publish.
    static keepAlive() {
        if (Browser.keepAliveInterval) {
            return;
        }
        Browser.keepAliveInterval = setInterval(() => {
            chrome.runtime.getPlatformInfo(() => {});
        }, Browser.KEEP_ALIVE_INTERVAL);
    }

    static stopKeepAlive() {
        if (Browser.keepAliveInterval) {
            clearInterval(Browser.keepAliveInterval);
            Browser.keepAliveInterval = null;
        }
    }

    static download(params) {
        let promise;
        const sanitizedParams = { ...params, filename: sanitize(params.filename) };
        if (chrome) {
            promise = new Promise((resolve, reject) => {
                chrome.downloads.download(sanitizedParams, (downloadId) => {
                    const downloadListener = (downloadInfo) => {
                        if (downloadInfo && downloadInfo.id === downloadId) {
                            if (downloadInfo.error) {
                                chrome.downloads.onChanged.removeListener(downloadListener);
                                reject(downloadInfo.error);
                            } else if (
                                downloadInfo.endTime
                                || downloadInfo.state.current === 'complete'
                            ) {
                                chrome.downloads.onChanged.removeListener(downloadListener);
                                resolve();
                            }
                        } else {
                            reject(chrome.runtime.lastError);
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

        msg
            += xhr.responseText
            || Browser.ERROR_CODES[xhr.statusText]
            || Browser.ERROR_CODES[xhr.status]
            || Browser.ERROR_CODES[xhr.current]
            || 'Unknown';

        return msg;
    }
}

Browser.keepAliveInterval = null;
Browser.KEEP_ALIVE_INTERVAL = 20000; // ping under the ~30s service worker idle limit

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
