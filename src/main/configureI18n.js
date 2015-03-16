/**
 * @module configureI18n
 * @desc module that sets up all the things on I18n that it is expecting e.g. locale, defaultLocale, translations and pluralization rules
 * @returns configureI18n function
 * @requires configurationDeterminator, lodash
 */
'use strict';

var  _ = require("lodash"),
    configDeterminator = require("./configurationDeterminator"),

    /**
    * @private
    * @function createConfig
    * @desc function that creates a object that contains translations, pluralization, locale and defaultLocale in the required shape so it can be easily merged onto the i18n object
    * @param {string} locale - the determined locale
    * @param {object} config - the determined config
    * @returns {object} configuration object in the correct shape for i18n
    */
    createConfig = function (locale, config) {
        var createdConfig = {},
            translations = config.translations,
            pluralization = false;

        if (config.hasOwnProperty('pluralization')) {
            pluralization = config.pluralization;
        }

        config = _.omit(config, [
            'translations',
            'pluralization',
            'i18nOverrides'
        ]);

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

    /**
    * @public
    * @function configureI18n
    * @desc function that configures i18n
    * @param {object} i18n - the base i18n object
    * @param {object} config - the base configuration object containing supportedTerritories, supportedLanguages and territory
    * @returns {object} object containing i18n - the configured i18n object, territory - the determined territory, language - the determined language, locale - the determined locale
    */
    configureI18n = function (i18n, config) {
        var determinedTerritory,
            determinedLanguage,
            determinedConfig,
            determinedLocale,
            i18nConfig,
            overrides = config.i18nOverrides || {};

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

        if (!_.isEmpty(overrides)) {
          _.merge(i18n, overrides );
        }

        _.merge(i18n, i18nConfig);

        return {
            i18n: i18n,
            territory: determinedTerritory,
            language: determinedLanguage,
            locale: determinedLocale
        };
    };

module.exports = configureI18n;
