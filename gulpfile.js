var gulp = require('gulp')
    ,usemin = require('gulp-usemin')
    ,uglify = require('gulp-uglify')
    ,cleanCss = require('gulp-clean-css')
    ,pump = require('pump')
    ,del = require('del')
    ,browserSync = require('browser-sync');

//Remove all content of the dist folder
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

gulp.task('images', ['clean'], function(cb) {
    pump([
           gulp.src('img/**/*'),
           gulp.dest('dist/img')
        ],
        cb
    );
});

//Copy bootstrp fonts to dist folder
gulp.task('bootstrap-font', ['clean'], function(cb) {
    pump([
            gulp.src('node_modules/bootstrap/dist/fonts/**/*'),
            gulp.dest('dist/fonts')
        ],
        cb
    );
});

// Minify css and javascript
gulp.task('build', ['clean', 'images', 'bootstrap-font'],  function (cb) {
    pump([
            gulp.src('./*.html'),
            usemin({
                css: [cleanCss(), 'concat']
                ,js: [uglify(), 'concat']
            }),
            gulp.dest('dist')
        ],
        cb
    );
});


//run the project from dist folder
gulp.task('serve:dist', function() {
    browserSync({
        notify: false,
        server: 'dist',
        baseDir: "dist"
    });
});

//run the project from base folder
gulp.task('serve', function() {
    browserSync({
        notify: false,
        server:'./'
    });
});