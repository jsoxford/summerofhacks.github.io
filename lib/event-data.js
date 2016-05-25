var fs = require('fs')
var path = require('path')
var async = require('async')
var fm = require('front-matter')
var marked = require('marked')
var moment = require('moment')
var glob = require("glob")

var processFile = function (filename, cb) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) return cb(err)

    var content = fm(data)

    var event = content.attributes
    event.body_plain = content.body
    event.body = marked(content.body)

    event.slug = slug(filename)

    cb(null, event)
  })
}


function events(pattern){

  return function(_file, callback) {

    glob(pattern, {}, function(err, files){

      async.map(
        files,
        processFile,
        function(err, events) {
          if(err) return callback(err)

          events.sort(function(a,b) {
            return moment(a.date).diff(b.date)
          })

          callback(null, {
            events: events
          })

        }
      )

    })

  }

}

// create an id-able slug from path name
// eg '2016:1-nodeschool'
function slug(f) {
  return path.basename(path.dirname(f)) + ':' + path.basename(f,'.md')
}


module.exports = events
