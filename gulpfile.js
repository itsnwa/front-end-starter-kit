// Require
const gulp = require('gulp'),
   postcss = require('gulp-postcss'),
sourcemaps = require('gulp-sourcemaps'),
   cssnano = require('gulp-cssnano'),

// PostCSS Plugins
   pxtorem = require('postcss-pxtorem'),
    precss = require('precss'),
   cssnext = require('postcss-cssnext');


// Folders
let path = {
      css: ['./src/*.css',
            './src/**/.css',
            './src/**/**/*.css'],
      js: ['./src/js/*.js'],
      images: ['.src/images/*',
               '.src/images/**/*'],
      fonts: ['.src/fonts/*']
    };



// CSS Process
gulp.task('css', () => {

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


// Watcher task
gulp.task('watch', () => {
  gulp.watch('.src/*.html');
  gulp.watch(path.css, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.images, ['imagemin']);
});


// Default task
gulp.task('default', ['browser-sync', 'watch']);
