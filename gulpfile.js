var gulp = require('gulp');
var connect = require('gulp-connect');
var minifyHTML = require('gulp-minify-html');

gulp.task('html', function() {
  gulp.src('src/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

 
gulp.task('serve', ['html'], function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});


gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['html']);
});

gulp.task('default', ['serve', 'watch']);