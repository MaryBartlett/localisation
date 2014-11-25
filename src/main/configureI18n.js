/**
 * @module configureI18n entry point for configuring i18n-js
 * @desc Sets up all the things on I18n that it is expecting e.g. locale, defaultLocale, translations and pluralization rules  
 */
'use strict';

var  _ = require("lodash"),
    configDeterminator = require("./configurationDeterminator"),

    configureI18n = function (i18n, config) {
        var determinedTerritory,
            determinedLanguage,
            determinedConfig,
            determinedLocale;

        determinedTerritory = configDeterminator.determineTerritory(config.supportedTerritories, config.territory);

        if (_.isUndefined(config.language)) {
            determinedLanguage = configDeterminator.determineLanguage(config.supportedTerritories, config.supportedLanguages, determinedTerritory);
        } else {
            determinedLanguage = configDeterminator.determineLanguage(config.supportedTerritories, config.supportedLanguages, determinedTerritory, config.language);
        }

        determinedLocale = configDeterminator.createLocale(determinedTerritory, determinedLanguage);

        determinedConfig = configDeterminator.createConfig(config.supportedTerritories, config.supportedLanguages, determinedTerritory, determinedLanguage);

        i18n.locale = determinedLocale;
        i18n.defaultLocale = determinedLocale;
        i18n.translations[determinedLocale] = determinedConfig.translations;

        if (determinedConfig.hasOwnProperty('pluralization')) {
            i18n.pluralization[determinedLocale] = determinedConfig.pluralization;
        }

        return {
            i18n: i18n,
            territory: determinedTerritory,
            language: determinedLanguage,
            locale: determinedLocale
        };
    };

module.exports = configureI18n;
