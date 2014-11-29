/*
 * Main tests
 */
'use strict';

var _ = require('lodash'),
    rewire = require('rewire'),
    main = rewire('../../src/main/main.js');

describe('main', function () {
    var validConfiguration = {
        territory: 'gb',
        language: 'en',
        supportedTerritories: require('./fixtures/supportedTerr'),
        supportedLanguages: require('./fixtures/supportedLang')
    };

    it('has a create localiser function', function () {
        expect(main.createLocaliser).toBeFunction();
    });

    describe('createLocaliser function', function () {
        var configureI18nSpy,
            i18nSpy,
            localiserApiSpy,
            revertConfigSpy,
            reverti18nSpy,
            revertLocaliserApiSpy,
            i18nConfiguration = {
                i18n: {},
                territory: "str",
                language: "ing",
                locale: "str-ING"
            };

        beforeEach(function() {
            configureI18nSpy = jasmine.createSpy('configureI18n');
            localiserApiSpy = jasmine.createSpy('LocaliserApi');

            revertConfigSpy = main.__set__('configureI18n', configureI18nSpy);
            reverti18nSpy = main.__set__('i18n', i18nSpy);
            revertLocaliserApiSpy = main.__set__('LocaliserApi', localiserApiSpy);

        });

        afterEach(function() {
            revertConfigSpy();
            reverti18nSpy();
            revertLocaliserApiSpy();
        });

        it('requires configuration object', function () {
            expect(function () {main.createLocaliser(null);}).toThrow();
        });
        it('configuration object requires territory string', function () {
            var missingTerritory = _.omit(validConfiguration, 'territory');

            expect(function () {main.createLocaliser(missingTerritory);}).toThrow();
        });
        it('language is optional', function () {
            var localiserInstance = {foo: "bar"},
                missingLanguage = _.omit(validConfiguration, 'language');
            configureI18nSpy.and.returnValue(i18nConfiguration);
            localiserApiSpy.and.returnValue(localiserInstance);

            expect(function () {main.createLocaliser(missingLanguage);}).not.toThrow();
        });
        it('expects configuration object to contain supportedLanguages', function () {
            var missingSupportedLanguages =  _.omit(validConfiguration, 'supportedLanguages');

            expect(function () {main.createLocaliser(missingSupportedLanguages);}).toThrow();
        });        
        it('expects configuration object to contain supportedTerritories', function () {
            var missingSupportedTerritories =  _.omit(validConfiguration, 'supportedTerritories');

            expect(function () {main.createLocaliser(missingSupportedTerritories);}).toThrow();
        });

        it('throws an exception if i18n configuration is invalid', function () {
            configureI18nSpy.and.throwError("Invalid configuration for i18n");

            expect(function () {main.createLocaliser(validConfiguration);}).toThrow();
            expect(configureI18nSpy).toHaveBeenCalledWith(i18nSpy, validConfiguration);
        });

        it('calls localiserApi with correct arguments', function () {
            var localiserInstance = {foo: "bar"},
                returnedLocaliser;
            configureI18nSpy.and.returnValue(i18nConfiguration);
            localiserApiSpy.and.returnValue(localiserInstance);

            returnedLocaliser = main.createLocaliser(validConfiguration);

            expect(returnedLocaliser).toBeObject();
            expect(configureI18nSpy).toHaveBeenCalledWith(i18nSpy, validConfiguration);
            expect(localiserApiSpy).toHaveBeenCalledWith(i18nConfiguration);
            expect(returnedLocaliser).toBe(localiserInstance);
        });
    });
});

