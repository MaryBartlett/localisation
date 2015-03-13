 /**
 * @module translate
 * @desc module that formats and localises translations
 * @returns translate function
 * @requires lodash
 */
'use strict';
    /**
    * @public
    * @function translate
    * @desc translates a given key, determines whether the translation requires pluralization and/or template value substitution
    * @param {string} key - the key, the string that is required to be translated
    * @param {number/boolean} [pluralization] - the number to use for pluralization
    * @param {object} [templateValues] - the template values that are required to be substituted into the string. There's one default parameter in template values: count. If its present, it will override anything passed in via [pluralization]. 
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
    * and
    * translate('product-trackCount', false, { count: 10});
    * returns "10 songsOTHER"
    * @example
    * json is:
    * "product-trackCount": {
    *   "one": "{{number}} songONE {{word}}",
    *   "other": "{{number}} songsOTHER {{word}}"
    * }
    * translate('product-trackCount', 10, {word: 'bananas'});
    * and
    * translate('product-trackCount', 0, {count: 10, word: 'bananas'});
    * returns "10 songsOTHER bananas"
    * @throws error if missing or incorrect parameters
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

        if (!_.isNumber(pluralization)) {
            pluralization = 0;
        }

        validateParams(key, pluralization, templateValues);

        templateValues =
          _.isObject(templateValues) ?
            _.defaults(templateValues, { count: pluralization } ) :
            { count: pluralization };

        return this._i18n.t(key, templateValues);
    };

module.exports = translate;
