'use strict';

module.exports = {
    'fr': {
        territoryOverrides: {
            'ca': {
                translations: 'fr_CA.json'
            }
        },
        translations: 'fr.json'
    },
    'de': {
        translations: 'de.json'
    },    
    'en': {
        translations: {
            "string": "translatedString",
            "pluralizationString": {
                "one": "{{count}} pluralizationStringOne",
                "other": "{{count}} pluralizationStringOther"
            },
            "stringReplacementString": "string replacement {{word}} string",
            "stringReplacementStringMoreThanOne": "string replacement {{word}} string {{otherword}}",
            "pluralizationAndStringReplacement": {
                "one": "string replacement {{count}} {{word}} string one",
                "other": "string replacement {{count}} {{word}} string other"
            }
        },
        pluralization: function (count) {
            var key = false;
            if (count === 1) {
                key = "one";
            } else {
                key = "other";
            }
            return [key];
        }
    },
    'pt': {
        territoryOverrides: {
            'br': {
                translations: 'pt_BR.json'
            }
        }
    },
    'pl': {
        translations: {
            "pluralizationString": {
                "one": "{{count}} pluralizationStringOne",
                "few": "{{count}} pluralizationStringFew",
                "many": "{{count}} pluralizationStringMany",
                "other": "{{count}} pluralizationStringOther"
            },
            "pluralizationAndStringReplacement": {
                "one": "string replacement {{count}} {{word}} string one",
                "few": "string replacement {{count}} {{word}} string few",
                "many": "string replacement {{count}} {{word}} string many",
                "other": "string replacement {{count}} {{word}} string other"
            }                 
        },
        pluralization: function (count) {
            var key = false;
            if (count === 1) {
                key = "one";
            } else if ([2, 3, 4].indexOf(count % 10) >= 0 && [12, 13, 14].indexOf(count % 100) < 0) {
                key = "few";
            } else if (count % 10 === 0 || [5, 6, 7, 8, 9].indexOf(count % 10) >= 0 || [11, 12, 13, 14].indexOf(count % 100) >= 0) {
                key = "many";
            } else {
                key = "other";
            }
            return [key];
        }
    }    

};