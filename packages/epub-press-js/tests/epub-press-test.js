import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import EpubPress from '../epub-press';
import packageInfo from '../package.json';

function isError(e) {
    if (typeof e === 'string') {
        return Promise.reject(new Error(e));
    }
    return Promise.resolve(e);
}

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

const MOCK_ERROR = { status: '422', detail: 'Error Message' };
const MOCK_ERROR_RESPONSE = { errors: [MOCK_ERROR] };

const EMAIL = 'epubpress@gmail.com';
const FILETYPE = 'mobi';

const DOWNLOAD_REGEX = new RegExp((`${EpubPress.getPublishUrl()}/\\d/download`).replace(/\//g, '\/'));

const getMockBook = (props) => {
    const defaults = MOCK_BOOK_DATA;
    return Object.assign({}, defaults, props);
};

describe('EpubPressJS', () => {
    describe('.BASE_URLS', () => {
        it('has a BASE_URL', () => {
            assert.equal(EpubPress.BASE_URL, packageInfo.baseUrl);
        });

        it('has a BASE_API', () => {
            const majorVersion = EpubPress.VERSION.split('.')[0];
            assert.include(EpubPress.BASE_API, EpubPress.BASE_URL);
            assert.include(EpubPress.BASE_API, 'api');
            assert.include(EpubPress.BASE_API, majorVersion);
        });
    });

    describe('Constructor', () => {
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

    describe('Urls', () => {
        const book = new EpubPress(getMockBook());

        describe('#getDownloadUrl', () => {
            it('returns a download url', () => {
                book.bookData.id = 1;

                const downloadUrl = book.getDownloadUrl();
                assert.include(downloadUrl, `${book.getPublishUrl()}/1/download`);
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

        describe('#getPublishUrl', () => {
            it('returns the publish url', () => {
                const publishUrl = book.getPublishUrl();
                assert.include(publishUrl, EpubPress.BASE_API);
                assert.include(publishUrl, 'books');
            });
        });

        describe('#getStatusUrl', () => {
            it('returns a status url for the book', () => {
                const url = book.getStatusUrl();
                assert.include(url, book.getId());
                assert.include(url, 'status');
            });
        });
    });

    describe('Server APIs', () => {
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

        describe('books', () => {
            const MOCK_RESPONSE = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                },
                body: { id: 1 },
            };
            const PUBLISH_URL = EpubPress.getPublishUrl();

            beforeEach(() => {
                fetchMock.restore();
            });

            describe('#publish', () => {
                it('posts section data to EpubPress', () => {
                    const props = getMockBook();
                    const book = new EpubPress(props);

                    fetchMock.post(book.getPublishUrl(), MOCK_RESPONSE);

                    return book.publish().then(() => {
                        assert.isTrue(fetchMock.called(PUBLISH_URL));
                        assert.equal(fetchMock.lastUrl(PUBLISH_URL), PUBLISH_URL);

                        const requestBody = JSON.parse(fetchMock.lastOptions(PUBLISH_URL).body);
                        assert.deepEqual(requestBody, props);
                        assert.equal(book.getId(), 1);
                    });
                });

                it('handles publish errors', () => {
                    const props = getMockBook();
                    const book = new EpubPress(props);

                    fetchMock.post(PUBLISH_URL, 500);
                    return book.publish().then(() =>
                        Promise.reject('Reject should have been called.')
                    )
                    .catch(isError)
                    .then((e) => {
                        assert.isTrue(fetchMock.called(PUBLISH_URL));
                        assert.include(e.message, 'Unexpected server');
                    });
                });

                it('displays publish error responses', () => {
                    const props = getMockBook();
                    const book = new EpubPress(props);

                    fetchMock.post(PUBLISH_URL, {
                        status: 500,
                        body: MOCK_ERROR_RESPONSE,
                    });
                    return book
                        .publish()
                        .then(() => Promise.reject('Publish should have rejected.'))
                        .catch(isError)
                        .then((e) => {
                            assert.equal(e.message, MOCK_ERROR.detail);
                        });
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

                it('downloads books from EpubPress', () => {
                    fetchMock.get(DOWNLOAD_URL, 200);

                    return book.download().then(() => {
                        assert.isTrue(fetchMock.called(DOWNLOAD_URL));
                        assert.equal(fetchMock.lastUrl(DOWNLOAD_URL), DOWNLOAD_URL);
                    });
                });

                it('requests with the provided filetype', () => {
                    fetchMock.get(DOWNLOAD_REGEX, 200);

                    return book.download(FILETYPE).then(() => {
                        assert.include(fetchMock.lastUrl(DOWNLOAD_REGEX), FILETYPE);
                    });
                });

                it('handles download errors', () => {
                    fetchMock.get(DOWNLOAD_URL, 404);
                    return book.download().then(() =>
                        Promise.reject('Reject should have been called.')
                    )
                    .catch(isError)
                    .then((error) => {
                        assert.isTrue(fetchMock.called(DOWNLOAD_URL));
                        assert.include(error.message, 'not found');
                    });
                });

                it('ignores download when no id is saved', () => {
                    props = getMockBook({ id: undefined });
                    book = new EpubPress(props);
                    DOWNLOAD_URL = book.getDownloadUrl();

                    fetchMock.get(DOWNLOAD_URL, 200);

                    return book.download().then(() =>
                        Promise.reject('Download should only be called for books with ids')
                    )
                    .catch(isError)
                    .then((error) => {
                        assert.isFalse(fetchMock.called(DOWNLOAD_URL));
                        assert.include(error.message.toLowerCase(), 'no id');
                    });
                });
            });

            describe('#email', () => {
                let book;
                let props;
                beforeEach(() => {
                    props = getMockBook({ id: 1 });
                    book = new EpubPress(props);
                });

                it('requests with the provided email & filetype', () => {
                    props = getMockBook({ id: 1 });
                    book = new EpubPress(props);

                    fetchMock.get(DOWNLOAD_REGEX, 200);

                    return book.email(EMAIL, FILETYPE).then(() => {
                        assert.isTrue(fetchMock.called(DOWNLOAD_REGEX));
                        assert.include(fetchMock.lastUrl(DOWNLOAD_REGEX), EMAIL.split('@')[1]);
                        assert.include(fetchMock.lastUrl(DOWNLOAD_REGEX), FILETYPE);
                    });
                });

                it('rejects when the book has no id', () => {
                    props = getMockBook({ id: undefined });
                    book = new EpubPress(props);

                    return book.email(EMAIL, FILETYPE).then(() =>
                        Promise.reject('Success sending book with no id.')
                    ).catch((err) => {
                        assert.include(err.message.toLowerCase(), 'no id');
                    });
                });

                it('rejects when no email is provided', () => {
                    fetchMock.get(DOWNLOAD_REGEX, 200);

                    return book.email().then(() =>
                        Promise.reject('Success despite no email provided.')
                    )
                    .catch(isError)
                    .then((err) => {
                        assert.isFalse(fetchMock.called(DOWNLOAD_REGEX));
                        assert.include(err.message.toLowerCase(), 'no email');
                    });
                });

                it('rejects when the server responds with an error', () => {
                    fetchMock.get(DOWNLOAD_REGEX, 500);

                    return book.email(EMAIL, FILETYPE).then(() =>
                        Promise.reject('Success received when response was 500.')
                    )
                    .catch(isError)
                    .then((e) => {
                        assert.include(e.message, 'Unexpected');
                    });
                });

                it('rejects when the book is not found', () => {
                    fetchMock.get(DOWNLOAD_REGEX, 404);

                    return book.email(EMAIL, FILETYPE).then(() =>
                        Promise.reject('Success received when response was 404.')
                    )
                    .catch(isError)
                    .then((e) => {
                        assert.include(e.message.toLowerCase(), 'not found');
                    });
                });
            });

            describe('#checkStatus', () => {
                let book;
                const STATUS_RESPONSE = { message: 'Building', progress: 50 };

                before(() => {
                    const props = getMockBook({ id: 1 });
                    book = new EpubPress(props);
                });

                beforeEach(() => {
                    fetchMock.reset();
                });

                it('calls the endpoint', () => {
                    const url = book.getStatusUrl();
                    fetchMock.get(url, STATUS_RESPONSE);

                    return book.checkStatus().then(() => {
                        assert.isTrue(fetchMock.called(url));
                    });
                });

                it('parses the json', () => {
                    fetchMock.get(book.getStatusUrl(), STATUS_RESPONSE);
                    return book.checkStatus().then((status) => {
                        assert.deepEqual(STATUS_RESPONSE, status);
                    });
                });

                it('rejects when 404 codes are returned', () => {
                    book = new EpubPress(getMockBook({ id: 10 }));
                    fetchMock.get(book.getStatusUrl(), 404);

                    return book.checkStatus().then(() =>
                        Promise.reject('Promise should not resolve from 404')
                    )
                    .catch(isError)
                    .then((e) => {
                        assert.include(e.message.toLowerCase(), 'not found');
                    });
                });
            });
        });
    });
});
