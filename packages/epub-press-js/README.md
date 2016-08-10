# epub-press-js

A javascript client for building books with [EpubPress](https://epub.press) - https://epub.press

### Install

```
npm install --save epub-press-js
```

### Test

```
npm test
```

### Build

```
npm run-script build
```

### Usage

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

##### Email + Custom Filetypes

```js
const ebook = new EpubPress({
    email: 'epubpress@kindle.com',
    filetype: 'mobi', // or 'epub'
    /* Book sections */
    /* ... */
});
```

### Issues

Feel free to report any issues:

- In the Github repo: https://github.com/haroldtreen/epub-press-clients
- By email: support@epub.press


### Todo
- [x] NodeJS Support
