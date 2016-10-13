import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import EpubPress from '../epub-press';
import Helpers from './helpers';

const { isError } = Helpers;

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

const MOCK_STATUSES = [
    { message: 'Publishing...', progress: 5 },
    { message: 'Fetching HTML...', progress: 10 },
    { message: 'Extracting Content...', progress: 30 },
    { message: 'Fetching Images...', progress: 70 },
    { message: 'Formatting HTML...', progress: 80 },
    { message: 'Writting Ebook...', progress: 90 },
    { message: 'Done!', progress: 100 },
];

const MOCK_ERROR = { status: '422', detail: 'Error Message' };
const MOCK_ERROR_RESPONSE = { errors: [MOCK_ERROR] };

const EMAIL = 'epubpress@gmail.com';
const FILETYPE = 'mobi';

const DOWNLOAD_REGEX = new RegExp((`${EpubPress.getPublishUrl()}/[\\w|-]+/download`).replace(/\//g, '\/'));
const EMAIL_REGEX = new RegExp((`${EpubPress.getPublishUrl()}/[\\w|-]+/email`).replace(/\//g, '\/'));

const getMockBook = (props) => {
    const defaults = MOCK_BOOK_DATA;
    return Object.assign({}, defaults, props);
};

const buildBook = () => {
    const props = getMockBook();
    return new EpubPress(props);
};

describe('ebook', () => {
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
            assert.notInclude(downloadUrl, encodeURIComponent(settings.email));
            assert.include(downloadUrl, encodeURIComponent(settings.filetype));

            const emailUrl = book.getEmailUrl();
            assert.include(emailUrl, encodeURIComponent(settings.email));
            assert.include(emailUrl, encodeURIComponent(settings.filetype));
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

    describe('event listening', () => {
        describe('#on', () => {
            it('allows subscribing to events', () => {
                const book = buildBook();
                const cb = () => {};

                const returnVal = book.on('event', cb);

                assert.equal(returnVal, cb);
                assert.lengthOf(book.events.event, 1);
            });
        });

        describe('#removeListener', () => {
            it('removes listeners', () => {
                const book = buildBook();
                const cb = () => {};

                book.on('event', cb);
                book.removeListener('event', cb);

                assert.lengthOf(book.events.event, 0);
            });

            it('ignores non used listeners', () => {
                const book = buildBook();
                const beforeEvents = Object.values(book.events);
                book.removeListener('event', () => {});
                const afterEvents = Object.values(book.events);

                assert.deepEqual(beforeEvents, afterEvents);
            });
        });

        describe('#emit', () => {
            it('emits events', (done) => {
                let calls = 0;
                const expectedNumCalls = 5;

                const book = buildBook();
                const emitArgOne = 'string';
                const emitArgTwo = { an: 'object' };
                const cb = (argOne, argTwo) => {
                    calls += 1;
                    assert.equal(argOne, emitArgOne);
                    assert.equal(argTwo, emitArgTwo);
                    if (calls === expectedNumCalls) {
                        done();
                    }
                };

                for (let i = 0; i < expectedNumCalls; i += 1) {
                    book.on('event', cb);
                }

                book.emit('event', emitArgOne, emitArgTwo);
            });

            it('ignores unknown events', () => {
                const book = buildBook();
                book.emit('event', 'string', { ob: 'ject' });
            });
        });
    });

    describe('urls', () => {
        const book = new EpubPress(getMockBook());

        describe('#getDownloadUrl', () => {
            it('returns a download url', () => {
                book.bookData.id = 1;

                const downloadUrl = book.getDownloadUrl();
                assert.include(downloadUrl, `${book.getPublishUrl()}/1/download`);
            });

            it('no longer accepts an email', () => {
                const downloadUrl = book.getDownloadUrl({ email: EMAIL });
                assert.notInclude(downloadUrl, EMAIL.split('@')[1]);
            });

            it('accepts a filetype', () => {
                const downloadUrl = book.getDownloadUrl(FILETYPE);
                assert.include(downloadUrl, FILETYPE);
            });
        });

        describe('#getEmailUrl', () => {
            it('accepts an email', () => {
                const emailUrl = book.getEmailUrl(EMAIL);
                assert.include(emailUrl, encodeURIComponent(EMAIL));
            });

            it('accepts a filetype', () => {
                const emailUrl = book.getEmailUrl(EMAIL, FILETYPE);
                assert.include(emailUrl, FILETYPE);
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

    describe('books', () => {
        let sandbox;
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
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        describe('#publish', () => {
            it('posts section data to EpubPress', () => {
                const props = getMockBook();
                const book = new EpubPress(props);

                fetchMock.post(book.getPublishUrl(), MOCK_RESPONSE);

                const statusStub = sandbox
                    .stub(book, 'checkStatus')
                    .returns(Promise.resolve({ message: 'Done!', progress: 100 }));

                return book.publish().then(() => {
                    assert.isTrue(fetchMock.called(PUBLISH_URL));
                    assert.equal(fetchMock.lastUrl(PUBLISH_URL), PUBLISH_URL);
                    assert.equal(statusStub.callCount, 1);

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
                const book = buildBook();

                fetchMock.post(PUBLISH_URL, MOCK_RESPONSE);

                const statusStub = sandbox
                    .stub(book, 'checkStatus')
                    .returns(Promise.resolve({ message: 'Done!', progress: 100 }));

                book.publish().then(() => {
                    assert.lengthOf(fetchMock.calls(PUBLISH_URL), 1);
                    assert.equal(statusStub.callCount, 1);
                    done();
                }).catch(done);
                book.publish().catch(() => {});
                book.publish().catch(() => {});
            });

            it('will fail if checkStatus is called too often', () => {
                const book = buildBook();
                fetchMock.post(PUBLISH_URL, MOCK_RESPONSE);

                sandbox.stub(book, 'checkStatus')
                    .returns(Promise.resolve({ message: 'Almost done!', progress: 90 }));
                sandbox.stub(EpubPress, 'POLL_RATE', 0);
                sandbox.stub(EpubPress, 'CHECK_STATUS_LIMIT', 4);

                return book
                    .publish()
                    .then(() => Promise.reject('Publish should not have resolved.'))
                    .catch(isError)
                    .then((error) => {
                        assert.equal(book.checkStatus.callCount, EpubPress.CHECK_STATUS_LIMIT);
                        assert.include(Object.values(EpubPress.ERROR_CODES), error.message);
                    });
            });

            it('emits statusUpdate events', () => {
                const book = buildBook();
                const spy = sandbox.spy();
                book.on('statusUpdate', spy);

                fetchMock.post(PUBLISH_URL, MOCK_RESPONSE);

                sandbox.stub(EpubPress, 'POLL_RATE', 0);
                const statusStub = sandbox.stub(book, 'checkStatus');
                MOCK_STATUSES.forEach((status, index) => {
                    statusStub.onCall(index).returns(Promise.resolve(status));
                });

                return book.publish().then(() => {
                    assert.equal(spy.callCount, MOCK_STATUSES.length);
                    assert.equal(spy.getCall(0).args[0], MOCK_STATUSES[0]);
                });
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

                fetchMock.get(EMAIL_REGEX, 200);

                return book.email(EMAIL, FILETYPE).then(() => {
                    assert.isTrue(fetchMock.called(EMAIL_REGEX));
                    assert.include(fetchMock.lastUrl(EMAIL_REGEX), EMAIL.split('@')[1]);
                    assert.include(fetchMock.lastUrl(EMAIL_REGEX), FILETYPE);
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
                fetchMock.get(EMAIL_REGEX, 200);

                return book.email().then(() =>
                    Promise.reject('Success despite no email provided.')
                )
                .catch(isError)
                .then((err) => {
                    assert.isFalse(fetchMock.called(EMAIL_REGEX));
                    assert.include(err.message.toLowerCase(), 'no email');
                });
            });

            it('rejects when the server responds with an error', () => {
                fetchMock.get(EMAIL_REGEX, 500);

                return book.email(EMAIL, FILETYPE).then(() =>
                    Promise.reject('Success received when response was 500.')
                )
                .catch(isError)
                .then((e) => {
                    assert.include(e.message, 'Unexpected');
                });
            });

            it('rejects when the book is not found', () => {
                fetchMock.get(EMAIL_REGEX, 404);

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
