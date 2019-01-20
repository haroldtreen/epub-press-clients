import { assert } from 'chai';
import Browser from '../scripts/browser.js';

describe('Browser', () => {
    it('is a function', () => {
        assert.isFunction(Browser);
    });
});
