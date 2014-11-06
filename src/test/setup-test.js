/*
 * Setup tests
 */
'use strict';


var rewire = require('rewire'),
    setup = rewire('../../src/main/setup.js');

describe('setup', function () {


    it('exists', function () {
        expect(setup).toBeDefined();
    });

    it('has a defined api', function () {
        expect(setup.determineTerritory).toBeFunction();
        expect(setup.determineLanguage).toBeFunction();
        expect(setup.getConfig).toBeFunction();
        expect(setup.getLocale).toBeFunction();
    });

});

describe('setup determineTerritory', function () {
    var supportedTerritoriesFixture = require('./supportedTerritoriesFixture');
    beforeEach(function  () {
        setup.__set__('supportedTerritories', supportedTerritoriesFixture);
    });

    it('should return "default" if no territory given', function () {
        expect(setup.determineTerritory()).toEqual('default');
    });

    it('should return the territory if a supported territory given', function () {
        expect(setup.determineTerritory('fr')).toEqual('fr');
    });

    it('should return default territory if an unsupported territory given', function () {
        expect(setup.determineTerritory('sa')).toEqual('default');
    });    
    
});

describe('setup determineLanguage', function () {
    var supportedTerritoriesFixture = require('./supportedTerritoriesFixture'),
        supportedLanguagesFixture = require('./supportedLanguagesFixture');

    beforeEach(function  () {
        setup.__set__('supportedTerritories', supportedTerritoriesFixture);
        setup.__set__('supportedLanguages', supportedLanguagesFixture);

    });

    it('should return "default" if no language given', function () {
        expect(setup.determineLanguage()).toEqual('default');
    });

    it('should return default language for a territory if no language given', function () {
        expect(setup.determineLanguage('gb')).toEqual('en');
    });

    it('should return default language for a territory if unsupported language given', function () {
        expect(setup.determineLanguage('gb', 'ke')).toEqual('en');
    });    

    it('should return "default" language if unsupported language given', function () {
        expect(setup.determineLanguage('fa', 'ke')).toEqual('default');
    });

    it('should return "default" language if unsupported territory given', function () {
        expect(setup.determineLanguage('fa')).toEqual('default');
    });

    it('should return language if supported language given', function () {
        expect(setup.determineLanguage('fr', 'fr')).toEqual('fr');
    });    

    it('should return language if supported language given, even with a fake territory', function () {
        expect(setup.determineLanguage('fa', 'fr')).toEqual('fr');
    });    

    it('should return language if supported language given, even with a false territory', function () {
        expect(setup.determineLanguage(false, 'fr')).toEqual('fr');
    });

    describe('setup getLocale', function () {
        var supportedTerritoriesFixture = require('./supportedTerritoriesFixture'),
            supportedLanguagesFixture = require('./supportedLanguagesFixture');

        beforeEach(function  () {
            setup.__set__('supportedTerritories', supportedTerritoriesFixture);
            setup.__set__('supportedLanguages', supportedLanguagesFixture);

        });

        it('should return "default" if no parameters given', function () {
            expect(setup.getLocale()).toEqual('default-DEFAULT');
        });

        it('should return valid locale using default language if only territory given', function () {
            expect(setup.getLocale('gb')).toEqual('en-GB');
        });

        it('should return valid locale if both territory and language given', function () {
            expect(setup.getLocale('gb', 'en')).toEqual('en-GB');
        });

    });

    describe('setup getConfig', function () {
        var supportedTerritoriesFixture = require('./supportedTerritoriesFixture'),
            supportedLanguagesFixture = require('./supportedLanguagesFixture');

        beforeEach(function  () {
            setup.__set__('supportedTerritories', supportedTerritoriesFixture);
            setup.__set__('supportedLanguages', supportedLanguagesFixture);

        });

        it('should return empty object if no parameters given', function () {
            expect(setup.getConfig()).toEqual({});
        });

        it('should return object if valid territory given', function () {
            expect(setup.getConfig('gb')).toEqual(_.extend(supportedTerritoriesFixture.gb, supportedLanguagesFixture.en));
        });

        it('should return object if valid territory and language given', function () {
            expect(setup.getConfig('gb', 'en')).toEqual(_.extend(supportedTerritoriesFixture.gb, supportedLanguagesFixture.en));

        });

        it('should return correct object for territory and language combination', function () {
            expect(setup.getConfig('gb', 'fr')).toEqual(_.extend(supportedTerritoriesFixture.gb, supportedLanguagesFixture.fr));

        });        
    });



});