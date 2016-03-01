# epub-press-chrome
Chrome extension for pushing articles to Epub Press.

## Overview
Epub Press is a service for stitching your backlog of unread articles/blogs/webpages into a customized ebook.

It takes an experience that usually sucks (staring at a bright screen and clicking through web articles) and turns it into an experience that rocks (reading on your ereader!).

## Usage
1. [Install the extension](#install)
2. Open all the articles you want in your ebook as seperate tabs.
3. Click on the extension.
4. Select the articles you want in your ebook.
5. Click `Download`

The extension will make a request to the Epub Press webservice with your desired articles. The service will then take all the content, stitch it into a book and download it to your computer. From there you can read it using your favorite Ereader!

## Install

Currently, this extension is unreleased and still under development. To load it and get a sneak peak, you will need to do the following.

1. Enable 'Developer Mode' in Chrome.
    - Go to `chrome://extensions/`.
    - Check the `Developer Mode` checkbox.
1. Navigate to the `epub-press-chrome` repository: https://github.com/haroldtreen/epub-press-chrome
1. Download the repo as a zip file (or clone it)
1. Unzip the file
1. Go to `chrome://extensions/` and click `Load Unpacked Extension...`
1. Navigate to folder for this repo, and select the `app` folder to load.
 
This should load the extension and you should be good to go :).

## Future Additions
- Install through the Chrome Extension Store.
- Support for formats other then `epub`.
- Ability to send the file directly to your reader.
- Ability to share your generated creations with others.


