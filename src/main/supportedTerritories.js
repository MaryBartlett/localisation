'use strict';
module.exports = {
    'default': {
        territoryDefaultLanguage: 'default'
    },
    'de': {
        currencyFormat: "%n %u",
        currencySymbol: "€",
        territoryDefaultLanguage: "de"
    },
    'fr': {
        currencyFormat: "%n %u",
        currencySymbol: "€",
        territoryDefaultLanguage: "fr"
    },
    'gb': {
        currencyFormat: "%u%n",
        currencySymbol: "£",
        territoryDefaultLanguage: "en"
    },
    'ca': {
        languageOverrides: {
            'fr': {
                currencyFormat: "%u %n",
                currencySymbol: "$CAN"
            }
        },
        currencyFormat: "%n%u",
        currencySymbol: "$",
        territoryDefaultLanguage: "en"
    },
    'vn': {
        currencyFormat: "%n %u",
        currencySymbol: "₫",
        currencyPrecision: 0,
        territoryDefaultLanguage: "vi"
    },
    'pl': {
        currencyFormat: "%n %u",
        currencySymbol: "zł",
        territoryDefaultLanguage: "pl"

    },
    'br': {
        currencyFormat: "%u%n",
        currencySymbol: "R$",
        territoryDefaultLanguage: "pt"
    },
    'pt': {
        currencyFormat: "%n %u",
        currencySymbol: "€",
        territoryDefaultLanguage: "pt"
    }
};