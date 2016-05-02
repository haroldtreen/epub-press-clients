const Browser = window.Browser;
const MANIFEST = Browser.getManifest();
const BASE_URL = Browser.baseUrl();

class EpubPress {
    static isValidUrl(url) {
        let matchesValid = true;
        let matchesInvalid = false;

        const invalidRegex = [/\.pdf$/i, /\.jpg$/i, /\.png$/, /\.gif$/];
        const validRegex = [/^http/];

        invalidRegex.forEach((regex) => {
            matchesInvalid = matchesInvalid || regex.test(url);
        });
        validRegex.forEach((regex) => {
            matchesValid = matchesValid && regex.test(url);
        });

        return matchesValid && !matchesInvalid;
    }

    static filterUrls(urls) {
        return (urls || []).filter(EpubPress.isValidUrl);
    }

    static compareVersion(versionData) {
        const apiSupported = Number(versionData.minCompatible.replace('.', ''));
        const currentVersion = Number(MANIFEST.version.replace('.', ''));

        if (apiSupported > currentVersion) {
            if (versionData.message) {
                $('#status-server').text(versionData.message);
            }
        }
    }

    static checkForUpdates() {
        $.ajax({
            url: `${BASE_URL}/api/version`,
            contentType: 'application/json',
        }).done((versionData) => {
            console.log(versionData);
            EpubPress.compareVersion(versionData);
        }).fail((xhr, err) => {
            console.error('Version Check Failed:');
            console.error(err);
        });
    }

    static requestEbook(sections) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${BASE_URL}/api/books`,
                method: 'POST',
                data: JSON.stringify({ sections }),
                contentType: 'application/json',
            }).done((response) => {
                console.log(response);
                resolve(response.id);
            }).fail((xhr, err) => {
                console.log(err);
                reject(err);
            }).always((xhr, status, err) => {
                console.log(status);
                console.log(err);
            });
        });
    }

    static downloadEbook(params) {
        return new Promise((resolve, reject) => {
            if (params.id) {
                const queryString = $.param(params);
                const url = `${BASE_URL}/api/books/download?${queryString}`;

                if (params.email && params.email.length > 0) {
                    $.ajax({ url }).done((response) => {
                        console.log(response);
                        resolve();
                    }).fail((xhr, err) => {
                        reject(err);
                    });
                } else {
                    Browser.download({ url }, resolve);
                }
            }
        });
    }
}

window.EpubPress = EpubPress;
