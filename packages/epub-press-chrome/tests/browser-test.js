import { assert } from 'chai';
import { MockChrome } from './mocks';
import Browser from '../scripts/browser';

describe('Browser', () => {
    it('is a function', () => {
        assert.isFunction(Browser);
    });

    it('handles failed downloads', () => {
        chrome = new MockChrome();
        const downloadPromise = Browser.download({
            filename: 'file.txt',
            url: 'http://www.example.com/',
        });

        const downloadsCb = chrome.downloads.download.firstCall.args[1];
        downloadsCb(1);
        const downloadListener = chrome.downloads.onChanged.addListener.firstCall.args[0];

        downloadListener(undefined);

        return downloadPromise.then(
            () => Promise.reject(
                new Error('Expected download to fail when callback run with undefined'),
            ),
            (err) => {
                assert.instanceOf(err, Error);
            },
        );
    });

    it('sanitizes filenames', () => {
        chrome = new MockChrome();

        Browser.download({
            filename: 'invalid | filename',
            url: 'http://www.example.com',
        });

        const downloadInfo = chrome.downloads.download.firstCall.args[0];
        console.log(downloadInfo);
        assert.notMatch(downloadInfo.filename, /\|/);
    });
});
