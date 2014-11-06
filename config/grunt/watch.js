module.exports = {
    /**
     * If any of the JS files change (excluding the bundles to avoid recursion) then
     * execute the linter, then bundle using webpack, then run the unit tests using mocha.
     */
    js: {
        files: [
            './Gruntfile.js',
            'src/**/*.js',
            'grunt/**/*.js'
        ],
        tasks: ['process_js']
    }
};
