// Require
const gulp = require('gulp'),
   postcss = require('gulp-postcss'),
sourcemaps = require('gulp-sourcemaps'),
   cssnano = require('gulp-cssnano'),
replaceExt = require('replace-ext'),

// PostCSS Plugins
   pxtorem = require('postcss-pxtorem'),
    precss = require('precss'),
      scss = require('postcss-scss'),
   cssnext = require('postcss-cssnext');


// CSS Process
gulp.task('css', function () {

  var processors = [
    precss({
      parser: scss,
      extension: 'scss'
    }),
    cssnext({
      browsers: ['last 6 version']
    }),
    pxtorem({
      propWhiteList: [],
      mediaQuery: true
    })
  ];

  return gulp.src('./src/*.scss')
  .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(cssnano())
  .pipe(sourcemaps.write())
  .pipe(replaceExt('.css'))
  .pipe(gulp.dest('./dest'));

});
