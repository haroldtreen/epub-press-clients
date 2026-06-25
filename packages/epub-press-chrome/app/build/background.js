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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2018 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.7.2
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(e){if(true)module.exports=e();else { var f; }}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}
var schedule = _dereq_("./schedule");
var Queue = _dereq_("./queue");

function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

Async.prototype.invokeLater = AsyncInvokeLater;
Async.prototype.invoke = AsyncInvoke;
Async.prototype.settlePromises = AsyncSettlePromises;


function _drainQueue(queue) {
    while (queue.length() > 0) {
        _drainQueueStep(queue);
    }
}

function _drainQueueStep(queue) {
    var fn = queue.shift();
    if (typeof fn !== "function") {
        fn._settlePromises();
    } else {
        var receiver = queue.shift();
        var arg = queue.shift();
        fn.call(receiver, arg);
    }
}

Async.prototype._drainQueues = function () {
    _drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    _drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

module.exports = Async;
module.exports.firstLineError = firstLineError;

},{"./queue":26,"./schedule":29}],3:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = _dereq_("./promise")();
bluebird.noConflict = noConflict;
module.exports = bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

var getMethodCaller;
var getGetter;
if (false) { var getCompiled, makeGetter, makeMethodCaller; }

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util.classString(obj) + " has no method '" +
            util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var args = [].slice.call(arguments, 1);;
    if (false) { var maybeCaller; }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(NEXT_FILTER) {
var util = _dereq_("./util");
var getKeys = _dereq_("./es5").keys;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, Context,
    enableAsyncHooks, disableAsyncHooks) {
var async = Promise._async;
var Warning = _dereq_("./errors").Warning;
var util = _dereq_("./util");
var es5 = _dereq_("./es5");
var canAttachTrace = util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                        ( true ||
                         false));

var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

var deferUnhandledRejectionCheck;
(function() {
    var promises = [];

    function unhandledRejectionCheck() {
        for (var i = 0; i < promises.length; ++i) {
            promises[i]._notifyUnhandledRejection();
        }
        unhandledRejectionClear();
    }

    function unhandledRejectionClear() {
        promises.length = 0;
    }

    deferUnhandledRejectionCheck = function(promise) {
        promises.push(promise);
        setTimeout(unhandledRejectionCheck, 1);
    };

    es5.defineProperty(Promise, "_unhandledRejectionCheck", {
        value: unhandledRejectionCheck
    });
    es5.defineProperty(Promise, "_unhandledRejectionClear", {
        value: unhandledRejectionClear
    });
})();

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    deferUnhandledRejectionCheck(this);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var context = Promise._getContext();
    possiblyUnhandledRejection = util.contextBind(context, fn);
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var context = Promise._getContext();
    unhandledRejectionHandled = util.contextBind(context, fn);
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        var Promise_dereferenceTrace = Promise.prototype._dereferenceTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Promise.prototype._dereferenceTrace = Promise_dereferenceTrace;
            Context.deactivateLongStackTraces();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Promise.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
        Context.activateLongStackTraces();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};


var legacyHandlers = {
    unhandledrejection: {
        before: function() {
            var ret = util.global.onunhandledrejection;
            util.global.onunhandledrejection = null;
            return ret;
        },
        after: function(fn) {
            util.global.onunhandledrejection = fn;
        }
    },
    rejectionhandled: {
        before: function() {
            var ret = util.global.onrejectionhandled;
            util.global.onrejectionhandled = null;
            return ret;
        },
        after: function(fn) {
            util.global.onrejectionhandled = fn;
        }
    }
};

var fireDomEvent = (function() {
    var dispatch = function(legacy, e) {
        if (legacy) {
            var fn;
            try {
                fn = legacy.before();
                return !util.global.dispatchEvent(e);
            } finally {
                legacy.after(fn);
            }
        } else {
            return !util.global.dispatchEvent(e);
        }
    };
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                name = name.toLowerCase();
                var eventData = {
                    detail: event,
                    cancelable: true
                };
                var domEvent = new CustomEvent(name, eventData);
                es5.defineProperty(
                    domEvent, "promise", {value: event.promise});
                es5.defineProperty(
                    domEvent, "reason", {value: event.reason});

                return dispatch(legacyHandlers[name], domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                name = name.toLowerCase();
                var domEvent = new Event(name, {
                    cancelable: true
                });
                domEvent.detail = event;
                es5.defineProperty(domEvent, "promise", {value: event.promise});
                es5.defineProperty(domEvent, "reason", {value: event.reason});
                return dispatch(legacyHandlers[name], domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event) {
                name = name.toLowerCase();
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name, false, true,
                    event);
                return dispatch(legacyHandlers[name], domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
    if ("asyncHooks" in opts && util.nodeSupportsAsyncResource) {
        var prev = config.asyncHooks;
        var cur = !!opts.asyncHooks;
        if (prev !== cur) {
            config.asyncHooks = cur;
            if (cur) {
                enableAsyncHooks();
            } else {
                disableAsyncHooks();
            }
        }
    }
    return Promise;
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) { ; };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    ;
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._dereferenceTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    ;
    ;
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function longStackTracesDereferenceTrace() {
    this._trace = undefined;
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = (firstLineError.stack || "").split("\n");
    var lastStackLines = (lastLineError.stack || "").split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false,
    asyncHooks: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    asyncHooks: function() {
        return config.asyncHooks;
    },
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

},{"./errors":12,"./es5":13,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var Objectfreeze = es5.freeze;
var util = _dereq_("./util");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp(this, "message", message.message);
        notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
var util = _dereq_("./util");
var CancellationError = Promise.CancellationError;
var errorObj = util.errorObj;
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret === NEXT_FILTER) {
            return ret;
        } else if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};


Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

Promise.prototype.tapCatch = function (handlerOrPredicate) {
    var len = arguments.length;
    if(len === 1) {
        return this._passThrough(handlerOrPredicate,
                                 1,
                                 undefined,
                                 finallyHandler);
    } else {
         var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return Promise.reject(new TypeError(
                    "tapCatch statement predicate: "
                    + "expecting an object but got " + util.classString(item)
                ));
            }
        }
        catchInstances.length = j;
        var handler = arguments[i];
        return this._passThrough(catchFilter(catchInstances, handler, this),
                                 1,
                                 undefined,
                                 finallyHandler);
    }

};

return PassThroughHandlerContext;
};

},{"./catch_filter":7,"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = _dereq_("./errors");
var TypeError = errors.TypeError;
var util = _dereq_("./util");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        ;
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var reject;

if (false) { var i, promiseSetters, thenCallbacks, holderClasses, generateHolderClass, promiseSetter, thenCallback; }

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (false) { var context, bitField, maybePromise, i, callbacks, holder, HolderClass, ret; }
    }
    var args = [].slice.call(arguments);;
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var context = Promise._getContext();
    this._callback = util.contextBind(context, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
    if (util.isArray(promises)) {
        for (var i = 0; i < promises.length; ++i) {
            var maybePromise = promises[i];
            if (maybePromise instanceof Promise) {
                maybePromise.suppressUnhandledRejections();
            }
        }
    }
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = _dereq_("./errors");
var OperationalError = errors.OperationalError;
var es5 = _dereq_("./es5");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var args = [].slice.call(arguments, 1);;
            promise._fulfill(args);
        }
        promise = null;
    };
}

module.exports = nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var util = _dereq_("./util");
var async = Promise._async;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util = _dereq_("./util");
util.setReflectHandler(reflectHandler);

var getDomain = function() {
    var domain = process.domain;
    if (domain === undefined) {
        return null;
    }
    return domain;
};
var getContextDefault = function() {
    return null;
};
var getContextDomain = function() {
    return {
        domain: getDomain(),
        async: null
    };
};
var AsyncResource = util.isNode && util.nodeSupportsAsyncResource ?
    _dereq_("async_hooks").AsyncResource : null;
var getContextAsyncHooks = function() {
    return {
        domain: getDomain(),
        async: new AsyncResource("Bluebird::Promise")
    };
};
var getContext = util.isNode ? getContextDomain : getContextDefault;
util.notEnumerableProp(Promise, "_getContext", getContext);
var enableAsyncHooks = function() {
    getContext = getContextAsyncHooks;
    util.notEnumerableProp(Promise, "_getContext", getContextAsyncHooks);
};
var disableAsyncHooks = function() {
    getContext = getContextDomain;
    util.notEnumerableProp(Promise, "_getContext", getContextDomain);
};

var es5 = _dereq_("./es5");
var Async = _dereq_("./async");
var async = new Async();
es5.defineProperty(Promise, "_async", {value: async});
var errors = _dereq_("./errors");
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
var PromiseArray =
    _dereq_("./promise_array")(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = _dereq_("./context")(Promise);
 /*jshint unused:false*/
var createContext = Context.create;

var debug = _dereq_("./debuggability")(Promise, Context,
    enableAsyncHooks, disableAsyncHooks);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise = _dereq_("./nodeback");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
function check(self, executor) {
    if (self == null || self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(executor));
    }

}

function Promise(executor) {
    if (executor !== INTERNAL) {
        check(this, executor);
    }
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._resolveFromExecutor(executor);
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("Catch statement predicate: " +
                    "expecting an object but got " + util.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];

        if (typeof fn !== "function") {
            throw new TypeError("The last argument to .catch() " +
                "must be a function, got " + util.toString(fn));
        }
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var context = getContext();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: util.contextBind(context, handler),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise,
                receiver, context);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    var bitField = this._bitField;
    this._bitField = bitField |
        (((bitField & 536870912) >> 2) ^
        134217728);
};

Promise.prototype._setNoAsyncGuarantee = function() {
    this._bitField = (this._bitField | 536870912) &
        (~134217728);
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    context
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 = util.contextBind(context, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 = util.contextBind(context, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                util.contextBind(context, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                util.contextBind(context, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);


    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(maybePromise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    if (executor === INTERNAL) return;
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
        this._dereferenceTrace();
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    es5.defineProperty(Promise.prototype, Symbol.toStringTag, {
        get: function () {
            return "Object";
        }
    });
}

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async);
Promise.Promise = Promise;
Promise.version = "3.7.2";
_dereq_('./call_get.js')(Promise);
_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise, INTERNAL);
_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./settle.js')(Promise, PromiseArray, debug);
_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
_dereq_('./timers.js')(Promise, INTERNAL, debug);
_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
_dereq_('./any.js')(Promise);
_dereq_('./each.js')(Promise, INTERNAL);
_dereq_('./filter.js')(Promise, INTERNAL);
                                                         
    util.toFastProperties(Promise);                                          
    util.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util.lastLineError);               
    return Promise;                                                          

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36,"async_hooks":undefined}],23:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util = _dereq_("./util");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    case -6: return new Map();
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
        values.suppressUnhandledRejections();
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        ;
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = _dereq_("./util");
var nodebackForPromise = _dereq_("./nodeback");
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = _dereq_("./errors").TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
if (false) { var parameterCount, parameterDeclaration, argumentSequence, switchCaseArgumentOrder; }

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");
var isObject = util.isObject;
var es5 = _dereq_("./es5");
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, isMap ? -6 : -3);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

