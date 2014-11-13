
/**
 * formatCurrency tests
 */
'use strict';

var formatCurrency = require('../../src/main/formatCurrency.js');

describe('formatCurrency', function () {
    var localiserScope;
            
    beforeEach(function() {
        localiserScope = {
            _i18n: {
                currencyFormat: '%n %u',
                currencySymbol: '$',
                currencyPrecision: '2',
                currencySeparator: ',',
                currencyDelimiter: '.'
            }
        };
        localiserScope._i18n.toCurrency = jasmine.createSpy('toCurrency');
    });  

    it('should throw an error when no value is given to currency', function () {
        expect(function () {formatCurrency();}).toThrow();
        expect(localiserScope._i18n.toCurrency).not.toHaveBeenCalled();
    });

    it('should throw an error when given a string that is not a number', function () {
        expect(function () {formatCurrency("abc");}).toThrow();
        expect(localiserScope._i18n.toCurrency).not.toHaveBeenCalled();
    });

    it('should return false and not call i18n.toCurrency when territory is "default"', function () {
        localiserScope._territory = 'default';

        expect(formatCurrency.call(localiserScope, '10')).toBe(false);
        expect(localiserScope._i18n.toCurrency).not.toHaveBeenCalled();

    });

    it('should call i18n.toCurrency when territory is not "default"', function () {
        localiserScope._territory = 'gb';
        formatCurrency.call(localiserScope, 10);

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith
        (10, {format: localiserScope._i18n.currencyFormat, unit: localiserScope._i18n.currencySymbol, 
            precision: localiserScope._i18n.currencyPrecision, separator: localiserScope._i18n.currencySeparator, delimiter: localiserScope._i18n.currencyDelimiter});
    });    

    it('should call i18n.toCurrency when given a number', function () {
        formatCurrency.call(localiserScope, 10);

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith
        (10, {format: localiserScope._i18n.currencyFormat, unit: localiserScope._i18n.currencySymbol, 
            precision: localiserScope._i18n.currencyPrecision, separator: localiserScope._i18n.currencySeparator, delimiter: localiserScope._i18n.currencyDelimiter});
    });    

    it('should call i18n.toCurrency when given a string that is a number', function () {
        formatCurrency.call(localiserScope, '10');

        expect(localiserScope._i18n.toCurrency).toHaveBeenCalledWith
        (10, {format: localiserScope._i18n.currencyFormat, unit: localiserScope._i18n.currencySymbol, 
            precision: localiserScope._i18n.currencyPrecision, separator: localiserScope._i18n.currencySeparator, delimiter: localiserScope._i18n.currencyDelimiter});
    });
});
