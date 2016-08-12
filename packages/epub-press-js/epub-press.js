import Promise from 'bluebird';
import { saveAs } from 'file-saver';

import packageInfo from './package.json';

function isBrowser() {
    return typeof window !== 'undefined';
}

function saveFile(filename, data) {
    if (isBrowser()) {
        const file = new File(
            [data],
            filename
        );
        saveAs(file);
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
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(EpubPress.ERROR_CODES[response.status]);
    error.response = response;
    throw error;
};

function compareVersion(versionData) {
    const apiSupported = Number(versionData.minCompatible.replace('.', ''));
    const currentVersion = Number(EpubPress.getVersion().replace('.', ''));

    if (apiSupported > currentVersion) {
        return versionData.message;
    }
}

class EpubPress {
    static checkForUpdate() {
        return new Promise((resolve, reject) => {
            fetch(EpubPress.getVersionUrl())
            .then(checkStatus)
            .then((response) => response.json())
            .then((versionData) => {
                console.log(versionData);
                resolve(compareVersion(versionData));
            })
            .catch((e) => {
                console.log('Version check failed', e);
                reject(e);
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
        const defaults = {
            title: undefined,
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

    getDownloadUrl() {
        const urlParams = ['id', 'email', 'filetype'].map((param) => {
            const value = this.bookData[param] || '';
            return `${param}=${encodeURIComponent(value)}`;
        }).join('&');
        return `${EpubPress.DOWNLOAD_URL}?${urlParams}`;
    }

    getPublishUrl() {
        return EpubPress.PUBLISH_URL;
    }

    publish() {
        const self = this;
        if (self._isPublishing) {
            return Promise.reject(new Error('Publishing in progress'));
        } else if (self.getId()) {
            return Promise.resolve(self.getId());
        }
        self._isPublishing = true;
        return new Promise((resolve, reject) => {
            fetch(self.getPublishUrl(), getPublishParams(self.bookData))
            .then(checkStatus)
            .then((response) => response.json())
            .then((body) => {
                self._isPublishing = false;
                self.bookData.id = body.id;
                resolve(body.id);
            })
            .catch((err) => {
                self._isPublishing = false;
                console.log('EbupPress: Publish failed', err);
                reject(err);
            });
        });
    }

    download() {
        const self = this;
        return new Promise((resolve, reject) => {
            if (!self.bookData.id) {
                return reject(new Error('No ID provided'));
            }

            fetch(self.getDownloadUrl())
            .then(checkStatus)
            .then((response) => {
                return response.blob ? response.blob() : response.buffer();
            }).then((bookData) => {
                if (process.env.NODE_ENV !== 'test') {
                    saveFile(`${self.getTitle()}.${self.getFiletype()}`, bookData);
                }
                resolve();
            })
            .catch((err) => {
                console.log('EpubPress: Download failed', err);
                reject(err);
            });
        });
    }
}

EpubPress.BASE_URL = packageInfo.baseUrl;
EpubPress.PUBLISH_URL = `${EpubPress.BASE_URL}/api/books`;
EpubPress.DOWNLOAD_URL = `${EpubPress.BASE_URL}/api/books/download`;
EpubPress.VERSION_URL = `${EpubPress.BASE_URL}/api/version`;

EpubPress.VERSION = packageInfo.version;

EpubPress.ERROR_CODES = {
    // Book Create Errors
    0: 'Server is down. Please try again later.',
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
