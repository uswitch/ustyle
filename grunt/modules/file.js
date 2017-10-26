const grunt = require('grunt')

module.exports = {
  writeFile: function (file, dest, message) {
    var outputType = 'created'
    var oldFile = null

    if (grunt.file.exists(dest)) {
      outputType = 'overwritten'
      oldFile = grunt.file.read(dest)
    }

    if (oldFile !== file) {
      grunt.file.write(dest, file)
      grunt.log.writeln('✓ ' + message + ' ' + outputType + ' at: ' + grunt.log.wordlist([dest], {color: 'cyan'}))
    } else {
      grunt.log.writeln('‣ ' + message + ' unchanged')
    }
  },

  isMarkdown: function (extension) {
    return extension === '.md'
  }
}
