'use strict';

module.exports = function(grunt){

  grunt.registerMultiTask('builder', function() {

    var handlebars  = require('handlebars'),
        async       = require('async'),
        path        = require('path'),
        fs          = require('fs'),
        fm          = require('front-matter'),
        template    = require('../modules/templates'),
        fileHelper  = require('../modules/file'),
        slugify     = require("underscore.string/slugify"),
        promise     = this.async(),
        files       = this.files;

    var options = this.options({
      templates: './styleguide/**/*.tpl'
    });

    async.waterfall([
        init,
        generateStyleguide
    ], completeTask);

    function completeTask(){
      promise();
    }

    function init(callback){
      template.registerHelpers();
      generateTemplates(options.templates);
      callback(null);
    }

    function generateStyleguide(callback){
      files.forEach(function(file){
        var dest = file.dest,
            datum = grunt.file.readJSON(file.src[0]);
        generatePages(datum, datum.pages, dest);
      });
      callback(null, 'done');
    }

    function generatePages(data, pages, dest){
      pages.map(function(page){
        var model = {
          project: data.project,
          navigation: data.navigation,
          page: page,
          pages: data.pages
        };
        var outputFilePath = dest + slugify(page.section) + "/" + page.page,
            template = handlebars.compile(grunt.file.read(page.template))(model);

        fileHelper.writeFile(template, outputFilePath, "Build");
      });
    }

    function generateTemplates(templatePath){
      var templates = {};

      grunt.file.expand(templatePath).forEach(function(file){
        var templateName = path.basename(file, '.tpl');
        templates[templateName] = grunt.file.read(file);
      });

      handlebars.registerPartial(templates);
    }

  });
}
