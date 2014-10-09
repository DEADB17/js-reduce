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
var isString = function (it) { return classOf(it) === 'String'; };



module.exports = {
    idReducer: function rec(it) {
        if (isArray(it)) {
            return reduceArray([], function (acc, val, key) {
                acc[key] = rec(val);
                return acc;
            }, it);
        } else if (isObject(it)) {
            return reduceObject({}, function (acc, val, key) {
                acc[key] = rec(val);
                return acc;
            }, it);
        } else {
            return it;
        }
    },

    upCaseReducer: function rec(it) {
        if (isArray(it)) {
            return reduceArray([], function (acc, val, key) {
                acc[key] = rec(val);
                return acc;
            }, it);
        } else if (isObject(it)) {
            return reduceObject({}, function (acc, val, key) {
                acc[key.toUpperCase()] = rec(val);
                return acc;
            }, it);
        } else {
            return isString(it) ? it.toUpperCase() : it;
        }
    }
};
