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

const EMAIL = 'epubpress@gmail.com';
const FILETYPE = 'mobi';

const DOWNLOAD_REGEX = /epub\.press\/api\/books/;

const getMockBook = (props) => {
    const defaults = MOCK_BOOK_DATA;
    return Object.assign({}, defaults, props);
};

describe('EpubPressJS', () => {
    describe('constructor', () => {
        it('accepts sections', () => {
            const props = getMockBook();
            const book = new EpubPress(props);
            const urls = book.getUrls();

            MOCK_SECTIONS.forEach((section) => {
                assert.include(urls, section.url);
            });
        });

        it('accepts urls', () => {
            const props = getMockBook({
                sections: undefined,
                urls: MOCK_SECTIONS.map(s => s.url),
            });
            const book = new EpubPress(props);
            const urls = book.getUrls();

            MOCK_SECTIONS.forEach((section) => {
                assert.include(urls, section.url);
            });
        });

        it('accepts a title', () => {
            const props = getMockBook({ title: 'A title' });
            const book = new EpubPress(props);

            assert.equal(book.getTitle(), props.title);
        });

        it('accepts a description', () => {
            const props = getMockBook({ description: 'Hello world' });
            const book = new EpubPress(props);

            assert.equal(book.getDescription(), props.description);
        });

        it('accepts an email and filetype', () => {
            const settings = { email: 'epubpress@gmail.com', filetype: 'mobi' };
            const book = new EpubPress(getMockBook(settings));

            const downloadUrl = book.getDownloadUrl();
            assert.include(downloadUrl, encodeURIComponent(settings.email));
            assert.include(downloadUrl, encodeURIComponent(settings.filetype));
        });

        it('accepts a filetype', () => {
            const mobiBook = new EpubPress(getMockBook({ filetype: 'mobi' }));
            const epubBook = new EpubPress(getMockBook({ filetype: 'epub' }));
            const noneBook = new EpubPress(getMockBook({ filetype: '.mobi' }));

            assert.equal(mobiBook.getFiletype(), 'mobi');
            assert.equal(epubBook.getFiletype(), 'epub');
            assert.equal(noneBook.getFiletype(), 'epub');
        });
    });

    describe('#getDownloadUrl', () => {
        let book;

        before(() => {
            book = new EpubPress(getMockBook());
        });

        it('returns a download url', () => {
            book.bookData.id = 1;

            const downloadUrl = book.getDownloadUrl();
            assert.include(downloadUrl, `${EpubPress.BASE_URL}/api/books/download?id=1`);
        });

        it('accepts an email', () => {
            const downloadUrl = book.getDownloadUrl({ email: EMAIL });
            assert.include(downloadUrl, EMAIL.split('@')[1]);
        });

        it('accepts a filetype', () => {
            const downloadUrl = book.getDownloadUrl({ filetype: FILETYPE });
            assert.include(downloadUrl, FILETYPE);
        });
    });

    describe('Server APIs', () => {
        const MOCK_RESPONSE = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            },
            body: { id: 1 },
        };
        const PUBLISH_URL = EpubPress.PUBLISH_URL;

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
                }
            };

            describe('#checkForUpdates', () => {
                beforeEach(() => {
                    fetchMock.get(EpubPress.VERSION_URL, VERSION_RESPONSE);
                });

                it('can detect when an update is needed', (done) => {
                    EpubPress.VERSION = '0.7.0';

                    EpubPress.checkForUpdates().then((result) => {
                        assert.isTrue(fetchMock.called(EpubPress.VERSION_URL));
                        assert.equal(result, VERSION_RESPONSE.message);
                        done();
                    }).catch(done);
                });

                it('can detect when an update is not needed', (done) => {
                    EpubPress.VERSION = '0.8.1';

                    EpubPress.checkForUpdates().then((result) => {
                        assert.isTrue(fetchMock.called(EpubPress.VERSION_URL));
                        assert.isFalse(!!result);
                        done();
                    }).catch(done);
                });

                it('can tell version updates for client libraries', (done) => {
                    EpubPress.checkForUpdates('epub-press-chrome', '0.7.0').then((result) => {
                        assert.isTrue(fetchMock.called(EpubPress.VERSION_URL));
                        assert.include(result, 'epub-press-chrome');
                        done();
                    }).catch(done);
                });

                it('can check for client library version updates', (done) => {
                    EpubPress.checkForUpdates('epub-press-chrome', '0.9.0').then((result) => {
                        assert.isTrue(fetchMock.called(EpubPress.VERSION_URL));
                        assert.isFalse(!!result);
                        done();
                    }).catch(done);
                });

                it('rejects invalid clients', (done) => {
                    EpubPress.checkForUpdates('epub-press-iphone').then(() => {
                        done(new Error('#checkForUpdates should reject invalid clients.'));
                    }).catch((e) => {
                        assert.include(e.message, 'epub-press-iphone');
                        done();
                    }).catch(done);
                });
            });
        });

        describe('books', () => {
            beforeEach(() => {
                fetchMock.restore();
            });

            describe('#publish', () => {
                it('posts section data to EpubPress', (done) => {
                    const props = getMockBook();
                    const book = new EpubPress(props);

                    fetchMock.post(PUBLISH_URL, MOCK_RESPONSE);

                    book.publish().then(() => {
                        assert.isTrue(fetchMock.called(PUBLISH_URL));
                        assert.equal(fetchMock.lastUrl(PUBLISH_URL), PUBLISH_URL);

                        const requestBody = JSON.parse(fetchMock.lastOptions(PUBLISH_URL).body);
                        assert.deepEqual(requestBody, props);
                        assert.equal(book.getId(), 1);
                        done();
                    }).catch(done);
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

                it('only attempts publish once', (done) => {
                    const props = getMockBook();
                    const book = new EpubPress(props);

                    fetchMock.post(PUBLISH_URL, MOCK_RESPONSE);

                    book.publish().then(() => {
                        assert.lengthOf(fetchMock.calls(PUBLISH_URL), 1);
                        done();
                    }).catch(done);
                    book.publish().catch(() => {});
                    book.publish().catch(() => {});
                });
            });

            describe('#download', () => {
                let DOWNLOAD_URL;
                let book;
                let props;

                beforeEach(() => {
                    props = getMockBook({ id: 1 });
                    book = new EpubPress(props);
                    DOWNLOAD_URL = book.getDownloadUrl();
                });

                it('downloads books from EpubPress', (done) => {
                    fetchMock.get(DOWNLOAD_URL, 200);

                    book.download().then(() => {
                        assert.isTrue(fetchMock.called(DOWNLOAD_URL));
                        assert.equal(fetchMock.lastUrl(DOWNLOAD_URL), DOWNLOAD_URL);
                        done();
                    }).catch(done);
                });

                it('requests with the provided filetype', (done) => {
                    fetchMock.get(DOWNLOAD_REGEX, 200);

                    book.download(FILETYPE).then(() => {
                        assert.include(fetchMock.lastUrl(DOWNLOAD_REGEX), FILETYPE);
                        done();
                    }).catch(done);
                });

                it('handles download errors', (done) => {
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
                    props = getMockBook({ id: undefined });
                    book = new EpubPress(props);
                    DOWNLOAD_URL = book.getDownloadUrl();

                    fetchMock.get(DOWNLOAD_URL, 200);

                    book.download().then(() => {
                        done(new Error('Download should only be called for books with ids'));
                    }).catch((error) => {
                        assert.isFalse(fetchMock.called(DOWNLOAD_URL));
                        assert.include(error.message.toLowerCase(), 'no id');

                        done();
                    })
                    .catch(done);
                });
            });

            describe('#emailDelivery', () => {
                let book;
                let props;
                beforeEach(() => {
                    props = getMockBook({ id: 1 });
                    book = new EpubPress(props);
                });

                it('requests with the provided email & filetype', (done) => {
                    props = getMockBook({ id: 1 });
                    book = new EpubPress(props);

                    fetchMock.get(DOWNLOAD_REGEX, 200);

                    book.emailDelivery(EMAIL, FILETYPE).then(() => {
                        assert.isTrue(fetchMock.called(DOWNLOAD_REGEX));
                        assert.include(fetchMock.lastUrl(DOWNLOAD_REGEX), EMAIL.split('@')[1]);
                        assert.include(fetchMock.lastUrl(DOWNLOAD_REGEX), FILETYPE);
                        done();
                    }).catch(done);
                });

                it('rejects when the book has no id', (done) => {
                    props = getMockBook({ id: undefined });
                    book = new EpubPress(props);

                    book.emailDelivery(EMAIL, FILETYPE).then(() => {
                        done(new Error('Success sending book with no id.'));
                    }).catch((err) => {
                        assert.include(err.message.toLowerCase(), 'no id');
                        done();
                    });
                });

                it('rejects when no email is provided', (done) => {
                    fetchMock.get(DOWNLOAD_REGEX, 200);

                    book.emailDelivery().then(() => {
                        done(new Error('Success despite no email provided.'));
                    }).catch((err) => {
                        assert.isFalse(fetchMock.called(DOWNLOAD_REGEX));
                        assert.include(err.message.toLowerCase(), 'no email');
                        done();
                    });
                });

                it('rejects when the server responds with an error', (done) => {
                    fetchMock.get(DOWNLOAD_REGEX, 500);

                    book.emailDelivery(EMAIL, FILETYPE).then(() => {
                        done(new Error('Success received when response was 500.'));
                    }).catch((err) => {
                        assert.include(err.message, 'Unexpected');
                        done();
                    });
                });

                it('rejects when the book is not found', (done) => {
                    fetchMock.get(DOWNLOAD_REGEX, 404);

                    book.emailDelivery(EMAIL, FILETYPE).then(() => {
                        done(new Error('Success received when response was 404.'));
                    }).catch((err) => {
                        assert.include(err.message.toLowerCase(), 'not found');
                        done();
                    });
                });
            });
        });
    });
});
