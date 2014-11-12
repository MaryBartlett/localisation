/**
 * @module Localise number
 */
'use strict';

var _ = require('lodash'),
    formatNumber = function (number) {
        var numberPrecision = this._i18n.numberPrecision,
            numberSeparator = this._i18n.numberSeparator,
            numberDelimiter = this._i18n.numberDelimiter;

        if (!number) {
            throw new Error('formatNumber did not receive a number');
        }
        if (_.isString(number)) {
            number = parseInt(number, 10);
        }
        if (_.isNaN(number) || _.isUndefined(number)) {
            throw new Error('formatNumber did not receive a number');
        }        

    return this._i18n.toNumber(number, {precision: numberPrecision, separator: numberSeparator, delimiter: numberDelimiter});

    };

module.exports = formatNumber;