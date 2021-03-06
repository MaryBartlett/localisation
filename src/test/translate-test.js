/**
 * translate tests
 */
'use strict';


var translate = require('../../src/main/translate.js');


describe('translate', function () {
    var localiserScope;

    beforeEach(function () {
        localiserScope = {
            _i18n: {}
        };
        localiserScope._i18n.t = jasmine.createSpy('translate');
        localiserScope._i18n.p = jasmine.createSpy('translate');

    });

    it('should throw an error when no value is given to translate', function () {
        expect(function () {
                translate();
            }).toThrow();
        expect(localiserScope._i18n.t).not.toHaveBeenCalled();
    });

    it('should throw an error when non integer is given to translate for pluralization', function () {
        expect(function () {
                translate('dog', '%');
            }).toThrow();
        expect(localiserScope._i18n.t).not.toHaveBeenCalled();
    });

    it('should throw an error when non object is given to translate for templateValues', function () {
        expect(function () {
                translate('dog', 3, []);
            }).toThrow();
        expect(localiserScope._i18n.t).not.toHaveBeenCalled();
    });

    it('should throw an error when given a string to pluralize with an invalid pluralization value', function () {
        expect(function () {
                translate('dog', 'cat', []);
            }).toThrow();
        expect(localiserScope._i18n.p).not.toHaveBeenCalled();
    });

    it('should call i18n.t when given a simple string', function () {
        translate.call(localiserScope, 'hello');

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello', { count: 0 });
    });

    it('should call i18n.t and pass parameters through when provided', function () {
        translate.call(localiserScope, 'hello', false, { foo: "bar" });

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello', { foo: "bar", count: 0 });
    });

    it('should call i18n.t when given a string to pluralize with correct parameters', function () {
        translate.call(localiserScope, 'hello', 2);

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello',  { count: 2 } );
    });

    it('should call i18n.t when given a string to pluralize with a number as a string', function () {
        translate.call(localiserScope, 'hello', '2');

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello', { count: 2 } );
    });

    it('should call i18n.t when given a string to pluralize with a negative number', function () {
        translate.call(localiserScope, 'hello', -2);

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello', { count: -2 });
    });

    it('should call i18n.t when given a string to pluralize and parameters to pass through', function () {
        translate.call(localiserScope, 'hello', 2, { foo: 'bar' });

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello', { foo: 'bar', count: 2 });
    });

    it('should call i18n.t when given a string to pluralize with a value of zero and parameters to pass through', function () {
        translate.call(localiserScope, 'hello', 0, { foo: 'bar' });

        expect(localiserScope._i18n.t).toHaveBeenCalledWith('hello', { foo: 'bar', count: 0  });
    });

});
