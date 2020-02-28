var gulp = require('gulp'),
  watch = require('gulp-watch'),
  touch = require('gulp-touch-cmd'),
  config = require('./config');

gulp.task('watch', function () {
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  return watch(config.watch_path, { usePolling: true }, function (file) {
    console.log(file.basename + " changed. Auto-touching ui-lovelace.yaml.");
    gulp.src(config.ui_lovelace_path).pipe(touch());
  });
});