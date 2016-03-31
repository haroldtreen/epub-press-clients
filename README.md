# epub-press-chrome
Chrome extension for pushing articles to Epub Press.

[Website](http://epub.press)

## Overview
Epub Press is a service for stitching articles/blogs/webpages into a customized ebook.

#### **Why would I use this?**

Reading on an eReader is a much nicer experience then reading in a web browser.

- eReader screens are easier on your eyes.
- eBooks don't require an internet connection.
- eBooks don't have distracting ads, menus and banners. Only. Content.
- eBooks let you group information together (eg. "News from this week", "Top 10 travel articles").
- Reading with a book is more comfortable then sitting in front of a computer.
- Flipping pages is nicer then clicking through tabs.
- eBooks are easier to share with friends than lists of URLs.

## Install:
1. Download the `epub-press-<version>.crx` file from the [releases section](https://github.com/haroldtreen/epub-press-chrome/releases).
1. Open Chrome.
1. Navigate to `chrome://extensions/`.
1. Drag and drop the `epub-press-<version>.crx` file onto the chrome window.
  ![drag-to-chrome](https://cloud.githubusercontent.com/assets/1745854/14151355/1a5a4c48-f673-11e5-875c-1fce3a3bcec9.png)
1. Click **Add Extension**.  
  ![image](https://cloud.githubusercontent.com/assets/1745854/13517595/c04b634e-e192-11e5-90e3-ce4899617d10.png)
1. The icon should now be in your menu bar.  
  ![image](https://cloud.githubusercontent.com/assets/1745854/13517609/e05ec9f0-e192-11e5-8ab3-16f757318fbc.png)

## Usage:
1. Click on the extensions icon.  
  ![image](https://cloud.githubusercontent.com/assets/1745854/13517662/9a554690-e193-11e5-856f-c9ae86800735.png)
1. Select the articles you want in your book.  
  ![image](https://cloud.githubusercontent.com/assets/1745854/13517673/c29eb03c-e193-11e5-9f82-aa5e6d200d5c.png)
1. Click `Download`.
1. A spinner will show as the book is created.
1. A digital book file will download that you can load onto your ereader.

## Settings
- **Filetype:** Specifies the type of ebook file you want to create.  
  - `.epub` is more standard
  - `.mobi` is compatible with kindle
- **Email:** Allows you to have your ereader file delivered by email instead of download. For some eReaders (such as Kindle), you can specify your an email that will deliver the file directly to your device (eg. `johndoe@kindle.com`).  
  - **Note:** In the Kindle example you will first need to whitelist `epubpress@gmail.com` in order to receive files from the email service. This can be done by logging into Amazon and going to: *Account > Manage Your Content and Devices > Settings.
  - To switch back to having your ebook returned as downloads, delete the email from the extension settings.*

## Bug Reporting:
**This extension is still under development and could stop working at any time.**

Support requests can be sent to support@epub.press.

**Please include:**
- Version of Chrome
- Operating system
- Description of how to reproduce the problem
- Screenshots

## Future Additions
- Install through the Chrome Extension Store.
- ~~Support for formats other then `epub` (in the meantime - check out [Calibre](https://calibre-ebook.com/)).~~
- ~~Ability to send the file directly to your reader.~~
- Ability to share your generated creations with others.
- Integration with [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall?hl=en)

Have any awesome ideas? Suggestions? Feature requests? Would love to hear them!  
feedback@epub.press