module.exports = Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var context = Promise._getContext();
    this._fn = util.contextBind(context, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined &&
        this._eachValues !== null &&
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    for (var j = i; j < length; ++j) {
        var maybePromise = values[j];
        if (maybePromise instanceof Promise) {
            maybePromise.suppressUnhandledRejections();
        }
    }

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };

            value = value._then(gotAccum, undefined, undefined, ctx, undefined);

            if ((i & 127) === 0) {
                value._setNoAsyncGuarantee();
            }
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(global, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova)) &&
          ("classList" in document.documentElement)) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
        };

        return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util = _dereq_("./util");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.allSettled = function (promises) {
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = _dereq_("./util");
var RangeError = _dereq_("./errors").RangeError;
var AggregateError = _dereq_("./errors").AggregateError;
var isArray = util.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = _dereq_("./util");
var errorObj = util.errorObj;
var isObject = util.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, debug) {
var util = _dereq_("./util");
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util = _dereq_("./util");
    var TypeError = _dereq_("./errors").TypeError;
    var inherits = _dereq_("./util").inherits;
    var errorObj = util.errorObj;
    var tryCatch = util.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    this !== undefined ? this : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var receiver = new FakeConstructor();
    function ic() {
        return typeof receiver.foo;
    }
    ic();
    ic();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj instanceof Error ||
        (obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string");
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

var hasEnvVariables = typeof process !== "undefined" &&
    typeof process.env !== "undefined";

function env(key) {
    return hasEnvVariables ? process.env[key] : undefined;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if (classString(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

var reflectHandler;
function contextBind(ctx, cb) {
    if (ctx === null ||
        typeof cb !== "function" ||
        cb === reflectHandler) {
        return cb;
    }

    if (ctx.domain !== null) {
        cb = ctx.domain.bind(cb);
    }

    var async = ctx.async;
    if (async !== null) {
        var old = cb;
        cb = function() {
            var args = (new Array(2)).concat([].slice.call(arguments));;
            args[0] = old;
            args[1] = this;
            return async.runInAsyncScope.apply(async, args);
        };
    }
    return cb;
}

var ret = {
    setReflectHandler: function(fn) {
        reflectHandler = fn;
    },
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    contextBind: contextBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version;
    if (process.versions && process.versions.node) {
        version = process.versions.node.split(".").map(Number);
    } else if (process.version) {
        version = process.version.split(".").map(Number);
    }
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();
ret.nodeSupportsAsyncResource = ret.isNode && (function() {
    var supportsAsync = false;
    try {
        var res = _dereq_("async_hooks").AsyncResource;
        supportsAsync = typeof res.prototype.runInAsyncScope === "function";
    } catch (e) {
        supportsAsync = false;
    }
    return supportsAsync;
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
module.exports = ret;

},{"./es5":13,"async_hooks":undefined}]},{},[4])(4)
});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3), __webpack_require__(1), __webpack_require__(9).setImmediate))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) {
   true ? module.exports = e(__webpack_require__(6), __webpack_require__(8)) : undefined;
}(window, function (t, e) {
  return function (t) {
    var e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      var i = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }

    return n.m = t, n.c = e, n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: r
      });
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var i in t) n.d(r, i, function (e) {
        return t[e];
      }.bind(null, i));
      return r;
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 7);
  }([function (t, e, n) {
    (function (e, n, r) {
      var i;
      i = function () {
        var t, i, o;
        return function t(e, n, r) {
          function i(s, a) {
            if (!n[s]) {
              if (!e[s]) {
                var c = "function" == typeof _dereq_ && _dereq_;
                if (!a && c) return c(s, !0);
                if (o) return o(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u;
              }

              var l = n[s] = {
                exports: {}
              };
              e[s][0].call(l.exports, function (t) {
                var n = e[s][1][t];
                return i(n || t);
              }, l, l.exports, t, e, n, r);
            }

            return n[s].exports;
          }

          for (var o = "function" == typeof _dereq_ && _dereq_, s = 0; s < r.length; s++) i(r[s]);

          return i;
        }({
          1: [function (t, e, n) {
            "use strict";

            e.exports = function (t) {
              var e = t._SomePromiseArray;

              function n(t) {
                var n = new e(t),
                    r = n.promise();
                return n.setHowMany(1), n.setUnwrap(), n.init(), r;
              }

              t.any = function (t) {
                return n(t);
              }, t.prototype.any = function () {
                return n(this);
              };
            };
          }, {}],
          2: [function (t, n, r) {
            "use strict";

            var i;

            try {
              throw new Error();
            } catch (t) {
              i = t;
            }

            var o = t("./schedule"),
                s = t("./queue"),
                a = t("./util");

            function c() {
              this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new s(16), this._normalQueue = new s(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
              var t = this;
              this.drainQueues = function () {
                t._drainQueues();
              }, this._schedule = o;
            }

            function u(t, e, n) {
              this._lateQueue.push(t, e, n), this._queueTick();
            }

            function l(t, e, n) {
              this._normalQueue.push(t, e, n), this._queueTick();
            }

            function f(t) {
              this._normalQueue._pushOne(t), this._queueTick();
            }

            c.prototype.setScheduler = function (t) {
              var e = this._schedule;
              return this._schedule = t, this._customScheduler = !0, e;
            }, c.prototype.hasCustomScheduler = function () {
              return this._customScheduler;
            }, c.prototype.enableTrampoline = function () {
              this._trampolineEnabled = !0;
            }, c.prototype.disableTrampolineIfNecessary = function () {
              a.hasDevTools && (this._trampolineEnabled = !1);
            }, c.prototype.haveItemsQueued = function () {
              return this._isTickUsed || this._haveDrainedQueues;
            }, c.prototype.fatalError = function (t, n) {
              n ? (e.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), e.exit(2)) : this.throwLater(t);
            }, c.prototype.throwLater = function (t, e) {
              if (1 === arguments.length && (e = t, t = function () {
                throw e;
              }), "undefined" != typeof setTimeout) setTimeout(function () {
                t(e);
              }, 0);else try {
                this._schedule(function () {
                  t(e);
                });
              } catch (t) {
                throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
              }
            }, a.hasDevTools ? (c.prototype.invokeLater = function (t, e, n) {
              this._trampolineEnabled ? u.call(this, t, e, n) : this._schedule(function () {
                setTimeout(function () {
                  t.call(e, n);
                }, 100);
              });
            }, c.prototype.invoke = function (t, e, n) {
              this._trampolineEnabled ? l.call(this, t, e, n) : this._schedule(function () {
                t.call(e, n);
              });
            }, c.prototype.settlePromises = function (t) {
              this._trampolineEnabled ? f.call(this, t) : this._schedule(function () {
                t._settlePromises();
              });
            }) : (c.prototype.invokeLater = u, c.prototype.invoke = l, c.prototype.settlePromises = f), c.prototype.invokeFirst = function (t, e, n) {
              this._normalQueue.unshift(t, e, n), this._queueTick();
            }, c.prototype._drainQueue = function (t) {
              for (; t.length() > 0;) {
                var e = t.shift();

                if ("function" == typeof e) {
                  var n = t.shift(),
                      r = t.shift();
                  e.call(n, r);
                } else e._settlePromises();
              }
            }, c.prototype._drainQueues = function () {
              this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, this._drainQueue(this._lateQueue);
            }, c.prototype._queueTick = function () {
              this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
            }, c.prototype._reset = function () {
              this._isTickUsed = !1;
            }, n.exports = c, n.exports.firstLineError = i;
          }, {
            "./queue": 26,
            "./schedule": 29,
            "./util": 36
          }],
          3: [function (t, e, n) {
            "use strict";

            e.exports = function (t, e, n, r) {
              var i = !1,
                  o = function (t, e) {
                this._reject(e);
              },
                  s = function (t, e) {
                e.promiseRejectionQueued = !0, e.bindingPromise._then(o, o, null, this, t);
              },
                  a = function (t, e) {
                0 == (50397184 & this._bitField) && this._resolveCallback(e.target);
              },
                  c = function (t, e) {
                e.promiseRejectionQueued || this._reject(t);
              };

              t.prototype.bind = function (o) {
                i || (i = !0, t.prototype._propagateFrom = r.propagateFromFunction(), t.prototype._boundValue = r.boundValueFunction());
                var u = n(o),
                    l = new t(e);

                l._propagateFrom(this, 1);

                var f = this._target();

                if (l._setBoundTo(u), u instanceof t) {
                  var p = {
                    promiseRejectionQueued: !1,
                    promise: l,
                    target: f,
                    bindingPromise: u
                  };
                  f._then(e, s, void 0, l, p), u._then(a, c, void 0, l, p), l._setOnCancel(u);
                } else l._resolveCallback(f);

                return l;
              }, t.prototype._setBoundTo = function (t) {
                void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField;
              }, t.prototype._isBound = function () {
                return 2097152 == (2097152 & this._bitField);
              }, t.bind = function (e, n) {
                return t.resolve(n).bind(e);
              };
            };
          }, {}],
          4: [function (t, e, n) {
            "use strict";

            var r;
            "undefined" != typeof Promise && (r = Promise);
            var i = t("./promise")();
            i.noConflict = function () {
              try {
                Promise === i && (Promise = r);
              } catch (t) {}

              return i;
            }, e.exports = i;
          }, {
            "./promise": 22
          }],
          5: [function (t, e, n) {
            "use strict";

            var r = Object.create;

            if (r) {
              var i = r(null),
                  o = r(null);
              i[" size"] = o[" size"] = 0;
            }

            e.exports = function (e) {
              var n = t("./util"),
                  r = n.canEvaluate;
              n.isIdentifier;

              function i(t) {
                return function (t, r) {
                  var i;

                  if (null != t && (i = t[r]), "function" != typeof i) {
                    var o = "Object " + n.classString(t) + " has no method '" + n.toString(r) + "'";
                    throw new e.TypeError(o);
                  }

                  return i;
                }(t, this.pop()).apply(t, this);
              }

              function o(t) {
                return t[this];
              }

              function s(t) {
                var e = +this;
                return e < 0 && (e = Math.max(0, e + t.length)), t[e];
              }

              e.prototype.call = function (t) {
                var e = [].slice.call(arguments, 1);
                return e.push(t), this._then(i, void 0, void 0, e, void 0);
              }, e.prototype.get = function (t) {
                var e;
                if ("number" == typeof t) e = s;else if (r) {
                  var n = (void 0)(t);
                  e = null !== n ? n : o;
                } else e = o;
                return this._then(e, void 0, void 0, t, void 0);
              };
            };
          }, {
            "./util": 36
          }],
          6: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i) {
              var o = t("./util"),
                  s = o.tryCatch,
                  a = o.errorObj,
                  c = e._async;
              e.prototype.break = e.prototype.cancel = function () {
                if (!i.cancellation()) return this._warn("cancellation is disabled");

                for (var t = this, e = t; t._isCancellable();) {
                  if (!t._cancelBy(e)) {
                    e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                    break;
                  }

                  var n = t._cancellationParent;

                  if (null == n || !n._isCancellable()) {
                    t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                    break;
                  }

                  t._isFollowing() && t._followee().cancel(), t._setWillBeCancelled(), e = t, t = n;
                }
              }, e.prototype._branchHasCancelled = function () {
                this._branchesRemainingToCancel--;
              }, e.prototype._enoughBranchesHaveCancelled = function () {
                return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
              }, e.prototype._cancelBy = function (t) {
                return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), !0));
              }, e.prototype._cancelBranched = function () {
                this._enoughBranchesHaveCancelled() && this._cancel();
              }, e.prototype._cancel = function () {
                this._isCancellable() && (this._setCancelled(), c.invoke(this._cancelPromises, this, void 0));
              }, e.prototype._cancelPromises = function () {
                this._length() > 0 && this._settlePromises();
              }, e.prototype._unsetOnCancel = function () {
                this._onCancelField = void 0;
              }, e.prototype._isCancellable = function () {
                return this.isPending() && !this._isCancelled();
              }, e.prototype.isCancellable = function () {
                return this.isPending() && !this.isCancelled();
              }, e.prototype._doInvokeOnCancel = function (t, e) {
                if (o.isArray(t)) for (var n = 0; n < t.length; ++n) this._doInvokeOnCancel(t[n], e);else if (void 0 !== t) if ("function" == typeof t) {
                  if (!e) {
                    var r = s(t).call(this._boundValue());
                    r === a && (this._attachExtraTrace(r.e), c.throwLater(r.e));
                  }
                } else t._resultCancelled(this);
              }, e.prototype._invokeOnCancel = function () {
                var t = this._onCancel();

                this._unsetOnCancel(), c.invoke(this._doInvokeOnCancel, this, t);
              }, e.prototype._invokeInternalOnCancel = function () {
                this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
              }, e.prototype._resultCancelled = function () {
                this.cancel();
              };
            };
          }, {
            "./util": 36
          }],
          7: [function (t, e, n) {
            "use strict";

            e.exports = function (e) {
              var n = t("./util"),
                  r = t("./es5").keys,
                  i = n.tryCatch,
                  o = n.errorObj;
              return function (t, s, a) {
                return function (c) {
                  var u = a._boundValue();

                  t: for (var l = 0; l < t.length; ++l) {
                    var f = t[l];

                    if (f === Error || null != f && f.prototype instanceof Error) {
                      if (c instanceof f) return i(s).call(u, c);
                    } else if ("function" == typeof f) {
                      var p = i(f).call(u, c);
                      if (p === o) return p;
                      if (p) return i(s).call(u, c);
                    } else if (n.isObject(c)) {
                      for (var h = r(f), d = 0; d < h.length; ++d) {
                        var _ = h[d];
                        if (f[_] != c[_]) continue t;
                      }

                      return i(s).call(u, c);
                    }
                  }

                  return e;
                };
              };
            };
          }, {
            "./es5": 13,
            "./util": 36
          }],
          8: [function (t, e, n) {
            "use strict";

            e.exports = function (t) {
              var e = !1,
                  n = [];

              function r() {
                this._trace = new r.CapturedTrace(i());
              }

              function i() {
                var t = n.length - 1;
                if (t >= 0) return n[t];
              }

              return t.prototype._promiseCreated = function () {}, t.prototype._pushContext = function () {}, t.prototype._popContext = function () {
                return null;
              }, t._peekContext = t.prototype._peekContext = function () {}, r.prototype._pushContext = function () {
                void 0 !== this._trace && (this._trace._promiseCreated = null, n.push(this._trace));
              }, r.prototype._popContext = function () {
                if (void 0 !== this._trace) {
                  var t = n.pop(),
                      e = t._promiseCreated;
                  return t._promiseCreated = null, e;
                }

                return null;
              }, r.CapturedTrace = null, r.create = function () {
                if (e) return new r();
              }, r.deactivateLongStackTraces = function () {}, r.activateLongStackTraces = function () {
                var n = t.prototype._pushContext,
                    o = t.prototype._popContext,
                    s = t._peekContext,
                    a = t.prototype._peekContext,
                    c = t.prototype._promiseCreated;
                r.deactivateLongStackTraces = function () {
                  t.prototype._pushContext = n, t.prototype._popContext = o, t._peekContext = s, t.prototype._peekContext = a, t.prototype._promiseCreated = c, e = !1;
                }, e = !0, t.prototype._pushContext = r.prototype._pushContext, t.prototype._popContext = r.prototype._popContext, t._peekContext = t.prototype._peekContext = i, t.prototype._promiseCreated = function () {
                  var t = this._peekContext();

                  t && null == t._promiseCreated && (t._promiseCreated = this);
                };
              }, r;
            };
          }, {}],
          9: [function (t, n, r) {
            "use strict";

            n.exports = function (n, r) {
              var i,
                  o,
                  s,
                  a = n._getDomain,
                  c = n._async,
                  u = t("./errors").Warning,
                  l = t("./util"),
                  f = l.canAttachTrace,
                  p = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
                  h = /\((?:timers\.js):\d+:\d+\)/,
                  d = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,
                  _ = null,
                  v = null,
                  y = !1,
                  m = !(0 == l.env("BLUEBIRD_DEBUG")),
                  g = !(0 == l.env("BLUEBIRD_WARNINGS") || !m && !l.env("BLUEBIRD_WARNINGS")),
                  b = !(0 == l.env("BLUEBIRD_LONG_STACK_TRACES") || !m && !l.env("BLUEBIRD_LONG_STACK_TRACES")),
                  w = 0 != l.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (g || !!l.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
              n.prototype.suppressUnhandledRejections = function () {
                var t = this._target();

                t._bitField = -1048577 & t._bitField | 524288;
              }, n.prototype._ensurePossibleRejectionHandled = function () {
                0 == (524288 & this._bitField) && (this._setRejectionIsUnhandled(), c.invokeLater(this._notifyUnhandledRejection, this, void 0));
              }, n.prototype._notifyUnhandledRejectionIsHandled = function () {
                q("rejectionHandled", i, void 0, this);
              }, n.prototype._setReturnedNonUndefined = function () {
                this._bitField = 268435456 | this._bitField;
              }, n.prototype._returnedNonUndefined = function () {
                return 0 != (268435456 & this._bitField);
              }, n.prototype._notifyUnhandledRejection = function () {
                if (this._isRejectionUnhandled()) {
                  var t = this._settledValue();

                  this._setUnhandledRejectionIsNotified(), q("unhandledRejection", o, t, this);
                }
              }, n.prototype._setUnhandledRejectionIsNotified = function () {
                this._bitField = 262144 | this._bitField;
              }, n.prototype._unsetUnhandledRejectionIsNotified = function () {
                this._bitField = -262145 & this._bitField;
              }, n.prototype._isUnhandledRejectionNotified = function () {
                return (262144 & this._bitField) > 0;
              }, n.prototype._setRejectionIsUnhandled = function () {
                this._bitField = 1048576 | this._bitField;
              }, n.prototype._unsetRejectionIsUnhandled = function () {
                this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
              }, n.prototype._isRejectionUnhandled = function () {
                return (1048576 & this._bitField) > 0;
              }, n.prototype._warn = function (t, e, n) {
                return V(t, e, n || this);
              }, n.onPossiblyUnhandledRejection = function (t) {
                var e = a();
                o = "function" == typeof t ? null === e ? t : l.domainBind(e, t) : void 0;
              }, n.onUnhandledRejectionHandled = function (t) {
                var e = a();
                i = "function" == typeof t ? null === e ? t : l.domainBind(e, t) : void 0;
              };

              var E = function () {};

              n.longStackTraces = function () {
                if (c.haveItemsQueued() && !J.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");

                if (!J.longStackTraces && Q()) {
                  var t = n.prototype._captureStackTrace,
                      e = n.prototype._attachExtraTrace;
                  J.longStackTraces = !0, E = function () {
                    if (c.haveItemsQueued() && !J.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                    n.prototype._captureStackTrace = t, n.prototype._attachExtraTrace = e, r.deactivateLongStackTraces(), c.enableTrampoline(), J.longStackTraces = !1;
                  }, n.prototype._captureStackTrace = U, n.prototype._attachExtraTrace = N, r.activateLongStackTraces(), c.disableTrampolineIfNecessary();
                }
              }, n.hasLongStackTraces = function () {
                return J.longStackTraces && Q();
              };

              var C = function () {
                try {
                  if ("function" == typeof CustomEvent) {
                    var t = new CustomEvent("CustomEvent");
                    return l.global.dispatchEvent(t), function (t, e) {
                      var n = new CustomEvent(t.toLowerCase(), {
                        detail: e,
                        cancelable: !0
                      });
                      return !l.global.dispatchEvent(n);
                    };
                  }

                  if ("function" == typeof Event) {
                    t = new Event("CustomEvent");
                    return l.global.dispatchEvent(t), function (t, e) {
                      var n = new Event(t.toLowerCase(), {
                        cancelable: !0
                      });
                      return n.detail = e, !l.global.dispatchEvent(n);
                    };
                  }

                  return (t = document.createEvent("CustomEvent")).initCustomEvent("testingtheevent", !1, !0, {}), l.global.dispatchEvent(t), function (t, e) {
                    var n = document.createEvent("CustomEvent");
                    return n.initCustomEvent(t.toLowerCase(), !1, !0, e), !l.global.dispatchEvent(n);
                  };
                } catch (t) {}

                return function () {
                  return !1;
                };
              }(),
                  k = l.isNode ? function () {
                return e.emit.apply(e, arguments);
              } : l.global ? function (t) {
                var e = "on" + t.toLowerCase(),
                    n = l.global[e];
                return !!n && (n.apply(l.global, [].slice.call(arguments, 1)), !0);
              } : function () {
                return !1;
              };

              function j(t, e) {
                return {
                  promise: e
                };
              }

              var F = {
                promiseCreated: j,
                promiseFulfilled: j,
                promiseRejected: j,
                promiseResolved: j,
                promiseCancelled: j,
                promiseChained: function (t, e, n) {
                  return {
                    promise: e,
                    child: n
                  };
                },
                warning: function (t, e) {
                  return {
                    warning: e
                  };
                },
                unhandledRejection: function (t, e, n) {
                  return {
                    reason: e,
                    promise: n
                  };
                },
                rejectionHandled: j
              },
                  T = function (t) {
                var e = !1;

                try {
                  e = k.apply(null, arguments);
                } catch (t) {
                  c.throwLater(t), e = !0;
                }

                var n = !1;

                try {
                  n = C(t, F[t].apply(null, arguments));
                } catch (t) {
                  c.throwLater(t), n = !0;
                }

                return n || e;
              };

              function x() {
                return !1;
              }

              function P(t, e, n) {
                var r = this;

                try {
                  t(e, n, function (t) {
                    if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + l.toString(t));

                    r._attachCancellationCallback(t);
                  });
                } catch (t) {
                  return t;
                }
              }

              function S(t) {
                if (!this._isCancellable()) return this;

                var e = this._onCancel();

                void 0 !== e ? l.isArray(e) ? e.push(t) : this._setOnCancel([e, t]) : this._setOnCancel(t);
              }

              function R() {
                return this._onCancelField;
              }

              function O(t) {
                this._onCancelField = t;
              }

              function A() {
                this._cancellationParent = void 0, this._onCancelField = void 0;
              }

              function I(t, e) {
                if (0 != (1 & e)) {
                  this._cancellationParent = t;
                  var n = t._branchesRemainingToCancel;
                  void 0 === n && (n = 0), t._branchesRemainingToCancel = n + 1;
                }

                0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
              }

              n.config = function (t) {
                if ("longStackTraces" in (t = Object(t)) && (t.longStackTraces ? n.longStackTraces() : !t.longStackTraces && n.hasLongStackTraces() && E()), "warnings" in t) {
                  var e = t.warnings;
                  J.warnings = !!e, w = J.warnings, l.isObject(e) && "wForgottenReturn" in e && (w = !!e.wForgottenReturn);
                }

                if ("cancellation" in t && t.cancellation && !J.cancellation) {
                  if (c.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
                  n.prototype._clearCancellationData = A, n.prototype._propagateFrom = I, n.prototype._onCancel = R, n.prototype._setOnCancel = O, n.prototype._attachCancellationCallback = S, n.prototype._execute = P, D = I, J.cancellation = !0;
                }

                "monitoring" in t && (t.monitoring && !J.monitoring ? (J.monitoring = !0, n.prototype._fireEvent = T) : !t.monitoring && J.monitoring && (J.monitoring = !1, n.prototype._fireEvent = x));
              }, n.prototype._fireEvent = x, n.prototype._execute = function (t, e, n) {
                try {
                  t(e, n);
                } catch (t) {
                  return t;
                }
              }, n.prototype._onCancel = function () {}, n.prototype._setOnCancel = function (t) {}, n.prototype._attachCancellationCallback = function (t) {}, n.prototype._captureStackTrace = function () {}, n.prototype._attachExtraTrace = function () {}, n.prototype._clearCancellationData = function () {}, n.prototype._propagateFrom = function (t, e) {};

              var D = function (t, e) {
                0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
              };

              function L() {
                var t = this._boundTo;
                return void 0 !== t && t instanceof n ? t.isFulfilled() ? t.value() : void 0 : t;
              }

              function U() {
                this._trace = new X(this._peekContext());
              }

              function N(t, e) {
                if (f(t)) {
                  var n = this._trace;
                  if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t);else if (!t.__stackCleaned__) {
                    var r = H(t);
                    l.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), l.notEnumerableProp(t, "__stackCleaned__", !0);
                  }
                }
              }

              function V(t, e, r) {
                if (J.warnings) {
                  var i,
                      o = new u(t);
                  if (e) r._attachExtraTrace(o);else if (J.longStackTraces && (i = n._peekContext())) i.attachExtraTrace(o);else {
                    var s = H(o);
                    o.stack = s.message + "\n" + s.stack.join("\n");
                  }
                  T("warning", o) || M(o, "", !0);
                }
              }

              function B(t) {
                for (var e = [], n = 0; n < t.length; ++n) {
                  var r = t[n],
                      i = "    (No stack trace)" === r || _.test(r),
                      o = i && z(r);

                  i && !o && (y && " " !== r.charAt(0) && (r = "    " + r), e.push(r));
                }

                return e;
              }

              function H(t) {
                var e = t.stack;
                return {
                  message: t.toString(),
                  stack: B(e = "string" == typeof e && e.length > 0 ? function (t) {
                    for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                      var r = e[n];
                      if ("    (No stack trace)" === r || _.test(r)) break;
                    }

                    return n > 0 && (e = e.slice(n)), e;
                  }(t) : ["    (No stack trace)"])
                };
              }

              function M(t, e, n) {
                if ("undefined" != typeof console) {
                  var r;

                  if (l.isObject(t)) {
                    var i = t.stack;
                    r = e + v(i, t);
                  } else r = e + String(t);

                  "function" == typeof s ? s(r, n) : "function" != typeof console.log && "object" != typeof console.log || console.log(r);
                }
              }

              function q(t, e, n, r) {
                var i = !1;

                try {
                  "function" == typeof e && (i = !0, "rejectionHandled" === t ? e(r) : e(n, r));
                } catch (t) {
                  c.throwLater(t);
                }

                "unhandledRejection" === t ? T(t, n, r) || i || M(n, "Unhandled rejection ") : T(t, r);
              }

              function $(t) {
                var e;
                if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]";else {
                  e = t && "function" == typeof t.toString ? t.toString() : l.toString(t);
                  if (/\[object [a-zA-Z0-9$_]+\]/.test(e)) try {
                    e = JSON.stringify(t);
                  } catch (t) {}
                  0 === e.length && (e = "(empty array)");
                }
                return "(<" + function (t) {
                  if (t.length < 41) return t;
                  return t.substr(0, 38) + "...";
                }(e) + ">, no stack trace)";
              }

              function Q() {
                return "function" == typeof K;
              }

              var z = function () {
                return !1;
              },
                  G = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;

              function W(t) {
                var e = t.match(G);
                if (e) return {
                  fileName: e[1],
                  line: parseInt(e[2], 10)
                };
              }

              function X(t) {
                this._parent = t, this._promisesCreated = 0;
                var e = this._length = 1 + (void 0 === t ? 0 : t._length);
                K(this, X), e > 32 && this.uncycle();
              }

              l.inherits(X, Error), r.CapturedTrace = X, X.prototype.uncycle = function () {
                var t = this._length;

                if (!(t < 2)) {
                  for (var e = [], n = {}, r = 0, i = this; void 0 !== i; ++r) e.push(i), i = i._parent;

                  for (r = (t = this._length = r) - 1; r >= 0; --r) {
                    var o = e[r].stack;
                    void 0 === n[o] && (n[o] = r);
                  }

                  for (r = 0; r < t; ++r) {
                    var s = n[e[r].stack];

                    if (void 0 !== s && s !== r) {
                      s > 0 && (e[s - 1]._parent = void 0, e[s - 1]._length = 1), e[r]._parent = void 0, e[r]._length = 1;
                      var a = r > 0 ? e[r - 1] : this;
                      s < t - 1 ? (a._parent = e[s + 1], a._parent.uncycle(), a._length = a._parent._length + 1) : (a._parent = void 0, a._length = 1);

                      for (var c = a._length + 1, u = r - 2; u >= 0; --u) e[u]._length = c, c++;

                      return;
                    }
                  }
                }
              }, X.prototype.attachExtraTrace = function (t) {
                if (!t.__stackCleaned__) {
                  this.uncycle();

                  for (var e = H(t), n = e.message, r = [e.stack], i = this; void 0 !== i;) r.push(B(i.stack.split("\n"))), i = i._parent;

                  !function (t) {
                    for (var e = t[0], n = 1; n < t.length; ++n) {
                      for (var r = t[n], i = e.length - 1, o = e[i], s = -1, a = r.length - 1; a >= 0; --a) if (r[a] === o) {
                        s = a;
                        break;
                      }

                      for (a = s; a >= 0; --a) {
                        var c = r[a];
                        if (e[i] !== c) break;
                        e.pop(), i--;
                      }

                      e = r;
                    }
                  }(r), function (t) {
                    for (var e = 0; e < t.length; ++e) (0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), e--);
                  }(r), l.notEnumerableProp(t, "stack", function (t, e) {
                    for (var n = 0; n < e.length - 1; ++n) e[n].push("From previous event:"), e[n] = e[n].join("\n");

                    return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n");
                  }(n, r)), l.notEnumerableProp(t, "__stackCleaned__", !0);
                }
              };

              var K = function () {
                var t = /^\s*at\s*/,
                    e = function (t, e) {
                  return "string" == typeof t ? t : void 0 !== e.name && void 0 !== e.message ? e.toString() : $(e);
                };

                if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                  Error.stackTraceLimit += 6, _ = t, v = e;
                  var n = Error.captureStackTrace;
                  return z = function (t) {
                    return p.test(t);
                  }, function (t, e) {
                    Error.stackTraceLimit += 6, n(t, e), Error.stackTraceLimit -= 6;
                  };
                }

                var r,
                    i = new Error();
                if ("string" == typeof i.stack && i.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return _ = /@/, v = e, y = !0, function (t) {
                  t.stack = new Error().stack;
                };

                try {
                  throw new Error();
                } catch (t) {
                  r = "stack" in t;
                }

                return "stack" in i || !r || "number" != typeof Error.stackTraceLimit ? (v = function (t, e) {
                  return "string" == typeof t ? t : "object" != typeof e && "function" != typeof e || void 0 === e.name || void 0 === e.message ? $(e) : e.toString();
                }, null) : (_ = t, v = e, function (t) {
                  Error.stackTraceLimit += 6;

                  try {
                    throw new Error();
                  } catch (e) {
                    t.stack = e.stack;
                  }

                  Error.stackTraceLimit -= 6;
                });
              }();

              "undefined" != typeof console && void 0 !== console.warn && (s = function (t) {
                console.warn(t);
              }, l.isNode && e.stderr.isTTY ? s = function (t, e) {
                var n = e ? "[33m" : "[31m";
                console.warn(n + t + "[0m\n");
              } : l.isNode || "string" != typeof new Error().stack || (s = function (t, e) {
                console.warn("%c" + t, e ? "color: darkorange" : "color: red");
              }));
              var J = {
                warnings: g,
                longStackTraces: !1,
                cancellation: !1,
                monitoring: !1
              };
              return b && n.longStackTraces(), {
                longStackTraces: function () {
                  return J.longStackTraces;
                },
                warnings: function () {
                  return J.warnings;
                },
                cancellation: function () {
                  return J.cancellation;
                },
                monitoring: function () {
                  return J.monitoring;
                },
                propagateFromFunction: function () {
                  return D;
                },
                boundValueFunction: function () {
                  return L;
                },
                checkForgottenReturns: function (t, e, n, r, i) {
                  if (void 0 === t && null !== e && w) {
                    if (void 0 !== i && i._returnedNonUndefined()) return;
                    if (0 == (65535 & r._bitField)) return;
                    n && (n += " ");
                    var o = "",
                        s = "";

                    if (e._trace) {
                      for (var a = e._trace.stack.split("\n"), c = B(a), u = c.length - 1; u >= 0; --u) {
                        var l = c[u];

                        if (!h.test(l)) {
                          var f = l.match(d);
                          f && (o = "at " + f[1] + ":" + f[2] + ":" + f[3] + " ");
                          break;
                        }
                      }

                      if (c.length > 0) {
                        var p = c[0];

                        for (u = 0; u < a.length; ++u) if (a[u] === p) {
                          u > 0 && (s = "\n" + a[u - 1]);
                          break;
                        }
                      }
                    }

                    var _ = "a promise was created in a " + n + "handler " + o + "but was not returned from it, see http://goo.gl/rRqMUw" + s;

                    r._warn(_, !0, e);
                  }
                },
                setBounds: function (t, e) {
                  if (Q()) {
                    for (var n, r, i = t.stack.split("\n"), o = e.stack.split("\n"), s = -1, a = -1, c = 0; c < i.length; ++c) if (u = W(i[c])) {
                      n = u.fileName, s = u.line;
                      break;
                    }

                    for (c = 0; c < o.length; ++c) {
                      var u;

                      if (u = W(o[c])) {
                        r = u.fileName, a = u.line;
                        break;
                      }
                    }

                    s < 0 || a < 0 || !n || !r || n !== r || s >= a || (z = function (t) {
                      if (p.test(t)) return !0;
                      var e = W(t);
                      return !!(e && e.fileName === n && s <= e.line && e.line <= a);
                    });
                  }
                },
                warn: V,
                deprecated: function (t, e) {
                  var n = t + " is deprecated and will be removed in a future version.";
                  return e && (n += " Use " + e + " instead."), V(n);
                },
                CapturedTrace: X,
                fireDomEvent: C,
                fireGlobalEvent: k
              };
            };
          }, {
            "./errors": 12,
            "./util": 36
          }],
          10: [function (t, e, n) {
            "use strict";

            e.exports = function (t) {
              function e() {
                return this.value;
              }

              function n() {
                throw this.reason;
              }

              t.prototype.return = t.prototype.thenReturn = function (n) {
                return n instanceof t && n.suppressUnhandledRejections(), this._then(e, void 0, void 0, {
                  value: n
                }, void 0);
              }, t.prototype.throw = t.prototype.thenThrow = function (t) {
                return this._then(n, void 0, void 0, {
                  reason: t
                }, void 0);
              }, t.prototype.catchThrow = function (t) {
                if (arguments.length <= 1) return this._then(void 0, n, void 0, {
                  reason: t
                }, void 0);
                var e = arguments[1];
                return this.caught(t, function () {
                  throw e;
                });
              }, t.prototype.catchReturn = function (n) {
                if (arguments.length <= 1) return n instanceof t && n.suppressUnhandledRejections(), this._then(void 0, e, void 0, {
                  value: n
                }, void 0);
                var r = arguments[1];
                r instanceof t && r.suppressUnhandledRejections();
                return this.caught(n, function () {
                  return r;
                });
              };
            };
          }, {}],
          11: [function (t, e, n) {
            "use strict";

            e.exports = function (t, e) {
              var n = t.reduce,
                  r = t.all;

              function i() {
                return r(this);
              }

              t.prototype.each = function (t) {
                return n(this, t, e, 0)._then(i, void 0, void 0, this, void 0);
              }, t.prototype.mapSeries = function (t) {
                return n(this, t, e, e);
              }, t.each = function (t, r) {
                return n(t, r, e, 0)._then(i, void 0, void 0, t, void 0);
              }, t.mapSeries = function (t, r) {
                return n(t, r, e, e);
              };
            };
          }, {}],
          12: [function (t, e, n) {
            "use strict";

            var r,
                i,
                o = t("./es5"),
                s = o.freeze,
                a = t("./util"),
                c = a.inherits,
                u = a.notEnumerableProp;

            function l(t, e) {
              function n(r) {
                if (!(this instanceof n)) return new n(r);
                u(this, "message", "string" == typeof r ? r : e), u(this, "name", t), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this);
              }

              return c(n, Error), n;
            }

            var f = l("Warning", "warning"),
                p = l("CancellationError", "cancellation error"),
                h = l("TimeoutError", "timeout error"),
                d = l("AggregateError", "aggregate error");

            try {
              r = TypeError, i = RangeError;
            } catch (t) {
              r = l("TypeError", "type error"), i = l("RangeError", "range error");
            }

            for (var _ = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), v = 0; v < _.length; ++v) "function" == typeof Array.prototype[_[v]] && (d.prototype[_[v]] = Array.prototype[_[v]]);

            o.defineProperty(d.prototype, "length", {
              value: 0,
              configurable: !1,
              writable: !0,
              enumerable: !0
            }), d.prototype.isOperational = !0;
            var y = 0;

            function m(t) {
              if (!(this instanceof m)) return new m(t);
              u(this, "name", "OperationalError"), u(this, "message", t), this.cause = t, this.isOperational = !0, t instanceof Error ? (u(this, "message", t.message), u(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
            }

            d.prototype.toString = function () {
              var t = Array(4 * y + 1).join(" "),
                  e = "\n" + t + "AggregateError of:\n";
              y++, t = Array(4 * y + 1).join(" ");

              for (var n = 0; n < this.length; ++n) {
                for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o) i[o] = t + i[o];

                e += (r = i.join("\n")) + "\n";
              }

              return y--, e;
            }, c(m, Error);
            var g = Error.__BluebirdErrorTypes__;
            g || (g = s({
              CancellationError: p,
              TimeoutError: h,
              OperationalError: m,
              RejectionError: m,
              AggregateError: d
            }), o.defineProperty(Error, "__BluebirdErrorTypes__", {
              value: g,
              writable: !1,
              enumerable: !1,
              configurable: !1
            })), e.exports = {
              Error: Error,
              TypeError: r,
              RangeError: i,
              CancellationError: g.CancellationError,
              OperationalError: g.OperationalError,
              TimeoutError: g.TimeoutError,
              AggregateError: g.AggregateError,
              Warning: f
            };
          }, {
            "./es5": 13,
            "./util": 36
          }],
          13: [function (t, e, n) {
            var r = function () {
              "use strict";

              return void 0 === this;
            }();

            if (r) e.exports = {
              freeze: Object.freeze,
              defineProperty: Object.defineProperty,
              getDescriptor: Object.getOwnPropertyDescriptor,
              keys: Object.keys,
              names: Object.getOwnPropertyNames,
              getPrototypeOf: Object.getPrototypeOf,
              isArray: Array.isArray,
              isES5: r,
              propertyIsWritable: function (t, e) {
                var n = Object.getOwnPropertyDescriptor(t, e);
                return !(n && !n.writable && !n.set);
              }
            };else {
              var i = {}.hasOwnProperty,
                  o = {}.toString,
                  s = {}.constructor.prototype,
                  a = function (t) {
                var e = [];

                for (var n in t) i.call(t, n) && e.push(n);

                return e;
              };

              e.exports = {
                isArray: function (t) {
                  try {
                    return "[object Array]" === o.call(t);
                  } catch (t) {
                    return !1;
                  }
                },
                keys: a,
                names: a,
                defineProperty: function (t, e, n) {
                  return t[e] = n.value, t;
                },
                getDescriptor: function (t, e) {
                  return {
                    value: t[e]
                  };
                },
                freeze: function (t) {
                  return t;
                },
                getPrototypeOf: function (t) {
                  try {
                    return Object(t).constructor.prototype;
                  } catch (t) {
                    return s;
                  }
                },
                isES5: r,
                propertyIsWritable: function () {
                  return !0;
                }
              };
            }
          }, {}],
          14: [function (t, e, n) {
            "use strict";

            e.exports = function (t, e) {
              var n = t.map;
              t.prototype.filter = function (t, r) {
                return n(this, t, r, e);
              }, t.filter = function (t, r, i) {
                return n(t, r, i, e);
              };
            };
          }, {}],
          15: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n) {
              var r = t("./util"),
                  i = e.CancellationError,
                  o = r.errorObj;

              function s(t, e, n) {
                this.promise = t, this.type = e, this.handler = n, this.called = !1, this.cancelPromise = null;
              }

              function a(t) {
                this.finallyHandler = t;
              }

              function c(t, e) {
                return null != t.cancelPromise && (arguments.length > 1 ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), t.cancelPromise = null, !0);
              }

              function u() {
                return f.call(this, this.promise._target()._settledValue());
              }

              function l(t) {
                if (!c(this, t)) return o.e = t, o;
              }

              function f(t) {
                var r = this.promise,
                    s = this.handler;

                if (!this.called) {
                  this.called = !0;
                  var f = this.isFinallyHandler() ? s.call(r._boundValue()) : s.call(r._boundValue(), t);

                  if (void 0 !== f) {
                    r._setReturnedNonUndefined();

                    var p = n(f, r);

                    if (p instanceof e) {
                      if (null != this.cancelPromise) {
                        if (p._isCancelled()) {
                          var h = new i("late cancellation observer");
                          return r._attachExtraTrace(h), o.e = h, o;
                        }

                        p.isPending() && p._attachCancellationCallback(new a(this));
                      }

                      return p._then(u, l, void 0, this, void 0);
                    }
                  }
                }

                return r.isRejected() ? (c(this), o.e = t, o) : (c(this), t);
              }

              return s.prototype.isFinallyHandler = function () {
                return 0 === this.type;
              }, a.prototype._resultCancelled = function () {
                c(this.finallyHandler);
              }, e.prototype._passThrough = function (t, e, n, r) {
                return "function" != typeof t ? this.then() : this._then(n, r, void 0, new s(this, e, t), void 0);
              }, e.prototype.lastly = e.prototype.finally = function (t) {
                return this._passThrough(t, 0, f, f);
              }, e.prototype.tap = function (t) {
                return this._passThrough(t, 1, f);
              }, s;
            };
          }, {
            "./util": 36
          }],
          16: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i, o, s) {
              var a = t("./errors").TypeError,
                  c = t("./util"),
                  u = c.errorObj,
                  l = c.tryCatch,
                  f = [];

              function p(t, n, i, o) {
                if (s.cancellation()) {
                  var a = new e(r),
                      c = this._finallyPromise = new e(r);
                  this._promise = a.lastly(function () {
                    return c;
                  }), a._captureStackTrace(), a._setOnCancel(this);
                } else {
                  (this._promise = new e(r))._captureStackTrace();
                }

                this._stack = o, this._generatorFunction = t, this._receiver = n, this._generator = void 0, this._yieldHandlers = "function" == typeof i ? [i].concat(f) : f, this._yieldedPromise = null, this._cancellationPhase = !1;
              }

              c.inherits(p, o), p.prototype._isResolved = function () {
                return null === this._promise;
              }, p.prototype._cleanup = function () {
                this._promise = this._generator = null, s.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), this._finallyPromise = null);
              }, p.prototype._promiseCancelled = function () {
                if (!this._isResolved()) {
                  var t;
                  if (void 0 !== this._generator.return) this._promise._pushContext(), t = l(this._generator.return).call(this._generator, void 0), this._promise._popContext();else {
                    var n = new e.CancellationError("generator .return() sentinel");
                    e.coroutine.returnSentinel = n, this._promise._attachExtraTrace(n), this._promise._pushContext(), t = l(this._generator.throw).call(this._generator, n), this._promise._popContext();
                  }
                  this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(t);
                }
              }, p.prototype._promiseFulfilled = function (t) {
                this._yieldedPromise = null, this._promise._pushContext();
                var e = l(this._generator.next).call(this._generator, t);
                this._promise._popContext(), this._continue(e);
              }, p.prototype._promiseRejected = function (t) {
                this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();
                var e = l(this._generator.throw).call(this._generator, t);
                this._promise._popContext(), this._continue(e);
              }, p.prototype._resultCancelled = function () {
                if (this._yieldedPromise instanceof e) {
                  var t = this._yieldedPromise;
                  this._yieldedPromise = null, t.cancel();
                }
              }, p.prototype.promise = function () {
                return this._promise;
              }, p.prototype._run = function () {
                this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0);
              }, p.prototype._continue = function (t) {
                var n = this._promise;
                if (t === u) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._rejectCallback(t.e, !1);
                var r = t.value;
                if (!0 === t.done) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._resolveCallback(r);
                var o = i(r, this._promise);

                if (o instanceof e || null !== (o = function (t, n, r) {
                  for (var o = 0; o < n.length; ++o) {
                    r._pushContext();

                    var s = l(n[o])(t);

                    if (r._popContext(), s === u) {
                      r._pushContext();

                      var a = e.reject(u.e);
                      return r._popContext(), a;
                    }

                    var c = i(s, r);
                    if (c instanceof e) return c;
                  }

                  return null;
                }(o, this._yieldHandlers, this._promise))) {
                  var s = (o = o._target())._bitField;

                  0 == (50397184 & s) ? (this._yieldedPromise = o, o._proxy(this, null)) : 0 != (33554432 & s) ? e._async.invoke(this._promiseFulfilled, this, o._value()) : 0 != (16777216 & s) ? e._async.invoke(this._promiseRejected, this, o._reason()) : this._promiseCancelled();
                } else this._promiseRejected(new a("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", r) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
              }, e.coroutine = function (t, e) {
                if ("function" != typeof t) throw new a("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                var n = Object(e).yieldHandler,
                    r = p,
                    i = new Error().stack;
                return function () {
                  var e = t.apply(this, arguments),
                      o = new r(void 0, void 0, n, i),
                      s = o.promise();
                  return o._generator = e, o._promiseFulfilled(void 0), s;
                };
              }, e.coroutine.addYieldHandler = function (t) {
                if ("function" != typeof t) throw new a("expecting a function but got " + c.classString(t));
                f.push(t);
              }, e.spawn = function (t) {
                if (s.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                var r = new p(t, this),
                    i = r.promise();
                return r._run(e.spawn), i;
              };
            };
          }, {
            "./errors": 12,
            "./util": 36
          }],
          17: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i, o, s) {
              var a = t("./util");
              a.canEvaluate, a.tryCatch, a.errorObj;

              e.join = function () {
                var t,
                    e = arguments.length - 1;
                e > 0 && "function" == typeof arguments[e] && (t = arguments[e]);
                var r = [].slice.call(arguments);
                t && r.pop();
                var i = new n(r).promise();
                return void 0 !== t ? i.spread(t) : i;
              };
            };
          }, {
            "./util": 36
          }],
          18: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i, o, s) {
              var a = e._getDomain,
                  c = t("./util"),
                  u = c.tryCatch,
                  l = c.errorObj,
                  f = e._async;

              function p(t, e, n, r) {
                this.constructor$(t), this._promise._captureStackTrace();
                var i = a();
                this._callback = null === i ? e : c.domainBind(i, e), this._preservedValues = r === o ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = [], f.invoke(this._asyncInit, this, void 0);
              }

              function h(t, n, i, o) {
                if ("function" != typeof n) return r("expecting a function but got " + c.classString(n));
                var s = 0;

                if (void 0 !== i) {
                  if ("object" != typeof i || null === i) return e.reject(new TypeError("options argument must be an object but it is " + c.classString(i)));
                  if ("number" != typeof i.concurrency) return e.reject(new TypeError("'concurrency' must be a number but it is " + c.classString(i.concurrency)));
                  s = i.concurrency;
                }

                return new p(t, n, s = "number" == typeof s && isFinite(s) && s >= 1 ? s : 0, o).promise();
              }

              c.inherits(p, n), p.prototype._asyncInit = function () {
                this._init$(void 0, -2);
              }, p.prototype._init = function () {}, p.prototype._promiseFulfilled = function (t, n) {
                var r = this._values,
                    o = this.length(),
                    a = this._preservedValues,
                    c = this._limit;

                if (n < 0) {
                  if (r[n = -1 * n - 1] = t, c >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0;
                } else {
                  if (c >= 1 && this._inFlight >= c) return r[n] = t, this._queue.push(n), !1;
                  null !== a && (a[n] = t);

                  var f = this._promise,
                      p = this._callback,
                      h = f._boundValue();

                  f._pushContext();

                  var d = u(p).call(h, t, n, o),
                      _ = f._popContext();

                  if (s.checkForgottenReturns(d, _, null !== a ? "Promise.filter" : "Promise.map", f), d === l) return this._reject(d.e), !0;
                  var v = i(d, this._promise);

                  if (v instanceof e) {
                    var y = (v = v._target())._bitField;

                    if (0 == (50397184 & y)) return c >= 1 && this._inFlight++, r[n] = v, v._proxy(this, -1 * (n + 1)), !1;
                    if (0 == (33554432 & y)) return 0 != (16777216 & y) ? (this._reject(v._reason()), !0) : (this._cancel(), !0);
                    d = v._value();
                  }

                  r[n] = d;
                }

                return ++this._totalResolved >= o && (null !== a ? this._filter(r, a) : this._resolve(r), !0);
              }, p.prototype._drainQueue = function () {
                for (var t = this._queue, e = this._limit, n = this._values; t.length > 0 && this._inFlight < e;) {
                  if (this._isResolved()) return;
                  var r = t.pop();

                  this._promiseFulfilled(n[r], r);
                }
              }, p.prototype._filter = function (t, e) {
                for (var n = e.length, r = new Array(n), i = 0, o = 0; o < n; ++o) t[o] && (r[i++] = e[o]);

                r.length = i, this._resolve(r);
              }, p.prototype.preservedValues = function () {
                return this._preservedValues;
              }, e.prototype.map = function (t, e) {
                return h(this, t, e, null);
              }, e.map = function (t, e, n, r) {
                return h(t, e, n, r);
              };
            };
          }, {
            "./util": 36
          }],
          19: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i, o) {
              var s = t("./util"),
                  a = s.tryCatch;
              e.method = function (t) {
                if ("function" != typeof t) throw new e.TypeError("expecting a function but got " + s.classString(t));
                return function () {
                  var r = new e(n);
                  r._captureStackTrace(), r._pushContext();

                  var i = a(t).apply(this, arguments),
                      s = r._popContext();

                  return o.checkForgottenReturns(i, s, "Promise.method", r), r._resolveFromSyncValue(i), r;
                };
              }, e.attempt = e.try = function (t) {
                if ("function" != typeof t) return i("expecting a function but got " + s.classString(t));
                var r,
                    c = new e(n);

                if (c._captureStackTrace(), c._pushContext(), arguments.length > 1) {
                  o.deprecated("calling Promise.try with more than 1 argument");
                  var u = arguments[1],
                      l = arguments[2];
                  r = s.isArray(u) ? a(t).apply(l, u) : a(t).call(l, u);
                } else r = a(t)();

                var f = c._popContext();

                return o.checkForgottenReturns(r, f, "Promise.try", c), c._resolveFromSyncValue(r), c;
              }, e.prototype._resolveFromSyncValue = function (t) {
                t === s.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0);
              };
            };
          }, {
            "./util": 36
          }],
          20: [function (t, e, n) {
            "use strict";

            var r = t("./util"),
                i = r.maybeWrapAsError,
                o = t("./errors").OperationalError,
                s = t("./es5");
            var a = /^(?:name|message|stack|cause)$/;

            function c(t) {
              var e;

              if (function (t) {
                return t instanceof Error && s.getPrototypeOf(t) === Error.prototype;
              }(t)) {
                (e = new o(t)).name = t.name, e.message = t.message, e.stack = t.stack;

                for (var n = s.keys(t), i = 0; i < n.length; ++i) {
                  var c = n[i];
                  a.test(c) || (e[c] = t[c]);
                }

                return e;
              }

              return r.markAsOriginatingFromRejection(t), t;
            }

            e.exports = function (t, e) {
              return function (n, r) {
                if (null !== t) {
                  if (n) {
                    var o = c(i(n));
                    t._attachExtraTrace(o), t._reject(o);
                  } else if (e) {
                    var s = [].slice.call(arguments, 1);

                    t._fulfill(s);
                  } else t._fulfill(r);

                  t = null;
                }
              };
            };
          }, {
            "./errors": 12,
            "./es5": 13,
            "./util": 36
          }],
          21: [function (t, e, n) {
            "use strict";

            e.exports = function (e) {
              var n = t("./util"),
                  r = e._async,
                  i = n.tryCatch,
                  o = n.errorObj;

              function s(t, e) {
                if (!n.isArray(t)) return a.call(this, t, e);
                var s = i(e).apply(this._boundValue(), [null].concat(t));
                s === o && r.throwLater(s.e);
              }

              function a(t, e) {
                var n = this._boundValue(),
                    s = void 0 === t ? i(e).call(n, null) : i(e).call(n, null, t);

                s === o && r.throwLater(s.e);
              }

              function c(t, e) {
                if (!t) {
                  var n = new Error(t + "");
                  n.cause = t, t = n;
                }

                var s = i(e).call(this._boundValue(), t);
                s === o && r.throwLater(s.e);
              }

              e.prototype.asCallback = e.prototype.nodeify = function (t, e) {
                if ("function" == typeof t) {
                  var n = a;
                  void 0 !== e && Object(e).spread && (n = s), this._then(n, c, void 0, this, t);
                }

                return this;
              };
            };
          }, {
            "./util": 36
          }],
          22: [function (t, n, r) {
            "use strict";

            n.exports = function () {
              var r = function () {
                return new d("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
              },
                  i = function () {
                return new P.PromiseInspection(this._target());
              },
                  o = function (t) {
                return P.reject(new d(t));
              };

              function s() {}

              var a,
                  c = {},
                  u = t("./util");
              a = u.isNode ? function () {
                var t = e.domain;
                return void 0 === t && (t = null), t;
              } : function () {
                return null;
              }, u.notEnumerableProp(P, "_getDomain", a);
              var l = t("./es5"),
                  f = t("./async"),
                  p = new f();
              l.defineProperty(P, "_async", {
                value: p
              });
              var h = t("./errors"),
                  d = P.TypeError = h.TypeError;
              P.RangeError = h.RangeError;

              var _ = P.CancellationError = h.CancellationError;

              P.TimeoutError = h.TimeoutError, P.OperationalError = h.OperationalError, P.RejectionError = h.OperationalError, P.AggregateError = h.AggregateError;

              var v = function () {},
                  y = {},
                  m = {},
                  g = t("./thenables")(P, v),
                  b = t("./promise_array")(P, v, g, o, s),
                  w = t("./context")(P),
                  E = w.create,
                  C = t("./debuggability")(P, w),
                  k = (C.CapturedTrace, t("./finally")(P, g)),
                  j = t("./catch_filter")(m),
                  F = t("./nodeback"),
                  T = u.errorObj,
                  x = u.tryCatch;

              function P(t) {
                this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, t !== v && (!function (t, e) {
                  if ("function" != typeof e) throw new d("expecting a function but got " + u.classString(e));
                  if (t.constructor !== P) throw new d("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                }(this, t), this._resolveFromExecutor(t)), this._promiseCreated(), this._fireEvent("promiseCreated", this);
              }

              function S(t) {
                this.promise._resolveCallback(t);
              }

              function R(t) {
                this.promise._rejectCallback(t, !1);
              }

              function O(t) {
                var e = new P(v);
                e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t;
              }

              return P.prototype.toString = function () {
                return "[object Promise]";
              }, P.prototype.caught = P.prototype.catch = function (t) {
                var e = arguments.length;

                if (e > 1) {
                  var n,
                      r = new Array(e - 1),
                      i = 0;

                  for (n = 0; n < e - 1; ++n) {
                    var s = arguments[n];
                    if (!u.isObject(s)) return o("expecting an object but got A catch statement predicate " + u.classString(s));
                    r[i++] = s;
                  }

                  return r.length = i, t = arguments[n], this.then(void 0, j(r, t, this));
                }

                return this.then(void 0, t);
              }, P.prototype.reflect = function () {
                return this._then(i, i, void 0, this, void 0);
              }, P.prototype.then = function (t, e) {
                if (C.warnings() && arguments.length > 0 && "function" != typeof t && "function" != typeof e) {
                  var n = ".then() only accepts functions but was passed: " + u.classString(t);
                  arguments.length > 1 && (n += ", " + u.classString(e)), this._warn(n);
                }

                return this._then(t, e, void 0, void 0, void 0);
              }, P.prototype.done = function (t, e) {
                this._then(t, e, void 0, void 0, void 0)._setIsFinal();
              }, P.prototype.spread = function (t) {
                return "function" != typeof t ? o("expecting a function but got " + u.classString(t)) : this.all()._then(t, void 0, void 0, y, void 0);
              }, P.prototype.toJSON = function () {
                var t = {
                  isFulfilled: !1,
                  isRejected: !1,
                  fulfillmentValue: void 0,
                  rejectionReason: void 0
                };
                return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), t.isRejected = !0), t;
              }, P.prototype.all = function () {
                return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new b(this).promise();
              }, P.prototype.error = function (t) {
                return this.caught(u.originatesFromRejection, t);
              }, P.getNewLibraryCopy = n.exports, P.is = function (t) {
                return t instanceof P;
              }, P.fromNode = P.fromCallback = function (t) {
                var e = new P(v);

                e._captureStackTrace();

                var n = arguments.length > 1 && !!Object(arguments[1]).multiArgs,
                    r = x(t)(F(e, n));
                return r === T && e._rejectCallback(r.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), e;
              }, P.all = function (t) {
                return new b(t).promise();
              }, P.cast = function (t) {
                var e = g(t);
                return e instanceof P || ((e = new P(v))._captureStackTrace(), e._setFulfilled(), e._rejectionHandler0 = t), e;
              }, P.resolve = P.fulfilled = P.cast, P.reject = P.rejected = function (t) {
                var e = new P(v);
                return e._captureStackTrace(), e._rejectCallback(t, !0), e;
              }, P.setScheduler = function (t) {
                if ("function" != typeof t) throw new d("expecting a function but got " + u.classString(t));
                return p.setScheduler(t);
              }, P.prototype._then = function (t, e, n, r, i) {
                var o = void 0 !== i,
                    s = o ? i : new P(v),
                    c = this._target(),
                    l = c._bitField;

                o || (s._propagateFrom(this, 3), s._captureStackTrace(), void 0 === r && 0 != (2097152 & this._bitField) && (r = 0 != (50397184 & l) ? this._boundValue() : c === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, s));
                var f = a();

                if (0 != (50397184 & l)) {
                  var h,
                      d,
                      y = c._settlePromiseCtx;
                  0 != (33554432 & l) ? (d = c._rejectionHandler0, h = t) : 0 != (16777216 & l) ? (d = c._fulfillmentHandler0, h = e, c._unsetRejectionIsUnhandled()) : (y = c._settlePromiseLateCancellationObserver, d = new _("late cancellation observer"), c._attachExtraTrace(d), h = e), p.invoke(y, c, {
                    handler: null === f ? h : "function" == typeof h && u.domainBind(f, h),
                    promise: s,
                    receiver: r,
                    value: d
                  });
                } else c._addCallbacks(t, e, s, r, f);

                return s;
              }, P.prototype._length = function () {
                return 65535 & this._bitField;
              }, P.prototype._isFateSealed = function () {
                return 0 != (117506048 & this._bitField);
              }, P.prototype._isFollowing = function () {
                return 67108864 == (67108864 & this._bitField);
              }, P.prototype._setLength = function (t) {
                this._bitField = -65536 & this._bitField | 65535 & t;
              }, P.prototype._setFulfilled = function () {
                this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this);
              }, P.prototype._setRejected = function () {
                this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this);
              }, P.prototype._setFollowing = function () {
                this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this);
              }, P.prototype._setIsFinal = function () {
                this._bitField = 4194304 | this._bitField;
              }, P.prototype._isFinal = function () {
                return (4194304 & this._bitField) > 0;
              }, P.prototype._unsetCancelled = function () {
                this._bitField = -65537 & this._bitField;
              }, P.prototype._setCancelled = function () {
                this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this);
              }, P.prototype._setWillBeCancelled = function () {
                this._bitField = 8388608 | this._bitField;
              }, P.prototype._setAsyncGuaranteed = function () {
                p.hasCustomScheduler() || (this._bitField = 134217728 | this._bitField);
              }, P.prototype._receiverAt = function (t) {
                var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
                if (e !== c) return void 0 === e && this._isBound() ? this._boundValue() : e;
              }, P.prototype._promiseAt = function (t) {
                return this[4 * t - 4 + 2];
              }, P.prototype._fulfillmentHandlerAt = function (t) {
                return this[4 * t - 4 + 0];
              }, P.prototype._rejectionHandlerAt = function (t) {
                return this[4 * t - 4 + 1];
              }, P.prototype._boundValue = function () {}, P.prototype._migrateCallback0 = function (t) {
                t._bitField;

                var e = t._fulfillmentHandler0,
                    n = t._rejectionHandler0,
                    r = t._promise0,
                    i = t._receiverAt(0);

                void 0 === i && (i = c), this._addCallbacks(e, n, r, i, null);
              }, P.prototype._migrateCallbackAt = function (t, e) {
                var n = t._fulfillmentHandlerAt(e),
                    r = t._rejectionHandlerAt(e),
                    i = t._promiseAt(e),
                    o = t._receiverAt(e);

                void 0 === o && (o = c), this._addCallbacks(n, r, i, o, null);
              }, P.prototype._addCallbacks = function (t, e, n, r, i) {
                var o = this._length();

                if (o >= 65531 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = n, this._receiver0 = r, "function" == typeof t && (this._fulfillmentHandler0 = null === i ? t : u.domainBind(i, t)), "function" == typeof e && (this._rejectionHandler0 = null === i ? e : u.domainBind(i, e));else {
                  var s = 4 * o - 4;
                  this[s + 2] = n, this[s + 3] = r, "function" == typeof t && (this[s + 0] = null === i ? t : u.domainBind(i, t)), "function" == typeof e && (this[s + 1] = null === i ? e : u.domainBind(i, e));
                }
                return this._setLength(o + 1), o;
              }, P.prototype._proxy = function (t, e) {
                this._addCallbacks(void 0, void 0, e, t, null);
              }, P.prototype._resolveCallback = function (t, e) {
                if (0 == (117506048 & this._bitField)) {
                  if (t === this) return this._rejectCallback(r(), !1);
                  var n = g(t, this);
                  if (!(n instanceof P)) return this._fulfill(t);
                  e && this._propagateFrom(n, 2);

                  var i = n._target();

                  if (i !== this) {
                    var o = i._bitField;

                    if (0 == (50397184 & o)) {
                      var s = this._length();

                      s > 0 && i._migrateCallback0(this);

                      for (var a = 1; a < s; ++a) i._migrateCallbackAt(this, a);

                      this._setFollowing(), this._setLength(0), this._setFollowee(i);
                    } else if (0 != (33554432 & o)) this._fulfill(i._value());else if (0 != (16777216 & o)) this._reject(i._reason());else {
                      var c = new _("late cancellation observer");
                      i._attachExtraTrace(c), this._reject(c);
                    }
                  } else this._reject(r());
                }
              }, P.prototype._rejectCallback = function (t, e, n) {
                var r = u.ensureErrorObject(t),
                    i = r === t;

                if (!i && !n && C.warnings()) {
                  var o = "a promise was rejected with a non-error: " + u.classString(t);

                  this._warn(o, !0);
                }

                this._attachExtraTrace(r, !!e && i), this._reject(t);
              }, P.prototype._resolveFromExecutor = function (t) {
                var e = this;
                this._captureStackTrace(), this._pushContext();

                var n = !0,
                    r = this._execute(t, function (t) {
                  e._resolveCallback(t);
                }, function (t) {
                  e._rejectCallback(t, n);
                });

                n = !1, this._popContext(), void 0 !== r && e._rejectCallback(r, !0);
              }, P.prototype._settlePromiseFromHandler = function (t, e, n, r) {
                var i = r._bitField;

                if (0 == (65536 & i)) {
                  var o;
                  r._pushContext(), e === y ? n && "number" == typeof n.length ? o = x(t).apply(this._boundValue(), n) : (o = T).e = new d("cannot .spread() a non-array: " + u.classString(n)) : o = x(t).call(e, n);

                  var s = r._popContext();

                  0 == (65536 & (i = r._bitField)) && (o === m ? r._reject(n) : o === T ? r._rejectCallback(o.e, !1) : (C.checkForgottenReturns(o, s, "", r, this), r._resolveCallback(o)));
                }
              }, P.prototype._target = function () {
                for (var t = this; t._isFollowing();) t = t._followee();

                return t;
              }, P.prototype._followee = function () {
                return this._rejectionHandler0;
              }, P.prototype._setFollowee = function (t) {
                this._rejectionHandler0 = t;
              }, P.prototype._settlePromise = function (t, e, n, r) {
                var o = t instanceof P,
                    a = this._bitField,
                    c = 0 != (134217728 & a);
                0 != (65536 & a) ? (o && t._invokeInternalOnCancel(), n instanceof k && n.isFinallyHandler() ? (n.cancelPromise = t, x(e).call(n, r) === T && t._reject(T.e)) : e === i ? t._fulfill(i.call(n)) : n instanceof s ? n._promiseCancelled(t) : o || t instanceof b ? t._cancel() : n.cancel()) : "function" == typeof e ? o ? (c && t._setAsyncGuaranteed(), this._settlePromiseFromHandler(e, n, r, t)) : e.call(n, r, t) : n instanceof s ? n._isResolved() || (0 != (33554432 & a) ? n._promiseFulfilled(r, t) : n._promiseRejected(r, t)) : o && (c && t._setAsyncGuaranteed(), 0 != (33554432 & a) ? t._fulfill(r) : t._reject(r));
              }, P.prototype._settlePromiseLateCancellationObserver = function (t) {
                var e = t.handler,
                    n = t.promise,
                    r = t.receiver,
                    i = t.value;
                "function" == typeof e ? n instanceof P ? this._settlePromiseFromHandler(e, r, i, n) : e.call(r, i, n) : n instanceof P && n._reject(i);
              }, P.prototype._settlePromiseCtx = function (t) {
                this._settlePromise(t.promise, t.handler, t.receiver, t.value);
              }, P.prototype._settlePromise0 = function (t, e, n) {
                var r = this._promise0,
                    i = this._receiverAt(0);

                this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(r, t, i, e);
              }, P.prototype._clearCallbackDataAtIndex = function (t) {
                var e = 4 * t - 4;
                this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0;
              }, P.prototype._fulfill = function (t) {
                var e = this._bitField;

                if (!((117506048 & e) >>> 16)) {
                  if (t === this) {
                    var n = r();
                    return this._attachExtraTrace(n), this._reject(n);
                  }

                  this._setFulfilled(), this._rejectionHandler0 = t, (65535 & e) > 0 && (0 != (134217728 & e) ? this._settlePromises() : p.settlePromises(this));
                }
              }, P.prototype._reject = function (t) {
                var e = this._bitField;

                if (!((117506048 & e) >>> 16)) {
                  if (this._setRejected(), this._fulfillmentHandler0 = t, this._isFinal()) return p.fatalError(t, u.isNode);
                  (65535 & e) > 0 ? p.settlePromises(this) : this._ensurePossibleRejectionHandled();
                }
              }, P.prototype._fulfillPromises = function (t, e) {
                for (var n = 1; n < t; n++) {
                  var r = this._fulfillmentHandlerAt(n),
                      i = this._promiseAt(n),
                      o = this._receiverAt(n);

                  this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
                }
              }, P.prototype._rejectPromises = function (t, e) {
                for (var n = 1; n < t; n++) {
                  var r = this._rejectionHandlerAt(n),
                      i = this._promiseAt(n),
                      o = this._receiverAt(n);

                  this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
                }
              }, P.prototype._settlePromises = function () {
                var t = this._bitField,
                    e = 65535 & t;

                if (e > 0) {
                  if (0 != (16842752 & t)) {
                    var n = this._fulfillmentHandler0;
                    this._settlePromise0(this._rejectionHandler0, n, t), this._rejectPromises(e, n);
                  } else {
                    var r = this._rejectionHandler0;
                    this._settlePromise0(this._fulfillmentHandler0, r, t), this._fulfillPromises(e, r);
                  }

                  this._setLength(0);
                }

                this._clearCancellationData();
              }, P.prototype._settledValue = function () {
                var t = this._bitField;
                return 0 != (33554432 & t) ? this._rejectionHandler0 : 0 != (16777216 & t) ? this._fulfillmentHandler0 : void 0;
              }, P.defer = P.pending = function () {
                return C.deprecated("Promise.defer", "new Promise"), {
                  promise: new P(v),
                  resolve: S,
                  reject: R
                };
              }, u.notEnumerableProp(P, "_makeSelfResolutionError", r), t("./method")(P, v, g, o, C), t("./bind")(P, v, g, C), t("./cancel")(P, b, o, C), t("./direct_resolve")(P), t("./synchronous_inspection")(P), t("./join")(P, b, g, v, p, a), P.Promise = P, P.version = "3.4.6", t("./map.js")(P, b, o, g, v, C), t("./call_get.js")(P), t("./using.js")(P, o, g, E, v, C), t("./timers.js")(P, v, C), t("./generators.js")(P, o, v, g, s, C), t("./nodeify.js")(P), t("./promisify.js")(P, v), t("./props.js")(P, b, g, o), t("./race.js")(P, v, g, o), t("./reduce.js")(P, b, o, g, v, C), t("./settle.js")(P, b, C), t("./some.js")(P, b, o), t("./filter.js")(P, v), t("./each.js")(P, v), t("./any.js")(P), u.toFastProperties(P), u.toFastProperties(P.prototype), O({
                a: 1
              }), O({
                b: 2
              }), O({
                c: 3
              }), O(1), O(function () {}), O(void 0), O(!1), O(new P(v)), C.setBounds(f.firstLineError, u.lastLineError), P;
            };
          }, {
            "./any.js": 1,
            "./async": 2,
            "./bind": 3,
            "./call_get.js": 5,
            "./cancel": 6,
            "./catch_filter": 7,
            "./context": 8,
            "./debuggability": 9,
            "./direct_resolve": 10,
            "./each.js": 11,
            "./errors": 12,
            "./es5": 13,
            "./filter.js": 14,
            "./finally": 15,
            "./generators.js": 16,
            "./join": 17,
            "./map.js": 18,
            "./method": 19,
            "./nodeback": 20,
            "./nodeify.js": 21,
            "./promise_array": 23,
            "./promisify.js": 24,
            "./props.js": 25,
            "./race.js": 27,
            "./reduce.js": 28,
            "./settle.js": 30,
            "./some.js": 31,
            "./synchronous_inspection": 32,
            "./thenables": 33,
            "./timers.js": 34,
            "./using.js": 35,
            "./util": 36
          }],
          23: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i, o) {
              var s = t("./util");
              s.isArray;

              function a(t) {
                var r = this._promise = new e(n);
                t instanceof e && r._propagateFrom(t, 3), r._setOnCancel(this), this._values = t, this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
              }

              return s.inherits(a, o), a.prototype.length = function () {
                return this._length;
              }, a.prototype.promise = function () {
                return this._promise;
              }, a.prototype._init = function t(n, o) {
                var a = r(this._values, this._promise);

                if (a instanceof e) {
                  var c = (a = a._target())._bitField;

                  if (this._values = a, 0 == (50397184 & c)) return this._promise._setAsyncGuaranteed(), a._then(t, this._reject, void 0, this, o);
                  if (0 == (33554432 & c)) return 0 != (16777216 & c) ? this._reject(a._reason()) : this._cancel();
                  a = a._value();
                }

                if (null !== (a = s.asArray(a))) 0 !== a.length ? this._iterate(a) : -5 === o ? this._resolveEmptyArray() : this._resolve(function (t) {
                  switch (t) {
                    case -2:
                      return [];

                    case -3:
                      return {};
                  }
                }(o));else {
                  var u = i("expecting an array or an iterable object but got " + s.classString(a)).reason();

                  this._promise._rejectCallback(u, !1);
                }
              }, a.prototype._iterate = function (t) {
                var n = this.getActualLength(t.length);
                this._length = n, this._values = this.shouldCopyValues() ? new Array(n) : this._values;

                for (var i = this._promise, o = !1, s = null, a = 0; a < n; ++a) {
                  var c = r(t[a], i);
                  s = c instanceof e ? (c = c._target())._bitField : null, o ? null !== s && c.suppressUnhandledRejections() : null !== s ? 0 == (50397184 & s) ? (c._proxy(this, a), this._values[a] = c) : o = 0 != (33554432 & s) ? this._promiseFulfilled(c._value(), a) : 0 != (16777216 & s) ? this._promiseRejected(c._reason(), a) : this._promiseCancelled(a) : o = this._promiseFulfilled(c, a);
                }

                o || i._setAsyncGuaranteed();
              }, a.prototype._isResolved = function () {
                return null === this._values;
              }, a.prototype._resolve = function (t) {
                this._values = null, this._promise._fulfill(t);
              }, a.prototype._cancel = function () {
                !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel());
              }, a.prototype._reject = function (t) {
                this._values = null, this._promise._rejectCallback(t, !1);
              }, a.prototype._promiseFulfilled = function (t, e) {
                return this._values[e] = t, ++this._totalResolved >= this._length && (this._resolve(this._values), !0);
              }, a.prototype._promiseCancelled = function () {
                return this._cancel(), !0;
              }, a.prototype._promiseRejected = function (t) {
                return this._totalResolved++, this._reject(t), !0;
              }, a.prototype._resultCancelled = function () {
                if (!this._isResolved()) {
                  var t = this._values;
                  if (this._cancel(), t instanceof e) t.cancel();else for (var n = 0; n < t.length; ++n) t[n] instanceof e && t[n].cancel();
                }
              }, a.prototype.shouldCopyValues = function () {
                return !0;
              }, a.prototype.getActualLength = function (t) {
                return t;
              }, a;
            };
          }, {
            "./util": 36
          }],
          24: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n) {
              var r = {},
                  i = t("./util"),
                  o = t("./nodeback"),
                  s = i.withAppended,
                  a = i.maybeWrapAsError,
                  c = i.canEvaluate,
                  u = t("./errors").TypeError,
                  l = {
                __isPromisified__: !0
              },
                  f = new RegExp("^(?:" + ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"].join("|") + ")$"),
                  p = function (t) {
                return i.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t;
              };

              function h(t) {
                return !f.test(t);
              }

              function d(t) {
                try {
                  return !0 === t.__isPromisified__;
                } catch (t) {
                  return !1;
                }
              }

              function _(t, e, n) {
                var r = i.getDataPropertyOrDefault(t, e + n, l);
                return !!r && d(r);
              }

              function v(t, e, n, r) {
                for (var o = i.inheritedDataKeys(t), s = [], a = 0; a < o.length; ++a) {
                  var c = o[a],
                      l = t[c],
                      f = r === p || p(c, l, t);
                  "function" != typeof l || d(l) || _(t, c, e) || !r(c, l, t, f) || s.push(c, l);
                }

                return function (t, e, n) {
                  for (var r = 0; r < t.length; r += 2) {
                    var i = t[r];
                    if (n.test(i)) for (var o = i.replace(n, ""), s = 0; s < t.length; s += 2) if (t[s] === o) throw new u("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e));
                  }
                }(s, e, n), s;
              }

              var y = function (t) {
                return t.replace(/([$])/, "\\$");
              };

              var m = c ? void 0 : function (t, c, u, l, f, p) {
                var h = function () {
                  return this;
                }(),
                    d = t;

                function _() {
                  var i = c;
                  c === r && (i = this);
                  var u = new e(n);

                  u._captureStackTrace();

                  var l = "string" == typeof d && this !== h ? this[d] : t,
                      f = o(u, p);

                  try {
                    l.apply(i, s(arguments, f));
                  } catch (t) {
                    u._rejectCallback(a(t), !0, !0);
                  }

                  return u._isFateSealed() || u._setAsyncGuaranteed(), u;
                }

                return "string" == typeof d && (t = l), i.notEnumerableProp(_, "__isPromisified__", !0), _;
              };

              function g(t, e, n, o, s) {
                for (var a = new RegExp(y(e) + "$"), c = v(t, e, a, n), u = 0, l = c.length; u < l; u += 2) {
                  var f = c[u],
                      p = c[u + 1],
                      h = f + e;
                  if (o === m) t[h] = m(f, r, f, p, e, s);else {
                    var d = o(p, function () {
                      return m(f, r, f, p, e, s);
                    });
                    i.notEnumerableProp(d, "__isPromisified__", !0), t[h] = d;
                  }
                }

                return i.toFastProperties(t), t;
              }

              e.promisify = function (t, e) {
                if ("function" != typeof t) throw new u("expecting a function but got " + i.classString(t));
                if (d(t)) return t;

                var n = function (t, e, n) {
                  return m(t, e, void 0, t, null, n);
                }(t, void 0 === (e = Object(e)).context ? r : e.context, !!e.multiArgs);

                return i.copyDescriptors(t, n, h), n;
              }, e.promisifyAll = function (t, e) {
                if ("function" != typeof t && "object" != typeof t) throw new u("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                var n = !!(e = Object(e)).multiArgs,
                    r = e.suffix;
                "string" != typeof r && (r = "Async");
                var o = e.filter;
                "function" != typeof o && (o = p);
                var s = e.promisifier;
                if ("function" != typeof s && (s = m), !i.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");

                for (var a = i.inheritedDataKeys(t), c = 0; c < a.length; ++c) {
                  var l = t[a[c]];
                  "constructor" !== a[c] && i.isClass(l) && (g(l.prototype, r, o, s, n), g(l, r, o, s, n));
                }

                return g(t, r, o, s, n);
              };
            };
          }, {
            "./errors": 12,
            "./nodeback": 20,
            "./util": 36
          }],
          25: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i) {
              var o,
                  s = t("./util"),
                  a = s.isObject,
                  c = t("./es5");
              "function" == typeof Map && (o = Map);

              var u = function () {
                var t = 0,
                    e = 0;

                function n(n, r) {
                  this[t] = n, this[t + e] = r, t++;
                }

                return function (r) {
                  e = r.size, t = 0;
                  var i = new Array(2 * r.size);
                  return r.forEach(n, i), i;
                };
              }();

              function l(t) {
                var e,
                    n = !1;
                if (void 0 !== o && t instanceof o) e = u(t), n = !0;else {
                  var r = c.keys(t),
                      i = r.length;
                  e = new Array(2 * i);

                  for (var s = 0; s < i; ++s) {
                    var a = r[s];
                    e[s] = t[a], e[s + i] = a;
                  }
                }
                this.constructor$(e), this._isMap = n, this._init$(void 0, -3);
              }

              function f(t) {
                var n,
                    o = r(t);
                return a(o) ? (n = o instanceof e ? o._then(e.props, void 0, void 0, void 0, void 0) : new l(o).promise(), o instanceof e && n._propagateFrom(o, 2), n) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
              }

              s.inherits(l, n), l.prototype._init = function () {}, l.prototype._promiseFulfilled = function (t, e) {
                if (this._values[e] = t, ++this._totalResolved >= this._length) {
                  var n;
                  if (this._isMap) n = function (t) {
                    for (var e = new o(), n = t.length / 2 | 0, r = 0; r < n; ++r) {
                      var i = t[n + r],
                          s = t[r];
                      e.set(i, s);
                    }

                    return e;
                  }(this._values);else {
                    n = {};

                    for (var r = this.length(), i = 0, s = this.length(); i < s; ++i) n[this._values[i + r]] = this._values[i];
                  }
                  return this._resolve(n), !0;
                }

                return !1;
              }, l.prototype.shouldCopyValues = function () {
                return !1;
              }, l.prototype.getActualLength = function (t) {
                return t >> 1;
              }, e.prototype.props = function () {
                return f(this);
              }, e.props = function (t) {
                return f(t);
              };
            };
          }, {
            "./es5": 13,
            "./util": 36
          }],
          26: [function (t, e, n) {
            "use strict";

            function r(t) {
              this._capacity = t, this._length = 0, this._front = 0;
            }

            r.prototype._willBeOverCapacity = function (t) {
              return this._capacity < t;
            }, r.prototype._pushOne = function (t) {
              var e = this.length();
              this._checkCapacity(e + 1), this[this._front + e & this._capacity - 1] = t, this._length = e + 1;
            }, r.prototype._unshiftOne = function (t) {
              var e = this._capacity;

              this._checkCapacity(this.length() + 1);

              var n = (this._front - 1 & e - 1 ^ e) - e;
              this[n] = t, this._front = n, this._length = this.length() + 1;
            }, r.prototype.unshift = function (t, e, n) {
              this._unshiftOne(n), this._unshiftOne(e), this._unshiftOne(t);
            }, r.prototype.push = function (t, e, n) {
              var r = this.length() + 3;
              if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
              var i = this._front + r - 3;

              this._checkCapacity(r);

              var o = this._capacity - 1;
              this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r;
            }, r.prototype.shift = function () {
              var t = this._front,
                  e = this[t];
              return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, e;
            }, r.prototype.length = function () {
              return this._length;
            }, r.prototype._checkCapacity = function (t) {
              this._capacity < t && this._resizeTo(this._capacity << 1);
            }, r.prototype._resizeTo = function (t) {
              var e = this._capacity;
              this._capacity = t, function (t, e, n, r, i) {
                for (var o = 0; o < i; ++o) n[o + r] = t[o + e], t[o + e] = void 0;
              }(this, 0, this, e, this._front + this._length & e - 1);
            }, e.exports = r;
          }, {}],
          27: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i) {
              var o = t("./util"),
                  s = function (t) {
                return t.then(function (e) {
                  return a(e, t);
                });
              };

              function a(t, a) {
                var c = r(t);
                if (c instanceof e) return s(c);
                if (null === (t = o.asArray(t))) return i("expecting an array or an iterable object but got " + o.classString(t));
                var u = new e(n);
                void 0 !== a && u._propagateFrom(a, 3);

                for (var l = u._fulfill, f = u._reject, p = 0, h = t.length; p < h; ++p) {
                  var d = t[p];
                  (void 0 !== d || p in t) && e.cast(d)._then(l, f, void 0, u, null);
                }

                return u;
              }

              e.race = function (t) {
                return a(t, void 0);
              }, e.prototype.race = function () {
                return a(this, void 0);
              };
            };
          }, {
            "./util": 36
          }],
          28: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i, o, s) {
              var a = e._getDomain,
                  c = t("./util"),
                  u = c.tryCatch;

              function l(t, n, r, i) {
                this.constructor$(t);
                var s = a();
                this._fn = null === s ? n : c.domainBind(s, n), void 0 !== r && (r = e.resolve(r))._attachCancellationCallback(this), this._initialValue = r, this._currentCancellable = null, this._eachValues = i === o ? Array(this._length) : 0 === i ? null : void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
              }

              function f(t, e) {
                this.isFulfilled() ? e._resolve(t) : e._reject(t);
              }

              function p(t, e, n, i) {
                return "function" != typeof e ? r("expecting a function but got " + c.classString(e)) : new l(t, e, n, i).promise();
              }

              function h(t) {
                this.accum = t, this.array._gotAccum(t);
                var n = i(this.value, this.array._promise);
                return n instanceof e ? (this.array._currentCancellable = n, n._then(d, void 0, void 0, this, void 0)) : d.call(this, n);
              }

              function d(t) {
                var n,
                    r = this.array,
                    i = r._promise,
                    o = u(r._fn);
                i._pushContext(), (n = void 0 !== r._eachValues ? o.call(i._boundValue(), t, this.index, this.length) : o.call(i._boundValue(), this.accum, t, this.index, this.length)) instanceof e && (r._currentCancellable = n);

                var a = i._popContext();

                return s.checkForgottenReturns(n, a, void 0 !== r._eachValues ? "Promise.each" : "Promise.reduce", i), n;
              }

              c.inherits(l, n), l.prototype._gotAccum = function (t) {
                void 0 !== this._eachValues && null !== this._eachValues && t !== o && this._eachValues.push(t);
              }, l.prototype._eachComplete = function (t) {
                return null !== this._eachValues && this._eachValues.push(t), this._eachValues;
              }, l.prototype._init = function () {}, l.prototype._resolveEmptyArray = function () {
                this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
              }, l.prototype.shouldCopyValues = function () {
                return !1;
              }, l.prototype._resolve = function (t) {
                this._promise._resolveCallback(t), this._values = null;
              }, l.prototype._resultCancelled = function (t) {
                if (t === this._initialValue) return this._cancel();
                this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel());
              }, l.prototype._iterate = function (t) {
                var n, r;
                this._values = t;
                var i = t.length;
                if (void 0 !== this._initialValue ? (n = this._initialValue, r = 0) : (n = e.resolve(t[0]), r = 1), this._currentCancellable = n, !n.isRejected()) for (; r < i; ++r) {
                  var o = {
                    accum: null,
                    value: t[r],
                    index: r,
                    length: i,
                    array: this
                  };
                  n = n._then(h, void 0, void 0, o, void 0);
                }
                void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)), n._then(f, f, void 0, n, this);
              }, e.prototype.reduce = function (t, e) {
                return p(this, t, e, null);
              }, e.reduce = function (t, e, n, r) {
                return p(t, e, n, r);
              };
            };
          }, {
            "./util": 36
          }],
          29: [function (t, i, o) {
            "use strict";

            var s,
                a = t("./util"),
                c = a.getNativePromise();

            if (a.isNode && "undefined" == typeof MutationObserver) {
              var u = n.setImmediate,
                  l = e.nextTick;
              s = a.isRecentNode ? function (t) {
                u.call(n, t);
              } : function (t) {
                l.call(e, t);
              };
            } else if ("function" == typeof c && "function" == typeof c.resolve) {
              var f = c.resolve();

              s = function (t) {
                f.then(t);
              };
            } else s = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? void 0 !== r ? function (t) {
              r(t);
            } : "undefined" != typeof setTimeout ? function (t) {
              setTimeout(t, 0);
            } : function () {
              throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
            } : function () {
              var t = document.createElement("div"),
                  e = {
                attributes: !0
              },
                  n = !1,
                  r = document.createElement("div");
              new MutationObserver(function () {
                t.classList.toggle("foo"), n = !1;
              }).observe(r, e);
              return function (i) {
                var o = new MutationObserver(function () {
                  o.disconnect(), i();
                });
                o.observe(t, e), n || (n = !0, r.classList.toggle("foo"));
              };
            }();

            i.exports = s;
          }, {
            "./util": 36
          }],
          30: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r) {
              var i = e.PromiseInspection;

              function o(t) {
                this.constructor$(t);
              }

              t("./util").inherits(o, n), o.prototype._promiseResolved = function (t, e) {
                return this._values[t] = e, ++this._totalResolved >= this._length && (this._resolve(this._values), !0);
              }, o.prototype._promiseFulfilled = function (t, e) {
                var n = new i();
                return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n);
              }, o.prototype._promiseRejected = function (t, e) {
                var n = new i();
                return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n);
              }, e.settle = function (t) {
                return r.deprecated(".settle()", ".reflect()"), new o(t).promise();
              }, e.prototype.settle = function () {
                return e.settle(this);
              };
            };
          }, {
            "./util": 36
          }],
          31: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r) {
              var i = t("./util"),
                  o = t("./errors").RangeError,
                  s = t("./errors").AggregateError,
                  a = i.isArray,
                  c = {};

              function u(t) {
                this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
              }

              function l(t, e) {
                if ((0 | e) !== e || e < 0) return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                var n = new u(t),
                    i = n.promise();
                return n.setHowMany(e), n.init(), i;
              }

              i.inherits(u, n), u.prototype._init = function () {
                if (this._initialized) if (0 !== this._howMany) {
                  this._init$(void 0, -5);

                  var t = a(this._values);
                  !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
                } else this._resolve([]);
              }, u.prototype.init = function () {
                this._initialized = !0, this._init();
              }, u.prototype.setUnwrap = function () {
                this._unwrap = !0;
              }, u.prototype.howMany = function () {
                return this._howMany;
              }, u.prototype.setHowMany = function (t) {
                this._howMany = t;
              }, u.prototype._promiseFulfilled = function (t) {
                return this._addFulfilled(t), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0);
              }, u.prototype._promiseRejected = function (t) {
                return this._addRejected(t), this._checkOutcome();
              }, u.prototype._promiseCancelled = function () {
                return this._values instanceof e || null == this._values ? this._cancel() : (this._addRejected(c), this._checkOutcome());
              }, u.prototype._checkOutcome = function () {
                if (this.howMany() > this._canPossiblyFulfill()) {
                  for (var t = new s(), e = this.length(); e < this._values.length; ++e) this._values[e] !== c && t.push(this._values[e]);

                  return t.length > 0 ? this._reject(t) : this._cancel(), !0;
                }

                return !1;
              }, u.prototype._fulfilled = function () {
                return this._totalResolved;
              }, u.prototype._rejected = function () {
                return this._values.length - this.length();
              }, u.prototype._addRejected = function (t) {
                this._values.push(t);
              }, u.prototype._addFulfilled = function (t) {
                this._values[this._totalResolved++] = t;
              }, u.prototype._canPossiblyFulfill = function () {
                return this.length() - this._rejected();
              }, u.prototype._getRangeError = function (t) {
                var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
                return new o(e);
              }, u.prototype._resolveEmptyArray = function () {
                this._reject(this._getRangeError(0));
              }, e.some = function (t, e) {
                return l(t, e);
              }, e.prototype.some = function (t) {
                return l(this, t);
              }, e._SomePromiseArray = u;
            };
          }, {
            "./errors": 12,
            "./util": 36
          }],
          32: [function (t, e, n) {
            "use strict";

            e.exports = function (t) {
              function e(t) {
                void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0);
              }

              e.prototype._settledValue = function () {
                return this._settledValueField;
              };

              var n = e.prototype.value = function () {
                if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                return this._settledValue();
              },
                  r = e.prototype.error = e.prototype.reason = function () {
                if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                return this._settledValue();
              },
                  i = e.prototype.isFulfilled = function () {
                return 0 != (33554432 & this._bitField);
              },
                  o = e.prototype.isRejected = function () {
                return 0 != (16777216 & this._bitField);
              },
                  s = e.prototype.isPending = function () {
                return 0 == (50397184 & this._bitField);
              },
                  a = e.prototype.isResolved = function () {
                return 0 != (50331648 & this._bitField);
              };

              e.prototype.isCancelled = function () {
                return 0 != (8454144 & this._bitField);
              }, t.prototype.__isCancelled = function () {
                return 65536 == (65536 & this._bitField);
              }, t.prototype._isCancelled = function () {
                return this._target().__isCancelled();
              }, t.prototype.isCancelled = function () {
                return 0 != (8454144 & this._target()._bitField);
              }, t.prototype.isPending = function () {
                return s.call(this._target());
              }, t.prototype.isRejected = function () {
                return o.call(this._target());
              }, t.prototype.isFulfilled = function () {
                return i.call(this._target());
              }, t.prototype.isResolved = function () {
                return a.call(this._target());
              }, t.prototype.value = function () {
                return n.call(this._target());
              }, t.prototype.reason = function () {
                var t = this._target();

                return t._unsetRejectionIsUnhandled(), r.call(t);
              }, t.prototype._value = function () {
                return this._settledValue();
              }, t.prototype._reason = function () {
                return this._unsetRejectionIsUnhandled(), this._settledValue();
              }, t.PromiseInspection = e;
            };
          }, {}],
          33: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n) {
              var r = t("./util"),
                  i = r.errorObj,
                  o = r.isObject;
              var s = {}.hasOwnProperty;
              return function (t, a) {
                if (o(t)) {
                  if (t instanceof e) return t;

                  var c = function (t) {
                    try {
                      return function (t) {
                        return t.then;
                      }(t);
                    } catch (t) {
                      return i.e = t, i;
                    }
                  }(t);

                  if (c === i) {
                    a && a._pushContext();
                    var u = e.reject(c.e);
                    return a && a._popContext(), u;
                  }

                  if ("function" == typeof c) return function (t) {
                    try {
                      return s.call(t, "_promise0");
                    } catch (t) {
                      return !1;
                    }
                  }(t) ? (u = new e(n), t._then(u._fulfill, u._reject, void 0, u, null), u) : function (t, o, s) {
                    var a = new e(n),
                        c = a;
                    s && s._pushContext(), a._captureStackTrace(), s && s._popContext();
                    var u = !0,
                        l = r.tryCatch(o).call(t, function (t) {
                      a && (a._resolveCallback(t), a = null);
                    }, function (t) {
                      a && (a._rejectCallback(t, u, !0), a = null);
                    });
                    return u = !1, a && l === i && (a._rejectCallback(l.e, !0, !0), a = null), c;
                  }(t, c, a);
                }

                return t;
              };
            };
          }, {
            "./util": 36
          }],
          34: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r) {
              var i = t("./util"),
                  o = e.TimeoutError;

              function s(t) {
                this.handle = t;
              }

              s.prototype._resultCancelled = function () {
                clearTimeout(this.handle);
              };

              var a = function (t) {
                return c(+this).thenReturn(t);
              },
                  c = e.delay = function (t, i) {
                var o, c;
                return void 0 !== i ? (o = e.resolve(i)._then(a, null, null, t, void 0), r.cancellation() && i instanceof e && o._setOnCancel(i)) : (o = new e(n), c = setTimeout(function () {
                  o._fulfill();
                }, +t), r.cancellation() && o._setOnCancel(new s(c)), o._captureStackTrace()), o._setAsyncGuaranteed(), o;
              };

              e.prototype.delay = function (t) {
                return c(t, this);
              };

              function u(t) {
                return clearTimeout(this.handle), t;
              }

              function l(t) {
                throw clearTimeout(this.handle), t;
              }

              e.prototype.timeout = function (t, e) {
                var n, a;
                t = +t;
                var c = new s(setTimeout(function () {
                  n.isPending() && function (t, e, n) {
                    var r;
                    r = "string" != typeof e ? e instanceof Error ? e : new o("operation timed out") : new o(e), i.markAsOriginatingFromRejection(r), t._attachExtraTrace(r), t._reject(r), null != n && n.cancel();
                  }(n, e, a);
                }, t));
                return r.cancellation() ? (a = this.then(), (n = a._then(u, l, void 0, c, void 0))._setOnCancel(c)) : n = this._then(u, l, void 0, c, void 0), n;
              };
            };
          }, {
            "./util": 36
          }],
          35: [function (t, e, n) {
            "use strict";

            e.exports = function (e, n, r, i, o, s) {
              var a = t("./util"),
                  c = t("./errors").TypeError,
                  u = t("./util").inherits,
                  l = a.errorObj,
                  f = a.tryCatch,
                  p = {};

              function h(t) {
                setTimeout(function () {
                  throw t;
                }, 0);
              }

              function d(t, n) {
                var i = 0,
                    s = t.length,
                    a = new e(o);
                return function o() {
                  if (i >= s) return a._fulfill();

                  var c = function (t) {
                    var e = r(t);
                    return e !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && e._setDisposable(t._getDisposer()), e;
                  }(t[i++]);

                  if (c instanceof e && c._isDisposable()) {
                    try {
                      c = r(c._getDisposer().tryDispose(n), t.promise);
                    } catch (t) {
                      return h(t);
                    }

                    if (c instanceof e) return c._then(o, h, null, null, null);
                  }

                  o();
                }(), a;
              }

              function _(t, e, n) {
                this._data = t, this._promise = e, this._context = n;
              }

              function v(t, e, n) {
                this.constructor$(t, e, n);
              }

              function y(t) {
                return _.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t;
              }

              function m(t) {
                this.length = t, this.promise = null, this[t - 1] = null;
              }

              _.prototype.data = function () {
                return this._data;
              }, _.prototype.promise = function () {
                return this._promise;
              }, _.prototype.resource = function () {
                return this.promise().isFulfilled() ? this.promise().value() : p;
              }, _.prototype.tryDispose = function (t) {
                var e = this.resource(),
                    n = this._context;
                void 0 !== n && n._pushContext();
                var r = e !== p ? this.doDispose(e, t) : null;
                return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, r;
              }, _.isDisposer = function (t) {
                return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose;
              }, u(v, _), v.prototype.doDispose = function (t, e) {
                return this.data().call(t, t, e);
              }, m.prototype._resultCancelled = function () {
                for (var t = this.length, n = 0; n < t; ++n) {
                  var r = this[n];
                  r instanceof e && r.cancel();
                }
              }, e.using = function () {
                var t = arguments.length;
                if (t < 2) return n("you must pass at least 2 arguments to Promise.using");
                var i,
                    o = arguments[t - 1];
                if ("function" != typeof o) return n("expecting a function but got " + a.classString(o));
                var c = !0;
                2 === t && Array.isArray(arguments[0]) ? (t = (i = arguments[0]).length, c = !1) : (i = arguments, t--);

                for (var u = new m(t), p = 0; p < t; ++p) {
                  var h = i[p];

                  if (_.isDisposer(h)) {
                    var v = h;

                    (h = h.promise())._setDisposable(v);
                  } else {
                    var g = r(h);
                    g instanceof e && (h = g._then(y, null, null, {
                      resources: u,
                      index: p
                    }, void 0));
                  }

                  u[p] = h;
                }

                var b = new Array(u.length);

                for (p = 0; p < b.length; ++p) b[p] = e.resolve(u[p]).reflect();

                var w = e.all(b).then(function (t) {
                  for (var e = 0; e < t.length; ++e) {
                    var n = t[e];
                    if (n.isRejected()) return l.e = n.error(), l;
                    if (!n.isFulfilled()) return void w.cancel();
                    t[e] = n.value();
                  }

                  E._pushContext(), o = f(o);

                  var r = c ? o.apply(void 0, t) : o(t),
                      i = E._popContext();

                  return s.checkForgottenReturns(r, i, "Promise.using", E), r;
                }),
                    E = w.lastly(function () {
                  var t = new e.PromiseInspection(w);
                  return d(u, t);
                });
                return u.promise = E, E._setOnCancel(u), E;
              }, e.prototype._setDisposable = function (t) {
                this._bitField = 131072 | this._bitField, this._disposer = t;
              }, e.prototype._isDisposable = function () {
                return (131072 & this._bitField) > 0;
              }, e.prototype._getDisposer = function () {
                return this._disposer;
              }, e.prototype._unsetDisposable = function () {
                this._bitField = -131073 & this._bitField, this._disposer = void 0;
              }, e.prototype.disposer = function (t) {
                if ("function" == typeof t) return new v(t, this, i());
                throw new c();
              };
            };
          }, {
            "./errors": 12,
            "./util": 36
          }],
          36: [function (t, r, i) {
            "use strict";

            var o = t("./es5"),
                s = "undefined" == typeof navigator,
                a = {
              e: {}
            },
                c,
                u = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : void 0 !== this ? this : null;

            function l() {
              try {
                var t = c;
                return c = null, t.apply(this, arguments);
              } catch (t) {
                return a.e = t, a;
              }
            }

            function f(t) {
              return c = t, l;
            }

            var p = function (t, e) {
              var n = {}.hasOwnProperty;

              function r() {
                for (var r in this.constructor = t, this.constructor$ = e, e.prototype) n.call(e.prototype, r) && "$" !== r.charAt(r.length - 1) && (this[r + "$"] = e.prototype[r]);
              }

              return r.prototype = e.prototype, t.prototype = new r(), t.prototype;
            };

            function h(t) {
              return null == t || !0 === t || !1 === t || "string" == typeof t || "number" == typeof t;
            }

            function d(t) {
              return "function" == typeof t || "object" == typeof t && null !== t;
            }

            function _(t) {
              return h(t) ? new Error(T(t)) : t;
            }

            function v(t, e) {
              var n,
                  r = t.length,
                  i = new Array(r + 1);

              for (n = 0; n < r; ++n) i[n] = t[n];

              return i[n] = e, i;
            }

            function y(t, e, n) {
              if (!o.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
              var r = Object.getOwnPropertyDescriptor(t, e);
              return null != r ? null == r.get && null == r.set ? r.value : n : void 0;
            }

            function m(t, e, n) {
              if (h(t)) return t;
              var r = {
                value: n,
                configurable: !0,
                enumerable: !1,
                writable: !0
              };
              return o.defineProperty(t, e, r), t;
            }

            function g(t) {
              throw t;
            }

            var b = function () {
              var t = [Array.prototype, Object.prototype, Function.prototype],
                  e = function (e) {
                for (var n = 0; n < t.length; ++n) if (t[n] === e) return !0;

                return !1;
              };

              if (o.isES5) {
                var n = Object.getOwnPropertyNames;
                return function (t) {
                  for (var r = [], i = Object.create(null); null != t && !e(t);) {
                    var s;

                    try {
                      s = n(t);
                    } catch (t) {
                      return r;
                    }

                    for (var a = 0; a < s.length; ++a) {
                      var c = s[a];

                      if (!i[c]) {
                        i[c] = !0;
                        var u = Object.getOwnPropertyDescriptor(t, c);
                        null != u && null == u.get && null == u.set && r.push(c);
                      }
                    }

                    t = o.getPrototypeOf(t);
                  }

                  return r;
                };
              }

              var r = {}.hasOwnProperty;
              return function (n) {
                if (e(n)) return [];
                var i = [];

                t: for (var o in n) if (r.call(n, o)) i.push(o);else {
                  for (var s = 0; s < t.length; ++s) if (r.call(t[s], o)) continue t;

                  i.push(o);
                }

                return i;
              };
            }(),
                w = /this\s*\.\s*\S+\s*=/;

            function E(t) {
              try {
                if ("function" == typeof t) {
                  var e = o.names(t.prototype),
                      n = o.isES5 && e.length > 1,
                      r = e.length > 0 && !(1 === e.length && "constructor" === e[0]),
                      i = w.test(t + "") && o.names(t).length > 0;
                  if (n || r || i) return !0;
                }

                return !1;
              } catch (t) {
                return !1;
              }
            }

            function C(t) {
              function e() {}

              e.prototype = t;

              for (var n = 8; n--;) new e();

              return t;
            }

            var k = /^[a-z$_][a-z$_0-9]*$/i;

            function j(t) {
              return k.test(t);
            }

            function F(t, e, n) {
              for (var r = new Array(t), i = 0; i < t; ++i) r[i] = e + i + n;

              return r;
            }

            function T(t) {
              try {
                return t + "";
              } catch (t) {
                return "[no string representation]";
              }
            }

            function x(t) {
              return null !== t && "object" == typeof t && "string" == typeof t.message && "string" == typeof t.name;
            }

            function P(t) {
              try {
                m(t, "isOperational", !0);
              } catch (t) {}
            }

            function S(t) {
              return null != t && (t instanceof Error.__BluebirdErrorTypes__.OperationalError || !0 === t.isOperational);
            }

            function R(t) {
              return x(t) && o.propertyIsWritable(t, "stack");
            }

            var O = "stack" in new Error() ? function (t) {
              return R(t) ? t : new Error(T(t));
            } : function (t) {
              if (R(t)) return t;

              try {
                throw new Error(T(t));
              } catch (t) {
                return t;
              }
            };

            function A(t) {
              return {}.toString.call(t);
            }

            function I(t, e, n) {
              for (var r = o.names(t), i = 0; i < r.length; ++i) {
                var s = r[i];
                if (n(s)) try {
                  o.defineProperty(e, s, o.getDescriptor(t, s));
                } catch (t) {}
              }
            }

            var D = function (t) {
              return o.isArray(t) ? t : null;
            };

            if ("undefined" != typeof Symbol && Symbol.iterator) {
              var L = "function" == typeof Array.from ? function (t) {
                return Array.from(t);
              } : function (t) {
                for (var e, n = [], r = t[Symbol.iterator](); !(e = r.next()).done;) n.push(e.value);

                return n;
              };

              D = function (t) {
                return o.isArray(t) ? t : null != t && "function" == typeof t[Symbol.iterator] ? L(t) : null;
              };
            }

            var U = void 0 !== e && "[object process]" === A(e).toLowerCase();

            function N(t, n) {
              return U ? e.env[t] : n;
            }

            function V() {
              if ("function" == typeof Promise) try {
                var t = new Promise(function () {});
                if ("[object Promise]" === {}.toString.call(t)) return Promise;
              } catch (t) {}
            }

            function B(t, e) {
              return t.bind(e);
            }

            var H = {
              isClass: E,
              isIdentifier: j,
              inheritedDataKeys: b,
              getDataPropertyOrDefault: y,
              thrower: g,
              isArray: o.isArray,
              asArray: D,
              notEnumerableProp: m,
              isPrimitive: h,
              isObject: d,
              isError: x,
              canEvaluate: s,
              errorObj: a,
              tryCatch: f,
              inherits: p,
              withAppended: v,
              maybeWrapAsError: _,
              toFastProperties: C,
              filledRange: F,
              toString: T,
              canAttachTrace: R,
              ensureErrorObject: O,
              originatesFromRejection: S,
              markAsOriginatingFromRejection: P,
              classString: A,
              copyDescriptors: I,
              hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
              isNode: U,
              env: N,
              global: u,
              getNativePromise: V,
              domainBind: B
            },
                M;
            H.isRecentNode = H.isNode && (M = e.versions.node.split(".").map(Number), 0 === M[0] && M[1] > 10 || M[0] > 0), H.isNode && H.toFastProperties(e);

            try {
              throw new Error();
            } catch (t) {
              H.lastLineError = t;
            }

            r.exports = H;
          }, {
            "./es5": 13
          }]
        }, {}, [4])(4);
      }, t.exports = i(), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);
    }).call(this, n(4), n(1), n(10).setImmediate);
  }, function (t, e) {
    var n;

    n = function () {
      return this;
    }();

    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (n = window);
    }

    t.exports = n;
  }, function (t, e) {
    function n(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
      }
    }

    t.exports = function (t, e, r) {
      return e && n(t.prototype, e), r && n(t, r), t;
    };
  }, function (t) {
    t.exports = {
      name: "epub-press-js",
      version: "0.5.3",
      description: "Javascript client for building books with EpubPress.",
      homepage: "https://github.com/haroldtreen/epub-press-clients#readme",
      baseUrl: "https://epub.press",
      main: "build/index.js",
      directories: {
        tests: "test"
      },
      scripts: {
        test: "export NODE_ENV=test && open http://localhost:5001/tests && webpack-dev-server",
        start: "export NODE_ENV=development && webpack --watch --progress --color",
        build: "export NODE_ENV=development && webpack",
        "build-prod": "export NODE_ENV=production && webpack --optimize-minimize --optimize-dedupe",
        preversion: "npm run-script build-prod",
        prepublish: "npm run build-prod"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/haroldtreen/epub-press-clients.git"
      },
      keywords: ["epub", "publishing", "productivity", "client", "epubpress", "ebooks", "content", "extraction"],
      author: "EpubPress",
      license: "GPL-3.0+",
      bugs: {
        url: "https://github.com/haroldtreen/epub-press-clients/issues"
      },
      devDependencies: {
        "@babel/core": "^7.2.2",
        "@babel/plugin-transform-runtime": "^7.2.0",
        "@babel/preset-env": "^7.2.3",
        "@babel/runtime": "^7.2.0",
        "babel-loader": "^8.0.5",
        chai: "^3.5.0",
        "fetch-mock": "^5.0.3",
        mocha: "^5.2.0",
        "mocha-loader": "^2.0.0",
        sinon: "^7.2.3",
        webpack: "^4.0.0",
        "webpack-cli": "^3.2.1",
        "webpack-dev-server": "^3.1.14"
      },
      dependencies: {
        bluebird: "^3.4.6",
        "file-saver": "^1.3.3",
        "isomorphic-fetch": "^2.2.1"
      }
    };
  }, function (t, e) {
    var n,
        r,
        i = t.exports = {};

    function o() {
      throw new Error("setTimeout has not been defined");
    }

    function s() {
      throw new Error("clearTimeout has not been defined");
    }

    function a(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);

      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }

    !function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : o;
      } catch (t) {
        n = o;
      }

      try {
        r = "function" == typeof clearTimeout ? clearTimeout : s;
      } catch (t) {
        r = s;
      }
    }();
    var c,
        u = [],
        l = !1,
        f = -1;

    function p() {
      l && c && (l = !1, c.length ? u = c.concat(u) : f = -1, u.length && h());
    }

    function h() {
      if (!l) {
        var t = a(p);
        l = !0;

        for (var e = u.length; e;) {
          for (c = u, u = []; ++f < e;) c && c[f].run();

          f = -1, e = u.length;
        }

        c = null, l = !1, function (t) {
          if (r === clearTimeout) return clearTimeout(t);
          if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);

          try {
            r(t);
          } catch (e) {
            try {
              return r.call(null, t);
            } catch (e) {
              return r.call(this, t);
            }
          }
        }(t);
      }
    }

    function d(t, e) {
      this.fun = t, this.array = e;
    }

    function _() {}

    i.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      u.push(new d(t, e)), 1 !== u.length || l || a(h);
    }, d.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = _, i.addListener = _, i.once = _, i.off = _, i.removeListener = _, i.removeAllListeners = _, i.emit = _, i.prependListener = _, i.prependOnceListener = _, i.listeners = function (t) {
      return [];
    }, i.binding = function (t) {
      throw new Error("process.binding is not supported");
    }, i.cwd = function () {
      return "/";
    }, i.chdir = function (t) {
      throw new Error("process.chdir is not supported");
    }, i.umask = function () {
      return 0;
    };
  }, function (t, e) {
    t.exports = function (t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    };
  }, function (t, e, n) {
    var r,
        i = i || function (t) {
      "use strict";

      if (!(void 0 === t || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
        var e = t.document,
            n = function () {
          return t.URL || t.webkitURL || t;
        },
            r = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            i = ("download" in r),
            o = /constructor/i.test(t.HTMLElement) || t.safari,
            s = /CriOS\/[\d]+/.test(navigator.userAgent),
            a = function (e) {
          (t.setImmediate || t.setTimeout)(function () {
            throw e;
          }, 0);
        },
            c = function (t) {
          setTimeout(function () {
            "string" == typeof t ? n().revokeObjectURL(t) : t.remove();
          }, 4e4);
        },
            u = function (t) {
          return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], {
            type: t.type
          }) : t;
        },
            l = function (e, l, f) {
          f || (e = u(e));

          var p,
              h = this,
              d = "application/octet-stream" === e.type,
              _ = function () {
            !function (t, e, n) {
              for (var r = (e = [].concat(e)).length; r--;) {
                var i = t["on" + e[r]];
                if ("function" == typeof i) try {
                  i.call(t, n || t);
                } catch (t) {
                  a(t);
                }
              }
            }(h, "writestart progress write writeend".split(" "));
          };

          if (h.readyState = h.INIT, i) return p = n().createObjectURL(e), void setTimeout(function () {
            var t, e;
            r.href = p, r.download = l, t = r, e = new MouseEvent("click"), t.dispatchEvent(e), _(), c(p), h.readyState = h.DONE;
          });
          !function () {
            if ((s || d && o) && t.FileReader) {
              var r = new FileReader();
              return r.onloadend = function () {
                var e = s ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                t.open(e, "_blank") || (t.location.href = e), e = void 0, h.readyState = h.DONE, _();
              }, r.readAsDataURL(e), void (h.readyState = h.INIT);
            }

            p || (p = n().createObjectURL(e)), d ? t.location.href = p : t.open(p, "_blank") || (t.location.href = p);
            h.readyState = h.DONE, _(), c(p);
          }();
        },
            f = l.prototype;

        return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (t, e, n) {
          return e = e || t.name || "download", n || (t = u(t)), navigator.msSaveOrOpenBlob(t, e);
        } : (f.abort = function () {}, f.readyState = f.INIT = 0, f.WRITING = 1, f.DONE = 2, f.error = f.onwritestart = f.onprogress = f.onwrite = f.onabort = f.onerror = f.onwriteend = null, function (t, e, n) {
          return new l(t, e || t.name || "download", n);
        });
      }
    }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */


    t.exports ? t.exports.saveAs = i : null !== n(12) && null !== n(13) && (void 0 === (r = function () {
      return i;
    }.call(e, n, e, t)) || (t.exports = r));
  }, function (t, e, n) {
    n(8), t.exports = n(9);
  }, function (e, n) {
    e.exports = t;
  }, function (t, e, n) {
    "use strict";

    n.r(e);
    var r = n(5),
        i = n.n(r),
        o = n(2),
        s = n.n(o),
        a = n(0),
        c = n.n(a),
        u = n(6),
        l = n(3);

    function f() {
      var t;
      m.DEBUG && (t = console).log.apply(t, arguments);
    }

    function p(t) {
      if (!t.getId()) throw new Error("Book has no id. Have you published?");
    }

    function h(t, e) {
      var r;
      "undefined" != typeof window ? (r = "function" == typeof File ? new File([e], t) : new Blob([e], {
        type: "application/octet-stream"
      }), Object(u.saveAs)(r, t)) : n(14).writeFileSync(t, e);
    }

    function d(t) {
      return new c.a(function (e, n) {
        !function r(i) {
          t.checkStatus().then(function (o) {
            t.emit("statusUpdate", o), Number(o.progress) >= 100 ? e(t) : i >= m.CHECK_STATUS_LIMIT ? n(new Error(m.ERROR_CODES[503])) : setTimeout(r, m.POLL_RATE, i + 1);
          }).catch(n);
        }(1);
      });
    }

    function _(t) {
      var e = m.ERROR_CODES[t.status];
      if (t.status >= 200 && t.status < 300) return t;
      if (t.body) return t.json().then(function (t) {
        var n = t.errors && t.errors.length > 0 ? t.errors[0].detail : e;
        return c.a.reject(new Error(n));
      });
      var n = new Error(e);
      return c.a.reject(n);
    }

    function v(t) {
      var e = m.ERROR_CODES[t.message] || m.ERROR_CODES[t.name];
      return e ? new Error(e) : t;
    }

    function y(t) {
      var e = ["email", "filetype"].map(function (e) {
        return t[e] ? "".concat(e, "=").concat(encodeURIComponent(t[e])) : "";
      }).filter(function (t) {
        return t;
      }).join("&");
      return e ? "?".concat(e) : "";
    }

    var m = function () {
      function t(e) {
        i()(this, t);
        var n = Date().slice(0, Date().match(/\d{4}/).index + 4),
            r = {
          title: "EpubPress - ".concat(n),
          description: void 0,
          sections: void 0,
          urls: void 0,
          filetype: "epub"
        };
        this.bookData = Object.assign({}, r, e), this.events = {};
      }

      return s()(t, null, [{
        key: "checkForUpdates",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "epub-press-js",
              n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t.getVersion();
          return new c.a(function (r, i) {
            fetch(t.getVersionUrl()).then(_).then(function (t) {
              return t.json();
            }).then(function (t) {
              var o,
                  s,
                  a = t.clients[e];
              a ? r((o = n, s = a, Number(s.minCompatible.replace(".", "")) > Number(o.replace(".", "")) ? s.message : null)) : i(new Error("Version data for ".concat(e, " not found.")));
            }).catch(function (t) {
              var e = v(t);
              f("Version check failed", e), i(e);
            });
          });
        }
      }, {
        key: "getPublishUrl",
        value: function () {
          return this.prototype.getPublishUrl();
        }
      }, {
        key: "getVersionUrl",
        value: function () {
          return "".concat(t.BASE_API, "/version");
        }
      }, {
        key: "getVersion",
        value: function () {
          return t.VERSION;
        }
      }]), s()(t, [{
        key: "on",
        value: function (t, e) {
          return this.events[t] || (this.events[t] = []), this.events[t].push(e), e;
        }
      }, {
        key: "emit",
        value: function (t) {
          for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];

          this.events[t] && this.events[t].forEach(function (t) {
            t.apply(void 0, n);
          });
        }
      }, {
        key: "removeListener",
        value: function (t, e) {
          if (this.events[t]) {
            var n = this.events[t].indexOf(e);
            n >= 0 && this.events[t].splice(n, 1);
          }
        }
      }, {
        key: "getUrls",
        value: function () {
          var t = [],
              e = this.bookData,
              n = e.urls,
              r = e.sections;
          return n ? t = n.slice() : r && (t = r.map(function (t) {
            return t.url;
          })), t;
        }
      }, {
        key: "getFiletype",
        value: function (t) {
          var e = t || this.bookData.filetype;
          return e && ["mobi", "epub"].find(function (t) {
            return e.toLowerCase() === t;
          }) || "epub";
        }
      }, {
        key: "getEmail",
        value: function () {
          return this.bookData.email;
        }
      }, {
        key: "getTitle",
        value: function () {
          return this.bookData.title;
        }
      }, {
        key: "getDescription",
        value: function () {
          return this.bookData.description;
        }
      }, {
        key: "getId",
        value: function () {
          return this.bookData.id;
        }
      }, {
        key: "getStatusUrl",
        value: function () {
          return "".concat(t.getPublishUrl(), "/").concat(this.getId(), "/status");
        }
      }, {
        key: "getPublishUrl",
        value: function () {
          return "".concat(t.BASE_API, "/books");
        }
      }, {
        key: "getDownloadUrl",
        value: function () {
          var t = y({
            filetype: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getFiletype()
          });
          return "".concat(this.getPublishUrl(), "/").concat(this.getId(), "/download").concat(t);
        }
      }, {
        key: "getEmailUrl",
        value: function () {
          var t = y({
            email: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getEmail(),
            filetype: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getFiletype()
          });
          return "".concat(this.getPublishUrl(), "/").concat(this.getId(), "/email").concat(t);
        }
      }, {
        key: "checkStatus",
        value: function () {
          var t = this;
          return new c.a(function (e, n) {
            fetch(t.getStatusUrl()).then(_).then(function (t) {
              return t.json();
            }).then(function (t) {
              e(t);
            }).catch(function (t) {
              var e = v(t);
              n(e);
            });
          });
        }
      }, {
        key: "publish",
        value: function () {
          var t = this;
          return this.isPublishing ? c.a.reject(new Error("Publishing in progress")) : this.getId() ? c.a.resolve(this.getId()) : (this.isPublishing = !0, new c.a(function (e, n) {
            var r, i;
            fetch(t.getPublishUrl(), (r = t.bookData, i = {
              title: r.title,
              description: r.description
            }, r.sections ? i.sections = r.sections : i.urls = r.urls.slice(), {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(i)
            })).then(_).then(function (t) {
              return t.json();
            }).then(function (n) {
              var r = n.id;
              return t.bookData.id = r, d(t).then(function () {
                e(r);
              });
            }).catch(function (e) {
              t.isPublishing = !1;
              var r = v(e);
              f("EbupPress: Publish failed", r), n(r);
            });
          }));
        }
      }, {
        key: "download",
        value: function (t) {
          var e = this;
          return new c.a(function (n, r) {
            p(e), fetch(e.getDownloadUrl(t)).then(_).then(function (t) {
              return t.blob ? t.blob() : t.buffer();
            }).then(function (r) {
              h("".concat(e.getTitle(), ".").concat(t || e.getFiletype()), r), n();
            }).catch(function (t) {
              var e = v(t);
              f("EpubPress: Download failed", e), r(e);
            });
          });
        }
      }, {
        key: "email",
        value: function (t, e) {
          var n = this;
          return new c.a(function (r, i) {
            return t ? (p(n), fetch(n.getEmailUrl(t, e)).then(_).then(function () {
              f("EpubPress: Book delivered."), r();
            }).catch(function (t) {
              var e = v(t);
              f("EpubPress: Email delivery failed."), i(e);
            })) : i(new Error("EpubPress: No email provided."));
          });
        }
      }]), t;
    }();

    m.BASE_URL = l.baseUrl, m.BASE_API = "".concat(m.BASE_URL, "/api/v1"), m.VERSION = l.version, m.POLL_RATE = 3e3, m.CHECK_STATUS_LIMIT = 40, m.ERROR_CODES = {
      0: "Server is down. Please try again later.",
      "Failed to fetch": "Server is down. Please try again later.",
      FetchError: "Server is down. Please try again later.",
      400: "There was a problem with the request. Is EpubPress up to date?",
      404: "Resource not found.",
      422: "Request contained invalid data.",
      500: "Unexpected server error.",
      503: "Server took too long to respond.",
      timeout: "Request took too long to complete.",
      error: void 0,
      SERVER_FAILED: "Server error while downloading.",
      SERVER_BAD_CONTENT: "Book could not be found"
    }, e.default = m;
  }, function (t, e, n) {
    (function (t) {
      var r = void 0 !== t && t || "undefined" != typeof self && self || window,
          i = Function.prototype.apply;

      function o(t, e) {
        this._id = t, this._clearFn = e;
      }

      e.setTimeout = function () {
        return new o(i.call(setTimeout, r, arguments), clearTimeout);
      }, e.setInterval = function () {
        return new o(i.call(setInterval, r, arguments), clearInterval);
      }, e.clearTimeout = e.clearInterval = function (t) {
        t && t.close();
      }, o.prototype.unref = o.prototype.ref = function () {}, o.prototype.close = function () {
        this._clearFn.call(r, this._id);
      }, e.enroll = function (t, e) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = e;
      }, e.unenroll = function (t) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = -1;
      }, e._unrefActive = e.active = function (t) {
        clearTimeout(t._idleTimeoutId);
        var e = t._idleTimeout;
        e >= 0 && (t._idleTimeoutId = setTimeout(function () {
          t._onTimeout && t._onTimeout();
        }, e));
      }, n(11), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate;
    }).call(this, n(1));
  }, function (t, e, n) {
    (function (t, e) {
      !function (t, n) {
        "use strict";

        if (!t.setImmediate) {
          var r,
              i,
              o,
              s,
              a,
              c = 1,
              u = {},
              l = !1,
              f = t.document,
              p = Object.getPrototypeOf && Object.getPrototypeOf(t);
          p = p && p.setTimeout ? p : t, "[object process]" === {}.toString.call(t.process) ? r = function (t) {
            e.nextTick(function () {
              d(t);
            });
          } : !function () {
            if (t.postMessage && !t.importScripts) {
              var e = !0,
                  n = t.onmessage;
              return t.onmessage = function () {
                e = !1;
              }, t.postMessage("", "*"), t.onmessage = n, e;
            }
          }() ? t.MessageChannel ? ((o = new MessageChannel()).port1.onmessage = function (t) {
            d(t.data);
          }, r = function (t) {
            o.port2.postMessage(t);
          }) : f && "onreadystatechange" in f.createElement("script") ? (i = f.documentElement, r = function (t) {
            var e = f.createElement("script");
            e.onreadystatechange = function () {
              d(t), e.onreadystatechange = null, i.removeChild(e), e = null;
            }, i.appendChild(e);
          }) : r = function (t) {
            setTimeout(d, 0, t);
          } : (s = "setImmediate$" + Math.random() + "$", a = function (e) {
            e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(s) && d(+e.data.slice(s.length));
          }, t.addEventListener ? t.addEventListener("message", a, !1) : t.attachEvent("onmessage", a), r = function (e) {
            t.postMessage(s + e, "*");
          }), p.setImmediate = function (t) {
            "function" != typeof t && (t = new Function("" + t));

            for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];

            var i = {
              callback: t,
              args: e
            };
            return u[c] = i, r(c), c++;
          }, p.clearImmediate = h;
        }

        function h(t) {
          delete u[t];
        }

        function d(t) {
          if (l) setTimeout(d, 0, t);else {
            var e = u[t];

            if (e) {
              l = !0;

              try {
                !function (t) {
                  var e = t.callback,
                      r = t.args;

                  switch (r.length) {
                    case 0:
                      e();
                      break;

                    case 1:
                      e(r[0]);
                      break;

                    case 2:
                      e(r[0], r[1]);
                      break;

                    case 3:
                      e(r[0], r[1], r[2]);
                      break;

                    default:
                      e.apply(n, r);
                  }
                }(e);
              } finally {
                h(t), l = !1;
              }
            }
          }
        }
      }("undefined" == typeof self ? void 0 === t ? this : t : self);
    }).call(this, n(1), n(4));
  }, function (t, e) {
    t.exports = function () {
      throw new Error("define cannot be used indirect");
    };
  }, function (t, e) {
    (function (e) {
      t.exports = e;
    }).call(this, {});
  }, function (t, n) {
    t.exports = e;
  }]);
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jshint node:true*/


