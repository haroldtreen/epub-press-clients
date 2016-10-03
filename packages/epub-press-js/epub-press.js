import Promise from 'bluebird';
import { saveAs } from 'file-saver';

import packageInfo from './package.json';

function isBrowser() {
    return typeof window !== 'undefined';
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

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(EpubPress.ERROR_CODES[response.status]);
    error.response = response;
    throw error;
}

function normalizeError(err) {
    const knownError = EpubPress.ERROR_CODES[err.message];
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

class EpubPress {
    static checkForUpdates(client = 'epub-press-js', version = EpubPress.getVersion()) {
        return new Promise((resolve, reject) => {
            fetch(EpubPress.getVersionUrl())
            .then(checkStatus)
            .then((response) => response.json())
            .then((versionData) => {
                console.log(versionData);
                const clientVersionData = versionData.clients[client];
                if (clientVersionData) {
                    resolve(compareVersion(version, clientVersionData));
                } else {
                    reject(new Error(`Version data for ${client} not found.`));
                }
            })
            .catch((e) => {
                const error = normalizeError(e);
                console.log('Version check failed', error);
                reject(error);
            });
        });
    }

    static getVersionUrl() {
        return EpubPress.VERSION_URL;
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
        return `${EpubPress.STATUS_URL}?id=${this.getId()}`;
    }

    checkStatus() {
        return new Promise((resolve, reject) => {
            fetch(this.getStatusUrl())
            .then(checkStatus)
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            })
            .catch((e) => {
                const error = normalizeError(e);
                reject(error);
            });
        });
    }

    getPublishUrl() {
        return EpubPress.PUBLISH_URL;
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
            .then(checkStatus)
            .then((response) => response.json())
            .then((body) => {
                this.isPublishing = false;
                this.bookData.id = body.id;
                resolve(body.id);
            })
            .catch((e) => {
                this.isPublishing = false;
                const error = normalizeError(e);
                console.log('EbupPress: Publish failed', error);
                reject(error);
            });
        });
    }

    getDownloadUrl(options = {}) {
        const urlParams = ['id', 'email', 'filetype'].map((param) => {
            const value = options[param] || this.bookData[param] || '';
            return `${param}=${encodeURIComponent(value)}`;
        }).join('&');
        return `${EpubPress.DOWNLOAD_URL}?${urlParams}`;
    }

    download(filetype) {
        return new Promise((resolve, reject) => {
            isDownloadable(this);

            fetch(this.getDownloadUrl({ filetype }))
            .then(checkStatus)
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
                console.log('EpubPress: Download failed', error);
                reject(error);
            });
        });
    }

    emailDelivery(email, filetype) {
        return new Promise((resolve, reject) => {
            if (!email) {
                return reject(new Error('EpubPress: No email provided.'));
            }

            isDownloadable(this);

            return fetch(this.getDownloadUrl({ email, filetype }))
            .then(checkStatus)
            .then(() => {
                console.log('EpubPress: Book delivered.');
                resolve();
            })
            .catch((e) => {
                const error = normalizeError(e);
                console.log('EpubPress: Email delivery failed.');
                reject(error);
            });
        });
    }
}

EpubPress.BASE_URL = packageInfo.baseUrl;
EpubPress.PUBLISH_URL = `${EpubPress.BASE_URL}/api/books`;
EpubPress.STATUS_URL = `${EpubPress.PUBLISH_URL}/status`;
EpubPress.DOWNLOAD_URL = `${EpubPress.PUBLISH_URL}/download`;
EpubPress.VERSION_URL = `${EpubPress.BASE_URL}/api/version`;

EpubPress.VERSION = packageInfo.version;

EpubPress.ERROR_CODES = {
    // Book Create Errors
    0: 'Server is down. Please try again later.',
    'Failed to fetch': 'Server is down. Please try again later.',
    400: 'There was a problem with the request. Is EpubPress up to date?',
    404: 'Resource not found.',
    500: 'Unexpected server error.',
    503: 'Server took too long to respond.',
    timeout: 'Request took too long to complete.',
    error: undefined,
    // Download Errors
    SERVER_FAILED: 'Server error while downloading.',
    SERVER_BAD_CONTENT: 'Book could not be found',
};

module.exports = EpubPress;
