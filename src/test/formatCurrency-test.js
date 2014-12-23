/**
 * formatCurrency tests
 */
'use strict';

var formatCurrency = require('../../src/main/formatCurrency.js');

describe('formatCurrency', function () {
    var localiserScope;

    beforeEach(function () {
        localiserScope = {
            _i18n: {
                config: {
                    currencyFormat: '%n %u',
                    currencySymbol: '$',
                    currencyPrecision: '2',
                    currencySeparator: ',',
                    currencyDelimiter: '.'
                }
            }
        };
        localiserScope._i18n.toCurrency = jasmine.createSpy('toCurrency');
    });

    it('should throw an error when no value is given to currency', function () {
        expect(function () {
                formatCurrency();
            }).toThrow();
        expect(localiserScope._i18n.toCurrency).not.toHaveBeenCalled();
    });

    it('should throw an error when given a string that is not a number', function () {
        expect(function () {
                formatCurrency("abc");
            }).toThrow();
        expect(localiserScope._i18n.toCurrency).not.toHaveBeenCalled();
    });

    it('should throw an error when given a special character that is not a number', function () {
        expect(function () {
                formatCurrency("abc***");
            }).toThrow();
        expect(localiserScope._i18n.toCurrency).not.toHaveBeenCalled();
    });


    it('should return false and not call i18n.toCurrency when territory is "default"', function () {
        localiserScope._territory = 'default';

        expect(function () {
                formatCurrency.call(localiserScope, '10');
            }).toThrow();
        expect(localiserScope._i18n.toCurrency).not.toHaveBeenCalled();

    });

    it('should call i18n.toCurrency when territory is not "default"', function () {
        localiserScope._territory = 'gb';
        formatCurrency.call(localiserScope, 10);

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith(10,
            { format: localiserScope._i18n.config.currencyFormat, unit: localiserScope._i18n.config.currencySymbol,
            precision: localiserScope._i18n.config.currencyPrecision, separator: localiserScope._i18n.config.currencySeparator, delimiter: localiserScope._i18n.config.currencyDelimiter });
    });

    it('should call i18n.toCurrency when given a number', function () {
        formatCurrency.call(localiserScope, 10);

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith(10,
            { format: localiserScope._i18n.config.currencyFormat, unit: localiserScope._i18n.config.currencySymbol,
            precision: localiserScope._i18n.config.currencyPrecision, separator: localiserScope._i18n.config.currencySeparator, delimiter: localiserScope._i18n.config.currencyDelimiter });
    });

    it('should call i18n.toCurrency when given a string that is a number', function () {
        formatCurrency.call(localiserScope, '10');

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith(10,
            { format: localiserScope._i18n.config.currencyFormat, unit: localiserScope._i18n.config.currencySymbol,
            precision: localiserScope._i18n.config.currencyPrecision, separator: localiserScope._i18n.config.currencySeparator, delimiter: localiserScope._i18n.config.currencyDelimiter });
    });

    it('should call i18n.toCurrency when given a big number', function () {
        formatCurrency.call(localiserScope, 1000000000000000000000000000000);

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith(1000000000000000000000000000000,
            { format: localiserScope._i18n.config.currencyFormat, unit: localiserScope._i18n.config.currencySymbol,
            precision: localiserScope._i18n.config.currencyPrecision, separator: localiserScope._i18n.config.currencySeparator, delimiter: localiserScope._i18n.config.currencyDelimiter });
    });

    it('should call i18n.toCurrency when given a small number', function () {
        formatCurrency.call(localiserScope, 0.0000000000000000000000000000001);

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith(0.0000000000000000000000000000001,
         { format: localiserScope._i18n.config.currencyFormat, unit: localiserScope._i18n.config.currencySymbol,
            precision: localiserScope._i18n.config.currencyPrecision, separator: localiserScope._i18n.config.currencySeparator, delimiter: localiserScope._i18n.config.currencyDelimiter });
    });

    it('should call i18n.toCurrency when given a negative number', function () {
        formatCurrency.call(localiserScope, -10);

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith(-10,
            { format: localiserScope._i18n.config.currencyFormat, unit: localiserScope._i18n.config.currencySymbol,
            precision: localiserScope._i18n.config.currencyPrecision, separator: localiserScope._i18n.config.currencySeparator, delimiter: localiserScope._i18n.config.currencyDelimiter });
    });

    it('should call i18n.toCurrency when given zero', function () {
        formatCurrency.call(localiserScope, 0);

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith(0,
            { format: localiserScope._i18n.config.currencyFormat, unit: localiserScope._i18n.config.currencySymbol,
            precision: localiserScope._i18n.config.currencyPrecision, separator: localiserScope._i18n.config.currencySeparator, delimiter: localiserScope._i18n.config.currencyDelimiter });
    });

});
