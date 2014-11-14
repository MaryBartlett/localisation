/**
 * formatDateTime tests
 */
'use strict';

var formatDateTime = require('../../src/main/formatDateTime.js');

describe('formatDateTime', function () {
    var localiserScope;

    beforeEach(function() {
        localiserScope = {
            _i18n: {
                dateFormat: {
                    defaultFormat: "defaultDateFormat",
                    shortFormat: "shortDateFormat",
                    longFormat: "longDateFormat"
                },
                timeFormat: {
                    defaultFormat: "defaultTimeFormat",
                    shortFormat: "shortTimeFormat",
                    longFormat: "longTimeFormat"                      
                },
                dateTimeFormat: {
                    defaultFormat: "defaultDateTimeFormat",
                    shortFormat: "shortDateTimeFormat",
                    longFormat: "longDateTimeFormat"                    
                }

            }
        };
        localiserScope._i18n.strftime = jasmine.createSpy('strftime');
    });  

    it('should throw an error when no value is given to dateTime', function () {
        expect(function () {formatDateTime();}).toThrow();
        expect(localiserScope._i18n.strftime).not.toHaveBeenCalled();

    });

    describe('should support a type of date', function () {
        it('should call i18n.strftime when given a Unix Epoch date', function () {
            formatDateTime.call(localiserScope, 1412604094352, "date");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2014-10-06T14:01:34.352Z"), "defaultDateFormat");
        });

        it('should call i18n.strftime when given a dateString date', function () {
            formatDateTime.call(localiserScope, "2013-03-01T01:10:00", "date");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-03-01T01:10:00"), "defaultDateFormat");
        });

        it('should call i18n.strftime when given an object date', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "date");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "defaultDateFormat");
        });

        it('should call i18n.strftime with the correct date format (default)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "date", "default");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "defaultDateFormat");
        });

        it('should call i18n.strftime with the correct date format (long)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "date", "long");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "longDateFormat");
        });

        it('should call i18n.strftime with the correct date format (short)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "date", "short");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "shortDateFormat");
        });
    });

    describe('should support a type of dateTime', function () {
        it('should call i18n.strftime when given a Unix Epoch date', function () {
            formatDateTime.call(localiserScope, 1412604094352, "dateTime");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2014-10-06T14:01:34.352Z"), "defaultDateTimeFormat");
        });

        it('should call i18n.strftime when given a dateString date', function () {
            formatDateTime.call(localiserScope, "2013-03-01T01:10:00", "dateTime");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-03-01T01:10:00"), "defaultDateTimeFormat");
        });

        it('should call i18n.strftime when given an object date', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "dateTime");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "defaultDateTimeFormat");
        });

        it('should call i18n.strftime with the correct date format (default)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "dateTime", "default");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "defaultDateTimeFormat");
        });

        it('should call i18n.strftime with the correct date format (long)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "dateTime", "long");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "longDateTimeFormat");
        });

        it('should call i18n.strftime with the correct date format (short)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "dateTime", "short");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "shortDateTimeFormat");
        });
    });

    describe('should support a type of time', function () {
        it('should call i18n.strftime when given a Unix Epoch date', function () {
            formatDateTime.call(localiserScope, 1412604094352, "time");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2014-10-06T14:01:34.352Z"), "defaultTimeFormat");
        });

        it('should call i18n.strftime when given a dateString date', function () {
            formatDateTime.call(localiserScope, "2013-03-01T01:10:00", "time");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-03-01T01:10:00"), "defaultTimeFormat");
        });

        it('should call i18n.strftime when given an object date', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "time");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "defaultTimeFormat");
        });

        it('should call i18n.strftime with the correct date format (default)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "time", "default");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "defaultTimeFormat");
        });

        it('should call i18n.strftime with the correct date format (long)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "time", "long");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "longTimeFormat");
        });

        it('should call i18n.strftime with the correct date format (short)', function () {
            formatDateTime.call(localiserScope, {year: 2013, month: 11, day: 12}, "time", "short");

            expect(localiserScope._i18n.strftime).toHaveBeenCalledWith(new Date("2013-11-12T00:00:00"), "shortTimeFormat");
        });
    });

});