module.exports = {
    client: {
        src: './target/tests-bundle.js',
        options: {
            specs: 'spec/*Spec.js',
            helpers: 'spec/*Helper.js',
            keepRunner: true,
            outfile: './target/TestRunner.html'
        }
    }
};
