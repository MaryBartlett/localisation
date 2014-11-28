/**
 * @module Localise currency
 */
'use strict';

var _ = require('lodash'),
    /** 
    * @function formatCurrency
    * @desc sets up i18n currency from the settings in config
    * @param {number/stringified number} the currency to localise
    * @returns {string} the localised currency
    */
    formatCurrency = function (number) {
        var currencyFormat = this._i18n.config.currencyFormat,
            currencySymbol = this._i18n.config.currencySymbol,
            currencyPrecision = this._i18n.config.currencyPrecision,
            currencySeparator = this._i18n.config.currencySeparator,
            currencyDelimiter = this._i18n.config.currencyDelimiter;

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
        // if territory is a something we can't handle, don't return a currency
        if (this._territory === 'default') {
            throw new Error('formatCurrency could not return a localised currency as territory is unknown');
        }         

        return this._i18n.toCurrency(number, {
            format: currencyFormat, 
            unit: currencySymbol, 
            precision: currencyPrecision, 
            separator: currencySeparator, 
            delimiter: currencyDelimiter
        });
    };

module.exports = formatCurrency;
