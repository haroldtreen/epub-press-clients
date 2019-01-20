import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import EpubPress from 'epub-press-js';
import UI from '../scripts/ui';

describe('UI', () => {
    it('is a function', () => {
        assert.isFunction(UI);
    });
});
