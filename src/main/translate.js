/**
 * @module Localise translate
 */
'use strict';
    /**
    * @function translate  
    * @desc function translates a given key
    * @param {string} key - the key, the string that is required to be translated
    * @param {number/boolean} [pluralization] - the number to use for pluralization
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

var _ = require('lodash'),
    translate = function (key, pluralization, templateValues) {
        var translatedString = false;

        if (_.isNumber(pluralization)) {
            if (_.isObject(templateValues)) {
                translatedString = this._i18n.p(pluralization, key, templateValues);
            } else {
                translatedString = this._i18n.p(pluralization, key);
            }
        } else if (_.isObject(templateValues) && !pluralization) {
            translatedString = this._i18n.t(key, templateValues);
        } else {
            translatedString = this._i18n.t(key);
        }
        return translatedString;
    };

module.exports = translate;