import Promise from 'bluebird';
import 'whatwg-fetch';

import packageInfo from './package.json';

const getPublishParams = (bookData) => {
    const body = {
        title: bookData.title,
        description: bookData.description,
    };

    if (bookData.sections) {
        body.sections = bookData.sections;
    } else {
        body.urls = bookData.getUrls();
    }

    return {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
};

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

class EpubPress {
    constructor(bookData) {
        const defaults = {
            title: undefined,
            description: undefined,
            sections: undefined,
            urls: undefined,
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
        return `${EpubPress.DOWNLOAD_URL}?id=${this.getId()}`;
    }

    getPublishUrl() {
        return EpubPress.PUBLISH_URL;
    }

    publish() {
        const self = this;
        return new Promise((resolve, reject) => {
            fetch(self.getPublishUrl(), getPublishParams(self.bookData))
            .then(checkStatus)
            .then((response) => response.json())
            .then((body) => {
                self.bookData.id = body.id;
                resolve(body.id);
            })
            .catch((err) => {
                console.log('EbupPress: Publish failed', err);
                reject(err);
            });
        });
    }

    download() {
        const self = this;
        return new Promise((resolve, reject) => {
            if (!self.bookData.id) { reject('No ID provided'); }

            fetch(self.getDownloadUrl())
            .then(checkStatus)
            .then((response) => {
                resolve(response);
            });
        });
    }
}

EpubPress.BASE_URL = packageInfo.baseUrl;
EpubPress.PUBLISH_URL = `${EpubPress.BASE_URL}/api/books`;
EpubPress.DOWNLOAD_URL = `${EpubPress.BASE_URL}/api/books/download`;

export default EpubPress;
