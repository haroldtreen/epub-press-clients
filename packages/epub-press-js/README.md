# epub-press-js

A javascript library for building books with [EpubPress](https://epub.press)

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

```js
import EpubPress from 'epub-press-js';

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
