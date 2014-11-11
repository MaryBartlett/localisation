/*
 * Translate tests
 */
'use strict';

// var _ = require("lodash"),
//     rewire = require('rewire'),
//     translate = rewire('../../src/main/translate.js');

var translate = require('../../src/main/translate.js');

describe('translate', function () {

    it('exists', function () {
        expect(translate).toBeDefined();
    });

    it('has a defined api', function () {
        expect(translate.setTranslations).toBeFunction();
        expect(translate.translate).toBeFunction();

    });
});
