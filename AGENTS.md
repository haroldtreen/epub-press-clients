# Repository Guidelines

This repository is a small multi-package workspace for EpubPress clients: a Chrome extension, a JS library, and publisher widgets. In practice, day-to-day work is focused on the Chrome extension; the other packages are mostly legacy and rarely updated. Most work happens inside `packages/`.

## Project Structure & Module Organization
- `packages/epub-press-chrome/`: Chrome extension. UI assets live in `app/` (manifest, popup HTML, styles), extension logic in `scripts/`, tests in `tests/`, and icons in `images/`.
- `packages/epub-press-js/`: core client library (legacy). Source is `epub-press.js`, bundled output in `build/`, tests in `tests/`.
- `packages/epub-press-widgets/`: widget bundle (legacy). Entry is `widgets.js`, tests in `tests/`.
- `screenshots/`: marketing and documentation images.

## Build, Test, and Development Commands
Run commands from the package you are working in.
- Install deps: `npm install`.
- Chrome extension: `npm start` (watch), `npm run build` (dev bundle), `npm run build-prod` (production), `npm test` (webpack-dev-server + opens `http://localhost:5001/tests`).
- JS library: `npm start` (watch), `npm run build`, `npm run build-prod`, `npm test` (browser runner), `node tests/nodeTest.js` for Node coverage.
- Widgets: `npm test` is a placeholder; no build script is defined in `package.json`.

## Coding Style & Naming Conventions
- Indent with 4 spaces, LF line endings, trim trailing whitespace (see `.editorconfig`).
- ESLint uses `airbnb` plus repo overrides; run `npx eslint .` from the repo root.
- Use camelCase for variables/functions, PascalCase for classes (e.g., `ItemWidget`), and `*-test.js` for test files.

## Testing Guidelines
- Tests use Mocha + Chai with webpack/mocha-loader in browser packages.
- Place tests under each package’s `tests/` folder; `tests/index.js` auto-loads files matching `*-test.js`.
- For node-only checks, use `packages/epub-press-js/tests/nodeTest.js`.

## Commit & Pull Request Guidelines
- History shows short, imperative summaries and occasional prefixes like `dep:` for dependency updates; follow that style (e.g., `dep: add cross-env`).
- PRs should explain the change, list test steps, and link issues. Include screenshots for UI changes in the Chrome extension or widgets.
