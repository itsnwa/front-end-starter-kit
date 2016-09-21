const gulp = require('gulp'),
   postcss = require('gulp-postcss'),
   cssnext = require('postcss-cssnext'),
   pxtorem = require('postcss-pxtorem'),
sourcemaps = require('gulp-sourcemaps'),
   cssnano = require('gulp-cssnano');


gulp.task('css', function () {

  var processors = [
    cssnext({
      browsers: ['last 4 version']
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
