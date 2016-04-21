/* eslint-disable prefer-arrow-callback, no-var */

var EpubPress = window.EpubPress;
var validUrls = ['http://google.com', 'https://google.com'];
var invalidUrls = [
    'chrome://settings',
    'http://www.test.com/file.pdf',
    'http://www.test.com/file.jpg'
];


describe('Popup', function () {
    it('can validate certain urls', function () {
        validUrls.forEach(function (url) {
            assert.isTrue(EpubPress.isValidUrl(url));
        });
        invalidUrls.forEach(function (url) {
            assert.isFalse(EpubPress.isValidUrl(url));
        });
    });

    it('can filter bad urls', function () {
        assert.lengthOf(EpubPress.filterUrls(invalidUrls), 0);
        assert.lengthOf(EpubPress.filterUrls(validUrls), validUrls.length);
    });
});
