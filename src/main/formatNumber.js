/**
 * @module formatNumber
 * @desc module that formats and localises numbers
 * @returns formatNumber function
 * @requires lodash 
 */
'use strict';

var _ = require('lodash'),

    /**
    * @public
    * @function formatNumber
    * @desc sets up i18n number from the settings in config and localises numbers
    * @param {number | string} number - the number to localise
    * @returns {string} the localised number
    * @throws error if missing or incorrect parameters
    */
    formatNumber = function (number) {
        var numberPrecision = this._i18n.config.numberPrecision,
            numberSeparator = this._i18n.config.numberSeparator,
            numberDelimiter = this._i18n.config.numberDelimiter;

        // n.b. has to be isUndefined here to cater for number being 0
        if (_.isUndefined(number)) {
            throw new Error('formatNumber did not receive a number');
        }
        if (_.isString(number)) {
            number = parseFloat(number);
        }
        if (_.isNaN(number) || _.isUndefined(number)) {
            throw new Error('formatNumber did not receive a number');
        }

    return this._i18n.toNumber(number, { precision: numberPrecision, separator: numberSeparator, delimiter: numberDelimiter });

    };

module.exports = formatNumber;
