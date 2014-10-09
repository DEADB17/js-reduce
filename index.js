/*jshint node:true*/

'use strict';

var reduceArray = function (res, array, op) {
    for (var i = 0, n = array.length; i < n; i += 1) {
        res = op(res, array[i], i, array);
    }
    return res;
};

var reduceObject = function (res, object, op) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            res = op(res, object[key], key, object);
        }
    }
    return res;
};



var classOf = function (it) {
    return Object.prototype.toString.call(it).slice(8,-1);
};
var isArray = function (it) { return classOf(it) === 'Array'; };
var isObject = function (it) { return classOf(it) === 'Object'; };



module.exports = function (arrayFn, objFn, it) {
    return (function transform(it) {
        if (isArray(it)) {
            return reduceArray([], it, function (res, val, key, col) {
                var value = transform(val);
                return arrayFn(res, value, key, col);
            });
        } else if (isObject(it)) {
            return reduceObject({}, it, function (res, val, key, col) {
                var value = transform(val);
                return objFn(res, value, key, col);
            });
        } else {
            return it;
        }
    }(it));
};
