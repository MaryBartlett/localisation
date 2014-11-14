/*
 * Localiser acceptance tests
 */
'use strict';

var _ = require('lodash'),
    main = require('../../src/main/main.js');

describe('main', function () {
    _.noop();
    var returnConfig = function (terr) {
        return {
            supportedTerritories: require('./supportedTerritoriesFixture.js'),
            supportedLanguages: require('./supportedLanguagesFixture.js'),
            territory: terr
        };
    };

    it('should set up i18n as expected', function () {
        var config = returnConfig('gb'),
            localiser = main.createLocaliser(config);

        expect(localiser._territory).toBe('gb');
        expect(localiser._language).toBe('en');
        expect(localiser._locale).toBe('en-GB');
        expect(localiser._i18n).toEqual(jasmine.objectContaining({
            locale: 'en-GB',
            defaultLocale: 'en-GB'
        }));
        expect(localiser._i18n.translations).toEqual(jasmine.objectContaining({
            'en-GB': config.supportedLanguages.en.translations
        }));
        expect(localiser._i18n.pluralization).toEqual(jasmine.objectContaining({
            'en-GB': config.supportedLanguages.en.pluralization
        }));
    });

});