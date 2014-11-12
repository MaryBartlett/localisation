/**
 * LocaliserApi tests
 */
'use strict';

var _ = require('lodash'),
    LocaliserApi = require('../../src/main/localiserApi.js');

describe('localiserApi', function () {
    var validConf = {
        i18n: {},
        language: "str",
        territory: "ing",
        locale: "str_ING"
    },
    localiserInstance;

    it('is a constructor function', function() {
        expect(LocaliserApi).toBeFunction();
    });

    it('the constructor requires valid configuration to be passed in', function() {
        expect(function () {localiserInstance = new LocaliserApi(validConf);}).not.toThrow();
    });

    it('configuration should contain i18n', function () {
        expect(function () {localiserInstance = new LocaliserApi(_.omit(validConf, 'i18n'));}).toThrow();
    });

    it('configuration should contain territory', function () {
        expect(function () {localiserInstance = new LocaliserApi(_.omit(validConf, 'territory'));}).toThrow();
    });

    it('configuration should contain language', function () {
        expect(function () {localiserInstance = new LocaliserApi(_.omit(validConf, 'language'));}).toThrow();
    });

    it('configuration should contain locale', function () {
        expect(function () {localiserInstance = new LocaliserApi(_.omit(validConf, 'locale'));}).toThrow();
    });            
});