/*
 * ConfigureI18n tests
 */
'use strict';

var _ = require('lodash'),
    rewire = require('rewire'),
    configureI18n = rewire('../../src/main/configureI18n.js');

describe('configureI18n', function () {
    var configurationDeterminatorSpy,
        i18nObj,
        revert,
        validConfig = {
            territory: 'gb',
            language: 'en',
            supportedTerritories: {},
            supportedLanguages: {}
        },
        resolvedTerritory = 'de',
        resolvedLanguage = 'fr',
        resolvedLocale = 'fr-DE',
        resolvedConfig = {
            translations: {
                foo: "bar"
            }
        };

    beforeEach(function () {

        configurationDeterminatorSpy = jasmine.createSpyObj('setup', ["determineTerritory", "determineLanguage", "createConfig", "createLocale"]);
        i18nObj = {
            translations: {}
        };
        revert = configureI18n.__set__('configDeterminator', configurationDeterminatorSpy);
        configurationDeterminatorSpy.createConfig.and.returnValue(resolvedConfig);

    });

    afterEach(function () {
        revert();
    });

    it('should determine territory', function () {
        configureI18n(i18nObj, validConfig);
        expect(configurationDeterminatorSpy.determineTerritory).toHaveBeenCalledWith(validConfig.supportedTerritories, validConfig.territory);
    });

    it('should determine language', function () {
        configurationDeterminatorSpy.determineTerritory.and.returnValue(resolvedTerritory);
        configureI18n(i18nObj, validConfig);

        expect(configurationDeterminatorSpy.determineLanguage).toHaveBeenCalledWith(validConfig.supportedTerritories, validConfig.supportedLanguages, resolvedTerritory, validConfig.language);        
    });

    it('should determine language if language not given', function () {
        configurationDeterminatorSpy.determineTerritory.and.returnValue(resolvedTerritory);
        configureI18n(i18nObj, _.omit(validConfig, 'language'));

        expect(configurationDeterminatorSpy.determineLanguage).toHaveBeenCalledWith(validConfig.supportedTerritories, validConfig.supportedLanguages, resolvedTerritory);          
    });

    it('should create the locale for the given territory and language', function () {
        configurationDeterminatorSpy.determineTerritory.and.returnValue(resolvedTerritory);
        configurationDeterminatorSpy.determineLanguage.and.returnValue(resolvedLanguage);
        configureI18n(i18nObj, validConfig);

        expect(configurationDeterminatorSpy.createLocale).toHaveBeenCalledWith(resolvedTerritory, resolvedLanguage);
    });

    it('should create the configuration for the given territory and language', function () {
        configurationDeterminatorSpy.determineTerritory.and.returnValue(resolvedTerritory);
        configurationDeterminatorSpy.determineLanguage.and.returnValue(resolvedLanguage);
        configureI18n(i18nObj, validConfig);
        
        expect(configurationDeterminatorSpy.createConfig).toHaveBeenCalledWith(validConfig.supportedTerritories, validConfig.supportedLanguages, resolvedTerritory, resolvedLanguage);        
    });

    it('should configure i18n with the determined locale', function () {
        configurationDeterminatorSpy.determineTerritory.and.returnValue(resolvedTerritory);
        configurationDeterminatorSpy.determineLanguage.and.returnValue(resolvedLanguage);
        configurationDeterminatorSpy.createLocale.and.returnValue(resolvedLocale);
        
        configureI18n(i18nObj, validConfig);

        expect(i18nObj.defaultLocale).toBe(resolvedLocale);
        expect(i18nObj.locale).toBe(resolvedLocale);
    });

    it('should configure i18n with configuration for the determined locale', function () {
        configurationDeterminatorSpy.determineTerritory.and.returnValue(resolvedTerritory);
        configurationDeterminatorSpy.determineLanguage.and.returnValue(resolvedLanguage);
        configurationDeterminatorSpy.createLocale.and.returnValue(resolvedLocale);
        
        configureI18n(i18nObj, validConfig);

        expect(i18nObj.translations[resolvedLocale]).toBe(resolvedConfig.translations);
    });    
});
