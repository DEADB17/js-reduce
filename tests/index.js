/*jshint node:true*/

'use strict';

var test = require('tape');


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

    var idReducer = require('../').idReducer;
    t.deepEqual(idReducer(sample1),
                sample1,
                'idReducer -> sample1');

    var upCaseReducer = require('../').upCaseReducer;
    t.deepEqual(upCaseReducer(sample1),
                [ {}, 'HELLO', { 1: 1, TWO: [ 2, 3, 4 ] }, 1 ],
                'upCaseReducer -> sample1');
});
