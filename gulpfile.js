require('dotenv').load();

var gulp = require('gulp');
var connect = require('gulp-connect');
var minifyHTML = require('gulp-minify-html');
var less = require('gulp-less');
var ghPages = require('gulp-gh-pages');
var awspublish = require('gulp-awspublish');


var paths = {
  assets: [
    'CNAME',
    'src/icons/*',
    'src/images/*',
    'src/script.js'
  ]
};

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(minifyHTML({quotes:true}))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('less', function() {
  return gulp.src('src/style.less')
    .pipe(less())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

// note: all asset paths are flattened
gulp.task('assets', function() {
  return gulp
    .src(paths.assets)
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

gulp.task('publish', function() {

  var publisher = awspublish.create({
    params: {
      Bucket: "summerofhacks.io"
    },
    region: 'eu-west-1',
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  });
 
  return gulp.src('build/*')
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});



gulp.task('build', ['html', 'less', 'assets']);

gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['html']);
  gulp.watch(['src/style.less'], ['less']);
  gulp.watch(paths.assets, ['assets']);
});

gulp.task('default', ['serve', 'watch']);
