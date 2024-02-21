
// Base Gulp File
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    imageminPDF = require('gulp-imagemin'),
    del = require('del'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-html-minifier'),
    minify = require('gulp-minify');

// Task to compile SCSS
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: false,
      paths: [ path.join(__dirname, 'scss', 'includes') ]
    })
    .on("error", notify.onError(function(error) {
      return "Failed to Compile SCSS: " + error.message;
    })))
    
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
    //.pipe(notify("SCSS Compiled Successfully :)"));
});

gulp.task('minify-css', function() {
    return gulp.src('./dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('compress', function() {
  gulp.src('./src/js/**/*.*')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['bootstrap'],
    }))
    .pipe(gulp.dest('./dist/js/'))
});

// Minify Images
gulp.task('imagemin', function (){
  return gulp.src('./src/img/**/*.+(png|jpg|jpeg|gif|svg|mp4|webp|avif)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('./dist/img'));
});

//Copy fonts
gulp.task('fonts', function() {
  return gulp.src(['./src/fonts/**/*'])
  .pipe(gulp.dest('dist/fonts'));
});

//Copy videos
gulp.task('video', function() {
  return gulp.src(['./src/video/**/*'])
  .pipe(gulp.dest('dist/video'));
});

// BrowserSync Task (Live reload)
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './src/'
    }
  })
});

// Minify HTML 
gulp.task('minifyhtml', function() {
  gulp.src('./src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

// Gulp Watch Task
gulp.task('watch', ['browserSync'], function () {
  gulp.watch('./src/scss/**/*', ['sass']);
  gulp.watch('./src/js/**/*').on('change', browserSync.reload);
  gulp.watch('./src/img/**/*.svg', ['sass']);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});

// Gulp Clean Up Task
gulp.task('clean', function() {
  del('dist');
});

// Gulp Default Task
gulp.task('default', ['watch']);

// Gulp Build Task
gulp.task('build', function() {
  runSequence('clean', 'sass', 'minify-css', 'minifyhtml', 'compress', 'video', 'imagemin');
});