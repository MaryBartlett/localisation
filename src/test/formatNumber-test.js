/**
 * formatNumber tests
 */
'use strict';

var formatNumber = require('../../src/main/formatNumber.js');

describe('formatNumber', function () {
    var localiserScope;

    beforeEach(function() {
        localiserScope = {
            _i18n: {
                numberPrecision: "3",
                numberSeparator: ",",
                numberDelimiter: "."
            }
        };
        localiserScope._i18n.toNumber = jasmine.createSpy('toNumber');
    });  

    it('should throw an error when no value is given to number', function () {
        expect(function () {formatNumber();}).toThrow();
        expect(localiserScope._i18n.toNumber).not.toHaveBeenCalled();

    });

    it('should throw an error when given a string that is not a number', function () {
        expect(function () {formatNumber("abc");}).toThrow();
        expect(localiserScope._i18n.toNumber).not.toHaveBeenCalled();
    });

    it('should call i18n.toNumber when given a number', function () {
        formatNumber.call(localiserScope, 10);

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith
        (10, {precision: localiserScope._i18n.numberPrecision, separator: localiserScope._i18n.numberSeparator, delimiter: localiserScope._i18n.numberDelimiter});
    });    

    it('should call i18n.toNumber when given a string that is a number', function () {
        formatNumber.call(localiserScope, '10');

        expect(localiserScope._i18n.toNumber).toHaveBeenCalledWith
        (10, {precision: localiserScope._i18n.numberPrecision, separator: localiserScope._i18n.numberSeparator, delimiter: localiserScope._i18n.numberDelimiter});
    });
});