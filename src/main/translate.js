/**
 * @module Translate
 */
'use strict';


var _ = require("lodash"),
    i18n = require("i18n-js"),
    con = require("service-console"),

    /**
    * @function setTranslations  
    * @desc function that sets all the translations that are available for the current locale 
    * @param {object} config - the config, the determined config for this locale, must have translations path
    * @param {string} locale - the locale, four character expected 'xx-XX'
    * @returns {object} i18n with translations (and pluralization rules) attached
    */    
    setTranslations = function (config, locale) {
    // SHOULD THIS BE DONE HERE OR IN SETUP???
        if (!config.translations) {
            con.error('error: no config.translations found for ' + locale);
        } else {
            // this is clumsy, not sure how to handle this yet - once it's being used as an API will figure it out
            // var translationPath = config.translations;
            
            // i18n.translations[locale] = require(translationPath);

            if (config.hasOwnProperty('pluralization')) {
                i18n.pluralization[locale] = config.pluralization;
            }
            return i18n;
            
        }
    },

    /**
    * @function translate  
    * @desc function translates a given key
    * @param {string} key - the key, the string that is required to be translated
    * @param {number} [pluralization] - the number to use for pluralization
    * @param {object} [templateValues] - the template values that are required to be substituted into the string
    * @returns {string} translated string with pluralization and string substitution if required
    * @example
    * json is:
    * "favouriteArtists-favouriteFtuMessage": [
    *   "Der Eintrag wurde zu deinen Favoriten hinzugefügt."
    * ]
    * translate('favouriteArtists-favouriteFtuMessage');
    * returns "Der Eintrag wurde zu deinen Favoriten hinzugefügt."    
    * @example
    * json is:
    * "product-trackCount": {
    *   "one": "{{number}} songONE",
    *   "other": "{{number}} songsOTHER"
    * }
    * translate('product-trackCount', 10);
    * returns "10 songsOTHER"
    * @example
    * json is:
    * "product-trackCount": {
    *   "one": "{{number}} songONE {{word}}",
    *   "other": "{{number}} songsOTHER {{word}}"
    * }
    * translate('product-trackCount', 10, {word: 'bananas'});
    * returns "10 songsOTHER bananas"
    */    
    translate = function (key, pluralization, templateValues) {
        var translatedString = false;

        if (!key) {
            con.error("error: translations did not receive a key to translate");
            return;
        }

        if (_.isNumber(pluralization)) {
            if (_.isObject(templateValues)) {
                translatedString = i18n.p(pluralization, key, templateValues);
            } else {
                translatedString = i18n.p(pluralization, key);
            }
        } else if (_.isObject(templateValues) && !pluralization) {
            translatedString = i18n.t(key, templateValues);
        } else {
            translatedString = i18n.t(key);
        }
        return translatedString;

    };

module.exports = {
    setTranslations: setTranslations,
    translate: translate
};