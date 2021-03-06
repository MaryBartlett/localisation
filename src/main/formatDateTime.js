/**
 * @module formatDateTime
 * @desc module that formats and localises date, time and dateTime
 * @returns formatDateTime function
 * @requires litedash
 */
'use strict';

var _ = require('./litedash'),

    /**
    * @private
    * @function configureDateTime
    * @desc takes the value passed in and whether it is of type date, dateTime or time (assumes that the month given is 1 indexed i.e. Jan = 1, Feb = 2)
    * @param {object | dateString | integer} value - the value to localise. If object, expects the following structure:
    * value = {
    *     year: integer/string optional for type of time
    *     month: integer/string optional for type of time
    *     day: integer/string optional for type of time
    *     hour: integer/string optional for type of date
    *     minute: integer/string optional for type of date
    *     second: integer/string optional for type of date
    *     millisecond: integer/string optional for type of date and time
    * }
    * @returns {string} the formatted date
    * @throws error if missing or incorrect parameters
    */
    configureDateTime = function (value) {
        var dateTime,
            dateParts = {};

        if (_.isObject(value)) {
            dateParts = {
                year: value.year,
                month: value.month - 1,
                day: value.day,
                hour: value.hour,
                minute: value.minute,
                second: value.second,
                millisecond: value.millisecond
            };
            // Object given
            // minimum requirements to create a date are year, month and day
            // minimum requirement to create a time are hour, minute and second
            if ((_.has(value, 'year') && _.has(value, 'month') && _.has(value, 'day')) ||
                (_.has(value, 'hour') && _.has(value, 'minute') && _.has(value, 'second'))) {
                // if values given are strings, turn them into integers
                _.map(dateParts, function (property, key) {
                    if (_.isString(property)) {
                        dateParts[key] = parseInt(property, 10);
                    }
                    // only push values given to date function into date parts, passing null/undefined to Date will give an invalid date
                    if (_.isUndefined(dateParts[key]) || _.isNaN(dateParts[key])) {
                        dateParts[key] = false;
                    }
                    return dateParts;
                });

                if (dateParts.year && dateParts.month && dateParts.day || dateParts.hour && dateParts.minute && dateParts.second) {
                    dateTime = new Date(dateParts.year, dateParts.month, dateParts.day, dateParts.hour, dateParts.minute, dateParts.second, dateParts.millisecond);
                } else {
                    throw new Error('configureDateTime did not receive a value it could turn into a valid date');
                }

            } else {
                // dateString given
                dateTime = value;
            }
        } else {
            // Epoch given
            dateTime = new Date(value);
        }
        return dateTime;
    },

    /**
    * @public
    * @function formatDateTime
    * @desc sets up i18n date, time or dateTime from the settings in config and localises date, time or dateTime
    * @param {object | dateString | integer} value - the value to localise. If object, expects the following structure:
    * value = {
    *     year: integer/string
    *     month: integer/string
    *     day: integer/string
    *     hour: integer/string
    *     minute: integer/string
    *     second: integer/string
    *     millisecond: integer/string
    * }
    * @param {string} type - the type of value given - date, time or dateTime
    * @param {string} format - the required format for the returned date - default, long or short
    * @returns {string} the localised date
    */
    formatDateTime = function (value, type, format) {
        var dateTimeValue,
            dateTimeFormat;

        if (!value) {
            throw new Error('formatDateTime did not receive a value');
        }

        dateTimeValue = configureDateTime(value);

        dateTimeFormat = this._i18n.config[type + 'Format'][(format || 'default') + 'Format'];

        return this._i18n.strftime(dateTimeValue, dateTimeFormat);
    };

module.exports = formatDateTime;
