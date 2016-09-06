# epub-press-js

[![npm](https://img.shields.io/npm/v/epub-press-js.svg?maxAge=2592000)](https://www.npmjs.com/package/epub-press-js)
[![npm](https://img.shields.io/npm/dt/epub-press-js.svg?maxAge=2592000)](https://www.npmjs.com/package/epub-press-js)

A javascript client for building books with [EpubPress](https://epub.press).

### Install

```
npm install --save epub-press-js
```

### Test

**Unit Tests**
```
npm test
```

**Browser Test**
```
open tests/browserTest.html
```

**NodeJS Test**
```
node tests/nodeTest.js
```

### Build

```
// Single build
npm run-script build

// Build + watch
npm start
```

### Usage

#### Browser
```html
<script src="node_modules/epub-press-js/build/index.js"></script>
```

```js
const EpubPress = window.EpubPress;

const ebook = new EpubPress({
    title: 'Best of HackerNews'
    description: 'Favorite articles from HackerNews in May, 2016',
    sections: [
        {
            url: 'http://medium.com/@techBlogger/why-javascript-is-dead-long-live-php',
            html: '<html><body><p>Lulz.</p></body></html>',
        }
    ]
});

// OR

const ebook = new EpubPress({
    title: 'Best of HackerNews'
    description: 'Favorite articles from HackerNews in May, 2016',
    urls: [
        'http://medium.com/@techBlogger/why-js-is-dead-long-live-php'
    ]
});

ebook.publish().then(() =>
    ebook.download() // Default epub + download
    // or ebook.emailDelivery('epubpress@gmail.com')
).then(() => {
    console.log('Success!');
}).catch((error) => {
    console.log(`Error: ${error}`);
});
```

##### NodeJS
```js
const EpubPress = require('epub-press-js');

// Same as above
```

##### Check for updates

```js
EpubPress.checkForUpdates().then((message) => {
    console.log(message); // Undefined if no update required
});
```

### API

##### **`new EpubPress(metadata) => book`**

Valid properties for `metadata`:
- `sections`: Object with the url and html for a chapter.
- `urls`: Array of urls.
- `title`: Title for the book.
- `description`: Description for the book.

##### **`book.publish() => Promise`**

##### **`book.download(filetype) => Promise`**
- `filetype`: `'mobi'` or `'epub'` (Default `'epub'`)

##### **`book.emailDelivery(email, filetype) => Promise`**
- `filetype`: `'mobi'` or `'epub'` (Default `'epub'`)
- `email`: Email address to deliver ebook to.

##### **`EpubPress.checkForUpdates(clientName, clientVersion) => Promise => Update Message | undefined`**
- `clientName`: EpubPress client library to check. (Default: 'epub-press-js')
- `clientVersion`: Version of client. (Default: `EpubPress.VERSION`)

### Issues

- Safari downloads the file as `Unknown`. You then must manually add the file extension (eg. `.epub` or `.mobi`)

Feel free to report any other issues:

- In the Github repo: https://github.com/haroldtreen/epub-press-clients
- By email: support@epub.press

### Related

 - Website: https://epub.press
 - Chrome Extension: https://chrome.google.com/webstore/detail/epubpress-create-ebooks-f/pnhdnpnnffpijjbnhnipkehhibchdeok
