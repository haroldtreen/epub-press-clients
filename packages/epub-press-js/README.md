# epub-press-js

[![npm](https://img.shields.io/npm/v/epub-press-js.svg?maxAge=2592000)](https://www.npmjs.com/package/epub-press-js)
[![npm](https://img.shields.io/npm/dt/epub-press-js.svg?maxAge=2592000)](https://www.npmjs.com/package/epub-press-js)

> A javascript client for building books with [EpubPress](https://epub.press).

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

```bash
# Single build
npm run-script build

# Build + watch
npm start
```

### Usage

##### Browser
```html
<script src="node_modules/epub-press-js/build/index.js"></script>
<script>var EpubPress = window.EpubPress;</script>
```

##### NodeJS
```js
const EpubPress = require('epub-press-js');
```

##### Creating a Book

```js
const ebook = new EpubPress({
    title: 'Best of HackerNews',
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
    title: 'Best of HackerNews',
    description: 'Favorite articles from HackerNews in May, 2016',
    urls: [
        'http://medium.com/@techBlogger/why-js-is-dead-long-live-php'
    ]
});
```

##### Publishing
```js
ebook.publish().then(() =>
    ebook.download();  // Default epub
    // or ebook.email('epubpress@gmail.com')
).then(() => {
    console.log('Success!');
}).catch((error) => {
    console.log(`Error: ${error}`);
});
```

##### Checking Status
```js
ebook.checkStatus().then((status) => {

}).catch((error) => {});
```

##### Event Listening
```js
const onStatusUpdate = (status) => { console.log(status.message); };

// Adding callback
ebook.on('statusUpdate', onStatusUpdate);

// Removing callback
ebook.removeListener('statusUpdate', onStatusUpdate)
```

##### Check for updates

```js
// epub-press-js updates
EpubPress.checkForUpdates().then((message) => {
    console.log(message); // Undefined if no update required
});

// epub-press-chrome updates
EpubPress.checkForUpdates('epub-press-chrome', '0.9.0').then((message) => {
    console.log(message);
});
```

### API

##### **`new EpubPress(metadata) => ebook`**
- `metadata.sections`: Object with the url and html for a chapter.
- `metadata.urls`: Array of urls.
- `metadata.title`: Title for the book.
- `metadata.description`: Description for the book.
- `metadata.filetype`: File format to use for downloads.

##### **`ebook.publish() => Promise`**

##### **`ebook.download(filetype) => Promise`**
- `filetype`: `'mobi'` or `'epub'` (Default `'epub'`)

##### **`ebook.email(email, filetype) => Promise`**
- `filetype`: `'mobi'` or `'epub'` (Default `'epub'`)
- `email`: Email address to deliver ebook to.

##### **`ebook.checkStatus() => Promise => status`**
- `status.progress`: Percentage complete. (0 -> 100)
- `status.message`: Status message.

##### **`ebook.on('statusUpdate', (status) => {}) => callback`**
- `status.progress`: Percentage complete. (0 -> 100)
- `status.message`: Description of current step.

##### **`ebook.removeListener(eventName, callback)`**
- `eventName`: Name of the event `callback` exists on.
- `callback`: Listener to be removed.

##### **`EpubPress.checkForUpdates(clientName, clientVersion) => Promise => Update Message | undefined`**
- `clientName`: EpubPress client library to check. (Default: `epub-press-js`)
- `clientVersion`: Version of client. (Default: `EpubPress.VERSION`)

### Issues

- Safari downloads the file as `Unknown`. You then must manually add the file extension (eg. `.epub` or `.mobi`)

Feel free to report any other issues:

- In the Github repo: https://github.com/haroldtreen/epub-press-clients
- By email: support@epub.press

### Related

- Website: https://epub.press
- Chrome Extension: https://chrome.google.com/webstore/detail/epubpress-create-ebooks-f/pnhdnpnnffpijjbnhnipkehhibchdeok
