/**
 * @module Localise number
 */
'use strict';

var _ = require('lodash'),
    /** 
    * @function formatNumber
    * @desc sets up i18n number from the settings in config
    * @param {number/stringified number} the number to localise
    * @returns {string} the localised number
    */

    formatNumber = function (number) {
        var numberPrecision = this._i18n.numberPrecision,
            numberSeparator = this._i18n.numberSeparator,
            numberDelimiter = this._i18n.numberDelimiter;

        // n.b. has to be isUndefined here to cater for number being 0
        if (_.isUndefined(number)) {
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