/**
 * translate tests
 */
'use strict';

var translate = require('../../src/main/translate.js');

describe('translate', function () {
    var localiserScope;
            
    beforeEach(function() {
        localiserScope = {
            _i18n: {}
        };
        localiserScope._i18n.t = jasmine.createSpy('translate');
        localiserScope._i18n.p = jasmine.createSpy('translate');

    });  

    it('should throw an error when no value is given to translate', function () {
        expect(function () {translate();}).toThrow();
        expect(localiserScope._i18n.t).not.toHaveBeenCalled();
    });

    it('should call i18n.t when given a simple string', function () {
        translate.call(localiserScope, 'hello');

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello', undefined);
    });

    it('should call i18n.t and pass parameters through when provided', function () {
        translate.call(localiserScope, 'hello', false, {foo: "bar"});

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello', {foo: "bar"});
    });

    it('should call i18n.p when given a string to pluralize', function () {
        translate.call(localiserScope, 'hello', 2);

        expect(localiserScope._i18n.p).toHaveBeenCalledWith(2, 'hello', undefined);
    });

    it('should call i18n.p when given a string to pluralize and parameters to pass through', function () {
        translate.call(localiserScope, 'hello', 2, {foo: 'bar'});

        expect(localiserScope._i18n.p).toHaveBeenCalledWith(2, 'hello', {foo: 'bar'});
    });

    it('should call i18n.p when given a string to pluralize with a value of 0 and parameters to pass through', function () {
        translate.call(localiserScope, 'hello', 0, {foo: 'bar'});

        expect(localiserScope._i18n.p).toHaveBeenCalledWith(0, 'hello', {foo: 'bar'});
    });      

});
