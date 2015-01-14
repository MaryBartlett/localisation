/* jshint camelcase: false */

"use strict";
var _ = require('lodash'),
    supportedLanguagesFixture = _.cloneDeep(require('./fixtures/supportedLang')),
    supportedTerritoriesFixture = _.cloneDeep(require('./fixtures/supportedTerr')),
    i18n = require('i18n-js'),
    configureI18n = require('../main/configureI18n'),
    loadTranslations = require('../main/translationLoader');


describe('translationLoader', function () {

    var localiserScope,
        translations,
        config;

    beforeEach(function () {

        i18n.translations = supportedLanguagesFixture;
        var validConfig = {
            territory: 'gb',
            language: 'en',
            supportedTerritories: supportedTerritoriesFixture,
            supportedLanguages: supportedLanguagesFixture
        };
        config = configureI18n(i18n, validConfig);

        localiserScope = {
            _i18n: i18n,
            translate: require('../main/translate')
        };
        translations = {
            en: {
                translations: {
                    'a_key': 'A Key',
                    'another_key': 'Another Key',
                    helloWorld: 'Hello World...'
                }

            },
            fr: {
                translations: {
                    'a_key': 'Une clé',
                    'another_key': 'Une autre clé',
                    'helloWorld': 'Bonjour Le Monde'
                },
                'territoryOverrides': {
                    'ca': {
                        translations: {
                            'helloWorld': 'Bonjour tout le monde de Canada'
                        }
                    }
                }
            }
        };
    });

    it('should be defined', function () {
        expect(i18n).toBeDefined();
        expect(i18n.reset).toBeDefined();
    });

    it('should add new translations to the defaults for each locale', function () {
        loadTranslations.call(localiserScope, translations, supportedTerritoriesFixture);
        expect(localiserScope._i18n.translations).not.toBe(supportedLanguagesFixture);
    });

    describe('English Translations', function () {
        beforeEach(function () {
            loadTranslations.call(localiserScope, translations, supportedTerritoriesFixture);
        });

        it('should have the expected english translation for a_key', function () {
            expect(localiserScope.translate('a_key')).toBe('A Key');
        });

        it('should have the expected english translation for another_key', function () {
            expect(localiserScope.translate('another_key')).toBe('Another Key');
        });

        it('should have the expected english translation for helloWorld', function () {
            expect(localiserScope.translate('helloWorld')).toBe('Hello World...');
        });
    });

    describe('French Translations', function () {

        beforeEach(function () {
            var validConfig = {
                territory: 'fr',
                language: 'fr',
                supportedTerritories: supportedTerritoriesFixture,
                supportedLanguages: supportedLanguagesFixture
            };
            config = configureI18n(i18n, validConfig);
            localiserScope = {
                _i18n: i18n,
                translate: require('../main/translate')
            };
            loadTranslations.call(localiserScope, translations, supportedTerritoriesFixture);
        });

        it('should have the expected french translation for a_key', function () {
            expect(localiserScope.translate('a_key')).toBe('Une clé');
        });

        it('should have the expected french translation for another_key', function () {
            expect(localiserScope.translate('another_key')).toBe('Une autre clé');
        });

        it('should have the expected french translation for helloWorld', function () {
            expect(localiserScope.translate('helloWorld')).toBe('Bonjour Le Monde');
        });

        describe('Territory Override', function () {
            beforeEach(function () {
                var validConfig = {
                    territory: 'ca', // setting territory to Canada to override
                    language: 'fr',
                    supportedTerritories: supportedTerritoriesFixture,
                    supportedLanguages: supportedLanguagesFixture
                };
                config = configureI18n(i18n, validConfig);
                localiserScope = {
                    _i18n: i18n,
                    translate: require('../main/translate')
                };
                loadTranslations.call(localiserScope, translations, supportedTerritoriesFixture);
            });

            it('should have the expected french canadian translation for helloWorld', function () {
                expect(localiserScope.translate('helloWorld')).toBe('Bonjour tout le monde de Canada');
            });
        });
    });


});
