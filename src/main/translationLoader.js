/**
 * @module translationLoader
 * @desc module that enables additional translations to be loaded
 * @returns loadTranslations function
 * @requires litedash
 */
"use strict";

var _ = require('./litedash'),
    configureI18n = require('./configureI18n'),

    isDefaultLocale = function (locale) {
        return locale === 'default-DEFAULT';
    },

    /**
     * @private
     * @desc Creates the config object that will be used to configure i18n.
     *
     * Takes into account situations where the locale is not supported by our defined
     * list of territory|language pairs and has been set to default-DEFAULT.
     *
     * In this situation rather than extracting the parts of the locale using the substring,
     * just set the territory and language to 'default'.
     *
     * @param {string} locale - The current locale
     * @param {object} translations - The translations to load
     * @param {object} territories - The territories supported by the new translations
     * @returns {object} The object required by the configureI18n function
     */
    createConfig = function (locale, translations, territories) {

        var useDefault = isDefaultLocale(locale),
            territory = useDefault ? 'default' : locale.substr(-2, 2).toLowerCase(),
            language = useDefault ? 'default' : locale.substr(0, 2).toLowerCase();

        return {
            territory: territory,
            language: language,
            supportedLanguages: translations,
            supportedTerritories: territories
        };
    },

    /**
     * load translations into the current configuration
     *
     * NOTE: this function will ALWAYS use the currently configured _i18n locale
     * settings to determine what will be passed to the configureI18n function.
     *
     * The translations object should be structured in the same way as the
     * 'supportedLanguages' test fixture file
     * {@see ../test/fixtures/supportedLang.js}
     *
     * You also need an object that defines the supported territories as the second
     * parameter. The simplest way is to use the supportedTerritories object from
     * the localisation-configuration repo
     * {@see https://github.brislabs.com/web/localisation-configuration}
     *
     * @example
     * var translations = {
     *     en: {
     *         translations: {
     *             string: 'A string',
     *             helloWorld: 'Hello World!'
     *         }
     *     },
     *     fr: {
     *         translations: {
     *             string: 'une chaîne',
     *             helloWorld: 'Bonjour, Tout Le Monde',
     *         },
     *         territoryOverrides: {
     *             ca: {
     *                 translations: {
     *                     helloWorld: 'Bonjour, Tout Le Monde du Canada'
     *                 }
     *             }
     *         }
     *     }
     * }
     *
     * @param {object} translations the translations to load
     * @param {object} territories the territories supported by the new translations
     */
    loadTranslations = function (translations, territories) {
        var _i18n = _.cloneDeep(this._i18n),
            locale = this._i18n.currentLocale(),
            _config = createConfig(locale, translations, territories);
        configureI18n(_i18n, _config);
        this._i18n.translations = _.merge(this._i18n.translations, _i18n.translations);
    };

module.exports = loadTranslations;
