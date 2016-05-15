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

    cb(null, event)
  })
}


function events(pattern){

  // var files = glob.readdirSync(pattern)

  return function(_file, callback) {

    glob(pattern, {}, function(err, files){

      console.log("files?", files)

      async.map(
        files,
        processFile,
        function(err, events) {
          if(err) return callback(err)

          events.sort(function(a,b) {
            return moment(a.date).diff(b.date)
          })

          console.log("events", events)

          callback(null, {
            events: events
          })

        }
      )


    })

  }

}



module.exports = events
