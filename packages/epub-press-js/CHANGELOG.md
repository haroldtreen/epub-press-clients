# Changelog

### 0.5.1
- Fix `email` function

### 0.5.0
- New methods for handling progress events: `ebook.on`, `ebook.removeListener`
- Ability to get progress updates through `ebook.on('statusUpdate', () => {})`
- Switch to `v1` api. Book publishes are now asynchronous.

### 0.4.0
- API update for `checkForUpdates`.
- Better error handling.

### 0.3.1
- Fix for filetype not being used.
- Fix download.
- Files built properly.

### 0.3.0
- `book.download()` can accept a filetype.
- New `book.emailDelivery()` method for email delivery.
- Change `book.checkForUpdate()` to `book.checkForUpdates()`
