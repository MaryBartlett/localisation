/*
 * configurationDeterminator tests
 */
'use strict';

var _ = require("lodash"),
    configurationDeterminator = require('../../src/main/configurationDeterminator.js'),
    supportedTerritoriesFixture = require('./fixtures/supportedTerr'),
    supportedLanguagesFixture = require('./fixtures/supportedLang');    

describe('configurationDeterminator', function () {

    it('exists', function () {
        expect(configurationDeterminator).toBeDefined();
    });

    it('has a defined api', function () {
        expect(configurationDeterminator.determineTerritory).toBeFunction();
        expect(configurationDeterminator.determineLanguage).toBeFunction();
        expect(configurationDeterminator.createConfig).toBeFunction();
        expect(configurationDeterminator.createLocale).toBeFunction();
    });

    describe('determineTerritory', function () {

        it('should return "default" if no territory given', function () {
            expect(configurationDeterminator.determineTerritory(supportedTerritoriesFixture)).toEqual('default');
        });

        it('should return "default" if numeric territory given', function () {
            expect(configurationDeterminator.determineTerritory(supportedTerritoriesFixture, 123)).toEqual('default');
        });

        it('should return "default" if special character territory given', function () {
            expect(configurationDeterminator.determineTerritory(supportedTerritoriesFixture, "**")).toEqual('default');
        });        

        it('should return "default" if invalid territory given', function () {
            expect(configurationDeterminator.determineTerritory(supportedTerritoriesFixture, "bananas")).toEqual('default');
        });        

        it('should return the territory if a supported territory given', function () {
            expect(configurationDeterminator.determineTerritory(supportedTerritoriesFixture, 'fr')).toEqual('fr');
        });

        it('should return default territory if an unsupported territory given', function () {
            expect(configurationDeterminator.determineTerritory(supportedTerritoriesFixture, 'sa')).toEqual('default');
        });
    });

    describe('determineLanguage', function () {

        it('should return "default" if no language given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture)).toEqual('default');
        });

        it('should return "default" if numeric language given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 123)).toEqual('default');
        });

        it('should return "default" if special character language given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, "**")).toEqual('default');
        });        

        it('should return "default" if invalid language given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, "bananas")).toEqual('default');
        });        

        it('should return default language for a territory if no language given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb')).toEqual('en');
        });

        it('should return default language for a territory if unsupported language given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb', 'ke')).toEqual('en');
        });

        it('should return "default" language if unsupported language given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'fa', 'ke')).toEqual('default');
        });

        it('should return "default" language if unsupported territory given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'fa')).toEqual('default');
        });

        it('should return language if supported language given', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'fr', 'fr')).toEqual('fr');
        });

        it('should return language if supported language given, even with a fake territory', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'fa', 'fr')).toEqual('fr');
        });

        it('should return language if supported language given, even with a false territory', function () {
            expect(configurationDeterminator.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, false, 'fr')).toEqual('fr');
        });
    });

    describe('createLocale', function () {

        it('should return valid locale if both territory and language given', function () {
            expect(configurationDeterminator.createLocale('gb', 'en')).toEqual('en-GB');
        });
    });

    describe('createConfig', function () {

        it('should return empty object if no parameters given', function () {
            expect(configurationDeterminator.createConfig(supportedTerritoriesFixture, supportedLanguagesFixture)).toEqual({});
        });

        it('should return object if valid territory and language given', function () {
            expect(configurationDeterminator.createConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb', 'en'))
            .toEqual(_.extend(supportedTerritoriesFixture.gb, supportedLanguagesFixture.en));
        });

        it('should return correct object for territory and language combination', function () {
            expect(configurationDeterminator.createConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb', 'de'))
            .toEqual(_.extend(supportedTerritoriesFixture.gb, supportedLanguagesFixture.de));
        });

        it('should return correct object for territory with language overrides', function () {
            var vndeTerritoryConfig =  _.omit(_.extend(supportedTerritoriesFixture.vn, supportedTerritoriesFixture.vn.languageOverrides.de), 'languageOverrides');

            expect(configurationDeterminator.createConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'vn', 'de')).toEqual(_.extend(vndeTerritoryConfig, supportedLanguagesFixture.de));
        });

        it('should return correct object for language with territory overrides', function () {
            var brptLanguageConfig =  _.omit(_.extend(supportedLanguagesFixture.pt, supportedLanguagesFixture.pt.territoryOverrides.br), 'territoryOverrides');

            expect(configurationDeterminator.createConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'br', 'pt')).toEqual(_.extend(supportedTerritoriesFixture.br, brptLanguageConfig));
        });

        it('should return correct object for territory with language and territory overrides', function () {
            var cafrTerritoryConfig = _.omit(_.extend(supportedTerritoriesFixture.ca, supportedTerritoriesFixture.ca.languageOverrides.fr), 'languageOverrides'),
                cafrLanguageConfig =  _.omit(_.extend(supportedLanguagesFixture.fr, supportedLanguagesFixture.fr.territoryOverrides.ca), 'territoryOverrides');

            expect(configurationDeterminator.createConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'ca', 'fr')).toEqual(_.extend(cafrTerritoryConfig, cafrLanguageConfig));
        });
    });
});
