"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EpubPress = function () {
    function EpubPress() {
        _classCallCheck(this, EpubPress);
    }

    _createClass(EpubPress, null, [{
        key: "isValidUrl",
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
        key: "filterUrls",
        value: function filterUrls(urls) {
            return (urls || []).filter(EpubPress.isValidUrl);
        }
    }]);

    return EpubPress;
}();

window.EpubPress = EpubPress;