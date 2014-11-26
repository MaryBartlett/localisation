/*
 * Localiser acceptance tests
 */
'use strict';

var _ = require('lodash'),
    main = require('../../src/main/main.js');

describe('localiser acceptance tests', function () {
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

    it('should translate', function () {
        var config = returnConfig('gb'),
            localiser = main.createLocaliser(config);

        expect(localiser.translate).toBeFunction();
        expect(localiser.translate('string')).toEqual('translatedString');
    });

    it('should correctly pluralize strings', function () {
        var config = returnConfig('gb'),
            localiser = main.createLocaliser(config);

        expect(localiser.translate('pluralizationString', 0)).toEqual('0 pluralizationStringOther');
        expect(localiser.translate('pluralizationString', 1)).toEqual('1 pluralizationStringOne');
        expect(localiser.translate('pluralizationString', -1)).toEqual('-1 pluralizationStringOther');
        expect(localiser.translate('pluralizationString', 3)).toEqual('3 pluralizationStringOther');
        expect(localiser.translate('pluralizationString', -3)).toEqual('-3 pluralizationStringOther');
        expect(localiser.translate('pluralizationString', "10")).toEqual('10 pluralizationStringOther');
    });

    it('should correctly pluralize strings when the pluralization rules are complex', function () {
        var config = returnConfig('pl'),
            localiser = main.createLocaliser(config);

        expect(localiser.translate('pluralizationString', 0)).toEqual('0 pluralizationStringMany');
        expect(localiser.translate('pluralizationString', 1)).toEqual('1 pluralizationStringOne');
        expect(localiser.translate('pluralizationString', 3)).toEqual('3 pluralizationStringFew');
        expect(localiser.translate('pluralizationString', 1.2)).toEqual('1.2 pluralizationStringOther');
        expect(localiser.translate('pluralizationString', -1)).toEqual('-1 pluralizationStringOther');
        expect(localiser.translate('pluralizationString', "10")).toEqual('10 pluralizationStringMany');
    });    

    it('should correctly translate and replace any template values for a given key', function () {
        var config = returnConfig('gb'),
            localiser = main.createLocaliser(config);

        expect(localiser.translate('stringReplacementString', false, {word: 'has worked successfully'})).toEqual('string replacement has worked successfully string');
        expect(localiser.translate('stringReplacementString', false, {word: 1})).toEqual('string replacement 1 string');
        expect(localiser.translate('stringReplacementString', false, {word: "السلام عليكم"})).toEqual('string replacement السلام عليكم string');

        
        expect(localiser.translate('stringReplacementStringMoreThanOne', false, {word: 'has worked successfully', otherword: 'with more than one replacement'}))
        .toEqual('string replacement has worked successfully string with more than one replacement');
        
        expect(localiser.translate('stringReplacementStringMoreThanOne', false, {otherword: 'with more than one replacement', word: 'has worked successfully'}))
        .toEqual('string replacement has worked successfully string with more than one replacement');
    });

    it('should correctly translate, pluralize and replace any template values for a given key', function () {
        var config = returnConfig('gb'),
            localiser = main.createLocaliser(config);

        expect(localiser.translate('pluralizationAndStringReplacement', 1, {word: 'has worked successfully'})).toEqual('string replacement 1 has worked successfully string one');
        expect(localiser.translate('pluralizationAndStringReplacement', 3, {word: 'has worked successfully'})).toEqual('string replacement 3 has worked successfully string other');
    });    

    it('should correctly translate, pluralize and replace any template values for a given key', function () {
        var config = returnConfig('pl'),
            localiser = main.createLocaliser(config);

        expect(localiser.translate('pluralizationAndStringReplacement', 0, {word: 'has worked successfully'})).toEqual('string replacement 0 has worked successfully string many');
        expect(localiser.translate('pluralizationAndStringReplacement', 1, {word: 'has worked successfully'})).toEqual('string replacement 1 has worked successfully string one');
        expect(localiser.translate('pluralizationAndStringReplacement', 3, {word: 'has worked successfully'})).toEqual('string replacement 3 has worked successfully string few');
        expect(localiser.translate('pluralizationAndStringReplacement', 1.2, {word: 'has worked successfully'})).toEqual('string replacement 1.2 has worked successfully string other');
        expect(localiser.translate('pluralizationAndStringReplacement', -1, {word: 'has worked successfully'})).toEqual('string replacement -1 has worked successfully string other');
        expect(localiser.translate('pluralizationAndStringReplacement', "10", {word: 'has worked successfully'})).toEqual('string replacement 10 has worked successfully string many');            
    });

});