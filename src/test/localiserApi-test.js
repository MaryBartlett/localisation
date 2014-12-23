/**
 * LocaliserApi tests
 */
'use strict';

var _ = require('lodash'),
    LocaliserApi = require('../../src/main/localiserApi.js');

describe('localiserApi', function () {
    var validConf = {
        i18n: {},
        territory: "str",
        language: "ing",
        locale: "str_ING"
    },
    localiserInstance;

    it('is a constructor function', function () {
        expect(LocaliserApi).toBeFunction();
    });

    describe('constructor function', function () {

        it('requires valid configuration to be passed in', function () {
            expect(function () {
                    localiserInstance = new LocaliserApi(validConf);
                }).not.toThrow();
        });

        it('requires configuration to contain i18n', function () {
            expect(function () {
                    localiserInstance = new LocaliserApi(_.omit(validConf, 'i18n'));
                }).toThrow();
        });

        it('requires configuration to contain territory', function () {
            expect(function () {
                    localiserInstance = new LocaliserApi(_.omit(validConf, 'territory'));
                }).toThrow();
        });

        it('requires configuration to contain language', function () {
            expect(function () {
                    localiserInstance = new LocaliserApi(_.omit(validConf, 'language'));
                }).toThrow();
        });

        it('requires configuration to contain locale', function () {
            expect(function () {
                    localiserInstance = new LocaliserApi(_.omit(validConf, 'locale'));
                }).toThrow();
        });

    });

    describe('instantiated instances ', function () {
        beforeEach(function () {
            localiserInstance = new LocaliserApi(validConf);
        });

        it('should have a get i18n function', function () {
            expect(localiserInstance.getI18n).toBeFunction();
        });

        it('should have a get territory function', function () {
            expect(localiserInstance.getTerritory).toBeFunction();
        });

        it('should have a get language function', function () {
            expect(localiserInstance.getLanguage).toBeFunction();
        });

        it('should have a get locale function', function () {
            expect(localiserInstance.getLocale).toBeFunction();
        });

        it('should have a translate function', function () {
            expect(localiserInstance.translate).toBeFunction();
        });

        it('should have a formatDateTime function', function () {
            expect(localiserInstance.formatDateTime).toBeFunction();
        });

        it('should have a formatNumber function', function () {
            expect(localiserInstance.formatNumber).toBeFunction();
        });

        it('should have a get formatCurrency function', function () {
            expect(localiserInstance.formatCurrency).toBeFunction();
        });

        describe('getI18n function', function () {
            it('should return i18n being used by the localiser', function () {
                expect(localiserInstance.getI18n()).toBe(validConf.i18n);
            });
        });

        describe('getLanguage function', function () {
            it('should return the language of the localiser', function () {
                expect(localiserInstance.getLanguage()).toBe(validConf.language);
            });
        });

        describe('getTerritory function', function () {
            it('should return the territory of the localiser', function () {
                expect(localiserInstance.getTerritory()).toBe(validConf.territory);
            });
        });

        describe('getLocale function', function () {
            it('should return the locale of the localiser', function () {
                expect(localiserInstance.getLocale()).toBe(validConf.locale);
            });
        });
    });
});
