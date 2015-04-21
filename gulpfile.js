var gulp = require('gulp');
var connect = require('gulp-connect');
var minifyHTML = require('gulp-minify-html');
var less = require('gulp-less');
var ghPages = require('gulp-gh-pages');

gulp.task('html', function() {
  gulp.src('src/index.html')
    .pipe(minifyHTML({quotes:true}))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('less', function() {
  gulp.src('src/style.less')
    .pipe(less())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

// flatten icons into root build directory
gulp.task('icons', function() {
  gulp
    .src(['src/icons/*'])
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

// flatten icons into root build directory
gulp.task('images', function() {
  gulp
    .src(['src/images/*'])
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

 
gulp.task('serve', ['build'], function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});


gulp.task('deploy', ['build'], function() {
  return gulp.src('build/**/*')
    .pipe(ghPages());
});

gulp.task('build', ['html', 'less', 'images', 'icons']);

gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['html']);
  gulp.watch(['src/style.less'], ['less']);
  gulp.watch(['src/images/*'], ['images']);
});

gulp.task('default', ['serve', 'watch']);