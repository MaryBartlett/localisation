var RewirePlugin = require("rewire-webpack");

module.exports = {
    //TODO rename deployable
    app: {
        context: "./src/main",
        entry: "./index.js",
        output: {
            path: "./target",
            filename: "mixrad-app.js"
        },
        plugins: [
            new RewirePlugin()
        ]
    },

    appTests: {
        context: "./src/test",
        entry: "./run.js",
        output: {
            path: "./target",
            filename: "tests-bundle.js"
        },
        resolve: {
            modulesDirectories: [
                './src/main',
                'node_modules'
            ]
        },
        plugins: [
            new RewirePlugin()
        ]
    }
};
