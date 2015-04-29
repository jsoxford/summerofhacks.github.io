require('dotenv').load();

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var htmlmin = require('gulp-html-minifier');
var inlinesource = require('gulp-inline-source');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var ghPages = require('gulp-gh-pages');
var awspublish = require('gulp-awspublish');
var RevAll = require('gulp-rev-all');


var paths = {
  assets: [
    'CNAME',
    'src/icons/*',
    'src/images/*'
  ],
  js: [
    'src/bower/webfontloader/webfontloader.js',
    'src/bower/bean/bean.min.js',
    'src/script.js'
  ]
};

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('html.dist', ['html', 'less'], function(){
  return gulp.src('build/index.html')
    .pipe(inlinesource())
    .pipe(htmlmin({
      minifyJS: true, 
      minifyCSS:true,
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('less', function() {
  return gulp.src('src/style.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('all.js', {newLine:';'}))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('js.dist', ['js'], function() {
  return gulp.src('build/all.js')
    .pipe(uglify())
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


gulp.task('deploy', ['build.dist'], function() {

  var options = {};

  if('GH_LOGIN' in process.env)
    options = {
      remoteUrl:'https://' + process.env.GH_LOGIN + ':' + process.env.GH_TOKEN + '@github.com/jsoxford/summerofhacks.github.io.git'
    };

  return gulp.src('build/**/*')
    .pipe(ghPages(options));
});

gulp.task('publish', ['build.dist'], function() {

  var publisher = awspublish.create({
    params: {
      Bucket: "summerofhacks.io"
    },
    region: 'eu-west-1',
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  });

  var revAll = new RevAll({
    dontRenameFile: [/^\/favicon.ico$/g, /^\/index.html/g]
  });
 
  return gulp.src('build/*')
    .pipe(revAll.revision())
    .pipe(publisher.publish())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});



gulp.task('build',      ['html', 'less', 'js', 'assets']);
gulp.task('build.dist', ['html.dist', 'less', 'js.dist', 'assets']);

gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['html']);
  gulp.watch(['src/style.less'], ['less']);
  gulp.watch(paths.assets, ['assets']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['serve', 'watch', 'build']);
