'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global) {
    var Browser = function () {
        function Browser() {
            _classCallCheck(this, Browser);
        }

        _createClass(Browser, null, [{
            key: 'isValidUrl',
            value: function isValidUrl(url) {
                var matchesValid = true;
                var matchesInvalid = false;

                var invalidRegex = [/\.pdf$/i, /\.jpg$/i, /\.png$/, /\.gif$/];
                var validRegex = [/^http/];

                invalidRegex.forEach(function (regex) {
                    matchesInvalid = matchesInvalid || regex.test(url);
                });
                validRegex.forEach(function (regex) {
                    matchesValid = matchesValid && regex.test(url);
                });

                return matchesValid && !matchesInvalid;
            }
        }, {
            key: 'filterUrls',
            value: function filterUrls(urls) {
                return (urls || []).filter(Browser.isValidUrl);
            }
        }, {
            key: 'isBackgroundMsg',
            value: function isBackgroundMsg(sender) {
                return sender.url.indexOf('background_page') > -1;
            }
        }, {
            key: 'isPopupMsg',
            value: function isPopupMsg(sender) {
                return sender.url.indexOf('popup') > -1;
            }
        }, {
            key: 'getCurrentWindowTabs',
            value: function getCurrentWindowTabs() {
                var promise = undefined;
                if (chrome) {
                    promise = new Promise(function (resolve, reject) {
                        chrome.windows.getCurrent({ populate: true }, function (currentWindow) {
                            if (currentWindow.tabs) {
                                var websiteTabs = currentWindow.tabs.filter(function (tab) {
                                    return Browser.isValidUrl(tab.url);
                                });
                                resolve(websiteTabs);
                            } else {
                                reject('No tabs!');
                            }
                        });
                    });
                } else {
                    promise = new Promise(function (resolve) {
                        resolve(null);
                    });
                }
                return promise;
            }
        }, {
            key: 'getTabsHtml',
            value: function getTabsHtml(tabs) {
                var code = 'document.documentElement.outerHTML';
                var htmlPromises = tabs.map(function (tab) {
                    // eslint-disable-line
                    return new Promise(function (resolve) {
                        chrome.tabs.executeScript(tab.id, { code: code }, function (html) {
                            var updatedTab = tab;
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
        }, {
            key: 'getLocalStorage',
            value: function getLocalStorage(fields) {
                var promise = undefined;
                if (chrome) {
                    promise = new Promise(function (resolve) {
                        chrome.storage.local.get(fields, function (state) {
                            resolve(state);
                        });
                    });
                }
                return promise;
            }
        }, {
            key: 'setLocalStorage',
            value: function setLocalStorage(keyValues) {
                chrome.storage.local.set(keyValues);
            }
        }, {
            key: 'sendMessage',
            value: function sendMessage() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                chrome.runtime.sendMessage.apply(chrome.runtime, args);
            }
        }, {
            key: 'onBackgroundMessage',
            value: function onBackgroundMessage(cb) {
                chrome.runtime.onMessage.addListener(function (request, sender) {
                    if (Browser.isBackgroundMsg(sender)) {
                        cb(request, sender);
                    }
                });
            }
        }, {
            key: 'onForegroundMessage',
            value: function onForegroundMessage(cb) {
                chrome.runtime.onMessage.addListener(function (request, sender) {
                    if (Browser.isPopupMsg(sender)) {
                        cb(request, sender);
                    }
                });
            }
        }, {
            key: 'download',
            value: function download(params) {
                var promise = undefined;
                if (chrome) {
                    promise = new Promise(function (resolve, reject) {
                        chrome.downloads.download(params, function (downloadId) {
                            var downloadListener = chrome.downloads.onChanged.addListener(function (downloadInfo) {
                                // eslint-disable-line
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
        }, {
            key: 'baseUrl',
            value: function baseUrl() {
                return chrome.runtime.getManifest().homepage_url;
            }
        }, {
            key: 'getManifest',
            value: function getManifest() {
                return chrome.runtime.getManifest();
            }
        }, {
            key: 'getErrorMsg',
            value: function getErrorMsg(location, xhr) {
                var msg = location ? location + ':  ' : '';

                msg += xhr.responseText || Browser.ERROR_CODES[xhr.statusText] || Browser.ERROR_CODES[xhr.status] || Browser.ERROR_CODES[xhr.current] || 'Unknown';

                return msg;
            }
        }]);

        return Browser;
    }();

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
        SERVER_BAD_CONTENT: 'Book could not be found'
    };

    global.Browser = Browser; // eslint-disable-line
})(window);