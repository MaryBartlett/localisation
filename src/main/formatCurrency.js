    /**
 * @module formatCurrency
 * @desc module that formats and localises currency
 * @returns formatCurrency function
 * @requires lodash
 */
'use strict';

var _ = require('lodash'),
    formatCurrency,
    validateTerritory,
    validateNumber;

    /**
    * @public
    * @function formatCurrency
    * @desc sets up i18n currency from the settings in config and localises currency
    * @param {number | string} number - the currency to localise
    * @returns {string} the localised currency
    * @throws error if missing or incorrect parameters
    */
    formatCurrency = function (number) {
        var currencyFormat = this._i18n.config.currencyFormat,
            currencySymbol = this._i18n.config.currencySymbol,
            currencyPrecision = this._i18n.config.currencyPrecision,
            currencySeparator = this._i18n.config.currencySeparator,
            currencyDelimiter = this._i18n.config.currencyDelimiter,
            currencyStripZeros = this._i18n.config.currencyStripInsignificantZeros || false;

        validateTerritory(this._territory);
        validateNumber(number);

        if (_.isString(number)) {
            number = parseFloat(number);
        }

        return this._i18n.toCurrency(number, {
            format: currencyFormat,
            unit: currencySymbol,
            precision: currencyPrecision,
            separator: currencySeparator,
            delimiter: currencyDelimiter,
            'strip_insignificant_zeros': currencyStripZeros
        });
    };

    validateTerritory = function (territory) {
        // if territory is a something we can't handle, don't return a currency
        if (territory === 'default') {
            throw new Error('formatCurrency could not return a localised currency as territory is unknown');
        }
    };

    validateNumber = function (number) {
        // n.b. has to be isUndefined here to cater for number being 0
        if (_.isUndefined(number)) {
            throw new Error('formatCurrency did not receive a number');
        }
        if (_.isString(number)) {
            number = parseFloat(number);
        }
        if (_.isNaN(number) || _.isUndefined(number)) {
            throw new Error('formatCurrency did not receive a number');
        }
    };


    module.exports = formatCurrency;
