var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssbeautify = require('gulp-cssbeautify'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    autoprefix  = require('gulp-autoprefixer');

gulp.task('default', ['serve']);

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'cssmin'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/**/*.scss", ['sass', 'cssmin']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("sass/pages/*.scss")
        .pipe(sass())
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssbeautify())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});
gulp.task('cssmin', function() {
    return gulp.src("sass/pages/*.scss")
        .pipe(sass())
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("css/min"))
        .pipe(browserSync.stream());
});