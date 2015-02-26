var _ = require('lodash');
module.exports = {
    all: [
        './Gruntfile.js',
        './grunt/**/*.js',
        './src/main/**/*.js',
        './src/test/**/*.js'
    ],
    options: 
        _.merge(require('web-jshint-options'), {
            // overrides for default values
            maxstatements: 30,
            maxcomplexity: 6
        }
    )
};
