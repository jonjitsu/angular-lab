var gulp = require('gulp'),
    bs = require('browser-sync'),
    karma = require('karma').server,
    server = require('gulp-live-server'),
    protractor = require('gulp-protractor').protractor
;

gulp.task('server', function() {
    var live = new server('server.js');
    live.start();
})

gulp.task('serve', ['server'], function() {
    bs.init({
        notify: false,
        port: 8080,
        server: {
            baseDir:["app"],
            routes: {
                '/bower_components':'bower_components'
            }
        }
    });

    gulp.watch(['app/**/*.*'])
        .on('change', bs.reload);
});

gulp.task('serve-coverage', ['test-browser'], function() {
    bs.init({
        notify: false,
        port: 7777,
        server: {
            baseDir:["test/coverage"],
        }
    });

    gulp.watch(['app/**/*.*', 'test/*.spec.js'])
        .on('change', bs.reload);
});


gulp.task('serve-test', function() {
    bs.init({
        notify: false,
        port: 8081,
        server: {
            baseDir:["test", "app"],
            routes: {
                '/bower_components':'bower_components'
            }
        }
    });

    gulp.watch(['app/**/*.*', 'test/**/*.js'])
        .on('change', bs.reload);
});

gulp.task('protractor', ['serve'], function(done) {
    gulp.src(['test/e2e/*.js'])
        .pipe(protractor({
            configFile: 'test/protractor.config.js',
            args: ['--baseUrl', 'http://localhost:8081']
        }))
        .on('end', done);
});

gulp.task('test-browser', function() {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        reporters: ['mocha', 'coverage']
    }, function() {
        done();
    }); 
});

