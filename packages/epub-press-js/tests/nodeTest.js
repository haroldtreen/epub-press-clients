const EpubPress = require('../build/index');

const book = new EpubPress({
    title: 'A book',
    description: 'A book',
    urls: [
        'http://www.cbc.ca/news/canada/toronto/penny-oleksiak-coach-1.3712572',
    ],
});

book.publish().then(() => {
    return book.download();
}).then(() => {
    console.log('done');
}).catch(console.log);
