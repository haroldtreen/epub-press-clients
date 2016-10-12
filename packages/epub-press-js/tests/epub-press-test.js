import { assert } from 'chai';
import fetchMock from 'fetch-mock';

import EpubPress from '../epub-press';
import packageInfo from '../package.json';
import Helpers from './helpers';

const { isError } = Helpers;

describe('EpubPress', () => {
    describe('.BASE_URLS', () => {
        it('has a BASE_URL', () => {
            assert.equal(EpubPress.BASE_URL, packageInfo.baseUrl);
        });

        it('has a BASE_API', () => {
            assert.include(EpubPress.BASE_API, EpubPress.BASE_URL);
            assert.include(EpubPress.BASE_API, 'api');
        });
    });

    describe('versions', () => {
        const VERSION_RESPONSE = {
            version: '0.3.0',
            minCompatible: '0.8.0',
            message: 'An update for EpubPress is available.',
            clients: {
                'epub-press-chrome': {
                    minCompatible: '0.8.0',
                    message: 'Please update epub-press-chrome',
                },
                'epub-press-js': {
                    minCompatible: '0.8.0',
                    message: 'An update for EpubPress is available.',
                },
            },
        };

        describe('.checkForUpdates', () => {
            beforeEach(() => {
                fetchMock.get(EpubPress.getVersionUrl(), VERSION_RESPONSE);
            });

            it('can detect when an update is needed', () => {
                EpubPress.VERSION = '0.7.0';

                return EpubPress.checkForUpdates().then((result) => {
                    assert.isTrue(fetchMock.called(EpubPress.getVersionUrl()));
                    assert.equal(result, VERSION_RESPONSE.message);
                });
            });

            it('can detect when an update is not needed', () => {
                EpubPress.VERSION = '0.8.1';

                return EpubPress.checkForUpdates().then((result) => {
                    assert.isTrue(fetchMock.called(EpubPress.getVersionUrl()));
                    assert.isFalse(!!result);
                });
            });

            it('can tell version updates for client libraries', () =>
                EpubPress.checkForUpdates('epub-press-chrome', '0.7.0')
                .then((result) => {
                    assert.isTrue(fetchMock.called(EpubPress.getVersionUrl()));
                    assert.include(result, 'epub-press-chrome');
                })
            );

            it('can check for client library version updates', () =>
                EpubPress.checkForUpdates('epub-press-chrome', '0.9.0')
                .then((result) => {
                    assert.isTrue(fetchMock.called(EpubPress.getVersionUrl()));
                    assert.isFalse(!!result);
                })
            );

            it('rejects invalid clients', () =>
                EpubPress.checkForUpdates('epub-press-iphone').then(() =>
                    Promise.reject('#checkForUpdates should reject invalid clients.')
                )
                .catch(isError)
                .then((e) => {
                    assert.include(e.message, 'epub-press-iphone');
                })
            );
        });
    });
});
