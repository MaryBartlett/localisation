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
    validateParams = function (key, pluralization, templateValues) {
        if (!key) {
            throw new Error('translate did not receive a key');
        }

        if (pluralization && pluralization !== 0 && !_.isNumber(pluralization) && _.isNaN(pluralization)) {
            throw new Error('translate did not receive a integer for pluralization');
        }

        if (templateValues && !_.isObject(templateValues)) {
            throw new Error('translate did not receive an object for templateValues');
        }
    },
    translate = function (key, pluralization, templateValues) {
        if (_.isString(pluralization)) {
            pluralization = parseFloat(pluralization);
        }
        validateParams(key, pluralization, templateValues);

        templateValues = _.isObject(templateValues) ? templateValues : undefined;

        // n.b. has to be isNumber here to cater for pluralization being 0
        if (_.isNumber(pluralization)) {
            return this._i18n.p(pluralization, key, templateValues);
        } else {
            return this._i18n.t(key, templateValues);
        }
        return;
    };

module.exports = translate;