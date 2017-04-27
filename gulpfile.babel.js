const gulp = require('gulp');
const glob = require('glob');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');

function compile(watch) {
  let bundler = watchify(browserify({ entries: glob.sync('./js/*.js'), debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', (err) => { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', () => compile());
gulp.task('watch', () => watch());

gulp.task('default', ['watch']);
