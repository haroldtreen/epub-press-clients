import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import EpubPress from '../epub-press';

const MOCK_SECTIONS = [{
    url: 'https://epub.press',
    html: '<html></html>',
}, {
    url: 'https://google.com',
    html: '<html></html>',
}];

const MOCK_BOOK_DATA = {
    title: 'Title',
    description: 'Description',
    sections: MOCK_SECTIONS,
};

const getMockBook = (props) => {
    const defaults = MOCK_BOOK_DATA;
    return Object.assign({}, defaults, props);
};

describe('EpubPressJS', () => {
    describe('data', () => {
        it('can be created with sections', () => {
            const props = getMockBook();
            const book = new EpubPress(props);
            const urls = book.getUrls();

            assert.include(urls, 'https://epub.press');
            assert.include(urls, 'https://google.com');
        });

        it('can be created with urls', () => {
            const props = getMockBook({
                sections: undefined,
                urls: MOCK_SECTIONS.map(s => s.url),
            });
            const book = new EpubPress(props);
            const urls = book.getUrls();

            assert.include(urls, 'https://epub.press');
            assert.include(urls, 'https://google.com');
        });

        it('can return the title', () => {
            const props = getMockBook({ title: 'A title' });
            const book = new EpubPress(props);

            assert.equal(book.getTitle(), props.title);
        });

        it('can return a description', () => {
            const props = getMockBook({ description: 'Hello world' });
            const book = new EpubPress(props);

            assert.equal(book.getDescription(), props.description);
        });

        it('has a download url', () => {
            const book = new EpubPress(getMockBook());
            book.bookData.id = 1;

            const downloadUrl = book.getDownloadUrl();
            assert.include(downloadUrl, `${EpubPress.BASE_URL}/api/books/download?id=1`);
        });

        it('accepts an email and filetype', () => {
            const settings = { email: 'epubpress@gmail.com', filetype: 'mobi' };
            const book = new EpubPress(getMockBook(settings));

            const downloadUrl = book.getDownloadUrl();
            assert.include(downloadUrl, encodeURIComponent(settings.email));
            assert.include(downloadUrl, encodeURIComponent(settings.filetype));
        });

        it('returns the filedtype', () => {
            const mobiBook = new EpubPress(getMockBook({ filetype: 'mobi' }));
            const epubBook = new EpubPress(getMockBook({ filetype: 'epub' }));
            const noneBook = new EpubPress(getMockBook({ filetype: '.mobi' }));

            assert.equal(mobiBook.getFiletype(), 'mobi');
            assert.equal(epubBook.getFiletype(), 'epub');
            assert.equal(noneBook.getFiletype(), 'epub');
        });
    });

    describe('api', () => {
        const MOCK_RESPONSE = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            },
            body: { id: 1 },
        };
        const PUBLISH_URL = EpubPress.PUBLISH_URL;

        describe('versions', (done) => {

            const VERSION_RESPONSE = {
                version: '0.3.0',
                minCompatible:'0.8.0',
                message: 'An update for EpubPress is available.'
            };

            it('can detect when an update is needed', (done) => {
                fetchMock.get(EpubPress.VERSION_URL, VERSION_RESPONSE);

                EpubPress.VERSION = '0.7.0';

                EpubPress.checkForUpdate().then((result) => {
                    assert.isTrue(fetchMock.called(EpubPress.VERSION_URL));
                    assert.equal(result, VERSION_RESPONSE.message);
                    done();
                }).catch(done);
            });

            it('can detect when an update is not needed', (done) => {
                fetchMock.get(EpubPress.VERSION_URL, VERSION_RESPONSE);

                EpubPress.VERSION = '0.8.1';

                EpubPress.checkForUpdate().then((result) => {
                    assert.isTrue(fetchMock.called(EpubPress.VERSION_URL));
                    assert.isUndefined(result);
                    done();
                }).catch(done);
            });
        });

        describe('success', () => {
            it('posts section data to EpubPress', (done) => {
                const props = getMockBook();
                const book = new EpubPress(props);

                fetchMock.post(PUBLISH_URL, MOCK_RESPONSE);

                book.publish().then(() => {
                    assert.isTrue(fetchMock.called(PUBLISH_URL));
                    assert.equal(fetchMock.lastUrl(PUBLISH_URL), PUBLISH_URL);
                    assert.deepEqual(JSON.parse(fetchMock.lastOptions(PUBLISH_URL).body), props);
                    assert.equal(book.getId(), 1);
                    done();
                }).catch(done);
            });

            it('downloads books from EpubPress', (done) => {
                const props = getMockBook({ id: 1 });
                const book = new EpubPress(props);
                const DOWNLOAD_URL = book.getDownloadUrl();

                fetchMock.get(DOWNLOAD_URL, 200);

                book.download().then(() => {
                    assert.isTrue(fetchMock.called(DOWNLOAD_URL));
                    assert.equal(fetchMock.lastUrl(DOWNLOAD_URL), DOWNLOAD_URL);
                    done();
                }).catch(done);
            });
        });

        describe('failure', () => {
            beforeEach(() => {
                fetchMock.restore();
            });

            it('handles publish errors', (done) => {
                const props = getMockBook();
                const book = new EpubPress(props);

                fetchMock.post(PUBLISH_URL, 500);
                book.publish().then(() => {
                    done(new Error('Reject should have been called.'));
                }).catch((error) => {
                    assert.isTrue(fetchMock.called(PUBLISH_URL));
                    assert.include(error.message, 'Unexpected server');
                    done();
                })
                .catch(done);
            });

            it('handles download errors', (done) => {
                const props = getMockBook({ id: 123 });
                const book = new EpubPress(props);
                const DOWNLOAD_URL = book.getDownloadUrl();

                fetchMock.get(DOWNLOAD_URL, 404);
                book.download().then(() => {
                    done(new Error('Reject should have been called.'));
                }).catch((error) => {
                    assert.isTrue(fetchMock.called(DOWNLOAD_URL));
                    assert.include(error.message, 'not found');
                    done();
                })
                .catch(done);
            });

            it('ignores download when no id is saved', (done) => {
                const props = getMockBook({ id: undefined });
                const book = new EpubPress(props);
                const DOWNLOAD_URL = book.getDownloadUrl();

                fetchMock.get(DOWNLOAD_URL, 200);

                book.download().then(() => {
                    done(new Error('Download should only be called for books with ids'));
                }).catch((error) => {
                    assert.isFalse(fetchMock.called(DOWNLOAD_URL));
                    assert.include(error.message, 'No ID');

                    done();
                })
                .catch(done);
            });

            it('only attempts publish once', (done) => {
                const props = getMockBook();
                const book = new EpubPress(props);

                fetchMock.post(PUBLISH_URL, MOCK_RESPONSE);

                book.publish().then(() => {
                    assert.lengthOf(fetchMock.calls(PUBLISH_URL), 1);
                    done();
                }).catch(done);
                book.publish();
                book.publish();
            });
        });
    });
});
