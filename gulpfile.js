var gulp = require('gulp');
var uglify = require('gulp-uglify');
var wrap = require("gulp-wrap");

gulp.task('default', function() {
  return gulp.src('index.js')
    .pipe(uglify())
    .pipe(wrap('javascript:<%= contents %>'))
    .pipe(gulp.dest('dist'));
});
