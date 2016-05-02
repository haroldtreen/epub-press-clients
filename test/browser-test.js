/* eslint-disable prefer-arrow-callback, no-var */

var Browser = window.Browser;
var validUrls = ['http://google.com', 'https://google.com'];
var invalidUrls = [
    'chrome://settings',
    'http://www.test.com/file.pdf',
    'http://www.test.com/file.jpg',
];


describe('Popup', function () {
    it('can validate certain urls', function () {
        validUrls.forEach(function (url) {
            assert.isTrue(Browser.isValidUrl(url));
        });
        invalidUrls.forEach(function (url) {
            assert.isFalse(Browser.isValidUrl(url));
        });
    });

    it('can filter bad urls', function () {
        assert.lengthOf(Browser.filterUrls(invalidUrls), 0);
        assert.lengthOf(Browser.filterUrls(validUrls), validUrls.length);
    });
});
