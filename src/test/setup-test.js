/*
 * Setup tests
 */
'use strict';

var _ = require("lodash"),
    setup = require('../../src/main/setup.js'),
    supportedTerritoriesFixture = require('./supportedTerritoriesFixture'),
    supportedLanguagesFixture = require('./supportedLanguagesFixture');    

describe('setup', function () {

    it('exists', function () {
        expect(setup).toBeDefined();
    });

    it('has a defined api', function () {
        expect(setup.determineTerritory).toBeFunction();
        expect(setup.determineLanguage).toBeFunction();
        expect(setup.getConfig).toBeFunction();
        expect(setup.getLocale).toBeFunction();
    });
});

describe('setup determineTerritory', function () {

    it('should return "default" if no territory given', function () {
        expect(setup.determineTerritory(supportedTerritoriesFixture)).toEqual('default');
    });

    it('should return the territory if a supported territory given', function () {
        expect(setup.determineTerritory(supportedTerritoriesFixture, 'fr')).toEqual('fr');
    });

    it('should return default territory if an unsupported territory given', function () {
        expect(setup.determineTerritory(supportedTerritoriesFixture, 'sa')).toEqual('default');
    });
});

describe('setup determineLanguage', function () {

    it('should return "default" if no language given', function () {
        expect(setup.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture)).toEqual('default');
    });

    it('should return default language for a territory if no language given', function () {
        expect(setup.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb')).toEqual('en');
    });

    it('should return default language for a territory if unsupported language given', function () {
        expect(setup.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb', 'ke')).toEqual('en');
    });

    it('should return "default" language if unsupported language given', function () {
        expect(setup.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'fa', 'ke')).toEqual('default');
    });

    it('should return "default" language if unsupported territory given', function () {
        expect(setup.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'fa')).toEqual('default');
    });

    it('should return language if supported language given', function () {
        expect(setup.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'fr', 'fr')).toEqual('fr');
    });

    it('should return language if supported language given, even with a fake territory', function () {
        expect(setup.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, 'fa', 'fr')).toEqual('fr');
    });

    it('should return language if supported language given, even with a false territory', function () {
        expect(setup.determineLanguage(supportedTerritoriesFixture, supportedLanguagesFixture, false, 'fr')).toEqual('fr');
    });

    describe('setup getLocale', function () {

        it('should return "default" if no parameters given', function () {
            expect(setup.getLocale(supportedTerritoriesFixture, supportedLanguagesFixture)).toEqual('default-DEFAULT');
        });

        it('should return valid locale using default language if only territory given', function () {
            expect(setup.getLocale(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb')).toEqual('en-GB');
        });

        it('should return valid locale if both territory and language given', function () {
            expect(setup.getLocale(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb', 'en')).toEqual('en-GB');
        });
    });

    describe('setup getConfig', function () {


        it('should return empty object if no parameters given', function () {
            expect(setup.getConfig(supportedTerritoriesFixture, supportedLanguagesFixture)).toEqual({});
        });

        it('should return object if valid territory given', function () {
            expect(setup.getConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb')).toEqual(_.extend(supportedTerritoriesFixture.gb, supportedLanguagesFixture.en));
        });

        it('should return object if valid territory and language given', function () {
            expect(setup.getConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb', 'en')).toEqual(_.extend(supportedTerritoriesFixture.gb, supportedLanguagesFixture.en));
        });

        it('should return correct object for territory and language combination', function () {
            expect(setup.getConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'gb', 'de')).toEqual(_.extend(supportedTerritoriesFixture.gb, supportedLanguagesFixture.de));
        });

        it('should return correct object for territory with language overrides', function () {
            var vndeTerritoryConfig =  _.omit(_.extend(supportedTerritoriesFixture.vn, supportedTerritoriesFixture.vn.languageOverrides.de), 'languageOverrides');

            expect(setup.getConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'vn', 'de')).toEqual(_.extend(vndeTerritoryConfig, supportedLanguagesFixture.de));
        });

        it('should return correct object for language with territory overrides', function () {
            var brptLanguageConfig =  _.omit(_.extend(supportedLanguagesFixture.pt, supportedLanguagesFixture.pt.territoryOverrides.br), 'territoryOverrides');

            expect(setup.getConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'br', 'pt')).toEqual(_.extend(supportedTerritoriesFixture.br, brptLanguageConfig));
        });

        it('should return correct object for territory with language and territory overrides', function () {
            var cafrTerritoryConfig = _.omit(_.extend(supportedTerritoriesFixture.ca, supportedTerritoriesFixture.ca.languageOverrides.fr), 'languageOverrides'),
                cafrLanguageConfig =  _.omit(_.extend(supportedLanguagesFixture.fr, supportedLanguagesFixture.fr.territoryOverrides.ca), 'territoryOverrides');

            expect(setup.getConfig(supportedTerritoriesFixture, supportedLanguagesFixture, 'ca', 'fr')).toEqual(_.extend(cafrTerritoryConfig, cafrLanguageConfig));
        });

    });
});
