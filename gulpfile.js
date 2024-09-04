// Base Gulp File
const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const del = require('del');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-html-minifier');
const minify = require('gulp-minify');

// Task to compile SCSS
function compileSass() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: false,
      paths: [path.join(__dirname, 'scss', 'includes')]
    }).on("error", notify.onError(function(error) {
      return "Failed to Compile SCSS: " + error.message;
    })))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
}

// Task to minify CSS
function minifyCss() {
  return gulp.src('./dist/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/css/'));
}

// Task to compress JS
function compressJs() {
  return gulp.src('./src/js/**/*.*')
    .pipe(minify())
    .pipe(gulp.dest('./dist/js/'));
}

// Task to minify HTML
function minifyHtml() {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
}

// Task to watch for changes
function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', compileSass);
  gulp.watch('./src/js/**/*.js', compressJs);
  gulp.watch('./src/*.html', minifyHtml);
  gulp.watch('./dist/**/*').on('change', browserSync.reload);
}

// Task to clean the dist folder
function clean() {
  return del(['dist']);
}

// Default task
exports.default = gulp.series(
  clean,
  gulp.parallel(compileSass, minifyCss, compressJs, minifyHtml),
  watchFiles
);
