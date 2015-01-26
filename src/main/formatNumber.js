/**
 * @module formatNumber
 * @desc module that formats and localises numbers
 * @returns formatNumber function
 * @requires lodash
 */
'use strict';

var _ = require('lodash'),
    formatNumber,
    validateNumber;

    /**
    * @public
    * @function formatNumber
    * @desc sets up i18n number from the settings in config and localises numbers
    * @param {number | string} number - the number to localise
    * @returns {string} the localised number
    * @throws error if missing or incorrect parameters
    */
    formatNumber = function (number) {
        var rawConfig = {
                numberPrecision: this._i18n.config.numberPrecision,
                numberSeparator: this._i18n.config.numberSeparator,
                numberDelimiter: this._i18n.config.numberDelimiter,
                numberStripZeros: this._i18n.config.numberStripInsignificantZeros
        },
            config;

        config = _.defaults(rawConfig, { 'numberStripZeros': true });

        validateNumber(number);

        if (_.isString(number)) {
            number = parseFloat(number);
        }

        return this._i18n.toNumber(number, {
            precision: config.numberPrecision,
            separator: config.numberSeparator,
            delimiter: config.numberDelimiter,
            'strip_insignificant_zeros': config.numberStripZeros
        });
    };

    validateNumber = function (number) {
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
    };

module.exports = formatNumber;
