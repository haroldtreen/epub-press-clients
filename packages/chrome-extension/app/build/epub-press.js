'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global) {
    var Browser = global.Browser;
    var MANIFEST = Browser.getManifest();
    var BASE_URL = Browser.baseUrl();

    var EpubPress = function () {
        function EpubPress() {
            _classCallCheck(this, EpubPress);
        }

        _createClass(EpubPress, null, [{
            key: 'compareVersion',
            value: function compareVersion(versionData) {
                var apiSupported = Number(versionData.minCompatible.replace('.', ''));
                var currentVersion = Number(MANIFEST.version.replace('.', ''));

                if (apiSupported > currentVersion) {
                    if (versionData.message) {
                        $('#alert-message').text(versionData.message);
                    }
                }
            }
        }, {
            key: 'checkForUpdates',
            value: function checkForUpdates() {
                $.ajax({
                    url: BASE_URL + '/api/version',
                    contentType: 'application/json'
                }).done(function (versionData) {
                    console.log(versionData);
                    EpubPress.compareVersion(versionData);
                }).fail(function (xhr) {
                    console.error('Version Check Failed:');
                    console.error(xhr);
                });
            }
        }, {
            key: 'requestEbook',
            value: function requestEbook(book) {
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: BASE_URL + '/api/books',
                        method: 'POST',
                        data: JSON.stringify(book),
                        contentType: 'application/json'
                    }).done(function (response) {
                        resolve(response.id);
                    }).fail(function (xhr) {
                        var msg = Browser.getErrorMsg('Book create', xhr);
                        console.log(msg);
                        reject(msg);
                    }).always(function (xhr) {
                        console.log(xhr);
                    });
                });
            }
        }, {
            key: 'downloadEbook',
            value: function downloadEbook(params) {
                return new Promise(function (resolve, reject) {
                    if (params.id) {
                        var queryString = $.param(params);
                        var url = BASE_URL + '/api/books/download?' + queryString;

                        if (params.email && params.email.length > 0) {
                            $.ajax({ url: url }).done(function () {
                                resolve();
                            }).fail(function (xhr) {
                                var msg = Browser.getErrorMsg('Book download', xhr);
                                reject(msg);
                            });
                        } else {
                            Browser.download({ url: url }).then(resolve).catch(function (error) {
                                var msg = Browser.getErrorMsg('Book download', error);
                                reject(msg);
                            });
                        }
                    }
                });
            }
        }]);

        return EpubPress;
    }();

    global.EpubPress = EpubPress; // eslint-disable-line
})(window);