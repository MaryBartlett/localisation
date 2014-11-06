'use strict';
module.exports = {
    'default': {
        translations: "file location to be determined",
        dateTranslations: {
            "day_names": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "abbr_day_names": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "month_names": [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "abbr_month_names": [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
            "meridian": ["am", "pm"]
        },
        dateFormat: {
            defaultFormat: "%-d %B %Y",
            shortFormat: "%d/%m/%Y",
            longFormat: "%-d %B %Y"
        },
        dateTimeFormat: {
            defaultFormat: "%A, %d de %B de %Y, %H:%M h",
            shortFormat: "%d/%m, %H:%M h",
            longFormat: "%A, %d de %B de %Y, %H:%M h"
        },
        timeFormat: {
            defaultFormat: "H:%M h",
            shortFormat: "%H:%M h",
            longFormat: "%H:%M h"
        }
    },
    'de': {
        translations: "file location to be determined",
        dateTranslations: {
            "day_names": ["SundayDE", "MondayDE", "TuesdayDE", "WednesdayDE", "ThursdayDE", "FridayDE", "SaturdayDE"],
            "abbr_day_names": ["SunDE", "MonDE", "TueDE", "WedDE", "ThuDE", "FriDE", "SatDE"],
            "month_names": [null, "JanuaryDE", "FebruaryDE", "MarchDE", "AprilDE", "MayDE", "JuneDE", "JulyDE", "AugustDE", "SeptemberDE", "OctoberDE", "NovemberDE", "DecemberDE"],
            "abbr_month_names": [null, "JanDE", "FebDE", "MarDE", "AprDE", "MayDE", "JunDE", "JulDE", "AugDE", "SeptDE", "OctDE", "NovDE", "DecDE"],
            "meridian": ["amDE", "pmDE"]
        },
        dateFormat: {
            defaultFormat: "%-d %B %Y",
            shortFormat: "%d/%m/%Y",
            longFormat: "%-d %B %Y"
        },
        dateTimeFormat: {
            defaultFormat: "%A, %d de %B de %Y, %H:%M h",
            shortFormat: "%d/%m, %H:%M h",
            longFormat: "%A, %d de %B de %Y, %H:%M h"
        },
        timeFormat: {
            defaultFormat: "H:%M h",
            shortFormat: "%H:%M h",
            longFormat: "%H:%M h"
        }
    },
    'fr': {
        territoryOverrides: {
            'ca': {
                translations: "file location to be determined"
            }
        },
        translations: "file location to be determined",
        dateTranslations: {
            "day_names": ["SundayFR", "MondayFR", "TuesdayFR", "WednesdayFR", "ThursdayFR", "FridayFR", "SaturdayFR"],
            "abbr_day_names": ["SunFR", "MonFR", "TueFR", "WedFR", "ThuFR", "FriFR", "SatFR"],
            "month_names": [null, "JanuaryFR", "FebruaryFR", "MarchFR", "AprilFR", "MayFR", "JuneFR", "JulyFR", "AugustFR", "SeptemberFR", "OctoberFR", "NovemberFR", "DecemberFR"],
            "abbr_month_names": [null, "JanFR", "FebFR", "MarFR", "AprFR", "MayFR", "JunFR", "JulFR", "AugFR", "SeptFR", "OctFR", "NovFR", "DecFR"],
            "meridian": ["amFR", "pmFR"]
        },
        dateFormat: {
            defaultFormat: "%-d %B %Y",
            shortFormat: "%d/%m/%Y",
            longFormat: "%-d %B %Y"
        },
        dateTimeFormat: {
            defaultFormat: "%A, %d de %B de %Y, %H:%M h",
            shortFormat: "%d/%m, %H:%M h",
            longFormat: "%A, %d de %B de %Y, %H:%M h"
        },
        timeFormat: {
            defaultFormat: "H:%M h",
            shortFormat: "%H:%M h",
            longFormat: "%H:%M h"
        }
    },
    'pl': {
        translations: "file location to be determined",
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
        },
        dateTranslations: {
            "day_names": ["SundayPL", "MondayPL", "TuesdayPL", "WednesdayPL", "ThursdayPL", "FridayPL", "SaturdayPL"],
            "abbr_day_names": ["SunPL", "MonPL", "TuePL", "WedPL", "ThuPL", "FriPL", "SatPL"],
            "month_names": [null, "JanuaryPL", "FebruaryPL", "MarchPL", "AprilPL", "MayPL", "JunePL", "JulyPL", "AugustPL", "SeptemberPL", "OctoberPL", "NovemberPL", "DecemberPL"],
            "abbr_month_names": [null, "JanPL", "FebPL", "MarPL", "AprPL", "MayPL", "JunPL", "JulPL", "AugPL", "SeptPL", "OctPL", "NovPL", "DecPL"],
            "meridian": ["amPL", "pmPL"]
        },
        dateFormat: {
            defaultFormat: "%-d %B %Y",
            shortFormat: "%d/%m/%Y",
            longFormat: "%-d %B %Y"
        },
        dateTimeFormat: {
            defaultFormat: "%A, %d de %B de %Y, %H:%M h",
            shortFormat: "%d/%m, %H:%M h",
            longFormat: "%A, %d de %B de %Y, %H:%M h"
        },
        timeFormat: {
            defaultFormat: "H:%M h",
            shortFormat: "%H:%M h",
            longFormat: "%H:%M h"
        }
    },
    'en': {
        translations: "file location to be determined",
        dateTranslations: {
            "day_names": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "abbr_day_names": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "month_names": [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "abbr_month_names": [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
            "meridian": ["am", "pm"]
        },
        dateFormat: {
            defaultFormat: "%-d %B %Y",
            shortFormat: "%d/%m/%Y",
            longFormat: "%-d %B %Y"
        },
        dateTimeFormat: {
            defaultFormat: "%A, %d de %B de %Y, %H:%M h",
            shortFormat: "%d/%m, %H:%M h",
            longFormat: "%A, %d de %B de %Y, %H:%M h"
        },
        timeFormat: {
            defaultFormat: "H:%M h",
            shortFormat: "%H:%M h",
            longFormat: "%H:%M h"
        }
    },
    'vi': {
        translations: "file location to be determined"
    },
    'pt': {
        territoryOverrides: {
            'br': {
                translations: "file location to be determined"
            }
        },
        translations: "file location to be determined",
        dateTranslations: {
            "day_names": ["SundayPT", "MondayPT", "TuesdayPT", "WednesdayPT", "ThursdayPT", "FridayPT", "SaturdayPT"],
            "abbr_day_names": ["SunPT", "MonPT", "TuePT", "WedPT", "ThuPT", "FriPT", "SatPT"],
            "month_names": [null, "JanuaryPT", "FebruaryPT", "MarchPT", "AprilPT", "MayPT", "JunePT", "JulyPT", "AugustPT", "SeptemberPT", "OctoberPT", "NovemberPT", "DecemberPT"],
            "abbr_month_names": [null, "JanPT", "FebPT", "MarPT", "AprPT", "MayPT", "JunPT", "JulPT", "AugPT", "SeptPT", "OctPT", "NovPT", "DecPT"],
            "meridian": ["amPT", "pmPT"]
        },
        dateFormat: {
            defaultFormat: "%-d %B %Y",
            shortFormat: "%d/%m/%Y",
            longFormat: "%-d %B %Y"
        },
        dateTimeFormat: {
            defaultFormat: "%A, %d de %B de %Y, %H:%M h",
            shortFormat: "%d/%m, %H:%M h",
            longFormat: "%A, %d de %B de %Y, %H:%M h"
        },
        timeFormat: {
            defaultFormat: "H:%M h",
            shortFormat: "%H:%M h",
            longFormat: "%H:%M h"
        }
    }
};

