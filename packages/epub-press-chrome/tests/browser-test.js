import { assert } from 'chai';
import Browser from '../app/scripts/browser.js';

describe('Browser', () => {
    it('is a function', () => {
        assert.isFunction(Browser);
    });
});
