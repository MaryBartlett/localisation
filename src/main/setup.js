/**
 * @module Setup for localisation
 */
'use strict';

var _ = require("lodash"),
    defaultLocale = 'default-DEFAULT',
    territoryConfig,
    languageConfig,

    /**
    * @function defaultLanguageExistsForTerritory  
    * @desc function that checks if there is a default language for a territory 
    * @param {string} territory - the territory, two character lower case expected
    * @returns {bool} whether a territory has a default language or not
    */    
    defaultLanguageExistsForTerritory = function (supportedTerritories, territory) {
        if (supportedTerritories.hasOwnProperty(territory) && 
            supportedTerritories[territory].hasOwnProperty("territoryDefaultLanguage")) {
            return true;
        } return false;

    },

    /**
    * @function languageOverridesExistForTerritory 
    * @desc function that checks if given territory has language overrides 
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {bool} whether a territory has language overrides or not
    */
    languageOverridesExistForTerritory = function (supportedTerritories, territory, language) {
        if (supportedTerritories.hasOwnProperty(territory) && 
            supportedTerritories[territory].hasOwnProperty('languageOverrides') && 
            supportedTerritories[territory].languageOverrides.hasOwnProperty(language)) {
            return true;
        } return false;
    },

    /**
    * @function territoryOverridesExistForLanguage 
    * @desc function that checks if given language has territory overrides 
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {bool} whether a language has territory overrides or not
    */
    territoryOverridesExistForLanguage = function (supportedLanguages, territory, language) {
        if (supportedLanguages.hasOwnProperty(language) && 
            supportedLanguages[language].hasOwnProperty('territoryOverrides') && 
            supportedLanguages[language].territoryOverrides.hasOwnProperty(territory)) {
            return true;
        } return false;
    },    

    /**
    * @function determineTerritory  
    * @desc function that checks if given territory is supported 
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
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {object} the determined territory config
    */
    determineTerritoryConfig = function (supportedTerritories, territory, language) {
        if (languageOverridesExistForTerritory(supportedTerritories, territory, language)) {
            // merge language overrides with territory config
            territoryConfig = _.extend(supportedTerritories[territory], supportedTerritories[territory].languageOverrides[language]);
        } else {
            territoryConfig = supportedTerritories[territory];
        }
        return territoryConfig;
    },

    /**
    * @function determineLanguageConfig 
    * @desc function that determines the config for a given language 
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} language - the language, two character lower case expected
    * @returns {object} the determined language config
    */
    determineLanguageConfig = function (supportedLanguages, territory, language) {
        if (territoryOverridesExistForLanguage(supportedLanguages, territory, language)) {
            // merge territory overrides with language config
            languageConfig = _.extend(supportedLanguages[language], supportedLanguages[language].territoryOverrides[territory]);
        } else {
            languageConfig = supportedLanguages[language];
        }
        return languageConfig;
    },

    /**
    * @function getLocale 
    * @desc function that determines the locale 
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} [language] - the language, two character lower case expected
    * @returns {string} the determined locale
    */
    getLocale = function (supportedTerritories, supportedLanguages, territory, language) {
        var locale = false;

        if (territory) {
            var determinedTerritory = determineTerritory(supportedTerritories, territory),
                determinedLanguage = determineLanguage(supportedTerritories, supportedLanguages, determinedTerritory, language);
            locale = determinedLanguage.toLowerCase() + '-' + determinedTerritory.toUpperCase();
        } else {
            locale = defaultLocale;
        }
        return locale;        
    },

    /**
    * @function getConfig  
    * @desc function that determines the config 
    * @param {string} territory - the territory, two character lower case expected
    * @param {string} [language] - the language, two character lower case expected
    * @returns {object} the determined config
    */
    getConfig = function (supportedTerritories, supportedLanguages, territory, language) {
        if (_.isUndefined(language)) {
            language = determineLanguage(supportedTerritories, supportedLanguages, territory);
        }

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
    getConfig: getConfig,
    getLocale: getLocale
};
