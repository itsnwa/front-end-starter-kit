'use strict';

      // Require
const gulp        = require('gulp'),
      postcss     = require('gulp-postcss'),
      sourcemaps  = require('gulp-sourcemaps'),
      cssnano     = require('gulp-cssnano'),
      uglify      = require('gulp-uglify'),
      browserSync = require('browser-sync'),
      imagemin    = require('gulp-imagemin'),
      console     = require('better-console'),
      del         = require('del'),
      rename      = require('gulp-rename'),

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
      css: [input + '/css/**/*.css'],
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

  return gulp.src(input + '/css/main.css')
  .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(cssnano())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(output + '/css/'))
  .pipe(browserSync.stream());

});


// Uglify JS
gulp.task('js', () => {
  return gulp.src(path.js)
    .pipe(uglify())
    .pipe(gulp.dest(output + '/js/'));
});


// Compress images
gulp.task('imagemin', () => {
	return gulp.src(paths.images)
		.pipe(imagemin())
    .pipe(gulp.dest(output + '/images/'))
    .pipe(browserSync.stream());
});


// Copy html files
gulp.task('html', () => {
  return gulp.src(path.html)
  .pipe(gulp.dest(output))
  .pipe(browserSync.stream());
});


// Clean build folder
gulp.task('clean', () => {
  return del(output);
});


// Server
gulp.task('server', ['css'], () => {
    browserSync.init({
        server: {
            baseDir: output
        },
        notify: {
            styles: {
                top: '30px',
                left: '50%',
                width: '200px',
                transform: 'translate(-50%,-50%)',
                margin: '0px',
                padding: '8px 12px',
                position: 'fixed',
                fontSize: '13px',
                fontFamily: 'Helvetica',
                zIndex: '9999',
                borderRadius: '16px',
                color: 'white',
                textAlign: 'center',
                display: 'block',
                backgroundColor: 'rgba(0,0,0, 0.8)'
            }
        },
        logLevel: 'silent',
        browser: 'google chrome'
    });

    console.clear();
    console.log('Starting DevelopmentServer');
    console.log('           ');
    console.log('           ');
    console.log('    /   /  _  / \\     NWA');
    console.log('   / \\ / \\/ \\/ - \\    Local Development Environment');
    console.log('           ');
    console.log('           ');
    console.log('Listening on port 3000');
    console.log('           ');
    console.log('           ');

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
