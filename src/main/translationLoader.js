/**
 * @module translationLoader
 * @desc module that enables additional translations to be loaded
 * @returns loadTranslations function
 * @requires lodash
 t */
"use strict";

var _ = require('lodash'),
    configureI18n = require('./configureI18n');
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
 * @param translations the translations to load
 */
var loadTranslations = function (translations) {
    var _i18n = _.cloneDeep(this._i18n);
    var locale = this._i18n.currentLocale();
    var _config = {
        territory: locale.substr(-2, 2).toLowerCase(),
        language: locale.substr(0, 2).toLowerCase(),
        supportedLanguages: translations,
        supportedTerritories: this._i18n.territories
    };
    configureI18n(_i18n, _config);
    this._i18n.translations = _.merge(this._i18n.translations, _i18n.translations);
};

module.exports = loadTranslations;
