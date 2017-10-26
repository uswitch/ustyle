const handlebars = require('handlebars')
const async = require('async')
const path = require('path')
const template = require('../modules/templates')
const fileHelper = require('../modules/file')
const slugify = require('underscore.string/slugify')

module.exports = function (grunt) {
  grunt.registerMultiTask('builder', function () {
    var promise = this.async()
    var files = this.files

    var options = this.options({
      templates: './styleguide/**/*.tpl'
    })

    async.waterfall([
      init,
      generateStyleguide
    ], completeTask)

    function completeTask () {
      promise()
    }

    function init (callback) {
      template.registerHelpers()
      generateTemplates(options.templates)
      callback(null)
    }

    function generateStyleguide (callback) {
      files.forEach(function (file) {
        const dest = file.dest
        const datum = grunt.file.readJSON(file.src[0])
        generatePages(datum, datum.pages, dest)
      })
      callback(null, 'done')
    }

    function generatePages (data, pages, dest) {
      pages.map(function (page) {
        const model = {
          project: data.project,
          navigation: data.navigation,
          page: page,
          pages: data.pages
        }
        const outputFilePath = dest + slugify(page.section) + '/' + page.page
        const template = handlebars.compile(grunt.file.read(page.template))(model)

        fileHelper.writeFile(template, outputFilePath, 'Build')
      })
    }

    function generateTemplates (templatePath) {
      var templates = {}

      grunt.file.expand(templatePath).forEach(function (file) {
        var templateName = path.basename(file, '.tpl')
        templates[templateName] = grunt.file.read(file)
      })

      handlebars.registerPartial(templates)
    }
  })
}
