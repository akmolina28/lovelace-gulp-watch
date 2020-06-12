var gulp = require('gulp'),
  watch = require('gulp-watch'),
  touch = require('gulp-touch-cmd'),
  config = require('./config');

gulp.task('watch', function () {
  if (!config.watch_path && !config.dashboards) {
    console.error("You must configure either a watch_path or a dashboard in config.json. See readme for details.");
  }

  if (config.watch_path) {
    watch(config.watch_path, { usePolling: true }, function (file) {
      console.log(file.basename + " changed. Auto-touching ui-lovelace.yaml.");
      gulp.src(config.ui_lovelace_path).pipe(touch());
    });
  }

  if (config.dashboards) {
    config.dashboards.forEach((d) => {
      watch(d.watch_path, { usePolling: true }, function (file) {
        console.log(file.basename + " changed. Auto-touching " + d.dashboard_path);
        gulp.src(d.dashboard_path).pipe(touch());
      });
    });
  }
});