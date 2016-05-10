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
var data = require('gulp-data');
var handlebars = require('gulp-compile-handlebars');
var moment = require('moment');
var eventData = require('./lib/event-data.js');

var paths = {
  assets: [
    '../site/CNAME',
    '../site/icons/*',
    '../site/images/*'
  ],
  js: [
    '../site/bower/webfontloader/webfontloader.js',
    '../site/bower/bean/bean.min.js',
    '../site/script.js'
  ]
};

gulp.task('html', function() {
  return gulp.src('../site/index.html')
    .pipe(data(function(file, callback) {
      // wrap in {events: … } for template
      eventData('../events', function(err, data) {
        callback(err, data ? {events: data} : null)
      })
    }))
    .pipe(handlebars(null, {
      helpers: {
        short_date: function(str) {return moment(str).format("Do MMM");}
      }
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../_site'))
    .pipe(connect.reload());
});

gulp.task('html.dist', ['html', 'less'], function(){
  return gulp.src('../_site/index.html')
    .pipe(inlinesource())
    .pipe(htmlmin({
      minifyJS: true,
      minifyCSS:true,
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('../_site'))
    .pipe(connect.reload());
});

gulp.task('less', function() {
  return gulp.src('../site/style.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('../_site'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('all.js', {newLine:';'}))
    .pipe(gulp.dest('../_site'))
    .pipe(connect.reload());
});

gulp.task('js.dist', ['js'], function() {
  return gulp.src('../_site/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('../_site'))
    .pipe(connect.reload());
});

// note: all asset paths are flattened
gulp.task('assets', function() {
  return gulp
    .src(paths.assets)
    .pipe(gulp.dest('../_site'))
    .pipe(connect.reload());
});

gulp.task('serve', ['build'], function() {
  connect.server({
    root: '../_site',
    livereload: true
  });
});


gulp.task('deploy', ['build.dist'], function() {

  var options = {};

  if('GH_LOGIN' in process.env)
    options = {
      remoteUrl:'https://' + process.env.GH_LOGIN + ':' + process.env.GH_TOKEN + '@github.com/jsoxford/summerofhacks.github.io.git'
    };

  return gulp.src('../_site/**/*')
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

  return gulp.src('../_site/*')
    .pipe(revAll.revision())
    .pipe(publisher.publish())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});


gulp.task('build',      ['html', 'less', 'js', 'assets']);
gulp.task('build.dist', ['html.dist', 'less', 'js.dist', 'assets']);

gulp.task('watch', function () {
  gulp.watch(['../site/index.html','../events/*.md'], ['html']);
  gulp.watch(['../site/style.less'], ['less']);
  gulp.watch(paths.assets, ['assets']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['serve', 'watch', 'build']);
