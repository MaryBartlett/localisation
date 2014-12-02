/**
 * @module Entry point for localisation
 */
'use strict';

var  _ = require("lodash"),
    i18n = require("i18n-js"),
    configureI18n = require("./configureI18n"),
    LocaliserApi = require("./localiserApi"),
    createLocaliser = function (configuration) {
        var i18nConfiguration;
        if (!(_.isObject(configuration) && 
            _.isObject(configuration.supportedTerritories) && 
            _.isObject(configuration.supportedLanguages) && 
            _.isString(configuration.territory))) {
            throw new Error('createLocaliser did not receive the required arguments');
        }

        i18nConfiguration = configureI18n(i18n, configuration);

        return new LocaliserApi(i18nConfiguration);
    };

module.exports = {
    createLocaliser: createLocaliser
};
