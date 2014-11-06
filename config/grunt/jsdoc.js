module.exports = {
    dist : {
        src: [
            './Gruntfile.js',
            './grunt/**/*.js',
            './src/main/js/**/*.js',
            './src/test/js/**/*.js'
        ], 
        options: {
            destination: 'target'
        }
    }
}
