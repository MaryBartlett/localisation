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

$ var localisation = require('localisation');

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

Alternatively you may wish to wrap this as a service - the following block is how we have wrapped it as a localisationService; 'services/localisation'.

```js
'use strict';

var _ = require('lodash'),
    localisation = require('localisation'),
    localeConfig = require('localisation-configuration'),
    nativeStuff = require('app/native'),
    API = require('services/api'),
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
    API('root').resource('territory').single()
        .then(function ( data ) {
            localisationService.territory = data.body.items[0].territory;
            console.log( localisationService.territory );
        });
    return 'gb';
};

localisationService.detectLanguage = function () {
    return _.first(nativeStuff.window.navigator.language, 2).join('');
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

var translation = configuredLocaliser.translate('key'),
	date = configuredLocaliser.formatDateTime(new Date(), 'date'),
	time = configuredLocaliser.formatDateTime(new Date(), 'time'),
	dateTime = configuredLocaliser.formatDateTime(new Date(), 'dateTime'),
	number = configuredLocaliser.formatNumber(1000),
	currency = configuredLocaliser.formatCurrency(1000);


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