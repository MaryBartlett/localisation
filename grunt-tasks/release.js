/* jshint node: true */

module.exports = function (grunt) {

    grunt.registerTask('release', function () {

        console.log('release job started.');

        // increment the version number of the package
        grunt.task.run('bump');
    });
};
