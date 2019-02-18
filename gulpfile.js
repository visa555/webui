'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var replace = require('gulp-replace');
var usemin = require('gulp-usemin');
var autoprefixer = require('gulp-autoprefixer');
var image = require('gulp-image');





// include js before dev 
var thirdPartyJS = [

     // Start : include plugins JS  //
    //'dev/assets/plugins/jquery/jquery.js',
    //'dev/assets/plugins/bootstrap/js/bootstrap.min.js',
  
     // End : include plugins JS //
     // Start : include Custom JS //
    //'dev/assets/js/custom.js'
     // End : include Custom JS //
],

    thirdPartyJSmobile = [
        //'dev/assets/js/mobile-custom.js'
    ],
    // include css before dev
    thirdPartyCSS = [
    // Start : include plugins CSS  //
    './dev/assets/plugins/bootstrap/css/bootstrap.css',
//    './dev/assets/plugins/fullPage.js-master/jquery.fullPage.css',
//    './dev/assets/plugins/bootstrap-off-canvas-nav/css/bootstrap-off-canvas-nav.min.css',
//    './dev/assets/plugins/font-awesome/css/font-awesome.min.css',    
//    '..assets/fonts/stylesheet.css',
      //'./dev/assets/plugins/flexslider/flexslider.css',
//    './dev/assets/plugins/imagehover.css-master/css/imagehover.min.css',
//    './dev/assets/plugins/lightslider-master/css/lightslider.min.css',
//    './dev/assets/plugins/lightGallery-master/css/lightgallery.min.css',
//    './dev/assets/plugins/animate/animate.css',
    
    // End : include plugins CSS //

    // Start : include Custom CSS //
    './dev/assets/css/main.css',
//    './dev/assets/css/font-face.css',
//    './dev/assets/css/helpers.css',
    // End : include Custom CSS //


    ],
    thirdPartyCSSmobile = [
        // Start : include Custom CSS //
//        './dev/assets/css/mobile-custom.css',
//        './dev/assets/css/font-face.css',
//        './dev/assets/css/helpers.css'
        // End : include Custom CSS //
    ];

// Create Task : Convert SASS TO CSS //
gulp.task('sass', function () {
    return gulp.src('dev/assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dev/assets/css'));
});

// Create Task : Combine & Minify CSS //
gulp.task('build-css', function () {
    return gulp.src(thirdPartyCSS) // Combine All CSS 
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'));

});

gulp.task('build-cssMoblie', function () {
    return gulp.src(thirdPartyCSSmobile) // Combine All CSS 
        .pipe(concat('mobile-custom.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'));
});

// Create Task : Combine & Minify CSS //
//gulp.task('sass-css', function () {
//    return gulp.src(thirdPartyCSS) // Combine All CSS 
//        .pipe(concat('custom.css'))        
//        .pipe(gulp.dest('dev/assets/css'));

//});

//gulp.task('sass-cssMoblie', function () {
//    return gulp.src(thirdPartyCSSmobile) // Combine All CSS 
//        .pipe(concat('mobile-custom.css'))
//        .pipe(gulp.dest('dev/assets/css'));

//});

// Create Task : Combine & Minify Javascript //
gulp.task('build-js', function () {
    return gulp.src(thirdPartyJS) // Combine All JS 
        .pipe(concat('custom.min.js'))
        .pipe(uglify('compress'))
        .pipe(gulp.dest('assets/js'));
});
// End Task : Combine & Minify Javascript //
gulp.task('build-jsMoblie', function () {
    return gulp.src(thirdPartyJSmobile) // Combine All JS 
        .pipe(concat('mobile-custom.min.js'))
        .pipe(uglify('compress'))
        .pipe(gulp.dest('assets/js')); 
});

// Create Task : Optimize Images //
gulp.task('imgOptimize', function () {
    gulp.src('assets/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 12
        }))
        .pipe(gulp.dest('assets/images'));
});

// End Task : Optimize Images //
// Create Task : Clean CSS Files //
//gulp.task('clean', function() {
//  return gulp.src(['assets/scss/*.css'],{ read:false })
//    .pipe(rimraf({ force: true }));
//});

//gulp.task('default', ['sass','build-js', 'build-css'], function () {
//    gulp.watch("dev/assets/scss/**/*.scss", ['sass']);
//    gulp.watch("dev/assets/css/**/*.css", ['build-css']);
//    gulp.watch("dev/assets/js/**/*.js", ['build-js']);

//});
gulp.task('default', ['sass', 'build-js', 'build-css'], function () {
    gulp.watch("dev/assets/scss/**/*.scss", ['sass']);
    gulp.watch("dev/assets/css/**/*.css", ['build-css']);
    gulp.watch("dev/assets/js/**/*.js", ['build-js']);

});

gulp.task('mobile', ['sass', 'build-cssMoblie', 'build-jsMoblie'], function () {
    gulp.watch("dev/assets/scss/**/*.scss", ['sass']);
    gulp.watch("dev/assets/css/**/*.css", ['build-cssMoblie']);
    gulp.watch("dev/assets/js/**/*.js", ['build-jsMoblie']);
});

gulp.task('desktop', ['sass', 'build-js', 'build-css'], function () {
    gulp.watch("dev/assets/scss/**/*.scss", ['sass']);
    gulp.watch("dev/assets/css/**/*.css", ['build-css']);
    gulp.watch("dev/assets/js/**/*.js", ['build-js']);
});

gulp.task('build-all', ['sass', 'imgOptimize', 'build-js', 'build-css'], function () {
    
});