/**
 * Replaces characters in strings that are illegal/unsafe for filenames.
 * Unsafe characters are either removed or replaced by a substitute set
 * in the optional `options` object.
 *
 * Illegal Characters on Various Operating Systems
 * / ? < > \ : * | "
 * https://kb.acronis.com/content/39790
 *
 * Unicode Control codes
 * C0 0x00-0x1f & C1 (0x80-0x9f)
 * http://en.wikipedia.org/wiki/C0_and_C1_control_codes
 *
 * Reserved filenames on Unix-based systems (".", "..")
 * Reserved filenames in Windows ("CON", "PRN", "AUX", "NUL", "COM1",
 * "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
 * "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", and
 * "LPT9") case-insesitively and with or without filename extensions.
 *
 * Capped at 255 characters in length.
 * http://unix.stackexchange.com/questions/32795/what-is-the-maximum-allowed-filename-and-folder-size-with-ecryptfs
 *
 * @param  {String} input   Original filename
 * @param  {Object} options {replacement: String | Function }
 * @return {String}         Sanitized filename
 */

var truncate = __webpack_require__(11);

var illegalRe = /[\/\?<>\\:\*\|"]/g;
var controlRe = /[\x00-\x1f\x80-\x9f]/g;
var reservedRe = /^\.+$/;
var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
var windowsTrailingRe = /[\. ]+$/;

function sanitize(input, replacement) {
  if (typeof input !== 'string') {
    throw new Error('Input must be string');
  }
  var sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement);
  return truncate(sanitized, 255);
}

