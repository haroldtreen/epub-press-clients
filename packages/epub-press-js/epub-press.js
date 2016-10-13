import Promise from 'bluebird';
import { saveAs } from 'file-saver';

import packageInfo from './package.json';

function isBrowser() {
    return typeof window !== 'undefined';
}

function log(...args) {
    if (EpubPress.DEBUG) {
        console.log(...args);
    }
}

function isDownloadable(book) {
    if (!book.getId()) {
        throw new Error('Book has no id. Have you published?');
    }
}

function saveFile(filename, data) {
    if (isBrowser()) {
        let file;
        if (typeof File === 'function') {
            file = new File([data], filename);
        } else {
            file = new Blob([data], { type: 'application/octet-stream' });
        }
        saveAs(file, filename);
    } else {
        const fs = require('fs');
        fs.writeFileSync(filename, data);
    }
}

function getPublishParams(bookData) {
    const body = {
        title: bookData.title,
        description: bookData.description,
    };

    if (bookData.sections) {
        body.sections = bookData.sections;
    } else {
        body.urls = bookData.urls.slice();
    }

    return {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
}

function trackPublishStatus(book) {
    return new Promise((resolve, reject) => {
        const trackingCallback = (checkStatusCounter) => {
            book.checkStatus().then((status) => {
                book.emit('statusUpdate', status);
                if (Number(status.progress) >= 100) {
                    resolve(book);
                } else if (checkStatusCounter >= EpubPress.CHECK_STATUS_LIMIT) {
                    reject(new Error(EpubPress.ERROR_CODES[503]));
                } else {
                    setTimeout(trackingCallback, EpubPress.POLL_RATE, checkStatusCounter + 1);
                }
            }).catch(reject);
        };
        trackingCallback(1);
    });
}

function checkResponseStatus(response) {
    const defaultErrorMsg = EpubPress.ERROR_CODES[response.status];
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else if (response.body) {
        return response.json().then((body) => {
            const hasErrorMsg = body.errors && body.errors.length > 0;
            const errorMsg = hasErrorMsg ? body.errors[0].detail : defaultErrorMsg;
            return Promise.reject(new Error(errorMsg));
        });
    }
    const error = new Error(defaultErrorMsg);
    return Promise.reject(error);
}

function normalizeError(err) {
    const knownError = EpubPress.ERROR_CODES[err.message] || EpubPress.ERROR_CODES[err.name];
    if (knownError) {
        return new Error(knownError);
    }
    return err;
}

function compareVersion(currentVersion, apiVersion) {
    const apiVersionNumber = Number(apiVersion.minCompatible.replace('.', ''));
    const currentVersionNumber = Number(currentVersion.replace('.', ''));

    if (apiVersionNumber > currentVersionNumber) {
        return apiVersion.message;
    }
    return null;
}

function buildQuery(params) {
    const query = ['email', 'filetype'].map((paramName) =>
        params[paramName] ? `${paramName}=${encodeURIComponent(params[paramName])}` : ''
    ).filter(paramStr => paramStr).join('&');
    return query ? `?${query}` : '';
}

class EpubPress {
    static checkForUpdates(client = 'epub-press-js', version = EpubPress.getVersion()) {
        return new Promise((resolve, reject) => {
            fetch(EpubPress.getVersionUrl())
            .then(checkResponseStatus)
            .then(response => response.json())
            .then((versionData) => {
                const clientVersionData = versionData.clients[client];
                if (clientVersionData) {
                    resolve(compareVersion(version, clientVersionData));
                } else {
                    reject(new Error(`Version data for ${client} not found.`));
                }
            })
            .catch((e) => {
                const error = normalizeError(e);
                log('Version check failed', error);
                reject(error);
            });
        });
    }

    static getPublishUrl() {
        return this.prototype.getPublishUrl();
    }

    static getVersionUrl() {
        return `${EpubPress.BASE_API}/version`;
    }

    static getVersion() {
        return EpubPress.VERSION;
    }

    constructor(bookData) {
        const date = Date().slice(0, Date().match(/\d{4}/).index + 4);
        const defaults = {
            title: `EpubPress - ${date}`,
            description: undefined,
            sections: undefined,
            urls: undefined,
            filetype: 'epub',
        };

        this.bookData = Object.assign({}, defaults, bookData);
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
        return callback;
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((cb) => {
                cb(...args);
            });
        }
    }

    removeListener(eventName, callback) {
        if (!this.events[eventName]) {
            return;
        }

        const index = this.events[eventName].indexOf(callback);
        if (index >= 0) {
            this.events[eventName].splice(index, 1);
        }
    }

    getUrls() {
        let bookUrls = [];
        const { urls, sections } = this.bookData;

        if (urls) {
            bookUrls = urls.slice();
        } else if (sections) {
            bookUrls = sections.map((section) => section.url);
        }
        return bookUrls;
    }

    getFiletype(providedFiletype) {
        const filetype = providedFiletype || this.bookData.filetype;
        if (!filetype) {
            return 'epub';
        }

        return ['mobi', 'epub'].find((type) => filetype.toLowerCase() === type) || 'epub';
    }

    getEmail() {
        return this.bookData.email;
    }

    getTitle() {
        return this.bookData.title;
    }

    getDescription() {
        return this.bookData.description;
    }

    getId() {
        return this.bookData.id;
    }

    getStatusUrl() {
        return `${EpubPress.getPublishUrl()}/${this.getId()}/status`;
    }

    getPublishUrl() {
        return `${EpubPress.BASE_API}/books`;
    }

    getDownloadUrl(filetype = this.getFiletype()) {
        const query = buildQuery({ filetype });
        return `${this.getPublishUrl()}/${this.getId()}/download${query}`;
    }

    getEmailUrl(email = this.getEmail(), filetype = this.getFiletype()) {
        const query = buildQuery({ email, filetype });
        return `${this.getPublishUrl()}/${this.getId()}/email${query}`;
    }

    checkStatus() {
        return new Promise((resolve, reject) => {
            fetch(this.getStatusUrl())
            .then(checkResponseStatus)
            .then(response => response.json())
            .then((body) => {
                resolve(body);
            })
            .catch((e) => {
                const error = normalizeError(e);
                reject(error);
            });
        });
    }

    publish() {
        if (this.isPublishing) {
            return Promise.reject(new Error('Publishing in progress'));
        } else if (this.getId()) {
            return Promise.resolve(this.getId());
        }
        this.isPublishing = true;
        return new Promise((resolve, reject) => {
            fetch(this.getPublishUrl(), getPublishParams(this.bookData))
            .then(checkResponseStatus)
            .then(response => response.json())
            .then(({ id }) => {
                this.bookData.id = id;
                return trackPublishStatus(this).then(() => {
                    resolve(id);
                });
            })
            .catch((e) => {
                this.isPublishing = false;
                const error = normalizeError(e);
                log('EbupPress: Publish failed', error);
                reject(error);
            });
        });
    }

    download(filetype) {
        return new Promise((resolve, reject) => {
            isDownloadable(this);

            fetch(this.getDownloadUrl(filetype))
            .then(checkResponseStatus)
            .then((response) => {
                return response.blob ? response.blob() : response.buffer();
            })
            .then((bookFile) => {
                if (process.env.NODE_ENV !== 'test') {
                    const filename = `${this.getTitle()}.${filetype || this.getFiletype()}`;
                    saveFile(filename, bookFile);
                }
                resolve();
            })
            .catch((e) => {
                const error = normalizeError(e);
                log('EpubPress: Download failed', error);
                reject(error);
            });
        });
    }

    email(email, filetype) {
        return new Promise((resolve, reject) => {
            if (!email) {
                return reject(new Error('EpubPress: No email provided.'));
            }

            isDownloadable(this);

            return fetch(this.getEmailUrl(email, filetype))
            .then(checkResponseStatus)
            .then(() => {
                log('EpubPress: Book delivered.');
                resolve();
            })
            .catch((e) => {
                const error = normalizeError(e);
                log('EpubPress: Email delivery failed.');
                reject(error);
            });
        });
    }
}

EpubPress.BASE_URL = packageInfo.baseUrl;
EpubPress.BASE_API = `${EpubPress.BASE_URL}/api/v1`;

EpubPress.VERSION = packageInfo.version;
EpubPress.POLL_RATE = 3000;
EpubPress.CHECK_STATUS_LIMIT = 40;

EpubPress.ERROR_CODES = {
    // Book Create Errors
    0: 'Server is down. Please try again later.',
    'Failed to fetch': 'Server is down. Please try again later.',
    'FetchError': 'Server is down. Please try again later.',
    400: 'There was a problem with the request. Is EpubPress up to date?',
    404: 'Resource not found.',
    422: 'Request contained invalid data.',
    500: 'Unexpected server error.',
    503: 'Server took too long to respond.',
    timeout: 'Request took too long to complete.',
    error: undefined,
    // Download Errors
    SERVER_FAILED: 'Server error while downloading.',
    SERVER_BAD_CONTENT: 'Book could not be found',
};

module.exports = EpubPress;
