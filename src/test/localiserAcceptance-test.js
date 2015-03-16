/*
 * localiser acceptance tests
 */
'use strict';

var main = require('../../src/main/main.js');

describe('localiser acceptance tests', function () {
    var config,
        localiser,
        returnConfig = function (terr) {
            return {
                supportedTerritories: require('./fixtures/supportedTerr.js'),
                supportedLanguages: require('./fixtures/supportedLang.js'),
                territory: terr
            };
        };

    it('should set up i18n as expected', function () {
        config = returnConfig('gb');
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

    describe('engineering english enabled', function () {
        beforeEach(function () {
            config = returnConfig('gb');
            config.i18nOverrides = {};
            config.i18nOverrides.missingBehaviour = 'guess';
            localiser = main.createLocaliser(config);
        });
        it('should generate mock translations without prefix', function () {
            localiser = main.createLocaliser(config);
            expect(localiser.translate).toBeFunction();
            expect(localiser.translate('this.is.scope.key.translatedString')).toEqual('translated string');
            expect(localiser.translate('this.is.scope.key.Translated_String')).toEqual('Translated String');
            var result = 'And we are doing some really long keys here which can then be shown in readable format while developing';
            expect(localiser.translate('this.is.scope.key.AndWeAreDoingSomeReallyLongKeysHereWhichCanThenBeShownInReadableFormatWhileDeveloping')).toEqual(result);
        });

        it('should generate mock translations with prefix', function () {
            config.i18nOverrides.missingTranslationPrefix = 'XYZ: ';
            localiser = main.createLocaliser(config);

            expect(localiser.translate).toBeFunction();
            expect(localiser.translate('this.is.scope.key.translatedString')).toEqual('XYZ: translated string');
            expect(localiser.translate('this.is.scope.key.Translated_String')).toEqual('XYZ: Translated String');
            var result = 'XYZ: And we are doing some really long keys here which can then be shown in readable format while deloping';
            expect(localiser.translate('this.is.scope.key.AndWeAreDoingSomeReallyLongKeysHereWhichCanThenBeShownInReadableFormatWhileDeloping')).toEqual(result);
        });

    });

    describe('translate', function () {

        it('should translate', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);

            expect(localiser.translate).toBeFunction();
            expect(localiser.translate('string')).toEqual('translatedString');
        });

        it('should correctly pluralize strings', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);

            expect(localiser.translate('pluralizationString', 0)).toEqual('0 pluralizationStringOther');
            expect(localiser.translate('pluralizationString', 1)).toEqual('1 pluralizationStringOne');
            expect(localiser.translate('pluralizationString', -1)).toEqual('-1 pluralizationStringOther');
            expect(localiser.translate('pluralizationString', 3)).toEqual('3 pluralizationStringOther');
            expect(localiser.translate('pluralizationString', -3)).toEqual('-3 pluralizationStringOther');
            expect(localiser.translate('pluralizationString', "10")).toEqual('10 pluralizationStringOther');
        });

        it('should correctly pluralize strings when the pluralization rules are complex', function () {
            config = returnConfig('pl');
            localiser = main.createLocaliser(config);

            expect(localiser.translate('pluralizationString', 0)).toEqual('0 pluralizationStringMany');
            expect(localiser.translate('pluralizationString', 1)).toEqual('1 pluralizationStringOne');
            expect(localiser.translate('pluralizationString', 3)).toEqual('3 pluralizationStringFew');
            expect(localiser.translate('pluralizationString', 1.2)).toEqual('1.2 pluralizationStringOther');
            expect(localiser.translate('pluralizationString', -1)).toEqual('-1 pluralizationStringOther');
            expect(localiser.translate('pluralizationString', "10")).toEqual('10 pluralizationStringMany');
        });

        it('should correctly translate and replace any template values for a given key', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);

            expect(localiser.translate('stringReplacementString', false, { word: 'has worked successfully' })).toEqual('string replacement has worked successfully string');
            expect(localiser.translate('stringReplacementString', false, { word: 1 })).toEqual('string replacement 1 string');
            expect(localiser.translate('stringReplacementString', false, { word: "السلام عليكم" })).toEqual('string replacement السلام عليكم string');


            expect(localiser.translate('stringReplacementStringMoreThanOne', false, { word: 'has worked successfully', otherword: 'with more than one replacement' }))
             .toEqual('string replacement has worked successfully string with more than one replacement');

            expect(localiser.translate('stringReplacementStringMoreThanOne', false, { otherword: 'with more than one replacement', word: 'has worked successfully' }))
             .toEqual('string replacement has worked successfully string with more than one replacement');
        });

        it('should correctly translate, pluralize and replace any template values for a given key', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);

            expect(localiser.translate('pluralizationAndStringReplacement', 1, { word: 'has worked successfully' })).toEqual('string replacement 1 has worked successfully string one');
            expect(localiser.translate('pluralizationAndStringReplacement', 3, { word: 'has worked successfully' })).toEqual('string replacement 3 has worked successfully string other');
        });

        it('should correctly translate, pluralize and replace any template values for a given key', function () {
            config = returnConfig('pl');
            localiser = main.createLocaliser(config);

            expect(localiser.translate('pluralizationAndStringReplacement', 0, { word: 'has worked successfully' })).toEqual('string replacement 0 has worked successfully string many');
            expect(localiser.translate('pluralizationAndStringReplacement', 1, { word: 'has worked successfully' })).toEqual('string replacement 1 has worked successfully string one');
            expect(localiser.translate('pluralizationAndStringReplacement', 3, { word: 'has worked successfully' })).toEqual('string replacement 3 has worked successfully string few');
            expect(localiser.translate('pluralizationAndStringReplacement', 1.2, { word: 'has worked successfully' })).toEqual('string replacement 1.2 has worked successfully string other');
            expect(localiser.translate('pluralizationAndStringReplacement', -1, { word: 'has worked successfully' })).toEqual('string replacement -1 has worked successfully string other');
            expect(localiser.translate('pluralizationAndStringReplacement', "10", { word: 'has worked successfully' })).toEqual('string replacement 10 has worked successfully string many');
        });

        it('should correctly translate and replace any template values when those template values contain html containing strings that require translation', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);

            expect(localiser.translate('stringContainingHtml', false,
            { terms:  '<a class="small-link" href="#">' + localiser.translate('terms') + '</a>',
            privacy: '<a class="small-link" href="#">' + localiser.translate('privacy') + '</a>' }))
            .toEqual('By proceeding you agree to the MixRadio <a class="small-link" href="#">Terms &amp; Conditions</a> and <a class="small-link" href="#">Privacy Policy</a>.');
        });

    });

    describe('formatCurrency', function () {

        it('should localise a currency', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);

            expect(localiser.formatCurrency).toBeFunction();
            expect(localiser.formatCurrency('20')).toEqual('£20.00');
            expect(localiser.formatCurrency('1.2')).toEqual('£1.20');
            expect(localiser.formatCurrency('20000000000')).toEqual('£20,000,000,000.00');
            expect(localiser.formatCurrency('-20000000000')).toEqual('-£20,000,000,000.00');

            expect(localiser.formatCurrency(20)).toEqual('£20.00');
            expect(localiser.formatCurrency(1.2)).toEqual('£1.20');
            expect(localiser.formatCurrency(20000000000)).toEqual('£20,000,000,000.00');
            expect(localiser.formatCurrency(-20000000000)).toEqual('-£20,000,000,000.00');
        });

        it('should localise and format a currency with correct currency format, symbol and precision', function () {
            config = returnConfig('vn');
            localiser = main.createLocaliser(config);

            expect(localiser.formatCurrency).toBeFunction();
            expect(localiser.formatCurrency('20')).toEqual('20 $VN');
            expect(localiser.formatCurrency('1.2')).toEqual('1 $VN');
            expect(localiser.formatCurrency('20000000000')).toEqual('20,000,000,000 $VN');
            // n.b. I don't think this is how you correctly show negative currency, but it's the way it's written for now
            expect(localiser.formatCurrency('-20000000000')).toEqual('-20,000,000,000 $VN');

            expect(localiser.formatCurrency(20)).toEqual('20 $VN');
            expect(localiser.formatCurrency(1.2)).toEqual('1 $VN');
            expect(localiser.formatCurrency(20000000000)).toEqual('20,000,000,000 $VN');
            // n.b. I don't think this is how you correctly show negative currency, but it's the way it's written for now
            expect(localiser.formatCurrency(-20000000000)).toEqual('-20,000,000,000 $VN');
        });

        it('should localise and format a currency with correct currency separator and delimiter', function () {
            config = returnConfig('pl');
            localiser = main.createLocaliser(config);

            expect(localiser.formatCurrency).toBeFunction();
            expect(localiser.formatCurrency('20')).toEqual('PL£20;00');
            expect(localiser.formatCurrency('1.2')).toEqual('PL£1;20');
            expect(localiser.formatCurrency('20000000000')).toEqual('PL£20-000-000-000;00');
            expect(localiser.formatCurrency('-20000000000')).toEqual('-PL£20-000-000-000;00');

            expect(localiser.formatCurrency(20)).toEqual('PL£20;00');
            expect(localiser.formatCurrency(1.2)).toEqual('PL£1;20');
            expect(localiser.formatCurrency(20000000000)).toEqual('PL£20-000-000-000;00');
            expect(localiser.formatCurrency(-20000000000)).toEqual('-PL£20-000-000-000;00');
        });

        it('should localise and strip off zeros for territories which have no concept of "pence"', function () {
            config = returnConfig('fi');
            localiser = main.createLocaliser(config);

            expect(localiser.formatCurrency).toBeFunction();
            expect(localiser.formatCurrency('20')).toEqual('20 €');
            expect(localiser.formatCurrency('20000000000')).toEqual('20 000 000 000 €');
            // n.b. I don't think this is how you correctly show negative currency, but it's the way it's written for now
            expect(localiser.formatCurrency('-20000000000')).toEqual('-20 000 000 000 €');

            expect(localiser.formatCurrency(20)).toEqual('20 €');
            expect(localiser.formatCurrency(20000000000)).toEqual('20 000 000 000 €');
            // n.b. I don't think this is how you correctly show negative currency, but it's the way it's written for now
            expect(localiser.formatCurrency(-20000000000)).toEqual('-20 000 000 000 €');

        });
    });


    describe('formatNumber', function () {

        it('should localise a number', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);

            expect(localiser.formatNumber).toBeFunction();
            expect(localiser.formatNumber('20')).toEqual('20');
            expect(localiser.formatNumber('1.2')).toEqual('1.2');
            expect(localiser.formatNumber('20000000000')).toEqual('20,000,000,000');
            expect(localiser.formatNumber('-20000000000')).toEqual('-20,000,000,000');

            expect(localiser.formatNumber(20)).toEqual('20');
            expect(localiser.formatNumber(1.2)).toEqual('1.2');
            expect(localiser.formatNumber(20000000000)).toEqual('20,000,000,000');
            expect(localiser.formatNumber(-20000000000)).toEqual('-20,000,000,000');
        });

        it('should localise and format a number with correct precision', function () {
            config = returnConfig('vn');
            localiser = main.createLocaliser(config);

            expect(localiser.formatNumber).toBeFunction();
            expect(localiser.formatNumber('20')).toEqual('20');
            expect(localiser.formatNumber('1.2')).toEqual('1');
            expect(localiser.formatNumber('20000000000')).toEqual('20,000,000,000');
            expect(localiser.formatNumber('-20000000000')).toEqual('-20,000,000,000');

            expect(localiser.formatNumber(20)).toEqual('20');
            expect(localiser.formatNumber(1.2)).toEqual('1');
            expect(localiser.formatNumber(20000000000)).toEqual('20,000,000,000');
            expect(localiser.formatNumber(-20000000000)).toEqual('-20,000,000,000');
        });

        it('should localise and format a number with correct precision and padding', function () {
            config = returnConfig('fi');
            localiser = main.createLocaliser(config);

            expect(localiser.formatNumber).toBeFunction();
            expect(localiser.formatNumber('20')).toEqual('20,00');
            expect(localiser.formatNumber('1.2')).toEqual('1,20');
            expect(localiser.formatNumber('20000000000')).toEqual('20 000 000 000,00');
            expect(localiser.formatNumber('-20000000000')).toEqual('-20 000 000 000,00');

            expect(localiser.formatNumber(20)).toEqual('20,00');
            expect(localiser.formatNumber(1.2)).toEqual('1,20');
            expect(localiser.formatNumber(20000000000)).toEqual('20 000 000 000,00');
            expect(localiser.formatNumber(-20000000000)).toEqual('-20 000 000 000,00');
        });

        it('should localise and format a number with correct separator and delimiter', function () {
            config = returnConfig('pl');
            localiser = main.createLocaliser(config);

            expect(localiser.formatNumber).toBeFunction();
            expect(localiser.formatNumber('20')).toEqual('20');
            expect(localiser.formatNumber('1.2')).toEqual('1-2');
            expect(localiser.formatNumber('20000000000')).toEqual('20;000;000;000');
            expect(localiser.formatNumber('-20000000000')).toEqual('-20;000;000;000');

            expect(localiser.formatNumber(20)).toEqual('20');
            expect(localiser.formatNumber(1.2)).toEqual('1-2');
            expect(localiser.formatNumber(20000000000)).toEqual('20;000;000;000');
            expect(localiser.formatNumber(-20000000000)).toEqual('-20;000;000;000');
        });
    });


    describe('formatDateTime', function () {

        it('should localise a date, time and dateTime', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);

            expect(localiser.formatDateTime).toBeFunction();
        });

        it('should correctly translate and format a dateTime when passed a Unix Epoch date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime(1412604094352, "dateTime")).toEqual("Monday, 06 October 2014, 15:01 h");
            expect(localiser.formatDateTime(1412604094352, "dateTime", "short")).toEqual("06/10/2014, 15:01 h");
            expect(localiser.formatDateTime(1412604094352, "dateTime", "long")).toEqual("Monday, 06 October 2014, 15:01 h");
        });
        it('should correctly translate and format a dateTime when passed a Unix Epoch date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime(1412604094352, "dateTime")).toEqual("MondayFR, 06 de OctoberFR de 2014, 15:01 heure");
            expect(localiser.formatDateTime(1412604094352, "dateTime", "short")).toEqual("06/10, 15:01 heure");
            expect(localiser.formatDateTime(1412604094352, "dateTime", "long")).toEqual("MondayFR, 06 de OctoberFR de 2014, 15:01 heure");
        });
        it('should correctly translate and format a date when passed a Unix Epoch date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime(1412604094352, "date")).toEqual("6 October 2014");
            expect(localiser.formatDateTime(1412604094352, "date", "short")).toEqual("06/10/2014");
            expect(localiser.formatDateTime(1412604094352, "date", "long")).toEqual("6 October 2014");
        });
        it('should correctly translate and format a date when passed a Unix Epoch date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime(1412604094352, "date")).toEqual("6 de OctoberFR 2014");
            expect(localiser.formatDateTime(1412604094352, "date", "short")).toEqual("06/10/2014");
            expect(localiser.formatDateTime(1412604094352, "date", "long")).toEqual("6 de OctoberFR 2014");
        });
        it('should correctly translate and format a time when passed a Unix Epoch date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime(1412604094352, "time")).toEqual("15:01 h");
            expect(localiser.formatDateTime(1412604094352, "time", "short")).toEqual("15:01 h");
            expect(localiser.formatDateTime(1412604094352, "time", "long")).toEqual("15:01:34 h");
        });
        it('should correctly translate and format a time when passed a Unix Epoch date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime(1412604094352, "time")).toEqual("15:01 heure");
            expect(localiser.formatDateTime(1412604094352, "time", "short")).toEqual("15:01 heure");
            expect(localiser.formatDateTime(1412604094352, "time", "long")).toEqual("15:01 heure");
        });
        it('should correctly translate and format a dateTime when passed a dateString date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "dateTime")).toEqual("Monday, 06 October 2014, 15:10 h");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "dateTime", "short")).toEqual("06/10/2014, 15:10 h");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "dateTime", "long")).toEqual("Monday, 06 October 2014, 15:10 h");
        });
        it('should correctly translate and format a dateTime when passed a dateString date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "dateTime")).toEqual("MondayFR, 06 de OctoberFR de 2014, 15:10 heure");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "dateTime", "short")).toEqual("06/10, 15:10 heure");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "dateTime", "long")).toEqual("MondayFR, 06 de OctoberFR de 2014, 15:10 heure");
        });
        it('should correctly translate and format a date when passed a dateString date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "date")).toEqual("6 October 2014");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "date", "short")).toEqual("06/10/2014");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "date", "long")).toEqual("6 October 2014");
        });
        it('should correctly translate and format a date when passed a dateString date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "date")).toEqual("6 de OctoberFR 2014");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "date", "short")).toEqual("06/10/2014");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "date", "long")).toEqual("6 de OctoberFR 2014");
        });
        it('should correctly translate and format a time when passed a dateString date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "time")).toEqual("15:10 h");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "time", "short")).toEqual("15:10 h");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "time", "long")).toEqual("15:10:48 h");
        });
        it('should correctly translate and format a time when passed a dateString date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "time")).toEqual("15:10 heure");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "time", "short")).toEqual("15:10 heure");
            expect(localiser.formatDateTime("Mon Oct 06 2014 15:10:48 GMT+0100 (BST)", "time", "long")).toEqual("15:10 heure");
        });
        it('should correctly translate and format a dateTime when passed an object date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "dateTime")).toEqual("Monday, 06 October 2014, 15:22 h");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "dateTime", "short")).toEqual("06/10/2014, 15:22 h");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "dateTime", "long")).toEqual("Monday, 06 October 2014, 15:22 h");
        });
        it('should correctly translate and format a dateTime when passed an object date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "dateTime")).toEqual("MondayFR, 06 de OctoberFR de 2014, 15:22 heure");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "dateTime", "short")).toEqual("06/10, 15:22 heure");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "dateTime", "long")).toEqual("MondayFR, 06 de OctoberFR de 2014, 15:22 heure");
        });
        it('should correctly translate and format a date when passed an object date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "date")).toEqual("6 October 2014");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "date", "short")).toEqual("06/10/2014");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "date", "long")).toEqual("6 October 2014");
        });
        it('should correctly translate and format a date when passed an object date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "date")).toEqual("6 de OctoberFR 2014");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "date", "short")).toEqual("06/10/2014");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "date", "long")).toEqual("6 de OctoberFR 2014");
        });
        it('should correctly translate and format a time when passed an object date', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "time")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "time", "short")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "time", "long")).toEqual("15:22:39 h");
        });
        it('should correctly translate and format a time when passed an object date (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "time")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "time", "short")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6, hour: 15, minute: 22, second: 39 }, "time", "long")).toEqual("15:22 heure");
        });
        it('should correctly translate and format a time when passed an object date consisting of strings', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: "6", hour: "15", minute: "22", second: "39" }, "time")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: "6", hour: "15", minute: "22", second: "39" }, "time", "short")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: "6", hour: "15", minute: "22", second: "39" }, "time", "long")).toEqual("15:22:39 h");
        });
        it('should correctly translate and format a time when passed an object date consisting of strings (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: "6", hour: "15", minute: "22", second: "39" }, "time")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: "6", hour: "15", minute: "22", second: "39" }, "time", "short")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: "6", hour: "15", minute: "22", second: "39" }, "time", "long")).toEqual("15:22 heure");
        });
        it('should correctly translate and format a time when passed an object date consisting of strings and numbers', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: 6, hour: "15", minute: "22", second: 39 }, "time")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: 6, hour: "15", minute: "22", second: 39 }, "time", "short")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: 6, hour: "15", minute: "22", second: 39 }, "time", "long")).toEqual("15:22:39 h");
        });
        it('should correctly translate and format a time when passed an object date consisting of strings and numbers (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: 6, hour: "15", minute: "22", second: 39 }, "time")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: 6, hour: "15", minute: "22", second: 39 }, "time", "short")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ year: "2014", month: "10", day: 6, hour: "15", minute: "22", second: 39 }, "time", "long")).toEqual("15:22 heure");
        });
        it('should correctly translate and format a dateTime when passed an object date with missing parameters', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "dateTime")).toEqual("Monday, 06 October 2014, 00:00 h");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "dateTime", "short")).toEqual("06/10/2014, 00:00 h");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "dateTime", "long")).toEqual("Monday, 06 October 2014, 00:00 h");
        });
        it('should correctly translate and format a dateTime when passed an object date with missing parameters (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "dateTime")).toEqual("MondayFR, 06 de OctoberFR de 2014, 00:00 heure");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "dateTime", "short")).toEqual("06/10, 00:00 heure");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "dateTime", "long")).toEqual("MondayFR, 06 de OctoberFR de 2014, 00:00 heure");
        });

        it('should correctly translate and format a dateTime when passed an object date with missing parameters', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "date")).toEqual("6 October 2014");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "date", "short")).toEqual("06/10/2014");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "date", "long")).toEqual("6 October 2014");
        });
        it('should correctly translate and format a dateTime when passed an object date with missing parameters (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "date")).toEqual("6 de OctoberFR 2014");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "date", "short")).toEqual("06/10/2014");
            expect(localiser.formatDateTime({ year: 2014, month: 10, day: 6 }, "date", "long")).toEqual("6 de OctoberFR 2014");

        });
        it('should correctly translate and format a time when passed an object date with missing parameters', function () {
            config = returnConfig('gb');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: false, month: false, day: false, hour: 15, minute: 22, second: 39 }, "time")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ year: false, month: false, day: false, hour: 15, minute: 22, second: 39 }, "time", "short")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ year: false, month: false, day: false, hour: 15, minute: 22, second: 39 }, "time", "long")).toEqual("15:22:39 h");
            expect(localiser.formatDateTime({ hour: 15, minute: 22, second: 39 }, "time")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ hour: 15, minute: 22, second: 39 }, "time", "short")).toEqual("15:22 h");
            expect(localiser.formatDateTime({ hour: 15, minute: 22, second: 39 }, "time", "long")).toEqual("15:22:39 h");
        });
        it('should correctly translate and format a time when passed an object date with missing parameters (fr)', function () {
            config = returnConfig('fr');
            localiser = main.createLocaliser(config);
            expect(localiser.formatDateTime({ year: false, month: false, day: false, hour: 15, minute: 22, second: 39 }, "time")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ year: false, month: false, day: false, hour: 15, minute: 22, second: 39 }, "time", "short")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ year: false, month: false, day: false, hour: 15, minute: 22, second: 39 }, "time", "long")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ hour: 15, minute: 22, second: 39 }, "time")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ hour: 15, minute: 22, second: 39 }, "time", "short")).toEqual("15:22 heure");
            expect(localiser.formatDateTime({ hour: 15, minute: 22, second: 39 }, "time", "long")).toEqual("15:22 heure");
        });
    });
});
