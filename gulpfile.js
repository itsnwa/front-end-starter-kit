'use strict';

      // Require
const gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      sass        = require('gulp-sass'),
      postcss     = require('gulp-postcss'),
      sourcemaps  = require('gulp-sourcemaps'),
      cssnano     = require('gulp-cssnano'),
      concat      = require('gulp-concat'),
      babel       = require('gulp-babel'),
      uglify      = require('gulp-uglify'),
      browserSync = require('browser-sync'),
      imagemin    = require('gulp-imagemin'),
      console     = require('better-console'),
      del         = require('del'),
      plumber     = require('gulp-plumber'),
      rename      = require('gulp-rename'),
      markdown    = require('gulp-markdown'),
      cp          = require('child_process'),

      // PostCSS Plugins
      pxtorem     = require('postcss-pxtorem'),
      cssnext     = require('postcss-cssnext'),
      lost        = require('lost');


      // Default source and build folder
var   src         = './_src',
      dist        = './assets';


// Folders ( Make sure you add new jekyll folders to the jekyll line as needed )
var path = {
      scss: [src + '/scss/**/*.scss'],
      js: [
        // Vendors
        'node_modules/jquery/dist/jquery.js',
        'node_modules/clipboard/dist/clipboard.js',
        // Local JS
        src + '/js/**/*.js'
      ],
      images: [src + '/images/**/*'],
      fonts: [src + '/fonts/**/*'],
      jekyll: ['index.html', '_pages/**/*', '_layouts/**/*', '_includes/**/*', '_data/**/*', 'assets/**/*']
    };


// Jekyll build
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


// Build the Jekyll Site
gulp.task('jekyll-build', (code) => {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
      .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
      .on('close', code);
});


// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.reload();
});


// CSS
gulp.task('css', () => {

  var processors = [
    cssnext({
      browsers: ['last 6 version']
    }),
    lost(),
    pxtorem({
      propWhiteList: [],
      mediaQuery: true
    })
  ];

  return gulp.src(src + '/scss/*.scss')
  .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(cssnano({ discardComments: { removeAll: true }}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(dist + '/css/'))
  .pipe(browserSync.stream());
});


// Javascript
gulp.task('js', () => {
  return gulp.src(path.js)
    .pipe(concat('bundle.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dist + '/js/'))
    .pipe(browserSync.stream());
});


// Images
gulp.task('imagemin', () => {
	return gulp.src(path.images)
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message));
      gulp.task('imagemin').emit('end');
    }))
	  .pipe(imagemin())
    .pipe(gulp.dest(dist + '/images/'))
    .pipe(browserSync.stream());
});


// Copy font files
gulp.task('copy-fonts', () => {
  gulp.src(path.fonts)
  .pipe(gulp.dest(dist + '/fonts/'));
});


// Parse README.md to HTML
gulp.task('readme', () => {
    return gulp.src('README.md')
        .pipe(markdown())
        .pipe(gulp.dest('_includes'));
});


// Clean build folder
gulp.task('clean', () => del(['_site'], {dot: true}));
gulp.task('clean:all', () => del(['_site', 'assets'], {dot: true}));


// Server
gulp.task('server', ['css', 'jekyll-build'], () => {
  browserSync.init({
    server: {
      baseDir: '_site',
    },
    port: 3000,
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
    logLevel: 'silent'
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
  gulp.watch(path.scss, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.images, ['imagemin']);
  gulp.watch(path.jekyll, ['jekyll-rebuild']);
});


// Re-build everything
gulp.task('build', ['clean:all'], () => {
  gulp.start(['css', 'js', 'imagemin', 'copy-fonts', 'readme']);
});


// Default task
gulp.task('default', ['build'], () => {
  gulp.start(['server', 'watch']);
});
