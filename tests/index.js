/*jshint node:true*/

'use strict';

var test = require('tape');


var walk = require('../');

// transform functions
var id = function (res, val, key) { res[key] = val; return res; };
var upKey = function (res, val, key) { res[key.toUpperCase()] = val; return res; };

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
    //t.plan(4);

    t.deepEqual(walk(id, id, sample1),
                sample1,
                'id, id, sample1');
    t.deepEqual(walk(id, upKey, sample1),
                [ {}, 'hello', { 1: 1, TWO: [ 2, 3, 4 ] }, 1 ],
                'id, upKey, sample1');

    t.end();
});

console.log();