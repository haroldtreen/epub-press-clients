# Deployment

`epub-press-js` is a npm package.

To deploy a new version:

*   Make sure dependencies are up to date.
*   `npm install`
*   Update `package.json` with a new version number (following [semver](https://semver.org/)).
*   Update `CHANGELOG.md` with a list of changes in the new version.
*   `npm publish` (this also runs the `build-prod` script which will bundle everything before deploy).
