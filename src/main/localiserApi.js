/**
 * @module LocaliserApi
 */
'use strict';

var _ = require("lodash"),
    LocaliserApi = function (configuredI18n) {

        if (!(_.isObject(configuredI18n) && 
            _.isObject(configuredI18n.i18n) && 
            _.isString(configuredI18n.territory) && 
            _.isString(configuredI18n.language) && 
            _.isString(configuredI18n.locale))) {
            throw new Error('LocaliserApi did not receive the required arguments');
        }
        this._i18n = configuredI18n.i18n;
        this._territory = configuredI18n.territory;       
        this._language = configuredI18n.language;       
        this._locale = configuredI18n.locale;       

    };

LocaliserApi.prototype.getI18n = function () {
    return this._i18n;
};

LocaliserApi.prototype.getTerritory = function () {
    return this._territory;
};

LocaliserApi.prototype.getLanguage = function () {
    return this._language;
};

LocaliserApi.prototype.getLocale = function () {
    return this._locale;
};

LocaliserApi.prototype.translate = require('./translate');

LocaliserApi.prototype.formatDateTime = require('./formatDateTime');

LocaliserApi.prototype.formatNumber = require('./formatNumber');

LocaliserApi.prototype.formatCurrency = require('./formatCurrency');

module.exports = LocaliserApi; 

