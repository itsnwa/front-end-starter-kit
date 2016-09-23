// Require
const gulp = require('gulp'),
   postcss = require('gulp-postcss'),
sourcemaps = require('gulp-sourcemaps'),
   cssnano = require('gulp-cssnano'),

// PostCSS Plugins
   pxtorem = require('postcss-pxtorem'),
    precss = require('precss'),
   cssnext = require('postcss-cssnext');


// CSS Process
gulp.task('css', function () {

  var processors = [
    precss(),
    cssnext({
      browsers: ['last 6 version']
    }),
    pxtorem({
      propWhiteList: [],
      mediaQuery: true
    })
  ];

  return gulp.src('./src/*.css')
  .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(cssnano())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dest'));

});
