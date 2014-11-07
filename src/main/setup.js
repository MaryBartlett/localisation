/*
 * Setup for localisation
 */
'use strict';

var _ = require("lodash"),
    supportedTerritories = require('./supportedTerritories'),
    supportedLanguages = require('./supportedLanguages'),
    territoryConfig,
    languageConfig,

    //TODO api doc all functions

    determineTerritory = function (territory) {
        //TODO inverse and just have else clause
        if (supportedTerritories.hasOwnProperty(territory)) {
            territory = territory;
        } else {
            territory = 'default';
        }
        return territory;
    },

    determineLanguage = function (territory, language) {
        if (supportedLanguages.hasOwnProperty(language)) {
            //TODO don't need this step
            language = language;
            //TODO if cluase too big bascally saying if the territory has default language use that
        } else if (supportedTerritories.hasOwnProperty(territory) && supportedTerritories[territory].hasOwnProperty("territoryDefaultLanguage")) {
            language = supportedTerritories[territory].territoryDefaultLanguage;
        } else {
            language = 'default';
        }
        return language;
    },

    determineTerritoryConfig = function (territory, language) {
        //TODO if (weHaveLanguageOverridesForTerritory())
        if (supportedTerritories.hasOwnProperty(territory) && supportedTerritories[territory].hasOwnProperty('languageOverrides') && supportedTerritories[territory].languageOverrides.hasOwnProperty(language)) {
            //TODO merge language overides with terriroty
            territoryConfig = _.extend(supportedTerritories[territory], supportedTerritories[territory].languageOverrides[language]);
        } else {
            territoryConfig = supportedTerritories[territory];
        }
        return territoryConfig;
    },

    determineLanguageConfig = function (territory, language) {
        //TODO if (thereAreLanguageOveridesFOrTerriroty()) { ...
        if (supportedLanguages.hasOwnProperty(language) && supportedLanguages[language].hasOwnProperty('territoryOverrides') && supportedLanguages[language].territoryOverrides.hasOwnProperty(territory)) {
            languageConfig = _.extend(supportedLanguages[language], supportedLanguages[language].territoryOverrides[territory]);
        } else {
            languageConfig = supportedLanguages[language];
        }
        return languageConfig;
    },

    getLocale = function (territory, language) {
        var locale = false,
            //TODO move to top of file as global config
            defaultLocale = 'default-DEFAULT';

        if (territory) {
            //TODO use dtermined territory to determine lang?
            var determinedTerritory = determineTerritory(territory),
                determinedLanguage = determineLanguage(territory, language);
            locale = determinedLanguage.toLowerCase() + '-' + determinedTerritory.toUpperCase();
        } else {
            locale = defaultLocale;
        }
        return locale;        
    },

    getConfig = function (territory, language) {
        //TODO no need to init config
        var config = {};

        if (_.isUndefined(language)) {
            language = determineLanguage(territory);
        }

        territoryConfig = determineTerritoryConfig(territory, language);
        languageConfig = determineLanguageConfig(territory, language);

        // tidy up the config object so it only contains the config for that set up
        territoryConfig = _.omit(territoryConfig, 'languageOverrides');
        languageConfig = _.omit(languageConfig, 'territoryOverrides');

        config = _.extend(languageConfig, territoryConfig);

        return config;        
    };    

module.exports = {
    determineTerritory: determineTerritory,
    determineLanguage: determineLanguage,
    getConfig: getConfig,
    getLocale: getLocale
};