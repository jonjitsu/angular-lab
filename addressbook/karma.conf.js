module.exports = function(config) {
    config.set({
//        plugins: ['karma-mocha', 'karma-phantomjs-launcher', 'karma-mocha-reporter'],
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        preprocessors: {
            'app/**/*.js': ['coverage']
        },
        coverageReporter: {
            includeAllSources: true,
            reporters: [{
                type: 'text'
            }, {
                type: 'html',
                dir: 'test/coverage',
                subdir: '.'
            }]
        },
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/chai/chai.js',

            'app/**/*.js',

            'test/*.js'
        ]
    });
};
