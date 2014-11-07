module.exports = {
    dist : {
        src: [
            './src/main/**/*.js',
            './src/test/**/*.js'
        ], 
        options: {
            destination: 'documentation',
            template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
            configure: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"

        }
    }
}
