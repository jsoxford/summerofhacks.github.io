var fs = require('fs')
var path = require('path')
var async = require('async')
var fm = require('front-matter')
var marked = require('marked')

var processFile = function (filename, cb) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) return cb(err)

    var content = fm(data)

    var event = content.attributes
    event.body_plain = content.body
    event.body = marked(content.body)

    cb(null, event)
  })
}


var proccessDirectory = function (dir, cb) { return fs.readdir(dir, function (err, files) {
    if (err) return cb(err)

    async.map(
      files.map(function ( f ) { return path.join(dir, f); }), processFile,
      cb
    )

  }); }

module.exports = proccessDirectory
