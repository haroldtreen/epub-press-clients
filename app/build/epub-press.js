'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Browser = window.Browser;
var MANIFEST = Browser.getManifest();
var BASE_URL = Browser.baseUrl();

var EpubPress = function () {
    function EpubPress() {
        _classCallCheck(this, EpubPress);
    }

    _createClass(EpubPress, null, [{
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
            return (urls || []).filter(EpubPress.isValidUrl);
        }
    }, {
        key: 'compareVersion',
        value: function compareVersion(versionData) {
            var apiSupported = Number(versionData.minCompatible.replace('.', ''));
            var currentVersion = Number(MANIFEST.version.replace('.', ''));

            if (apiSupported > currentVersion) {
                if (versionData.message) {
                    $('#status-server').text(versionData.message);
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
            }).fail(function (xhr, err) {
                console.error('Version Check Failed:');
                console.error(err);
            });
        }
    }, {
        key: 'requestEbook',
        value: function requestEbook(sections) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: BASE_URL + '/api/books',
                    method: 'POST',
                    data: JSON.stringify({ sections: sections }),
                    contentType: 'application/json'
                }).done(function (response) {
                    console.log(response);
                    resolve(response.id);
                }).fail(function (xhr, err) {
                    console.log(err);
                    reject(err);
                }).always(function (xhr, status, err) {
                    console.log(status);
                    console.log(err);
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
                        $.ajax({ url: url }).done(function (response) {
                            console.log(response);
                            resolve();
                        }).fail(function (xhr, err) {
                            reject(err);
                        });
                    } else {
                        Browser.download({ url: url }, resolve);
                    }
                }
            });
        }
    }]);

    return EpubPress;
}();

window.EpubPress = EpubPress;