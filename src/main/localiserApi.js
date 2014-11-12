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
    };

module.exports = LocaliserApi; 

