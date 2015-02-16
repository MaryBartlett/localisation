'use strict';

module.exports = {
    'fr': {
        territoryOverrides: {
            'ca': {
                translations: 'fr_CA.json'
            }
        },
        translations: {
            "string": "translatedString",
            date: {
                "day_names": ["SundayFR", "MondayFR", "TuesdayFR", "WednesdayFR", "ThursdayFR", "FridayFR", "SaturdayFR"],
                "abbr_day_names": ["SunFR", "MonFR", "TueFR", "WedFR", "ThuFR", "FriFR", "SatFR"],
                "month_names": [null, "JanuaryFR", "FebruaryFR", "MarchFR", "AprilFR", "MayFR", "JuneFR", "JulyFR", "AugustFR", "SeptemberFR", "OctoberFR", "NovemberFR", "DecemberFR"],
                "abbr_month_names": [null, "JanFR", "FebFR", "MarFR", "AprFR", "MayFR", "JunFR", "JulFR", "AugFR", "SeptFR", "OctFR", "NovFR", "DecFR"],
                "meridian": ["amFR", "pmFR"]
            }
        },
        dateFormat: {
            defaultFormat: "%-d de %B %Y",
            shortFormat: "%d/%m/%Y",
            longFormat: "%-d de %B %Y"
        },
        dateTimeFormat: {
            defaultFormat: "%A, %d de %B de %Y, %H:%M heure",
            shortFormat: "%d/%m, %H:%M heure",
            longFormat: "%A, %d de %B de %Y, %H:%M heure"
        },
        timeFormat: {
            defaultFormat: "%H:%M heure",
            shortFormat: "%H:%M heure",
            longFormat: "%H:%M heure"
        }
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
            "stringContainingHtml": "By proceeding you agree to the MixRadio {{terms}} and {{privacy}}.",
            "terms": "Terms &amp; Conditions",
            "privacy": "Privacy Policy",
            "stringReplacementString": "string replacement {{word}} string",
            "stringReplacementStringMoreThanOne": "string replacement {{word}} string {{otherword}}",
            "pluralizationAndStringReplacement": {
                "one": "string replacement {{count}} {{word}} string one",
                "other": "string replacement {{count}} {{word}} string other"
            },
            date: {
                "day_names": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "abbr_day_names": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                "month_names": [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                "abbr_month_names": [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                "meridian": ["am", "pm"]
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
        },
        dateFormat: {
            defaultFormat: "%-d %B %Y",
            shortFormat: "%d/%m/%Y",
            longFormat: "%-d %B %Y"
        },
        timeFormat: {
            defaultFormat: "%H:%M h",
            shortFormat: "%H:%M h",
            longFormat: "%H:%M:%S h"
        },
        dateTimeFormat: {
            defaultFormat: "%A, %d %B %Y, %H:%M h",
            shortFormat: "%d/%m/%Y, %H:%M h",
            longFormat: "%A, %d %B %Y, %H:%M h"
        }
    },
    'pt': {
        dateFormat: {
            defaultFormat: "%-d de %B de %Y",
            shortFormat: "%Y/%m/%-d",
            longFormat: "%A, %-d de %B de %Y"
        },
        dateTimeFormat: {
            defaultFormat: "%-d de %B de %Y %-H:%M",
            shortFormat: "%Y/%m/%-d %-H:%M",
            longFormat: "%A, %-d de %B de %Y %-H:%M"
        },
        timeFormat: {
            defaultFormat: "%-H:%M",
            shortFormat: "%-H:%M",
            longFormat: "%-H:%M:%S"
        },
        territoryOverrides: {
            'br': {
                translations: "pt_BR.json",
                dateFormat: {
                    shortFormat: "%-d/%m/%Y"
                },
                dateTimeFormat: {
                    shortFormat: "%-d/%m/%Y %-H:%M"
                }
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
    },
    'default': {
        translations: {
            "string": "translatedString",
            "pluralizationString": {
                "one": "{{count}} pluralizationStringOne",
                "other": "{{count}} pluralizationStringOther"
            },
            "stringContainingHtml": "By proceeding you agree to the MixRadio {{terms}} and {{privacy}}.",
            "terms": "Terms &amp; Conditions",
            "privacy": "Privacy Policy",
            "stringReplacementString": "string replacement {{word}} string",
            "stringReplacementStringMoreThanOne": "string replacement {{word}} string {{otherword}}",
            "pluralizationAndStringReplacement": {
                "one": "string replacement {{count}} {{word}} string one",
                "other": "string replacement {{count}} {{word}} string other"
            }
        }
    }
};
