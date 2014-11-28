module.exports = {
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
    'br': {
        currencyFormat: "%u%n",
        currencySymbol: "R$",
        territoryDefaultLanguage: "pt"
    },
    'vn': {
        currencyPrecision: 0,
        languageOverrides: {
            'de': {
                currencyFormat: "%n %u",
                currencySymbol: "$VN"
            }            
        }
    },
    'pl': {
        territoryDefaultLanguage: "pl",
        currencyDelimiter: '-',
        currencySeparator: ';',
        currencySymbol: "PL£"
    }
};