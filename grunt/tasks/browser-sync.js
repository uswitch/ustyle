'use strict'

module.exports = function (grunt) {
  var browserSync = require('browser-sync')

  grunt.registerTask('browserSync-init', function () {
    var done = this.async()
    browserSync({
      server: './docs',
      notify: false
    }, function (err, bs) {
      if (err) {
        console.log(err)
      }

      done()
    })
  })

  grunt.registerTask('browserSync-inject', function () {
    browserSync.reload(['docs/css/main.css'])
  })
}
