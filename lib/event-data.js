const fs = require('fs')
const path = require('path')
const async = require('async')
const fm = require('front-matter')
const marked = require('marked')

const processFile = (filename, cb) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) return cb(err)

    const content = fm(data)

    const event = content.attributes
    event.body_plain = content.body
    event.body = marked(content.body)

    cb(null, event)
  })
}


const proccessDirectory = (dir, cb) =>
  fs.readdir(dir, (err, files) => {
    if (err) return cb(err)

    async.map(
      files.map(f => path.join(dir, f)), processFile,
      cb
    )

  })

module.exports = proccessDirectory
