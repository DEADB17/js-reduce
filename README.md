# js-reduce

Sample functions to traverse and modify a tree of objects and arrays.

```js
var sample = [ {}, 'hello', { 1: 1, two: [2, 3, 4] }, 1 ];

var idReducer = require('../').idReducer;
idReducer(sample); // returns a copy of the original

var upCaseReducer = require('../').upCaseReducer;
upCaseReducer(sample) // -> [ {}, 'HELLO', { 1: 1, TWO: [ 2, 3, 4 ] }, 1 ],
```

To tests `npm test`
