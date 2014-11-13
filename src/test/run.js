'use strict';

require('jasmine-expect');


var index = require.context("./", true, /\-test$/);

function runTests( testList ) {
    testList.map(function ( tests ) {
        tests.keys().forEach(tests);
    });
}

runTests([ index ]);
