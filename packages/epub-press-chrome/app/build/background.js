/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// Service worker compatible version - implements EpubPress functionality without DOM dependencies
const manifest = chrome.runtime.getManifest();
const DOWNLOAD_TIMEOUT = 300000; // 5 minutes timeout for downloads

const BASE_API = `${manifest.homepage_url}api/v1`;
const POLL_RATE = 3000; // 3 seconds between status checks

const CHECK_STATUS_LIMIT = 100; // Maximum status checks
// Error codes from EpubPress library

const ERROR_CODES = {
  0: 'Server is down. Please try again later.',
  400: 'There was a problem with the request. Is EpubPress up to date?',
  404: 'Resource not found.',
  500: 'Unexpected server error.',
  503: 'Server took too long to respond.',
  timeout: 'Request took too long to complete.',
  error: undefined,
  // Download Errors
  SERVER_FAILED: 'Server error while downloading.',
  SERVER_BAD_CONTENT: 'Book could not be found'
};

function isPopupMsg(sender) {
  return sender.url.indexOf('popup') > -1;
}

function timeoutDownload() {
  chrome.storage.local.set({
    downloadState: false,
    publishStatus: '{}'
  });
  chrome.runtime.sendMessage({
    action: 'download',
    status: 'failed',
    error: 'Download timed out'
  });
}

function checkResponseStatus(response) {
  const defaultErrorMsg = ERROR_CODES[response.status];

  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.body) {
    return response.json().then(body => {
      const hasErrorMsg = body.errors && body.errors.length > 0;
      const errorMsg = hasErrorMsg ? body.errors[0].detail : defaultErrorMsg;
      return Promise.reject(new Error(errorMsg));
    });
  }

  const error = new Error(defaultErrorMsg);
  return Promise.reject(error);
}

function normalizeError(err) {
  const knownError = ERROR_CODES[err.message] || ERROR_CODES[err.name];

  if (knownError) {
    return new Error(knownError);
  }

  return err;
}

function buildQuery(params) {
  const query = ['email', 'filetype'].map(paramName => params[paramName] ? `${paramName}=${encodeURIComponent(params[paramName])}` : '').filter(paramStr => paramStr).join('&');
  return query ? `?${query}` : '';
}

function getPublishParams(bookData) {
  const body = {
    title: bookData.title,
    description: bookData.description
  };

  if (bookData.sections) {
    body.sections = bookData.sections;
  } else {
    body.urls = bookData.urls.slice();
  }

  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
} // Service worker compatible EpubPress client


class ServiceWorkerEpubPress {
  constructor(bookData) {
    this.bookData = Object.assign({}, bookData);
    this.isPublishing = false;
  }

  getId() {
    return this.bookData.id;
  }

  getTitle() {
    return this.bookData.title || 'Untitled';
  }

  getFiletype() {
    return this.bookData.filetype || 'epub';
  }

  getPublishUrl() {
    return `${BASE_API}/books`;
  }

  getStatusUrl() {
    return `${this.getPublishUrl()}/${this.getId()}/status`;
  }

  getDownloadUrl(filetype = this.getFiletype()) {
    const query = buildQuery({
      filetype
    });
    return `${this.getPublishUrl()}/${this.getId()}/download${query}`;
  }

  getEmailUrl(email, filetype = this.getFiletype()) {
    const query = buildQuery({
      email,
      filetype
    });
    return `${this.getPublishUrl()}/${this.getId()}/email${query}`;
  }

  checkStatus() {
    return new Promise((resolve, reject) => {
      fetch(this.getStatusUrl()).then(checkResponseStatus).then(response => response.json()).then(body => {
        resolve(body);
      }).catch(e => {
        const error = normalizeError(e);
        reject(error);
      });
    });
  }

  trackPublishStatus() {
    return new Promise((resolve, reject) => {
      const trackingCallback = checkStatusCounter => {
        this.checkStatus().then(status => {
          // Emit status update via Chrome messaging
          chrome.storage.local.set({
            publishStatus: JSON.stringify(status)
          });
          chrome.runtime.sendMessage({
            action: 'publish',
            progress: status.progress,
            message: status.message
          });

          if (Number(status.progress) >= 100) {
            resolve(this);
          } else if (checkStatusCounter >= CHECK_STATUS_LIMIT) {
            reject(new Error(ERROR_CODES[503]));
          } else {
            setTimeout(trackingCallback, POLL_RATE, checkStatusCounter + 1);
          }
        }).catch(reject);
      };

      trackingCallback(1);
    });
  }

  publish() {
    if (this.isPublishing) {
      return Promise.reject(new Error('Publishing in progress'));
    } else if (this.getId()) {
      return Promise.resolve(this.getId());
    }

    this.isPublishing = true;
    return new Promise((resolve, reject) => {
      fetch(this.getPublishUrl(), getPublishParams(this.bookData)).then(checkResponseStatus).then(response => response.json()).then(({
        id
      }) => {
        this.bookData.id = id;
        return this.trackPublishStatus().then(() => {
          resolve(id);
        });
      }).catch(e => {
        this.isPublishing = false;
        const error = normalizeError(e);
        reject(error);
      });
    });
  }

  email(email, filetype) {
    return new Promise((resolve, reject) => {
      const emailData = {
        email,
        filetype
      };
      fetch(this.getEmailUrl(email, filetype), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      }).then(checkResponseStatus).then(() => resolve()).catch(e => {
        const error = normalizeError(e);
        reject(error);
      });
    });
  }

  download(params) {
    return new Promise((resolve, reject) => {
      chrome.downloads.download(params, downloadId => {
        const downloadListener = downloadInfo => {
          if (downloadInfo && downloadInfo.id === downloadId) {
            if (downloadInfo.error) {
              chrome.downloads.onChanged.removeListener(downloadListener);
              reject(downloadInfo.error);
            } else if (downloadInfo.endTime || downloadInfo.state.current === 'complete') {
              chrome.downloads.onChanged.removeListener(downloadListener);
              resolve();
            }
          } else {
            reject(chrome.runtime.lastError);
          }
        };

        chrome.downloads.onChanged.addListener(downloadListener);
      });
    });
  }

} // Register message listener at the top level (required for service workers)


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (isPopupMsg(sender) && request.action === 'download') {
    chrome.storage.local.set({
      downloadState: true,
      publishStatus: '{}'
    });
    const timeout = setTimeout(timeoutDownload, DOWNLOAD_TIMEOUT);
    chrome.storage.local.get(['email', 'filetype']).then(state => {
      const book = new ServiceWorkerEpubPress(Object.assign({}, request.book));
      book.publish().then(() => {
        const email = state.email && state.email.trim();
        const {
          filetype
        } = state;
        return email ? book.email(email, filetype) : book.download({
          filename: `${book.getTitle()}.${filetype || book.getFiletype()}`.replace(/[<>:"/\\|?*]/g, '_'),
          url: book.getDownloadUrl(filetype)
        });
      }).then(() => {
        clearTimeout(timeout);
        chrome.storage.local.set({
          downloadState: false,
          publishStatus: '{}'
        });
        chrome.runtime.sendMessage({
          action: 'download',
          status: 'complete'
        });
      }).catch(e => {
        clearTimeout(timeout);
        chrome.storage.local.set({
          downloadState: false,
          publishStatus: '{}'
        });
        chrome.runtime.sendMessage({
          action: 'download',
          status: 'failed',
          error: e.message
        });
      });
    }); // Return true to indicate we will send a response asynchronously

    return true;
  }
});

/***/ })
/******/ ]);