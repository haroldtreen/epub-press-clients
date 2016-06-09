(function (global) {
    const Browser = global.Browser;
    const MANIFEST = Browser.getManifest();
    const BASE_URL = Browser.baseUrl();

    class EpubPress {
        static compareVersion(versionData) {
            const apiSupported = Number(versionData.minCompatible.replace('.', ''));
            const currentVersion = Number(MANIFEST.version.replace('.', ''));

            if (apiSupported > currentVersion) {
                if (versionData.message) {
                    $('#alert-message').text(versionData.message);
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
            }).fail((xhr) => {
                console.error('Version Check Failed:');
                console.error(xhr);
            });
        }

        static requestEbook(book) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/api/books`,
                    method: 'POST',
                    data: JSON.stringify(book),
                    contentType: 'application/json',
                })
                .done((response) => {
                    resolve(response.id);
                })
                .fail((xhr) => {
                    const msg = Browser.getErrorMsg('Book create', xhr);
                    console.log(msg);
                    reject(msg);
                })
                .always((xhr) => {
                    console.log(xhr);
                });
            });
        }

        static downloadEbook(params) {
            return new Promise((resolve, reject) => {
                if (params.id) {
                    const queryString = $.param(params);
                    const url = `${BASE_URL}/api/books/download?${queryString}`;

                    if (params.email && params.email.length > 0) {
                        $.ajax({ url }).done(() => {
                            resolve();
                        }).fail((xhr) => {
                            const msg = Browser.getErrorMsg('Book download', xhr);
                            reject(msg);
                        });
                    } else {
                        Browser.download({ url }).then(resolve).catch((error) => {
                            const msg = Browser.getErrorMsg('Book download', error);
                            reject(msg);
                        });
                    }
                }
            });
        }
    }

    global.EpubPress = EpubPress; // eslint-disable-line
}(window));
