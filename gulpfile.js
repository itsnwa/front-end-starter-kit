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
      cssnext     = require('postcss-cssnext');

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

var config = {
  serverPort: 3000
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
gulp.task('jekyll-rebuild', gulp.series('jekyll-build', function() {
    browserSync.reload();
}));

// CSS
gulp.task('css', () => {

  var processors = [
    cssnext({
      browsers: ['last 6 version']
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
      presets: ['env'],
      compact: true
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
gulp.task('fonts', () => {
  return gulp.src(path.fonts)
    .pipe(gulp.dest(dist + '/fonts/'));
});

// Parse README.md to HTML
gulp.task('readme', () => {
    return gulp.src('README.md')
        .pipe(markdown())
        .pipe(gulp.dest('_includes'));
});

// Clean build folders
gulp.task('clean', function() {
  return del([
    '_site',
    'assets'
  ]);
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', gulp.series('css', 'jekyll-build', function() {
  browserSync({
    server: {
        baseDir: '_site'
    },
    port: config.serverPort,
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

  // Some fancy console art
  console.log('Starting DevelopmentServer');
  console.log('           ');
  console.log('           ');
  console.log('    /   /  _  / \\     NWA');
  console.log('   / \\ / \\/ \\/ - \\    Local Development Environment');
  console.log('           ');
  console.log('           ');
  console.log('Listening on port ' + config.serverPort);
  console.log('           ');
  console.log('           ');

}));

// Watch files
gulp.task('watch', function() {
  gulp.watch(paths.scss, gulp.series('css'));
  gulp.watch(paths.js, gulp.series('js'));
  gulp.watch(paths.images, gulp.series('imagemin'));
  gulp.watch(paths.jekyll, gulp.series('jekyll-rebuild'));
});

// Re-build everything
gulp.task('build', gulp.series('clean', gulp.parallel('css', 'js', 'imagemin', 'fonts', 'readme'), function(done) {
  done();
}));

// Start Everything with the default task
gulp.task('default', gulp.series('browser-sync', 'watch'));
