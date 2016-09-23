      // Require
const gulp        = require('gulp'),
      postcss     = require('gulp-postcss'),
      sourcemaps  = require('gulp-sourcemaps'),
      cssnano     = require('gulp-cssnano'),
      browserSync = require('browser-sync'),

      // PostCSS Plugins
      pxtorem     = require('postcss-pxtorem'),
      precss      = require('precss'),
      cssnext     = require('postcss-cssnext'),
      lost        = require('lost');


      // Default source and build folder
var   input       = './src',
      output      = './build';


// Folders
let path = {
      html: [input + '/**/*.html'],
      css: [input + '/css/*.css'],
      js: [input + '/js/**/*.js'],
      images: [input + '/images/**/**/*'],
      fonts: [input + '/fonts/**/*']
    };


// CSS Process
gulp.task('css', () => {

  var processors = [
    precss(),
    cssnext({
      browsers: ['last 6 version']
    }),
    lost(),
    pxtorem({
      propWhiteList: [],
      mediaQuery: true
    })
  ];

  return gulp.src(path.css)
  .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(cssnano())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(output + '/css/'))
  .pipe(browserSync.stream());

});


// Copy html files
gulp.task('html', () => {
  gulp.src(path.html)
  .pipe(gulp.dest(output))
  .pipe(browserSync.stream());
});


// Server
gulp.task('server', ['html', 'css'], function() {

    browserSync.init({
        server: output
    });

});


// Watcher task
gulp.task('watch', () => {
  gulp.watch(path.html, ['html']);
  gulp.watch(path.css, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.images, ['imagemin']);
});


// Default task
gulp.task('default', ['server', 'watch']);
