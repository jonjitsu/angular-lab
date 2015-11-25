var gulp = require('gulp'),
    bs = require('browser-sync')
;

gulp.task('serve', function() {
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
