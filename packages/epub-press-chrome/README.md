# epub-press-chrome

[![npm](https://img.shields.io/npm/v/epub-press-js.svg?maxAge=2592000)](https://www.npmjs.com/package/epub-press-js)
[![npm](https://img.shields.io/npm/dt/epub-press-js.svg?maxAge=2592000)](https://www.npmjs.com/package/epub-press-js)

> A browser extension for creating ebooks from your tabs!

Available on the [Chrome Store](https://chrome.google.com/webstore/detail/epubpress-create-ebooks-f/pnhdnpnnffpijjbnhnipkehhibchdeok)

## Development

### Build

```bash
# Development

npm start
# or
npm run build

# Production
npm run build-prod
```

### Test

```
npm test
```

## Usage with local server

1. Download the files:  
`git clone https://github.com/haroldtreen/epub-press-clients`.
1. Open the extension `manifest.json`:  
`open epub-press-clients/packages/epub-press-chrome/app/manifest.json`.
1. Change the `homepage_url` to point to your local server:  
~~`"homepage_url": "https://epub.press"`~~ --> `"homepage_url": "http://localhost:3000"`
1. Go to your extension manager:  
`chrome://extensions`
1. Enable `Developer Mode`:  
:white_check_mark: Developer Mode
1. Click `Load Unpacked Extension`.
1. Navigate to the `epub-press-clients` folder and select `epub-press-clients/packages/epub-press-chrome/app/`.

Done! 

Another instance of EpubPress will appear. When using this version of the extension, it will use your local server for building ebooks.

To learn about setting up a local server, see the [haroldtreen/epub-press](https://github.com/haroldtreen/epub-press) repo.
