/* jshint node: true */

/**
 * A simple task that kicks off the web-ui-simple-account
 * release build on the jenkins server.
 *
 * http://btdevapsrvjenkins05.brislabs.com:8080/job/Localisation/
 */

var request = require('request');

module.exports = function (grunt) {

    grunt.registerTask('jenkins', function () {

        var requestOptions = {
                url: 'http://btdevapsrvjenkins05.brislabs.com:8080/job/Localisation',
                proxy: 'http://nokes.nokia.com:8080'
            },
            done = this.async();

        console.log('starting the jenkins build');

        request.post(requestOptions, function (err, response) {

            if (err) {
                throw err;
            }

            console.log(response.statusCode);
            done();
        });
    });
};
