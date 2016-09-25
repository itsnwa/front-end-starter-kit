'use strict';

      // Require
const gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      postcss     = require('gulp-postcss'),
      sourcemaps  = require('gulp-sourcemaps'),
      cssnano     = require('gulp-cssnano'),
      uglify      = require('gulp-uglify'),
      htmlmin     = require('gulp-htmlmin'),
      browserSync = require('browser-sync'),
      imagemin    = require('gulp-imagemin'),
      console     = require('better-console'),
      del         = require('del'),
      rename      = require('gulp-rename'),
      cp          = require('child_process'),

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
      fonts: [input + '/fonts/**/*'],
      jekyll: ['index.html', '_layouts', '_site', '_includes', '_data']
    };


// Jekyll build
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Build the Jekyll Site
gulp.task('jekyll-build', function (code) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
      .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
      .on('close', code);
});


// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


// CSS
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


// Javascript
gulp.task('js', () => {
  return gulp.src(path.js)
    .pipe(uglify())
    .pipe(gulp.dest(output + '/js/'));
});


// Images
gulp.task('imagemin', () => {
	return gulp.src(path.images)
		.pipe(imagemin())
    .pipe(gulp.dest(output + '/images/'))
    .pipe(browserSync.stream());
});


// HTML
gulp.task('html', () => {
  return gulp.src(path.html)
  .pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeOptionalTags: true
  }))
  .pipe(gulp.dest(output))
  .pipe(browserSync.stream());
});


// Clean build folder
gulp.task('clean', () => {
  return del(output);
});


// Server
gulp.task('server', ['css', 'jekyll-build'], () => {
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
    console.log(messages.jekyllBuild)
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
gulp.task('default', ['clean'], () => {
  gulp.start(['html', 'js', 'imagemin', 'server']);
});
