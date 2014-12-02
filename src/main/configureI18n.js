/**
 * @module configureI18n entry point for configuring i18n-js
 * @desc Sets up all the things on I18n that it is expecting e.g. locale, defaultLocale, translations and pluralization rules  
 */
'use strict';

var  _ = require("lodash"),
    configDeterminator = require("./configurationDeterminator"),

    createConfig = function (locale, config) {
        var createdConfig = {},
            translations = config.translations,
            pluralization = false;
        
        if (config.hasOwnProperty('pluralization')) {
            pluralization = config.pluralization;
        }

        config = _.omit(config, 'translations');
        config = _.omit(config, 'pluralization');

        if (!_.isEmpty(config)) {
            createdConfig.config = _.cloneDeep(config);
        }

        createdConfig.translations = {};
        createdConfig.translations[locale] = translations;

        if (pluralization) {
            createdConfig.pluralization = {};
            createdConfig.pluralization[locale] = pluralization;
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
        // reset i18n to prevent bleeding of configuration
        i18n.reset();
        i18n.config = {};


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
