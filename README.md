#Localisation [![!Build Status](http://btdevapsrvjenkins05.brislabs.com:8080/job/localisation-CI/badge/icon)](http://btdevapsrvjenkins05.brislabs.com:8080/job/localisation-CI/)


A project for localising 
 - translations
 - date
 - currency
 - number

Uses <a href="https://github.com/fnando/i18n-js/">i18n-js</a>, <a href="https://github.brislabs.com/web/localisation-configuration">config<a/> stored as json and translations stored as json.

Further documentation can be found from the <a href="https://github.brislabs.com/pages/web/localisation">jsdoc output</a> and also from <a href="https://github.brislabs.com/pages/web/localisation/diagrams.html">sequence diagrams</a>


## Install with NPM

Add the following line to package.json using the required release version

```js
"localisation": "https://github.brislabs.com/web/localisation/archive/v1.0.4.tar.gz"
```

## Configuring localisation

```js
var localisation = require('localisation');
```

Then localisation needs to be configured by calling the createLocaliser function with a configuration object containing a supportedTerritories object, a supportedLanguages object, the territory as a string and optionally the language as a string. The supportedTerritories and supportedLanguages localeConfig that we use can be found in the <a href="https://github.brislabs.com/web/localisation-configuration">localisation-configuration repo<a/>. It is assumed that this has been installed via NPM already in the following example.

```js
var config = {},
	localeConfig = require('localisation-configuration');

	config.territory = 'gb';
	config.language = 'en';
	config.supportedTerritories = localeConfig.supportedTerritories;
	config.supportedLanguages = localeConfig.supportedLanguages;

var configuredLocaliser = localisation.createLocaliser(config)
```

configuredLocaliser then should have the expected 'translate', 'formatDateTime', 'fornatNumber' and 'formatCurrency'.

Alternatively you may wish to wrap this as a service - the following block is how we have wrapped it as a localisationService; 'services/localisation' in <a href="https://github.brislabs.com/web/mixrad-app/blob/master/src/services/localisation.js">mixrad-app</a>

```js
'use strict';

var _ = require('lodash'),
    localisation = require('localisation'),
    localeConfig = require('localisation-configuration'),
    localisationService = {},
    bindLocalisationFunctions;

localisationService.init = function () {
    localisationService.territory = localisationService.detectTerritory();
    localisationService.language  = localisationService.detectLanguage();
    localisationService.localiser = localisation.createLocaliser(localisationService.createConfig());
    localisationService.locale = localisationService.localiser.getLocale();
    bindLocalisationFunctions();
};

localisationService.detectTerritory = function () {
    ...
};

localisationService.detectLanguage = function () {
    ...
};

localisationService.createConfig = function () {
    return {
        language: localisationService.language,
        territory: localisationService.territory,
        supportedLanguages: localeConfig.supportedLanguages,
        supportedTerritories: localeConfig.supportedTerritories
    };
};

bindLocalisationFunctions = function () {
    _.each(['translate', 'formatDateTime', 'formatNumber', 'formatCurrency'], function (func) {
        localisationService[func] = _.bind(localisationService.localiser[func], localisationService.localiser);
    });
};

module.exports = localisationService;
```

## Using localisation

Assuming it is being used as configuredLocaliser

```js
var translation = configuredLocaliser.translate('key'),
	date = configuredLocaliser.formatDateTime(new Date(), 'date'),
	time = configuredLocaliser.formatDateTime(new Date(), 'time'),
	dateTime = configuredLocaliser.formatDateTime(new Date(), 'dateTime'),
	number = configuredLocaliser.formatNumber(1000),
	currency = configuredLocaliser.formatCurrency(1000);
```

Assuming it is being used as the service

```js
var localisation = require('services/localisation'),
	translation = localisation.translate('key'),
	date = localisation.formatDateTime(new Date(), 'date'),
	time = localisation.formatDateTime(new Date(), 'time'),
	dateTime = localisation.formatDateTime(new Date(), 'dateTime'),
	number = localisation.formatNumber(1000),
	currency = localisation.formatCurrency(1000);
```

## Loading App-Specific Translations

Assuming that we have a default translation configured with the
following translations

```js
var original_translations = {
    en: {
        translations: {
            string: "translatedString",
            anotherString: "another string"
        }
    },
    fr: {
        translations: {
            string: "translatedStringInFrench"
        },
        territoryOverrides: {
            ca: {
                translations: {
                    string: "candianTranslatedStringInFrench"
                }
            }
        }
    }
}
```

And you want to load the following translations which are specific to your app

```js
var new_translations = {
    en: {
        translations: {
            string: "alternative phrase for 'string'"
            andNow: "for something completely different"
        }
    },
    fr: {
        translations: {
            helloWorld: "Bonjour le Monde"
        },
        territoryOverrides: {
            ca: {
                translations: {
                    string: "translatedStringInFrenchCanadian",
                    helloWorld: "Bonjour, Tout le Monde du Canada"
                }
            }
        }
    }
```

Create your localisation solution as described above and then (assuming you're
using the `new_translations` variable in the above example and the supportedTerritories
object from `localeConfig` in the first code block) call:

```js
    localiser.loadTranslations(new_translations, supported_territories);
```

following this, the `localiser._i18n.translations` object will contain a merge of
the translations already loaded in and the new translations supplied. Following this,
you can just call `localiser.translate('translation_key')` to retrieve the new
translations.

## Grunt

Uses grunt to lint, test and package the assets.

```command
    grunt             // process_js and then watch
    grunt process_js  // run jshint, jscs, bundle using webpack, then test with jasmine
    grunt test        // run jshint, jscs, bundle using webpack, then test with jasmine
```
`grunt test` exists to allow the package.json to reference it so you can also run

```command
    npm test
```

### Releasing a new version

To release a new version when you are happy with the code, run:

```command
    grunt release
```
This will lint, bundle and test increment the version number in the package.json file and upload to github.
