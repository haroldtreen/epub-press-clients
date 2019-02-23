# Deployment

`epub-press-chrome` is a browser extension for Chrome/Firefox.

To deploy a new version:

-   Make sure dependencies are up to date.
-   `npm install`
-   `npm run build-prod` (updates the files in `/build`)
-   Update the version in the `manifest.json` (following [semver](https://semver.org/)).
-   Make sure the manifest `homepage_url` points to the correct host.
-   Zip all the files in `/app` into an `app.zip`.
-   Upload the `app.zip` to the [Chrome store](https://chrome.google.com/webstore/developer/dashboard).
-   Upload the `app.zip` to the [Firefox store](https://addons.mozilla.org/en-US/developers/addons).
-   Update the CHANGELOG.
-   Create a new release on Github with an `epub-press-x.x.x.crx` file.
