/**
 * @module configureI18n entry point for configuring i18n-js
 * @desc Sets up all the things on I18n that it is expecting e.g. locale, defaultLocale, translations and pluralization rules  
 */
'use strict';

var  _ = require("lodash"),
    configDeterminator = require("./configurationDeterminator"),

    createConfig = function (locale, config) {
        var createdConfig;

        createdConfig = _.cloneDeep(config);
        _.omit(createdConfig, 'translations');
        _.omit(createdConfig, 'pluralization');
        createdConfig.translations = {};
        createdConfig.translations[locale] = config.translations;
        if (config.hasOwnProperty('pluralization')) {
            createdConfig.pluralization = {};
            createdConfig.pluralization[locale] = config.pluralization;
        }
        createdConfig.locale = locale;
        createdConfig.defaultLocale = locale;

        return createdConfig;
    },

    configureI18n = function (i18n, config) {
        var determinedTerritory,
            determinedLanguage,
            determinedConfig,
            determinedLocale,
            i18nConfig;

        determinedTerritory = configDeterminator.determineTerritory(config.supportedTerritories, config.territory);

        if (_.isUndefined(config.language)) {
            determinedLanguage = configDeterminator.determineLanguage(config.supportedTerritories, config.supportedLanguages, determinedTerritory);
        } else {
            determinedLanguage = configDeterminator.determineLanguage(config.supportedTerritories, config.supportedLanguages, determinedTerritory, config.language);
        }

        determinedLocale = configDeterminator.createLocale(determinedTerritory, determinedLanguage);

        determinedConfig = configDeterminator.createConfig(config.supportedTerritories, config.supportedLanguages, determinedTerritory, determinedLanguage);

        i18nConfig = createConfig(determinedLocale, determinedConfig);

        _.merge(i18n, i18nConfig);


        return {
            i18n: i18n,
            territory: determinedTerritory,
            language: determinedLanguage,
            locale: determinedLocale
        };
    };

module.exports = configureI18n;
