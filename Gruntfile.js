'use strict';
var loadNpmTasks,
    registerTasks,
    registerReleaseTasks;

module.exports = function (grunt) {

    grunt.initConfig({
        branch: 'master',
        watch: require('./config/grunt/watch'),
        webpack: require('./config/grunt/webpack'),
        jshint: require('./config/grunt/jshint'),
        jscs: require('./config/grunt/jscs'),
        jasmine: require('./config/grunt/jasmine'),
        bump: require('./config/grunt/bump'),
        jsdoc: require('./config/grunt/jsdoc'),
        "gh-pages": require('./config/grunt/gh-pages'),
        env: require('./config/grunt/env')
    });

    loadNpmTasks(grunt);
    registerTasks(grunt);
    registerReleaseTasks(grunt);
};

registerTasks = function (grunt) {

    /**
     * Prepares the JS for the development environment
     *
     * Does the common JS processing
     * - Lint
     * - Compile into a single bundle
     * - Run unit tests
     */
    grunt.registerTask('process_js', [
        'jshint',
        'jscs',
        'webpack',
        'env:dev',
        'jasmine'
    ]);

    // ci task to give a uniform entry point for jenkins
    grunt.registerTask('ci', [
        'process_js'
    ]);


    grunt.registerTask('test', [
        "process_js"
    ]);


    /**
     * The default task that will be run.
     *
     * This assumes that we are building for a development environment and
     * not for distribution.
     *
     * Will set up a watch on the file system to rebuild for each change.
     */
    grunt.registerTask('default', [
        'process_js',
        'watch'
    ]);
};

registerReleaseTasks = function (grunt) {
    require('./grunt-tasks/release')(grunt);
};

loadNpmTasks = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-env');

};
