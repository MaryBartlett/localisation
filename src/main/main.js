/**
 * @module Entry point for localisation
 */
'use strict';

var  _ = require("lodash"),
    i18n = require("i18n-js"),
    configureI18n = require("configureI18n"),
    LocaliserApi = require("localiserApi"),
    createLocaliser = function (configuration) {
        var configuredI18n;
        if (!(_.isObject(configuration) && 
            _.isObject(configuration.supportedTerritories) && 
            _.isObject(configuration.supportedLanguages) && 
            _.isString(configuration.territory))) {
            throw new Error('createLocaliser did not receive the required arguments');
        }

        configuredI18n = configureI18n(i18n, configuration);

        return new LocaliserApi(configuredI18n);
    };

module.exports = {
    createLocaliser: createLocaliser
};    