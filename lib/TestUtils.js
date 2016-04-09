'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containKeysHelper = exports.containsHelper = exports.stringContains = exports.objectContains = exports.arrayContains = exports.functionThrows = exports.isA = exports.isObject = exports.isArray = exports.isFunction = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _isEqual = require('is-equal');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isRegex = require('is-regex');

var _isRegex2 = _interopRequireDefault(_isRegex);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _assert = require('./assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns true if the given object is a function.
 */
var isFunction = exports.isFunction = function isFunction(object) {
  return typeof object === 'function';
};

/**
 * Returns true if the given object is an array.
 */
var isArray = exports.isArray = function isArray(object) {
  return Array.isArray(object);
};

/**
 * Returns true if the given object is an object.
 */
var isObject = exports.isObject = function isObject(object) {
  return object && !isArray(object) && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
};

/**
 * Returns true if the given object is an instanceof value
 * or its typeof is the given value.
 */
var isA = exports.isA = function isA(object, value) {
  if (isFunction(value)) return object instanceof value;

  if (value === 'array') return Array.isArray(object);

  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === value;
};

/**
 * Returns true if the given function throws the given value
 * when invoked. The value may be:
 *
 * - undefined, to merely assert there was a throw
 * - a constructor function, for comparing using instanceof
 * - a regular expression, to compare with the error message
 * - a string, to find in the error message
 */
var functionThrows = exports.functionThrows = function functionThrows(fn, context, args, value) {
  try {
    fn.apply(context, args);
  } catch (error) {
    if (value == null) return true;

    if (isFunction(value) && error instanceof value) return true;

    var message = error.message || error;

    if (typeof message === 'string') {
      if ((0, _isRegex2.default)(value) && value.test(error.message)) return true;

      if (typeof value === 'string' && message.indexOf(value) !== -1) return true;
    }
  }

  return false;
};

/**
 * Returns true if the given array contains the value, false
 * otherwise. The compareValues function must return false to
 * indicate a non-match.
 */
var arrayContains = exports.arrayContains = function arrayContains(array, value, compareValues) {
  return array.some(function (item) {
    return compareValues(item, value) !== false;
  });
};

/**
 * Returns true if the given object contains the value, false
 * otherwise. The compareValues function must return false to
 * indicate a non-match.
 */
var objectContains = exports.objectContains = function objectContains(object, value, compareValues) {
  return Object.keys(value).every(function (k) {
    if (isObject(object[k])) {
      return objectContains(object[k], value[k], compareValues);
    }

    return compareValues(object[k], value[k]);
  });
};

/**
 * Returns true if the given string contains the value, false otherwise.
 */
var stringContains = exports.stringContains = function stringContains(string, value) {
  return string.indexOf(value) !== -1;
};

/**
 * Helper function which abstracts away the core
 * functionality from the `toInclude`/`toExclude` methods.
 */
var containsHelper = exports.containsHelper = function containsHelper(actual, value, compareValues, exclude, funcName, message) {
  if (compareValues == null) compareValues = _isEqual2.default;

  (0, _assert2.default)(isArray(actual) || isObject(actual) || typeof actual === 'string', 'The "actual" argument in expect(actual).' + funcName + '() must be an array, object, or a string');

  var condition = false;

  if (isArray(actual)) {
    condition = arrayContains(actual, value, compareValues);
  } else if (isObject(actual)) {
    condition = objectContains(actual, value, compareValues);
  } else {
    condition = stringContains(actual, value);
  }

  (0, _assert2.default)(exclude ? !condition : condition, message, actual, value);
};

/**
 * Helper function which abstracts away the core
 * functionality from the `toIncludeKeys`/`toExcludeKeys`
 * methods.
 */
var containKeysHelper = exports.containKeysHelper = function containKeysHelper(actual, keys, hasKey, exclude, funcName, message) {
  if (!isArray(keys)) keys = [keys];

  if (hasKey == null) hasKey = _has2.default;

  (0, _assert2.default)((typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) === 'object', 'The "actual" argument in expect(actual).' + funcName + '() must be an object, not %s', typeof actual === 'undefined' ? 'undefined' : _typeof(actual));

  var condition = keys.reduce(function (previous, key) {
    return previous && hasKey(actual, key);
  }, true);

  (0, _assert2.default)(exclude ? !condition : condition, message, actual, keys.join(', '));
};