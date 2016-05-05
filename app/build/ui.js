'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global) {
    function initializeUi() {
        var date = Date();
        date = date.slice(0, date.match(/\d{4}/).index + 4);
        document.getElementById('book-title').placeholder = 'EpubPress - ' + date;
    }

    initializeUi();

    var UI = function () {
        function UI() {
            _classCallCheck(this, UI);
        }

        _createClass(UI, null, [{
            key: 'setErrorMessage',
            value: function setErrorMessage(msg) {
                $('#failure-message').text(msg);
            }
        }]);

        return UI;
    }();

    global.UI = UI; // eslint-disable-line
})(window);