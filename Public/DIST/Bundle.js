/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
    _require$codes = _require.codes,
    ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
    ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;

var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");

var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require2.inspect;

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isPromise = _require$types.isPromise,
    isRegExp = _require$types.isRegExp;

var objectAssign = Object.assign ? Object.assign : (__webpack_require__(/*! es6-object-assign */ "./node_modules/es6-object-assign/index.js").assign);
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;

function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");

  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
} // Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex


var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];

var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};

var warned = false; // The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}

function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;

  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }

    if (argsLen === 2) operator = '!=';
  }

  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };

  if (message !== undefined) {
    errArgs.message = message;
  }

  var err = new AssertionError(errArgs);

  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }

  throw err;
}

assert.fail = fail; // The AssertionError is defined in internal/error.

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;

    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }

    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
} // Pure assertion tests whether a value is truthy, as determined
// by !!value.


function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  innerOk.apply(void 0, [ok, args.length].concat(args));
}

assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.

/* eslint-disable no-restricted-properties */

assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
}; // The non-equality assertion tests for whether two objects are not
// equal with !=.


assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
}; // The equivalence assertion tests a deep equality relation.


assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
}; // The non-equivalence assertion tests for any deep inequality.


assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */


assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;

function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};

var Comparison = function Comparison(obj, keys, actual) {
  var _this = this;

  _classCallCheck(this, Comparison);

  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
};

function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }

    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}

function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.

    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    } // Handle primitives properly.


    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }

    var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
    // as well.

    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }

    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
        return;
      }

      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  } // Guard instanceof against arrow functions as they don't have a prototype.


  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION_SENTINEL;
}

function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.
  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.
  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;

    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn(); // Fail in case no promise is returned.

      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }

    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}

function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }

    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }

    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }

  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';

    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }

    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }

  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}

function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;

  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }

  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }

  throw actual;
}

assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};

assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};

assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};

assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};

assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';

    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }

    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    }); // Make sure we actually have a stack trace!

    var origStack = err.stack;

    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift(); // Filter all frames existing in err.stack.

      var tmp1 = newErr.stack.split('\n');

      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);

        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }

      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }

    throw newErr;
  }
}; // Expose a strict only variant of assert


function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  innerOk.apply(void 0, [strict, args.length].concat(args));
}

assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require.inspect;

var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
    ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat


function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));

  while (count) {
    str += str;
    count--;
  }

  str += str.substring(0, maxCount - str.length);
  return str;
}

var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
}; // Comparing short primitives should just show === / !== instead of using the
// diff.

var kMaxShortLength = 10;

function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}

function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}

function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.

  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  } // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.


  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.

    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;

      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        } // Ignore the first characters.


        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  } // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).


  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];

  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }

    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }

  var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.


    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);

      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }

    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }

  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }

  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }

  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");

  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;

    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the expected line to the cache.

      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++; // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the actual line to the result.

      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++; // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.

      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //

      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }

      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }

          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        } // Mark the current line as the last diverging one.


        lastPos = i; // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.

        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2; // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = ''; // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.

        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    } // Inspected object to big (Show ~20 rows max)


    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }

  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}

var AssertionError =
/*#__PURE__*/
function (_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(options) {
    var _this;

    _classCallCheck(this, AssertionError);

    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    var message = options.message,
        operator = options.operator,
        stackStartFn = options.stackStartFn;
    var actual = options.actual,
        expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;

    if (message != null) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      } // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.


      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }

      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.

        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        } // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.


        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);

          while (res.length > 27) {
            res.pop();
          }
        } // Only print a single input.


        if (res.length === 1) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
        } else {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
        }
      } else {
        var _res = inspectValue(actual);

        var other = '';
        var knownOperators = kReadableOperator[operator];

        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);

          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));

          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }

          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }

          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
      }
    }

    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;

    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    } // Create error message including the error code in the name.


    _this.stack; // Reset the name.

    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }

  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: inspect.custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread({}, ctx, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);

  return AssertionError;
}(_wrapNativeSuper(Error));

module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */

/* eslint node-core/alphabetize-errors: "error" */

/* eslint node-core/prefer-util-format-errors: "error" */
 // The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codes = {}; // Lazy loaded

var assert;
var util;

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inherits(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      var _this;

      _classCallCheck(this, NodeError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
      _this.code = code;
      return _this;
    }

    return NodeError;
  }(Base);

  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'

  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);

  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }

  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;

  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }

  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });

  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;

    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;

    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }

  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var regexFlagsSupported = /a/g.flags !== undefined;

var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};

var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};

var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
    isArrayBufferView = _require$types.isArrayBufferView,
    isDate = _require$types.isDate,
    isMap = _require$types.isMap,
    isRegExp = _require$types.isRegExp,
    isSet = _require$types.isSet,
    isNativeError = _require$types.isNativeError,
    isBoxedPrimitive = _require$types.isBoxedPrimitive,
    isNumberObject = _require$types.isNumberObject,
    isStringObject = _require$types.isStringObject,
    isBooleanObject = _require$types.isBooleanObject,
    isBigIntObject = _require$types.isBigIntObject,
    isSymbolObject = _require$types.isSymbolObject,
    isFloat32Array = _require$types.isFloat32Array,
    isFloat64Array = _require$types.isFloat64Array;

function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;

  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  } // The maximum size for an array is 2 ** 32 -1.


  return key.length === 10 && key >= Math.pow(2, 32);
}

function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
} // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3; // Check if they have the same source and flags

function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}

function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }

  return true;
}

function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}

function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}

function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }

  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }

  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }

  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }

  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
} // Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.


function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  } // Check more closely if val1 and val2 are equal.


  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }

    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }

    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }

      return false;
    }

    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }

  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }

    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.


  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }

  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    } // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.


    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);

    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (_keys.length !== _keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }

  return keyCheck(val1, val2, strict, memos, kNoIterator);
}

function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}

function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.

    if (aKeys.length !== bKeys.length) {
      return false;
    }
  } // Cheap key test


  var i = 0;

  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }

  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);

    if (symbolKeysA.length !== 0) {
      var count = 0;

      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];

        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }

          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }

      var symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }

  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  } // Use memos to handle cycles.


  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);

    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);

      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }

    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}

function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];

    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
} // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').


function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;

    case 'object':
      // Only pass in null as object!
      return undefined;

    case 'symbol':
      return false;

    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through

    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }

  }

  return true;
}

function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}

function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);

  if (altValue != null) {
    return altValue;
  }

  var curB = b.get(altValue);

  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }

  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}

function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);

  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.

    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      } // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.


      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.

      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }

      if (set === null) {
        set = new Set();
      }

      set.add(val);
    }
  }

  if (set !== null) {
    var bValues = arrayFromSet(b);

    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i]; // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.

      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];

    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);

  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
        key = _aEntries$i[0],
        item1 = _aEntries$i[1];

    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }

      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);

      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
        // keys.

        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;

        if (set === null) {
          set = new Set();
        }

        set.add(key);
      }
    }
  }

  if (set !== null) {
    var bEntries = arrayFromMap(b);

    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
          key = _bEntries$_i[0],
          item = _bEntries$_i[1];

      if (_typeof(key) === 'object' && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);

        for (; i < keysA.length; i++) {
          var key = keysA[i];

          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }

        if (keysA.length !== Object.keys(b).length) {
          return false;
        }

        return true;
      }
    }
  } // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:


  for (i = 0; i < keys.length; i++) {
    var _key = keys[i];

    if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
      return false;
    }
  }

  return true;
}

function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}

function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}

module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");
var parseProtocol = __webpack_require__(/*! ../helpers/parseProtocol */ "./node_modules/axios/lib/helpers/parseProtocol.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = __webpack_require__(/*! ./cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = (__webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version);
axios.toFormData = __webpack_require__(/*! ./helpers/toFormData */ "./node_modules/axios/lib/helpers/toFormData.js");

// Expose AxiosError class
axios.AxiosError = __webpack_require__(/*! ../lib/core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var CanceledError = __webpack_require__(/*! ./CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

module.exports = CanceledError;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var buildFullPath = __webpack_require__(/*! ./buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function(code) {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

module.exports = AxiosError;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var AxiosError = __webpack_require__(/*! ./AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var toFormData = __webpack_require__(/*! ../helpers/toFormData */ "./node_modules/axios/lib/helpers/toFormData.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: __webpack_require__(/*! ./env/FormData */ "./node_modules/axios/lib/helpers/null.js")
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  "version": "0.27.2"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/***/ ((module) => {

// eslint-disable-next-line strict
module.exports = null;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! ./node_modules/node-polyfill-webpack-plugin/node_modules/buffer/index.js */ "./node_modules/node-polyfill-webpack-plugin/node_modules/buffer/index.js")["Buffer"];


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function(el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

module.exports = toFormData;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");


var VERSION = (__webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version);
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = (function(TypedArray) {
  // eslint-disable-next-line func-names
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};


/***/ }),

/***/ "./Public/JS/App-LoggedIn.js":
/*!***********************************!*\
  !*** ./Public/JS/App-LoggedIn.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_showProfileForm": () => (/* binding */ _showProfileForm),
/* harmony export */   "_watchCommPreference": () => (/* binding */ _watchCommPreference),
/* harmony export */   "_watchForLogin": () => (/* binding */ _watchForLogin),
/* harmony export */   "_watchPasswordSubSectionButtons": () => (/* binding */ _watchPasswordSubSectionButtons),
/* harmony export */   "_watchPhoneNumberInputs": () => (/* binding */ _watchPhoneNumberInputs),
/* harmony export */   "_watchSubSectionButtons": () => (/* binding */ _watchSubSectionButtons),
/* harmony export */   "_watchUserProfileButtons": () => (/* binding */ _watchUserProfileButtons)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Update_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Update-User */ "./Public/JS/Update-User.js");
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Login */ "./Public/JS/Login.js");
/* harmony import */ var _Budget_Categories__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Budget-Categories */ "./Public/JS/Budget-Categories.js");
/* harmony import */ var _Budget_Creation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Budget-Creation */ "./Public/JS/Budget-Creation.js");
/* harmony import */ var _Maintain_Budget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Maintain-Budget */ "./Public/JS/Maintain-Budget.js");
/* harmony import */ var _Manage_Budget__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Manage-Budget */ "./Public/JS/Manage-Budget.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");










var latterDaySaint = false; // const _getUserInfo = () => {
//   getSomePersonals();
//   latterDaySaint = user.latterDaySaint;
// };

var enterBudget = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(budgetId, user) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Manage_Budget__WEBPACK_IMPORTED_MODULE_8__.getMyBudget(budgetId, user);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function enterBudget(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _watchBudgetSelection = function _watchBudgetSelection(user) {
  var budgetCards = document.querySelectorAll('.budget-card-container__card');
  budgetCards.forEach(function (bc, i) {
    bc.addEventListener('click', function (e) {
      var clicked = e.target;
      var id = clicked.closest('.budget-card-container__card').dataset.budgetid;
      enterBudget(id, user);
    });
  });
};

var formatPhoneNumber = function formatPhoneNumber(value, number) {
  if (!value) return value;
  var phoneNumber = value.replace(/[^\d]/g, '');
  var phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength <= 3) {
    return phoneNumber;
  }

  if (phoneNumberLength >= 4 && phoneNumberLength < 7) {
    return "(".concat(phoneNumber.slice(0, 3), ") ").concat(phoneNumber.slice(3, 6));
  }

  number = "(".concat(phoneNumber.slice(0, 3), ") ").concat(phoneNumber.slice(3, 6), " - ").concat(phoneNumber.slice(6));
  return number;
};

var _watchPhoneNumberInputs = function _watchPhoneNumberInputs(number) {
  var userProfileInputs = document.querySelectorAll('.form__input--dark-small');
  var userProfileSubInputs = document.querySelectorAll('.form__input--dark-extra-small');
  formatPhoneNumber(userProfileInputs[4].value);
  userProfileSubInputs[2].addEventListener('keyup', function (e) {
    userProfileSubInputs[2].value = formatPhoneNumber(userProfileSubInputs[2].value, number);
  });
  userProfileSubInputs[3].addEventListener('keyup', function (e) {
    userProfileSubInputs[3].value = formatPhoneNumber(userProfileSubInputs[3].value, number);
  });
};

var _togglePasswordSubSections = function _togglePasswordSubSections() {
  var userProfileSubSections = document.querySelectorAll('.form__section--sub-section');

  _openSubSections([userProfileSubSections[4]], 'closed');

  _openSubSections([userProfileSubSections[5]], 'closed');

  _openSubSections([userProfileSubSections[6]], 'closed');

  _openSubSections([userProfileSubSections[7]], 'closed');
};

var _watchPasswordSubSectionButtons = function _watchPasswordSubSectionButtons() {
  var userProfilePasswordSubSectionButtons = document.querySelectorAll('.user-profile-form__section__button__password-button');
  var transparentButtons = document.querySelectorAll('.button--small-transparent');
  transparentButtons[2].addEventListener('click', function (e) {
    e.preventDefault();
    console.log(transparentButtons[2]);
    return _togglePasswordSubSections();
  });
}; // Open User Profile Form Sub Sections

var _openSubSections = function _openSubSections(subSectionArray, className) {
  subSectionArray.forEach(function (ss) {
    return ss.classList.toggle(className);
  }); // subSection.classList.toggle(className);
};

var _watchSubSectionButtons = function _watchSubSectionButtons() {
  var userProfileSubSections = document.querySelectorAll('.form__section--sub-section');
  var userProfileFormSectionButtons = document.querySelectorAll('.button--borderless-narrow');
  userProfileFormSectionButtons.forEach(function (button, i) {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      if (i === 0) {
        _openSubSections([userProfileSubSections[0], userProfileSubSections[1]], 'closed');

        button.classList.toggle('button--borderless-narrow--clicked');
      }

      if (i === 1) {
        _openSubSections([userProfileSubSections[2], userProfileSubSections[3]], 'closed');

        button.classList.toggle('button--borderless-narrow--clicked');
      }
    });
  });
}; //////////////////////////////////////////////////
// ALL ABOUT WATCHING COMMUNICATION PREFERENCES

var _changeCommPreference = function _changeCommPreference() {
  if (commPreference === "Email") {
    return commPreference = "Text";
  } else {
    return commPreference = "Email";
  }
};

var _watchCommPreference = function _watchCommPreference(communicationSwitch) {
  if (communicationSwitch) {
    communicationSwitch.addEventListener('click', function (e) {
      communicationSwitch.classList.toggle('switch--comms--text-preferred');

      _changeCommPreference();
    });
  }
}; ////////////////////////////////////////////
// ALL ABOUT WATCHING USER PROFILE BUTTONS

var _watchLatterDaySaintSwitch = function _watchLatterDaySaintSwitch(ldsSwitch) {
  ldsSwitch.addEventListener('click', function (e) {
    ldsSwitch.classList.toggle('switch--latter-day-saint--switched');
    ldsSwitch.classList.toggle('r__switch--latter-day-saint--switched');
  });
};

var _showProfileForm = function _showProfileForm(forms, index) {
  forms.forEach(function (form) {
    form.style.display = 'none';
  });
  forms[index].style.display = 'flex';
};
var _watchUserProfileButtons = function _watchUserProfileButtons(communicationPreference) {
  var userProfileForms = document.querySelectorAll('.form--full-width');
  var userProfileHeader = document.querySelector('.user-profile-section__header__text');
  var userProfileContainer = document.querySelector('.user-profile-section');
  var userProfileContainerClose = document.querySelector('.user-profile-closure-icon');
  var userProfileButtons = document.querySelectorAll('.navigation--side-screen__section--account-links__link-container__link--link');
  var latterDaySaintSwitch = document.querySelector('.switch--latter-day-saint');

  if (userProfileButtons[0]) {
    userProfileButtons.forEach(function (pb, i) {
      pb.addEventListener('click', /*#__PURE__*/function () {
        var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(e) {
          var clicked, userInfo, user;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  e.preventDefault();
                  clicked = e.target;
                  userProfileHeader.textContent = clicked.closest('button').textContent;

                  _showProfileForm(userProfileForms, i);

                  if (i === 0) {
                    userProfileContainer.classList.remove('closed');
                    userProfileContainer.classList.add('open');
                    userProfileContainerClose.addEventListener('click', function (e) {
                      userProfileContainer.classList.add('closed');
                      userProfileContainer.classList.remove('open');
                    });

                    _watchLatterDaySaintSwitch(latterDaySaintSwitch);
                  }

                  if (!(i === 1)) {
                    _context2.next = 14;
                    break;
                  }

                  userProfileContainer.classList.remove('closed');
                  userProfileContainer.classList.add('open');
                  userProfileContainerClose.addEventListener('click', function (e) {
                    userProfileContainer.classList.add('closed');
                    userProfileContainer.classList.remove('open');
                  }); /////////////////////////////////
                  // GET COMMUNICATION PREFERENCE

                  _context2.next = 11;
                  return _Update_User__WEBPACK_IMPORTED_MODULE_3__.getSomePersonals();

                case 11:
                  userInfo = _context2.sent;
                  user = userInfo.data.data.user;
                  communicationPreference = user.communicationPreference;

                case 14:
                  if (i === 2) {
                    userProfileContainer.classList.remove('closed');
                    userProfileContainer.classList.add('open');
                    userProfileContainerClose.addEventListener('click', function (e) {
                      userProfileContainer.classList.add('closed');
                      userProfileContainer.classList.remove('open');
                    });
                  }

                  if (i === 3) {
                    userProfileContainer.classList.remove('closed');
                    userProfileContainer.classList.add('open');
                    userProfileContainerClose.addEventListener('click', function (e) {
                      userProfileContainer.classList.add('closed');
                      userProfileContainer.classList.remove('open');
                    });
                  }

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }());
    });
  }
}; //////////////////////////////
// Actually Close The Form

var _closeTheForm = function _closeTheForm(form) {
  form.classList.toggle('closed');
  form.classList.toggle('open');
};

var openPhotoUpdateModal = function openPhotoUpdateModal(modal) {
  modal.classList.toggle('closed');
  modal.classList.toggle('open');
};

var _watchForProfilePictureChange = function _watchForProfilePictureChange(user) {
  console.log('Watching...');
  var startUpdatingPhotoButton = document.querySelectorAll('.button--extra-small')[0];
  var photoUpdateModal = document.querySelector('.modal--update-photo');
  startUpdatingPhotoButton.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(startUpdatingPhotoButton);
    openPhotoUpdateModal(photoUpdateModal);
  });
  var stopUpdatingPhotoButton = document.querySelector('.form-closure-icon__alt');
  stopUpdatingPhotoButton.addEventListener('click', function (e) {
    _closeTheForm(photoUpdateModal);
  }); // Works as the image preview code.

  var previewPath = document.querySelector('.form__path-preview');
  var photoInput = document.getElementById('photo');
  var image = document.querySelector('.form__preview-photo-container__picture-frame__image');
  var reader = new FileReader(); // Update.updateMe()

  reader.onload = function (e) {
    image.src = e.target.result;
  };

  photoInput.onchange = function (e) {
    var _e$target$files = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target.files, 1),
        file = _e$target$files[0];

    console.log(file);
    reader.readAsDataURL(file);
    previewPath.textContent = file.name;
  };

  console.log(photoInput.value);
  var saveProfilePictureButton = document.querySelector('.button--update-photo');
  saveProfilePictureButton.addEventListener('click', function (e) {
    e.preventDefault();
    var form = new FormData();
    form.append('userId', "".concat(user._id));
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form.data);
    _Update_User__WEBPACK_IMPORTED_MODULE_3__.updateUserPhoto(form);
    _Maintain_Budget__WEBPACK_IMPORTED_MODULE_7__.reloadPage();
  });
};

var checkLoginStatus = function checkLoginStatus(login, checkElement) {
  var appViewport = document.querySelector('.application-viewport');

  if (appViewport) {
    return login = !login;
  }
};

var _watchForLogin = /*#__PURE__*/function () {
  var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3(login) {
    var status, _commPreference, commSwitch, formattedNumber, userInfo, user;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            status = checkLoginStatus(login);
            status === true ? console.log("Logged In") : console.log("Logged Out");

            if (!(status === true)) {
              _context3.next = 17;
              break;
            }

            commSwitch = document.querySelector('.switch--comms');
            _context3.next = 6;
            return _Update_User__WEBPACK_IMPORTED_MODULE_3__.getSomePersonals();

          case 6:
            userInfo = _context3.sent;
            user = userInfo.data.data.user; /////////////////////////////////////////////////
            // START BY WATCHING FOR PROFILE PICTURE CHANGE

            _watchForProfilePictureChange(user); // WATCHING USER PROFILE NAVIGATION BUTTONS


            _watchUserProfileButtons(_commPreference); // WATCHING COMMUNICATION PREFERENCES


            _watchCommPreference(commSwitch); // WATCHING URSER PROFILE FORM BUTTONS


            _watchSubSectionButtons();

            _watchPasswordSubSectionButtons(); // WATCH FOR PHONE NUMBER UPDATES


            _watchPhoneNumberInputs(formattedNumber); // WATCH FOR USER PROFILE UPDATES


            _Update_User__WEBPACK_IMPORTED_MODULE_3__._watchForProfileUpdates(user); // WATCHING FOR BUDGET SELECTION


            _watchBudgetSelection(user); // WATCHING FOR CREATION OF BUDGETS


            _Budget_Creation__WEBPACK_IMPORTED_MODULE_6__._watchForBudgetCreation();

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function _watchForLogin(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./Public/JS/Base-Forms.js":
/*!*********************************!*\
  !*** ./Public/JS/Base-Forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_watchEntranceButtons": () => (/* binding */ _watchEntranceButtons),
/* harmony export */   "_watchFormClosers": () => (/* binding */ _watchFormClosers)
/* harmony export */ });
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login */ "./Public/JS/Login.js");
/* harmony import */ var _Signup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Signup */ "./Public/JS/Signup.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");

 //////////////////////////////
// Actually Close The Form

var _closeTheForm = function _closeTheForm(index, page, pageElement, form) {
  console.log(index);
  form[index].classList.toggle('closed');
  form[index].classList.toggle('open');

  if (pageElement) {
    pageElement.textContent = "Page ".concat(page + 1, " / 4");
  }
}; //////////////////////////////
// Watch Form Closing Buttons


var _watchFormClosers = function _watchFormClosers(pageElement, page, form) {
  var formClosers = document.querySelectorAll('.form-closure-icon');
  page = 0;
  formClosers.forEach(function (fc, i) {
    fc.addEventListener('click', function (e) {
      e.preventDefault();

      _closeTheForm(i, page, pageElement, form);
    });
  });
};

var getLoggedIn = function getLoggedIn() {
  event.preventDefault();
  var loginUsername = document.getElementById('loginUsername').value;
  var loginPassword = document.getElementById('loginPassword').value;
  var buttons = document.querySelectorAll('.button');
  var loginSubmit = buttons[2];
  loginSubmit.removeEventListener('click', getLoggedIn);
  console.log("Listener Stopped.");
  _Login__WEBPACK_IMPORTED_MODULE_0__.login(loginUsername, loginPassword);
};

var _watchEntranceButtons = function _watchEntranceButtons(person, form, formPage) {
  //////////////////////////////
  // Initialize Entrance Buttons.
  var buttons = document.querySelectorAll('.button');
  var entranceButtons = [buttons[0], buttons[1], buttons[3]];
  entranceButtons.forEach(function (eb, i) {
    if (eb) {
      eb.addEventListener('click', function (e) {
        e.preventDefault(); //////////////////////////////////////////////////////////////
        // OPEN UP THE SELECTED FORM

        if (form[i] !== undefined) {
          form[i].classList.toggle('closed');
          form[i].classList.toggle('open');
        } //////////////////////////////////////////////////////////////
        // OPEN UP THE SELECTED FORM


        if (i === 0) {
          var loginSubmit = buttons[2];

          if (loginSubmit) {
            loginSubmit.addEventListener('click', getLoggedIn);
            console.log("Listener Started.");
          }
        } //////////////////////////////////////////////////////////////
        // SETUP THE SIGNUP FORM IF IT IS THE SELECTED FORM


        if (i === 1) {
          var formPages = document.querySelectorAll('.form__page');
          console.log(formPage);

          _Signup__WEBPACK_IMPORTED_MODULE_1__._setupSignupForm(formPage, formPages, person);
        }
      });
    }
  });
};

/***/ }),

/***/ "./Public/JS/Budget-Cards.js":
/*!***********************************!*\
  !*** ./Public/JS/Budget-Cards.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBudgetCard": () => (/* binding */ createBudgetCard)
/* harmony export */ });
/* harmony import */ var _Retrieve_Budgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Retrieve-Budgets */ "./Public/JS/Retrieve-Budgets.js");
/* harmony import */ var _Retrieve_Budgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Retrieve_Budgets__WEBPACK_IMPORTED_MODULE_0__);

var createBudgetCard = function createBudgetCard(budgetName, createdAt, lastUpdated, administrators, coverPhoto) {
  // CREATE BASE CARD ELEMENTS
  var budgetCardContainer = document.querySelector('.budget-card-container');
  var budgetCard = document.createElement('section');
  var budgetHeader = document.createElement('header');
  var budgetContent = document.createElement('section');
  var budgetFooter = document.createElement('section');
  budgetCard.classList.add('budget-card-container__card');
  budgetHeader.classList.add('budget-card-container__card__header');
  budgetContent.classList.add('budget-card-container__card__content');
  budgetFooter.classList.add('budget-card-container__card__footer');
  budgetCard.insertAdjacentElement('beforeend', budgetHeader);
  budgetCard.insertAdjacentElement('beforeend', budgetContent);
  budgetCard.insertAdjacentElement('beforeend', budgetFooter); // HEADER
  // CREATE HEADER ELEMENTS

  var cardTitle = document.createElement('p');
  var deleteButton = document.createElement('i'); // ADD CLASSES TO HEADER ELEMENTS

  cardTitle.classList.add('budget-card-container__card__header__text');
  deleteButton.classList.add('fas');
  deleteButton.classList.add('fa-trash-alt');
  deleteButton.classList.add('budget-card-container__card__header__icon'); // ADD CONTENT TO HEADER ELEMENTS

  cardTitle.textContent = budgetName; // INSERT HEADER ELEMENTS INTO HEADER

  budgetHeader.insertAdjacentElement('beforeend', cardTitle);
  budgetHeader.insertAdjacentElement('beforeend', deleteButton); // CONTENT
  // CREATE CONTENT ELEMENTS

  var coverImage = document.createElement('img');
  var changePhotoButton = document.createElement('button');
  var changePhotoIcon = document.createElement('i'); // ADD CLASSES TO CONTENT ELEMENTS

  coverImage.classList.add('budget-card-container__card__content__cover-photo');
  changePhotoButton.classList.add('budget-card-container__card__content__change-photo-button');
  changePhotoIcon.classList.add('fas');
  changePhotoIcon.classList.add('fa-camera');
  changePhotoIcon.classList.add('budget-card-container__card__content__change-photo-button__icon'); // ADD CONTENT TO CONTENT ELEMENTS

  coverImage.src = "".concat(coverPhoto);
  coverImage.alt = "Budget Cover Photo";
  changePhotoButton.insertAdjacentElement('beforeend', changePhotoIcon); // INSERT CONTENT ELEMENTS INTO CONTENT

  budgetContent.insertAdjacentElement('beforeend', coverImage);
  budgetContent.insertAdjacentElement('beforeend', changePhotoButton); // FOOTER
  // CREATE FOOTER ELEMENTS

  var footerTop = document.createElement('section');
  var footerBottom = document.createElement('section');
  var createdAtParagraph = document.createElement('p');
  var lastUpdatedParagraph = document.createElement('p');
  var budgetAdminParagraph = document.createElement('p'); // ADD CLASSES TO FOOTER ELEMENTS

  footerTop.classList.add('budget-card-container__card__footer--top');
  footerBottom.classList.add('budget-card-container__card__footer--bottom');
  createdAtParagraph.classList.add('budget-card-container__card__footer--top__first');
  lastUpdatedParagraph.classList.add('budget-card-container__card__footer--top__last');
  budgetAdminParagraph.classList.add('budget-card-container__card__footer--bottom__text'); // ADD CONTENT TO FOOTER ELEMENTS

  createdAtParagraph.textContent = "Created At: ".concat(createdAt);
  lastUpdatedParagraph.textContent = "Last Updated: ".concat(lastUpdated);
  budgetAdminParagraph.textContent = "Budget Admins: ".concat(administrators); // INSERT FOOTER ELEMENTS INTO FOOTER

  budgetFooter.insertAdjacentElement('beforeend', footerTop);
  budgetFooter.insertAdjacentElement('beforeend', footerBottom);
  footerTop.insertAdjacentElement('beforeend', createdAtParagraph);
  footerTop.insertAdjacentElement('beforeend', lastUpdatedParagraph);
  footerBottom.insertAdjacentElement('beforeend', budgetAdminParagraph); // ADD CARD TO CONTAINER

  if (budgetCardContainer) {
    budgetCardContainer.insertAdjacentElement('afterbegin', budgetCard);
  }
};

/***/ }),

/***/ "./Public/JS/Budget-Categories.js":
/*!****************************************!*\
  !*** ./Public/JS/Budget-Categories.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainCategory": () => (/* binding */ MainCategory),
/* harmony export */   "SubCategory": () => (/* binding */ SubCategory),
/* harmony export */   "_clickIcon": () => (/* binding */ _clickIcon),
/* harmony export */   "_verifyMainCategory": () => (/* binding */ _verifyMainCategory),
/* harmony export */   "_verifySubCategory": () => (/* binding */ _verifySubCategory),
/* harmony export */   "_watchCreateCategoryButton": () => (/* binding */ _watchCreateCategoryButton),
/* harmony export */   "createCategories": () => (/* binding */ createCategories),
/* harmony export */   "createSubCategory": () => (/* binding */ createSubCategory),
/* harmony export */   "icons": () => (/* binding */ icons)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Update_User__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Update-User */ "./Public/JS/Update-User.js");
/* harmony import */ var _Maintain_Budget__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Maintain-Budget */ "./Public/JS/Maintain-Budget.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


 ////////////////////////////////
// ICONS FOR MAIN CATEGORIES

var icons = ["address-book", "address-card", "adjust", "air-freshener", "align-center", "align-justify", "align-left", "align-right", "allergies", "ambulance", "american-sign-language-interpreting", "anchor", "angle-double-down", "angle-double-left", "angle-double-right", "angle-double-up", "angle-down", "angle-left", "angle-right", "angle-up", "angry", "ankh", "apple-alt", "archive", "archway", "arrow-alt-circle-down", "arrow-alt-circle-left", "arrow-alt-circle-right", "arrow-alt-circle-up", "arrow-down", "arrow-left", "arrow-right", "arrows-alt", "arrows-alt-h", "arrows-alt-v", "arrow-up", "assistive-listening-systems", "asterisk", "at", "atlas", "atom", "baby-carriage", "backspace", "backward", "bacon", "bahai", "balance-scale", "balance-scale-left", "balance-scale-right", "ban", "band-aid", "barcode", "bars", "baseball-ball", "basketball-ball", "bath", "battery-empty", "battery-full", "battery-half", "battery-quarter", "battery-three-quarters", "bed", "beer", "bell", "bell-slash", "bezier-curve", "bible", "bicycle", "biking", "binoculars", "biohazard", "birthday-cake", "blender", "blender-phone", "blind", "blog", "bold", "bolt", "bomb", "bone", "bong", "book", "book-dead", "bookmark", "book-medical", "book-open", "book-reader", "border-all", "border-none", "border-style", "bowling-ball", "box", "boxes", "box-open", "braille", "brain", "bread-slice", "briefcase", "briefcase-medical", "broadcast-tower", "broom", "brush", "bug", "building", "bullhorn", "bullseye", "burn", "bus", "bus-alt", "business-time", "calculator", "calendar", "calendar-alt", "calendar-check", "calendar-day", "calendar-minus", "calendar-plus", "calendar-times", "calendar-week", "camera", "camera-retro", "campground", "candy-cane", "cannabis", "capsules", "car", "car-alt", "caravan", "car-battery", "car-crash", "caret-down", "caret-left", "caret-right", "caret-square-down", "caret-square-left", "caret-square-right", "caret-square-up", "caret-up", "carrot", "car-side", "cart-arrow-down", "cart-plus", "cash-register", "cat", "certificate", "chair", "chalkboard", "chalkboard-teacher", "charging-station", "chart-area", "chart-bar", "chart-line", "chart-pie", "check", "check-circle", "check-double", "check-square", "cheese", "chess", "chess-bishop", "chess-board", "chess-king", "chess-knight", "chess-pawn", "chess-queen", "chess-rook", "chevron-circle-down", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "child", "church", "circle", "circle-notch", "city", "clinic-medical", "clipboard", "clipboard-check", "clipboard-list", "clock", "clone", "closed-captioning", "cloud", "cloud-download-alt", "cloud-meatball", "cloud-moon", "cloud-moon-rain", "cloud-rain", "cloud-showers-heavy", "cloud-sun", "cloud-sun-rain", "cocktail", "code", "code-branch", "coffee", "cog", "cogs", "coins", "columns", "comment", "comment-alt", "comment-dollar", "comment-dots", "comment-medical", "comments", "comments-dollar", "comment-slash", "compact-disc", "compress", "compress-alt", "compress-arrows-alt", "concierge-bell", "cookie", "cookie-bite", "copy", "copyright", "couch", "credit-card", "crop", "crop-alt", "cross", "crosshairs", "crow", "crown", "crutch", "cube", "cubes", "cut", "database", "deaf", "democrat", "desktop", "dharmachakra", "diagnoses", "dice", "dice-d6", "dice-d20", "dice-five", "dice-four", "dice-one", "dice-six", "dice-three", "dice-two", "digital-tachograph", "directions", "divide", "dizzy", "dna", "dog", "dollar-sign", "dolly", "dolly-flatbed", "donate", "door-closed", "door-open", "dot-circle", "dove", "download", "drafting-compass", "dragon", "draw-polygon", "drum", "drum-steelpan", "drumstick-bite", "dumbbell", "dumpster", "dumpster-fire", "dungeon", "edit", "egg", "eject", "ellipsis-h", "ellipsis-v", "envelope", "envelope-open", "envelope-open-text", "envelope-square", "equals", "eraser", "ethernet", "euro-sign", "exchange-alt", "exclamation", "exclamation-circle", "exclamation-triangle", "expand", "expand-alt", "expand-arrows-alt", "external-link-alt", "external-link-square-alt", "eye", "eye-dropper", "eye-slash", "fan", "fast-backward", "fast-forward", "fax", "feather", "feather-alt", "female", "fighter-jet", "file", "file-alt", "file-archive", "file-audio", "file-code", "file-contract", "file-csv", "file-download", "file-excel", "file-export", "file-image", "file-import", "file-invoice", "file-invoice-dollar", "file-medical", "file-medical-alt", "file-pdf", "file-powerpoint", "file-prescription", "file-signature", "file-upload", "file-video", "file-word", "fill", "fill-drip", "film", "filter", "fingerprint", "fire", "fire-alt", "fire-extinguisher", "first-aid", "fish", "fist-raised", "flag", "flag-checkered", "flag-usa", "flask", "flushed", "folder", "folder-minus", "folder-open", "folder-plus", "font", "football-ball", "forward", "frog", "frown", "frown-open", "funnel-dollar", "futbol", "gamepad", "gas-pump", "gavel", "gem", "genderless", "ghost", "gift", "gifts", "glass-cheers", "glasses", "glass-martini", "glass-martini-alt", "glass-whiskey", "globe", "globe-africa", "globe-americas", "globe-asia", "globe-europe", "golf-ball", "gopuram", "graduation-cap", "greater-than", "greater-than-equal", "grimace", "grin", "grin-alt", "grin-beam", "grin-beam-sweat", "grin-hearts", "grin-squint", "grin-squint-tears", "grin-stars", "grin-tears", "grin-tongue", "grin-tongue-squint", "grin-tongue-wink", "grin-wink", "grip-horizontal", "grip-lines", "grip-lines-vertical", "grip-vertical", "guitar", "hamburger", "hammer", "hamsa", "hand-holding", "hand-holding-heart", "hand-holding-usd", "hand-lizard", "hand-middle-finger", "hand-paper", "hand-peace", "hand-point-down", "hand-pointer", "hand-point-left", "hand-point-right", "hand-point-up", "hand-rock", "hands", "hand-scissors", "handshake", "hands-helping", "hand-spock", "hanukiah", "hard-hat", "hashtag", "hat-cowboy", "hat-cowboy-side", "hat-wizard", "hdd", "heading", "headphones", "headphones-alt", "headset", "heart", "heartbeat", "heart-broken", "helicopter", "highlighter", "hiking", "hippo", "history", "hockey-puck", "holly-berry", "home", "horse", "horse-head", "hospital", "hospital-alt", "hospital-symbol", "hotdog", "hotel", "hot-tub", "hourglass", "hourglass-end", "hourglass-half", "hourglass-start", "house-damage", "hryvnia", "h-square", "ice-cream", "icicles", "icons", "i-cursor", "id-badge", "id-card", "id-card-alt", "igloo", "image", "images", "inbox", "indent", "industry", "infinity", "info", "info-circle", "italic", "jedi", "joint", "journal-whills", "kaaba", "key", "keyboard", "khanda", "kiss", "kiss-beam", "kiss-wink-heart", "kiwi-bird", "landmark", "language", "laptop", "laptop-code", "laptop-medical", "laugh", "laugh-beam", "laugh-squint", "laugh-wink", "layer-group", "leaf", "lemon", "less-than", "less-than-equal", "level-down-alt", "level-up-alt", "life-ring", "lightbulb", "link", "lira-sign", "list", "list-alt", "list-ol", "list-ul", "location-arrow", "lock", "lock-open", "long-arrow-alt-down", "long-arrow-alt-left", "long-arrow-alt-right", "long-arrow-alt-up", "low-vision", "luggage-cart", "magic", "magnet", "mail-bulk", "male", "map", "map-marked", "map-marked-alt", "map-marker", "map-marker-alt", "map-pin", "map-signs", "marker", "mars", "mars-double", "mars-stroke", "mars-stroke-h", "mars-stroke-v", "mask", "medal", "medkit", "meh", "meh-blank", "meh-rolling-eyes", "memory", "menorah", "mercury", "meteor", "microchip", "microphone", "microphone-alt", "microphone-alt-slash", "microphone-slash", "microscope", "minus", "minus-circle", "minus-square", "mitten", "mobile", "mobile-alt", "money-bill", "money-bill-alt", "money-bill-wave", "money-bill-wave-alt", "money-check", "money-check-alt", "monument", "moon", "mortar-pestle", "mosque", "motorcycle", "mountain", "mouse", "mouse-pointer", "mug-hot", "music", "network-wired", "neuter", "newspaper", "not-equal", "notes-medical", "object-group", "object-ungroup", "oil-can", "om", "otter", "outdent", "pager", "paint-brush", "paint-roller", "palette", "pallet", "paperclip", "paper-plane", "parachute-box", "paragraph", "parking", "passport", "pastafarianism", "paste", "pause", "pause-circle", "paw", "peace", "pen", "pen-alt", "pencil-alt", "pencil-ruler", "pen-fancy", "pen-nib", "pen-square", "people-carry", "pepper-hot", "percent", "percentage", "person-booth", "phone", "phone-alt", "phone-slash", "phone-square", "phone-square-alt", "phone-volume", "photo-video", "piggy-bank", "pills", "pizza-slice", "place-of-worship", "plane", "plane-arrival", "plane-departure", "play", "play-circle", "plug", "plus", "plus-circle", "plus-square", "podcast", "poll", "poll-h", "poo", "poop", "poo-storm", "portrait", "pound-sign", "power-off", "pray", "praying-hands", "prescription", "prescription-bottle", "prescription-bottle-alt", "print", "procedures", "project-diagram", "puzzle-piece", "qrcode", "question", "question-circle", "quidditch", "quote-left", "quote-right", "quran", "radiation", "radiation-alt", "rainbow", "random", "receipt", "record-vinyl", "recycle", "redo", "redo-alt", "registered", "remove-format", "reply", "reply-all", "republican", "restroom", "retweet", "ribbon", "ring", "road", "robot", "rocket", "route", "rss", "rss-square", "ruble-sign", "ruler", "ruler-combined", "ruler-horizontal", "ruler-vertical", "running", "rupee-sign", "sad-cry", "sad-tear", "satellite", "satellite-dish", "save", "school", "screwdriver", "scroll", "sd-card", "search", "search-dollar", "search-location", "search-minus", "search-plus", "seedling", "server", "shapes", "share", "share-alt", "share-alt-square", "share-square", "shekel-sign", "shield-alt", "ship", "shipping-fast", "shoe-prints", "shopping-bag", "shopping-basket", "shopping-cart", "shower", "shuttle-van", "sign", "signal", "signature", "sign-in-alt", "sign-language", "sign-out-alt", "sim-card", "sitemap", "skating", "skiing", "skiing-nordic", "skull", "skull-crossbones", "slash", "sleigh", "sliders-h", "smile", "smile-beam", "smile-wink", "smog", "smoking", "smoking-ban", "sms", "snowboarding", "snowflake", "snowman", "snowplow", "socks", "solar-panel", "sort", "sort-alpha-down", "sort-alpha-down-alt", "sort-alpha-up", "sort-alpha-up-alt", "sort-amount-down", "sort-amount-down-alt", "sort-amount-up", "sort-amount-up-alt", "sort-down", "sort-numeric-down", "sort-numeric-down-alt", "sort-numeric-up", "sort-numeric-up-alt", "sort-up", "spa", "space-shuttle", "spell-check", "spider", "spinner", "splotch", "spray-can", "square", "square-full", "square-root-alt", "stamp", "star", "star-and-crescent", "star-half", "star-half-alt", "star-of-david", "star-of-life", "step-backward", "step-forward", "stethoscope", "sticky-note", "stop", "stop-circle", "stopwatch", "store", "store-alt", "stream", "street-view", "strikethrough", "stroopwafel", "subscript", "subway", "suitcase", "suitcase-rolling", "sun", "superscript", "surprise", "swatchbook", "swimmer", "swimming-pool", "synagogue", "sync", "sync-alt", "syringe", "table", "tablet", "tablet-alt", "table-tennis", "tablets", "tachometer-alt", "tag", "tags", "tape", "tasks", "taxi", "teeth", "teeth-open", "temperature-high", "temperature-low", "tenge", "terminal", "text-height", "text-width", "th", "theater-masks", "thermometer", "thermometer-empty", "thermometer-full", "thermometer-half", "thermometer-quarter", "thermometer-three-quarters", "th-large", "th-list", "thumbs-down", "thumbs-up", "thumbtack", "ticket-alt", "times", "times-circle", "tint", "tint-slash", "tired", "toggle-off", "toggle-on", "toilet", "toilet-paper", "toolbox", "tools", "tooth", "torah", "torii-gate", "tractor", "trademark", "traffic-light", "trailer", "train", "tram", "transgender", "transgender-alt", "trash", "trash-alt", "trash-restore", "trash-restore-alt", "tree", "trophy", "truck", "truck-loading", "truck-monster", "truck-moving", "truck-pickup", "tshirt", "tty", "tv", "umbrella", "umbrella-beach", "underline", "undo", "undo-alt", "universal-access", "university", "unlink", "unlock", "unlock-alt", "upload", "user", "user-alt", "user-alt-slash", "user-astronaut", "user-check", "user-circle", "user-clock", "user-cog", "user-edit", "user-friends", "user-graduate", "user-injured", "user-lock", "user-md", "user-minus", "user-ninja", "user-nurse", "user-plus", "users", "users-cog", "user-secret", "user-shield", "user-slash", "user-tag", "user-tie", "user-times", "utensils", "utensil-spoon", "vector-square", "venus", "venus-double", "venus-mars", "vial", "vials", "video", "video-slash", "vihara", "voicemail", "volleyball-ball", "volume-down", "volume-mute", "volume-off", "volume-up", "vote-yea", "vr-cardboard", "walking", "wallet", "warehouse", "water", "wave-square", "weight", "weight-hanging", "wheelchair", "wifi", "wind", "window-close", "window-maximize", "window-minimize", "window-restore", "wine-bottle", "wine-glass", "wine-glass-alt", "won-sign", "wrench", "x-ray", "yen-sign", "yin-yang"]; ////////////////////////////////////////
// CATEGORY -- PARENT CLASS

var Category = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(function Category(options) {
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__["default"])(this, Category);

  this.icon = options.icon;
  this.title = options.title;
}); ////////////////////////////////////////
// MAIN CATEGORY -- CHILD CLASS


var MainCategory = /*#__PURE__*/function (_Category) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(MainCategory, _Category);

  var _super = _createSuper(MainCategory);

  function MainCategory(options) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__["default"])(this, MainCategory);

    var superOpts = _objectSpread({}, options);

    _this = _super.call(this, superOpts);
    _this.subCategories = [];
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(MainCategory, [{
    key: "_deleteSubCategory",
    value: function _deleteSubCategory(index) {
      var _this2 = this;

      this.subCategories = this.subCategories.filter(function (sc) {
        return sc != _this2.subCategories[index];
      });
    }
  }]);

  return MainCategory;
}(Category); ////////////////////////////////////////
// SUB CATEGORY -- CHILD CLASS

var SubCategory = /*#__PURE__*/function (_Category2) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(SubCategory, _Category2);

  var _super2 = _createSuper(SubCategory);

  function SubCategory(options) {
    var _this3;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__["default"])(this, SubCategory);

    var superOpts = _objectSpread({}, options);

    _this3 = _super2.call(this, superOpts);
    _this3.timingOptions = {};
    _this3.goalAmount = 0;
    _this3.amountSpent = 0;
    _this3.amountRemaining = 0;
    _this3.percentageSpent = 0;
    _this3.surplus = false;
    return _this3;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(SubCategory, [{
    key: "_makeSurplus",
    value: function _makeSurplus() {
      this.surplus = !this.surplus;
    }
  }, {
    key: "_finishUpdatingSubCategory",
    value: function _finishUpdatingSubCategory(goal) {
      var categoryGoal = goal;
      if (categoryGoal === undefined || typeof categoryGoal !== "number") categoryGoal = 0;
      this.goalAmount = categoryGoal;
      this.amountSpent = 0;
      this.amountRemaining = this.goalAmount - this.amountSpent;
      this.percentageSpent = this.amountSpent / this.goalAmount;
      if (isNaN(this.percentageSpent)) this.percentageSpent = 0;
    }
  }]);

  return SubCategory;
}(Category); ////////////////////////////////////////
// CAPITALIZING CATEGORIES

var _capitalize = function _capitalize(string) {
  return "".concat(string.charAt(0).toUpperCase()).concat(string.slice(1));
}; ////////////////////////////////////////
// SUB CATEGORY CREATION PROCESS


var createSubCategory = function createSubCategory(budget, index) {
  var mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  var mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[1]; // Creating Sub Category Container

  var subCategory = document.createElement('section'); // Adding Sub Category Classes

  subCategory.classList.add('sub-category');
  subCategory.classList.add('r__sub-category');
  subCategory.dataset.category = "".concat(index); // Creating the title container

  var subCategoryTitleContainer = document.createElement('section'); // Adding the title container's classes

  subCategoryTitleContainer.classList.add('sub-category-title-container');
  subCategoryTitleContainer.classList.add('r__sub-category-title-container'); // Creating the title element

  var subCategoryTitleElement = document.createElement('p'); // Adding title element's classes

  subCategoryTitleElement.classList.add('sub-category-title-container__title');
  subCategoryTitleElement.classList.add('r__sub-category-title-container__title'); // Select Category Creation Input

  var subCategoryTitleInput = document.querySelector('.form__input--sub-category-title'); // Add Title Text Content

  subCategoryTitleElement.textContent = subCategoryTitleInput.value.split(' ').map(_capitalize).join(' '); // Creating Sub Category Controller

  var subCategoryController = document.createElement('section'); // Adding classes to Sub Category Controller

  subCategoryController.classList.add('sub-category-controller');
  subCategoryController.classList.add('r__sub-category-controller'); // Creating Surplus Container inside the controller.

  var subCategorySurplusContainer = document.createElement('section');
  subCategorySurplusContainer.classList.add('sub-category-controller__surplus-container');
  subCategorySurplusContainer.classList.add('r__sub-category-controller__surplus-container'); // Creating Surplus Container Title Element

  var surplusContainerTitle = document.createElement('p');
  surplusContainerTitle.classList.add('sub-category-controller__surplus-container__title');
  surplusContainerTitle.classList.add('r__sub-category-controller__surplus-container__title');
  surplusContainerTitle.textContent = "Surplus?";

  if (mainCategoryContainer) {
    // Create Surplus Switch
    var surplusContainerSwitch = document.createElement('section');
    surplusContainerSwitch.classList.add('sub-category-controller__surplus-container__switch');
    surplusContainerSwitch.classList.add('r__sub-category-controller__surplus-container__switch'); // Create Surplus Switch Toggle

    var surplusSwitchToggle = document.createElement('section');
    surplusSwitchToggle.classList.add('sub-category-controller__surplus-container__switch__toggle');
    surplusSwitchToggle.classList.add('r__sub-category-controller__surplus-container__switch__toggle');
    var surplusSwitchToggleIcon = document.createElement('i');
    surplusSwitchToggleIcon.classList.add('fas');
    surplusSwitchToggleIcon.classList.add('fa-times');
    surplusSwitchToggleIcon.classList.add('sub-category-controller__surplus-container__switch__toggle__icon');
    surplusSwitchToggleIcon.classList.add('r__sub-category-controller__surplus-container__switch__toggle__icon'); // Make Surplus Switch -- A SWITCH

    surplusContainerSwitch.addEventListener('click', function (e) {
      e.preventDefault();
      surplusContainerSwitch.classList.toggle('sub-category-controller__surplus-container__switch--switched');
      surplusSwitchToggleIcon.classList.toggle('fa-times');
      surplusSwitchToggleIcon.classList.toggle('fa-check');

      var subCategoriesArray = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelectorAll('.sub-category'));

      var clicked = e.target;
      var subArray = subCategoriesArray.filter(function (sc, i) {
        return Number(sc.dataset.category) === index;
      });
      var categoryNumber = Number(clicked.closest('.sub-category').dataset.category);
      var categoryTitle = subCategoryTitleElement.textContent;

      budget._updateSubCategory("Creation", "Surplus", {
        mainIndex: categoryNumber,
        subIndex: subArray.indexOf(clicked.closest('.sub-category'))
      });
    });
    var surplusCategoryTrashIcon = document.createElement('i');
    surplusCategoryTrashIcon.classList.add('fas');
    surplusCategoryTrashIcon.classList.add('fa-trash-alt');
    surplusCategoryTrashIcon.classList.add('sub-category-controller__icon');
    surplusCategoryTrashIcon.classList.add('r__sub-category-controller__icon');
    surplusCategoryTrashIcon.addEventListener('click', function (e) {
      e.preventDefault();
      var clicked = e.target;
      var selectedSubCategory = clicked.closest('.sub-category'); /////////////////////////////
      // DELETE SUB CATEGORY

      var subCategoriesArray = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelectorAll('.sub-category'));

      var subArray = subCategoriesArray.filter(function (sc, i) {
        return Number(sc.dataset.category) === index;
      });
      var categoryNumber = Number(clicked.closest('.sub-category').dataset.category); /////////////////////////////
      // REMOVE DOM ELEMENT

      selectedSubCategory.remove();

      budget._deleteSubCategory(categoryNumber, subArray.indexOf(selectedSubCategory));
    });
    surplusSwitchToggle.insertAdjacentElement('beforeend', surplusSwitchToggleIcon);
    surplusContainerSwitch.insertAdjacentElement('beforeend', surplusSwitchToggle);
    subCategorySurplusContainer.insertAdjacentElement('beforeend', surplusContainerTitle);
    subCategorySurplusContainer.insertAdjacentElement('beforeend', surplusContainerSwitch);
    subCategoryController.insertAdjacentElement('beforeend', subCategorySurplusContainer);
    subCategoryController.insertAdjacentElement('beforeend', surplusCategoryTrashIcon);
    subCategoryTitleContainer.insertAdjacentElement('beforeend', subCategoryTitleElement);
    subCategory.insertAdjacentElement('beforeend', subCategoryTitleContainer);
    subCategory.insertAdjacentElement('beforeend', subCategoryController);
  }

  if (mainCategoryContainerTwo) {
    // Create Surplus Switch
    var _surplusContainerSwitch = document.createElement('section');

    _surplusContainerSwitch.classList.add('sub-category-controller__surplus-container__switch__alt');

    _surplusContainerSwitch.classList.add('r__sub-category-controller__surplus-container__switch__alt'); // Create Surplus Switch Toggle


    var _surplusSwitchToggle = document.createElement('section');

    _surplusSwitchToggle.classList.add('sub-category-controller__surplus-container__switch__alt__toggle');

    _surplusSwitchToggle.classList.add('r__sub-category-controller__surplus-container__switch__alt__toggle');

    var _surplusSwitchToggleIcon = document.createElement('i');

    _surplusSwitchToggleIcon.classList.add('fas');

    _surplusSwitchToggleIcon.classList.add('fa-times');

    _surplusSwitchToggleIcon.classList.add('sub-category-controller__surplus-container__switch__alt__toggle__icon');

    _surplusSwitchToggleIcon.classList.add('r__sub-category-controller__surplus-container__switch__alt__toggle__icon'); // Make Surplus Switch -- A SWITCH


    _surplusContainerSwitch.addEventListener('click', function (e) {
      e.preventDefault();

      _surplusContainerSwitch.classList.toggle('sub-category-controller__surplus-container__switch__alt--switched');

      _surplusSwitchToggleIcon.classList.toggle('fa-times');

      _surplusSwitchToggleIcon.classList.toggle('fa-check');

      var subCategoriesArray = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelectorAll('.sub-category'));

      var clicked = e.target;
      var subArray = subCategoriesArray.filter(function (sc, i) {
        return Number(sc.dataset.category) === index;
      });
      var categoryNumber = Number(clicked.closest('.sub-category').dataset.category);
      var categoryTitle = subCategoryTitleElement.textContent;

      budget._updateSubCategory("Creation", "Surplus", {
        mainIndex: categoryNumber,
        subIndex: subArray.indexOf(clicked.closest('.sub-category'))
      });
    });

    var _surplusCategoryTrashIcon = document.createElement('i');

    _surplusCategoryTrashIcon.classList.add('fas');

    _surplusCategoryTrashIcon.classList.add('fa-trash-alt');

    _surplusCategoryTrashIcon.classList.add('sub-category-controller__icon');

    _surplusCategoryTrashIcon.classList.add('r__sub-category-controller__icon');

    _surplusCategoryTrashIcon.addEventListener('click', function (e) {
      e.preventDefault();
      var clicked = e.target;
      var selectedSubCategory = clicked.closest('.sub-category'); /////////////////////////////
      // DELETE SUB CATEGORY

      var subCategoriesArray = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelectorAll('.sub-category'));

      var subArray = subCategoriesArray.filter(function (sc, i) {
        return Number(sc.dataset.category) === index;
      });
      var categoryNumber = Number(clicked.closest('.sub-category').dataset.category); /////////////////////////////
      // REMOVE DOM ELEMENT

      selectedSubCategory.remove();

      budget._deleteSubCategory(categoryNumber, subArray.indexOf(selectedSubCategory));
    });

    _surplusSwitchToggle.insertAdjacentElement('beforeend', _surplusSwitchToggleIcon);

    _surplusContainerSwitch.insertAdjacentElement('beforeend', _surplusSwitchToggle);

    subCategorySurplusContainer.insertAdjacentElement('beforeend', surplusContainerTitle);
    subCategorySurplusContainer.insertAdjacentElement('beforeend', _surplusContainerSwitch);
    subCategoryController.insertAdjacentElement('beforeend', subCategorySurplusContainer);
    subCategoryController.insertAdjacentElement('beforeend', _surplusCategoryTrashIcon);
    subCategoryTitleContainer.insertAdjacentElement('beforeend', subCategoryTitleElement);
    subCategory.insertAdjacentElement('beforeend', subCategoryTitleContainer);
    subCategory.insertAdjacentElement('beforeend', subCategoryController);
  }

  var subCategories = document.querySelectorAll('.sub-category');
  if (subCategoryTitleInput.value === '') return;

  if (subCategories.length === 0 && subCategoryTitleInput.value !== '' && subCategoryTitleInput.value !== undefined) {
    document.querySelector('.budget-creation-container--sub-categories__sub-category-display').insertAdjacentElement('afterbegin', subCategory);
  }

  if (subCategories.length > 0) {
    subCategories[subCategories.length - 1].insertAdjacentElement('afterend', subCategory);
  }

  if (!subCategoryTitleInput.value) return; // This is where it actually adds it to the budget object.

  budget._addSubCategory(index, "".concat(subCategoryTitleElement.textContent));
};
var _verifySubCategory = function _verifySubCategory(budget, index) {
  /////////////////////////////////////////////////
  // INITIALIZE NEEDED VARIABLES
  var mainCategoryContainer = document.querySelector('.budget-creation-container--sub-categories');
  var mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[1];
  var mainCategoryTitle, altMainCategoryTitle;

  if (mainCategoryContainer) {
    mainCategoryTitle = document.querySelector('.budget-creation-container--sub-categories__main-category-display__category-information__text').textContent.toLowerCase();
  }

  if (mainCategoryContainerTwo) {
    altMainCategoryTitle = document.querySelector('.main-category-display__category-information__text').textContent.toLowerCase();
  }

  var categoryIndex; ////////////////////////////////////
  // GETTING THE MAIN CATEGORY INDEX

  budget.mainCategories.forEach(function (mc, i) {
    if (mainCategoryContainer) {
      if (mc.title.toLowerCase() === mainCategoryTitle) {
        categoryIndex = i;
        return categoryIndex;
      }
    }

    if (mainCategoryContainerTwo) {
      if (mc.title.toLowerCase() === altMainCategoryTitle) {
        categoryIndex = i;
        return categoryIndex;
      }
    }
  }); // Get Category Creation Input Value In Lowercase

  var subCategoryTitle = document.querySelector('.form__input--sub-category-title').value.toLowerCase(); //////////////////////////////////////////
  // CHECKING SUB CATEGORIES VS INPUT VALUE

  var filtered = budget.mainCategories[categoryIndex].subCategories.filter(function (sc) {
    if (sc.title.toLowerCase() === subCategoryTitle) {
      return sc;
    }
  }); /////////////////////////////////////////////////
  // ALLOW ONLY ONE SUB CATEGORY WITH THAT NAME

  if (filtered.length >= 1) return; // Function below used to use 'index' instead of categoryIndex, so it will need to be double checked in the budget creation form.

  createSubCategory(budget, categoryIndex);
}; ////////////////////////////////////////
// MAIN CATEGORY DELETION PROCESS

var removeMainCategory = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().mark(function _callee(e, budget) {
    var budgetPages, title, userInfo, user;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_8___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            budgetPages = document.querySelectorAll('.form__page--centered');
            console.log(budgetPages, budgetPages[2].classList);
            title = e.target.closest('section').firstChild.nextElementSibling.textContent; /////////////////////////////
            // CHECK USER

            _context.next = 5;
            return _Update_User__WEBPACK_IMPORTED_MODULE_9__.getSomePersonals();

          case 5:
            userInfo = _context.sent;
            user = userInfo.data.data.user;

            if (!(user.latterDaySaint === true)) {
              _context.next = 10;
              break;
            }

            if (!budgetPages[2].classList.contains("closed")) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return");

          case 10:
            if (!(user.latterDaySaint === false)) {
              _context.next = 13;
              break;
            }

            if (budgetPages[2].classList.contains("closed")) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return");

          case 13:
            budget._deleteMainCategory(title);

            e.target.closest('section').remove();
            console.log("DELETED");
            return _context.abrupt("return", budget.mainCategories);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function removeMainCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); ////////////////////////////////////////
// MAIN CATEGORY CREATION PROCESS


var createMainCategory = function createMainCategory(element, budget, filteredArray) {
  var mainCategoryTitle = document.querySelector('.form__input--main-category-title').value;
  mainCategoryTitle = mainCategoryTitle.split(' ').map(_capitalize).join(' '); // budget.mainCategories.push(new MainCategory({ icon: `${element}`, title: mainCategoryTitle }));

  var mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  var mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[0];

  if (mainCategoryContainer) {
    budget._addMainCategory("".concat(element), mainCategoryTitle);

    var mainCategory = document.createElement('section');
    mainCategory.classList.add('main-category');
    var iconImage = document.createElement('i');
    iconImage.classList.add('fas');
    iconImage.classList.add("".concat(element));
    iconImage.classList.add('main-category__icon');
    var iconsText = document.createElement('p');
    iconsText.classList.add('main-category__text');
    var deleteButton = document.createElement('button');
    var deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas');
    deleteIcon.classList.add('fa-times');
    deleteButton.classList.add('main-category__delete');
    deleteButton.insertAdjacentElement('beforeend', deleteIcon);
    iconsText.textContent = mainCategoryTitle;
    mainCategory.insertAdjacentElement('beforeend', iconImage);
    mainCategory.insertAdjacentElement('beforeend', iconsText);

    if (mainCategoryContainer) {
      mainCategory.insertAdjacentElement('beforeend', deleteButton);
    }

    mainCategoryContainer.insertAdjacentElement('beforeend', mainCategory);
    var mainCategoryLength = document.querySelectorAll('.main-category').length;

    if (mainCategoryLength === 3) {
      document.querySelectorAll('.main-category')[2].style.borderTopRightRadius = "0.9rem";
    }

    if (deleteButton) {
      deleteButton.addEventListener('click', function (e) {
        e.preventDefault();
        removeMainCategory(e, budget, filteredArray);
      });
    }
  }

  if (mainCategoryContainerTwo) {
    budget._addMainCategory("".concat(element), mainCategoryTitle);

    var _mainCategory = document.createElement('section');

    _mainCategory.classList.add('main-category__alt');

    _mainCategory.classList.add('r__main-category__alt');

    _mainCategory.classList.add('open');

    var _iconImage = document.createElement('i');

    _iconImage.classList.add('fas');

    _iconImage.classList.add("".concat(element));

    _iconImage.classList.add('main-category__alt__icon');

    var _iconsText = document.createElement('p');

    _iconsText.classList.add('main-category__alt__text'); // const deleteButton = document.createElement('button');
    // const deleteIcon = document.createElement('i');
    // deleteIcon.classList.add('fas');
    // deleteIcon.classList.add('fa-times');
    // deleteButton.classList.add('main-category__delete');
    // deleteButton.insertAdjacentElement('beforeend', deleteIcon);


    _iconsText.textContent = mainCategoryTitle;

    _mainCategory.insertAdjacentElement('beforeend', _iconImage);

    _mainCategory.insertAdjacentElement('beforeend', _iconsText); // if (mainCategoryContainerTwo) {
    //   mainCategory.insertAdjacentElement('beforeend', deleteButton);
    // }


    mainCategoryContainerTwo.insertAdjacentElement('beforeend', _mainCategory);
    var _mainCategoryLength = document.querySelectorAll('.main-category').length;

    if (_mainCategoryLength === 3) {
      document.querySelectorAll('.main-category')[2].style.borderTopRightRadius = "0.9rem";
    } // if (deleteButton) {
    //   deleteButton.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     removeMainCategory(e, budget, filteredArray);
    //   });
    // }


    console.log(budget);
    var mainCategories = document.querySelectorAll('.main-category__alt');
    _mainCategory.dataset.category = "".concat(mainCategories.length - 1);

    _Maintain_Budget__WEBPACK_IMPORTED_MODULE_10__._watchForMainCategorySelection();
  }
}; ////////////////////////////////////////
// CREATE MAIN CATEGORY


var _verifyMainCategory = function _verifyMainCategory(icon, iconList, budget) {
  var mainCategoryTitle = document.querySelector('.form__input--main-category-title').value.toLowerCase();
  var filtered = budget.mainCategories.filter(function (mc) {
    if (mc.title.toLowerCase() === mainCategoryTitle) {
      return mc;
    }
  });
  if (filtered.length >= 1) return;
  createMainCategory(icon, budget, filtered);
  iconList.forEach(function (icon) {
    icon.classList.remove('icon-container--clicked');
  });
}; ////////////////////////////////////////
// FIND CLICKED ICON

var _findClickedIcon = function _findClickedIcon(iconList, budget) {
  iconList.forEach(function (icon) {
    if (icon.classList.contains('icon-container--clicked')) {
      _verifyMainCategory(icon.firstChild.classList[1], iconList, budget);
    }
  });
};

var _setupCategoryCreation = function _setupCategoryCreation(budget) {
  var createMainCategoryButton = document.querySelectorAll('.button--small-create-main-category')[0];
  var iconContainers = document.querySelectorAll('.icon-container');

  if (createMainCategoryButton) {
    createMainCategoryButton.addEventListener('click', function (e) {
      e.preventDefault();

      _findClickedIcon(iconContainers, budget);

      closeCategoryCreation();
    });
  }
}; ////////////////////////////////////////
// WATCH FOR ICON CLICKS


var _clickIcon = function _clickIcon(icon) {
  var iconContainers = document.querySelectorAll('.icon-container');
  var iconsArray = Array.from(iconContainers);
  iconContainers.forEach(function (element, i) {
    element.addEventListener('click', function (e) {
      var clicked = e.target;

      if (clicked.classList.contains('icon-container__icon') || clicked.classList[2] === "icon-container__icon") {
        iconContainers.forEach(function (e) {
          e.classList.remove('icon-container--clicked');
        });
        element.classList.add('icon-container--clicked');
        icon = clicked;
        return icon;
      }

      iconContainers.forEach(function (ic) {
        ic.classList.remove('icon-container--clicked');
      });
      element.classList.add('icon-container--clicked');
      icon = clicked.firstChild;
      return icon;
    });
  });
}; ////////////////////////////////////////
// HIDE CREATED ICONS

var _hideCreatedIcons = function _hideCreatedIcons() {
  var mainCategories = document.querySelectorAll('.main-category');
  var altMainCategories = document.querySelectorAll('.main-category__alt');
  var mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  var mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[0];
  console.log(altMainCategories);

  if (mainCategoryContainer) {
    if (mainCategories.length === 0) return;
    mainCategories.forEach(function (mc) {
      mc.classList.add('closed');
      mc.classList.remove('open');
    });
  }

  if (mainCategoryContainerTwo) {
    if (altMainCategories.length === 0) return;
    altMainCategories.forEach(function (amc) {
      amc.classList.add('closed');
      amc.classList.remove('open');
    });
  }
}; ////////////////////////////////////////
// SHOW CREATED ICONS


var _showCreatedIcons = function _showCreatedIcons() {
  var mainCategories = document.querySelectorAll('.main-category');
  var altMainCategories = document.querySelectorAll('.main-category__alt');
  var mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  var mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[0];

  if (mainCategoryContainer) {
    mainCategories.forEach(function (mc) {
      mc.classList.add('open');
      mc.classList.remove('closed');
    });
  }

  if (mainCategoryContainerTwo) {
    altMainCategories.forEach(function (amc) {
      amc.classList.add('open');
      amc.classList.remove('closed');
    });
  }
}; ////////////////////////////////////////
// CLOSE CATEGORY CREATION


var closeCategoryCreation = function closeCategoryCreation() {
  var createCategoryButton = document.querySelector('.button--medium-square');
  var createMainCategoryButton = document.querySelectorAll('.button--small-create-main-category')[0];
  var mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  var closeCreateCategoryButton = document.querySelectorAll('.button--small-create-main-category')[1];
  var iconsContainer = document.querySelector('.icons-container');
  var createCategoryTitle = document.querySelector('.form__section--main-category-title');
  createCategoryTitle.classList.toggle('closed');
  createCategoryTitle.classList.toggle('open');
  iconsContainer.classList.toggle('closed');
  iconsContainer.classList.toggle('open-grid');
  createCategoryButton.classList.toggle('closed');
  createCategoryButton.classList.toggle('open');
  createMainCategoryButton.classList.toggle('closed');
  createMainCategoryButton.classList.toggle('open');
  closeCreateCategoryButton.classList.toggle('closed');
  closeCreateCategoryButton.classList.toggle('open');
  if (mainCategoryContainer) mainCategoryContainer.classList.toggle('budget-creation-container--main-categories--creating');

  _showCreatedIcons();
}; ////////////////////////////////////////
// OPEN CATEGORY CREATION


var openCategoryCreation = function openCategoryCreation() {
  var createCategoryButton = document.querySelector('.button--medium-square');
  var createMainCategoryButton = document.querySelectorAll('.button--small-create-main-category')[0];
  var mainCategoryContainer = document.querySelector('.budget-creation-container--main-categories');
  var closeCreateCategoryButton = document.querySelectorAll('.button--small-create-main-category')[1];
  var iconsContainer = document.querySelector('.icons-container');
  var createCategoryTitle = document.querySelector('.form__section--main-category-title');
  var mainCategoryContainerTwo = document.querySelectorAll('.container--medium__half')[0];
  createCategoryTitle.classList.toggle('closed');
  createCategoryTitle.classList.toggle('open');
  iconsContainer.classList.toggle('closed');
  iconsContainer.classList.toggle('open-grid');
  createCategoryButton.classList.toggle('closed');
  createCategoryButton.classList.toggle('open');
  createMainCategoryButton.classList.toggle('closed');
  createMainCategoryButton.classList.toggle('open');
  closeCreateCategoryButton.classList.toggle('closed');
  closeCreateCategoryButton.classList.toggle('open');
  if (mainCategoryContainer) mainCategoryContainer.classList.toggle('budget-creation-container--main-categories--creating');

  _hideCreatedIcons();
};

var _watchCreateCategoryButton = function _watchCreateCategoryButton(icon, budget) {
  var createCategoryButton = document.querySelector('.button--medium-square');
  createCategories(icon);

  if (createCategoryButton) {
    createCategoryButton.addEventListener('click', function (e) {
      e.preventDefault();
      openCategoryCreation();
    });
  }

  var closeCreateCategoryButton = document.querySelectorAll('.button--small-create-main-category')[1];

  if (closeCreateCategoryButton) {
    closeCreateCategoryButton.addEventListener('click', function (e) {
      e.preventDefault();
      closeCategoryCreation();
    });
  }

  _setupCategoryCreation(budget);
}; ////////////////////////////////////////
// SHOWING ICONS FOR MAIN CATEGORIES

var createCategories = function createCategories(icon, index) {
  icons.forEach(function (iconImage, i) {
    var mainContainer = document.querySelector('.icons-container');

    if (mainContainer) {
      var iconContainer = document.createElement("section");
      iconContainer.classList.add('icon-container'); // Create Icon

      var _icon = document.createElement('i');

      _icon.classList.add('fas');

      _icon.classList.add("fa-".concat(iconImage));

      _icon.classList.add("icon-container__icon"); // Create Icon Text


      var text = document.createElement('p');
      text.classList.add('icon-container__text');
      text.textContent = icons[i].split('-').join(' ');
      iconContainer.insertAdjacentElement('beforeend', _icon);
      iconContainer.insertAdjacentElement('beforeend', text);
      mainContainer.insertAdjacentElement('beforeend', iconContainer);
    }
  });

  _clickIcon(icon);
};

/***/ }),

/***/ "./Public/JS/Budget-Creation.js":
/*!**************************************!*\
  !*** ./Public/JS/Budget-Creation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_watchEmergencyGoalSettings": () => (/* binding */ _watchEmergencyGoalSettings),
/* harmony export */   "_watchForBudgetCreation": () => (/* binding */ _watchForBudgetCreation),
/* harmony export */   "calculateDayEnding": () => (/* binding */ calculateDayEnding),
/* harmony export */   "insertTiming": () => (/* binding */ insertTiming),
/* harmony export */   "setupGoalSetting": () => (/* binding */ setupGoalSetting),
/* harmony export */   "setupSubCategoryCreation": () => (/* binding */ setupSubCategoryCreation),
/* harmony export */   "setupTimingFunctionContainer": () => (/* binding */ setupTimingFunctionContainer),
/* harmony export */   "watchForSettingTiming": () => (/* binding */ watchForSettingTiming)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Budget_Categories__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Budget-Categories */ "./Public/JS/Budget-Categories.js");
/* harmony import */ var _Update_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Update-User */ "./Public/JS/Update-User.js");
/* harmony import */ var _Maintain_Budget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Maintain-Budget */ "./Public/JS/Maintain-Budget.js");
/* harmony import */ var _Budget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Budget */ "./Public/JS/Budget.js");
/* harmony import */ var _Base_Forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Base-Forms */ "./Public/JS/Base-Forms.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");








var _watchEmergencyGoalSettings = function _watchEmergencyGoalSettings(budget, setting) {
  var emergencySettingLabels = document.querySelectorAll('.emergency-checkbox-label');
  var emergencyInputs = document.querySelectorAll('.emergency-input');
  emergencySettingLabels.forEach(function (esl, i) {
    esl.addEventListener('click', function (e) {
      emergencySettingLabels.forEach(function (label) {
        label.classList.remove('clicked-label');
      });
      esl.classList.add('clicked-label');

      if (esl.textContent === "Length Of Time") {
        emergencyInputs[1].classList.toggle('closed');
        emergencyInputs[1].classList.toggle('open');

        if (emergencyInputs[0].classList.contains('open')) {
          emergencyInputs[0].classList.toggle('closed');
          emergencyInputs[0].classList.toggle('open');
        }
      }

      if (esl.textContent === "Total Amount") {
        emergencyInputs[0].classList.toggle('closed');
        emergencyInputs[0].classList.toggle('open');

        if (emergencyInputs[1].classList.contains('open')) {
          emergencyInputs[1].classList.toggle('closed');
          emergencyInputs[1].classList.toggle('open');
        }
      }

      setting = esl.textContent;

      if (setting === "Length Of Time") {
        document.querySelector('#timingNumber').focus();
      }

      if (setting === "Total Amount") {
        document.querySelector('#emergencyGoal').focus();
      }

      if (budget) {
        // budget.accounts.emergencyFund.emergencyGoalMeasurement = setting;
        budget._updateAccounts("Creation", "Emergency Measurement", {
          setting: setting
        });
      }

      console.log(budget);
      return setting;
    });
  });
};

var _finishUpdatingSubCategories = function _finishUpdatingSubCategories(budget, goals) {
  console.log(budget);
  var index = 0; // This is where the issue persists with the sub category individual payments.

  budget.mainCategories.forEach(function (mc, i) {
    mc.subCategories.forEach(function (sc, i) {
      sc._finishUpdatingSubCategory(Number(goals[index].value));

      index++;
    });
  });
  return;
};

var checkUser = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
    var userInfo, user;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Update_User__WEBPACK_IMPORTED_MODULE_4__.getSomePersonals();

          case 2:
            userInfo = _context.sent;
            user = userInfo.data.data.user;
            return _context.abrupt("return", user);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkUser() {
    return _ref.apply(this, arguments);
  };
}();

var getUserInformation = /*#__PURE__*/function () {
  var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
    var userInfo, user, lastname;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Update_User__WEBPACK_IMPORTED_MODULE_4__.getSomePersonals();

          case 2:
            userInfo = _context2.sent;
            user = userInfo.data.data.user;
            lastname = user.lastname;
            return _context2.abrupt("return", (user, lastname));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserInformation() {
    return _ref2.apply(this, arguments);
  };
}(); // const userInfo = await Updating.getSomePersonals();
// const user = userInfo.data.data.user;


var getOverallBudget = function getOverallBudget(subCategories, overall) {
  var arrayOfTotals = [];
  subCategories.forEach(function (sc, i) {
    var subCategoryTotal = sc.firstChild.nextSibling.firstChild.value;
    arrayOfTotals.push(subCategoryTotal);
  });
  var initialValue = 0;
  overall = arrayOfTotals.reduce(function (previous, current) {
    return Number(previous) + Number(current);
  }, initialValue);
  return overall;
};

var getOverallSpent = function getOverallSpent(subCategories, overall) {
  var arrayOfTotals = [];
  subCategories.forEach(function (sc, i) {
    var subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent);
    sc.firstChild.nextSibling.nextSibling.firstChild.textContent === "$".concat(sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]) ? subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]) : subCategoryTotal = 0;
    arrayOfTotals.push(subCategoryTotal);
  });
  var initialValue = 0;
  overall = arrayOfTotals.reduce(function (previous, current) {
    return Number(previous) + Number(current);
  }, initialValue);
  return overall;
};

var getOverallPercentageSpent = function getOverallPercentageSpent(total, part) {
  var percent = (part / total).toFixed(2);
  if (percent === NaN) percent = 0;
  return percent;
};

var getSinglePercentageSpent = function getSinglePercentageSpent(spent, total) {
  var percentage = (spent / total).toFixed(2);
  return percentage;
};

var buildSubCategories = function buildSubCategories(categories, index, secondaryIndex, clickedItem) {
  var timingFunctionContainer = document.querySelector('.timing-container');
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }); /////////////////////////////////////////
  // SELECT SUB CATEGORY DISPLAY

  var subCategoryDisplay = document.querySelector('.sub-category-display');
  var subCategory = document.createElement('section');
  subCategory.classList.add('sub-category--month-view');
  subCategory.classList.add('r__sub-category--month-view');
  subCategory.classList.add('closed');
  subCategory.dataset.category = "".concat(secondaryIndex);
  subCategoryDisplay.insertAdjacentElement('beforeend', subCategory);
  var numberOfSections = 5;
  var sectionIndex = 0;
  var subCategories = document.querySelectorAll('.sub-category--month-view');

  var _loop = function _loop() {
    var subCategorySection = document.createElement('section');
    subCategorySection.classList.add('sub-category--month-view__section');
    subCategorySection.classList.add('r__sub-category--month-view__section');
    subCategory.insertAdjacentElement('beforeend', subCategorySection); ///////////////////////////////////////////
    // CREATE SUB CATEGORY NAME

    var subCategoryName = document.createElement('p');
    subCategoryName.classList.add('sub-category--month-view__section__category-name');
    subCategoryName.classList.add('r__sub-category--month-view__section__category-name'); // subCategoryName.textContent = `${categories[index].title}`;
    //////////////////////////////////////////
    // CREATE SUB CATEGORY TIMING BUTTON

    var subCategoryTimingButton = document.createElement('button');
    subCategoryTimingButton.classList.add('button--borderless-set-timing-button');
    subCategoryTimingButton.classList.add('r__button--borderless-set-timing-button');
    subCategoryTimingButton.textContent = "+ Timing";
    var subCategories = document.querySelectorAll('.sub-category--month-view'); //////////////////////////////////////////
    // CREATE SUB CATEGORY TIMING DISPLAY

    if (sectionIndex === 0) {
      subCategorySection.insertAdjacentElement('beforeend', subCategoryName);
      subCategorySection.insertAdjacentElement('beforeend', subCategoryTimingButton);
      subCategoryName.textContent = categories[index].title;
    }

    if (sectionIndex === 1) {
      var subCategoryInput = document.createElement('input');
      subCategoryInput.classList.add('sub-category--month-view__section__input');
      subCategoryInput.classList.add('r__sub-category--month-view__section__input');
      subCategoryInput.classList.add('individual-payment');
      subCategoryInput.classList.add('r__individual-payment');
      subCategoryInput.type = "number";
      subCategoryInput.min = 0;
      subCategorySection.insertAdjacentElement('beforeend', subCategoryInput);
      subCategoryInput.addEventListener('keyup', function (e) {
        e.preventDefault();
        var overallBudget = document.querySelectorAll('.month-container__overall-budget-summary-container--single-summary__amount');
        var individualPayments = document.querySelectorAll('.individual-payment');
        var spent = subCategoryInput.closest('section').nextSibling.firstChild;
        var remaining = subCategoryInput.closest('section').nextSibling.nextSibling.firstChild;
        var percentageSpent = subCategoryInput.closest('section').nextSibling.nextSibling.nextSibling.firstChild;
        var overallSpent = overallBudget[1];
        var overallRemaining = overallBudget[2];
        var overallPercentageSpent = overallBudget[3];
        var total = getOverallBudget(subCategories, overallBudget[0]);
        var part = getOverallSpent(subCategories, overallSpent);
        var percentage = getOverallPercentageSpent(total, part);
        overallBudget[0].textContent = money.format(getOverallBudget(subCategories, overallBudget[0]));
        overallSpent.textContent = money.format(part);
        overallRemaining.textContent = money.format(total - part);
        overallPercentageSpent.textContent = "".concat(percentage, "%");
        spent.textContent = money.format(0);
        remaining.textContent = money.format(subCategoryInput.value - 0);
        percentageSpent.textContent = "".concat(getSinglePercentageSpent(Number(spent.textContent.split('$')[1]), subCategoryInput.value), "%");
      });
    }

    if (sectionIndex === 2) {
      var subCategoryContent = document.createElement('p');
      subCategoryContent.classList.add('sub-category--month-view__section__content');
      subCategoryContent.classList.add('r__sub-category--month-view__section__content');
      subCategorySection.insertAdjacentElement('beforeend', subCategoryContent);
    }

    if (sectionIndex === 3) {
      var _subCategoryContent = document.createElement('p');

      _subCategoryContent.classList.add('sub-category--month-view__section__content');

      _subCategoryContent.classList.add('r__sub-category--month-view__section__content');

      subCategorySection.insertAdjacentElement('beforeend', _subCategoryContent);
    }

    if (sectionIndex === 4) {
      var _subCategoryContent2 = document.createElement('p');

      _subCategoryContent2.classList.add('sub-category--month-view__section__content');

      _subCategoryContent2.classList.add('r__sub-category--month-view__section__content');

      subCategorySection.insertAdjacentElement('beforeend', _subCategoryContent2);
    }

    sectionIndex++;
  };

  while (sectionIndex < numberOfSections) {
    _loop();
  }

  var overallBudget = document.querySelectorAll('.month-container__overall-budget-summary-container--single-summary__amount');
  var individualPayments = document.querySelectorAll('.individual-payment');
  subCategories.forEach(function (sc, i) {
    var input = sc.firstChild.nextSibling.firstChild;
    var spent = sc.firstChild.nextSibling.nextSibling.firstChild;
    var remaining = sc.firstChild.nextSibling.nextSibling.nextSibling.firstChild;
    var percentageSpent = sc.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild;
    var overallSpent = overallBudget[1];
    var overallRemaining = overallBudget[2];
    var overallPercentageSpent = overallBudget[3];
    input.addEventListener('keyup', function (e) {
      e.preventDefault(); // getOverallSpent(0, individualPayments[i].value, overallSpent);
    });
  });
};

var getNextWeekDayDate = function getNextWeekDayDate(days, date, weekday) {
  var currentWeekDay = days[date.getDay()];
  var startingDate = date;
  var alterable;
  if (currentWeekDay === days[weekday]) console.log("They Match!");

  while (currentWeekDay !== days[weekday]) {
    alterable = new Date(date.setDate(startingDate.getDate() + 1));
    currentWeekDay = days[alterable.getDay()];

    if (days[alterable.getDay()] === weekday) {
      startingDate = alterable;
      return currentWeekDay;
    }
  }

  return startingDate;
};

var checkMonth = function checkMonth(date) {
  return date.getMonth();
};

var create12MonthArray = function create12MonthArray(array, input, timing, days) {
  var numberOfIterations;
  var startingIteration = 0;
  var timingInputs = document.querySelectorAll('.timing-container__section__label__input');

  if (timing === "Monthly") {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    var adjustedDate = new Date(timingInputs[0].value);
    var selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + 7));
    var manipulated = input;
    array.push(selectedDate);
    numberOfIterations = 11;

    while (startingIteration < numberOfIterations) {
      array.push(new Date(manipulated.setMonth(manipulated.getMonth() + 1)));
      startingIteration++;
    }
  }

  if (timing === "Bi-Monthly") {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    var adjustedDate1 = new Date(timingInputs[1].value);
    var selectedDate1 = new Date(adjustedDate1.setHours(adjustedDate1.getHours() + 7));
    var adjustedDate2 = new Date(timingInputs[2].value);
    var selectedDate2 = new Date(adjustedDate2.setHours(adjustedDate2.getHours() + 7));
    var manipulated1 = input[0];
    var manipulated2 = input[1];
    var biMonthlyArray = [];
    biMonthlyArray.push(selectedDate1, selectedDate2);
    array.push(biMonthlyArray);
    numberOfIterations = 11;

    while (startingIteration < numberOfIterations) {
      biMonthlyArray = [];
      biMonthlyArray.push(new Date(manipulated1.setMonth(manipulated1.getMonth() + 1)));
      biMonthlyArray.push(new Date(manipulated2.setMonth(manipulated2.getMonth() + 1)));
      array.push(biMonthlyArray);
      startingIteration++;
    }
  }

  if (timing === "Bi-Weekly") {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    var _adjustedDate = new Date(timingInputs[3].value);

    var _selectedDate = new Date(_adjustedDate.setHours(_adjustedDate.getHours() + 7));

    var _manipulated = input;
    array.push(_selectedDate);
    numberOfIterations = 25;

    while (startingIteration < numberOfIterations) {
      array.push(new Date(_manipulated.setDate(_manipulated.getDate() + 14)));
      startingIteration++;
    }
  }

  if (timing === "Weekly") {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    var timingSelect = document.querySelector('.timing-container__section__label__select');
    var selectedWeekDay = timingSelect.value;
    var currentDate1 = new Date();
    var currentDate2 = new Date();
    var nextWeekDay = getNextWeekDayDate(days, currentDate1, selectedWeekDay);
    var firstDate = getNextWeekDayDate(days, currentDate2, selectedWeekDay);
    var _adjustedDate2 = nextWeekDay;
    var _selectedDate2 = _adjustedDate2;
    var _manipulated2 = currentDate1;
    console.log(_selectedDate2, firstDate);
    array.push(_selectedDate2);
    numberOfIterations = 51;

    while (startingIteration < numberOfIterations) {
      array.push(new Date(_manipulated2.setDate(_manipulated2.getDate() + 7)));
      startingIteration++;
    }

    array[0] = firstDate;
  }

  return array;
};

var calculateDayEnding = function calculateDayEnding(endDigit, dateEnding, input) {
  if (endDigit === 0 || endDigit === 4 || endDigit === 5 || endDigit === 6 || endDigit === 7 || endDigit === 8 || endDigit === 9) {
    dateEnding = "th";
  }

  if (endDigit === 1) {
    dateEnding = "st";
    if (Number(input.getDate() === 11)) dateEnding = "th";
  }

  if (endDigit === 2) dateEnding = "nd";
  if (endDigit === 3) dateEnding = "rd";
  return dateEnding;
};
var insertTiming = function insertTiming(target, inputValues, timing, timingButtons, budget, index, placeholderBudget) {
  var wording, dayEnding, dayEndingNumberOne;
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var currentMainCategory, subCategoryIndex, mainIndex; ////////////////////////////
  // INITIALIZE 12 MONTH ARRAY

  var twelveMonthArray = []; // GET MONTHLY TIMING

  if (timing === "Monthly") {
    // Create Payment Schedule
    var paymentSchedule = create12MonthArray(twelveMonthArray, inputValues[0], timing, days); // Get Current Main Category

    budget.mainCategories.forEach(function (mc, i) {
      var categoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
      categoryTitles.forEach(function (ct) {
        if (mc.title === ct.textContent) {
          currentMainCategory = mc;
          console.log(mainIndex, mc.title, ct);
          return mainIndex = i;
        }
      });
    });
    budget.mainCategories.forEach(function (mc, i) {
      var mainCategoryIndex = i;
      mc.subCategories.forEach(function (sc) {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    }); ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategory("Creation", "Timing", {
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: paymentSchedule
    }); ///////////////////////////////
    // GET THE DUE DATE


    var dueDate = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0]; //////////////////////////
    // GET LAST DIGIT OF DATE

    dayEndingNumberOne = Number(dueDate.getDate().toString().split('')[dueDate.getDate().toString().length - 1]); ///////////////////////////////////////////////
    // CALCULATE PROPER DAY ENDING (i.e. 'st' on 1st)

    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, dueDate); ////////////////////////////
    // GET THE DAY OF THE WEEK

    var day = days[dueDate.getDay()]; //////////////////////////////
    // GET THE DAY OF THE MONTH

    var dayOne = dueDate.getDate(); //////////////////////////////////////////////
    // SET THE WORDING FOR THE TIMING ON THE UI

    wording = "Due ".concat(day, ", the ").concat(dayOne).concat(dayEnding, " of ").concat(months[dueDate.getMonth()], ".");
  } // GET BI-MONTHLY TIMING


  if (timing === "Bi-Monthly") {
    ////////////////////////////////////////////
    // RETURN IF MONTH OF DATES DO NOT MATCH
    if (inputValues[0].getMonth() !== inputValues[1].getMonth()) return; // Create Payment Schedule

    var _paymentSchedule = create12MonthArray(twelveMonthArray, inputValues, timing, days); // Get Current Main Category


    budget.mainCategories.forEach(function (mc, i) {
      var categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;

      if (mc.title === categoryTitle) {
        currentMainCategory = mc;
        mainIndex = i;
      }
    }); // Get Correct Sub Category Index

    budget.mainCategories.forEach(function (mc, i) {
      var mainCategoryIndex = i;
      mc.subCategories.forEach(function (sc) {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    }); ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategory("Creation", "Timing", {
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: _paymentSchedule
    }); ///////////////////////////////
    // GET THE DUE DATES


    var dueDate1 = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0][0];
    var dueDate2 = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0][1]; //////////////////////////
    // GET LAST DIGIT OF DATES

    dayEndingNumberOne = Number(dueDate1.getDate().toString().split('')[dueDate1.getDate().toString().length - 1]);
    var dayEndingNumberTwo = Number(dueDate2.getDate().toString().split('')[dueDate2.getDate().toString().length - 1]); ///////////////////////////////////////////////
    // CALCULATE PROPER DAY ENDING (i.e. 'st' on 1st)

    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, dueDate1);
    var dayEndingTwo = calculateDayEnding(dayEndingNumberTwo, dayEnding, dueDate2); ////////////////////////////
    // GET THE DAY OF THE WEEK

    var _day = dueDate1.getDay();

    var day2 = dueDate2.getDay(); //////////////////////////////
    // GET THE DAY OF THE MONTH

    var _dayOne = dueDate1.getDate();

    var dayTwo = dueDate2.getDate(); //////////////////////////////////////////////
    // SET THE WORDING FOR THE TIMING ON THE UI

    wording = "Due the ".concat(_dayOne).concat(dayEnding, " & ").concat(dayTwo).concat(dayEndingTwo, ", of ").concat(months[dueDate1.getMonth()]);
  } // GET BI-WEEKLY TIMING


  if (timing === "Bi-Weekly") {
    // Create Payment Schedule
    var _paymentSchedule2 = create12MonthArray(twelveMonthArray, inputValues[0], timing, days); // Get Current Main Category


    budget.mainCategories.forEach(function (mc, i) {
      var categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;

      if (mc.title === categoryTitle) {
        currentMainCategory = mc;
        mainIndex = i;
      }
    }); // Get Correct Sub Category Index

    budget.mainCategories.forEach(function (mc, i) {
      var mainCategoryIndex = i;
      mc.subCategories.forEach(function (sc) {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    }); ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategory("Creation", "Timing", {
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: _paymentSchedule2
    }); ///////////////////////////////
    // GET THE DUE DATE


    var _dueDate = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0]; //////////////////////////
    // GET LAST DIGIT OF DATE

    dayEndingNumberOne = Number(_dueDate.getDate().toString().split('')[_dueDate.getDate().toString().length - 1]); ///////////////////////////////////////////////
    // CALCULATE PROPER DAY ENDING (i.e. 'st' on 1st)

    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, _dueDate); ////////////////////////////
    // GET THE DAY OF THE WEEK

    var _day2 = days[_dueDate.getDay()]; //////////////////////////////
    // GET THE DAY OF THE MONTH


    var _dayOne2 = _dueDate.getDate(); //////////////////////////////////////////////
    // SET THE WORDING FOR THE TIMING ON THE UI


    wording = "Due the ".concat(_dayOne2).concat(dayEnding, " of ").concat(months[_dueDate.getMonth()], ".");
  } // GET WEEKLY TIMING


  if (timing === "Weekly") {
    // Create Payment Schedule
    var _paymentSchedule3 = create12MonthArray(twelveMonthArray, inputValues[0], timing, days); // Get Current Main Category


    budget.mainCategories.forEach(function (mc, i) {
      var categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;

      if (mc.title === categoryTitle) {
        currentMainCategory = mc;
        mainIndex = i;
      }
    }); // Get Correct Sub Category Index

    budget.mainCategories.forEach(function (mc, i) {
      var mainCategoryIndex = i;
      mc.subCategories.forEach(function (sc) {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    }); ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategory("Creation", "Timing", {
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: _paymentSchedule3
    }); ///////////////////////////////
    // GET THE DUE DATE


    var _dueDate2 = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0];
    console.log(_dueDate2); //////////////////////////
    // GET LAST DIGIT OF DATE

    dayEndingNumberOne = Number(_dueDate2.getDate().toString().split('')[_dueDate2.getDate().toString().length - 1]); ///////////////////////////////////////////////
    // CALCULATE PROPER DAY ENDING (i.e. 'st' on 1st)

    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, _dueDate2); ////////////////////////////
    // GET THE DAY OF THE WEEK

    var _day3 = days[_dueDate2.getDay()]; //////////////////////////////
    // GET THE DAY OF THE MONTH


    var _dayOne3 = _dueDate2.getDate(); //////////////////////////////////////////////
    // SET THE WORDING FOR THE TIMING ON THE UI


    wording = "Due every ".concat(_day3, " of the month.");
  }

  target.textContent = wording;
  var timingFunctionContainer = document.querySelector('.timing-container');
  timingFunctionContainer.classList.toggle('closed');
  timingFunctionContainer.classList.toggle('open');
}; /////////////////////////////////////////
// WATCH FOR TIMING SETTING

var watchForSettingTiming = function watchForSettingTiming(budget, index, clickedItem, timing, placeholderBudget, fullBudget) {
  // Getting the timing.
  var timingButtons = document.querySelectorAll('.button--timing-button');
  var monthlyTimingButton = timingButtons[0];
  var biMonthlyTimingButton = timingButtons[1];
  var biWeeklyTimingButton = timingButtons[2];
  var weeklyTimingButton = timingButtons[3];
  var timingInputButtons = [monthlyTimingButton, biMonthlyTimingButton, biWeeklyTimingButton, weeklyTimingButton];
  timingInputButtons.forEach(function (tib, i) {
    if (tib) {
      tib.addEventListener('click', function (e) {
        e.preventDefault();
        timing = tib.firstChild.nextSibling.textContent;
      });
    }
  });
  var subCategoryTimingButtons = document.querySelectorAll('.button--borderless-set-timing-button');
  var timingFunctionContainer = document.querySelector('.timing-container');
  subCategoryTimingButtons.forEach(function (sctb, i) {
    sctb.addEventListener('click', function (e) {
      e.preventDefault();
      timingFunctionContainer.classList.toggle('closed');
      timingFunctionContainer.classList.toggle('open');
      clickedItem = e.target;
    });
  });
  var timingSubmitButtons = document.querySelectorAll('.button--timing-button-submit');
  var timingSectionInputs = document.querySelectorAll('.timing-container__section__label__input');
  timingSubmitButtons.forEach(function (tsb) {
    tsb.addEventListener('click', function (e) {
      e.preventDefault();
      var timingArray = [];
      var oldMonthlyTiming = new Date(timingSectionInputs[0].value);
      var monthlyTiming = new Date(oldMonthlyTiming.setHours(oldMonthlyTiming.getHours() + 7));

      var subCategoryIndex = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(document.querySelectorAll('.sub-category-display__sub-category__section__set-category-timing-button')).indexOf(clickedItem);

      var subCategoryTimingTarget = document.querySelectorAll('.sub-category-display__sub-category__section__set-category-timing-text')[subCategoryIndex];

      if (timing === "Monthly") {
        timingArray = [];
        timingArray.push(monthlyTiming);
        return insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }

      if (timing === "Bi-Monthly") {
        e.preventDefault();
        var oldTimingOne = new Date(timingSectionInputs[1].value);
        var oldTimingTwo = new Date(timingSectionInputs[2].value);
        var timingOne = new Date(oldTimingOne.setHours(oldTimingOne.getHours() + 7));
        var timingTwo = new Date(oldTimingTwo.setHours(oldTimingTwo.getHours() + 7));
        timingArray = [];
        timingArray.push(timingOne);
        timingArray.push(timingTwo);
        return insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }

      if (timing === "Bi-Weekly") {
        var oldBiWeeklyTiming = new Date(timingSectionInputs[3].value);
        var biWeeklyTiming = new Date(oldBiWeeklyTiming.setHours(oldBiWeeklyTiming.getHours() + 7));
        var subCategories = document.querySelectorAll('.sub-category--month-view');
        timingArray = [];
        timingArray.push(biWeeklyTiming);
        insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
        return;
      }

      if (timing === "Weekly") {
        var timingSectionSelect = document.querySelector('.timing-container__section__label__select');
        var oldWeeklyTiming = new Date(timingSectionSelect.value);
        var weeklyTiming = new Date(oldWeeklyTiming.setHours(oldWeeklyTiming.getHours() + 7)); // const weeklyTiming = new Date(oldWeeklyTiming.setHours(oldWeeklyTiming.getHours() + (oldMonthlyTiming.getTimezoneOffset() + 1)));
        // Date Sat Apr 23 2022 20:11:15 GMT-0600 (Mountain Daylight Time)
        // Date Sat Apr 23 2022 20:12:21 GMT-0600 (Mountain Daylight Time)

        timingArray = [];
        timingArray.push(weeklyTiming);
        insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }
    });
  });
}; /////////////////////////////////////////
// SET UP TIMING FUNCTION CONTAINER

var setupTimingFunctionContainer = function setupTimingFunctionContainer(container, timing) {
  var closeTimingFunctionContainer = document.querySelector('.timing-container__closure-icon'); /////////////////////////////////////////
  // INITIALIZE VARIABLES FOR TIMING INPUTS

  var timingButtons = document.querySelectorAll('.button--timing-button');
  var monthlyTimingButton = timingButtons[0];
  var biMonthlyTimingButton = timingButtons[1];
  var biWeeklyTimingButton = timingButtons[2];
  var weeklyTimingButton = timingButtons[3];
  var timingInputButtons = [monthlyTimingButton, biMonthlyTimingButton, biWeeklyTimingButton, weeklyTimingButton];
  var timingLabels = document.querySelectorAll('.timing-container__section__label');
  var timingSubmitButtons = document.querySelectorAll('.button--timing-button-submit'); // Monthly Timing

  var monthlyTimingLabel = timingLabels[0];
  var monthlyTimingSubmit = timingSubmitButtons[0]; // Bi-Monthly Timing

  var biMonthlyTimingLabelOne = timingLabels[1];
  var biMonthlyTimingLabelTwo = timingLabels[2];
  var biMonthlyTimingSubmit = timingSubmitButtons[1]; // Bi-Weekly Timing

  var biWeeklyTimingLabel = timingLabels[3];
  var biWeeklyTimingSubmit = timingSubmitButtons[2]; // Weekly Timing

  var weeklyTimingLabel = timingLabels[4];
  var weeklyTimingSubmit = timingSubmitButtons[3];
  var timingFunctionPages = [[monthlyTimingLabel, monthlyTimingSubmit], [biMonthlyTimingLabelOne, biMonthlyTimingLabelTwo, biMonthlyTimingSubmit], [biWeeklyTimingLabel, biWeeklyTimingSubmit], [weeklyTimingLabel, weeklyTimingSubmit]]; // sub-category-display__timing-container__monthly-container__label__input

  timingInputButtons.forEach(function (tib, i) {
    var index = i;
    timingFunctionPages.forEach(function (tfp, i) {
      tfp.forEach(function (el) {
        if (el) el.classList.add('closed');
      });
    });

    if (tib) {
      tib.addEventListener('click', function (e) {
        timingFunctionPages.forEach(function (tfp, i) {
          tfp.forEach(function (el) {
            el.classList.add('closed');
            el.classList.remove('open');
          });
        });
        timingFunctionPages[index].forEach(function (te) {
          te.classList.toggle('closed');
          te.classList.toggle('open');
        });
      });
    }
  });

  if (closeTimingFunctionContainer) {
    closeTimingFunctionContainer.addEventListener('click', function (e) {
      e.preventDefault();
      container.classList.toggle('closed');
      container.classList.toggle('open');
    });
  }
};

var getTimingContainerHeight = function getTimingContainerHeight(categories, index) {
  return 100 * categories[index].subCategories.length / 10;
};

var setupGoalSetting = function setupGoalSetting(budget, index, clickedItem, timing) {
  var leftButton = document.querySelector('.left');
  var rightButton = document.querySelector('.right');
  var mainCategoryIcon = document.querySelector('.main-category-display__category-display__icon');
  var mainCategoryTitle = document.querySelector('.main-category-display__category-display__title');
  mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
  mainCategoryTitle.textContent = budget.mainCategories[index].title;
  budget.mainCategories.forEach(function (c, i) {
    /////////////////////////////////////////
    // INITIALIZE INDEX FOR DATASET
    var dataIndex = i;
    c.subCategories.forEach(function (sc, i) {
      // This is NOT part of the methods of the class, so I will ignore this for now.
      buildSubCategories(c.subCategories, i, dataIndex, clickedItem);
    });
  });
  var subCategories = document.querySelectorAll('.sub-category--month-view');
  subCategories.forEach(function (sc, i) {
    if (Number(sc.dataset.category) === 0) {
      sc.classList.toggle('closed');
    }
  }); /////////////////////////////////////////
  // SET UP TIMING FUNCTION CONTAINER

  var timingFunctionContainer = document.querySelector('.timing-container'); // This is NOT part of the methods of the class, so I will ignore this for now.

  setupTimingFunctionContainer(timingFunctionContainer);
  timingFunctionContainer.style.height = "".concat(getTimingContainerHeight(budget.mainCategories, index), "rem");
  timingFunctionContainer.style.minHeight = "calc(100% - 4rem)";
  if (getTimingContainerHeight(budget.mainCategories, index) >= 40) timingFunctionContainer.style.justifyContent = "space-evenly";
  if (getTimingContainerHeight(budget.mainCategories, index) < 40) timingFunctionContainer.style.justifyContent = "flex-start";
  leftButton.addEventListener('click', function (e) {
    index--;
    if (index < 0) index = 0;
    mainCategoryIcon.classList.remove(budget.mainCategories[index + 1].icon);
    mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
    mainCategoryTitle.textContent = budget.mainCategories[index].title;
    subCategories.forEach(function (sc, i) {
      sc.classList.add('closed');
      sc.classList.remove('open');

      if (Number(sc.dataset.category) === index) {
        sc.classList.remove('closed');
        sc.classList.add('open');
      }
    });
    timingFunctionContainer.style.height = getTimingContainerHeight(budget.mainCategories, index);
    timingFunctionContainer.style.minHeight = "calc(100% - 4rem)";
    if (getTimingContainerHeight(budget.mainCategories, index) >= 40) timingFunctionContainer.style.justifyContent = "space-evenly";
    if (getTimingContainerHeight(budget.mainCategories, index) < 40) timingFunctionContainer.style.justifyContent = "flex-start";
    return index;
  });
  rightButton.addEventListener('click', function (e) {
    index++;
    if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
    mainCategoryIcon.classList.remove(budget.mainCategories[index - 1].icon);
    mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
    mainCategoryTitle.textContent = budget.mainCategories[index].title;
    subCategories.forEach(function (sc, i) {
      sc.classList.add('closed');
      sc.classList.remove('open');

      if (Number(sc.dataset.category) === index) {
        sc.classList.remove('closed');
        sc.classList.add('open');
      }
    });
    timingFunctionContainer.style.height = getTimingContainerHeight(budget.mainCategories, index);
    timingFunctionContainer.style.minHeight = "calc(100% - 4rem)";
    if (getTimingContainerHeight(budget.mainCategories, index) >= 40) timingFunctionContainer.style.justifyContent = "space-evenly";
    if (getTimingContainerHeight(budget.mainCategories, index) < 40) timingFunctionContainer.style.justifyContent = "flex-start";
    return index;
  });

  _watchForCyclingCategoryGoals();

  watchForSettingTiming(budget, index, clickedItem, timing);
};

var cycleMainCategories = function cycleMainCategories(direction, index, budget, iconElement, textElement) {
  if (direction === "Left") {
    if (index < 0) index = 0;
    iconElement.classList.remove(budget.mainCategories[index + 1].icon);
    iconElement.classList.add(budget.mainCategories[index].icon);
    textElement.textContent = budget.mainCategories[index].title;
    var subCategories = document.querySelectorAll('.sub-category');
    subCategories.forEach(function (sc, i) {
      sc.classList.add('closed');
      sc.classList.remove('open');

      if (sc.dataset.category === "".concat(index)) {
        sc.classList.remove('closed');
        sc.classList.add('open');
      }
    });
    return index;
  }

  if (direction === "Right") {
    if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
    iconElement.classList.remove(budget.mainCategories[index - 1].icon);
    iconElement.classList.add(budget.mainCategories[index].icon);
    textElement.textContent = budget.mainCategories[index].title;

    var _subCategories = document.querySelectorAll('.sub-category');

    _subCategories.forEach(function (sc, i) {
      sc.classList.add('closed');
      console.log(sc.dataset.category);

      if (sc.dataset.category === "".concat(index)) {
        sc.classList.remove('closed');
      }
    });

    return index;
  }
};

var closeSubCategoryCreationInput = function closeSubCategoryCreationInput(button, inputSection) {
  button.classList.toggle('closed');
  button.classList.toggle('open');
  inputSection.classList.toggle('closed');
  inputSection.classList.toggle('open');
};

var setupSubCategoryCreation = function setupSubCategoryCreation(budget, index) {
  var leftButton = document.querySelector('.budget-creation-container--sub-categories__main-category-display__left-button__icon');
  var rightButton = document.querySelector('.budget-creation-container--sub-categories__main-category-display__right-button__icon');
  var mainCategoryIcon = document.querySelector('.budget-creation-container--sub-categories__main-category-display__category-information__icon');
  var mainCategoryText = document.querySelector('.budget-creation-container--sub-categories__main-category-display__category-information__text');
  var borderlessButtons = document.querySelectorAll('.button--borderless');
  console.log(borderlessButtons);
  var subCategoryStartCreationButton = borderlessButtons[2];
  var subCategoryStopCreationButton = document.querySelector('.button--small-create-sub-category-close');
  var categoryCreationSection = document.querySelector('.form__section--sub-category-creation');
  var direction;
  var mainCategoryDisplay = document.querySelector('.main-category-display');
  var subCategoryCreationContainer = document.querySelector('.budget-creation-container--sub-categories.r__budget-creation-container--sub-categories'); // USED DURING BUDGET CREATION PROCESS

  if (subCategoryCreationContainer) {
    mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
    mainCategoryText.textContent = budget.mainCategories[index].title;
    leftButton.addEventListener('click', function (e) {
      index--;
      if (index < 0) index = 0;
      direction = "Left";
      cycleMainCategories(direction, index, budget, mainCategoryIcon, mainCategoryText);
    });
    rightButton.addEventListener('click', function (e) {
      index++;
      if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
      direction = "Right";
      cycleMainCategories(direction, index, budget, mainCategoryIcon, mainCategoryText);
    });
    subCategoryStopCreationButton.addEventListener('click', function (e) {
      e.preventDefault();
      closeSubCategoryCreationInput(subCategoryStartCreationButton, categoryCreationSection);
    });
    var subCategoryCreateButton = document.querySelector('.button--small-create-sub-category');
    subCategoryCreateButton.addEventListener('click', function (e) {
      e.preventDefault();
      var subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');

      _Budget_Categories__WEBPACK_IMPORTED_MODULE_3__._verifySubCategory(budget, index);

      subCategoryCreateInput.focus();
      subCategoryCreateInput.value = '';
    });
    subCategoryStartCreationButton.addEventListener('click', function (e) {
      e.preventDefault();
      subCategoryStartCreationButton.classList.toggle('closed');
      subCategoryStartCreationButton.classList.toggle('open');
      categoryCreationSection.classList.toggle('closed');
      categoryCreationSection.classList.toggle('open');
      var subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');
      subCategoryCreateInput.value = '';
      subCategoryCreateInput.focus();
      console.log("Ready...");
    });

    _watchForSubCategoryKeyboardInput();

    watchToCycleSubCategoryMainCategories();
  } // USED INSIDE BUDGET ON MANAGE CATEGORIES PAGE


  if (mainCategoryDisplay) {
    var mainCategoryIcon__alt = document.querySelector('.main-category-display__category-information__icon');
    var mainCategoryText__alt = document.querySelector('.main-category-display__category-information__text');

    var _leftButton = document.querySelector('.main-category-display__left-button__icon');

    var _rightButton = document.querySelector('.main-category-display__right-button__icon');

    if (mainCategoryIcon__alt) {
      mainCategoryIcon__alt.classList.add(budget.mainCategories[index].icon);
      mainCategoryIcon__alt.dataset.category = index;
      mainCategoryText__alt.textContent = budget.mainCategories[index].title;
      mainCategoryText__alt.dataset.category = index;
      console.log(budget);
      var subCategories = document.querySelectorAll('.sub-category');
      subCategories.forEach(function (sc, i) {
        sc.classList.add('closed');
        sc.classList.remove('open');

        if (sc.dataset.category === "".concat(index)) {
          sc.classList.remove('closed');
          sc.classList.add('open');
        }
      });

      _leftButton.addEventListener('click', function (e) {
        index--;
        if (index < 0) index = 0;
        direction = "Left";
        cycleMainCategories(direction, index, budget, mainCategoryIcon__alt, mainCategoryText__alt);
      });

      _rightButton.addEventListener('click', function (e) {
        index++;
        if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
        direction = "Right";
        cycleMainCategories(direction, index, budget, mainCategoryIcon__alt, mainCategoryText__alt);
      });

      subCategoryStartCreationButton.addEventListener('click', function (e) {
        e.preventDefault();
        subCategoryStartCreationButton.classList.toggle('closed');
        subCategoryStartCreationButton.classList.toggle('open');
        categoryCreationSection.classList.toggle('closed');
        categoryCreationSection.classList.toggle('open');
        var subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');
        subCategoryCreateInput.value = '';
        subCategoryCreateInput.focus();
        console.log("Ready...");
      });
      subCategoryStopCreationButton.addEventListener('click', function (e) {
        e.preventDefault();
        closeSubCategoryCreationInput(subCategoryStartCreationButton, categoryCreationSection);
      });

      var _subCategoryCreateButton = document.querySelector('.button--small-create-sub-category');

      _subCategoryCreateButton.addEventListener('click', function (e) {
        e.preventDefault();
        var subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');

        _Budget_Categories__WEBPACK_IMPORTED_MODULE_3__._verifySubCategory(budget, index);

        subCategoryCreateInput.focus();
        subCategoryCreateInput.value = '';
      });

      _watchForSubCategoryKeyboardInput();

      watchToCycleSubCategoryMainCategories();
    }
  }
}; //////////////////////////////////////
// LOG KEYBOARD KEY

var clickToCreateSubCategory = function clickToCreateSubCategory() {
  var e = event;
  e.preventDefault();
  var subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');
  var borderlessButtons = document.querySelectorAll('.button--borderless');
  var subCategoryCreationButton = document.querySelector('.button--small-create-sub-category');
  var subCategoryStartCreationButton = borderlessButtons[2];

  if (e.key === "Enter") {
    var categoryCreation = document.querySelector('.form__section--sub-category-creation');

    if (categoryCreation.classList.contains('open')) {
      subCategoryCreationButton.click();
      return;
    }

    if (!subCategoryStartCreationButton.classList.contains("open")) {
      subCategoryStartCreationButton.classList.toggle('open');
      subCategoryStartCreationButton.classList.toggle('closed');
      categoryCreation.classList.toggle('open');
      categoryCreation.classList.toggle('closed');
      subCategoryCreateInput.focus();
    }
  }
}; //////////////////////////////////////////////////////////////
// WATCHING TO CYCLE MAIN CATEGORIES GOALS


var _watchForCyclingCategoryGoals = function _watchForCyclingCategoryGoals() {
  var leftButton = document.querySelector('.left');
  var rightButton = document.querySelector('.right');
  document.addEventListener("keyup", function (e) {
    e.preventDefault();

    if (e.key === "ArrowLeft") {
      return leftButton.click();
    }

    if (e.key === "ArrowRight") {
      return rightButton.click();
    }
  });
}; //////////////////////////////////////////////////////////////
// WATCHING TO CYCLE MAIN CATEGORIES IN SUB CATEGORY CREATION


var watchToCycleSubCategoryMainCategories = function watchToCycleSubCategoryMainCategories() {
  var leftButton = document.querySelector('.budget-creation-container--sub-categories__main-category-display__left-button__icon');
  var rightButton = document.querySelector('.budget-creation-container--sub-categories__main-category-display__right-button__icon');
  document.addEventListener("keyup", function (e) {
    e.preventDefault();

    if (e.key === "ArrowLeft") {
      return leftButton.click();
    }

    if (e.key === "ArrowRight") {
      return rightButton.click();
    }
  });
}; ///////////////////////////////////////////////////
// WATCH SUB CATEGORY CREATE BUTTON FOR KEYBOARD


var _watchForSubCategoryKeyboardInput = function _watchForSubCategoryKeyboardInput() {
  var borderlessButtons = document.querySelectorAll('.button--borderless');
  var subCategoryStartCreationButton = borderlessButtons[2];
  subCategoryStartCreationButton.focus();
  document.addEventListener("keyup", clickToCreateSubCategory);
}; /////////////////////////////////
// GO TO PAGE


var goToPage = function goToPage(page, createBudgetPages) {
  createBudgetPages.forEach(function (bp) {
    bp.classList.add('closed');
    if (createBudgetPages[page]) createBudgetPages[page].classList.remove('closed');
  });
}; /////////////////////////////////
// SET BUDGET NAME


var getBudgetName = function getBudgetName(budget) {
  var budgetName = document.getElementById('budgetName').value;

  budget._addName(budgetName);

  return budget;
};

var _checktLatterDaySaintStatus = function _checktLatterDaySaintStatus(user) {
  return user.latterDaySaint;
}; ///////////////////////////////////////
// SETTING UP MAIN CATEGORY CREATION


var setupMainCategoryCreation = function setupMainCategoryCreation(icon, budget) {
  _Budget_Categories__WEBPACK_IMPORTED_MODULE_3__._watchCreateCategoryButton(icon, budget);
}; /////////////////////////////////
// SETUP PAGE


var setupPage = function setupPage(page, createBudgetPages, createBudgetPagesNumber, budget) {
  if (page - 1 === 8 || page - 1 === 9) {
    budget._setInvestmentGoal();
  }

  goToPage(page, createBudgetPages);
  setPageCount(page, createBudgetPagesNumber);
  return page;
}; /////////////////////////////////
// SET CORRECT PAGE COUNT


var setPageCount = function setPageCount(pageNumber, createBudgetPages) {
  var page = document.querySelector('.form__section--page-number-display__number');

  if (page) {
    page.textContent = "Page ".concat(pageNumber + 1, " / ").concat(createBudgetPages);
  }
}; // ////////////////////////////
// // INITIALIZE KEY VARIABLES
// let currentPage = 0;


var _watchTIthingOptions = function _watchTIthingOptions(budget) {
  var tithingSetting;
  var grossOption = document.getElementById('grossOption');
  var netOption = document.getElementById('netOption');
  var surplusOption = document.getElementById('surplusOption');
  var grossOptionLabel = document.getElementById('grossOptionLabel');
  var netOptionLabel = document.getElementById('netOptionLabel');
  var surplusOptionLabel = document.getElementById('surplusOptionLabel');
  var tithingCheckboxes = [grossOption, netOption, surplusOption];
  var tithingOptions = [grossOptionLabel, netOptionLabel, surplusOptionLabel];
  var tithingSection = document.querySelector('.tithing-section');

  if (tithingSection) {
    tithingSection.addEventListener('click', function (e) {
      var clicked = e.target;

      if (e.target === grossOptionLabel) {
        tithingOptions.forEach(function (t) {
          return t.classList.remove('checked');
        });
        clicked.classList.toggle('checked');

        budget._updateAccounts("Creation", "Tithing Setting", {
          setting: "Gross"
        });
      }

      if (e.target === netOptionLabel) {
        tithingOptions.forEach(function (t) {
          return t.classList.remove('checked');
        });
        clicked.classList.toggle('checked');

        budget._updateAccounts("Creation", "Tithing Setting", {
          setting: "Net"
        });
      }

      if (e.target === surplusOptionLabel) {
        tithingOptions.forEach(function (t) {
          return t.classList.remove('checked');
        });
        clicked.classList.toggle('checked');

        budget._updateAccounts("Creation", "Tithing Setting", {
          setting: "Surplus"
        });
      }
    });
  }
};

var _watchCreationFormCloser = function _watchCreationFormCloser(form, budget) {
  // GLITCH: Budget creation form page is NOT resetting when the form is closed.
  var formCloser = document.querySelectorAll(".form-closure-icon")[0];

  if (formCloser) {
    formCloser.addEventListener('click', function (e) {
      form.classList.toggle("closed");
      form.classList.toggle("open");
      budget = undefined;
    });
  }
};

var _watchCreationFormOpener = function _watchCreationFormOpener(form, button, budget) {
  if (button) {
    button.addEventListener("click", function (e) {
      form.classList.toggle("closed");
      form.classList.toggle("open");
      return budget;
    });
  }
};

var _setupBudgetCreation = function _setupBudgetCreation(form, button, budget) {
  _watchCreationFormCloser(form, budget);

  _watchCreationFormOpener(form, button, budget);
};

var _watchForBudgetCreation = /*#__PURE__*/function () {
  var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3() {
    var forms, budgetCreationForm, budgetCreationFormOpenButton, budget, budgetCreationFormPages, pages, budgetCreationFormPagesNumber, currentPage, emergencyGoalSetting, clicked, selectedTiming, buttons, budgetContinueButton, budgetName, subCategoryIndex, icon, userInfo, user, latterDaySaintStatus, budgetNavButton;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            forms = document.querySelectorAll('.form-container--full-width');
            budgetCreationForm = forms[0];
            budgetCreationFormOpenButton = document.querySelector('.budget-card-container__card--create');
            budget = _Budget__WEBPACK_IMPORTED_MODULE_6__.startToCreate();

            _setupBudgetCreation(budgetCreationForm, budgetCreationFormOpenButton, budget); ////////////////////////////
            // INITIALIZE KEY VARIABLES


            budgetCreationFormPages = document.querySelectorAll('.budget-creation-form__page');
            pages = document.querySelectorAll('.form__page--centered.r__form__page--centered');
            budgetCreationFormPagesNumber = pages.length;
            currentPage = 0;
            buttons = document.querySelectorAll('.button--small');
            budgetContinueButton = buttons[0]; //////////////////////////////////////////////////////////////
            // SET APPROPRIATE PAGE NUMBER DEPENDING ON USER INFORMATION

            setPageCount(currentPage, budgetCreationFormPagesNumber); ////////////////////////////////////////////////
            // INITIALIZE KEY VARIABLES INSIDE FUNCTION SCOPE

            subCategoryIndex = 0;
            _context3.next = 15;
            return _Update_User__WEBPACK_IMPORTED_MODULE_4__.getSomePersonals();

          case 15:
            userInfo = _context3.sent;
            user = userInfo.data.data.user; //////////////////////////////////////
            // CHECK IF USER IS A LATTER DAY SAINT

            latterDaySaintStatus = _checktLatterDaySaintStatus(user);

            if (budgetContinueButton) {
              budgetContinueButton.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage++; //////////////////////////////
                // ASSIGN BUDGET INFORMATION
                /////////////////////
                // BUDGET NAME

                getBudgetName(budget); ////////////////////////////////
                // SETUP BUDGET CREATION FORM

                setupPage(currentPage, pages, budgetCreationFormPagesNumber, budget); /////////////////////////////
                // IF NOT LATTER DAY SAINT

                if (currentPage + 1 === 2 && latterDaySaintStatus === false) {
                  // From here, there is a need to check the function names to make sure they make sense as to what they are actually doing.  If not, they WILL be renamed accordingly.
                  setupMainCategoryCreation(icon, budget);
                }

                if (currentPage + 1 === 3 && latterDaySaintStatus === false) {
                  setupSubCategoryCreation(budget, subCategoryIndex);
                }

                if (currentPage + 1 === 4 && latterDaySaintStatus === false) {
                  setupGoalSetting(budget, subCategoryIndex, clicked, selectedTiming);
                }

                if (currentPage + 1 === 5 && latterDaySaintStatus === false) {
                  var individualPayments = document.querySelectorAll('.individual-payment');

                  budget._updateSubCategory("Creation", "Finalizing Sub-Categories", {
                    goals: individualPayments
                  });

                  _watchEmergencyGoalSettings(budget, emergencyGoalSetting);
                }

                if (currentPage + 1 === 6 && latterDaySaintStatus === false) {
                  if (budget.accounts.emergencyFund.emergencyGoalMeasurement === "Length Of Time") {
                    budget._updateAccounts("Creation", "Emergency Goal", {
                      goal: Number(document.querySelector('#timingNumber').value),
                      goalTiming: document.querySelector('.form__select').value
                    });
                  }

                  if (budget.accounts.emergencyFund.emergencyGoalMeasurement === "Total Amount") {
                    budget._updateAccounts("Creation", "Emergency Goal", {
                      goal: Number(document.querySelector('#emergencyGoal').value)
                    });
                  }

                  document.querySelector('#savingsPercentGoal').focus();
                }

                if (currentPage + 1 === 7 && latterDaySaintStatus === false) {
                  budget._updateAccounts("Creation", "Savings", {
                    percentage: Number(document.querySelector('#savingsPercentGoal').value) / 100,
                    goal: Number(document.querySelector('#savingsGoal').value),
                    amount: 0
                  });

                  document.querySelector('#investmentPercentGoal').focus();
                }

                if (currentPage + 1 === 8 && latterDaySaintStatus === false) {
                  budget._updateAccounts("Creation", "Investment", {
                    percentage: Number(document.querySelector('#investmentPercentGoal').value) / 100,
                    goal: Number(document.querySelector('#investmentGoal').value),
                    amount: 0
                  });

                  budget._submit(budget, user);
                } /////////////////////////////
                // IF LATTER DAY SAINT


                if (currentPage + 1 === 2 && latterDaySaintStatus === true) {
                  console.log("Tithing Options");

                  budget._addTithingAccount(user);

                  _watchTIthingOptions(budget);
                }

                if (currentPage + 1 === 3 && latterDaySaintStatus === true) {
                  // From here, there is a need to check the function names to make sure they make sense as to what they are actually doing.  If not, they WILL be renamed accordingly.
                  setupMainCategoryCreation(icon, budget);
                }

                if (currentPage + 1 === 4 && latterDaySaintStatus === true) {
                  setupSubCategoryCreation(budget, subCategoryIndex);
                }

                if (currentPage + 1 === 5 && latterDaySaintStatus === true) {
                  setupGoalSetting(budget, subCategoryIndex, clicked, selectedTiming);
                }

                if (currentPage + 1 === 6 && latterDaySaintStatus === true) {
                  var _individualPayments = document.querySelectorAll('.individual-payment');

                  budget._updateSubCategory("Creation", "Finalizing Sub-Categories", {
                    goals: _individualPayments
                  });

                  _watchEmergencyGoalSettings(budget, emergencyGoalSetting);
                }

                if (currentPage + 1 === 7 && latterDaySaintStatus === true) {
                  if (budget.accounts.emergencyFund.emergencyGoalMeasurement === "Length Of Time") {
                    budget._updateAccounts("Creation", "Emergency Goal", {
                      goal: Number(document.querySelector('#timingNumber').value),
                      goalTiming: document.querySelector('.budget-creation-form__page__section__select').value
                    });
                  }

                  if (budget.accounts.emergencyFund.emergencyGoalMeasurement === "Total Amount") {
                    budget._updateAccounts("Creation", "Emergency Goal", {
                      goal: Number(document.querySelector('#emergencyGoal').value)
                    });
                  }

                  document.querySelector('#savingsPercentGoal').focus();
                }

                if (currentPage + 1 === 8 && latterDaySaintStatus === true) {
                  budget._updateAccounts("Creation", "Savings", {
                    percentage: Number(document.querySelector('#savingsPercentGoal').value) / 100,
                    goal: Number(document.querySelector('#savingsGoal').value),
                    amount: 0
                  });

                  document.querySelector('#investmentPercentGoal').focus();
                }

                if (currentPage + 1 === 9 && latterDaySaintStatus === true) {
                  budget._updateAccounts("Creation", "Investment", {
                    percentage: Number(document.querySelector('#investmentPercentGoal').value) / 100,
                    goal: Number(document.querySelector('#investmentGoal').value),
                    amount: 0
                  });

                  budget._submit(budget, user);
                }
              });
            } // WATCHING YOUR BUDGET AFTER YOU LOGIN OR CREATE YOUR BUDGET


            budgetNavButton = document.querySelector('.budget-container__navigation-button-container__button');

            _Maintain_Budget__WEBPACK_IMPORTED_MODULE_5__._watchBudget();

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function _watchForBudgetCreation() {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./Public/JS/Budget.js":
/*!*****************************!*\
  !*** ./Public/JS/Budget.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Budget": () => (/* binding */ Budget),
/* harmony export */   "startToCreate": () => (/* binding */ startToCreate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Create_Budget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Create-Budget */ "./Public/JS/Create-Budget.js");
/* harmony import */ var _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Manage-Budget */ "./Public/JS/Manage-Budget.js");
/* harmony import */ var _Maintain_Budget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Maintain-Budget */ "./Public/JS/Maintain-Budget.js");
/* harmony import */ var _Budget_Categories__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Budget-Categories */ "./Public/JS/Budget-Categories.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");







var Account = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function Account(options) {
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Account);

  this.amount = options.amount;
});

var Budget = /*#__PURE__*/function () {
  function Budget() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Budget);

    this.name = '';
    this.accounts = {};
    this.mainCategories = [];
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(Budget, [{
    key: "_addName",
    value: function _addName(name) {
      return this.name = name;
    }
  }, {
    key: "_addMainCategory",
    value: function _addMainCategory(icon, title) {
      // This is how main categories are added as objects with an icon and title.
      this.mainCategories.push(new _Budget_Categories__WEBPACK_IMPORTED_MODULE_5__.MainCategory({
        icon: icon,
        title: title
      }));
    }
  }, {
    key: "_updateMainCategory",
    value: function _updateMainCategory() {
      console.log("Main Category");
    }
  }, {
    key: "_deleteMainCategory",
    value: function _deleteMainCategory(title) {
      this.mainCategories = this.mainCategories.filter(function (mc, i) {
        return mc.title !== title;
      });
      console.log("SUCCESSFUL DELETION");
    }
  }, {
    key: "_addSubCategory",
    value: function _addSubCategory(index, title) {
      this.mainCategories[index].subCategories.push(new _Budget_Categories__WEBPACK_IMPORTED_MODULE_5__.SubCategory({
        title: title
      }));
      console.log(this.mainCategories[index].subCategories);
    }
  }, {
    key: "_updateSubCategory",
    value: function _updateSubCategory(mode, update, options) {
      if (mode === "Creation") {
        if (update === "Timing") {
          console.log(options.index, options.subCategoryIndex);
          /*
            GLITCH : In the place of setting timings for both the Budget Creation and Editing Category Goals, the main category titles and icons are both placed and cycled differently.
              With creation, it just removes the class that the main category has for the icon, and adds the next or previous one.  It does the same thing for the titles.  In editing, it displays all 3, while making the main one as display: flex.  The method works on creation, so I likely
              will adjust the edit category goals one for that purpose, with making sure that it does NOT negatively affect other things.
          */

          this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentCycle = options.paymentCycle;
          this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentSchedule = options.paymentSchedule;
          this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.dueDates = [this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentSchedule[0]];
        }

        if (update === "Surplus") {
          this.mainCategories[options.mainIndex].subCategories[options.subIndex].surplus = !this.mainCategories[options.mainIndex].subCategories[options.subIndex].surplus;
          console.log(this.mainCategories[options.mainIndex].subCategories[options.subIndex]);
        }

        if (update === "Finalizing Sub-Categories") {
          var index = 0;
          this.mainCategories.forEach(function (mc, i) {
            mc.subCategories.forEach(function (sc, i) {
              if (Number(options.goals[index].value) === undefined || typeof Number(options.goals[index].value) !== "number") options.goals[index].value = Number(0);
              sc.goalAmount = Number(options.goals[index].value);
              sc.amountSpent = 0;
              sc.amountRemaining = Number(sc.goalAmount - sc.amountSpent);
              sc.percentageSpent = Number(sc.amountSpent / sc.goalAmount);
              if (isNaN(sc.percentageSpent)) sc.percentageSpent = 0;
              index++;
            });
          });
        }
      }

      if (mode === "Updating") {
        console.log("Updating Sub-Category...");
      }
      /*
        This is where updating the goals SHOULD BE.
           TO SOME DEGREE, THIS IS HOW THE UPDATING SUB CATEGORIES SHOULD BE.
           _finishUpdatingSubCategory(goal) {
          let categoryGoal = goal;
          if (categoryGoal === undefined || typeof categoryGoal !== `number`) categoryGoal = 0;
          this.goalAmount = categoryGoal;
          this.amountSpent = 0;
          this.amountRemaining = this.goalAmount - this.amountSpent;
          this.percentageSpent = this.amountSpent / this.goalAmount;
          if (isNaN(this.percentageSpent)) this.percentageSpent = 0;
       */

    }
  }, {
    key: "_deleteSubCategory",
    value: function _deleteSubCategory(mainIndex, subIndex) {
      var _this = this;

      this.mainCategories[mainIndex].subCategories = this.mainCategories[mainIndex].subCategories.filter(function (sc) {
        return sc !== _this.mainCategories[mainIndex].subCategories[subIndex];
      }); // this.mainCategories[mainIndex]._deleteSubCategory(subIndex);

      console.log(this.mainCategories[mainIndex].subCategories);
      console.log("SUCCESSFUL DELETION");
    }
  }, {
    key: "_addAccounts",
    value: function _addAccounts() {
      this.accounts.unAllocated = new Account({
        amount: 0
      });
      this.accounts.monthlyBudget = new Account({
        amount: 0
      });
      this.accounts.emergencyFund = new Account({
        amount: 0
      });
      this.accounts.savingsFund = new Account({
        amount: 0
      });
      this.accounts.expenseFund = new Account({
        amount: 0
      });
      this.accounts.surplus = new Account({
        amount: 0
      });
      this.accounts.investmentFund = new Account({
        amount: 0
      });
      this.accounts.debt = new Account({
        amount: 0,
        debtAmount: 0
      });
    }
  }, {
    key: "_addTithingAccount",
    value: function _addTithingAccount(user) {
      if (user.latterDaySaint === true) this.accounts.tithing = {
        amount: 0
      };
    }
  }, {
    key: "_updateAccounts",
    value: function _updateAccounts(mode, update, options) {
      if (mode === "Creation") {
        if (update === "Tithing Setting") {
          this.accounts.tithing.tithingSetting = options.setting;
          this.accounts.tithing.amount = Number(options.amount);
        }

        if (update === "Emergency Measurement") {
          this.accounts.emergencyFund.emergencyGoalMeasurement = options.setting;
        }

        if (update === "Emergency Goal") {
          if (this.accounts.emergencyFund.emergencyGoalMeasurement === "Length Of Time") {
            this.accounts.emergencyFund.emergencyFundGoal = options.goal;
            this.accounts.emergencyFund.emergencyFundGoalTiming = options.goalTiming;
            this.accounts.emergencyFund.amount = options.amount;
          }

          if (this.accounts.emergencyFund.emergencyGoalMeasurement === "Total Amount") {
            this.accounts.emergencyFund.emergencyFundGoal = options.goal;
            this.accounts.emergencyFund.amount = options.amount;
          }
        }

        if (update === "Expense Fund") {
          this.accounts.expenseFund.amount = Number(options.amount);
        }

        if (update === "Surplus") {
          this.accounts.surplus.amount = Number(options.amount);
        }

        if (update === "Monthly Budget") {
          this.accounts.monthlyBudget.amount = Number(options.amount);
        }

        if (update === "Savings") {
          this.accounts.savingsFund.savingsPercentage = Number(options.percentage);
          this.accounts.savingsFund.savingsGoal = Number(options.goal);
          this.accounts.savingsFund.amount = Number(options.amount);
        }

        if (update === "Investment") {
          this.accounts.investmentFund.investmentPercentage = Number(options.percentage);
          this.accounts.investmentFund.investmentGoal = Number(options.goal);
          this.accounts.investmentFund.amount = Number(options.amount);
        }

        if (update === "Debt") {
          this.accounts.debt.amount = Number(options.amount);
          this.accounts.debt.debtAmount = Number(options.debtAmount);
        }
      }
    }
  }, {
    key: "_updateBudget",
    value: function _updateBudget(mode, update, options, pageLink) {
      if (mode === "Update") {
        var updateObject = options.updateObject;

        if (update === "Budget Management") {
          console.log(options.user);
          updateObject.budgetId = options.budgetId;
          updateObject.userId = options.userId;
          updateObject.name = options.name;
          updateObject.accounts = {
            unAllocated: {
              amount: options.unAllocatedAmount
            },
            monthlyBudget: {
              amount: options.monthlyBudgetAmount
            },
            emergencyFund: options.emergencyFund,
            savingsFund: options.savingsFund,
            expenseFund: {
              amount: options.expenseFundAmount
            },
            surplus: {
              amount: options.surplusAmount
            },
            investmentFund: options.investmentFund,
            debt: {
              amount: options.debtAmount,
              debtAmount: options.debtTotal
            }
          };

          if (options.user.latterDaySaint === true) {
            updateObject.accounts.tithing = options.tithing;
          }

          console.log(updateObject);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(updateObject, pageLink);
        }

        if (update === "Edit Category Goals") {
          console.log(options.updateObject);
          console.log("Updating Category Goals..."); // GLITCH : For some reason, ONLY the last Main Category had been pushed through.  So, the previous two had been erased completely.

          console.log(updateObject.mainCategories);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Manage Categories") {
          console.log("Updating Categories...");
          console.log(options, options.updateObject);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Enter Income") {
          console.log("Entering Income...", options);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Allocate Income") {
          console.log("Allocating...");
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Transaction Planner") {
          console.log("Planning...", options);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Apply Money") {
          console.log("Applying...", options);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Add Investment") {
          console.log("Investing...", options, options.investments);
          var investmentType = document.querySelector('.form__select--accounts-short');
          var investmentName = document.getElementById('investmentName');
          var investmentDescription = document.getElementById('investmentDescription');
          var initialInvestment = document.getElementById('initialInvestment');
          var currentValue = initialInvestment.value;
          var valueDifference = Number(currentValue - initialInvestment.value);
          if (isNaN(valueDifference)) valueDifference = 0;
          options.updateObject.investments.push({
            investmentType: investmentType.value,
            investmentName: investmentName.value,
            investmentDescription: investmentDescription.value,
            initialInvestment: Number(initialInvestment.value),
            currentValue: Number(currentValue),
            valueDifference: valueDifference
          });
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Update Investment") {
          console.log("Updating...", options);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Settle Investment") {
          console.log("Settling...", options);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        if (update === "Add Debt") {
          console.log("Adding Debt...", options);
          _Manage_Budget__WEBPACK_IMPORTED_MODULE_3__.updateMyBudget(options.updateObject, pageLink);
        }

        console.log("Updating...");
      }
    }
  }, {
    key: "_setInvestmentGoal",
    value: function _setInvestmentGoal() {
      this.accounts.investmentFund.investmentPercentage = Number(document.querySelector('#investmentPercentGoal').value) / 100;
      this.accounts.investmentFund.investmentGoal = Number(document.querySelector('#investmentGoal').value);
    }
  }, {
    key: "_submit",
    value: function _submit(budget, user) {
      _Create_Budget__WEBPACK_IMPORTED_MODULE_2__.createBudget(budget, user);
    }
  }, {
    key: "_buildPlaceHolderBudget",
    value: function _buildPlaceHolderBudget(budget, user) {
      var _this2 = this;

      if (budget) {
        this._addTithingAccount(user);

        this._addName(budget.name);

        if (user.latterDaySaint === true) {
          this._updateAccounts("Creation", "Tithing Setting", {
            setting: budget.accounts.tithing.tithingSetting,
            amount: budget.accounts.tithing.amount
          });
        }

        this._updateAccounts("Creation", "Emergency Measurement", {
          setting: budget.accounts.emergencyFund.emergencyGoalMeasurement
        });

        if (this.accounts.emergencyFund.emergencyGoalMeasurement === "Length Of Time") {
          this._updateAccounts("Creation", "Emergency Goal", {
            goal: budget.accounts.emergencyFund.emergencyFundGoal,
            goalTiming: budget.accounts.emergencyFund.emergencyFundGoalTiming,
            amount: budget.accounts.emergencyFund.amount
          });
        }

        if (this.accounts.emergencyFund.emergencyGoalMeasurement === "Total Amount") {
          this._updateAccounts("Creation", "Emergency Goal", {
            goal: budget.accounts.emergencyFund.emergencyFundGoal,
            amount: budget.accounts.emergencyFund.amount
          });
        }

        this._updateAccounts("Creation", "Monthly Budget", {
          amount: budget.accounts.monthlyBudget.amount
        });

        this._updateAccounts("Creation", "Savings", {
          goal: budget.accounts.savingsFund.savingsGoal,
          percentage: budget.accounts.savingsFund.savingsPercentage,
          amount: budget.accounts.savingsFund.amount
        });

        this._updateAccounts("Creation", "Investment", {
          goal: budget.accounts.investmentFund.investmentGoal,
          percentage: budget.accounts.investmentFund.investmentPercentage,
          amount: budget.accounts.investmentFund.amount
        });

        this._updateAccounts("Creation", "Expense Fund", {
          amount: budget.accounts.expenseFund.amount
        });

        this._updateAccounts("Creation", "Surplus", {
          amount: budget.accounts.surplus.amount
        });

        this._updateAccounts("Creation", "Debt", {
          amount: budget.accounts.debt.amount,
          debtAmount: budget.accounts.debt.debtAmount
        });

        budget.mainCategories.forEach(function (mc) {
          var subCategories = [];
          mc.subCategories.forEach(function (sc) {
            subCategories.push({
              title: sc.title,
              timingOptions: sc.timingOptions,
              goalAmount: sc.goalAmount,
              amountSpent: sc.amountSpent,
              amountRemaining: sc.amountRemaining,
              percentageSpent: sc.percentageSpent,
              surplus: sc.surplus
            });
          });

          _this2.mainCategories.push({
            icon: mc.icon,
            title: mc.title,
            subCategories: subCategories
          });
        });
        this.transactions = budget.transactions;
        this.investments = budget.investments;
        this.debts = budget.debts;
        console.log(budget);
      }
    }
  }]);

  return Budget;
}();
var startToCreate = function startToCreate() {
  var budget = new Budget();

  budget._addAccounts();

  return budget;
};

/***/ }),

/***/ "./Public/JS/Create-Budget.js":
/*!************************************!*\
  !*** ./Public/JS/Create-Budget.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBudget": () => (/* binding */ createBudget)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Budget_Creation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Budget-Creation */ "./Public/JS/Budget-Creation.js");
/* harmony import */ var _Maintain_Budget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Maintain-Budget */ "./Public/JS/Maintain-Budget.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");





 //////////////////////
// CREATE BUDGET

var createBudget = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(budget, user) {
    var response1, response2, budgetId, response3;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(user);
            _context.prev = 1;
            _context.next = 4;
            return axios__WEBPACK_IMPORTED_MODULE_4___default()({
              method: "POST",
              url: "/App/Users/".concat(user._id, "/Budgets"),
              data: qs__WEBPACK_IMPORTED_MODULE_5___default().stringify({
                budget: budget
              })
            });

          case 4:
            response1 = _context.sent;

            if (!(response1.statusText === "Created")) {
              _context.next = 19;
              break;
            }

            console.log("Budget Created");
            console.log("Retrieving Budget...");
            _context.next = 10;
            return axios__WEBPACK_IMPORTED_MODULE_4___default()({
              method: "GET",
              url: "/App/Users/".concat(user._id, "/Budgets/RetrieveBudget/")
            });

          case 10:
            response2 = _context.sent;

            if (!(response2.statusText === "OK")) {
              _context.next = 19;
              break;
            }

            budgetId = response2.data.data.budget._id;
            _context.next = 15;
            return axios__WEBPACK_IMPORTED_MODULE_4___default()({
              method: "GET",
              url: "/App/Users/".concat(user._id, "/Budgets/").concat(budgetId, "/Dashboard"),
              data: qs__WEBPACK_IMPORTED_MODULE_5___default().stringify({
                budget: budget
              })
            });

          case 15:
            response3 = _context.sent;
            document.open("text/html").write(response3.data);
            window.location.assign("/App/Users/".concat(user._id, "/Budgets/").concat(budgetId, "/Dashboard"));

            _Maintain_Budget__WEBPACK_IMPORTED_MODULE_3__._watchBudget();

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 21]]);
  }));

  return function createBudget(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./Public/JS/FrontEnd-Calendar.js":
/*!****************************************!*\
  !*** ./Public/JS/FrontEnd-Calendar.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "myCalendar": () => (/* binding */ myCalendar)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");



var Calendar = /*#__PURE__*/function () {
  function Calendar() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Calendar);

    this.date = new Date();
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthIndex = this.date.getMonth();
    this.hours = this.date.getHours();
    this.day = this.date.getDay();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Calendar, [{
    key: "getMinutes",
    value: function getMinutes() {
      return this.date.getMinutes() < 10 ? "0".concat(this.date.getMinutes()) : this.date.getMinutes();
    }
  }, {
    key: "getHour",
    value: function getHour() {
      if (this.hours === 0 || this.hours === 24) return this.hours = 12;

      if (this.hours >= 13 && this.getMinutes() >= 0) {
        return this.hours = this.hours - 12;
      }

      return this.hours;
    }
  }, {
    key: "getTimeOfDay",
    value: function getTimeOfDay() {
      return this.date.getHours() < 12 ? this.timeOfDay = "AM" : this.timeOfDay = "PM";
    }
  }, {
    key: "getDay",
    value: function getDay() {
      return this.date.getDate();
    }
  }, {
    key: "getGreeting",
    value: function getGreeting() {
      if (this.hours < 12) {
        return this.greeting = "Good Morning";
      }

      if (this.hours >= 12 && this.hours < 18) {
        return this.greeting = "Good Afternoon";
      }

      if (this.hours >= 18) {
        return this.greeting = "Good Evening";
      }
    }
  }, {
    key: "getWeekday",
    value: function getWeekday() {
      return this.days[this.day];
    }
  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.months[this.monthIndex];
    }
  }, {
    key: "getMonthIndex",
    value: function getMonthIndex() {
      return this.date.getMonth();
    }
  }, {
    key: "getYear",
    value: function getYear() {
      return this.date.getFullYear();
    }
  }, {
    key: "monthRemaining",
    value: function monthRemaining() {
      var days;
      var currentMonth = this.getMonth();
      var currentDay = this.getDay();

      if (currentMonth === "January" || currentMonth === "March" || currentMonth === "May" || currentMonth === "July" || currentMonth === "August" || currentMonth === "October" || currentMonth === "December") {
        days = 31;
      }

      if (currentMonth === "April" || currentMonth === "June" || currentMonth === "September" || currentMonth === "November") {
        days = 30;
      }

      if (currentMonth === "February") {
        this.getYear() % 4 === 0 && !(this.getYear() % 100 === 0) || this.getYear() % 400 === 0 ? days = 29 : days = 28;
      }

      var remaining = days - currentDay;
      var percentage = remaining / days;
      var calculatedPercent = (100 * percentage).toFixed(0);
      return "".concat(calculatedPercent, "%");
    }
  }, {
    key: "goBackAMonth",
    value: function goBackAMonth(month, year, dayClass, currentDayClass, unusedDayClass) {
      var selectedMonth = this.months[month];
      this.makeCalendar(month, selectedMonth, year, dayClass, currentDayClass, unusedDayClass);
    }
  }, {
    key: "goForwardAMonth",
    value: function goForwardAMonth(month, year, dayClass, currentDayClass, unusedDayClass) {
      var selectedMonth = this.months[month];
      this.makeCalendar(month, selectedMonth, year, dayClass, currentDayClass, unusedDayClass);
    }
  }, {
    key: "_selectDay",
    value: function _selectDay(monthDays, singleDay) {
      monthDays.forEach(function (day, i) {
        day.classList.remove('bill-calendar__days__single-day--current-day');
      });
      singleDay.classList.add('bill-calendar__days__single-day--current-day');
    }
  }, {
    key: "_setupMonth",
    value: function _setupMonth(monthIndex, monthDays, year, dayClass, currentDayClass, unusedDayClass) {
      var _this = this;

      var dayStart = 1;
      var days = document.querySelectorAll(dayClass);
      var startDate = new Date(year, monthIndex, 1);
      var manipulatedDate = new Date(year, monthIndex, 1);
      var currentDate = new Date(year, monthIndex, this.getDay()); // currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

      var dayIndex = startDate.getDay();
      days.forEach(function (d) {
        return d.textContent = '';
      });

      if (dayStart && dayIndex || dayStart && dayIndex === 0) {
        while (dayStart <= monthDays) {
          if (dayStart === 1) {
            if (days[dayIndex]) {
              days[dayIndex].textContent = dayStart;
              dayStart++;
              dayIndex++;
            }
          }

          manipulatedDate = new Date(manipulatedDate.setDate(manipulatedDate.getDate() + 1));

          if (days[dayIndex]) {
            days[dayIndex].textContent = manipulatedDate.getDate();
          }

          dayStart++;
          dayIndex++;
        }
      }

      var currentDayIndex = currentDate.getDate();
      days.forEach(function (d, i) {
        d.classList.remove(currentDayClass);
        if (d.textContent === '') d.classList.add(unusedDayClass);

        if (d.textContent !== '') {
          if (d.classList.contains('un-used-day')) d.classList.remove('un-used-day'); // if (Number(d.textContent) === currentDayIndex - 1) {

          if (Number(d.textContent) === currentDayIndex) {
            d.classList.add(currentDayClass);
          }

          d.addEventListener('click', function (e) {
            _this._selectDay(days, d);
          });
        }
      });
    }
  }, {
    key: "_getDaysInMonth",
    value: function _getDaysInMonth(month, value, year) {
      if (month === "January" || month === "March" || month === "May" || month === "July" || month === "August" || month === "October" || month === "December") {
        value = 31;
      }

      if (month === "April" || month === "June" || month === "September" || month === "November") {
        value = 30;
      }

      if (month === "February") {
        year % 4 === 0 && !(year % 100 === 0) || year % 400 === 0 ? value = 29 : value = 28;
      }

      return value;
    }
  }, {
    key: "makeCalendar",
    value: function makeCalendar(monthIndex, month, year, dayClass, currentDayClass, unusedDayClass) {
      var daysInMonth;
      daysInMonth = this._getDaysInMonth(month, daysInMonth, year);
      var billMonth = document.querySelector('.bill-calendar__header__title');
      if (billMonth) billMonth.textContent = "".concat(month, " | ").concat(year);

      this._setupMonth(monthIndex, daysInMonth, year, dayClass, currentDayClass, unusedDayClass);
    }
  }]);

  return Calendar;
}();

var myCalendar = new Calendar(Date.now());

/***/ }),

/***/ "./Public/JS/Login.js":
/*!****************************!*\
  !*** ./Public/JS/Login.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");




var login = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(username, password) {
    var options, response1, user, _options, response2;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            options = {
              username: username,
              password: password
            };
            _context.next = 4;
            return axios__WEBPACK_IMPORTED_MODULE_2___default()({
              method: "POST",
              url: "/App/User",
              data: qs__WEBPACK_IMPORTED_MODULE_3___default().stringify(options)
            });

          case 4:
            response1 = _context.sent;

            if (!(response1.statusText === 'OK')) {
              _context.next = 13;
              break;
            }

            user = response1.data.data.user;
            console.log(user);
            _options = {
              username: username,
              password: password,
              id: user._id
            };
            _context.next = 11;
            return axios__WEBPACK_IMPORTED_MODULE_2___default()({
              method: "POST",
              url: "/App/Users/".concat(user._id),
              data: qs__WEBPACK_IMPORTED_MODULE_3___default().stringify(_options)
            });

          case 11:
            response2 = _context.sent;

            if (response2.statusText === 'OK') {
              document.open("text/html").write(response2.data);
              window.location.assign("/App/Users/".concat(user._id));
            }

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var logout = /*#__PURE__*/function () {
  var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(id) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_2___default()({
              method: 'GET',
              url: "/App/Users/".concat(id, "/Logout")
            });

          case 3:
            response = _context2.sent;
            console.log(response);

            if (response.data.status === 'Success') {
              window.location.assign("/App");
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function logout(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./Public/JS/Maintain-Budget.js":
/*!**************************************!*\
  !*** ./Public/JS/Maintain-Budget.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_watchBudget": () => (/* binding */ _watchBudget),
/* harmony export */   "_watchForMainCategorySelection": () => (/* binding */ _watchForMainCategorySelection),
/* harmony export */   "fillSubCategoryArray": () => (/* binding */ fillSubCategoryArray),
/* harmony export */   "reloadPage": () => (/* binding */ reloadPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Update_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Update-User */ "./Public/JS/Update-User.js");
/* harmony import */ var _FrontEnd_Calendar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FrontEnd-Calendar */ "./Public/JS/FrontEnd-Calendar.js");
/* harmony import */ var _Manage_Budget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Manage-Budget */ "./Public/JS/Manage-Budget.js");
/* harmony import */ var _Budget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Budget */ "./Public/JS/Budget.js");
/* harmony import */ var _Budget_Creation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Budget-Creation */ "./Public/JS/Budget-Creation.js");
/* harmony import */ var _Budget_Categories__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Budget-Categories */ "./Public/JS/Budget-Categories.js");
/* harmony import */ var _Transaction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Transaction */ "./Public/JS/Transaction.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");










 // Class of the 'days' on the Calendar.
// bill-calendar-container__calendar-container__calendar__days__single-day

var reloadPage = function reloadPage() {
  setTimeout(function () {
    window.location.reload();
  }, 2000);
};

var showElement = function showElement(element) {
  element.classList.toggle('closed');
  element.classList.toggle('open');
};

var _watchRecentTransactions = function _watchRecentTransactions(budget, placeholderBudget, user) {
  console.log("Listing Transactions");
  var receiptModal = document.querySelector('.modal--receipt');
  var receiptModalClosureIcon = document.querySelector('.modal--receipt__closure-icon');
  var viewReceiptButton = document.querySelector('.button--extra-extra-small__view-receipt');

  if (viewReceiptButton) {
    viewReceiptButton.addEventListener('click', function (e) {
      console.log(viewReceiptButton);
      showElement(receiptModal);
    });
    receiptModalClosureIcon.addEventListener('click', function (e) {
      showElement(receiptModal);
    });
  }
};

var payDebtOff = function payDebtOff(budget, placeholderBudget, user, debt, paidSections, sectionStart) {
  console.log("Paying Off...", debt);
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  sectionStart = 0;
  paidSections = 6;
  var debtDisplay = document.querySelectorAll('.debt-display--paid')[0];
  var upaidDebts = document.querySelectorAll('.debt');
  var paidDebts = document.querySelectorAll('.debt--paid');
  var paidDebt = document.createElement('section');
  paidDebt.classList.add('debt--paid');
  paidDebt.classList.add('r__debt--paid');
  paidDebt.dataset.debt = budget.debts.indexOf(debt);
  var updateObject = {
    budgetId: budget._id,
    userId: user._id,
    debts: budget.debts
  };

  if (paidDebts.length === 0) {
    debtDisplay.insertAdjacentElement('afterbegin', paidDebt);
  }

  if (paidDebts.length > 0) {
    paidDebts[paidDebts.length - 1].insertAdjacentElement('afterend', paidDebt);
  }

  while (sectionStart < paidSections) {
    var debtSection = document.createElement('section');
    debtSection.classList.add('form__section--debt-paid');
    debtSection.classList.add('r__form__section--debt-paid');
    insertElement(paidDebt, debtSection);
    console.log(debtDisplay, sectionStart);

    if (sectionStart === 0) {
      var sectionHeader = document.createElement('p');
      sectionHeader.classList.add('debt--paid-title');
      sectionHeader.classList.add('r__debt--paid-title');
      sectionHeader.textContent = "Date";
      var sectionContent = document.createElement('p');
      sectionContent.classList.add('debt--paid-text');
      sectionContent.classList.add('r__debt--paid-text');
      sectionContent.textContent = "".concat(new Date(debt.date).getDate(), " ").concat(months[new Date(debt.date).getMonth()], " ").concat(new Date(debt.date).getFullYear());
      insertElement(debtSection, sectionHeader);
      insertElement(debtSection, sectionContent);
    }

    if (sectionStart === 1) {
      var _sectionHeader = document.createElement('p');

      _sectionHeader.classList.add('debt--paid-title');

      _sectionHeader.classList.add('r__debt--paid-title');

      _sectionHeader.textContent = "Lender";

      var _sectionContent = document.createElement('p');

      _sectionContent.classList.add('debt--paid-text');

      _sectionContent.classList.add('r__debt--paid-text');

      _sectionContent.textContent = debt.lender;
      insertElement(debtSection, _sectionHeader);
      insertElement(debtSection, _sectionContent);
    }

    if (sectionStart === 2) {
      var _sectionHeader2 = document.createElement('p');

      _sectionHeader2.classList.add('debt--paid-title');

      _sectionHeader2.classList.add('r__debt--paid-title');

      _sectionHeader2.textContent = "Type";

      var _sectionContent2 = document.createElement('p');

      _sectionContent2.classList.add('debt--paid-text');

      _sectionContent2.classList.add('r__debt--paid-text');

      _sectionContent2.textContent = debt.debtType;
      insertElement(debtSection, _sectionHeader2);
      insertElement(debtSection, _sectionContent2);
    }

    if (sectionStart === 3) {
      var _sectionHeader3 = document.createElement('p');

      _sectionHeader3.classList.add('debt--paid-title');

      _sectionHeader3.classList.add('r__debt--paid-title');

      _sectionHeader3.textContent = "Initial Debt";

      var _sectionContent3 = document.createElement('p');

      _sectionContent3.classList.add('debt--paid-text');

      _sectionContent3.classList.add('r__debt--paid-text');

      _sectionContent3.textContent = money.format(Number(debt.initialDebt));
      insertElement(debtSection, _sectionHeader3);
      insertElement(debtSection, _sectionContent3);
    }

    if (sectionStart === 4) {
      var _sectionHeader4 = document.createElement('p');

      _sectionHeader4.classList.add('debt--paid-title');

      _sectionHeader4.classList.add('r__debt--paid-title');

      _sectionHeader4.textContent = "Amount Owed";

      var _sectionContent4 = document.createElement('p');

      _sectionContent4.classList.add('debt--paid-text');

      _sectionContent4.classList.add('r__debt--paid-text');

      _sectionContent4.textContent = money.format(Number(debt.amountOwed));
      insertElement(debtSection, _sectionHeader4);
      insertElement(debtSection, _sectionContent4);
    }

    if (sectionStart === 5) {
      var _sectionHeader5 = document.createElement('p');

      _sectionHeader5.classList.add('debt--paid-title');

      _sectionHeader5.classList.add('r__debt--paid-title');

      _sectionHeader5.textContent = "Status";

      var _sectionContent5 = document.createElement('p');

      _sectionContent5.classList.add('debt--paid-text');

      _sectionContent5.classList.add('r__debt--paid-text');

      _sectionContent5.textContent = "".concat(debt.status);
      insertElement(debtSection, _sectionHeader5);
      insertElement(debtSection, _sectionContent5);
    }

    sectionStart++;
  }

  updateObject.debts[budget.debts.indexOf(debt)].status = "Paid Off";
  updateObject.debts[budget.debts.indexOf(debt)].datePaid = new Date();

  placeholderBudget._updateBudget("Update", "Add Debt", {
    updateObject: updateObject
  }, "Debt-Manager");
};

var _watchDebtManager = function _watchDebtManager(budget, placeholderBudget, user) {
  console.log("Watching Your Debts...");
  var debtDisplay = document.querySelectorAll('.debt-display--paid');
  console.log(debtDisplay);
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var addDebtButton = document.getElementById('addDebtButton');
  var debtLender = document.getElementById('debtLender');
  var debtAmount = document.getElementById('debtAmount');
  var debtTypes = document.querySelectorAll('.form__select--accounts')[0];
  var debts = document.querySelectorAll('.debt');
  var numberOfUnpaidSections, numberOfPaidSections, sectionStart;
  var updateObject = {
    budgetId: budget._id,
    userId: user._id,
    debts: budget.debts
  };

  if (addDebtButton) {
    addDebtButton.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(debtLender.value, Number(debtAmount.value), debtTypes.value);
      var debtDisplay = document.querySelector('.debt-display');
      var debt = document.createElement('section');
      var debtObject = {};
      numberOfUnpaidSections = 7;
      numberOfPaidSections = 6;
      sectionStart = 0;
      debt.classList.add('debt');
      debt.classList.add('r__debt');
      debt.dataset.debt = budget.debts.length;

      if (_debts.length === 0) {
        debtDisplay.insertAdjacentElement('afterbegin', debt);
      }

      if (_debts.length > 0) {
        _debts[_debts.length - 1].insertAdjacentElement('afterend', debt);
      }

      while (sectionStart < numberOfUnpaidSections) {
        var debtSection = document.createElement('section');
        debtSection.classList.add('form__section--debt');
        debtSection.classList.add('r__form__section--debt');
        insertElement(debt, debtSection);

        if (sectionStart === 0) {
          var sectionHeader = document.createElement('p');
          sectionHeader.classList.add('debt-title');
          sectionHeader.classList.add('r__debt-title');
          sectionHeader.textContent = "Date";
          var sectionContent = document.createElement('p');
          sectionContent.classList.add('debt-text');
          sectionContent.classList.add('r__debt-text');
          sectionContent.textContent = "".concat(new Date().getDate(), " ").concat(months[new Date().getMonth()], " ").concat(new Date().getFullYear());
          debtObject.date = new Date();
          insertElement(debtSection, sectionHeader);
          insertElement(debtSection, sectionContent);
        }

        if (sectionStart === 1) {
          var _sectionHeader6 = document.createElement('p');

          _sectionHeader6.classList.add('debt-title');

          _sectionHeader6.classList.add('r__debt-title');

          _sectionHeader6.textContent = "Lender";

          var _sectionContent6 = document.createElement('p');

          _sectionContent6.classList.add('debt-text');

          _sectionContent6.classList.add('r__debt-text');

          _sectionContent6.textContent = debtLender.value;
          debtObject.lender = debtLender.value;
          insertElement(debtSection, _sectionHeader6);
          insertElement(debtSection, _sectionContent6);
        }

        if (sectionStart === 2) {
          var _sectionHeader7 = document.createElement('p');

          _sectionHeader7.classList.add('debt-title');

          _sectionHeader7.classList.add('r__debt-title');

          _sectionHeader7.textContent = "Type";

          var _sectionContent7 = document.createElement('p');

          _sectionContent7.classList.add('debt-text');

          _sectionContent7.classList.add('r__debt-text');

          _sectionContent7.textContent = debtTypes.value;
          debtObject.debtType = debtTypes.value;
          insertElement(debtSection, _sectionHeader7);
          insertElement(debtSection, _sectionContent7);
        }

        if (sectionStart === 3) {
          var _sectionHeader8 = document.createElement('p');

          _sectionHeader8.classList.add('debt-title');

          _sectionHeader8.classList.add('r__debt-title');

          _sectionHeader8.textContent = "Initial Debt";

          var _sectionContent8 = document.createElement('p');

          _sectionContent8.classList.add('debt-text');

          _sectionContent8.classList.add('r__debt-text');

          _sectionContent8.textContent = money.format(Number(debtAmount.value));
          debtObject.initialDebt = Number(debtAmount.value);
          insertElement(debtSection, _sectionHeader8);
          insertElement(debtSection, _sectionContent8);
        }

        if (sectionStart === 4) {
          var _sectionHeader9 = document.createElement('p');

          _sectionHeader9.classList.add('debt-title');

          _sectionHeader9.classList.add('r__debt-title');

          _sectionHeader9.textContent = "Amount Owed";

          var _sectionContent9 = document.createElement('p');

          _sectionContent9.classList.add('debt-text');

          _sectionContent9.classList.add('r__debt-text');

          _sectionContent9.textContent = money.format(Number(debtAmount.value));
          debtObject.amountOwed = debtObject.initialDebt;
          insertElement(debtSection, _sectionHeader9);
          insertElement(debtSection, _sectionContent9);
        }

        if (sectionStart === 5) {
          var _sectionHeader10 = document.createElement('p');

          _sectionHeader10.classList.add('debt-title');

          _sectionHeader10.classList.add('r__debt-title');

          _sectionHeader10.textContent = "Status";

          var _sectionContent10 = document.createElement('p');

          _sectionContent10.classList.add('debt-text');

          _sectionContent10.classList.add('r__debt-text');

          _sectionContent10.textContent = "Unpaid";
          debtObject.status = "Unpaid";
          insertElement(debtSection, _sectionHeader10);
          insertElement(debtSection, _sectionContent10);
        }

        if (sectionStart === 6) {
          var paidOffButton = document.createElement('button');
          paidOffButton.classList.add('button--extra-extra-small__transaction-plan');
          paidOffButton.classList.add('r__button--extra-extra-small__transaction-plan');
          var paidOffButtonIcon = document.createElement('i');
          paidOffButtonIcon.classList.add('fas');
          paidOffButtonIcon.classList.add('fa-handshake');
          paidOffButtonIcon.classList.add('button--extra-extra-small__transaction-plan__icon');
          paidOffButtonIcon.classList.add('r__button--extra-extra-small__transaction-plan__icon');
          var paidOffButtonText = document.createElement('p');
          paidOffButtonText.classList.add('button--extra-extra-small__transaction-plan__text');
          paidOffButtonText.classList.add('r__button--extra-extra-small__transaction-plan__text');
          paidOffButtonText.textContent = "Paid Off";
          insertElement(paidOffButton, paidOffButtonIcon);
          insertElement(paidOffButton, paidOffButtonText);
          insertElement(debtSection, paidOffButton); // paidOffButton.addEventListener('click', (e) => {
          //   e.preventDefault();
          //   payDebtOff(budget, placeholderBudget, user, debtObject, numberOfPaidSections, sectionStart);
          // });
        }

        sectionStart++;
      }

      updateObject.debts.push(debtObject);
      console.log(updateObject);

      placeholderBudget._updateBudget("Update", "Add Debt", {
        updateObject: updateObject
      }, "Debt-Manager");

      reloadPage();
    });
    var debtPayOffButtons = document.querySelectorAll('.button--extra-extra-small__debt-transaction-plan');

    var _debts = document.querySelectorAll('.debt');

    debtPayOffButtons.forEach(function (button, i) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        numberOfPaidSections = 6;
        sectionStart = 0;
        payDebtOff(budget, placeholderBudget, user, budget.debts[_debts[i].dataset.debt], numberOfPaidSections, sectionStart);

        _debts[i].remove();
      });
    });
    console.log(debtPayOffButtons);
  }
};

var settleInvestment = function settleInvestment(investments, index, dataIndex, budget, placeholderBudget, user) {
  console.log(investments, index);
  var investmentContainers = document.querySelectorAll('.investment-container');
  console.log(investmentContainers);
  var settledInvestmentShellContainer = document.createElement('section');
  settledInvestmentShellContainer.classList.add('container--extra-small__margin-left-and-right');
  settledInvestmentShellContainer.classList.add('r__container--extra-small__margin-left-and-right');
  insertElement(investmentContainers[1], settledInvestmentShellContainer);
  var settledInvestmentContainerHeader = document.createElement('section');
  settledInvestmentContainerHeader.classList.add('container--extra-small__margin-left-and-right__header');
  settledInvestmentContainerHeader.classList.add('r__container--extra-small__margin-left-and-right__header');
  insertElement(settledInvestmentShellContainer, settledInvestmentContainerHeader);
  var investmentTypeIcons = ["arrow-trend-up", "sign-hanging", "calendar-clock", "asterisk"];
  var investmentHeaderIcon = document.createElement('i');
  investmentHeaderIcon.classList.add("fas");
  investmentHeaderIcon.classList.add('container--extra-small__margin-left-and-right__header__icon');
  investmentHeaderIcon.classList.add('r__container--extra-small__margin-left-and-right__header__icon');

  if (investments[index].firstChild.firstChild) {
    if (investments[index].firstChild.firstChild.classList.contains("fa-chart-line")) {
      investmentHeaderIcon.classList.add("fa-chart-line");
    }

    if (investments[index].firstChild.firstChild.classList.contains('fa-sign-hanging')) {
      investmentHeaderIcon.classList.add("fa-sign-hanging");
    }

    if (investments[index].firstChild.firstChild.classList.contains('fa-clock')) {
      investmentHeaderIcon.classList.add("fa-clock");
    }

    if (investments[index].firstChild.firstChild.classList.contains('fa-asterisk')) {
      investmentHeaderIcon.classList.add("fa-asterisk");
    }

    insertElement(settledInvestmentContainerHeader, investmentHeaderIcon);
    var investmentHeaderText = document.createElement('p');
    investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.textContent = investments[index].firstChild.firstChild.nextSibling.textContent;
    insertElement(settledInvestmentContainerHeader, investmentHeaderText); // CREATE INVESTMENT CONTENT

    var investmentContent = document.createElement('section');
    investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');
    investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');
    insertElement(settledInvestmentShellContainer, investmentContent); // CREATE INVESTMENT EXPLANATORY CONTENT

    var investmentExplanationSection = document.createElement('section');
    investmentExplanationSection.classList.add('investment-explanatory-information');
    investmentExplanationSection.classList.add('r__investment-explanatory-information');
    insertElement(investmentContent, investmentExplanationSection);
    var investmentDescription = document.createElement('section');
    investmentDescription.classList.add('investment-description');
    investmentDescription.classList.add('r__investment-description');
    insertElement(investmentExplanationSection, investmentDescription);
    var investmentDescriptionText = document.createElement('p');
    investmentDescriptionText.classList.add('investment-description__text');
    investmentDescriptionText.classList.add('r__investment-description__text');
    investmentDescriptionText.textContent = investments[index].firstChild.nextSibling.firstChild.firstChild.firstChild.textContent;
    var settledInvestmentValueContainer = document.createElement('section');
    settledInvestmentValueContainer.classList.add('investment-value-information--settled');
    settledInvestmentValueContainer.classList.add('r__investment-value-information--settled');
    insertElement(investmentContent, settledInvestmentValueContainer);
    var settledValueContainerText = document.createElement('p');
    settledValueContainerText.classList.add('investment-value-information--settled__text');
    settledValueContainerText.classList.add('r__investment-value-information--settled__text');
    console.log(investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling, investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild);

    if (budget.investments[dataIndex].valueDifference < 0) {
      settledValueContainerText.textContent = "Lost ".concat(Number(budget.investments[dataIndex].initialInvestment - budget.investments[dataIndex].currentValue));
      settledInvestmentShellContainer.classList.add('negative-investment');
    }

    if (budget.investments[dataIndex].valueDifference === 0) {
      settledValueContainerText.textContent = "Broke Even";
      settledInvestmentShellContainer.classList.add('neutral-investment');
    }

    if (budget.investments[dataIndex].valueDifference > 0) {
      settledValueContainerText.textContent = "Gained ".concat(Number(budget.investments[dataIndex].currentValue - budget.investments[dataIndex].initialInvestment));
      settledInvestmentShellContainer.classList.add('positive-investment');
    }

    var investmentInitialValue = Number(investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.nextSibling.textContent.split('$')[1]);
    console.log(investmentInitialValue);
    insertElement(settledInvestmentValueContainer, settledValueContainerText);
  }

  if (!investments[index].firstChild.firstChild) {
    console.log(investments[index].firstChild.nextSibling.firstChild);

    if (investments[index].firstChild.nextSibling.firstChild.classList.contains("fa-chart-line")) {
      investmentHeaderIcon.classList.add("fa-chart-line");
    }

    if (investments[index].firstChild.nextSibling.firstChild.classList.contains('fa-sign-hanging')) {
      investmentHeaderIcon.classList.add("fa-sign-hanging");
    }

    if (investments[index].firstChild.nextSibling.firstChild.classList.contains('fa-clock')) {
      investmentHeaderIcon.classList.add("fa-clock");
    }

    if (investments[index].firstChild.nextSibling.firstChild.classList.contains('fa-asterisk')) {
      investmentHeaderIcon.classList.add("fa-asterisk");
    }

    insertElement(settledInvestmentContainerHeader, investmentHeaderIcon);

    var _investmentHeaderText = document.createElement('p');

    _investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');

    _investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');

    _investmentHeaderText.textContent = investments[index].firstChild.nextSibling.firstChild.nextSibling.textContent;
    insertElement(settledInvestmentContainerHeader, _investmentHeaderText); // CREATE INVESTMENT CONTENT

    var _investmentContent = document.createElement('section');

    _investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');

    _investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');

    insertElement(settledInvestmentShellContainer, _investmentContent); // CREATE INVESTMENT EXPLANATORY CONTENT

    var _investmentExplanationSection = document.createElement('section');

    _investmentExplanationSection.classList.add('investment-explanatory-information');

    _investmentExplanationSection.classList.add('r__investment-explanatory-information');

    insertElement(_investmentContent, _investmentExplanationSection);

    var _investmentDescription = document.createElement('section');

    _investmentDescription.classList.add('investment-description');

    _investmentDescription.classList.add('r__investment-description');

    insertElement(_investmentExplanationSection, _investmentDescription);

    var _investmentDescriptionText = document.createElement('p');

    _investmentDescriptionText.classList.add('investment-description__text');

    _investmentDescriptionText.classList.add('r__investment-description__text');

    console.log(investments[index].firstChild.nextSibling.nextSibling.firstChild.firstChild.textContent);
    _investmentDescriptionText.textContent = investments[index].firstChild.nextSibling.nextSibling.firstChild.firstChild.textContent;
    insertElement(_investmentDescription, _investmentDescriptionText);

    var _settledInvestmentValueContainer = document.createElement('section');

    _settledInvestmentValueContainer.classList.add('investment-value-information--settled');

    _settledInvestmentValueContainer.classList.add('r__investment-value-information--settled');

    insertElement(_investmentContent, _settledInvestmentValueContainer);

    var _settledValueContainerText = document.createElement('p');

    _settledValueContainerText.classList.add('investment-value-information--settled__text');

    _settledValueContainerText.classList.add('r__investment-value-information--settled__text');

    console.log(investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling, investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild);

    if (budget.investments[index - 1].valueDifference < 0) {
      _settledValueContainerText.textContent = "Lost ".concat(Number(budget.investments[index - 1].initialInvestment - budget.investments[index - 1].currentValue));
      settledInvestmentShellContainer.classList.add('negative-investment');
    }

    if (budget.investments[index - 1].valueDifference === 0) {
      _settledValueContainerText.textContent = "Broke Even";
      settledInvestmentShellContainer.classList.add('neutral-investment');
    }

    if (budget.investments[index - 1].valueDifference > 0) {
      _settledValueContainerText.textContent = "Gained ".concat(Number(budget.investments[index - 1].currentValue - budget.investments[index - 1].initialInvestment));
      settledInvestmentShellContainer.classList.add('positive-investment');
    }

    var _investmentInitialValue = Number(investments[index].firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.firstChild.nextSibling.textContent.split('$')[1]);

    console.log(_investmentInitialValue);
    insertElement(_settledInvestmentValueContainer, _settledValueContainerText);
  }

  console.log(index, index - 1);
  budget.investments[dataIndex].settled = !budget.investments[dataIndex].settled;
  console.log(budget.investments[index].settled);

  placeholderBudget._updateBudget("Update", "Settle Investment", {
    updateObject: {
      budgetId: budget._id,
      userId: user._id,
      investments: budget.investments
    }
  }, "Investment-Planner");

  investments[index].remove();
  window.location.reload();
};

var watchInvestmentValueConfirmationButtons = function watchInvestmentValueConfirmationButtons(event, index, secondaryIndex, budget, placeholderBudget, user) {
  // const e = event;
  // e.preventDefault();
  var confirmInvestmentValueButtons = document.querySelectorAll('.button--confirm-value'); // const clicked = e.target.closest('.button--confirm-value');
  // let index = [...confirmInvestmentValueButtons].indexOf(clicked);

  console.log(index);
  var investments = budget.investments;
  console.log(investments[index]);
  confirmInvestmentValueButtons[index].removeEventListener('click', watchInvestmentValueConfirmationButtons);
  var updateCurrentValueInput = document.querySelectorAll('.form__input--investment');
  console.log(Number(updateCurrentValueInput[index].value));
  investments[secondaryIndex].currentValue = Number(updateCurrentValueInput[index].value);
  investments[secondaryIndex].valueDifference = Number(investments[secondaryIndex].currentValue - investments[secondaryIndex].initialInvestment);
  updateCurrentValueInput[index].setAttribute("readonly", true);
  console.log(investments[secondaryIndex]);

  placeholderBudget._updateBudget('Update', "Update Investment", {
    updateObject: {
      budgetId: budget._id,
      userId: user._id,
      investments: investments
    }
  }, "Investment-Planner");
};

var _watchForCurrentValueUpdate = function _watchForCurrentValueUpdate(event, index, secondaryIndex, budget, placeholderBudget, user) {
  var updateCurrentValueInput = document.querySelectorAll('.form__input--investment');
  console.log(index);

  if (updateCurrentValueInput[index].readOnly === true) {
    updateCurrentValueInput[index].removeAttribute("readonly");
    console.log(updateCurrentValueInput[index].readOnly);
    var confirmInvestmentValueButtons = document.querySelectorAll('.button--confirm-value');
    console.log(confirmInvestmentValueButtons[index]);
    return confirmInvestmentValueButtons[index].addEventListener('click', watchInvestmentValueConfirmationButtons.bind(null, event, index, secondaryIndex, budget, placeholderBudget, user));
  }

  console.log(updateCurrentValueInput[index].readOnly);

  if (updateCurrentValueInput[index].readOnly === '' || updateCurrentValueInput[index].readOnly === false) {
    return updateCurrentValueInput[index].setAttribute("readonly", true);
  }

  console.log("I want to update.");
  console.log(index);
};

var closeInvestmentCreation = function closeInvestmentCreation(event) {
  var closeInvestmentCreationButton = document.querySelector('.button--borderless-narrow__investment');
  var addInvestmentButton = document.querySelector('.container--extra-small__margin-left-and-right__content-icon');
  var addInvestmentForm = document.querySelector('.form--extra-small__column');
  closeInvestmentCreationButton.removeEventListener("click", closeInvestmentCreation);
  replaceClassName(closeInvestmentCreationButton, "open", "closed");
  replaceClassName(addInvestmentForm, "open", "closed");
  replaceClassName(addInvestmentButton, "closed", "open");
};

var addInvestment = function addInvestment(options) {
  console.log(options);
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  var investmentContainers = document.querySelectorAll('.container--extra-small__margin-left-and-right');
  var investmentAccountPreview = investmentContainers[0];
  console.log(investmentContainers);
  var investmentShellContainer = document.createElement('section');
  investmentShellContainer.classList.add('container--extra-small__margin-left-and-right');
  investmentShellContainer.classList.add('r__container--extra-small__margin-left-and-right');
  investmentShellContainer.dataset.investment = options.budget.investments.length;
  console.log(investmentShellContainer.dataset.investment);
  investmentAccountPreview.insertAdjacentElement('afterend', investmentShellContainer);
  var investmentHeader = document.createElement('section');
  investmentHeader.classList.add('container--extra-small__margin-left-and-right__header');
  investmentHeader.classList.add('r__container--extra-small__margin-left-and-right__header');
  insertElement(investmentShellContainer, investmentHeader); // Set Appropriate Icons For Investment Type
  // In order: Stock, Real Estate, Timeshare, Other

  var investmentTypeIcons = ["arrow-trend-up", "sign-hanging", "calendar-clock", "asterisk"];
  var investmentHeaderIcon = document.createElement('i');
  investmentHeaderIcon.classList.add("fas");
  investmentHeaderIcon.classList.add('container--extra-small__margin-left-and-right__header__icon');
  investmentHeaderIcon.classList.add('r__container--extra-small__margin-left-and-right__header__icon');

  if (options.type === "Stock") {
    investmentHeaderIcon.classList.add("fa-chart-line");
  }

  if (options.type === "Real Estate") {
    investmentHeaderIcon.classList.add("fa-sign-hanging");
  }

  if (options.type === "Timeshare") {
    investmentHeaderIcon.classList.add("fa-clock");
  }

  if (options.type === "Other") {
    investmentHeaderIcon.classList.add("fa-asterisk");
  }

  insertElement(investmentHeader, investmentHeaderIcon);
  var investmentHeaderText = document.createElement('p');
  investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');
  investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');
  investmentHeaderText.textContent = options.name;
  insertElement(investmentHeader, investmentHeaderText);
  var investmentHeaderType = document.createElement('p');
  investmentHeaderType.classList.add('container--extra-small__margin-left-and-right__header__investment-type');
  investmentHeaderType.classList.add('r__container--extra-small__margin-left-and-right__header__investment-type');
  investmentHeaderType.textContent = options.type;
  insertElement(investmentHeader, investmentHeaderType); // CREATE INVESTMENT CONTENT

  var investmentContent = document.createElement('section');
  investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');
  investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');
  insertElement(investmentShellContainer, investmentContent); // CREATE INVESTMENT EXPLANATORY CONTENT

  var investmentExplanationSection = document.createElement('section');
  investmentExplanationSection.classList.add('investment-explanatory-information');
  investmentExplanationSection.classList.add('r__investment-explanatory-information');
  insertElement(investmentContent, investmentExplanationSection);
  var investmentDescription = document.createElement('section');
  investmentDescription.classList.add('investment-description');
  investmentDescription.classList.add('r__investment-description');
  insertElement(investmentExplanationSection, investmentDescription);
  var investmentDescriptionText = document.createElement('p');
  investmentDescriptionText.classList.add('investment-description__text');
  investmentDescriptionText.classList.add('r__investment-description__text');
  investmentDescriptionText.textContent = options.description;
  insertElement(investmentDescription, investmentDescriptionText);
  var investmentSettleContainer = document.createElement('section');
  investmentSettleContainer.classList.add('investment-settle-container');
  investmentSettleContainer.classList.add('r__investment-settle-container');
  insertElement(investmentExplanationSection, investmentSettleContainer);
  var investmentSettleButton = document.createElement('button');
  investmentSettleButton.classList.add('button--settle');
  investmentSettleButton.classList.add('r__button--settle');
  insertElement(investmentSettleContainer, investmentSettleButton);
  var investmentSettleButtonText = document.createElement('p');
  investmentSettleButtonText.classList.add('button--settle__text');
  investmentSettleButtonText.classList.add('r__button--settle__text');
  investmentSettleButtonText.textContent = "Settle";
  investmentSettleButton.addEventListener('click', function (e) {
    e.preventDefault();
    var clicked = e.target;
    var investmentShellContainers = document.querySelectorAll('.container--extra-small__margin-left-and-right');

    var currentInvestmentIndex = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(investmentShellContainers).indexOf(clicked.closest('.container--extra-small__margin-left-and-right'));

    settleInvestment(investmentShellContainers, currentInvestmentIndex, Number(investmentShellContainers[currentInvestmentIndex].dataset.investment), options.budget, options.placeholderBudget, options.user);
  });
  insertElement(investmentSettleButton, investmentSettleButtonText);
  var investmentValueInformationContainer = document.createElement('section');
  investmentValueInformationContainer.classList.add('investment-value-information');
  investmentValueInformationContainer.classList.add('r__investment-value-information');
  insertElement(investmentContent, investmentValueInformationContainer);
  var investmentValueInformationContainerHalfOne = document.createElement('section');
  var investmentValueInformationContainerHalfTwo = document.createElement('section');
  investmentValueInformationContainerHalfOne.classList.add('investment-value-information__half');
  investmentValueInformationContainerHalfOne.classList.add('r__investment-value-information__half');
  investmentValueInformationContainerHalfTwo.classList.add('investment-value-information__half');
  investmentValueInformationContainerHalfTwo.classList.add('r__investment-value-information__half');
  insertElement(investmentValueInformationContainer, investmentValueInformationContainerHalfOne);
  insertElement(investmentValueInformationContainer, investmentValueInformationContainerHalfTwo);
  var investmentValueInformationContainerHalfOneHeader = document.createElement('p');
  var investmentValueInformationContainerHalfTwoHeader = document.createElement('p');
  investmentValueInformationContainerHalfOneHeader.classList.add('investment-value-information__half__header');
  investmentValueInformationContainerHalfTwoHeader.classList.add('investment-value-information__half__header');
  investmentValueInformationContainerHalfOneHeader.classList.add('r__investment-value-information__half__header');
  investmentValueInformationContainerHalfTwoHeader.classList.add('r__investment-value-information__half__header');
  investmentValueInformationContainerHalfOneHeader.textContent = "Initial Investment";
  investmentValueInformationContainerHalfTwoHeader.textContent = "Current Value";
  insertElement(investmentValueInformationContainerHalfOne, investmentValueInformationContainerHalfOneHeader);
  insertElement(investmentValueInformationContainerHalfTwo, investmentValueInformationContainerHalfTwoHeader);
  var investmentValueInformationContainerHalfOneText = document.createElement('p');
  investmentValueInformationContainerHalfOneText.classList.add('investment-value-information__half__text');
  investmentValueInformationContainerHalfOneText.classList.add('r__investment-value-information__half__text');
  investmentValueInformationContainerHalfOneText.textContent = money.format(options.initialInvestment);
  insertElement(investmentValueInformationContainerHalfOne, investmentValueInformationContainerHalfOneText);
  var investmentInputContainer = document.createElement('section');
  investmentInputContainer.classList.add('investment-input-container');
  investmentInputContainer.classList.add('r__investment-input-container');
  insertElement(investmentValueInformationContainerHalfTwo, investmentInputContainer);
  var investmentInput = document.createElement('input');
  investmentInput.classList.add('form__input--investment');
  investmentInput.classList.add('r__form__input--investment');
  investmentInput.type = "number";
  investmentInput.placeholder = "Enter New Value";
  investmentInput.readOnly = true;
  insertElement(investmentInputContainer, investmentInput);
  var investmentValueConfirmationButton = document.createElement('button');
  investmentValueConfirmationButton.classList.add('button--confirm-value');
  investmentValueConfirmationButton.classList.add('r__button--confirm-value');
  var investmentValueConfirmationButtonIcon = document.createElement('i');
  investmentValueConfirmationButtonIcon.classList.add('fas');
  investmentValueConfirmationButtonIcon.classList.add('fa-check');
  investmentValueConfirmationButtonIcon.classList.add('button--confirm-value__icon');
  investmentValueConfirmationButtonIcon.classList.add('r__button--confirm-value__icon');
  insertElement(investmentValueConfirmationButton, investmentValueConfirmationButtonIcon);
  insertElement(investmentInputContainer, investmentValueConfirmationButton);
  var investmentUpdateValueTextLink = document.createElement('p');
  investmentUpdateValueTextLink.classList.add('investment-value-information__half__update-text');
  investmentUpdateValueTextLink.classList.add('r__investment-value-information__half__update-text');
  investmentUpdateValueTextLink.textContent = "Update Value";
  insertElement(investmentValueInformationContainerHalfTwo, investmentUpdateValueTextLink); // window.location.reload();
  // GLITCH: RIGHT NOW, WHAT HAPPENS IS THAT UNLESS THE USER REFRESHES THE BROWSER, THEY CANNOT UPDATE THE NEWEST OR NEWLY CREATED INVESTMENTS.
  // Right now, I am forcing the reload of the page to solve the issue for now.  However, I would like to not have to do that.
  // if (openUpdateCurrentValueButtons[0]) {
  //   openUpdateCurrentValueButtons.forEach((button, i) => {
  //     if (i === openUpdateCurrentValueButtons.length - 1) {
  //       let index = i;
  //       let boundListener = _watchForCurrentValueUpdate.bind(null, event, index, options.budget, options.placeholderBudget, options.user);
  //       button.removeEventListener('click', boundListener);
  //       const openUpdateCurrentValueButtons = document.querySelectorAll('.investment-value-information__half__update-text');
  //     }
  //   });
  //   openUpdateCurrentValueButtons.forEach((button, i) => {
  //     let index = i;
  //     if (i === openUpdateCurrentValueButtons.length - 1) {
  //       let boundListener = _watchForCurrentValueUpdate.bind(null, event, index, options.budget, options.placeholderBudget, options.user);
  //       console.log(button, openUpdateCurrentValueButtons);
  //       button.addEventListener('click', boundListener);
  //     }
  //   });
  // }
};

var _watchInvestmentPlanner = function _watchInvestmentPlanner(budget, placeholderBudget, user) {
  // const longFormSections = document.querySelectorAll('.form__section--long');
  // if (longFormSections[0] && longFormSections[0].classList.contains('closed')) {
  //   console.log(longFormSections[0]);
  // replaceClassName(longFormSections[0], `closed`, `open`);
  var addInvestmentButton = document.querySelector('.container--extra-small__margin-left-and-right__content-icon');
  var closeInvestmentCreationButton = document.querySelector('.button--borderless-narrow__investment');
  var addInvestmentForm = document.querySelector('.form--extra-small__column');

  if (addInvestmentButton) {
    addInvestmentButton.addEventListener('click', function (e) {
      closeInvestmentCreationButton.classList.toggle('open');
      closeInvestmentCreationButton.classList.toggle('closed');
      replaceClassName(addInvestmentForm, "closed", "open");
      replaceClassName(addInvestmentButton, "open", "closed");
      closeInvestmentCreationButton.addEventListener('click', closeInvestmentCreation);
    });
    var investmentType = document.querySelector('.form__select--accounts-short');
    var investmentName = document.getElementById('investmentName');
    var investmentDescription = document.getElementById('investmentDescription');
    var initialInvestment = document.getElementById('initialInvestment');
    var createInvestmentButton = document.querySelector('.button--extra-extra-small__alt');
    createInvestmentButton.addEventListener('click', function (e) {
      e.preventDefault();
      addInvestment({
        type: investmentType.value,
        name: investmentName.value,
        description: investmentDescription.value,
        initialInvestment: Number(initialInvestment.value),
        budget: budget,
        placeholderBudget: placeholderBudget,
        user: user
      });

      placeholderBudget._updateBudget("Update", "Add Investment", {
        updateObject: {
          budgetId: budget._id,
          userId: user._id,
          investments: placeholderBudget.investments
        }
      }, "Investment-Planner");
    });
  }

  var investmentContainers = document.querySelectorAll('.container--extra-small__margin-left-and-right');
  var investmentValueInformationContainers = document.querySelectorAll('.investment-value-information');
  var investmentSettleButtons = document.querySelectorAll('.button--settle');
  investmentSettleButtons.forEach(function (button, i) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      var clicked = e.target;

      var currentInvestmentIndex = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(investmentContainers).indexOf(clicked.closest('.container--extra-small__margin-left-and-right'));

      console.log(currentInvestmentIndex, investmentContainers[currentInvestmentIndex].dataset.investment);
      settleInvestment(investmentContainers, currentInvestmentIndex, Number(investmentContainers[currentInvestmentIndex].dataset.investment), budget, placeholderBudget, user);
    });
  });
  console.log(investmentValueInformationContainers, investmentContainers);
  var openUpdateCurrentValueButtons = document.querySelectorAll('.investment-value-information__half__update-text');

  if (openUpdateCurrentValueButtons[0]) {
    openUpdateCurrentValueButtons.forEach(function (button, i) {
      var index = Number(openUpdateCurrentValueButtons[i].closest('.container--extra-small__margin-left-and-right').dataset.investment);

      var boundListener = _watchForCurrentValueUpdate.bind(null, event, i, index, budget, placeholderBudget, user); // button.removeEventListener(`click`, boundListener);


      button.addEventListener('click', boundListener); // addEventListener('click', myPrettyHandler.bind(null, event, arg1, ... ));
    });
  }
};

var _watchCategoryForSelection = function _watchCategoryForSelection() {
  var e = event;
  e.preventDefault();
  var mainCategories = document.querySelectorAll('.main-category__alt');
  var mainCategoryIcon = document.querySelector('.main-category-display__category-information__icon');
  var mainCategoryText = document.querySelector('.main-category-display__category-information__text');
  var clicked = e.target;
  mainCategories.forEach(function (mc) {
    if (mc.firstChild.nodeName === '#text') mc.removeChild(mc.firstChild);
  });
  var icon = clicked.closest('section').firstChild;
  mainCategoryIcon.classList.remove(mainCategoryIcon.classList[3]);
  mainCategoryIcon.classList.add(icon.classList[1]);
  mainCategoryText.textContent = icon.nextSibling.textContent;
  var index = clicked.closest('section').dataset.category;
  var subCategories = document.querySelectorAll('.sub-category');
  subCategories.forEach(function (sc, i) {
    sc.classList.add('closed');
    sc.classList.remove('open');

    if (sc.dataset.category === "".concat(index)) {
      sc.classList.remove('closed');
      sc.classList.add('open');
    }
  });
};

var _watchForMainCategorySelection = function _watchForMainCategorySelection() {
  var mainCategories = document.querySelectorAll('.main-category__alt');
  var mainCategoryIcon = document.querySelector('.main-category-display__category-information__icon');
  var mainCategoryText = document.querySelector('.main-category-display__category-information__text');
  mainCategories.forEach(function (mc) {
    mc.removeEventListener("click", _watchCategoryForSelection);
    mc.addEventListener('click', _watchCategoryForSelection);
  });
};

var watchForBudgetDeletion = function watchForBudgetDeletion() {
  var budgetDeleteButton = document.querySelectorAll(".button--extra-extra-small__wide")[1];
  var budgetId = window.location.pathname.split('/')[5];
  var userId = window.location.pathname.split('/')[3];
  budgetDeleteButton.addEventListener('click', function (e) {
    e.preventDefault();
    _Manage_Budget__WEBPACK_IMPORTED_MODULE_6__.deleteMyBudget(budgetId, userId);
  });
};

var watchForBudgetExit = function watchForBudgetExit() {
  var submitButtons = document.querySelectorAll(".button--extra-extra-small__wide");
  var exitButton = document.querySelectorAll(".button--extra-extra-small__wide")[0];
  var userId = window.location.pathname.split('/')[3];
  exitButton.addEventListener('click', function (e) {
    e.preventDefault();
    _Manage_Budget__WEBPACK_IMPORTED_MODULE_6__.exitBudget(userId);
  });
};

var setMainCategoryTitle = function setMainCategoryTitle(mainCategory, title) {
  return mainCategory.title = title;
};

var fillSubCategoryArray = function fillSubCategoryArray(updateObject, index) {
  var mainCategoryIndex = index;
  var tempArray = Array.from(document.querySelectorAll(".sub-category-display__sub-category[data-subcategory=\"".concat(index, "\"]")));
  tempArray.forEach(function (temp, i) {
    var title = temp.firstChild.nextSibling.firstChild.textContent;
    var goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
    var amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
    var amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
    var percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
    updateObject.mainCategories[index].subCategories.push(Object.fromEntries([["title", title], ["goalAmount", goalAmount], ["amountSpent", amountSpent], ["amountRemaining", amountRemaining], ["percentageSpent", percentageSpent]]));
    if (updateObject.mainCategories[mainCategoryIndex] === undefined) return;

    if (updateObject.mainCategories[mainCategoryIndex].subCategories.length === tempArray.length) {
      mainCategoryIndex++;
      updateObject.mainCategories[mainCategoryIndex].subCategories = [];
      return mainCategoryIndex;
    }

    if (index === tempArray.length) {
      mainCategoryIndex++;
    }
  });
};

var buildUpdateObject = function buildUpdateObject(budget, user, customObject, budgetName, customProperties, objects) {
  var budgetUpdateObject = {
    budgetId: budget._id,
    userId: user._id
  };

  if (customObject === "Accounts") {
    budgetUpdateObject.name = budgetName;
    budgetUpdateObject.accounts = {};
    customProperties.forEach(function (c, i) {
      budgetUpdateObject.accounts[c] = objects[i];
    });
  }

  if (customObject === "Main Categories") {
    // budget.mainCategories would be the Custom Properties
    var subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    var mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
    var mainCategoryObject = {};
    var subCategoryObject = {};
    var emptyArray = [];
    budgetUpdateObject.mainCategories = [];
    var mainCategoryIndex = 0;
    var subCategoryIndex = 0;
    var entries = [];
    var subCategoriesSplitArray = [];
    var subCategorySubArray = []; // EVERYTHING DONE IN THIS 'FOREACH' IS DONE 3 TIMES!!!

    customProperties.forEach(function (cp, i) {
      budgetUpdateObject.mainCategories.push(Object.fromEntries([["title", mainCategoryTitles[i].textContent], ["subCategories", emptyArray]]));

      if (budgetUpdateObject.mainCategories.length === customProperties.length) {
        return mainCategoryIndex = 0;
      }
    });
    budgetUpdateObject.mainCategories.forEach(function (mc, i) {
      fillSubCategoryArray(budgetUpdateObject, i);
    });
  }

  return budgetUpdateObject;
};

var getSubCategoryTiming = function getSubCategoryTiming(budget, category) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var wording;

  if (category.timingOptions.paymentCycle === "Weekly") {
    var day = days[new Date("".concat(category.timingOptions.dueDates[0])).getDay()];
    wording = "Due every ".concat(day, " of the month.");
    return wording;
  }

  if (category.timingOptions.paymentCycle === "Bi-Weekly") {
    var date = new Date("".concat(category.timingOptions.dueDates[0]));

    var _day = date.getDate();

    var endDigit = Number(date.getDate().toString().split('')[date.getDate().toString().length - 1]);
    var dayEnding;
    dayEnding = _Budget_Creation__WEBPACK_IMPORTED_MODULE_8__.calculateDayEnding(endDigit, dayEnding, date);
    wording = "Due ".concat(days[date.getDay()], ", the ").concat(_day).concat(dayEnding, " of ").concat(months[date.getMonth()], ".");
    return wording;
  }

  if (category.timingOptions.paymentCycle === "Bi-Monthly") {
    var dayOne, dayTwo, _dayEnding, dayEndingTwo;

    category.timingOptions.dueDates[0].forEach(function (dd, i) {
      if (i === 0) {
        dayOne = new Date("".concat(dd));
      }

      if (i === 1) {
        dayTwo = new Date("".concat(dd));
      }
    });

    var _endDigit = Number(dayOne.getDate().toString().split('')[dayOne.getDate().toString().length - 1]);

    var endDigitTwo = Number(dayTwo.getDate().toString().split('')[dayTwo.getDate().toString().length - 1]);
    _dayEnding = _Budget_Creation__WEBPACK_IMPORTED_MODULE_8__.calculateDayEnding(_endDigit, _dayEnding, dayOne.getDate());
    dayEndingTwo = _Budget_Creation__WEBPACK_IMPORTED_MODULE_8__.calculateDayEnding(_endDigit, dayEndingTwo, dayTwo.getDate());
    wording = "Due the ".concat(dayOne.getDate()).concat(_dayEnding, " & ").concat(dayTwo.getDate()).concat(dayEndingTwo, ", of ").concat(months[dayOne.getMonth()]);
    return wording;
  }

  if (category.timingOptions.paymentCycle === "Monthly") {
    var _date = new Date("".concat(category.timingOptions.dueDates[0]));

    var _day2 = _date.getDate();

    var _endDigit2 = Number(_date.getDate().toString().split('')[_date.getDate().toString().length - 1]);

    var _dayEnding2;

    _dayEnding2 = _Budget_Creation__WEBPACK_IMPORTED_MODULE_8__.calculateDayEnding(_endDigit2, _dayEnding2, _date);
    wording = "Due ".concat(days[_date.getDay()], ", the ").concat(_day2).concat(_dayEnding2, " of ").concat(months[_date.getMonth()], ".");
    return wording;
  }
};

var getSinglePercentageSpent = function getSinglePercentageSpent(spent, total) {
  var percentage = (spent / total).toFixed(2);
  if (isNaN(percentage)) percentage = 0.0.toFixed(2);
  return percentage;
};

var getOverallPercentageSpent = function getOverallPercentageSpent(total, part) {
  var percent = (part / total).toFixed(2);
  if (percent === NaN) percent = 0;
  return percent;
};

var getOverallSpent = function getOverallSpent(subCategories, overall) {
  var arrayOfTotals = [];
  subCategories.forEach(function (sc, i) {
    var subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent);
    sc.firstChild.nextSibling.nextSibling.firstChild.textContent === "$".concat(sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]) ? subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]) : subCategoryTotal = 0;
    arrayOfTotals.push(subCategoryTotal);
  });
  var initialValue = 0;
  overall = arrayOfTotals.reduce(function (previous, current) {
    return Number(previous) + Number(current);
  }, initialValue);
  return overall;
};

var getOverallBudget = function getOverallBudget(subCategories, overall) {
  var arrayOfTotals = [];
  subCategories.forEach(function (sc, i) {
    var subCategoryTotal = sc.firstChild.nextSibling.nextSibling.firstChild.value;
    arrayOfTotals.push(subCategoryTotal);
  });
  var initialValue = 0;
  overall = arrayOfTotals.reduce(function (previous, current) {
    return Number(previous) + Number(current);
  }, initialValue);
  return overall;
};

var insertElement = function insertElement(container, element) {
  if (container) {
    container.insertAdjacentElement('beforeend', element);
  }
};

var displayTransaction = function displayTransaction(container, plan) {
  container.insertAdjacentElement('beforebegin', plan);
};

var getPaymentSchedule = function getPaymentSchedule(paymentArray, paymentCycle, dates) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var payments;
  var paymentStart = 0;
  console.log("Scheduling Payments...");
  console.log(paymentCycle, dates);

  if (paymentCycle === "Once") {
    paymentArray.push(dates[0]);
    return paymentArray;
  }

  if (paymentCycle === "Weekly") {
    payments = 52;

    while (paymentStart < payments) {
      var adjustedDate = new Date(dates[0]);
      var selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + new Date().getTimezoneOffset() / 60));

      if (paymentStart === 0) {
        paymentArray.push(adjustedDate);
      }

      if (paymentStart === 1) {
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 7));
        paymentArray.push(selectedDate);
      }

      if (paymentStart > 1) {
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 7 * paymentStart));
        paymentArray.push(selectedDate);
      }

      paymentStart++;
    }

    return paymentArray;
  }

  if (paymentCycle === "Bi-Weekly") {
    payments = 26;

    while (paymentStart < payments) {
      var _adjustedDate = new Date(dates[0]);

      var _selectedDate = new Date(_adjustedDate.setHours(_adjustedDate.getHours() + new Date().getTimezoneOffset() / 60));

      if (paymentStart === 0) {
        paymentArray.push(_adjustedDate);
      }

      if (paymentStart === 1) {
        _selectedDate = new Date(_selectedDate.setDate(_selectedDate.getDate() + 14));
        paymentArray.push(_selectedDate);
      }

      if (paymentStart > 1) {
        _selectedDate = new Date(_selectedDate.setDate(_selectedDate.getDate() + 14 * paymentStart));
        paymentArray.push(_selectedDate);
      }

      paymentStart++;
    }

    return paymentArray;
  }

  if (paymentCycle === "Bi-Monthly") {
    payments = 12;

    while (paymentStart < payments) {
      var adjustedDate1 = new Date(dates[0]);
      var adjustedDate2 = new Date(dates[1]);
      var selectedDate1 = new Date(adjustedDate1.setHours(adjustedDate1.getHours() + new Date().getTimezoneOffset() / 60));
      var selectedDate2 = new Date(adjustedDate2.setHours(adjustedDate2.getHours() + new Date().getTimezoneOffset() / 60));

      if (paymentStart === 0) {
        paymentArray.push([adjustedDate1, adjustedDate2]);
      }

      if (paymentStart === 1) {
        selectedDate1 = new Date(selectedDate1.setMonth(selectedDate1.getMonth() + 1));
        selectedDate2 = new Date(selectedDate2.setMonth(selectedDate2.getMonth() + 1));
        paymentArray.push([selectedDate1, selectedDate2]);
      }

      if (paymentStart > 1) {
        selectedDate1 = new Date(selectedDate1.setMonth(selectedDate1.getMonth() + 1 * paymentStart));
        selectedDate2 = new Date(selectedDate2.setMonth(selectedDate2.getMonth() + 1 * paymentStart));
        paymentArray.push([selectedDate1, selectedDate2]);
      }

      paymentStart++;
    }

    return paymentArray;
  }

  if (paymentCycle === "Monthly") {
    payments = 12;

    while (paymentStart < payments) {
      var _adjustedDate2 = new Date(dates[0]);

      var _selectedDate2 = new Date(_adjustedDate2.setHours(_adjustedDate2.getHours() + new Date().getTimezoneOffset() / 60));

      if (paymentStart === 0) {
        paymentArray.push(_adjustedDate2);
      }

      if (paymentStart === 1) {
        _selectedDate2 = new Date(_selectedDate2.setMonth(_selectedDate2.getMonth() + 1));
        paymentArray.push(_selectedDate2);
      }

      if (paymentStart > 1) {
        _selectedDate2 = new Date(_selectedDate2.setMonth(_selectedDate2.getMonth() + 1 * paymentStart));
        paymentArray.push(_selectedDate2);
      }

      paymentStart++;
    }

    return paymentArray;
  }

  if (paymentCycle === "Quarterly") {
    payments = 4;

    while (paymentStart < payments) {
      var _adjustedDate3 = new Date(dates[0]);

      var _selectedDate3 = new Date(_adjustedDate3.setHours(_adjustedDate3.getHours() + new Date().getTimezoneOffset() / 60));

      if (paymentStart === 0) {
        paymentArray.push(_adjustedDate3);
      }

      if (paymentStart === 1) {
        _selectedDate3 = new Date(_selectedDate3.setMonth(_selectedDate3.getMonth() + 3));
        paymentArray.push(_selectedDate3);
      }

      if (paymentStart > 1) {
        _selectedDate3 = new Date(_selectedDate3.setMonth(_selectedDate3.getMonth() + 3 * paymentStart));
        paymentArray.push(_selectedDate3);
      }

      paymentStart++;
    }

    return paymentArray;
  }

  if (paymentCycle === "Bi-Annual") {
    payments = 7; // Gives them 7 years of payments ahead.

    while (paymentStart < payments) {
      var _adjustedDate4 = new Date(dates[0]);

      var _adjustedDate5 = new Date(dates[1]);

      var _selectedDate4 = new Date(_adjustedDate4.setHours(_adjustedDate4.getHours() + new Date().getTimezoneOffset() / 60));

      var _selectedDate5 = new Date(_adjustedDate5.setHours(_adjustedDate5.getHours() + new Date().getTimezoneOffset() / 60));

      if (paymentStart === 0) {
        paymentArray.push([_adjustedDate4, _adjustedDate5]);
      }

      if (paymentStart === 1) {
        _selectedDate4 = new Date(_selectedDate4.setFullYear(_selectedDate4.getFullYear() + 1));
        _selectedDate5 = new Date(_selectedDate5.setFullYear(_selectedDate5.getFullYear() + 1));
        paymentArray.push([_selectedDate4, _selectedDate5]);
      }

      if (paymentStart > 1) {
        _selectedDate4 = new Date(_selectedDate4.setFullYear(_selectedDate4.getFullYear() + 1 * paymentStart));
        _selectedDate5 = new Date(_selectedDate5.setFullYear(_selectedDate5.getFullYear() + 1 * paymentStart));
        paymentArray.push([_selectedDate4, _selectedDate5]);
      }

      paymentStart++;
    }

    return paymentArray;
  }

  if (paymentCycle === "Annual") {
    payments = 10; // Gives them 10 years of payments ahead.

    while (paymentStart < payments) {
      var _adjustedDate6 = new Date(dates[0]);

      var _selectedDate6 = new Date(_adjustedDate6.setHours(_adjustedDate6.getHours() + new Date().getTimezoneOffset() / 60));

      if (paymentStart === 0) {
        paymentArray.push(_adjustedDate6);
      }

      if (paymentStart === 1) {
        _selectedDate6 = new Date(_selectedDate6.setFullYear(_selectedDate6.getFullYear() + 1));
        paymentArray.push(_selectedDate6);
      }

      if (paymentStart > 1) {
        _selectedDate6 = new Date(_selectedDate6.setFullYear(_selectedDate6.getFullYear() + 1 * paymentStart));
        paymentArray.push(_selectedDate6);
      }

      paymentStart++;
    }

    return paymentArray;
  }
};

var getDatabaseDueDate = function getDatabaseDueDate(date) {
  return new Date(new Date(date).setHours(new Date(date).getHours() + new Date().getTimezoneOffset() / 60));
};

var getDueDate = function getDueDate(date) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var selectedDate = new Date(date);
  var currentTimezoneOffset = selectedDate.getTimezoneOffset() / 60;
  return "".concat(new Date(selectedDate.setHours(selectedDate.getHours() + new Date().getTimezoneOffset() / 60)).getDate(), " ").concat(months[new Date(date).getMonth()], " ").concat(new Date(date).getFullYear());
};

var getTransactionPlanDate = function getTransactionPlanDate(date) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return "".concat(new Date(date).getDate(), " ").concat(months[new Date(date).getMonth()], " ").concat(new Date(date).getFullYear());
};

var getCurrentDate = function getCurrentDate() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return "".concat(new Date().getDate(), " ").concat(months[new Date().getMonth()], " ").concat(new Date().getFullYear());
};

var replaceClassName = function replaceClassName(element, classReplaced, replacementClass) {
  element.classList.remove(classReplaced);
  element.classList.add(replacementClass);
};

var finalizeTransactionPlan = function finalizeTransactionPlan(budget, placeholderBudget, user, selects, smallInputs, mediumInputs) {
  console.log(budget, user);
  var updateObject = {
    budgetId: budget._id,
    userId: user._id
  };
  var plannedTransaction = {};
  updateObject.transactions = {};
  updateObject.transactions.recentTransactions = budget.transactions.recentTransactions;
  updateObject.transactions.plannedTransactions = budget.transactions.plannedTransactions;
  console.log(selects[0].value); // The ones before the conditional should be the ones which ALL transaction plans should have.

  plannedTransaction.date = new Date();
  plannedTransaction.type = "Withdrawal";
  plannedTransaction.location = smallInputs[0].value;
  plannedTransaction.account = selects[0].value;
  plannedTransaction.amount = Number(smallInputs[2].value);
  plannedTransaction.timingOptions = {};
  plannedTransaction.timingOptions.paymentCycle = selects[5].value;
  plannedTransaction.timingOptions.dueDates = [];
  plannedTransaction.timingOptions.dueDates.push(getDatabaseDueDate(mediumInputs[0].value));

  if (plannedTransaction.timingOptions.paymentCycle === "Bi-Monthly" || plannedTransaction.timingOptions.paymentCycle === "Bi-Annual") {
    plannedTransaction.timingOptions.dueDates = [];
    plannedTransaction.timingOptions.dueDates.push(getDatabaseDueDate(mediumInputs[0].value));
    plannedTransaction.timingOptions.dueDates.push(getDatabaseDueDate(mediumInputs[1].value));
    console.log("2 Payments..");
  }

  plannedTransaction.timingOptions.paymentSchedule = []; // After the due dates, it is setting the payment schedule using the selected payment cycle.

  getPaymentSchedule(plannedTransaction.timingOptions.paymentSchedule, plannedTransaction.timingOptions.paymentCycle, plannedTransaction.timingOptions.dueDates);
  plannedTransaction.name = smallInputs[1].value;
  plannedTransaction.amountSaved = 0;
  plannedTransaction.paid = false;
  plannedTransaction.paidStatus = "Unpaid";
  console.log(selects);

  if (selects[0].value === "Expense Fund") {
    plannedTransaction.subAccount = selects[1].value;
    console.log(smallInputs[2].closest('.form__section--transaction-plan').nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling);
    var surplusSwitch = smallInputs[2].closest('.form__section--transaction-plan').nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling;
    plannedTransaction.need = "Need";

    if (surplusSwitch.classList.contains('surplus-container__switch--switched')) {
      plannedTransaction.need = "Surplus";
    }
  }

  if (selects[0].value === "Savings Fund") {
    plannedTransaction.subAccount = selects[2].value;
    var _surplusSwitch = smallInputs[2].closest('.form__section--transaction-plan').nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling;
    plannedTransaction.need = "Need";

    if (_surplusSwitch.classList.contains('surplus-container__switch--switched')) {
      plannedTransaction.need = "Surplus";
    }
  }

  if (selects[0].value === "Debt") {
    plannedTransaction.subAccount = selects[3].value;
    plannedTransaction.need = "Need";
    plannedTransaction.lender = selects[6].value;
  }

  if (selects[0].value === "Surplus") {
    plannedTransaction.subAccount = selects[4].value;
    plannedTransaction.need = "Surplus";
  }

  updateObject.transactions.plannedTransactions.push(plannedTransaction);

  placeholderBudget._updateBudget("Update", "Transaction Planner", {
    updateObject: updateObject
  }, "Transaction-Planner");
};

var buildTransactionPlan = function buildTransactionPlan(budget, placeholderBudget, user, number, numberOfSections, plan, classType) {
  var transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  var smallShortTransactionPlanInputs = document.querySelectorAll('.form__input--small-short');
  var altMediumTransactionPlanInputs = document.querySelectorAll('.form__input--medium__alt');
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  var expenseAppliedTotal = 0;
  var savingsAppliedTotal = 0;
  var debtAppliedTotal = 0;
  var surplusAppliedTotal = 0;
  budget.transactions.plannedTransactions.forEach(function (transaction, i) {
    if (transaction.account === "Expense Fund") {
      expenseAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Savings Fund") {
      savingsAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Debt") {
      debtAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Surplus") {
      surplusAppliedTotal += transaction.amountSaved;
    }
  });

  if (classType === "original") {
    while (number < numberOfSections) {
      var transactionPlanPartHeader = document.createElement('header');
      var transactionPlanPartHeaderText = document.createElement('p');
      var transactionPlanPartText = document.createElement('p'); // Add Classes For First Part

      transactionPlanPartHeader.classList.add('transaction-plan__part__header');
      transactionPlanPartHeader.classList.add('r__transaction-plan__part__header');
      transactionPlanPartHeaderText.classList.add('transaction-plan__part__header__text');
      transactionPlanPartHeaderText.classList.add('r__transaction-plan__part__header__text');
      transactionPlanPartText.classList.add('transaction-plan__part__text');
      transactionPlanPartText.classList.add('r__transaction-plan__part__text'); // Add Content For First Part

      transactionPlanPartHeaderText.textContent = "Date";
      transactionPlanPartText.textContent = getCurrentDate();
      var transactionPlanPart = document.createElement('section');
      transactionPlanPart.classList.add("transaction-plan__part");
      if (numberOfSections === 13) replaceClassName(transactionPlanPart, 'transaction-plan__part', 'transaction-plan__double__part');
      plan.insertAdjacentElement('beforeend', transactionPlanPart);

      if (number === 0) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 1) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = "Account";
        transactionPlanPartText.textContent = "".concat(transactionPlanSelects[0].value);
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 2) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = "Transaction Type";
        console.log(transactionPlanSelects[0].value);
        console.log(transactionPlanSelects[1], transactionPlanSelects[1].value);

        if (transactionPlanSelects[0].value === "Expense Fund") {
          console.log(transactionPlanSelects[1], transactionPlanSelects[1].value);
          transactionPlanPartText.textContent = "".concat(transactionPlanSelects[1].value);
        }

        if (transactionPlanSelects[0].value === "Savings Fund") {
          transactionPlanPartText.textContent = "".concat(transactionPlanSelects[2].value);
        }

        if (transactionPlanSelects[0].value === "Surplus") {
          transactionPlanPartText.textContent = "".concat(transactionPlanSelects[4].value);
        }

        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 3) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = "Transaction Name";
        transactionPlanPartText.textContent = "".concat(smallShortTransactionPlanInputs[1].value);
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 4) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = "Location";
        transactionPlanPartText.textContent = "".concat(smallShortTransactionPlanInputs[0].value);
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 5) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = "Amount";
        transactionPlanPartText.textContent = "".concat(money.format(Number(smallShortTransactionPlanInputs[2].value)));
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 6) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = "Due Date One";
        transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[0].value);
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 7) {
        // transactionPlanPartHeader.classList.add('transaction-plan__alt__part__header');
        // transactionPlanPartHeader.classList.add('r__transaction-plan__alt__part__header');
        // transactionPlanPartHeaderText.classList.add('transaction-plan__alt__part__header__text');
        // transactionPlanPartHeaderText.classList.add('r__transaction-plan__alt__part__header__text');
        // transactionPlanPartText.classList.add('transaction-plan__alt__part__text');
        // transactionPlanPartText.classList.add('r__transaction-plan__alt__part__text');
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = "Timing";
        transactionPlanPartText.textContent = "".concat(transactionPlanSelects[5].value);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, "transaction-plan__part__header", 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, "r__transaction-plan__part__header", 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = "Due Date Two";
          transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[1].value);
        }

        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 8) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = "Amount Saved";
        transactionPlanPartText.textContent = money.format(0);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, "transaction-plan__part__header", 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, "r__transaction-plan__part__header", 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = "Timing";
          transactionPlanPartText.textContent = "".concat(transactionPlanSelects[5].value);
        }

        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }

      if (number === 9) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);

        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = "Apply Money";
          var transactionPlanInput = document.createElement('input');
          var transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = "Apply";
          transactionPlanInput.classList.add('form__input--transaction-plan');
          transactionPlanInput.classList.add('r__form__input--transaction-plan');
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
          transactionPlanInput.type = 'number';
          transactionPlanInput.min = 0;
          transactionPlanInput.placeholder = '$0.00';
          insertElement(transactionPlanPart, transactionPlanInput);
          insertElement(transactionPlanPart, transactionPlanButton);
        }

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, "transaction-plan__part__header", 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, "r__transaction-plan__part__header", 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = "Amount Saved";
          transactionPlanPartText.textContent = money.format(0);
          insertElement(transactionPlanPart, transactionPlanPartText);
        }
      }

      if (number === 10) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);

        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = "Paid In Full?";

          var _transactionPlanButton = document.createElement('button');

          _transactionPlanButton.textContent = "Paid";

          _transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');

          _transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          insertElement(transactionPlanPart, _transactionPlanButton);
        }

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, "transaction-plan__part__header", 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, "r__transaction-plan__part__header", 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = "Apply Money";

          var _transactionPlanInput = document.createElement('input');

          var _transactionPlanButton2 = document.createElement('button');

          _transactionPlanButton2.textContent = "Apply";

          _transactionPlanInput.classList.add('form__input--transaction-plan');

          _transactionPlanInput.classList.add('r__form__input--transaction-plan');

          _transactionPlanButton2.classList.add('button--extra-extra-small__transaction-plan-small');

          _transactionPlanButton2.classList.add('r__button--extra-extra-small__transaction-plan-small');

          _transactionPlanInput.type = 'number';
          _transactionPlanInput.min = 0;
          _transactionPlanInput.placeholder = '$0.00';
          insertElement(transactionPlanPart, _transactionPlanInput);
          insertElement(transactionPlanPart, _transactionPlanButton2);
        }
      }

      if (number === 11) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);

        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = "Status";
          transactionPlanPartText.textContent = "Unpaid";
          insertElement(transactionPlanPart, transactionPlanPartText);
        }

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, "transaction-plan__part__header", 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, "r__transaction-plan__part__header", 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = "Paid In Full?";

          var _transactionPlanButton3 = document.createElement('button');

          _transactionPlanButton3.textContent = "Paid";

          _transactionPlanButton3.classList.add('button--extra-extra-small__transaction-plan-small');

          _transactionPlanButton3.classList.add('r__button--extra-extra-small__transaction-plan-small');

          insertElement(transactionPlanPart, _transactionPlanButton3);
        }
      }

      if (number === 12) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, "transaction-plan__part__header", 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, "r__transaction-plan__part__header", 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = "Status";
          transactionPlanPartText.textContent = "Unpaid";
          insertElement(transactionPlanPart, transactionPlanPartText);
        }
      }

      number++;
    }
  }

  if (classType === "alt") {
    while (number < numberOfSections) {
      // Initialize Variables For First Part
      var _transactionPlanPartHeader = document.createElement('header');

      var _transactionPlanPartHeaderText = document.createElement('p');

      var _transactionPlanPartText = document.createElement('p'); // Add Classes For First Part


      _transactionPlanPartHeader.classList.add('transaction-plan__alt__part__header');

      _transactionPlanPartHeader.classList.add('r__transaction-plan__alt__part__header');

      _transactionPlanPartHeaderText.classList.add('transaction-plan__alt__part__header__text');

      _transactionPlanPartHeaderText.classList.add('r__transaction-plan__alt__part__header__text');

      _transactionPlanPartText.classList.add('transaction-plan__alt__part__text');

      _transactionPlanPartText.classList.add('r__transaction-plan__alt__part__text'); // Add Content For First Part


      _transactionPlanPartHeaderText.textContent = "Date";
      _transactionPlanPartText.textContent = getCurrentDate();

      var _transactionPlanPart = document.createElement('section');

      _transactionPlanPart.classList.add("transaction-plan__alt__part");

      if (numberOfSections === 14) replaceClassName(_transactionPlanPart, 'transaction-plan__alt__part', 'transaction-plan__alt-double__part');
      plan.insertAdjacentElement('beforeend', _transactionPlanPart);

      if (number === 0) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 1) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Account";
        _transactionPlanPartText.textContent = "".concat(transactionPlanSelects[0].value);
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 2) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Transaction Type";
        _transactionPlanPartText.textContent = "".concat(transactionPlanSelects[3].value);
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 3) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Lender";
        _transactionPlanPartText.textContent = "".concat(transactionPlanSelects[6].value);
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 4) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Transaction Name";
        _transactionPlanPartText.textContent = "".concat(smallShortTransactionPlanInputs[1].value);
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 5) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Location";
        _transactionPlanPartText.textContent = "".concat(smallShortTransactionPlanInputs[0].value);
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 6) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Amount";
        _transactionPlanPartText.textContent = "".concat(money.format(Number(smallShortTransactionPlanInputs[2].value)));
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 7) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Due Date One";
        _transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[0].value);
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 8) {
        // transactionPlanPartHeader.classList.add('transaction-plan__alt__part__header');
        // transactionPlanPartHeader.classList.add('r__transaction-plan__alt__part__header');
        // transactionPlanPartHeaderText.classList.add('transaction-plan__alt__part__header__text');
        // transactionPlanPartHeaderText.classList.add('r__transaction-plan__alt__part__header__text');
        // transactionPlanPartText.classList.add('transaction-plan__alt__part__text');
        // transactionPlanPartText.classList.add('r__transaction-plan__alt__part__text');
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Timing";
        _transactionPlanPartText.textContent = "".concat(transactionPlanSelects[5].value);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(_transactionPlanPartHeader, "transaction-plan__alt__part__header", 'transaction-plan__alt-double__part__header');
          replaceClassName(_transactionPlanPartHeader, "r__transaction-plan__alt__part__header", 'r__transaction-plan__alt-double__part__header');
          _transactionPlanPartHeaderText.textContent = "Due Date Two";
          _transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[1].value);
        }

        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 9) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        _transactionPlanPartHeaderText.textContent = "Amount Saved";
        _transactionPlanPartText.textContent = money.format(0);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(_transactionPlanPartHeader, "transaction-plan__alt__part__header", 'transaction-plan__alt-double__part__header');
          replaceClassName(_transactionPlanPartHeader, "r__transaction-plan__alt__part__header", 'r__transaction-plan__alt-double__part__header');
          _transactionPlanPartHeaderText.textContent = "Timing";
          _transactionPlanPartText.textContent = "".concat(transactionPlanSelects[5].value);
        }

        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);
        insertElement(_transactionPlanPart, _transactionPlanPartText);
      }

      if (number === 10) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);

        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          _transactionPlanPartHeaderText.textContent = "Apply Money";

          var _transactionPlanInput2 = document.createElement('input');

          var _transactionPlanButton4 = document.createElement('button');

          _transactionPlanButton4.textContent = "Apply";

          _transactionPlanInput2.classList.add('form__input--transaction-plan');

          _transactionPlanInput2.classList.add('r__form__input--transaction-plan');

          _transactionPlanButton4.classList.add('button--extra-extra-small__transaction-plan-small');

          _transactionPlanButton4.classList.add('r__button--extra-extra-small__transaction-plan-small');

          _transactionPlanInput2.type = 'number';
          _transactionPlanInput2.min = 0;
          _transactionPlanInput2.placeholder = '$0.00';
          insertElement(_transactionPlanPart, _transactionPlanInput2);
          insertElement(_transactionPlanPart, _transactionPlanButton4);
        }

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(_transactionPlanPartHeader, "transaction-plan__alt__part__header", 'transaction-plan__alt-double__part__header');
          replaceClassName(_transactionPlanPartHeader, "r__transaction-plan__alt__part__header", 'r__transaction-plan__alt-double__part__header');
          _transactionPlanPartHeaderText.textContent = "Amount Saved";
          _transactionPlanPartText.textContent = money.format(0);
          insertElement(_transactionPlanPart, _transactionPlanPartText);
        }
      }

      if (number === 11) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);

        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          _transactionPlanPartHeaderText.textContent = "Paid In Full?";

          var _transactionPlanButton5 = document.createElement('button');

          _transactionPlanButton5.textContent = "Paid";

          _transactionPlanButton5.classList.add('button--extra-extra-small__transaction-plan-small');

          _transactionPlanButton5.classList.add('r__button--extra-extra-small__transaction-plan-small');

          insertElement(_transactionPlanPart, _transactionPlanButton5);
        }

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(_transactionPlanPartHeader, "transaction-plan__alt__part__header", 'transaction-plan__alt-double__part__header');
          replaceClassName(_transactionPlanPartHeader, "r__transaction-plan__alt__part__header", 'r__transaction-plan__alt-double__part__header');
          _transactionPlanPartHeaderText.textContent = "Apply Money";

          var _transactionPlanInput3 = document.createElement('input');

          var _transactionPlanButton6 = document.createElement('button');

          _transactionPlanButton6.textContent = "Apply";

          _transactionPlanInput3.classList.add('form__input--transaction-plan');

          _transactionPlanInput3.classList.add('r__form__input--transaction-plan');

          _transactionPlanButton6.classList.add('button--extra-extra-small__transaction-plan-small');

          _transactionPlanButton6.classList.add('r__button--extra-extra-small__transaction-plan-small');

          _transactionPlanInput3.type = 'number';
          _transactionPlanInput3.min = 0;
          _transactionPlanInput3.placeholder = '$0.00';
          insertElement(_transactionPlanPart, _transactionPlanInput3);
          insertElement(_transactionPlanPart, _transactionPlanButton6);
        }
      }

      if (number === 12) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);

        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          _transactionPlanPartHeaderText.textContent = "Status";
          _transactionPlanPartText.textContent = "Unpaid";
          insertElement(_transactionPlanPart, _transactionPlanPartText);
        }

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(_transactionPlanPartHeader, "transaction-plan__alt__part__header", 'transaction-plan__alt-double__part__header');
          replaceClassName(_transactionPlanPartHeader, "r__transaction-plan__alt__part__header", 'r__transaction-plan__alt-double__part__header');
          _transactionPlanPartHeaderText.textContent = "Paid In Full?";

          var _transactionPlanButton7 = document.createElement('button');

          _transactionPlanButton7.textContent = "Paid";

          _transactionPlanButton7.classList.add('button--extra-extra-small__transaction-plan-small');

          _transactionPlanButton7.classList.add('r__button--extra-extra-small__transaction-plan-small');

          insertElement(_transactionPlanPart, _transactionPlanButton7);
        }
      }

      if (number === 13) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(_transactionPlanPart, _transactionPlanPartHeader);
        insertElement(_transactionPlanPartHeader, _transactionPlanPartHeaderText);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(_transactionPlanPartHeader, "transaction-plan__alt__part__header", 'transaction-plan__alt-double__part__header');
          replaceClassName(_transactionPlanPartHeader, "r__transaction-plan__alt__part__header", 'r__transaction-plan__alt-double__part__header');
          _transactionPlanPartHeaderText.textContent = "Status";
          _transactionPlanPartText.textContent = "Unpaid";
          insertElement(_transactionPlanPart, _transactionPlanPartText);
        }
      }

      number++;
    }
  }

  finalizeTransactionPlan(budget, placeholderBudget, user, transactionPlanSelects, smallShortTransactionPlanInputs, altMediumTransactionPlanInputs);
};

var createPlannedTransaction = function createPlannedTransaction(accountSelect, budget, placeholderBudget, user, creationContainer) {
  console.log("Creating Plan...");
  var transactionDisplay = document.querySelector('.transaction-plan-display');
  var transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  var numSections;
  var sectionStart = 0;

  if (accountSelect.value === "Expense Fund" || accountSelect.value === "Savings Fund" || accountSelect.value === "Surplus") {
    var transactionPlan = document.createElement('section');
    numSections = 12;
    if (transactionPlanSelects[5].value === "Bi-Monthly" || transactionPlanSelects[5].value === "Bi-Annual") numSections = 13;
    buildTransactionPlan(budget, placeholderBudget, user, sectionStart, numSections, transactionPlan, "original");
    numSections === 13 ? transactionPlan.classList.add('transaction-plan__double') : transactionPlan.classList.add('transaction-plan');
    numSections === 13 ? transactionPlan.classList.add('r__transaction-plan__double') : transactionPlan.classList.add('r__transaction-plan');
    displayTransaction(creationContainer, transactionPlan);
  }

  if (accountSelect.value === "Debt") {
    var altTransactionPlan = document.createElement('section');
    numSections = 13;
    if (transactionPlanSelects[5].value === "Bi-Monthly" || transactionPlanSelects[5].value === "Bi-Annual") numSections = 14;
    buildTransactionPlan(budget, placeholderBudget, user, sectionStart, numSections, altTransactionPlan, "alt");
    numSections === 14 ? altTransactionPlan.classList.add('transaction-plan__alt-double') : altTransactionPlan.classList.add('transaction-plan__alt');
    numSections === 14 ? altTransactionPlan.classList.add('r__transaction-plan__alt-double') : altTransactionPlan.classList.add('r__transaction-plan__alt');
    displayTransaction(creationContainer, altTransactionPlan);
  }
};

var checkSelectedTiming = function checkSelectedTiming() {
  var transactionPlanSections = document.querySelectorAll('.form__section--transaction-plan');
  var formSelectSections = document.querySelectorAll('.form__section--select');

  if (formSelectSections[2].firstChild.nextSibling.nextSibling.value === "Bi-Monthly" || formSelectSections[2].firstChild.nextSibling.nextSibling.value === "Bi-Annual") {
    transactionPlanSections[4].classList.remove('closed');
    transactionPlanSections[4].classList.add('open');
  }

  if (formSelectSections[2].firstChild.nextSibling.nextSibling.value !== "Bi-Monthly" && formSelectSections[2].firstChild.nextSibling.nextSibling.value !== "Bi-Annual") {
    transactionPlanSections[4].classList.remove('open');
    transactionPlanSections[4].classList.add('closed');
  }
};

var showTransactionPlanOptions = function showTransactionPlanOptions(array, allOptions) {
  var altMediumTransactionPlanInputs = document.querySelectorAll('.form__input--medium__alt');
  var transactionPlanSelects = document.querySelectorAll('.form__select--accounts');

  if (altMediumTransactionPlanInputs[1]) {
    if (altMediumTransactionPlanInputs[1].classList.contains('open')) {
      altMediumTransactionPlanInputs[1].classList.remove('open');
      altMediumTransactionPlanInputs[1].classList.add('closed');
    }

    transactionPlanSelects[5].value = transactionPlanSelects[5].firstChild.nextSibling.value;
    allOptions.forEach(function (optionArray, i) {
      optionArray.forEach(function (arrayItem, i) {
        arrayItem.classList.remove('open');
        arrayItem.classList.add('closed');
      });
    });
    array.forEach(function (arrayItem, i) {
      if (i === 0) return;
      arrayItem.classList.remove('closed');
      arrayItem.classList.add('open');

      if (i === 1) {
        arrayItem.removeEventListener('click', checkSelectedTiming);
        arrayItem.addEventListener('click', checkSelectedTiming);
      }
    });
  }
};

var updateTransactionPlanningAccountDisplays = function updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user) {
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  console.log("Updating...");
  var appliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__applied-container__applied');
  var unAppliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__un-applied-container__un-applied');
  var expenseAppliedTotal = 0;
  var savingsAppliedTotal = 0;
  var debtAppliedTotal = 0;
  var surplusAppliedTotal = 0;
  budget.transactions.plannedTransactions.forEach(function (transaction, i) {
    if (transaction.account === "Expense Fund") {
      expenseAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Savings Fund") {
      savingsAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Debt") {
      debtAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Surplus") {
      surplusAppliedTotal += transaction.amountSaved;
    }
  }); // APPLIED TOTALS

  appliedMoney[0].textContent = money.format(expenseAppliedTotal);
  appliedMoney[1].textContent = money.format(savingsAppliedTotal);
  appliedMoney[2].textContent = money.format(debtAppliedTotal);
  appliedMoney[3].textContent = money.format(surplusAppliedTotal); // UNAPPLIED TOTALS

  unAppliedMoney[0].textContent = money.format(budget.accounts.expenseFund.amount - expenseAppliedTotal);
  unAppliedMoney[1].textContent = money.format(budget.accounts.savingsFund.amount - savingsAppliedTotal);
  unAppliedMoney[2].textContent = money.format(budget.accounts.debt.amount - debtAppliedTotal);
  unAppliedMoney[3].textContent = money.format(budget.accounts.surplus.amount - surplusAppliedTotal);
};

var displayExistingTransactionPlans = function displayExistingTransactionPlans(budget, placeholderBudget, user) {
  console.log("These are existing.");
  var transactionPlanCreation = document.querySelector('.transaction-plan-creation');
  var transactionPlans = [];
  var numberOfSections;
  budget.transactions.plannedTransactions.forEach(function (transaction, i) {
    transactionPlans.push(transaction);
    transactionPlans.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  });
  console.log(transactionPlans // transactionPlans.sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  transactionPlans.forEach(function (transaction, i) {
    var sectionStart = 0;

    if (transaction.account !== "Debt") {
      // Decision if NOT Debt Transaction
      var transactionPlan = document.createElement('section');

      if (transaction.timingOptions.paymentCycle === "Bi-Monthly" || transaction.timingOptions.paymentCycle === "Bi-Annual") {
        transactionPlan.classList.add('transaction-plan__double');
        transactionPlan.classList.add('r__transaction-plan__double');
        numberOfSections = 13;

        while (sectionStart < numberOfSections) {
          // Initialize Variables For First Part
          var transactionPlanPartHeader = document.createElement('header');
          var transactionPlanPartHeaderText = document.createElement('p');
          var transactionPlanPartText = document.createElement('p'); // Add Classes For First Part

          transactionPlanPartHeader.classList.add('transaction-plan__double__part__header');
          transactionPlanPartHeader.classList.add('r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.classList.add('transaction-plan__double__part__header__text');
          transactionPlanPartHeaderText.classList.add('r__transaction-plan__double__part__header__text');
          transactionPlanPartText.classList.add('transaction-plan__double__part__text');
          transactionPlanPartText.classList.add('r__transaction-plan__double__part__text'); // Add Content For First Part

          transactionPlanPartHeaderText.textContent = "Date";
          transactionPlanPartText.textContent = getTransactionPlanDate(transaction.date);
          var transactionPlanPart = document.createElement('section');
          transactionPlanPart.classList.add("transaction-plan__double__part");
          transactionPlan.insertAdjacentElement('beforeend', transactionPlanPart);

          if (sectionStart === 0) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Account";
            transactionPlanPartText.textContent = "".concat(transaction.account);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Transaction Type";
            transactionPlanPartText.textContent = "".concat(transaction.subAccount);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Transaction Name";
            transactionPlanPartText.textContent = "".concat(transaction.name);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Location";
            transactionPlanPartText.textContent = "".concat(transaction.location);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Amount";
            transactionPlanPartText.textContent = money.format(transaction.amount);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Due Date One";
            transactionPlanPartText.textContent = "".concat(getTransactionPlanDate(transaction.timingOptions.dueDates[0]));
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Due Date Two";
            transactionPlanPartText.textContent = "".concat(getTransactionPlanDate(transaction.timingOptions.dueDates[1]));
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Timing";
            transactionPlanPartText.textContent = "".concat(transaction.timingOptions.paymentCycle);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Amount Saved";
            transactionPlanPartText.textContent = money.format(transaction.amountSaved);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          if (sectionStart === 10) {
            (function () {
              // INSERT DOM ELEMENTS INTO FIRST PART
              transactionPlanPartHeaderText.textContent = "Apply Money";
              var transactionPlanInput = document.createElement('input');
              var transactionPlanButton = document.createElement('button');
              transactionPlanButton.textContent = "Apply";
              transactionPlanInput.classList.add('form__input--transaction-plan');
              transactionPlanInput.classList.add('r__form__input--transaction-plan');
              transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
              transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
              transactionPlanInput.type = 'number';
              transactionPlanInput.min = 0;
              transactionPlanInput.placeholder = '$0.00';
              transactionPlanButton.addEventListener('click', function (e) {
                console.log(transactionPlanInput.value, (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(transactionPlanInput.value));
                console.log(transactionPlanButton.parentElement.previousSibling);
                transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
                transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
                console.log(transaction.amountSaved);
                var updateObject = {
                  budgetId: budget._id,
                  userId: user._id
                };
                updateObject.transactions = {
                  recentTransactions: budget.transactions.recentTransactions,
                  plannedTransactions: transactionPlans
                };

                placeholderBudget._updateBudget("Update", "Apply Money", {
                  updateObject: updateObject
                }, "Transaction-Planner");

                updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user);
              });
              insertElement(transactionPlanPart, transactionPlanPartHeader);
              insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
              insertElement(transactionPlanPart, transactionPlanInput);
              insertElement(transactionPlanPart, transactionPlanButton);
            })();
          }

          if (sectionStart === 11) {
            transactionPlanPartHeaderText.textContent = "Paid In Full?";
            var transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = "Paid";
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanButton);
          }

          if (sectionStart === 12) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = "Status";
            transactionPlanPartText.textContent = "".concat(transaction.paidStatus);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }

          sectionStart++;
        }
      }

      if (transaction.timingOptions.paymentCycle !== "Bi-Monthly" && transaction.timingOptions.paymentCycle !== "Bi-Annual") {
        transactionPlan.classList.add('transaction-plan');
        transactionPlan.classList.add('r__transaction-plan');
        numberOfSections = 12;

        while (sectionStart < numberOfSections) {
          // Initialize Variables For First Part
          var _transactionPlanPartHeader2 = document.createElement('header');

          var _transactionPlanPartHeaderText2 = document.createElement('p');

          var _transactionPlanPartText2 = document.createElement('p'); // Add Classes For First Part


          _transactionPlanPartHeader2.classList.add('transaction-plan__part__header');

          _transactionPlanPartHeader2.classList.add('r__transaction-plan__part__header');

          _transactionPlanPartHeaderText2.classList.add('transaction-plan__part__header__text');

          _transactionPlanPartHeaderText2.classList.add('r__transaction-plan__part__header__text');

          _transactionPlanPartText2.classList.add('transaction-plan__part__text');

          _transactionPlanPartText2.classList.add('r__transaction-plan__part__text'); // Add Content For First Part


          _transactionPlanPartHeaderText2.textContent = "Date";
          _transactionPlanPartText2.textContent = getTransactionPlanDate(transaction.date);

          var _transactionPlanPart2 = document.createElement('section');

          _transactionPlanPart2.classList.add("transaction-plan__part");

          transactionPlan.insertAdjacentElement('beforeend', _transactionPlanPart2);

          if (sectionStart === 0) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Account";
            _transactionPlanPartText2.textContent = "".concat(transaction.account);
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Transaction Type";
            _transactionPlanPartText2.textContent = "".concat(transaction.subAccount);
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Transaction Name";
            _transactionPlanPartText2.textContent = "".concat(transaction.name);
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Location";
            _transactionPlanPartText2.textContent = "".concat(transaction.location);
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Amount";
            _transactionPlanPartText2.textContent = money.format(transaction.amount);
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Due Date One";
            _transactionPlanPartText2.textContent = "".concat(getTransactionPlanDate(transaction.timingOptions.dueDates[0]));
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Timing";
            _transactionPlanPartText2.textContent = "".concat(transaction.timingOptions.paymentCycle);
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Amount Saved";
            _transactionPlanPartText2.textContent = money.format(transaction.amountSaved);
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          if (sectionStart === 9) {
            (function () {
              // INSERT DOM ELEMENTS INTO FIRST PART
              _transactionPlanPartHeaderText2.textContent = "Apply Money";
              var transactionPlanInput = document.createElement('input');
              var transactionPlanButton = document.createElement('button');
              transactionPlanButton.textContent = "Apply";
              transactionPlanInput.classList.add('form__input--transaction-plan');
              transactionPlanInput.classList.add('r__form__input--transaction-plan');
              transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
              transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
              transactionPlanInput.type = 'number';
              transactionPlanInput.min = 0;
              transactionPlanInput.placeholder = '$0.00';
              transactionPlanButton.addEventListener('click', function (e) {
                console.log(transactionPlanInput.value, (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(transactionPlanInput.value));
                console.log(transactionPlanButton.parentElement.previousSibling);
                transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
                transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
                console.log(transaction.amountSaved, transactionPlans);
                var updateObject = {
                  budgetId: budget._id,
                  userId: user._id
                };
                updateObject.transactions = {
                  recentTransactions: budget.transactions.recentTransactions,
                  plannedTransactions: transactionPlans
                };

                placeholderBudget._updateBudget("Update", "Apply Money", {
                  updateObject: updateObject
                }, "Transaction-Planner");

                updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user);
              });
              insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
              insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
              insertElement(_transactionPlanPart2, transactionPlanInput);
              insertElement(_transactionPlanPart2, transactionPlanButton);
            })();
          }

          if (sectionStart === 10) {
            _transactionPlanPartHeaderText2.textContent = "Paid In Full?";

            var _transactionPlanButton8 = document.createElement('button');

            _transactionPlanButton8.textContent = "Paid";

            _transactionPlanButton8.classList.add('button--extra-extra-small__transaction-plan-small');

            _transactionPlanButton8.classList.add('r__button--extra-extra-small__transaction-plan-small');

            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanButton8);
          }

          if (sectionStart === 11) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText2.textContent = "Status";
            _transactionPlanPartText2.textContent = "".concat(transaction.paidStatus);
            insertElement(_transactionPlanPart2, _transactionPlanPartHeader2);
            insertElement(_transactionPlanPartHeader2, _transactionPlanPartHeaderText2);
            insertElement(_transactionPlanPart2, _transactionPlanPartText2);
          }

          sectionStart++;
        }
      }

      if (transactionPlanCreation) {
        transactionPlanCreation.insertAdjacentElement('beforebegin', transactionPlan);
      }
    } // Decision if IS Debt Transaction


    if (transaction.account === "Debt") {
      var _transactionPlan = document.createElement('section');

      if (transaction.timingOptions.paymentCycle === "Bi-Monthly" || transaction.timingOptions.paymentCycle === "Bi-Annual") {
        _transactionPlan.classList.add('transaction-plan__alt-double');

        _transactionPlan.classList.add('r__transaction-plan__alt-double');

        numberOfSections = 14;

        while (sectionStart < numberOfSections) {
          // Initialize Variables For First Part
          var _transactionPlanPartHeader3 = document.createElement('header');

          var _transactionPlanPartHeaderText3 = document.createElement('p');

          var _transactionPlanPartText3 = document.createElement('p'); // Add Classes For First Part


          _transactionPlanPartHeader3.classList.add('transaction-plan__alt-double__part__header');

          _transactionPlanPartHeader3.classList.add('r__transaction-plan__alt-double__part__header');

          _transactionPlanPartHeaderText3.classList.add('transaction-plan__alt-double__part__header__text');

          _transactionPlanPartHeaderText3.classList.add('r__transaction-plan__alt-double__part__header__text');

          _transactionPlanPartText3.classList.add('transaction-plan__alt-double__part__text');

          _transactionPlanPartText3.classList.add('r__transaction-plan__alt-double__part__text'); // Add Content For First Part


          _transactionPlanPartHeaderText3.textContent = "Date";
          _transactionPlanPartText3.textContent = getTransactionPlanDate(transaction.date);

          var _transactionPlanPart3 = document.createElement('section');

          _transactionPlanPart3.classList.add("transaction-plan__alt-double__part");

          _transactionPlan.insertAdjacentElement('beforeend', _transactionPlanPart3);

          if (sectionStart === 0) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Account";
            _transactionPlanPartText3.textContent = "".concat(transaction.account);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Transaction Type";
            _transactionPlanPartText3.textContent = "".concat(transaction.subAccount);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Lender";
            _transactionPlanPartText3.textContent = "".concat(transaction.lender);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Transaction Name";
            _transactionPlanPartText3.textContent = "".concat(transaction.name);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Location";
            _transactionPlanPartText3.textContent = "".concat(transaction.location);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Amount";
            _transactionPlanPartText3.textContent = money.format(transaction.amount);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Due Date One";
            _transactionPlanPartText3.textContent = "".concat(getTransactionPlanDate(transaction.timingOptions.dueDates[0]));
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Due Date Two";
            _transactionPlanPartText3.textContent = "".concat(getTransactionPlanDate(transaction.timingOptions.dueDates[1]));
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Timing";
            _transactionPlanPartText3.textContent = "".concat(transaction.timingOptions.paymentCycle);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 10) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Amount Saved";
            _transactionPlanPartText3.textContent = money.format(transaction.amountSaved);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          if (sectionStart === 11) {
            (function () {
              // INSERT DOM ELEMENTS INTO FIRST PART
              _transactionPlanPartHeaderText3.textContent = "Apply Money";
              var transactionPlanInput = document.createElement('input');
              var transactionPlanButton = document.createElement('button');
              transactionPlanButton.textContent = "Apply";
              transactionPlanInput.classList.add('form__input--transaction-plan');
              transactionPlanInput.classList.add('r__form__input--transaction-plan');
              transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
              transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
              transactionPlanInput.type = 'number';
              transactionPlanInput.min = 0;
              transactionPlanInput.placeholder = '$0.00';
              transactionPlanButton.addEventListener('click', function (e) {
                console.log(transactionPlanInput.value, (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(transactionPlanInput.value));
                console.log(transactionPlanButton.parentElement.previousSibling);
                transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
                transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
                console.log(transaction.amountSaved);
                var updateObject = {
                  budgetId: budget._id,
                  userId: user._id
                };
                updateObject.transactions = {
                  recentTransactions: budget.transactions.recentTransactions,
                  plannedTransactions: transactionPlans
                };

                placeholderBudget._updateBudget("Update", "Apply Money", {
                  updateObject: updateObject
                }, "Transaction-Planner");

                updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user);
              });
              insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
              insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
              insertElement(_transactionPlanPart3, transactionPlanInput);
              insertElement(_transactionPlanPart3, transactionPlanButton);
            })();
          }

          if (sectionStart === 12) {
            _transactionPlanPartHeaderText3.textContent = "Paid In Full?";

            var _transactionPlanButton9 = document.createElement('button');

            _transactionPlanButton9.textContent = "Paid";

            _transactionPlanButton9.classList.add('button--extra-extra-small__transaction-plan-small');

            _transactionPlanButton9.classList.add('r__button--extra-extra-small__transaction-plan-small');

            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanButton9);
          }

          if (sectionStart === 13) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText3.textContent = "Status";
            _transactionPlanPartText3.textContent = "".concat(transaction.paidStatus);
            insertElement(_transactionPlanPart3, _transactionPlanPartHeader3);
            insertElement(_transactionPlanPartHeader3, _transactionPlanPartHeaderText3);
            insertElement(_transactionPlanPart3, _transactionPlanPartText3);
          }

          sectionStart++;
        }
      }

      if (transaction.timingOptions.paymentCycle !== "Bi-Monthly" && transaction.timingOptions.paymentCycle !== "Bi-Annual") {
        _transactionPlan.classList.add('transaction-plan__alt');

        _transactionPlan.classList.add('r__transaction-plan__alt');

        numberOfSections = 13;

        while (sectionStart < numberOfSections) {
          // Initialize Variables For First Part
          var _transactionPlanPartHeader4 = document.createElement('header');

          var _transactionPlanPartHeaderText4 = document.createElement('p');

          var _transactionPlanPartText4 = document.createElement('p'); // Add Classes For First Part


          _transactionPlanPartHeader4.classList.add('transaction-plan__alt__part__header');

          _transactionPlanPartHeader4.classList.add('r__transaction-plan__alt__part__header');

          _transactionPlanPartHeaderText4.classList.add('transaction-plan__alt__part__header__text');

          _transactionPlanPartHeaderText4.classList.add('r__transaction-plan__alt__part__header__text');

          _transactionPlanPartText4.classList.add('transaction-plan__alt__part__text');

          _transactionPlanPartText4.classList.add('r__transaction-plan__alt__part__text'); // Add Content For First Part


          _transactionPlanPartHeaderText4.textContent = "Date";
          _transactionPlanPartText4.textContent = getTransactionPlanDate(transaction.date);

          var _transactionPlanPart4 = document.createElement('section');

          _transactionPlanPart4.classList.add("transaction-plan__alt__part");

          _transactionPlan.insertAdjacentElement('beforeend', _transactionPlanPart4);

          if (sectionStart === 0) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Account";
            _transactionPlanPartText4.textContent = "".concat(transaction.account);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Transaction Type";
            _transactionPlanPartText4.textContent = "".concat(transaction.subAccount);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Lender";
            _transactionPlanPartText4.textContent = "".concat(transaction.lender);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Transaction Name";
            _transactionPlanPartText4.textContent = "".concat(transaction.name);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Location";
            _transactionPlanPartText4.textContent = "".concat(transaction.location);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Amount";
            _transactionPlanPartText4.textContent = money.format(transaction.amount);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Due Date One";
            _transactionPlanPartText4.textContent = "".concat(getTransactionPlanDate(transaction.timingOptions.dueDates[0]));
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Timing";
            _transactionPlanPartText4.textContent = "".concat(transaction.timingOptions.paymentCycle);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Amount Saved";
            _transactionPlanPartText4.textContent = money.format(transaction.amountSaved);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          if (sectionStart === 10) {
            (function () {
              // INSERT DOM ELEMENTS INTO FIRST PART
              _transactionPlanPartHeaderText4.textContent = "Apply Money";
              var transactionPlanInput = document.createElement('input');
              var transactionPlanButton = document.createElement('button');
              transactionPlanButton.textContent = "Apply";
              transactionPlanInput.classList.add('form__input--transaction-plan');
              transactionPlanInput.classList.add('r__form__input--transaction-plan');
              transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
              transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
              transactionPlanInput.type = 'number';
              transactionPlanInput.min = 0;
              transactionPlanInput.placeholder = '$0.00';
              transactionPlanButton.addEventListener('click', function (e) {
                console.log(transactionPlanInput.value, (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(transactionPlanInput.value));
                console.log(transactionPlanButton.parentElement.previousSibling);
                transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
                transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
                console.log(transaction.amountSaved);
                var updateObject = {
                  budgetId: budget._id,
                  userId: user._id
                };
                updateObject.transactions = {
                  recentTransactions: budget.transactions.recentTransactions,
                  plannedTransactions: transactionPlans
                };

                placeholderBudget._updateBudget("Update", "Apply Money", {
                  updateObject: updateObject
                }, "Transaction-Planner");

                updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user);
              });
              insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
              insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
              insertElement(_transactionPlanPart4, transactionPlanInput);
              insertElement(_transactionPlanPart4, transactionPlanButton);
            })();
          }

          if (sectionStart === 11) {
            _transactionPlanPartHeaderText4.textContent = "Paid In Full?";

            var _transactionPlanButton10 = document.createElement('button');

            _transactionPlanButton10.textContent = "Paid";

            _transactionPlanButton10.classList.add('button--extra-extra-small__transaction-plan-small');

            _transactionPlanButton10.classList.add('r__button--extra-extra-small__transaction-plan-small');

            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanButton10);
          }

          if (sectionStart === 12) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            _transactionPlanPartHeaderText4.textContent = "Status";
            _transactionPlanPartText4.textContent = "".concat(transaction.paidStatus);
            insertElement(_transactionPlanPart4, _transactionPlanPartHeader4);
            insertElement(_transactionPlanPartHeader4, _transactionPlanPartHeaderText4);
            insertElement(_transactionPlanPart4, _transactionPlanPartText4);
          }

          sectionStart++;
        }
      }

      if (transactionPlanCreation) {
        transactionPlanCreation.insertAdjacentElement('beforebegin', _transactionPlan);
      }
    }
  });
};

var setupTransactionPlanning = function setupTransactionPlanning(budget, placeholderBudget, user) {
  var transactionPlanCreationContainer = document.querySelector('.transaction-plan-creation');
  var transactionRows = document.querySelectorAll('.form__row--transaction');
  var expenseTransactionOptionsArray = [];
  var savingsTransactionOptionsArray = [];
  var debtTransactionOptionsArray = [];
  var surplusTransactionOptionsArray = [];
  var commonTransactionOptionsArray = [expenseTransactionOptionsArray, savingsTransactionOptionsArray, debtTransactionOptionsArray, surplusTransactionOptionsArray];
  var accountOptions = document.querySelectorAll('.form__select__option');
  var transactionPlanAccountOptions = [accountOptions[0], accountOptions[1], accountOptions[2], accountOptions[3]];
  var transactionPlanSections = document.querySelectorAll('.form__section--transaction-plan');
  var accountSelectionContainers = document.querySelectorAll('.form__select--accounts');
  var formSelectSections = document.querySelectorAll('.form__section--select');
  displayExistingTransactionPlans(budget, placeholderBudget, user);
  var submitPlanButton = document.querySelector('.button--extra-extra-small__transaction-plan');
  commonTransactionOptionsArray.forEach(function (array) {
    pushIntoArray([transactionPlanSections[4], formSelectSections[2], transactionPlanSections[0], transactionPlanSections[1], transactionPlanSections[2], transactionPlanSections[3], transactionPlanSections[6], formSelectSections[1], accountSelectionContainers[5]], array);
  });
  pushIntoArray([accountSelectionContainers[1], transactionPlanSections[5]], expenseTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[2], transactionPlanSections[5]], savingsTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[3], formSelectSections[3], accountSelectionContainers[6]], debtTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[4]], surplusTransactionOptionsArray);
  transactionPlanAccountOptions.forEach(function (ao) {
    if (ao) {
      ao.addEventListener('click', function (e) {
        if (ao.value === "Expense Fund") {
          showTransactionPlanOptions(expenseTransactionOptionsArray, commonTransactionOptionsArray);

          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }

        if (ao.value === "Savings Fund") {
          showTransactionPlanOptions(savingsTransactionOptionsArray, commonTransactionOptionsArray);

          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }

        if (ao.value === "Debt") {
          showTransactionPlanOptions(debtTransactionOptionsArray, commonTransactionOptionsArray);

          if (transactionPlanCreationContainer) {
            if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
              transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
            }
          }
        }

        if (ao.value === "Surplus") {
          showTransactionPlanOptions(surplusTransactionOptionsArray, commonTransactionOptionsArray);

          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }
      });
    }
  });
  var expenseAppliedTotal = 0;
  var savingsAppliedTotal = 0;
  var debtAppliedTotal = 0;
  var surplusAppliedTotal = 0;
  budget.transactions.plannedTransactions.forEach(function (transaction, i) {
    if (transaction.account === "Expense Fund") {
      expenseAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Savings Fund") {
      savingsAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Debt") {
      debtAppliedTotal += transaction.amountSaved;
    }

    if (transaction.account === "Surplus") {
      surplusAppliedTotal += transaction.amountSaved;
    }
  });
  var smallShortTransactionPlanInputs = document.querySelectorAll('.form__input--small-short');

  if (smallShortTransactionPlanInputs[0]) {
    if (smallShortTransactionPlanInputs[2]) {
      var surplusSwitch = smallShortTransactionPlanInputs[2].closest('.form__section--transaction-plan').nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling;
      var surplusSwitchIcon = surplusSwitch.firstChild.nextSibling.firstChild.nextSibling;

      if (surplusSwitch) {
        surplusSwitch.addEventListener('click', function (e) {
          e.preventDefault();
          surplusSwitch.classList.toggle('surplus-container__switch--switched');
          surplusSwitchIcon.classList.toggle('fa-times');
          surplusSwitchIcon.classList.toggle('fa-check');
        });
      }

      if (submitPlanButton) {
        submitPlanButton.addEventListener('click', function (e) {
          createPlannedTransaction(accountSelectionContainers[0], budget, placeholderBudget, user, transactionPlanCreationContainer);
          surplusSwitch.classList.remove('surplus-container__switch--switched');
          surplusSwitchIcon.classList.add('fa-times');
          surplusSwitchIcon.classList.remove('fa-check');
          transactionPlanCreationContainer.classList.add('closed');
          transactionPlanCreationContainer.classList.remove('open');
        });
      }

      var money = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
      var appliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__applied-container__applied');
      var unAppliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__un-applied-container__un-applied'); // APPLIED TOTALS

      appliedMoney[0].textContent = money.format(expenseAppliedTotal);
      appliedMoney[1].textContent = money.format(savingsAppliedTotal);
      appliedMoney[2].textContent = money.format(debtAppliedTotal);
      appliedMoney[3].textContent = money.format(surplusAppliedTotal); // UNAPPLIED TOTALS

      unAppliedMoney[0].textContent = money.format(budget.accounts.expenseFund.amount - expenseAppliedTotal);
      unAppliedMoney[1].textContent = money.format(budget.accounts.savingsFund.amount - savingsAppliedTotal);
      unAppliedMoney[2].textContent = money.format(budget.accounts.debt.amount - debtAppliedTotal);
      unAppliedMoney[3].textContent = money.format(budget.accounts.surplus.amount - surplusAppliedTotal); // transaction-plan__part__text
    }
  }
};

var startPlanning = function startPlanning(budget, placeholderBudget, user) {
  var transactionPlanCreationContainer = document.querySelector('.transaction-plan-creation');
  transactionPlanCreationContainer.classList.toggle('closed');
  transactionPlanCreationContainer.classList.toggle('open');
  var transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  transactionPlanSelects[5].value = transactionPlanSelects[5].firstChild.nextSibling.value;
};

var _watchTransactionPlanner = function _watchTransactionPlanner(budget, placeholderBudget, user) {
  console.log("Planning...");
  var borderlessButtons = document.querySelectorAll('.button--borderless');
  var startPlanningButton = borderlessButtons[2];
  var accountSelection = document.querySelectorAll('.form__select--accounts')[0];

  if (startPlanningButton) {
    startPlanningButton.addEventListener('click', function (e) {
      e.preventDefault();
      startPlanning(budget, placeholderBudget, user);
    });
  }

  setupTransactionPlanning(budget, placeholderBudget, user);
  var altMediumInputs = document.querySelectorAll('.form__input--medium__alt');
  var currentDate = altMediumInputs[0];
  if (currentDate) currentDate.value = new Date();
};

var _watchIncomeAllocation = function _watchIncomeAllocation(budget, placeholderBudget, user) {
  var incomeAllocationContainer = document.querySelector('.container--allocate-income');
  var unAllocatedTotal = document.querySelector('.un-allocated-account-total');
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  if (incomeAllocationContainer) {
    console.log("Allocating...");
    unAllocatedTotal.textContent = money.format(unAllocatedTotal.textContent);
    var allocateIncomeButton = document.querySelector('.button--small-purple');
    allocateIncomeButton.addEventListener('click', function (e) {
      e.preventDefault(); // INITIALIZE NEEDED VARIABLES

      var unAllocatedAmount = Number(unAllocatedTotal.textContent.split('$')[1].split(',').join(''));
      var totalAllocationAmount = 0; // SELECT INPUTS FOR INCOME ALLOCATION

      var allocationInputs = document.querySelectorAll('.form__input'); // GET TOTAL AMOUNT OF ALL INPUTS

      allocationInputs.forEach(function (ai, i) {
        // ADD VALUE TO CURRENT TOTAL
        totalAllocationAmount += Number(ai.value);
      }); // DOUBLE CHECK TO MAKE SURE ALLOCATED AMOUNT DOES NOT EXCEED UN-ALLOCATED INCOME

      totalAllocationAmount <= unAllocatedAmount ? unAllocatedTotal.textContent = money.format(unAllocatedAmount - totalAllocationAmount) : alert("You do not have all that money! Please lower one of your accounts amounts!"); // INITIALIZE SEPARATE ACCOUNTS ALLOCATED TOTALS

      var monthlyBudgetAllocation, emergencyFundAllocation, savingsFundAllocation, expenseFundAllocation, debtAllocation, investmentFundAllocation; // GET EACH SEPARATE ACCOUNTS ALLOCATED INCOME

      monthlyBudgetAllocation = allocationInputs[0].value;
      emergencyFundAllocation = allocationInputs[1].value;
      savingsFundAllocation = allocationInputs[2].value;
      expenseFundAllocation = allocationInputs[3].value;
      debtAllocation = allocationInputs[4].value;
      investmentFundAllocation = allocationInputs[5].value; // DOUBLE CHECK IF IT IS A NUMBER

      if (isNaN(monthlyBudgetAllocation)) monthlyBudgetAllocation = 0;
      if (isNaN(emergencyFundAllocation)) emergencyFundAllocation = 0;
      if (isNaN(savingsFundAllocation)) savingsFundAllocation = 0;
      if (isNaN(expenseFundAllocation)) expenseFundAllocation = 0;
      if (isNaN(debtAllocation)) debtAllocation = 0;
      if (isNaN(investmentFundAllocation)) investmentFundAllocation = 0;
      var updateObject = {
        budgetId: budget._id,
        userId: user._id,
        user: user,
        accounts: {
          unAllocated: {
            amount: Number(unAllocatedTotal.textContent.split('$')[1].split(',').join(''))
          },
          monthlyBudget: {
            amount: Number(monthlyBudgetAllocation) + budget.accounts.monthlyBudget.amount
          },
          emergencyFund: {
            emergencyFundGoal: placeholderBudget.accounts.emergencyFund.emergencyFundGoal,
            emergencyGoalMeasurement: placeholderBudget.accounts.emergencyFund.emergencyGoalMeasurement,
            emergencyFundGoalTiming: placeholderBudget.accounts.emergencyFund.emergencyFundGoalTiming,
            amount: Number(emergencyFundAllocation) + budget.accounts.emergencyFund.amount
          },
          savingsFund: {
            savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
            savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
            amount: Number(savingsFundAllocation) + budget.accounts.savingsFund.amount
          },
          expenseFund: {
            amount: Number(expenseFundAllocation) + budget.accounts.expenseFund.amount
          },
          surplus: {
            amount: placeholderBudget.accounts.surplus.amount
          },
          investmentFund: {
            investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
            investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
            amount: Number(investmentFundAllocation) + budget.accounts.investmentFund.amount
          },
          debt: {
            debtAmount: placeholderBudget.accounts.debt.debtAmount,
            amount: Number(debtAllocation) + budget.accounts.debt.amount
          }
        }
      };

      placeholderBudget._updateBudget("Update", "Allocate Income", {
        updateObject: updateObject
      }, "Allocate-Income");

      allocationInputs.forEach(function (ai) {
        ai.value = '';
      });
    });
  }
};

var _watchForBudgetCategoryUpdates = function _watchForBudgetCategoryUpdates(budget, placeholderBudget, user) {
  var mainCategoryDeleteButton = document.querySelector('.button--medium-main-category-deletion');
  var categoryIcon = document.querySelector('.main-category-display__category-information__icon');
  var categoryTitle = document.querySelector('.main-category-display__category-information__text');
  var categoryIndex, index;
  var budgetMainCategoryLength = placeholderBudget.mainCategories.length;
  var subCategories = document.querySelectorAll('.sub-category');
  mainCategoryDeleteButton.addEventListener('click', function (e) {
    e.preventDefault();
    categoryIcon.classList.remove(categoryIcon.classList[3]);
    var mainCategories = document.querySelectorAll('.main-category__alt');
    placeholderBudget.mainCategories.forEach(function (mc) {
      if (mc.title === categoryTitle.textContent) {
        categoryIndex = placeholderBudget.mainCategories.indexOf(mc);
        mainCategories[categoryIndex].remove();
        placeholderBudget.mainCategories = placeholderBudget.mainCategories.filter(function (category) {
          if (category.title !== mc.title) return category;
        });
      }
    });
    mainCategories = document.querySelectorAll('.main-category__alt');
    mainCategories.forEach(function (mc, i) {
      mc.dataset.category = i;
    });

    if (categoryIndex === 0) {
      // GLITCH: CLICKING THE MAIN CATEGORIES ON THE LEFT MAKES ALL SUB CATEGORIES GO WONKY.
      subCategories.forEach(function (sc) {
        if (Number(sc.dataset.category) === categoryIndex) {
          sc.remove();
        }

        if (sc.dataset.category > categoryIndex) {
          sc.dataset.category = sc.dataset.category - 1;
        }
      }); // CODE BELOW COULD BE PUT INTO A FUNCTION TO FOLLOW D.R.Y. PRINCIPLE.

      if (placeholderBudget.mainCategories[categoryIndex]) {
        categoryIcon.classList.add(placeholderBudget.mainCategories[categoryIndex].icon);
        categoryTitle.textContent = placeholderBudget.mainCategories[categoryIndex].title;
      }

      subCategories.forEach(function (sc, i) {
        sc.classList.add('closed');
        sc.classList.remove('open');

        if (sc.dataset.category === "".concat(categoryIndex)) {
          sc.classList.remove('closed');
          sc.classList.add('open');
        }
      });
      budgetMainCategoryLength = budgetMainCategoryLength - 1;
    }

    if (categoryIndex > 0 && categoryIndex < placeholderBudget.mainCategories.length) {
      subCategories.forEach(function (sc) {
        if (Number(sc.dataset.category) === categoryIndex) {
          sc.remove();
        }

        if (sc.dataset.category > categoryIndex) {
          sc.dataset.category = sc.dataset.category - 1;
        }
      });
      categoryIndex--;
      categoryIcon.classList.add(placeholderBudget.mainCategories[categoryIndex].icon);
      categoryTitle.textContent = placeholderBudget.mainCategories[categoryIndex].title;
      subCategories.forEach(function (sc, i) {
        sc.classList.add('closed');
        sc.classList.remove('open');

        if (sc.dataset.category === "".concat(categoryIndex)) {
          sc.classList.remove('closed');
          sc.classList.add('open');
        }
      });
      budgetMainCategoryLength = budgetMainCategoryLength - 1;
    }

    if (categoryIndex === budgetMainCategoryLength - 1) {
      subCategories.forEach(function (sc) {
        if (Number(sc.dataset.category) === categoryIndex) {
          sc.remove();
        }
      });

      if (placeholderBudget.mainCategories.length === 0) {
        categoryTitle.textContent = "";
      }

      categoryIndex--;

      if (placeholderBudget.mainCategories[categoryIndex]) {
        categoryIcon.classList.add(placeholderBudget.mainCategories[categoryIndex].icon);
        categoryTitle.textContent = placeholderBudget.mainCategories[categoryIndex].title;
      }

      subCategories.forEach(function (sc, i) {
        sc.classList.add('closed');
        sc.classList.remove('open');

        if (sc.dataset.category === "".concat(categoryIndex)) {
          sc.classList.remove('closed');
          sc.classList.add('open');
        }
      });
      budgetMainCategoryLength = budgetMainCategoryLength - 1;
    }
  }); // ADJUST: WE NEED TO MAKE SURE IT IS POSSIBLE FOR THE EXISTING SUB CATEGORIES TO BE REMOVED AS WELL AS MADE INTO SURPLUS AS WELL, IF NEEDED.

  subCategories.forEach(function (sc, i) {
    var surplusSwitch = sc.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling;
    surplusSwitch.addEventListener('click', function (e) {
      e.preventDefault(); // GET TARGET OF CLICK

      var clicked = e.target;
      surplusSwitch.classList.toggle('sub-category-controller__surplus-container__switch__alt--switched');
      surplusSwitch.firstChild.firstChild.classList.toggle('fa-times');
      surplusSwitch.firstChild.firstChild.classList.toggle('fa-check');
      var categoryNumber = Number(clicked.closest('.sub-category').dataset.category);
      placeholderBudget.mainCategories.forEach(function (mc, i) {
        if (mc.title === categoryTitle.textContent) index = i;
      });

      var subCategoriesArray = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(document.querySelectorAll('.sub-category'));

      var subArray = subCategoriesArray.filter(function (sc, i) {
        return Number(sc.dataset.category) === index; // This is the Main Category's Index.
      });

      placeholderBudget._updateSubCategory("Creation", "Surplus", {
        mainIndex: categoryNumber,
        subIndex: subArray.indexOf(clicked.closest('.sub-category'))
      });
    });
    var surplusCategoryTrashIcon = surplusSwitch.parentElement.nextSibling;
    surplusCategoryTrashIcon.addEventListener('click', function (e) {
      e.preventDefault();
      var clicked = e.target;
      var selectedSubCategory = clicked.closest('.sub-category');
      placeholderBudget.mainCategories.forEach(function (mc, i) {
        if (mc.title === categoryTitle.textContent) index = i;
      }); /////////////////////////////
      // DELETE SUB CATEGORY

      var subCategoriesArray = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(document.querySelectorAll('.sub-category'));

      var subArray = subCategoriesArray.filter(function (sc, i) {
        return Number(sc.dataset.category) === index;
      });
      var categoryNumber = Number(clicked.closest('.sub-category').dataset.category); /////////////////////////////
      // REMOVE DOM ELEMENT

      selectedSubCategory.remove();

      placeholderBudget._deleteSubCategory(categoryNumber, subArray.indexOf(selectedSubCategory));
    });
  });
  var updateCategoryButton = document.querySelectorAll('.button--large__thin')[0];
  updateCategoryButton.addEventListener('click', function (e) {
    e.preventDefault();

    placeholderBudget._updateBudget("Update", "Manage Categories", {
      updateObject: {
        budgetMainCategories: budget.mainCategories,
        budgetId: budget._id,
        userId: user._id,
        user: user,
        mainCategories: placeholderBudget.mainCategories
      }
    }, "Manage-Categories");
  });
};

var _watchManageCategories = function _watchManageCategories(budget, placeholderBudget, user) {
  var mediumContainers = document.querySelectorAll('.container--medium');
  var manageCategoryContainer = mediumContainers[0];
  var icon, index;
  var subCategoryIndex = 0;

  if (manageCategoryContainer) {
    _Budget_Categories__WEBPACK_IMPORTED_MODULE_9__.createCategories(icon, index);

    _Budget_Categories__WEBPACK_IMPORTED_MODULE_9__._watchCreateCategoryButton(icon, placeholderBudget);

    _Budget_Creation__WEBPACK_IMPORTED_MODULE_8__.setupSubCategoryCreation(placeholderBudget, subCategoryIndex);

    _watchForMainCategorySelection(budget, placeholderBudget, user);

    _watchForBudgetCategoryUpdates(budget, placeholderBudget, user);
  }
};

var _watchEditCategoryGoals = function _watchEditCategoryGoals(budget, placeholderBudget, user) {
  var editCategoryGoalsContainer = document.querySelectorAll('.container--large')[0];

  if (editCategoryGoalsContainer) {
    var subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    var timingFunctionContainer = document.querySelector('.timing-container');
    var editCategoryGoalsSubmit = document.querySelector('.button--large__thin'); // On load, retrieve the proper timings and dates for the correct sub-categories.

    var mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
    var allCategories = [];
    placeholderBudget.mainCategories.forEach(function (mct, i) {
      budget.mainCategories[i].subCategories.forEach(function (sc, i) {
        allCategories.push(sc);
      });
    });
    allCategories.forEach(function (c, i) {
      if (c.timingOptions.paymentCycle) {
        var timing = getSubCategoryTiming(budget, c);

        if (subCategories[i]) {
          if (subCategories[i].firstChild.nextSibling.firstChild.nextSibling) subCategories[i].firstChild.nextSibling.firstChild.nextSibling.textContent = timing;
        }
      }
    });
    _Budget_Creation__WEBPACK_IMPORTED_MODULE_8__.setupTimingFunctionContainer(timingFunctionContainer);
    var clickedItem, selectedTiming;
    var subCategoryIndex = 0;
    _Budget_Creation__WEBPACK_IMPORTED_MODULE_8__.watchForSettingTiming(placeholderBudget, subCategoryIndex, clickedItem, selectedTiming, "Full Budget");
    var money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    var individualPayments = document.querySelectorAll('.individual-payment');
    var overallBudget = document.querySelectorAll('.budget-single-goal-summary__amount');
    individualPayments.forEach(function (ip, i) {
      var overallSpent = overallBudget[1];
      var overallRemaining = overallBudget[2];
      var overallPercentageSpent = overallBudget[3];
      var total = getOverallBudget(subCategories, overallBudget[0]);
      var part = getOverallSpent(subCategories, overallSpent);

      if (total - part < 0) {
        overallRemaining.classList.add('negative');
        overallRemaining.classList.remove('positive');
      }

      if (total - part === 0) {
        overallRemaining.classList.remove('positive');
        overallRemaining.classList.remove('negative');
      }

      if (total - part > 0) {
        overallRemaining.classList.add('positive');
        overallRemaining.classList.remove('negative');
      }

      var remainingValue = ip.closest('section').nextSibling.nextSibling.firstChild;

      if (Number(remainingValue.textContent.split('$')[1]) > 0) {
        remainingValue.classList.add('positive');
        remainingValue.classList.remove('negative');
      }

      if (Number(remainingValue.textContent.split('$')[1]) === 0) {
        remainingValue.classList.remove('positive');
        remainingValue.classList.remove('negative');
      }

      if (Number(remainingValue.textContent.split('$')[1]) < 0) {
        remainingValue.classList.remove('positive');
        remainingValue.classList.add('negative');
      }

      ip.addEventListener('keyup', function (e) {
        e.preventDefault();
        var spent = ip.closest('section').nextSibling.firstChild;
        var remaining = ip.closest('section').nextSibling.nextSibling.firstChild;
        var percentageSpent = ip.closest('section').nextSibling.nextSibling.nextSibling.firstChild;
        var total = getOverallBudget(subCategories, overallBudget[0]);
        var part = getOverallSpent(subCategories, overallSpent);
        var percentage = getOverallPercentageSpent(total, part);
        overallBudget[0].textContent = money.format(getOverallBudget(subCategories, overallBudget[0]));
        overallSpent.textContent = money.format(part);
        overallRemaining.textContent = money.format(total - part);
        overallPercentageSpent.textContent = "".concat(percentage, "%");
        spent.textContent = money.format(spent.textContent.split('$')[1]);
        remaining.textContent = money.format(ip.value - Number(spent.textContent.split('$')[1]));

        if (total - part < 0) {
          overallRemaining.classList.add('negative');
          overallRemaining.classList.remove('positive');
        }

        if (total - part === 0) {
          overallRemaining.classList.remove('positive');
          overallRemaining.classList.remove('negative');
        }

        if (total - part > 0) {
          overallRemaining.classList.add('positive');
          overallRemaining.classList.remove('negative');
        }

        if (!Number(remaining.textContent.startsWith('-'))) {
          remaining.classList.add('positive');
          remaining.classList.remove('negative');
        }

        if (Number(remaining.textContent.split('$')[1]) === 0) {
          remaining.classList.remove('positive');
          remaining.classList.remove('negative');
        }

        if (Number(remaining.textContent.startsWith('-'))) {
          remaining.classList.remove('positive');
          remaining.classList.add('negative');
        }

        percentageSpent.textContent = "".concat(getSinglePercentageSpent(Number(spent.textContent.split('$')[1]), ip.value), "%");
      });
      ip.addEventListener('blur', function (e) {
        e.preventDefault();
        ip.value = Number(ip.value).toFixed(2);
      });
    });

    if (editCategoryGoalsSubmit) {
      editCategoryGoalsSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        var updateObject = {};
        updateObject.budgetId = budget._id;
        updateObject.userId = user._id;
        updateObject.mainCategories = [];
        var mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
        var mainCategoryIndex = 0;
        var subCategoryIndex = 0;
        var emptyArray = [];
        var temporaryObject;
        budget.mainCategories.forEach(function (bmc, i) {
          temporaryObject = Object.fromEntries([["title", placeholderBudget.mainCategories[i].title], ["icon", placeholderBudget.mainCategories[i].icon], ["subCategories", emptyArray]]);
          updateObject.mainCategories[i] = temporaryObject;
          var tempArray = Array.from(document.querySelectorAll(".sub-category-display__sub-category[data-subcategory=\"".concat(i, "\"]")));
          var mainCategoryIndex = i;
          tempArray.forEach(function (temp, i) {
            var title = temp.firstChild.nextSibling.firstChild.textContent;
            var goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
            var amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            var amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            var percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
            var timingOptions = bmc.subCategories[i].timingOptions;
            temporaryObject.subCategories.push(Object.fromEntries([["title", title], ["goalAmount", goalAmount], ["amountSpent", amountSpent], ["amountRemaining", amountRemaining], ["percentageSpent", percentageSpent], ["timingOptions", timingOptions]]));

            if (temporaryObject.subCategories.length === tempArray.length) {
              mainCategoryIndex++;
              if (temporaryObject === undefined) return;
              temporaryObject.subCategories = [];
              return mainCategoryIndex;
            }

            if (i === tempArray.length) {
              mainCategoryIndex++;
            }
          });

          if (updateObject.mainCategories.length === budget.mainCategories.length) {
            return mainCategoryIndex = 0;
          }
        });
        updateObject.mainCategories.forEach(function (mc, i) {
          // Maintain.fillSubCategoryArray(updateObject, i);
          var mainCategoryIndex = i;
          var tempArray = Array.from(document.querySelectorAll(".sub-category-display__sub-category[data-subcategory=\"".concat(i, "\"]")));
          tempArray.forEach(function (temp, i) {
            var title = temp.firstChild.nextSibling.firstChild.textContent;
            var goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
            var amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            var amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            var percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
            var timingOptions = budget.mainCategories[mainCategoryIndex].subCategories[i].timingOptions;
            updateObject.mainCategories[mainCategoryIndex].subCategories.push(Object.fromEntries([["title", title], ["goalAmount", goalAmount], ["amountSpent", amountSpent], ["amountRemaining", amountRemaining], ["percentageSpent", percentageSpent], ["timingOptions", timingOptions]]));

            if (updateObject.mainCategories[mainCategoryIndex].subCategories.length === tempArray.length) {
              mainCategoryIndex++;
              if (updateObject.mainCategories[mainCategoryIndex] === undefined) return;
              updateObject.mainCategories[mainCategoryIndex].subCategories = [];
              return mainCategoryIndex;
            }

            if (i === tempArray.length) {
              mainCategoryIndex++;
            }
          });
        });

        placeholderBudget._updateBudget("Update", "Edit Category Goals", {
          budgetId: budget._id,
          budgetMainCategories: budget.mainCategories,
          userId: user._id,
          user: user,
          updateObject: updateObject
        }, "Edit-Category-Goals");
      });
    }
  }
};

var getTithing = function getTithing(budget, user, currentTithingSetting) {
  var tithingSetting;
  var tithing = {};

  if (tithingSetting === undefined || tithingSetting !== '' || tithingSetting === null) {
    tithingSetting = currentTithingSetting;
  }

  tithing.tithingSetting = currentTithingSetting;
  tithing.amount = budget.accounts.tithing.amount;
  return tithing;
};

var getEmergencyFund = function getEmergencyFund(budget, emergencySetting) {
  var emergencyFundGoal, emergencyFundGoalTiming;
  var emergencyFund = {};
  emergencyFund.emergencyGoalMeasurement = emergencySetting;

  if (emergencySetting === "Length Of Time") {
    emergencyFundGoal = Number(document.querySelector('.form__input--half-left').value);
    emergencyFundGoalTiming = document.querySelector('.form__select--half-right').value;
    if (emergencyFundGoal === '' || emergencyFundGoal === undefined || emergencyFundGoal === null) emergencyFundGoal = budget.accounts.emergencyFund.emergencyFundGoal;
    if (emergencyFundGoalTiming === '' || emergencyFundGoalTiming === undefined || emergencyFundGoalTiming === null) emergencyFundGoalTiming = budget.accounts.emergencyFund.emergencyFundGoalTiming;
    emergencyFund.emergencyGoalMeasurement = emergencySetting;
    emergencyFund.emergencyFundGoal = emergencyFundGoal;
    emergencyFund.emergencyFundGoalTiming = emergencyFundGoalTiming;
    emergencyFund.amount = budget.accounts.emergencyFund.amount;
    return emergencyFund;
  }

  if (emergencySetting === "Total Amount") {
    emergencyFund.emergencyFundGoal = Number(document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__input').value);
  }

  return emergencyFund;
};

var getInvestmentFund = function getInvestmentFund(budget) {
  var budgetInputs = document.querySelectorAll('.form__input--small-thin');
  var investmentFund = {};
  var investmentGoal = Number(budgetInputs[0].value);
  var investmentPercentage = Number(budgetInputs[1].value);
  if (investmentGoal === '' || investmentGoal === undefined || investmentGoal === null) investmentGoal = budget.accounts.investmentFund.investmentGoal;
  if (investmentPercentage === '' || investmentPercentage === undefined || investmentPercentage === null) investmentPercentage = budget.accounts.investmentFund.investmentPercentage;
  investmentFund.investmentGoal = investmentGoal;
  investmentFund.investmentPercentage = investmentPercentage / 100;
  investmentFund.amount = budget.accounts.investmentFund.amount;
  return investmentFund;
};

var getSavingsFund = function getSavingsFund(budget) {
  var budgetInputs = document.querySelectorAll('.form__input--small-thin');
  var savingsFund = {};
  var savingsGoal = Number(budgetInputs[0].value);
  var savingsPercentage = Number(budgetInputs[1].value);
  if (savingsGoal === '' || savingsGoal === undefined || savingsGoal === null) savingsGoal = budget.accounts.savingsFund.savingsGoal;
  if (savingsPercentage === '' || savingsPercentage === undefined || savingsPercentage === null) savingsPercentage = budget.accounts.savingsFund.savingsPercentage;
  savingsFund.savingsGoal = savingsGoal;
  savingsFund.savingsPercentage = savingsPercentage / 100;
  savingsFund.amount = budget.accounts.savingsFund.amount;
  return savingsFund;
};

var getBudgetName = function getBudgetName(budget) {
  var budgetInputs = document.querySelectorAll('.form__input--small-thin__placeholder-shown');
  var budgetName = budgetInputs[0].value;
  if (budgetName === '') budgetName = budget.name;
  return budgetName;
};

var compileBudgetManagementUpdates = function compileBudgetManagementUpdates(emergencySetting, currentTithingSetting, budget, placeholderBudget, user) {
  /*
    Quick note here...,
     Building the update object outside of a method is alright, however, how this really should go down is to update the placeholder budget first.
     Then, after the place holder budget is updated within the limits of the current page, there should be an object that is built based off of what CAN be updated on that page.
    For the Budget Management Page, that would be the budget's name and the budget's accounts.  So, sending an object with THAT information would be most beneficial.
    Another and final example for now would be the edit category goals page be fore changing the timing, goals, etc... on the placeholder budget and sending the whole main categories array
    to the update functionality in the backend to update that budget that way.
   */
  // GET BUDGET NAME
  var budgetName = getBudgetName(budget); // The methods below are returning the objects of these accounts.  They are NOT returning the values themselves.

  var savingsFund = getSavingsFund(budget);
  var investmentFund = getInvestmentFund(budget);
  var emergencyFund = getEmergencyFund(budget, emergencySetting);
  var tithing;

  if (user.latterDaySaint === true) {
    tithing = getTithing(budget, user, currentTithingSetting);

    var name = placeholderBudget._addName(budgetName);

    placeholderBudget._updateBudget("Update", "Budget Management", {
      budgetId: budget._id,
      userId: user._id,
      user: user,
      name: name,
      unAllocatedAmount: placeholderBudget.accounts.unAllocated.amount,
      monthlyBudgetAmount: placeholderBudget.accounts.monthlyBudget.amount,
      emergencyFund: emergencyFund,
      savingsFund: savingsFund,
      expenseFundAmount: placeholderBudget.accounts.expenseFund.amount,
      surplusAmount: placeholderBudget.accounts.surplus.amount,
      investmentFund: investmentFund,
      debtAmount: placeholderBudget.accounts.debt.amount,
      debtTotal: Number(placeholderBudget.accounts.debt.debtAmount),
      tithing: tithing,
      updateObject: {}
    }, "Budget-Management");
  }

  if (user.latterDaySaint === false) {
    var _name = placeholderBudget._addName(budgetName);

    placeholderBudget._updateBudget("Update", "Budget Management", {
      budgetId: budget._id,
      userId: user._id,
      user: user,
      name: _name,
      unAllocatedAmount: placeholderBudget.accounts.unAllocated.amount,
      monthlyBudgetAmount: placeholderBudget.accounts.monthlyBudget.amount,
      emergencyFund: emergencyFund,
      savingsFund: savingsFund,
      expenseFundamount: placeholderBudget.accounts.expenseFund.amount,
      surplusAmount: placeholderBudget.accounts.surplus.amount,
      investmentFund: investmentFund,
      debtAmount: placeholderBudget.accounts.debt.amount,
      debtTotal: Number(placeholderBudget.accounts.debt.debtAmount),
      updateObject: {}
    }, "Budget-Management");
  }
};

var changeEmergencyInput = function changeEmergencyInput(array, setting) {
  if (setting === "Length Of Time") {
    array.forEach(function (eSetting) {
      eSetting.classList.remove('closed');
      eSetting.classList.remove('open');
    });
    array[0].classList.add('open');
    array[1].classList.add('closed');
  }

  if (setting === "Total Amount") {
    array.forEach(function (eSetting) {
      eSetting.classList.remove('closed');
      eSetting.classList.remove('open');
    });
    array[1].classList.add('open');
    array[0].classList.add('closed');
  }
};

var _setupBudgetManagement = function _setupBudgetManagement(budget, placeholderBudget, user) {
  var budgetNameDisplay = document.querySelector('.form--extra-small__budget-name-display');
  var budgetNameInput = document.querySelectorAll('.form__input--small-thin__placeholder-shown')[0];

  if (window.location.pathname.split('/')[6] === "Budget-Management") {
    var invisibleCheckboxes = document.querySelectorAll('.form__input--invisible-checkbox');

    if (budgetNameInput) {
      budgetNameInput.addEventListener('keyup', function (e) {
        e.preventDefault();
        budgetNameDisplay.textContent = budgetNameInput.value;
      });
    }

    var emergencyFundSettings = document.querySelectorAll('.form__label--checkbox-container');
    var emergencySetting;
    var emergencySelectionContainer = document.querySelector('.form__section--small-thin');
    var smallThinInputs = document.querySelectorAll('.form__input--small-thin');
    var emergencyTotalInput = document.querySelectorAll('.form__input--small-thin__placeholder-shown')[1];
    var emergencySettings = [emergencySelectionContainer, emergencyTotalInput];
    emergencySettings.forEach(function (eSetting) {
      return eSetting.classList.remove('visible');
    });

    if (budget.accounts.emergencyFund.emergencyGoalMeasurement === "Length Of Time") {
      emergencySettings.forEach(function (es) {
        es.classList.add('closed');
        es.classList.remove('open');
      });
      emergencySettings[0].classList.remove('closed');
      emergencySettings[0].classList.add('open');
    }

    if (budget.accounts.emergencyFund.emergencyGoalMeasurement === "Total Amount") {
      emergencySettings.forEach(function (es) {
        es.classList.add('closed');
        es.classList.remove('open');
      });
      emergencySettings[1].classList.remove('closed');
      emergencySettings[1].classList.add('open');
    }

    emergencyFundSettings.forEach(function (setting) {
      setting.classList.remove('checked');
      if (setting.textContent === budget.accounts.emergencyFund.emergencyGoalMeasurement) setting.classList.toggle('checked');
      emergencySetting = budget.accounts.emergencyFund.emergencyGoalMeasurement;
      setting.addEventListener('click', function (e) {
        e.preventDefault();
        emergencyFundSettings.forEach(function (es) {
          return es.classList.remove('checked');
        });
        setting.classList.toggle('checked');
        emergencySetting = setting.textContent;
        changeEmergencyInput(emergencySettings, emergencySetting, budget);
      });
    });
    var tithingCheckboxes = [invisibleCheckboxes[2], invisibleCheckboxes[3], invisibleCheckboxes[4]];
    var currentTithingSetting;
    var budgetManagementSubmitButtons = document.querySelectorAll('.button--extra-extra-small');
    var wideBudgetManagementSubmitButtons = document.querySelectorAll('.button--extra-extra-small__wide');
    var budgetNameSubmit = budgetManagementSubmitButtons[0];
    var savingsGoalSubmit = budgetManagementSubmitButtons[1];
    var investmentGoalSubmit = budgetManagementSubmitButtons[2];
    var emergencyGoalSubmit = budgetManagementSubmitButtons[3];
    var tithingSettingSubmit = budgetManagementSubmitButtons[4];
    var updateSubmitButtons = [budgetNameSubmit, savingsGoalSubmit, investmentGoalSubmit, emergencyGoalSubmit];

    if (user.latterDaySaint === true) {
      updateSubmitButtons.push(tithingSettingSubmit);
    }

    updateSubmitButtons.forEach(function (ub) {
      ub.addEventListener('click', function (e) {
        e.preventDefault();
        compileBudgetManagementUpdates(emergencySetting, currentTithingSetting, budget, placeholderBudget, user);
      });
    });
    watchForBudgetExit();
    watchForBudgetDeletion();
    if (!budget.accounts.tithing) return;

    if (budget.accounts.tithing.tithingSetting) {
      var tithingSettings = document.querySelectorAll('.form__label--small-thin__taller--thirds__tithing');

      var _tithingCheckboxes = document.querySelectorAll('.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container__input--checkbox');

      tithingSettings.forEach(function (ts) {
        ts.classList.remove('selected');
        if (budget.accounts.tithing.tithingSetting === "Gross") tithingSettings[0].classList.add('selected');
        if (budget.accounts.tithing.tithingSetting === "Net") tithingSettings[1].classList.add('selected');
        if (budget.accounts.tithing.tithingSetting === "Surplus") tithingSettings[2].classList.add('selected');
      });
      tithingSettings.forEach(function (ts) {
        if (ts.classList.contains('selected')) currentTithingSetting = ts.textContent;
      });
      tithingSettings.forEach(function (ts) {
        ts.addEventListener('click', function (e) {
          e.preventDefault();
          tithingSettings.forEach(function (setting) {
            return setting.classList.remove('selected');
          });
          ts.classList.add('selected');
          currentTithingSetting = ts.textContent;
        });
      });
    }
  }
};

var cycleMainCategories = function cycleMainCategories(direction, index, subCats, budget) {
  var categoryIcon = document.querySelector('.main-category-display__category-display__icon');
  var categoryTitle = document.querySelector('.main-category-display__category-display__title');

  if (direction === "left") {
    categoryIcon.classList.remove(categoryIcon.classList[2]);
    categoryIcon.classList.add("".concat(budget.mainCategories[index].icon));
    categoryTitle.textContent = budget.mainCategories[index].title;
    subCats.forEach(function (sc) {
      sc.classList.add('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.remove('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.add('open');
    });
  }

  if (direction === "right") {
    categoryIcon.classList.remove(categoryIcon.classList[2]);
    categoryIcon.classList.add("".concat(budget.mainCategories[index].icon));
    categoryTitle.textContent = budget.mainCategories[index].title;
    subCats.forEach(function (sc) {
      sc.classList.add('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.remove('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.add('open');
    });
  }
};

var _setupCurrentMonth = function _setupCurrentMonth(budget) {
  var categoryIcon = document.querySelector('.main-category-display__category-display__icon');
  var categoryTitle = document.querySelector('.main-category-display__category-display__title');
  var subCategories = document.querySelectorAll('.sub-category-display__sub-category');
  var leftButton = document.querySelector('.left');
  var rightButton = document.querySelector('.right');
  var categoryIndex = 0;
  subCategories.forEach(function (sc, i) {
    sc.classList.add('closed');
    if (Number(sc.dataset.subcategory) === 0) sc.classList.remove('closed');
    if (Number(sc.dataset.subcategory) === 0) sc.classList.add('open');
  });

  if (leftButton) {
    leftButton.addEventListener('click', function (e) {
      e.preventDefault();
      categoryIndex--;
      if (categoryIndex <= 0) categoryIndex = 0;
      cycleMainCategories('left', categoryIndex, subCategories, budget);
    });
  }

  if (rightButton) {
    rightButton.addEventListener('click', function (e) {
      e.preventDefault();
      categoryIndex++;
      if (categoryIndex >= budget.mainCategories.length - 1) categoryIndex = budget.mainCategories.length - 1;
      cycleMainCategories('right', categoryIndex, subCategories, budget);
    });
  }
};

var selectDayAndShowTransactions = function selectDayAndShowTransactions(event) {
  var upcomingTransactions = document.querySelectorAll('.upcoming-bills__bill');
  var e = event;
  var selectedDay = e.target;
  var monthHeader = document.querySelector('.bill-calendar__header__title');
  var splitMonthHeader = monthHeader.textContent.split(' ');
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  console.log(monthHeader.textContent.split(' '));
  console.log(Number(selectedDay.textContent));
  upcomingTransactions.forEach(function (transaction, i) {
    transaction.classList.remove('open');
    transaction.classList.add('closed');
    var date = new Date(transaction.firstChild.nextSibling.firstChild.textContent);
    console.log(date);
    if (date.getFullYear() !== Number(splitMonthHeader[2])) return;
    if (months[date.getMonth()] !== splitMonthHeader[0]) return;

    if (date.getDate() === Number(selectedDay.textContent)) {
      transaction.classList.remove('closed');
      transaction.classList.add('open');
    }
  });
}; // WATCH FOR CALENDAR DAY SELECTION FOR TO DISPLAY CORRECT TRANSACTIONS


var _watchDaySelection = function _watchDaySelection() {
  var calendarDays = document.querySelectorAll('.bill-calendar__days__single-day');
  calendarDays.forEach(function (day, i) {
    day.addEventListener('click', selectDayAndShowTransactions);
  });
}; // DISPLAY UPCOMING TRANSACTIONS -- NEED TO DO THIS HERE INSTEAD OF PUG FOR THE REASON OF THE TRANSACTIONS THAT HAVE TWO DUE DATES.


var displayUpcomingTransactions = function displayUpcomingTransactions(container, transactions) {
  console.log("Transactions...");
  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  transactions.forEach(function (transaction, i) {
    // CREATE THE BILL CONTAINER
    var upcomingBill = document.createElement('section');
    var upcomingBillTwo;

    if (transaction.timingOptions.paymentCycle === "Bi-Annual" || transaction.timingOptions.paymentCycle === "Bi-Monthly") {
      upcomingBillTwo = document.createElement('section');
    }

    upcomingBill.classList.add('upcoming-bills__bill');
    upcomingBill.classList.add('r__upcoming-bills__bill');

    if (transaction.timingOptions.paymentCycle === "Bi-Annual" || transaction.timingOptions.paymentCycle === "Bi-Monthly") {
      upcomingBillTwo.classList.add('upcoming-bills__bill');
      upcomingBillTwo.classList.add('r__upcoming-bills__bill');
    }

    var billSections = 5;
    var billSectionStart = 0; // START CREATING THE BILL'S SECTIONS AND FILLING THEM

    if (transaction.timingOptions.paymentCycle !== "Bi-Annual" && transaction.timingOptions.paymentCycle !== "Bi-Monthly") {
      while (billSectionStart < billSections) {
        var billSection = document.createElement('section');
        billSection.classList.add('upcoming-bills__bill__bill-item');
        billSection.classList.add('r__upcoming-bills__bill__bill-item');
        insertElement(upcomingBill, billSection);

        if (billSectionStart === 0) {
          var billAccount = document.createElement('p');
          billAccount.classList.add('upcoming-bills__bill__bill-item__text');
          billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
          billAccount.textContent = transaction.account;
          insertElement(billSection, billAccount);
        }

        if (billSectionStart === 1) {
          var _billAccount = document.createElement('p');

          _billAccount.classList.add('upcoming-bills__bill__bill-item__text');

          _billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');

          _billAccount.textContent = "".concat(new Date(transaction.timingOptions.dueDates[0]).getDate(), " ").concat(months[new Date(transaction.timingOptions.dueDates[0]).getMonth()], " ").concat(new Date(transaction.timingOptions.dueDates[0]).getFullYear());
          insertElement(billSection, _billAccount);
        }

        if (billSectionStart === 2) {
          var _billAccount2 = document.createElement('p');

          _billAccount2.classList.add('upcoming-bills__bill__bill-item__text');

          _billAccount2.classList.add('r__upcoming-bills__bill__bill-item__text');

          _billAccount2.textContent = transaction.lender;

          if (!transaction.lender) {
            _billAccount2.textContent = transaction.location;
          }

          insertElement(billSection, _billAccount2);
        }

        if (billSectionStart === 3) {
          var _billAccount3 = document.createElement('p');

          _billAccount3.classList.add('upcoming-bills__bill__bill-item__text');

          _billAccount3.classList.add('r__upcoming-bills__bill__bill-item__text');

          _billAccount3.textContent = money.format(transaction.amount);
          insertElement(billSection, _billAccount3);
        }

        if (billSectionStart === 4) {
          var paidOrNot = document.createElement('section');
          paidOrNot.classList.add('upcoming-bills__bill__bill-item__checkbox-container');
          paidOrNot.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container');
          var paidOrNotInput = document.createElement('input');
          paidOrNotInput.classList.add('upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');
          paidOrNotInput.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');
          paidOrNotInput.id = "paymentCheck";
          paidOrNotInput.type = "checkbox";
          var paidOrNotLabel = document.createElement('label');
          paidOrNotLabel.classList.add('upcoming-bills__bill__bill-item__checkbox-container__payment-label');
          paidOrNotLabel.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container__payment-label');
          paidOrNotLabel.textContent = "Payment Made";
          paidOrNotLabel.for = "paymentCheck";
          insertElement(paidOrNot, paidOrNotInput);
          insertElement(paidOrNot, paidOrNotLabel);
          insertElement(billSection, paidOrNot);
        }

        billSectionStart++;
      }

      insertElement(container, upcomingBill);
    }

    if (transaction.timingOptions.paymentCycle === "Bi-Annual" || transaction.timingOptions.paymentCycle === "Bi-Monthly") {
      while (billSectionStart < billSections) {
        var _billSection = document.createElement('section');

        _billSection.classList.add('upcoming-bills__bill__bill-item');

        _billSection.classList.add('r__upcoming-bills__bill__bill-item');

        insertElement(upcomingBillTwo, _billSection);

        if (billSectionStart === 0) {
          var _billAccount4 = document.createElement('p');

          _billAccount4.classList.add('upcoming-bills__bill__bill-item__text');

          _billAccount4.classList.add('r__upcoming-bills__bill__bill-item__text');

          _billAccount4.textContent = transaction.account;
          insertElement(_billSection, _billAccount4);
        }

        if (billSectionStart === 1) {
          var _billAccount5 = document.createElement('p');

          _billAccount5.classList.add('upcoming-bills__bill__bill-item__text');

          _billAccount5.classList.add('r__upcoming-bills__bill__bill-item__text');

          _billAccount5.textContent = "".concat(new Date(transaction.timingOptions.dueDates[1]).getDate(), " ").concat(months[new Date(transaction.timingOptions.dueDates[1]).getMonth()], " ").concat(new Date(transaction.timingOptions.dueDates[1]).getFullYear());
          insertElement(_billSection, _billAccount5);
        }

        if (billSectionStart === 2) {
          var _billAccount6 = document.createElement('p');

          _billAccount6.classList.add('upcoming-bills__bill__bill-item__text');

          _billAccount6.classList.add('r__upcoming-bills__bill__bill-item__text');

          _billAccount6.textContent = transaction.lender;

          if (!transaction.lender) {
            _billAccount6.textContent = transaction.location;
          }

          insertElement(_billSection, _billAccount6);
        }

        if (billSectionStart === 3) {
          var _billAccount7 = document.createElement('p');

          _billAccount7.classList.add('upcoming-bills__bill__bill-item__text');

          _billAccount7.classList.add('r__upcoming-bills__bill__bill-item__text');

          _billAccount7.textContent = money.format(transaction.amount);
          insertElement(_billSection, _billAccount7);
        }

        if (billSectionStart === 4) {
          var _paidOrNot = document.createElement('section');

          _paidOrNot.classList.add('upcoming-bills__bill__bill-item__checkbox-container');

          _paidOrNot.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container');

          var _paidOrNotInput = document.createElement('input');

          _paidOrNotInput.classList.add('upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');

          _paidOrNotInput.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');

          _paidOrNotInput.id = "paymentCheck";
          _paidOrNotInput.type = "checkbox";

          var _paidOrNotLabel = document.createElement('label');

          _paidOrNotLabel.classList.add('upcoming-bills__bill__bill-item__checkbox-container__payment-label');

          _paidOrNotLabel.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container__payment-label');

          _paidOrNotLabel.textContent = "Payment Made";
          _paidOrNotLabel.for = "paymentCheck";
          insertElement(_paidOrNot, _paidOrNotInput);
          insertElement(_paidOrNot, _paidOrNotLabel);
          insertElement(_billSection, _paidOrNot);
        }

        billSectionStart++;
      }

      insertElement(container, upcomingBillTwo);
    }
  });
}; // SETTING UP BILL / TRANSACTION CALENDAR


var _setupBillCalendar = function _setupBillCalendar(budget) {
  var calendar = _FrontEnd_Calendar__WEBPACK_IMPORTED_MODULE_5__.myCalendar;
  var currentMonth = calendar.getMonth();
  var currentMonthIndex = calendar.getMonthIndex();
  var currentYear = calendar.getYear();
  calendar.makeCalendar(currentMonthIndex, currentMonth, currentYear, '.bill-calendar__days__single-day', // NEEDS PERIOD FOR .querySelectorAll
  'bill-calendar__days__single-day--current-day', // CLASS IS ONLY BEING ADDED via .classList.add
  'un-used-day' // CLASS IS ONLY BEING ADDED via .classList.add
  );
  var monthLeft = document.querySelector('.month-left');
  var monthRight = document.querySelector('.month-right');

  if (monthLeft) {
    monthLeft.addEventListener('click', function (e) {
      e.preventDefault();
      currentMonthIndex--;

      if (currentMonthIndex === -1) {
        currentMonthIndex = 11;
        currentYear--;
      }

      calendar.goBackAMonth(currentMonthIndex, currentYear, '.bill-calendar__days__single-day', 'bill-calendar__days__single-day--current-day', 'un-used-day');
    });
  }

  if (monthRight) {
    monthRight.addEventListener('click', function (e) {
      e.preventDefault();
      currentMonthIndex++;

      if (currentMonthIndex === 12) {
        currentMonthIndex = 0;
        currentYear++;
      }

      calendar.goForwardAMonth(currentMonthIndex, currentYear, '.bill-calendar__days__single-day', 'bill-calendar__days__single-day--current-day', 'un-used-day');
    });
  }

  var upcomingBillsContainer = document.querySelector('.upcoming-bills');
  displayUpcomingTransactions(upcomingBillsContainer, budget.transactions.plannedTransactions);
  var upcomingTransactions = document.querySelectorAll('.upcoming-bills__bill');
  console.log(upcomingTransactions);
  var currentDay = document.querySelector('.bill-calendar__days__single-day--current-day');
  upcomingTransactions.forEach(function (transaction, i) {
    transaction.classList.add('closed');
    var date = new Date(transaction.firstChild.nextSibling.firstChild.textContent);

    if (date.getDate() === Number(currentDay.textContent)) {
      transaction.classList.remove('closed');
      transaction.classList.add('open');
    }
  });

  _watchDaySelection();
};

var calculateTotal = function calculateTotal(accountType, budget) {
  var accountSections = document.querySelectorAll('.budget-container__dashboard__container--extra-small__content__account-total');
  var budgetAccounts = budget.accounts;
  var amountOfDebt;
  var budgetAccountTotals = [];
  Object.entries(budgetAccounts).forEach(function (account) {
    return budgetAccountTotals.push(account[1].amount);
  });
  Object.entries(budgetAccounts).forEach(function (account) {
    if (account[0] === "debt") amountOfDebt = account[1].debtAmount;
    return amountOfDebt;
  }); // Set Money Format

  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  if (budget) {
    if (accountType === "Bank Account") {
      var initialDeposit = 0;
      var bankVaultTotal = budgetAccountTotals.reduce(function (previous, current) {
        return previous + current;
      }, initialDeposit);
      var bankAccountSection = accountSections[0];
      var bankAccount = money.format(bankVaultTotal);
      if (bankAccountSection) bankAccountSection.textContent = "".concat(bankAccount);
    }

    if (accountType === "Debt") {
      var debtAccount = accountSections[1]; // amountOfDebt += 200;

      var debt = money.format(amountOfDebt);

      if (debtAccount) {
        amountOfDebt === 0 ? debtAccount.textContent = debt : debtAccount.textContent = "-".concat(debt);
      }
    }

    if (accountType === "Net Value") {
      var _initialDeposit = 0;
      var _budgetAccountTotals = [];
      Object.entries(budgetAccounts).forEach(function (account) {
        if (account[0] === "debt") amountOfDebt = account[1].debtAmount;
        return amountOfDebt;
      });

      var _bankVaultTotal = _budgetAccountTotals.reduce(function (previous, current) {
        return previous + current;
      }, _initialDeposit);

      var netValueAccount = accountSections[2];
      var netValue = money.format(_bankVaultTotal - amountOfDebt);
      if (netValueAccount) netValueAccount.textContent = netValue;
    }
  }
};

var getDashboardAccountTotals = function getDashboardAccountTotals(budget) {
  calculateTotal("Bank Account", budget);
  calculateTotal("Debt", budget);
  calculateTotal("Net Value", budget); // budget-container__dashboard__container--extra-small__content__account-total
};

var showTransactionOptions = function showTransactionOptions(budget, placeholderBudget, user, optionText, transactionOptionArrays, transactionOptions) {
  var transactionTypeSelect = document.getElementById('transactionType');
  var transactionItemSelect = document.getElementById('savingsGoals');
  var transactionLenderSelect = document.getElementById('lender');

  (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(transactionTypeSelect.childNodes).forEach(function (child) {
    child.remove();
  });

  (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(transactionItemSelect.childNodes).forEach(function (child) {
    child.remove();
  });

  (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(transactionLenderSelect.childNodes).forEach(function (child) {
    child.remove();
  });

  transactionOptionArrays.forEach(function (array) {
    array.forEach(function (arrayItem) {
      arrayItem.classList.remove('open');
      arrayItem.classList.add('closed');
      arrayItem.firstChild.classList.remove('lowered');
    });
  });
  transactionOptions.forEach(function (option, i) {
    option.classList.remove('closed');
    option.classList.add('open');

    if (optionText === "Monthly Budget") {
      console.log(optionText);
      option.classList.remove('lowered');

      if (i === 2) {
        option.classList.remove('lowered');

        if (transactionOptions[i - 1].getBoundingClientRect().width < 115) {
          option.classList.add('lowered');
        }
      }
    }

    if (optionText === "Emergency Fund") {
      option.classList.add('lowered');
    }

    if (optionText === "Savings Fund") {
      option.classList.remove('raised');

      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach(function (transaction, i) {
          if (transaction.account === "Savings Fund") {
            var _option = document.createElement('option');

            _option.classList.add('form__select--option');

            _option.classList.add('r__form__select--option');

            _option.textContent = transaction.name;
            insertElement(transactionItemSelect, _option);
          }
        });
      }
    }

    if (optionText === "Expense Fund") {
      option.classList.remove('lowered');

      if (i === 2) {
        console.log(option.firstChild.nextSibling.getBoundingClientRect().width);
        option.classList.remove('raised');

        if (option.firstChild.nextSibling.getBoundingClientRect().width > 133.5) {
          option.classList.add('raised');
        }
      }

      var expenseTypes = ["Bill", "Subscription", "Other"];

      if (transactionTypeSelect.childNodes.length === 0) {
        expenseTypes.forEach(function (expense, i) {
          var option = document.createElement('option');
          option.classList.add('form__select--option');
          option.classList.add('r__form__select--option');
          option.textContent = expense;
          insertElement(transactionTypeSelect, option);
        });
      }

      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach(function (transaction, i) {
          if (transaction.account === "Expense Fund") {
            var _option2 = document.createElement('option');

            _option2.classList.add('form__select--option');

            _option2.classList.add('r__form__select--option');

            _option2.textContent = transaction.name;
            insertElement(transactionItemSelect, _option2);
          }
        });
      }

      console.log(transactionTypeSelect);
    }

    if (optionText === "Surplus") {
      option.classList.remove('raised');

      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach(function (transaction, i) {
          if (transaction.account === "Surplus") {
            var _option3 = document.createElement('option');

            _option3.classList.add('form__select--option');

            _option3.classList.add('r__form__select--option');

            _option3.textContent = transaction.name;
            insertElement(transactionItemSelect, _option3);
          }
        });
      }
    }

    if (optionText === "Investment") {
      option.classList.remove('raised');

      if (i === 1) {
        option.classList.add('lowered');
      }

      var investmentTypes = ["Stock", "Real Estate", "Timeshare", "Other"];

      if (transactionTypeSelect.childNodes.length === 0) {
        investmentTypes.forEach(function (investment, i) {
          var option = document.createElement('option');
          option.classList.add('form__select--option');
          option.classList.add('r__form__select--option');
          option.textContent = investment;
          insertElement(transactionTypeSelect, option);
        });
      }
    }

    if (optionText === "Debt") {
      option.classList.remove('lowered');

      if (i === 2) {
        option.classList.remove('raised');
        console.log(transactionOptions[i - 1].getBoundingClientRect().width);

        if (transactionOptions[i - 1].getBoundingClientRect().width > 115) {
          option.classList.add('raised');
        }
      }

      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach(function (transaction, i) {
          if (transaction.account === "Debt") {
            var _option4 = document.createElement('option');

            var lenderOption = document.createElement('option');

            _option4.classList.add('form__select--option');

            _option4.classList.add('r__form__select--option');

            lenderOption.classList.add('form__select--option');
            lenderOption.classList.add('r__form__select--option');
            _option4.textContent = transaction.name;
            lenderOption.textContent = transaction.lender;
            insertElement(transactionItemSelect, _option4);
            insertElement(transactionLenderSelect, lenderOption);
          }
        });
      }
    }

    if (optionText === "Tithing") {
      option.classList.add('lowered');
    }
  });
};

var resetTransactionOptions = function resetTransactionOptions(allOptions) {
  allOptions.forEach(function (option) {
    option.forEach(function (optionItem) {
      optionItem.classList.remove('open');
      optionItem.classList.add('closed');
    });
  });
};

var toggleClass = function toggleClass(element, className) {
  return element.classList.toggle(className);
};

var _watchForTransactions = function _watchForTransactions(budget, placeholderBudget, user) {
  var dashboard = document.querySelector('.budget-dashboard');

  if (dashboard) {
    var _money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    var headerSubmitButtons = document.querySelectorAll('.button--small-container-header');
    var incomeInputs = document.querySelectorAll('.form__input--enter-income'); // MUSTDO: Separate income into investment, savings, and un-allocated after every keystroke into net pay.

    var incomeDateInput = incomeInputs[0];
    var incomeFromInput = incomeInputs[1];
    var grossIncomeInput = incomeInputs[2];
    var netIncomeInput = incomeInputs[3];
    var tithingInput;

    if (user.isLatterDaySaint === true) {
      tithingInput = incomeInputs[3];
      netIncomeInput = incomeInputs[4];
    }

    var investmentPercentage = budget.accounts.investmentFund.investmentPercentage;
    var savingsPercentage = budget.accounts.savingsFund.savingsPercentage;
    var incomePreviewAmounts = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(document.querySelectorAll('.form__section--early-income-view__income-view__amount')), [document.querySelector('.form__section--early-income-view__income-view--purple__amount')]);
    console.log(incomePreviewAmounts);
    var tithed = false;
    netIncomeInput.addEventListener('keyup', function (e) {
      e.preventDefault();
      incomePreviewAmounts[0].textContent = _money.format(netIncomeInput.value * investmentPercentage);
      incomePreviewAmounts[1].textContent = _money.format(netIncomeInput.value * savingsPercentage);

      if (user.latterDaySaint === true) {
        incomePreviewAmounts[2].textContent = _money.format(0);

        if (budget.accounts.tithing.tithingSetting === "Gross") {
          incomePreviewAmounts[2].textContent = _money.format(grossIncomeInput.value * 0.1);
        }

        if (budget.accounts.tithing.tithingSetting === "Net") {
          incomePreviewAmounts[2].textContent = _money.format(netIncomeInput.value * 0.1);
        }

        if (budget.accounts.tithing.tithingSetting !== "Surplus") {
          incomePreviewAmounts[3].textContent = _money.format(netIncomeInput.value - Number(incomePreviewAmounts[0].textContent.split('$')[1]) - Number(incomePreviewAmounts[1].textContent.split('$')[1]) - Number(incomePreviewAmounts[2].textContent.split('$')[1]));
        }

        if (budget.accounts.tithing.tithingSetting === "Surplus") {
          incomePreviewAmounts[2].textContent = _money.format(netIncomeInput.value - Number(incomePreviewAmounts[0].textContent.split('$')[1]) - Number(incomePreviewAmounts[1].textContent.split('$')[1]));
        }
      }

      if (user.latterDaySaint === false) {
        incomePreviewAmounts[2].textContent = _money.format(netIncomeInput.value - Number(incomePreviewAmounts[0].textContent.split('$')[1]) - Number(incomePreviewAmounts[1].textContent.split('$')[1]));
      }
    });
    var tithedSwitch = document.querySelector('.form__input--tithing');

    if (tithedSwitch) {
      tithedSwitch.addEventListener('click', function (e) {
        e.preventDefault();
        toggleClass(tithedSwitch, "form__input--tithing");
        toggleClass(tithedSwitch, "form__input--tithing--tithed");
        tithed = !tithed;
        console.log(tithed);
      });
    } // ENTERING INCOME


    headerSubmitButtons[0].addEventListener('click', function (e) {
      var updateObject, transaction, netAmount;
      var unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1]);
      var savingsAmount = budget.accounts.savingsFund.amount + Number(incomePreviewAmounts[1].textContent.split('$')[1]);
      var investmentAmount = budget.accounts.investmentFund.amount + Number(incomePreviewAmounts[0].textContent.split('$')[1]);

      if (user.latterDaySaint === false) {
        netAmount = Number(incomePreviewAmounts[2].textContent.split('$')[1]);
        console.log(incomePreviewAmounts[2].textContent.split('$')[1]);

        if (incomePreviewAmounts[2].textContent.split('$')[1].includes(',')) {
          netAmount = Number(incomePreviewAmounts[2].textContent.split('$')[1].split(',').join(''));
          unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1].split(',').join(''));
        }

        transaction = new _Transaction__WEBPACK_IMPORTED_MODULE_10__.Transaction({
          date: incomeDateInput.value,
          type: "Deposit",
          location: incomeFromInput.value
        });
        transaction.addToReceipt({
          account: "Un-Allocated",
          grossAmount: Number(grossIncomeInput.value),
          netAmount: Number(netIncomeInput.value),
          deposited: Number(netAmount),
          user: user,
          budget: budget
        });
        placeholderBudget.transactions.recentTransactions.push(transaction);
        updateObject = {
          budgetId: budget._id,
          userId: user._id,
          user: user,
          accounts: {
            unAllocated: {
              amount: unAllocatedAmount
            },
            monthlyBudget: placeholderBudget.accounts.monthlyBudget,
            emergencyFund: placeholderBudget.accounts.emergencyFund,
            savingsFund: {
              savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
              savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
              amount: savingsAmount
            },
            expenseFund: placeholderBudget.accounts.expenseFund,
            surplus: placeholderBudget.accounts.surplus,
            investmentFund: {
              investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
              investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
              amount: investmentAmount
            },
            debt: placeholderBudget.accounts.debt
          },
          transactions: placeholderBudget.transactions
        };
      }

      if (user.latterDaySaint === true) {
        transaction = new _Transaction__WEBPACK_IMPORTED_MODULE_10__.Transaction({
          date: new Date(incomeDateInput.value),
          type: "Deposit",
          location: incomeFromInput.value
        }); // This may not be the final place for this.  Only because if I make it so that the tithing account only shows up when a Latter Day Saint has Gross or Net calculated tithing.

        if (budget.accounts.tithing.tithingSetting !== "Surplus") {
          netAmount = Number(incomePreviewAmounts[3].textContent.split('$')[1]);
          console.log(incomePreviewAmounts[2].textContent.split('$')[1]);

          if (incomePreviewAmounts[3].textContent.split('$')[1].includes(',')) {
            netAmount = Number(incomePreviewAmounts[3].textContent.split('$')[1].split(',').join(''));
            unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[3].textContent.split('$')[1].split(',').join(''));
          }

          transaction.addToReceipt({
            account: "Un-Allocated",
            grossAmount: Number(grossIncomeInput.value),
            netAmount: Number(netIncomeInput.value),
            deposited: Number(netAmount),
            tithed: tithed,
            user: user,
            budget: budget
          });
          var tithingAmount = budget.accounts.tithing.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1]);

          if (Number(incomePreviewAmounts[2].textContent.split('$')[1].contains(','))) {
            tithingAmount = budget.accounts.tithing.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1]).split(',').join('');
          }

          placeholderBudget.accounts.tithing.amount = Number(tithingAmount);
        }

        if (budget.accounts.tithing.tithingSetting === "Surplus") {
          netAmount = Number(incomePreviewAmounts[2].textContent.split('$')[1]);
          console.log(incomePreviewAmounts[2].textContent.split('$')[1]);

          if (incomePreviewAmounts[2].textContent.split('$')[1].includes(',')) {
            netAmount = Number(incomePreviewAmounts[2].textContent.split('$')[1].split(',').join(''));
            unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1].split(',').join(''));
          }

          transaction.addToReceipt({
            account: "Un-Allocated",
            grossAmount: Number(grossIncomeInput.value),
            netAmount: Number(netIncomeInput.value),
            deposited: Number(netAmount),
            user: user,
            budget: budget
          });
        }

        placeholderBudget.transactions.recentTransactions.push(transaction);
        updateObject = {
          budgetId: budget._id,
          userId: user._id,
          user: user,
          accounts: {
            unAllocated: {
              amount: unAllocatedAmount
            },
            monthlyBudget: placeholderBudget.accounts.monthlyBudget,
            emergencyFund: placeholderBudget.accounts.emergencyFund,
            savingsFund: {
              savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
              savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
              amount: savingsAmount
            },
            expenseFund: placeholderBudget.accounts.expenseFund,
            surplus: placeholderBudget.accounts.surplus,
            investmentFund: {
              investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
              investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
              amount: investmentAmount
            },
            debt: placeholderBudget.accounts.debt,
            tithing: placeholderBudget.accounts.tithing
          },
          transactions: placeholderBudget.transactions
        };
      }

      placeholderBudget._updateBudget("Update", "Enter Income", {
        updateObject: updateObject
      }, "Enter-Income");

      incomeDateInput.value = '';
      incomeFromInput.value = '';
      grossIncomeInput.value = '';
      netIncomeInput.value = '';
      incomePreviewAmounts[0].textContent = _money.format(0);
      incomePreviewAmounts[1].textContent = _money.format(0);
      incomePreviewAmounts[2].textContent = _money.format(0);
    });
  } // ** TOP PRIORITY ** When it is possible, record the income as a deposit transaction in the recent transactions page.


  var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }); ////////////////////////////////////////////
  // INITIALIZE TRANSACTION OPTIONS

  var transactionSelects = document.querySelectorAll('.form__section--select');
  var transactionOptions = document.querySelectorAll('.form__section--transaction-option');
  var transactionButtons = document.querySelectorAll('.button--transaction-button');
  var transactionCreationContainer = document.querySelector('.form__section--transaction-item-creation');
  var transactionCost = document.querySelector('.container--small__transaction-total__amount');
  var transactionHeaderInputs = document.querySelectorAll('.form__input--small-thinner');
  var transactionHeaderInputsTwo = document.querySelectorAll('.form__input--small-thinner__wide');
  console.log(transactionSelects, transactionOptions, transactionButtons, transactionCreationContainer);
  var accountSelection = transactionSelects[0]; //////////////////////////////////////////
  // UNIVERSAL TRANSACTION OPTIONS

  var addTransactionItemButton = transactionButtons[0];
  var transactionDescription = transactionOptions[1];
  var transactionAmount = transactionOptions[2];
  var transactionName = transactionOptions[0];
  var transactionType = transactionSelects[3];
  var transactionTiming = transactionSelects[4];
  var transactionItem = transactionSelects[6];
  var transactionSaveButton = transactionButtons[1]; //////////////////////////////////////////
  // MONTHLY BUDGET TRANSACTION OPTIONS

  var mainCategorySelect = transactionSelects[1];
  var subCategorySelect = transactionSelects[2]; //////////////////////////////////////////
  // DEBT TRANSACTION OPTIONS

  var transactionLender = transactionSelects[5]; //////////////////////////////////////////
  // BUILD TRANSACTION OPTIONS

  var monthlyBudgetTransactionOptions = buildTransactionOptions([mainCategorySelect, subCategorySelect, transactionDescription, transactionAmount, transactionSaveButton]);
  var emergencyFundTransactionsOptions = buildTransactionOptions([transactionDescription, transactionAmount, transactionSaveButton]);
  var savingsFundTransactionOptions = buildTransactionOptions([transactionTiming, transactionItem, transactionDescription, transactionAmount, transactionSaveButton]);
  var expenseFundTransactionOptions = buildTransactionOptions([transactionType, transactionTiming, transactionItem, transactionDescription, transactionAmount, transactionSaveButton]);
  var surplusTransactionOptions = buildTransactionOptions([transactionTiming, transactionItem, transactionDescription, transactionAmount, transactionSaveButton]);
  var investmentTransactionOptions = buildTransactionOptions([transactionType, transactionName, transactionDescription, transactionAmount, transactionSaveButton]);
  var debtTransactionOptions = buildTransactionOptions([transactionTiming, transactionLender, transactionItem, transactionDescription, transactionAmount, transactionSaveButton]);
  var tithingTransactionsOptions = buildTransactionOptions([transactionAmount, transactionSaveButton]);
  var allTransactionOptions = [monthlyBudgetTransactionOptions, emergencyFundTransactionsOptions, savingsFundTransactionOptions, expenseFundTransactionOptions, surplusTransactionOptions, investmentTransactionOptions, debtTransactionOptions, tithingTransactionsOptions];

  if (addTransactionItemButton) {
    addTransactionItemButton.addEventListener('click', function (e) {
      e.preventDefault();

      if (transactionCreationContainer.classList.contains('open')) {
        resetTransactionOptions(allTransactionOptions);
        return transactionCreationContainer.classList.toggle('closed');
      }

      if (transactionCreationContainer.classList.contains('closed')) {
        return transactionCreationContainer.classList.toggle('open');
      }
    });
  }

  if (accountSelection) {
    var selectedAccount;

    (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(accountSelection.firstChild.nextSibling.children).forEach(function (option) {
      option.addEventListener('click', function (e) {
        e.preventDefault();

        if (option.textContent === "Monthly Budget") {
          showTransactionOptions(budget, placeholderBudget, user, option.textContent, allTransactionOptions, monthlyBudgetTransactionOptions);
          selectedAccount = option.textContent;
        }

        if (option.textContent === "Emergency Fund") {
          showTransactionOptions(budget, placeholderBudget, user, option.textContent, allTransactionOptions, emergencyFundTransactionsOptions);
          selectedAccount = option.textContent;
        }

        if (option.textContent === "Savings Fund") {
          showTransactionOptions(budget, placeholderBudget, user, option.textContent, allTransactionOptions, savingsFundTransactionOptions);
          selectedAccount = option.textContent;
        }

        if (option.textContent === "Expense Fund") {
          showTransactionOptions(budget, placeholderBudget, user, option.textContent, allTransactionOptions, expenseFundTransactionOptions);
          selectedAccount = option.textContent;
        }

        if (option.textContent === "Surplus") {
          showTransactionOptions(budget, placeholderBudget, user, option.textContent, allTransactionOptions, surplusTransactionOptions);
          selectedAccount = option.textContent;
        }

        if (option.textContent === "Investment") {
          showTransactionOptions(budget, placeholderBudget, user, option.textContent, allTransactionOptions, investmentTransactionOptions);
          selectedAccount = option.textContent;
        }

        if (option.textContent === "Debt") {
          showTransactionOptions(budget, placeholderBudget, user, option.textContent, allTransactionOptions, debtTransactionOptions);
          selectedAccount = option.textContent;
        }

        if (option.textContent === "Tithing") {
          showTransactionOptions(budget, placeholderBudget, user, option.textContent, allTransactionOptions, tithingTransactionsOptions);
          selectedAccount = option.textContent;
        }
      });
    });

    var receiptItemContainer = document.querySelector('.receipt-item-container');
    transactionSaveButton.addEventListener('click', function (e) {
      e.preventDefault();
      console.log("Saving...");
      console.log(transactionHeaderInputs, transactionHeaderInputsTwo);

      if (selectedAccount !== "Investment") {
        var transaction = new _Transaction__WEBPACK_IMPORTED_MODULE_10__.Transaction({
          date: transactionHeaderInputs[0].value,
          type: "Withdrawal",
          location: transactionHeaderInputsTwo[0].value
        });
        console.log(transaction);
        var receiptRow = document.createElement('section');
        receiptRow.classList.add('receipt-item-container__row');
        receiptRow.classList.add('r__receipt-item-container__row');
        insertElement(receiptItemContainer, receiptRow);
        var transactionDetails = document.createElement('section');
        transactionDetails.classList.add('transaction-item-details');
        transactionDetails.classList.add('r__transaction-item-details');
        insertElement(receiptRow, transactionDetails);
        var transactionCostDetails = document.createElement('section');
        transactionCostDetails.classList.add('transaction-item-cost');
        transactionCostDetails.classList.add('r__transaction-item-cost');
        insertElement(receiptRow, transactionCostDetails);
        var detailCount = 1;
        var detailStart = 0;
        console.log(selectedAccount);

        if (selectedAccount === "Monthly Budget" || selectedAccount === "Debt") {
          detailCount = 2;
          console.log(detailCount);
        }

        console.log(detailCount);

        while (detailStart < detailCount) {
          var receiptDetail = document.createElement('p');
          receiptDetail.classList.add('transaction-item-details__detail');
          receiptDetail.classList.add('r__transaction-item-details__detail');
          console.log(mainCategorySelect.firstChild.nextSibling.textContent);

          if (selectedAccount === "Monthly Budget") {
            if (detailStart === 0) {
              receiptDetail.textContent = mainCategorySelect.firstChild.nextSibling.value;
            }

            if (detailStart === 1) {
              receiptDetail.textContent = subCategorySelect.firstChild.nextSibling.value;
            }
          }

          insertElement(transactionDetails, receiptDetail);
          detailStart++;
        }

        console.log(transactionAmount, transactionAmount.firstChild.value, (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(transactionAmount.firstChild.value), money.format(Number(transactionAmount.value)));
        var receiptDetailCost = document.createElement('p');
        receiptDetailCost.classList.add('transaction-item-cost__cost');
        receiptDetailCost.classList.add('r__transaction-item-cost__cost');
        receiptDetailCost.textContent = money.format(Number(transactionAmount.firstChild.value));
        insertElement(transactionCostDetails, receiptDetailCost);
        var removeTransactionItemIcon = document.createElement('i');
        removeTransactionItemIcon.classList.add('fas');
        removeTransactionItemIcon.classList.add('fa-trash-alt');
        removeTransactionItemIcon.classList.add('remove-transaction');
        removeTransactionItemIcon.classList.add('r__remove-transaction');
        removeTransactionItemIcon.classList.add('closed');
        insertElement(transactionCostDetails, removeTransactionItemIcon);
        removeTransactionItemIcon.addEventListener('click', function (e) {
          var removeTransactionIcons = document.querySelectorAll('.remove-transaction');

          var index = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(removeTransactionIcons).indexOf(e.target);

          var receiptTransactions = document.querySelectorAll('.receipt-item-container__row');
          receiptTransactions[index].remove();
        });
        receiptRow.addEventListener('mouseover', function (e) {
          e.preventDefault();
          removeTransactionItemIcon.classList.toggle('closed');
          removeTransactionItemIcon.classList.toggle('open');
        });
        receiptRow.addEventListener('mouseout', function (e) {
          e.preventDefault();
          removeTransactionItemIcon.classList.toggle('closed');
          removeTransactionItemIcon.classList.toggle('open');
        });
      }
    });
  }
};

var _watchBudgetNavigation = function _watchBudgetNavigation() {
  var budgetNavButton = document.querySelector('.button--budget-navigation');
  var budgetNavigation = document.querySelector('.navigation');
  var linkButtons = document.querySelectorAll('.navigation__link-list__list-item__link-button');

  if (budgetNavButton) {
    budgetNavButton.addEventListener('click', function (e) {
      e.preventDefault();
      budgetNavButton.classList.toggle('button--budget-navigation--clicked');
      budgetNavigation.classList.toggle('closed');
      budgetNavigation.classList.toggle('open-navigation');
      if (!budgetNavButton.classList.contains('budget-navigation--visible')) linkButtons.forEach(function (lb) {
        return lb.closest('li').nextSibling.classList.add('closed');
      });
    });
  }

  if (linkButtons) {
    linkButtons.forEach(function (lb) {
      lb.addEventListener('click', function (e) {
        e.preventDefault();
        var clicked = e.target.closest('li');
        var siblingLinkContainer = clicked.nextSibling;
        linkButtons.forEach(function (lb) {
          // if (lb.closest('li').nextSibling.classList.contains('open')) {
          //   lb.closest('li').nextSibling.classList.add('closed');
          //   lb.closest('li').nextSibling.classList.remove('open');
          // }
          // if (lb.closest('li').nextSibling.classList.contains('closed')) {
          //   lb.closest('li').nextSibling.classList.add('closed');
          //   lb.closest('li').nextSibling.classList.remove('open');
          // }
          lb.closest('li').nextSibling.classList.add('closed');
          lb.closest('li').nextSibling.classList.remove('open');
        });

        if (!siblingLinkContainer.classList.contains('open')) {
          siblingLinkContainer.classList.toggle('closed');
          siblingLinkContainer.classList.toggle('open');
        }
      });
    });
  }
};

var finalTransactionArrayPush = function finalTransactionArrayPush(finalArray, arrays) {
  arrays.forEach(function (a) {
    finalArray.push(a);
  });
};

var pushIntoArray = function pushIntoArray(arrayFiller, array) {
  arrayFiller.forEach(function (af) {
    array.push(af);
  });
  return array;
};

var buildTransactionOptions = function buildTransactionOptions(options) {
  var transactionOptions = [];
  options.forEach(function (option, i) {
    if (option) {
      option.classList.add('closed');
      transactionOptions.push(option);
    }
  });
  return transactionOptions;
};

var setupDashboard = function setupDashboard(user, budget, placeholderBudget) {
  ////////////////////////////////////////////
  // WATCH THE BUDGET NAVIGATION
  _watchBudgetNavigation(); ////////////////////////////////////////////
  // WATCH FOR ACCOUNT SELECTION


  _watchForTransactions(budget, placeholderBudget, user); ////////////////////////////////////////////
  // GET BANK ACCOUNT TOTAL


  getDashboardAccountTotals(budget); ////////////////////////////////////////////
  // SETUP BILL CALENDAR

  _setupBillCalendar(budget); ////////////////////////////////////////////
  // SETUP BILL CURRENT MONTH


  _setupCurrentMonth(budget);
};

var _watchBudget = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
    var userInfo, user, currentBudget, budget;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("WATCHING YOUR BUDGET"); /////////////////////////////
            // GET USER

            _context.next = 3;
            return _Update_User__WEBPACK_IMPORTED_MODULE_4__.getSomePersonals();

          case 3:
            userInfo = _context.sent;
            user = userInfo.data.data.user; ////////////////////////////////////////////
            // GET BUDGET INFORMATION

            user.budgets.forEach(function (b) {
              if (b._id === window.location.pathname.split('/')[5]) currentBudget = b;
            });
            budget = _Budget__WEBPACK_IMPORTED_MODULE_7__.startToCreate();

            budget._buildPlaceHolderBudget(currentBudget, user);

            console.log(budget);

            if (currentBudget) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            ////////////////////////////////////////////
            // WATCH BUDGET MANAGEMENT PAGE
            setupDashboard(user, currentBudget, budget); ////////////////////////////////////////////
            // WATCH BUDGET MANAGEMENT PAGE

            _setupBudgetManagement(currentBudget, budget, user); ////////////////////////////////////////////
            // WATCH EDIT CATEGORY GOALS PAGE


            _watchEditCategoryGoals(currentBudget, budget, user); ////////////////////////////////////////////
            // WATCH MANAGE CATEGORIES PAGE


            _watchManageCategories(currentBudget, budget, user); ////////////////////////////////////////////
            // WATCH FOR INCOME ALLOCATION


            _watchIncomeAllocation(currentBudget, budget, user); ////////////////////////////////////////////
            // WATCH FOR INCOME ALLOCATION


            _watchTransactionPlanner(currentBudget, budget, user); ////////////////////////////////////////////
            // WATCH FOR INCOME ALLOCATION


            _watchInvestmentPlanner(currentBudget, budget, user); ////////////////////////////////////////////
            // WATCH FOR INCOME ALLOCATION


            _watchDebtManager(currentBudget, budget, user); ////////////////////////////////////////////
            // WATCH FOR INCOME ALLOCATION


            _watchRecentTransactions(currentBudget, budget, user);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function _watchBudget() {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./Public/JS/Manage-Budget.js":
/*!************************************!*\
  !*** ./Public/JS/Manage-Budget.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteMyBudget": () => (/* binding */ deleteMyBudget),
/* harmony export */   "exitBudget": () => (/* binding */ exitBudget),
/* harmony export */   "getMyBudget": () => (/* binding */ getMyBudget),
/* harmony export */   "updateMyBudget": () => (/* binding */ updateMyBudget)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Maintain_Budget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Maintain-Budget */ "./Public/JS/Maintain-Budget.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





var getMyBudget = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(id, user) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "GET",
              url: "/App/Users/".concat(user._id, "/Budgets/").concat(id, "/Dashboard")
            });

          case 3:
            response = _context.sent;
            document.open("text/html").write(response.data);
            window.location.assign("/App/Users/".concat(user._id, "/Budgets/").concat(id, "/Dashboard"));
            console.log(response);

            _Maintain_Budget__WEBPACK_IMPORTED_MODULE_5__._watchBudget();

            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getMyBudget(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateMyBudget = /*#__PURE__*/function () {
  var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(options, pageLink) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(_objectSpread({}, options), pageLink); // GLITCH : Somehow, here, the request.body = only having the last main category in the 'mainCategories'.  That will NEED to be addressed.

            _context2.prev = 1;
            _context2.next = 4;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "PATCH",
              url: "/App/Users/".concat(options.userId, "/Budgets/").concat(options.budgetId, "/").concat(pageLink),
              data: qs__WEBPACK_IMPORTED_MODULE_4___default().parse(_objectSpread({}, options))
            });

          case 4:
            response = _context2.sent;

            if (response.statusText === 'OK') {
              console.log("It is OKAY!!!"); // Check if first name is not undefined or empty.

              !options.firstname === undefined && !options.firstname === '' ? document.getElementById('firstname').value = options.value : document.getElementById('firstname').value = document.getElementById('firstname').value; // Check if last name is not undefined or empty.

              !options.lastname === undefined && !options.lastname === '' ? document.getElementById('lastname').value = options.value : document.getElementById('lastname').value = document.getElementById('lastname').value; // Check if username is not undefined or empty.

              !options.username === undefined && !options.username === '' ? document.getElementById('username').value = options.value : document.getElementById('username').value = document.getElementById('username').value; // Check if email is not undefined or empty.

              !options.email === undefined && !options.email === '' ? document.getElementById('email').value = options.value : document.getElementById('email').value = document.getElementById('email').value; // Check if email is not undefined or empty.

              !options.emailConfirmed === undefined && !options.emailConfirmed === '' ? document.getElementById('email').value = options.value : document.getElementById('email').value = document.getElementById('email').value;
              document.getElementById('email').value = options.email;
              document.getElementById('newEmail').value = '';
              document.getElementById('newEmailConfirmed').value = ''; // Check if phone number is not undefined or empty.

              !options.phoneNumber === undefined && !options.phoneNumber === '' ? document.getElementById('phoneNumber').value = options.value : document.getElementById('phoneNumber').value = document.getElementById('phoneNumber').value; // Check if phone number is not undefined or empty.

              !options.phoneNumberConfirmed === undefined && !options.phoneNumberConfirmed === '' ? document.getElementById('phoneNumber').value = options.value : document.getElementById('phoneNumber').value = document.getElementById('phoneNumber').value; // Check if confirmed phone number is not undefined or empty.

              document.getElementById('phoneNumber').value = options.phoneNumber;
              document.getElementById('newPhoneNumber').value = '';
              document.getElementById('newPhoneNumberConfirmed').value = '';
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function updateMyBudget(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var exitBudget = /*#__PURE__*/function () {
  var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3(id) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              window.location.assign("/App/Users/".concat(id));
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function exitBudget(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteMyBudget = /*#__PURE__*/function () {
  var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee4(id, userId) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "DELETE",
              url: "/App/Users/".concat(userId, "/Budgets/").concat(id, "/Budget-Management"),
              data: qs__WEBPACK_IMPORTED_MODULE_4___default().stringify({
                id: id
              })
            });

          case 3:
            response = _context4.sent;
            console.log(response);

            if (response.statusText === 'No Content') {
              window.location.assign("/App/Users/".concat(userId));
            }

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function deleteMyBudget(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./Public/JS/Person.js":
/*!*****************************!*\
  !*** ./Public/JS/Person.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Person": () => (/* binding */ Person),
/* harmony export */   "newPerson": () => (/* binding */ newPerson)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");


var Person = /*#__PURE__*/function () {
  function Person(options) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Person);

    // firstname, lastname, username, latterDaySaint, email, emailConfirmed, password, passwordConfirmed
    this.firstname = options.firstname;
    this.lastname = options.lastname;
    this.username = options.username;
    this.latterDaySaint = options.latterDaySaint;
    this.email = options.email;
    this.emailConfirmed = options.emailConfirmed;
    this.password = options.password;
    this.passwordConfirmed = options.passwordConfirmed;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Person, [{
    key: "_getLatterDaySaintStatus",
    value: function _getLatterDaySaintStatus() {
      return this.latterDaySaint;
    }
  }]);

  return Person;
}();
var newPerson = new Person("", "", "", "", "", "", "", "");

/***/ }),

/***/ "./Public/JS/Retrieve-Budgets.js":
/*!***************************************!*\
  !*** ./Public/JS/Retrieve-Budgets.js ***!
  \***************************************/
/***/ (() => {



/***/ }),

/***/ "./Public/JS/Signup.js":
/*!*****************************!*\
  !*** ./Public/JS/Signup.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_nextPage": () => (/* binding */ _nextPage),
/* harmony export */   "_setupSignupForm": () => (/* binding */ _setupSignupForm),
/* harmony export */   "_watchFormSubmitButton": () => (/* binding */ _watchFormSubmitButton),
/* harmony export */   "_watchTheLatterDaySaintSwitch": () => (/* binding */ _watchTheLatterDaySaintSwitch),
/* harmony export */   "signup": () => (/* binding */ signup)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");



 //////////////////////
// USER SIGN UP

var signup = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(firstname, lastname, username, latterDaySaint, email, emailConfirmed, password, passwordConfirmed) {
    var response1, user, response2;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_2___default()({
              method: "POST",
              url: "/App/Users/Signup",
              data: qs__WEBPACK_IMPORTED_MODULE_3___default().stringify({
                firstname: firstname,
                lastname: lastname,
                username: username,
                latterDaySaint: latterDaySaint,
                email: email,
                emailConfirmed: emailConfirmed,
                password: password,
                passwordConfirmed: passwordConfirmed
              })
            });

          case 3:
            response1 = _context.sent;

            if (!(response1.statusText === "OK")) {
              _context.next = 10;
              break;
            }

            user = response1.data.data.user;
            _context.next = 8;
            return axios__WEBPACK_IMPORTED_MODULE_2___default()({
              method: "POST",
              url: "App/Users/".concat(user._id),
              data: qs__WEBPACK_IMPORTED_MODULE_3___default().stringify({
                username: username,
                password: password
              })
            });

          case 8:
            response2 = _context.sent;

            if (response2.statusText === 'OK') {
              document.open("text/html").write(response2.data);
              window.location.assign("/App/Users/".concat(user._id));
            }

          case 10:
            console.log(response1);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function signup(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}(); //////////////////////////////
// SIGN UP FORM FUNCTIONALITY

var _submitSignup = function _submitSignup(person) {
  signup(person.firstname, person.lastname, person.username, person.latterDaySaint, person.email, person.emailConfirmed, person.password, person.passwordConfirmed);
}; // Go To Next Page


var _nextPage = function _nextPage(pageNumber, pages, pageElement, person) {
  if (pageNumber > 3) {
    return _submitSignup(person);
  }

  if (pageNumber > 3) {
    var signupFormSubmit = document.querySelector('.signup-form__form-page__section__button');
  }

  pages.forEach(function (p) {
    p.style.display = 'none';
  });
  pages[pageNumber].style.display = 'flex';
  pageElement.textContent = "Page ".concat(pageNumber + 1, " / 4");
}; // Change Latter Day Saint Status

var _changeLatterDaySaintStatus = function _changeLatterDaySaintStatus(valueOne, valueTwo, visibilityClass, switchClass, person) {
  valueOne.classList.toggle(switchClass);
  valueTwo.forEach(function (value) {
    return value.classList.toggle('closed');
  }); // isLatterDaySaint = !isLatterDaySaint;

  person.latterDaySaint = !person.latterDaySaint;
  console.log(person.latterDaySaint);
}; // Watching The Latter Day Saint Switch


var _watchTheLatterDaySaintSwitch = function _watchTheLatterDaySaintSwitch(person) {
  var latterDaySaint = document.querySelector('.form__input--latter-day-saint');
  var latterDaySaintValues = document.querySelectorAll('.form__input--latter-day-saint__text');

  if (latterDaySaint) {
    latterDaySaint.addEventListener('click', function (e) {
      _changeLatterDaySaintStatus(latterDaySaint, latterDaySaintValues, 'closed', 'form__input--latter-day-saint--switched', person);
    });
  }
}; // Watch The Submit Button

var _watchFormSubmitButton = function _watchFormSubmitButton(page, pages, pageElement, person) {
  var formButtons = document.querySelectorAll('.button--small');
  console.log(formButtons);
  var signupFormSubmit = formButtons[1];

  if (signupFormSubmit) {
    signupFormSubmit.addEventListener('click', function (e) {
      e.preventDefault();
      page++;

      if (page + 1 === 2) {
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;
        person.firstname = firstname;
        person.lastname = lastname;
      }

      if (page + 1 === 3) {
        var username = document.getElementById('username').value;
        person.username = username;
      }

      if (page + 1 === 4) {
        var email = document.getElementById('email').value;
        var emailConfirmed = document.getElementById('emailConfirmed').value;
        person.email = email;
        person.emailConfirmed = emailConfirmed;
        console.log(person);
      }

      if (page + 1 === 5) {
        var password = document.getElementById('password').value;
        var passwordConfirmed = document.getElementById('passwordConfirmed').value;
        person.password = password;
        person.passwordConfirmed = passwordConfirmed; ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // CREATING A WAY TO GET THE LATTER DAY SAINT INFO IN WHILE STILL BEING ABLE TO LOG IN RIGHT AFTER SIGNING UP.

        var forms = document.querySelectorAll('.form');
        console.log(forms);
        var signupForm = forms[1];
        signupFormSubmit.setAttribute("type", "submit");
        var latterDaySaint = document.createElement("input");
        latterDaySaint.value = person.latterDaySaint;
        latterDaySaint.setAttribute("id", "latterDaySaint");
        latterDaySaint.setAttribute("name", "latterDaySaint");
        signupForm.insertAdjacentElement("beforeend", latterDaySaint);
        latterDaySaint.style.visibility = "hidden"; // signupForm.submit();
      }

      _nextPage(page, pages, pageElement, person);
    });
  }
}; /////////////////////////
// SIGN UP FORM SETUP

var _setupSignupForm = function _setupSignupForm(page, pages, person) {
  var domSignupFormPageNumber = document.querySelector('.form__page-number');

  if (domSignupFormPageNumber) {
    _watchFormSubmitButton(page, pages, domSignupFormPageNumber, person);

    if (page > 0 || page === undefined) {
      page = 0;
      domSignupFormPageNumber.textContent = "Page ".concat(page + 1, " / 4");
    }

    pages.forEach(function (fp, i) {
      fp.style.display = 'none';
    });
    pages[0].style.display = 'flex';
  }
};

/***/ }),

/***/ "./Public/JS/Transaction.js":
/*!**********************************!*\
  !*** ./Public/JS/Transaction.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transaction": () => (/* binding */ Transaction)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");


var Transaction = /*#__PURE__*/function () {
  function Transaction(options) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Transaction);

    this.transactionDate = new Date(new Date(options.date).setHours(new Date(options.date).getHours() + new Date().getTimezoneOffset() / 60));
    this.transactionType = options.type;
    this.location = options.location;
    this.receipt = [];
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Transaction, [{
    key: "addToReceipt",
    value: function addToReceipt(options) {
      if (this.transactionType === "Deposit") {
        var receiptObject = {};
        receiptObject.account = options.account;
        receiptObject.grossAmount = options.grossAmount;
        receiptObject.netAmount = options.netAmount;
        receiptObject.amount = options.deposited;

        if (options.user.latterDaySaint === true) {
          if (options.budget.accounts.tithing.tithingSetting !== "Surplus") {
            receiptObject.tithed = options.tithed;
          }
        }

        this.receipt.push(receiptObject);
      }
    }
  }]);

  return Transaction;
}();

/***/ }),

/***/ "./Public/JS/Update-User.js":
/*!**********************************!*\
  !*** ./Public/JS/Update-User.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_watchForProfileUpdates": () => (/* binding */ _watchForProfileUpdates),
/* harmony export */   "_watchPasswordResetButton": () => (/* binding */ _watchPasswordResetButton),
/* harmony export */   "deactivateMe": () => (/* binding */ deactivateMe),
/* harmony export */   "deleteMe": () => (/* binding */ deleteMe),
/* harmony export */   "getSomePersonals": () => (/* binding */ getSomePersonals),
/* harmony export */   "updateMe": () => (/* binding */ updateMe),
/* harmony export */   "updateMyPassword": () => (/* binding */ updateMyPassword),
/* harmony export */   "updatePassword": () => (/* binding */ updatePassword),
/* harmony export */   "updateUserPhoto": () => (/* binding */ updateUserPhoto)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Login */ "./Public/JS/Login.js");
/* harmony import */ var _Maintain_Budget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Maintain-Budget */ "./Public/JS/Maintain-Budget.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }






var getSomePersonals = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
    var id, response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = window.location.pathname.split('/')[3];
            _context.next = 4;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "GET",
              url: "/App/Users/".concat(id, "/Me")
            });

          case 4:
            response = _context.sent;
            if (response[0] === "Email") console.log(true);
            return _context.abrupt("return", response);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getSomePersonals() {
    return _ref.apply(this, arguments);
  };
}();
var updatePassword = /*#__PURE__*/function () {
  var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(password, passwordConfirmed) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "PATCH",
              url: "/App/Users/ResetPassword/".concat(window.location.href.split('/')[5]),
              data: qs__WEBPACK_IMPORTED_MODULE_4___default().stringify({
                password: password,
                passwordConfirmed: passwordConfirmed
              })
            });

          case 3:
            response = _context2.sent;

            if (response.data.status === 'Success') {
              window.location.assign("/");
            }

            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function updatePassword(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var updateMyPassword = /*#__PURE__*/function () {
  var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3(currentPassword, newPassword, newPasswordConfirmed, id) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "POST",
              url: "/App/Users/".concat(id, "/UpdateMyPassword"),
              data: qs__WEBPACK_IMPORTED_MODULE_4___default().stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
                newPasswordConfirmed: newPasswordConfirmed
              })
            });

          case 3:
            response = _context3.sent;

            if (response.statusText === 'OK') {
              document.getElementById('currentPassword').value = newPassword;
              document.getElementById('newPassword').value = "";
              document.getElementById('newPasswordConfirmed').value = ""; // window.location.reload(true);
            }

            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function updateMyPassword(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateUserPhoto = /*#__PURE__*/function () {
  var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee4(options) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "PATCH",
              url: "/App/Users/".concat(options.id, "/UpdateMe"),
              data: options
            });

          case 3:
            response = _context4.sent;
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function updateUserPhoto(_x7) {
    return _ref4.apply(this, arguments);
  };
}();
var updateMe = /*#__PURE__*/function () {
  var _ref5 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee5(options) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "PATCH",
              url: "/App/Users/".concat(options.id, "/UpdateMe"),
              data: qs__WEBPACK_IMPORTED_MODULE_4___default().stringify(_objectSpread({}, options))
            });

          case 3:
            response = _context5.sent;

            if (response.statusText === 'OK') {
              // Check if first name is not undefined or empty.
              !options.firstname === undefined && !options.firstname === '' ? document.getElementById('firstname').value = options.value : document.getElementById('firstname').value = document.getElementById('firstname').value; // Check if last name is not undefined or empty.

              !options.lastname === undefined && !options.lastname === '' ? document.getElementById('lastname').value = options.value : document.getElementById('lastname').value = document.getElementById('lastname').value; // Check if username is not undefined or empty.

              !options.username === undefined && !options.username === '' ? document.getElementById('username').value = options.value : document.getElementById('username').value = document.getElementById('username').value; // Check if email is not undefined or empty.

              !options.email === undefined && !options.email === '' ? document.getElementById('email').value = options.value : document.getElementById('email').value = document.getElementById('email').value; // Check if email is not undefined or empty.

              !options.emailConfirmed === undefined && !options.emailConfirmed === '' ? document.getElementById('email').value = options.value : document.getElementById('email').value = document.getElementById('email').value;
              document.getElementById('email').value = options.email;
              document.getElementById('newEmail').value = '';
              document.getElementById('newEmailConfirmed').value = ''; // Check if phone number is not undefined or empty.

              !options.phoneNumber === undefined && !options.phoneNumber === '' ? document.getElementById('phoneNumber').value = options.value : document.getElementById('phoneNumber').value = document.getElementById('phoneNumber').value; // Check if phone number is not undefined or empty.

              !options.phoneNumberConfirmed === undefined && !options.phoneNumberConfirmed === '' ? document.getElementById('phoneNumber').value = options.value : document.getElementById('phoneNumber').value = document.getElementById('phoneNumber').value; // Check if confirmed phone number is not undefined or empty.

              document.getElementById('phoneNumber').value = options.phoneNumber;
              document.getElementById('newPhoneNumber').value = '';
              document.getElementById('newPhoneNumberConfirmed').value = '';
            }

            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function updateMe(_x8) {
    return _ref5.apply(this, arguments);
  };
}();
var deactivateMe = /*#__PURE__*/function () {
  var _ref6 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee6(id) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "DELETE",
              url: "/App/Users/".concat(id, "/DeactivateMe")
            });

          case 3:
            response = _context6.sent;

            if (response.statusText === 'Success') {
              window.location.assign('/App');
            }

            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function deactivateMe(_x9) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteMe = /*#__PURE__*/function () {
  var _ref7 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee7(id) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_3___default()({
              method: "DELETE",
              url: "/App/Users/".concat(id, "/DeleteMe")
            });

          case 3:
            response = _context7.sent;

            if (response.statusText === 'No Content') {
              window.location.assign('/App');
            }

            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function deleteMe(_x10) {
    return _ref7.apply(this, arguments);
  };
}(); ////////////////////////////////////
// Watch Button To Reset Password

var _watchPasswordResetButton = function _watchPasswordResetButton(formButtons) {
  var resetPasswordButton = document.querySelector('.reset-password-form__section__button');

  if (resetPasswordButton) {
    resetPasswordButton.addEventListener('click', function (e) {
      e.preventDefault();
      var newPassword = document.getElementById('newPassword').value;
      var newPasswordConfirmed = document.getElementById('newPasswordConfirmed').value;
      updatePassword(newPassword, newPasswordConfirmed);
    });
  }
}; ///////////////////////////////////////////////////
// ALL ABOUT WATCHING USER PROFILE FORM BUTTONS

var _watchForProfileUpdates = /*#__PURE__*/function () {
  var _ref8 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee10(user) {
    var userProfileFormButtons, userProfileSubSectionFormButtons, transparentButtons, latterDaySaintSwitch, communicationSwitch, commPreference, latterDaySaint;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            userProfileFormButtons = document.querySelectorAll('.user-profile-form__button');
            userProfileSubSectionFormButtons = document.querySelectorAll('.user-profile-form__section__sub-section__button');
            transparentButtons = document.querySelectorAll('.button--small-transparent');
            latterDaySaintSwitch = document.querySelector('.switch--latter-day-saint');
            communicationSwitch = document.getElementById('commSwitch');
            transparentButtons.forEach(function (b, i) {
              b.addEventListener('click', /*#__PURE__*/function () {
                var _ref9 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee8(e) {
                  var firstname, lastname, username, updatedUserInfo, newEmail, newEmailConfirmed, newPhoneNumber, newPhoneNumberConfirmed, updateUserInfo;
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          e.preventDefault();

                          if (!(i === 0)) {
                            _context8.next = 9;
                            break;
                          }

                          firstname = document.getElementById('firstname').value;
                          lastname = document.getElementById('lastname').value;
                          username = document.getElementById('username').value;

                          if (latterDaySaintSwitch.classList.contains('switch--latter-day-saint--switched')) {
                            latterDaySaint = true;
                          }

                          _context8.next = 8;
                          return updateMe({
                            firstname: firstname,
                            lastname: lastname,
                            username: username,
                            latterDaySaint: latterDaySaint,
                            id: user._id
                          });

                        case 8:
                          updatedUserInfo = _context8.sent;

                        case 9:
                          if (!(i === 1)) {
                            _context8.next = 23;
                            break;
                          }

                          communicationSwitch.classList.contains('switch--comms--text-preferred') ? commPreference = "Text" : commPreference = "Email";
                          console.log(commPreference);
                          newEmail = document.getElementById('newEmail').value;
                          newEmailConfirmed = document.getElementById('newEmailConfirmed').value;

                          if (newEmail === '') {
                            newEmail = document.getElementById('email').value;
                          }

                          if (newEmailConfirmed === '') {
                            newEmailConfirmed = document.getElementById('email').value;
                          }

                          newPhoneNumber = document.getElementById('newPhoneNumber').value;
                          newPhoneNumberConfirmed = document.getElementById('newPhoneNumberConfirmed').value;

                          if (newPhoneNumber === '') {
                            newPhoneNumber = document.getElementById('phoneNumber').value;
                          }

                          if (newPhoneNumberConfirmed === '') {
                            newPhoneNumberConfirmed = document.getElementById('phoneNumber').value;
                          }

                          _context8.next = 22;
                          return updateMe({
                            email: newEmail,
                            emailConfirmed: newEmailConfirmed,
                            phoneNumber: newPhoneNumber,
                            phoneNumberConfirmed: newPhoneNumberConfirmed,
                            communicationPreference: commPreference,
                            id: user._id
                          });

                        case 22:
                          updateUserInfo = _context8.sent;

                        case 23:
                          if (!(i === 5)) {
                            _context8.next = 26;
                            break;
                          }

                          _context8.next = 26;
                          return (0,_Login__WEBPACK_IMPORTED_MODULE_5__.logout)(user._id);

                        case 26:
                          if (!(i === 6)) {
                            _context8.next = 29;
                            break;
                          }

                          _context8.next = 29;
                          return deactivateMe(user._id);

                        case 29:
                          if (!(i === 7)) {
                            _context8.next = 32;
                            break;
                          }

                          _context8.next = 32;
                          return deleteMe(user._id);

                        case 32:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                return function (_x12) {
                  return _ref9.apply(this, arguments);
                };
              }());
            });
            transparentButtons[4].addEventListener('click', /*#__PURE__*/function () {
              var _ref10 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee9(e) {
                var currentPassword, newPassword, newPasswordConfirmed, updateUserInfo;
                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        e.preventDefault();
                        console.log(userProfileSubSectionFormButtons);
                        currentPassword = document.getElementById('currentPassword').value;
                        newPassword = document.getElementById('newPassword').value;
                        newPasswordConfirmed = document.getElementById('newPasswordConfirmed').value;
                        _context9.next = 7;
                        return updateMyPassword(currentPassword, newPassword, newPasswordConfirmed, user._id);

                      case 7:
                        updateUserInfo = _context9.sent;

                      case 8:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x13) {
                return _ref10.apply(this, arguments);
              };
            }());

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function _watchForProfileUpdates(_x11) {
    return _ref8.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./Public/JS/Validate.js":
/*!*******************************!*\
  !*** ./Public/JS/Validate.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Validate": () => (/* binding */ Validate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");



////////////////////////////////////////////
//  Core Modules
////////////////////////////////////////////
//  Third Party Modules
////////////////////////////////////////////
//  Third Party Module Instances
////////////////////////////////////////////
//  Third Party Config Files
////////////////////////////////////////////
//  Third Party Middleware
////////////////////////////////////////////
//  My Middleware
////////////////////////////////////////////
//  Routing Middleward
////////////////////////////////////////////
//  My Modules
/////////////////////////////////////////
//  Validator Model
var Validator = /*#__PURE__*/function () {
  function Validator() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Validator);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Validator, [{
    key: "isName",
    value: function isName(name) {
      return /^[A-Za-z]+$/.test(name);
    }
  }, {
    key: "isUsername",
    value: function isUsername(username) {
      return /^[A-Z][A-Za-z0-9]*$/.test(username);
    }
  }, {
    key: "isEmail",
    value: function isEmail(email) {
      return /[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money)+$/.test(email.toLowerCase());
    }
  }, {
    key: "isValidEmailSubject",
    value: function isValidEmailSubject(subject) {
      return /^[^`,@,^,&,+,=,<,>,{,},[,\],;,]*^[^`,@,^,&,+,=,<,>,{,},[,\],;,]+$/.test(subject);
    }
  }, {
    key: "isCompany",
    value: function isCompany(companyName) {
      return /^[^?!*,#,%,*,+,=]*^[^?!*,#,%,*,+,=]*$/.test(companyName);
    }
  }, {
    key: "isCompanyPosition",
    value: function isCompanyPosition(position) {
      return /^[^<,>,|,\[,\],?,!,`,~,!,@,#,$,%,^,&,*,+,=,;]*^[^<,>,|,\[,\],?,!,`,~,!,@,#,$,%,^,&,*,+,=,;]*$/.test(position);
    }
  }, {
    key: "is_Eight_Character_One_Upper_Lower_Number_Special",
    value: function is_Eight_Character_One_Upper_Lower_Number_Special(password) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&\-\_])[A-Za-z\d@$!%&\-\_&]{8,}$/.test(password);
    }
  }]);

  return Validator;
}();

var Validate = new Validator();

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "./node_modules/util/util.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ "./node_modules/foreach/index.js":
/*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
/***/ ((module) => {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = __webpack_require__(/*! es-abstract/helpers/getOwnPropertyDescriptor */ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/node-polyfill-webpack-plugin/node_modules/buffer/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/node-polyfill-webpack-plugin/node_modules/buffer/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/object-inspect/index.js":
/*!**********************************************!*\
  !*** ./node_modules/object-inspect/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

var inspectCustom = (__webpack_require__(/*! ./util.inspect */ "?4f7e").custom);
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
var toStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag !== 'undefined' ? Symbol.toStringTag : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') {
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + [].concat(stringTag || [], protoTag || []).join(': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + ys.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}


/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

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

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else if (cleanRoot !== '__proto__') {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getSideChannel = __webpack_require__(/*! side-channel */ "./node_modules/side-channel/index.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var split = String.prototype.split;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var sentinel = {};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    var tmpSc = sideChannel;
    var step = 0;
    var findFlag = false;
    while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
        // Where object last appeared in the ref tree
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== 'undefined') {
            if (pos === step) {
                throw new RangeError('Cyclic object value');
            } else {
                findFlag = true; // Break while
            }
        }
        if (typeof tmpSc.get(sentinel) === 'undefined') {
            step = 0;
        }
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
                var valuesArray = split.call(String(obj), ',');
                var valuesJoined = '';
                for (var i = 0; i < valuesArray.length; ++i) {
                    valuesJoined += (i === 0 ? '' : ',') + formatter(encoder(valuesArray[i], defaults.encoder, charset, 'value', format));
                }
                return [formatter(keyValue) + '=' + valuesJoined];
            }
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel = getSideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        /* eslint operator-linebreak: [2, "before"] */
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/side-channel/index.js":
/*!********************************************!*\
  !*** ./node_modules/side-channel/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var inspect = __webpack_require__(/*! object-inspect */ "./node_modules/object-inspect/index.js");

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

module.exports = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = __webpack_require__(/*! es-abstract/helpers/getOwnPropertyDescriptor */ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./Public/JS/App.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Validate */ "./Public/JS/Validate.js");
/* harmony import */ var _Base_Forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Base-Forms */ "./Public/JS/Base-Forms.js");
/* harmony import */ var _Budget_Cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Budget-Cards */ "./Public/JS/Budget-Cards.js");
/* harmony import */ var _App_LoggedIn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App-LoggedIn */ "./Public/JS/App-LoggedIn.js");
/* harmony import */ var _Update_User__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Update-User */ "./Public/JS/Update-User.js");
/* harmony import */ var _Signup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Signup */ "./Public/JS/Signup.js");
/* harmony import */ var _Budget_Categories__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Budget-Categories */ "./Public/JS/Budget-Categories.js");
/* harmony import */ var _Budget_Creation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Budget-Creation */ "./Public/JS/Budget-Creation.js");
/* harmony import */ var _Person__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Person */ "./Public/JS/Person.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");










 ///////////////////////////////////////////////
// APP

(function () {
  var App = /*#__PURE__*/function () {
    function App() {
      (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, App);

      /////////////////////////////
      // START UP THE APPLICATION
      this._startApp(); // Eventually, this will be the ONLY function being ran from the constructor of the the app.
      // Budget._watchEmergencyGoalSettings(); // Eventually this will move to the Budget-Creation.js under Watch Budget Creation for page 6 for LDS and 5 for Non-LDS.

    }

    (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(App, [{
      key: "_startApp",
      value: function _startApp() {
        signupFormPage = 0;
        isLoggedIn = false;
        console.log("App Has Started!");
        var domSignupFormPageNumber = document.querySelector('.form__page-number');
        var formButtons = document.querySelectorAll('.buttons');
        var newPerson = _Person__WEBPACK_IMPORTED_MODULE_10__.newPerson;
        newPerson.latterDaySaint = isLatterDaySaint; // WATCH THE ENTRANCE BUTTONS

        _Base_Forms__WEBPACK_IMPORTED_MODULE_3__._watchEntranceButtons(newPerson, forms, signupFormPage); // WATCH THE FORM CLOSING BUTTONS


        _Base_Forms__WEBPACK_IMPORTED_MODULE_3__._watchFormClosers(domSignupFormPageNumber, signupFormPage, forms); // WATCH LATTER DAY SAINT SWITCH


        _Signup__WEBPACK_IMPORTED_MODULE_7__._watchTheLatterDaySaintSwitch(newPerson); // WATCH RESET BUTTON FOR PASSWORD RESETS


        _Update_User__WEBPACK_IMPORTED_MODULE_6__._watchPasswordResetButton(formButtons); // WATCH FOR USER LOGIN


        _App_LoggedIn__WEBPACK_IMPORTED_MODULE_5__._watchForLogin(isLoggedIn);
      }
    }]);

    return App;
  }(); ////////////////////////////////////////////////
  // INITIALIZE SOME STARTING VARIABLES FOR THE APP


  var isLatterDaySaint = false;
  var signupFormPage, isLoggedIn;
  var forms = document.querySelectorAll('.form-container'); /////////////////////////////////////////////////
  // IMMEDIATELY MAKE AN INSTANCE OF THE APP CLASS

  var app = new App();
})();
})();

/******/ })()
;
//# sourceMappingURL=Bundle.js.map