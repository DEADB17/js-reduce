/*jshint node:true*/

'use strict';

var test = require('tape');


var walk = require('../').walk;
var jsonReducer = require('../').jsonReducer;

// transform functions
var id = function (rec, acc, val, key) {
    acc[key] = rec(val);
    return acc;
};
var upKey = function (rec, acc, val, key) {
    acc[key.toUpperCase()] = rec(val);
    return acc;
};

// sample data
var sample1 = [
    {},
    'hello',
    {
        1: 1,
        two: [2, 3, 4]
    },
    1
];

test('walk', function (t) {
    t.plan(2);

    t.deepEqual(walk(jsonReducer(id, id), sample1),
                sample1,
                'id, id, sample1');
    t.deepEqual(walk(jsonReducer(id, upKey), sample1),
                [ {}, 'hello', { 1: 1, TWO: [ 2, 3, 4 ] }, 1 ],
                'id, upKey, sample1');
});
