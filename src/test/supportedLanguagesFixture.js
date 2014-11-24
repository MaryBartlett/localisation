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
            "pluralizationAndStringReplacement": {
                "one": "string replacement {{count}} {{word}} string one",
                "other": "string replacement {{count}} {{word}} string other"
            }
        },
        pluralization: 'function'
    },
    'pt': {
        territoryOverrides: {
            'br': {
                translations: 'pt_BR.json'
            }
        }
    }    

};