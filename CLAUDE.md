# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a monorepo containing client packages for [EpubPress](https://epub.press), a service that stitches web articles into ebooks. The three packages are:

- **`epub-press-js`** — Isomorphic JS library (npm package) for interacting with the EpubPress API
- **`epub-press-chrome`** — Chrome extension that consumes `epub-press-js`
- **`epub-press-widgets`** — Placeholder; not yet implemented

Each package is self-contained with its own `node_modules`, `package.json`, and `webpack.config.js`. There is no shared build tooling at the root level — all commands are run from within the individual package directory.

## Commands

All commands must be run from the relevant package directory (e.g., `cd packages/epub-press-js`).

### epub-press-js

```bash
npm install          # install dependencies
npm run build        # single webpack build (development)
npm start            # build + watch
npm run build-prod   # production build (runs before npm publish)
npm test             # builds test bundle, opens browser at localhost:5001/tests
node tests/nodeTest.js   # Node.js integration test (manual)
```

### epub-press-chrome

```bash
npm install          # install dependencies
npm run build        # single webpack build (development)
npm start            # build + watch
npm run build-prod   # production build for release
npm test             # builds test bundle, opens browser at localhost:5001/tests
```

## Architecture

### epub-press-js

Single source file: `epub-press.js`. Webpack bundles it to `build/index.js` as a **UMD module** (works in browser via `window.EpubPress` and in Node via `require`).

The `EpubPress` class wraps the REST API at `https://epub.press/api/v1`. The publish flow is asynchronous: `publish()` POSTs to `/books`, receives an ID, then polls `/books/:id/status` every 3 seconds (up to 40 times) until `progress >= 100`. Status updates are emitted as `statusUpdate` events. After publishing, the caller calls `download()` or `email()`.

`BASE_API` is derived from `package.json`'s `baseUrl` field at build time.

### epub-press-chrome

Chrome Manifest V2 extension. Webpack produces two entry points into `app/build/`:

- **`popup.js`** (`scripts/popup.js`) — UI logic for the extension popup. Reads tab list, handles form interactions, and communicates with the background script via `chrome.runtime.sendMessage`.
- **`background.js`** (`scripts/background.js`) — Persistent background script that does the actual `EpubPress` API calls. Receives `download` action from popup, calls `book.publish()`, then either downloads or emails the result. Relays `statusUpdate` events back to the popup as `publish` messages.

**Key detail:** `background.js` overrides `EpubPress.BASE_API` using `manifest.homepage_url`, so pointing `homepage_url` in `manifest.json` to `http://localhost:3000` redirects all API calls to a local EpubPress server.

`browser.js` — thin abstraction over `chrome.*` APIs (tabs, storage, downloads, messaging).
`ui.js` — DOM manipulation for the popup (section visibility, progress animation, tab list rendering).

### Testing

Both packages use **browser-based tests only** (mocha + mocha-loader + webpack-dev-server). `npm test` sets `NODE_ENV=test` (or `ENV=test` for the chrome package), which switches the webpack config to bundle tests instead of the library, then opens `http://localhost:5001/tests` in the browser. There is no CLI test runner.

Tests live in `tests/` and are discovered via `require.context` in `tests/index.js` (matching `*-test.js` files).

## Local Development with Chrome Extension

To load the unpacked extension:
1. Run `npm run build` in `packages/epub-press-chrome`
2. Go to `chrome://extensions`, enable Developer Mode
3. Click "Load Unpacked" and select `packages/epub-press-chrome/app/`

To point at a local backend, change `homepage_url` in `app/manifest.json` to `http://localhost:3000`.

## Deployment

**epub-press-js:** Bump version in `package.json`, update `CHANGELOG.md`, run `npm publish` (triggers `build-prod` automatically).

**epub-press-chrome:** Run `npm run build-prod`, bump version in `app/manifest.json`, zip the `app/` directory, upload to Chrome and Firefox stores.
