      // Require
const gulp        = require('gulp'),
      postcss     = require('gulp-postcss'),
      sourcemaps  = require('gulp-sourcemaps'),
      cssnano     = require('gulp-cssnano'),
      browserSync = require('browser-sync'),

      // PostCSS Plugins
      pxtorem     = require('postcss-pxtorem'),
      precss      = require('precss'),
      cssnext     = require('postcss-cssnext');


// Folders
let path = {
      css: ['./src/css/*.css',
            './src/css/**/.css',
            './src/css/**/**/*.css'],
      js: ['./src/js/*.js'],
      images: ['.src/images/*',
               '.src/images/**/*'],
      fonts: ['.src/fonts/*']
    };


// Static Server + watching scss/html files
gulp.task('serve', ['css'], function() {

    browserSync.init({
        server: "./src"
    });

});


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

  return gulp.src('./src/css/*.css')
  .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(cssnano())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dest'))
  .pipe(browserSync.stream());

});


// Watcher task
gulp.task('watch', () => {
  gulp.watch('./src/*.html').on('change', browserSync.reload);
  gulp.watch(path.css, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.images, ['imagemin']);
});


// Default task
gulp.task('default', ['serve', 'watch']);
