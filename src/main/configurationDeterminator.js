/**
 * @module ConfigurationDeterminator for localisation
 */
'use strict';

var _ = require("lodash"),
    territoryConfig,
    languageConfig,

    /**
    * @function defaultLanguageExistsForTerritory  
    * @desc function that checks if there is a default language for a territory 
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {string} territory - the territory, two character lower case expected
    * @returns {bool} whether a territory has a default language or not
    */    
    defaultLanguageExistsForTerritory = function (supportedTerritories, territory) {
        return (supportedTerritories.hasOwnProperty(territory) && 
            supportedTerritories[territory].hasOwnProperty("territoryDefaultLanguage"));
    },

    /**
    * @function languageOverridesExistForTerritory 
    * @desc function that checks if given territory has language overrides
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {bool} whether a territory has language overrides or not
    */
    languageOverridesExistForTerritory = function (supportedTerritories, territory, language) {
        return (supportedTerritories.hasOwnProperty(territory) && 
            supportedTerritories[territory].hasOwnProperty('languageOverrides') && 
            supportedTerritories[territory].languageOverrides.hasOwnProperty(language));
    },

    /**
    * @function territoryOverridesExistForLanguage 
    * @desc function that checks if given language has territory overrides 
    * @param {object} supportedLanguages - an object containing all the languages we support and the language config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {bool} whether a language has territory overrides or not
    */
    territoryOverridesExistForLanguage = function (supportedLanguages, territory, language) {
        return (supportedLanguages.hasOwnProperty(language) && 
            supportedLanguages[language].hasOwnProperty('territoryOverrides') && 
            supportedLanguages[language].territoryOverrides.hasOwnProperty(territory));
    },    

    /**
    * @function determineTerritory  
    * @desc function that checks if given territory is supported 
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {string} territory - the territory, two character lower case expected
    * @returns {string} the determined territory
    */    
    determineTerritory = function (supportedTerritories, territory) {
        if (!supportedTerritories.hasOwnProperty(territory)) {
            territory = 'default';
        }
        return territory;
    },

    /**
    * @function determineLanguage 
    * @desc function that checks if given language is supported 
    * @param {object} supportedTerritories - an object containing all the territories we support and the territory config
    * @param {object} supportedLanguages - an object containing all the languages we support and the language config
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} [language] - the language, two character lower case expected
    * @returns {string} the determined language
    */
    determineLanguage = function (supportedTerritories, supportedLanguages, territory, language) {
        if (!supportedLanguages.hasOwnProperty(language)) {
            if (defaultLanguageExistsForTerritory(supportedTerritories, territory)) {
                language = supportedTerritories[territory].territoryDefaultLanguage;
            } else {
                language = 'default';
            }            
        }
        return language;
    },

    /**
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
            territoryConfig = _.extend(territoryConfig, territoryConfig.languageOverrides[language]);
        }
        return territoryConfig;
    },

    /**
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
            languageConfig = _.extend(languageConfig, languageConfig.territoryOverrides[territory]);
        }
        return languageConfig;
    },

    /**
    * @function createLocale 
    * @desc function that determines the locale 
    * @param {string} territory - the determined territory, two character lower case expected (unless "default")
    * @param {string} language - the determined language, two character lower case expected (unless "default")
    * @returns {string} the determined locale
    */
    createLocale = function (territory, language) {
        return  language.toLowerCase() + '-' + territory.toUpperCase();    
    },

    /**
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

        return _.extend(territoryConfig, languageConfig);       
    };    

module.exports = {
    determineTerritory: determineTerritory,
    determineLanguage: determineLanguage,
    createConfig: createConfig,
    createLocale: createLocale
};
