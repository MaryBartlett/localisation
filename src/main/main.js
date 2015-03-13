/**
 * @module main
 * @desc entry point to set up localisation
 * @returns createLocaliser function
 * @requires i18n-js, configureI18n, localiserApi, lodash
 */
'use strict';

var  _ = require("lodash"),
    i18n = require("i18n-js"),
    configureI18n = require("./configureI18n"),
    LocaliserApi = require("./localiserApi"),
    /**
    * @public
    * @function createLocaliser
    * @desc function that takes supportedTerritories, supportedLanguages and the territory, configures i18n and returns a new, configured LocaliserApi. Object can also have i18nOverrides property.
    * @param {object} configuration - configuration containing the supportedTerritories, supportedLanguages, territory and i18nOverrides.
    * @returns {object} configured localiser set up as properly with the wrapper functions for localisation attached
    * @throws error if missing or incorrect parameters
    *
    * Via i18nOverrides property, localizer can be created with custum i18n-js
    * settings. See https://github.com/fnando/i18n-js#setting-up for more
    * details.
    *
    * Reason for this capability to override default settings was to introduce
    * engineering english translations. This happens by passing property override:
    *
    * "missingBehaviour": "guess" into createLocalizer.
    *
    * If the key for chosen language is missing, above will then return the
    * key translitterated into a actual translation. 
    *
    * Another useful override property is:
    *
    * "missingTranslationPrefix" : ""
    *
    * If missingBehaviour is set to guess, and translation key is missing, the
    * translitterated translation will be prefixed with string provided in
    * this property to more easily identify the string to be "engineering
    * english".
    *
    */
    createLocaliser = function (configuration) {
        var i18nConfiguration;
        // dont test for i18nOverrides to be present, its not mandatory
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
