/**
 * formatNumber tests
 */
'use strict';

var formatNumber = require('../../src/main/formatNumber.js');

describe('formatNumber', function () {
    var localiserScope;

    beforeEach(function () {
        localiserScope = {
            _i18n: {
                config: {
                    numberPrecision: "3",
                    numberSeparator: ",",
                    numberDelimiter: "."
                }
            }
        };
        localiserScope._i18n.toNumber = jasmine.createSpy('toNumber');
    });

    it('should throw an error when no value is given to number', function () {
        expect(function () {
                formatNumber();
            }).toThrow();
        expect(localiserScope._i18n.toNumber).not.toHaveBeenCalled();

    });

    it('should throw an error when given a string that is not a number', function () {
        expect(function () {
                formatNumber("abc");
            }).toThrow();
        expect(localiserScope._i18n.toNumber).not.toHaveBeenCalled();
    });

    it('should throw an error when given a special character that is not a number', function () {
        expect(function () {
                formatNumber("abc***");
            }).toThrow();
        expect(localiserScope._i18n.toNumber).not.toHaveBeenCalled();
    });

    it('should call i18n.toNumber when given a number', function () {
        formatNumber.call(localiserScope, 10);

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith(10,
            { precision: localiserScope._i18n.config.numberPrecision, separator: localiserScope._i18n.config.numberSeparator,
                delimiter: localiserScope._i18n.config.numberDelimiter, 'strip_insignificant_zeros': true });
    });

    it('should call i18n.toNumber when given zero', function () {
        formatNumber.call(localiserScope, 0);

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith(0,
            { precision: localiserScope._i18n.config.numberPrecision, separator: localiserScope._i18n.config.numberSeparator,
                delimiter: localiserScope._i18n.config.numberDelimiter, 'strip_insignificant_zeros': true });
    });

    it('should call i18n.toNumber when given a big number', function () {
        formatNumber.call(localiserScope, 1000000000000000000000000000000);

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith(1000000000000000000000000000000,
            { precision: localiserScope._i18n.config.numberPrecision, separator: localiserScope._i18n.config.numberSeparator,
                delimiter: localiserScope._i18n.config.numberDelimiter, 'strip_insignificant_zeros': true });
    });

    it('should call i18n.toNumber when given a small number', function () {
        formatNumber.call(localiserScope, 0.0000000000000000000000000000001);

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith(0.0000000000000000000000000000001,
            { precision: localiserScope._i18n.config.numberPrecision, separator: localiserScope._i18n.config.numberSeparator,
                delimiter: localiserScope._i18n.config.numberDelimiter, 'strip_insignificant_zeros': true });
    });

    it('should call i18n.toNumber when given a negative number', function () {
        formatNumber.call(localiserScope, -10);

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith(-10,
            { precision: localiserScope._i18n.config.numberPrecision, separator: localiserScope._i18n.config.numberSeparator,
                delimiter: localiserScope._i18n.config.numberDelimiter, 'strip_insignificant_zeros': true });
    });

    it('should call i18n.toNumber when given a string that is a number', function () {
        formatNumber.call(localiserScope, '10');

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith(10,
            { precision: localiserScope._i18n.config.numberPrecision, separator: localiserScope._i18n.config.numberSeparator,
                delimiter: localiserScope._i18n.config.numberDelimiter, 'strip_insignificant_zeros': true });
    });

    it('should allow strip_insignificant_zeros to be overridden with false', function () {
        localiserScope._i18n.config.numberStripInsignificantZeros = false;

        formatNumber.call(localiserScope, 10);

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith(10,
            { precision: localiserScope._i18n.config.numberPrecision, separator: localiserScope._i18n.config.numberSeparator,
                delimiter: localiserScope._i18n.config.numberDelimiter, 'strip_insignificant_zeros': false });
    });

    it('should allow strip_insignificant_zeros to be explicitly set to true', function () {
        localiserScope._i18n.config.numberStripInsignificantZeros = true;

        formatNumber.call(localiserScope, 10);

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith(10,
            { precision: localiserScope._i18n.config.numberPrecision, separator: localiserScope._i18n.config.numberSeparator,
                delimiter: localiserScope._i18n.config.numberDelimiter, 'strip_insignificant_zeros': true });
    });

});
