# epub-press-js

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
serve && open tests/browserTest.html
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
    ebook.download()
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

##### Email + Custom Filetypes

```js
const ebook = new EpubPress({
    email: 'epubpress@kindle.com',
    filetype: 'mobi', // or 'epub'
    /* Book sections */
    /* ... */
});
```

##### Check for updates

```js
EpubPress.checkForUpdate().then((message) => {
    console.log(message); // Undefined if no update required
});
```



### Issues

- Safari downloads the file as `Unknown`. You then must manually add the file extension (eg. `.epub` or `.mobi`)

Feel free to report any other issues:

- In the Github repo: https://github.com/haroldtreen/epub-press-clients
- By email: support@epub.press

### Related

 - Website: https://epub.press
 - Chrome Extension: https://chrome.google.com/webstore/detail/epubpress-create-ebooks-f/pnhdnpnnffpijjbnhnipkehhibchdeok

### Todo
- [x] NodeJS Support (https://github.com/haroldtreen/epub-press-clients/issues/4)
