var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('bundleAddons', function () {
    return gulp.src('../addons/*.js')
    .pipe(concat('drawingAddons.js'))
    .pipe(gulp.dest('../libs'));
});