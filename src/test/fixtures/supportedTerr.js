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
        numberPrecision: 0,
        currencyFormat: "%n %u",
        currencySymbol: "$VN",
        languageOverrides: {
            'de': {
                currencyFormat: "%n %u",
                currencySymbol: "$VNDE"
            }
        }
    },
    'pl': {
        territoryDefaultLanguage: "pl",
        currencyDelimiter: '-',
        currencySeparator: ';',
        currencySymbol: "PL£",
        numberDelimiter: ';',
        numberSeparator: '-'
    },
    'fi': {
        currencyFormat: "%n %u",
        currencySymbol: "€",
        currencyPrecision: 2,
        currencySeparator: ",",
        currencyDelimiter: " ",
        currencyStripInsignificantZeros: true,
        numberPrecision: 2,
        numberSeparator: ",",
        numberDelimiter: " ",
        numberStripInsignificantZeros: false,
        territoryDefaultLanguage: "fi"
    },
    'default': {
        territoryDefaultLanguage: 'default'
    }
};