module.exports = function (input, options) {
  var replacement = (options && options.replacement) || '';
  var output = sanitize(input, replacement);
  if (replacement === '') {
    return output;
  }
  return sanitize(output, '');
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(7);
module.exports = self.fetch.bind(self);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 8 */
/***/ (function(module, exports) {



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(10);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var truncate = __webpack_require__(12);
var getLength = __webpack_require__(13);
module.exports = truncate.bind(null, getLength);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isHighSurrogate(codePoint) {
  return codePoint >= 0xd800 && codePoint <= 0xdbff;
}

function isLowSurrogate(codePoint) {
  return codePoint >= 0xdc00 && codePoint <= 0xdfff;
}

// Truncate string by size in bytes
module.exports = function truncate(getLength, string, byteLength) {
  if (typeof string !== "string") {
    throw new Error("Input must be string");
  }

  var charLength = string.length;
  var curByteLength = 0;
  var codePoint;
  var segment;

  for (var i = 0; i < charLength; i += 1) {
    codePoint = string.charCodeAt(i);
    segment = string[i];

    if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
      i += 1;
      segment += string[i];
    }

    curByteLength += getLength(segment);

    if (curByteLength === byteLength) {
      return string.slice(0, i + 1);
    }
    else if (curByteLength > byteLength) {
      return string.slice(0, i - segment.length + 1);
    }
  }

  return string;
};



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isHighSurrogate(codePoint) {
  return codePoint >= 0xd800 && codePoint <= 0xdbff;
}

function isLowSurrogate(codePoint) {
  return codePoint >= 0xdc00 && codePoint <= 0xdfff;
}

// Truncate string by size in bytes
module.exports = function getByteLength(string) {
  if (typeof string !== "string") {
    throw new Error("Input must be string");
  }

  var charLength = string.length;
  var byteLength = 0;
  var codePoint = null;
  var prevCodePoint = null;
  for (var i = 0; i < charLength; i++) {
    codePoint = string.charCodeAt(i);
    // handle 4-byte non-BMP chars
    // low surrogate
    if (isLowSurrogate(codePoint)) {
      // when parsing previous hi-surrogate, 3 is added to byteLength
      if (prevCodePoint != null && isHighSurrogate(prevCodePoint)) {
        byteLength += 1;
      }
      else {
        byteLength += 3;
      }
    }
    else if (codePoint <= 0x7f ) {
      byteLength += 1;
    }
    else if (codePoint >= 0x80 && codePoint <= 0x7ff) {
      byteLength += 2;
    }
    else if (codePoint >= 0x800 && codePoint <= 0xffff) {
      byteLength += 3;
    }
    prevCodePoint = codePoint;
  }

  return byteLength;
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../epub-press-js/build/index.js
var build = __webpack_require__(2);
var build_default = /*#__PURE__*/__webpack_require__.n(build);

// EXTERNAL MODULE: ./node_modules/bluebird/js/browser/bluebird.js
var bluebird = __webpack_require__(0);
var bluebird_default = /*#__PURE__*/__webpack_require__.n(bluebird);

// EXTERNAL MODULE: ./node_modules/sanitize-filename/index.js
var sanitize_filename = __webpack_require__(4);
var sanitize_filename_default = /*#__PURE__*/__webpack_require__.n(sanitize_filename);

// CONCATENATED MODULE: ./scripts/browser.js



class browser_Browser {
  static isValidUrl(url) {
    let matchesValid = true;
    let matchesInvalid = false;
    const invalidRegex = [/\.pdf$/i, /\.jpg$/i, /\.png$/, /\.gif$/];
    const validRegex = [/^http/];
    invalidRegex.forEach(regex => {
      matchesInvalid = matchesInvalid || regex.test(url);
    });
    validRegex.forEach(regex => {
      matchesValid = matchesValid && regex.test(url);
    });
    return matchesValid && !matchesInvalid;
  }

  static filterUrls(urls) {
    return (urls || []).filter(browser_Browser.isValidUrl);
  }

  static isBackgroundMsg(sender) {
    return !sender.url || sender.url.indexOf('popup') < 0;
  }

  static isPopupMsg(sender) {
    return sender.url && sender.url.indexOf('popup') > -1;
  }

  static getCurrentWindowTabs() {
    let promise;

    if (chrome) {
      promise = new bluebird_default.a((resolve, reject) => {
        chrome.windows.getCurrent({
          populate: true
        }, currentWindow => {
          if (currentWindow.tabs) {
            const websiteTabs = currentWindow.tabs.filter(tab => browser_Browser.isValidUrl(tab.url));
            resolve(websiteTabs);
          } else {
            reject(new Error('No tabs!'));
          }
        });
      });
    } else {
      promise = new bluebird_default.a(resolve => {
        resolve(null);
      });
    }

    return promise;
  }

  static getTabsHtml(tabs) {
    const func = () => document.documentElement.outerHTML;

    const htmlPromises = tabs.map(tab => new bluebird_default.a(resolve => {
      chrome.scripting.executeScript({
        target: {
          tabId: tab.id
        },
        func
      }, results => {
        const updatedTab = tab;
        const html = results && results[0] && results[0].result;

        if (html && html.match(/html/i)) {
          updatedTab.html = html;
        } else {
          updatedTab.html = null;
        }

        resolve(updatedTab);
      });
    }));
    return bluebird_default.a.all(htmlPromises);
  }

  static getLocalStorage(fields) {
    let promise;

    if (chrome) {
      promise = new bluebird_default.a(resolve => {
        chrome.storage.local.get(fields, state => {
          resolve(state);
        });
      });
    }

    return promise;
  }

  static setLocalStorage(keyValues) {
    chrome.storage.local.set(keyValues);
  }

  static sendMessage(...args) {
    chrome.runtime.sendMessage(...args);
  }

  static onBackgroundMessage(cb) {
    chrome.runtime.onMessage.addListener((request, sender) => {
      if (browser_Browser.isBackgroundMsg(sender)) {
        cb(request, sender);
      }
    });
  }

  static onForegroundMessage(cb) {
    chrome.runtime.onMessage.addListener((request, sender) => {
      if (browser_Browser.isPopupMsg(sender)) {
        cb(request, sender);
      }
    });
  }

  static download(params) {
    let promise;
    const sanitizedParams = { ...params,
      filename: sanitize_filename_default()(params.filename)
    };

    if (chrome) {
      promise = new bluebird_default.a((resolve, reject) => {
        chrome.downloads.download(sanitizedParams, downloadId => {
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

    return promise;
  }

  static baseUrl() {
    return chrome.runtime.getManifest().homepage_url;
  }

  static getManifest() {
    return chrome.runtime.getManifest();
  }

  static getErrorMsg(location, xhr) {
    let msg = location ? `${location}:  ` : '';
    msg += xhr.responseText || browser_Browser.ERROR_CODES[xhr.statusText] || browser_Browser.ERROR_CODES[xhr.status] || browser_Browser.ERROR_CODES[xhr.current] || 'Unknown';
    return msg;
  }

}

browser_Browser.ERROR_CODES = {
  // Book Create Errors
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
/* harmony default export */ var browser = (browser_Browser);
// CONCATENATED MODULE: ./scripts/background.js


const manifest = browser.getManifest();
const DOWNLOAD_TIMEOUT = 300000; // 30 second timeout for downloads

build_default.a.BASE_API = `${manifest.homepage_url}api/v1`;

function timeoutDownload() {
  browser.setLocalStorage({
    downloadState: false,
    publishStatus: '{}'
  });
  browser.sendMessage({
    action: 'download',
    status: 'failed',
    error: 'Download timed out'
  });
}

browser.onForegroundMessage(request => {
  if (request.action === 'download') {
    browser.setLocalStorage({
      downloadState: true,
      publishStatus: '{}'
    });
    const timeout = setTimeout(timeoutDownload, DOWNLOAD_TIMEOUT);
    browser.getLocalStorage(['email', 'filetype']).then(state => {
      const book = new build_default.a(Object.assign({}, request.book));
      book.on('statusUpdate', status => {
        browser.setLocalStorage({
          publishStatus: JSON.stringify(status)
        });
        browser.sendMessage({
          action: 'publish',
          progress: status.progress,
          message: status.message
        });
      });
      book.publish().then(() => {
        const email = state.email && state.email.trim();
        const {
          filetype
        } = state;
        return email ? book.email(email, filetype) : browser.download({
          filename: `${book.getTitle()}.${filetype || book.getFiletype()}`,
          url: book.getDownloadUrl(filetype)
        });
      }).then(() => {
        clearTimeout(timeout);
        browser.setLocalStorage({
          downloadState: false,
          publishStatus: '{}'
        });
        browser.sendMessage({
          action: 'download',
          status: 'complete'
        });
      }).catch(e => {
        clearTimeout(timeout);
        browser.setLocalStorage({
          downloadState: false,
          publishStatus: '{}'
        });
        browser.sendMessage({
          action: 'download',
          status: 'failed',
          error: e.message
        });
      });
    });
  }
});

/***/ })
/******/ ]);