# epub-press-widgets

A collection of widgets for easily adding EpubPress publishing to your site.

### Install
```
npm install --save epub-press-widgets
```

### Build
```
npm run-script build
```

### Test
```
npm test
```

## Item Widget
The item widget lets the user download the current page as an ebook.

### Usage

```js
import { ItemWidget } from 'epub-press-widgets';

const item = new ItemWidget('#epub-press-item'); // Initialize the button within a container.

// Listen for lifecycle events
item.on('publish-start', (book) => { alert('The current webpage is being pressed!') });
item.on('publish-end', (book) => { alert('The current webpage has been published!') });

item.on('download-start', (book) => { alert('Your book is being downloaded!') });
item.on('download-end', (book) => { alert('Thanks for reading!') });
```

## List Widget
The list widget displays a list of links that the user can select from for creating a book.

### Usage

```js
import { ListWidget } from 'epub-press-widgets';

const list = new ListWidget('#epub-press-list'); // Initialize a list within a container.

// Set the items of the list
list.set([
    { title: 'Blog Post 1', url: 'http://blog.com/article/1'},
    { title: 'Blog Post 2', url: 'http://blog.com/article/2'},
    { title: 'Blog Post 3', url: 'http://blog.com/article/3'},
]);

// Dynamically add items
list.add({ title: 'EpubPress', url: 'https://epub.press' });

// Dynamically remove items
list.remove('Blog Post 1'); // Using title
list.remove('http://blog.com/article/2'); // Usiing url

// Listen for events
list.on('publish-start', (book) => {
    alert('Your book will be ready in a bit!');
});

list.on('publish-end', (book) => {
    alert('Your book now exists on EpubPress');
});

list.on('download-start', (book) => {
    alert('Your book is being download');
});

list.on('download-end', (book) => {
    alert('Thanks for creating a book!');
});
```

## Todo
- [ ] List widget
- [ ] Item widget
