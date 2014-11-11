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
        supportedTerritories: require('./supportedTerritoriesFixture'),
        supportedLanguages: require('./supportedLanguagesFixture')
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
            revertLocaliserApiSpy;

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
            var missingLanguage = _.omit(validConfiguration, 'language');
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
        // it('configures and returns i18n', function () {
            
        // });

        it('calls localiserApi with correct arguments', function () {
            var apiReturn = {foo: "bar"},
                configuredI18n = {};
            configureI18nSpy.and.returnValue(configuredI18n);
            localiserApiSpy.and.returnValue(apiReturn);

            expect(main.createLocaliser(validConfiguration)).toBe(apiReturn);
            expect(configureI18nSpy).toHaveBeenCalledWith(i18nSpy, validConfiguration);

            expect(localiserApiSpy).toHaveBeenCalledWith(configuredI18n);
        });

    });

});

