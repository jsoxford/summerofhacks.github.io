/*
  This takes a list of front-mattered files and
  formats them into a json file.

  This is specific to processing events. So stuff
  like ordering/processing/etc could be done here.

  Based from gulp-concat.
*/
'use strict';

var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var Concat = require('concat-with-sourcemaps');

// file can be a vinyl file object or a string
// when a string it will construct a new one
module.exports = function(file, opt) {

  var _data = []

  if (!file) {
    throw new PluginError('event-data-concat', 'Missing file option for event-data-concat');
  }
  opt = opt || {};

  var isUsingSourceMaps = false;
  var latestFile;
  var fileName;

  if (typeof file === 'string') {
    fileName = file;
  } else if (typeof file.path === 'string') {
    fileName = path.basename(file.path);
  } else {
    throw new PluginError('event-data-concat', 'Missing path in file options for event-data-concat');
  }

  function bufferContents(file, enc, cb) {
    // ignore empty files
    if (file.isNull()) {
      cb();
      return;
    }

    // we don't do streams
    if (file.isStream()) {
      this.emit('error', new PluginError('event-data-concat',  'Streaming not supported'));
      cb();
      return;
    }

    file.frontMatter._body = file.contents.toString('utf8')
    _data.push(file.frontMatter)

    latestFile = file


    cb();
  }

  function endStream(cb) {

    // no files passed in, no file goes out
    if (!latestFile) {
      cb();
      return;
    }


    var joinedFile;

    // if file opt was a file path
    // clone everything from the latest file
    if (typeof file === 'string') {
      joinedFile = latestFile.clone({contents: false});
      joinedFile.path = path.join(latestFile.base, file);
    } else {
      joinedFile = new File(file);
    }

    // joinedFile.contents = Buffer.from(JSON.stringify(_data))
    joinedFile.contents = new Buffer(JSON.stringify(_data, null, 1))

    this.push(joinedFile)

    cb()

  }

  return through.obj(bufferContents, endStream);
};
