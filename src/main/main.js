/**
 * @module main
 * @desc entry point to set up localisation
 * @returns createLocaliser function
 * @requires i18n-js, configureI18n, localiserApi, litedash
 */
'use strict';

var _ = require("./litedash"),
    i18n = require("i18n-js"),
    configureI18n = require("./configureI18n"),
    LocaliserApi = require("./localiserApi"),
    /**
    * @public
    * @function createLocaliser
    * @desc function that takes supportedTerritories, supportedLanguages and the territory, configures i18n and returns a new, configured LocaliserApi
    * @param {object} configuration - configuration containing the supportedTerritories, supportedLanguages and the current territory
    * @returns {object} configured localiser set up as properly with the wrapper functions for localisation attached
    * @throws error if missing or incorrect parameters
    */
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
