module.exports = {
    main: {
    	src: [
	        './Gruntfile.js',
	        './grunt/**/*.js',
	        './src/main/**/*.js',
	        './src/test/**/*.js'
    	],
    	options: require('web-jscs-options')
    }
};