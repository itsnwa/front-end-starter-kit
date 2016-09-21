const gulp = require('gulp'),
   postcss = require('gulp-postcss'),
   cssnext = require('postcss-cssnext'),
sourcemaps = require('gulp-sourcemaps');


gulp.task('css', function () {

  var processors = [
    cssnext({browsers: ['last 4 version']})
  ];

  return gulp.src('./src/*.css')
  .pipe(sourcemaps.init())
    .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dest'));

});
