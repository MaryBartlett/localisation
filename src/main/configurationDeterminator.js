/**
 * @module configurationDeterminator
 * @desc module that determines the valid territory and language to be used, and using those will give the valid configuration for the territory/language combination and also the locale
 * @returns {object} containing the 4 public methods: determineTerritory, determineLanguage, createConfig, createLocale
 * @requires lodash
 */
'use strict';

var _ = require("lodash"),
    territoryConfig,
    languageConfig,

    /**
    * @private
    * @function defaultLanguageExistsForTerritory
    * @desc function that checks if there is a default language for a territory
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {string} territory - the territory, two character lower case expected
    * @returns {bool} whether a territory has a default language or not
    */
    defaultLanguageExistsForTerritory = function (supportedTerritories, territory) {
        return (_.has(supportedTerritories, territory) &&
            _.has(supportedTerritories[territory], "territoryDefaultLanguage"));
    },

    /**
    * @private
    * @function languageOverridesExistForTerritory
    * @desc function that checks if given territory has language overrides
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {bool} whether a territory has language overrides or not
    */
    languageOverridesExistForTerritory = function (supportedTerritories, territory, language) {
        return (_.has(supportedTerritories, territory) &&
            _.has(supportedTerritories[territory], "languageOverrides") &&
            _.has(supportedTerritories[territory].languageOverrides, language));
    },

    /**
    * @private
    * @function territoryOverridesExistForLanguage
    * @desc function that checks if given language has territory overrides
    * @param {object} supportedLanguages - an object containing all the languages we support and the language config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {bool} whether a language has territory overrides or not
    */
    territoryOverridesExistForLanguage = function (supportedLanguages, territory, language) {
        return (_.has(supportedLanguages, language) &&
            _.has(supportedLanguages[language], "territoryOverrides") &&
            _.has(supportedLanguages[language].territoryOverrides, territory));
    },

    /**
    * @public
    * @function determineTerritory
    * @desc function that checks if given territory is supported
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {string} territory - the territory, two character lower case expected
    * @returns {string} the determined territory
    */
    determineTerritory = function (supportedTerritories, territory) {
        if (!_.has(supportedTerritories, territory)) {
            territory = 'default';
        }
        return territory;
    },

    /**
    * @public
    * @function determineLanguage
    * @desc function that checks if given language is supported
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {object} supportedLanguages - an object containing all the languages we support and the language config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} [language] - the language, two character lower case expected
    * @returns {string} the determined language
    */
    determineLanguage = function (supportedTerritories, supportedLanguages, territory, language) {
        if (!_.has(supportedLanguages, language)) {
            if (defaultLanguageExistsForTerritory(supportedTerritories, territory)) {
                language = supportedTerritories[territory].territoryDefaultLanguage;
            } else {
                language = 'default';
            }
        }
        return language;
    },

    /**
    * @private
    * @function determineTerritoryConfig
    * @desc function that determines the config for a given territory
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {object} the determined territory config
    */
    determineTerritoryConfig = function (supportedTerritories, territory, language) {
        territoryConfig = supportedTerritories[territory];

        if (languageOverridesExistForTerritory(supportedTerritories, territory, language)) {
            // merge language overrides with territory config
            territoryConfig = _.merge(territoryConfig, territoryConfig.languageOverrides[language]);
        }
        return territoryConfig;
    },

    /**
    * @private
    * @function determineLanguageConfig
    * @desc function that determines the config for a given language
    * @param {object} supportedLanguages - an object containing all the languages we support and the language config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {object} the determined language config
    */
    determineLanguageConfig = function (supportedLanguages, territory, language) {
        languageConfig = supportedLanguages[language];

        if (territoryOverridesExistForLanguage(supportedLanguages, territory, language)) {
            // merge territory overrides with language config
            languageConfig = _.merge(languageConfig, languageConfig.territoryOverrides[territory]);
        }
        return languageConfig;
    },

    /**
    * @public
    * @function createLocale
    * @desc function that returns the locale, assumes that the territory and language passed in are supported (i.e. determineTerritory and determineLanguage have been called)
    * @param {string} territory - the determined territory, two character lower case expected (unless "default")
    * @param {string} language - the determined language, two character lower case expected (unless "default")
    * @returns {string} the determined locale
    */
    createLocale = function (territory, language) {
        return language.toLowerCase() + '-' + territory.toUpperCase();
    },

    /**
    * @public
    * @function createConfig
    * @desc function that determines the config, assumes that the territory and language passed in are supported (i.e. determineTerritory and determineLanguage have been called)
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {object} supportedLanguages - an object containing all the languages we support and the language config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} [language] - the language, two character lower case expected
    * @returns {object} the determined config
    */
    createConfig = function (supportedTerritories, supportedLanguages, territory, language) {
        territoryConfig = determineTerritoryConfig(supportedTerritories, territory, language);
        languageConfig = determineLanguageConfig(supportedLanguages, territory, language);

        // tidy up the config object so it only contains the config for that set up
        territoryConfig = _.omit(territoryConfig, 'languageOverrides');
        languageConfig = _.omit(languageConfig, 'territoryOverrides');

        return _.merge(territoryConfig, languageConfig);
    };

module.exports = {
    determineTerritory: determineTerritory,
    determineLanguage: determineLanguage,
    createConfig: createConfig,
    createLocale: createLocale
};

