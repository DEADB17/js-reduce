/*jshint node:true*/

'use strict';

var reduceArray = function (acc, op, array) {
    for (var i = 0, n = array.length; i < n; i += 1) {
        acc = op(acc, array[i], i, array);
    }
    return acc;
};

var reduceObject = function (acc, op, object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            acc = op(acc, object[key], key, object);
        }
    }
    return acc;
};



var classOf = function (it) {
    return Object.prototype.toString.call(it).slice(8,-1);
};
var isArray = function (it) { return classOf(it) === 'Array'; };
var isObject = function (it) { return classOf(it) === 'Object'; };



var walk = function (reducer, it) {
    return (function transform(it) {
        return reducer(transform, it);
    }(it));
};

var jsonReducer = function (arrayFn, objFn) {
    return function (transform, it) {
        if (isArray(it)) {
            return reduceArray([], function (acc, val, key, col) {
                return arrayFn(transform, acc, val, key, col);
            }, it);
        } else if (isObject(it)) {
            return reduceObject({}, function (acc, val, key, col) {
                return objFn(transform, acc, val, key, col);
            }, it);
        } else {
            return it;
        }
    };
};

module.exports = {
    walk: walk,
    jsonReducer: jsonReducer
};