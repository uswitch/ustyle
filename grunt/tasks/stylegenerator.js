'use strict';


module.exports = function(grunt){

  grunt.registerMultiTask('stylegenerator', function() {

    var handlebars  = require('handlebars'),
        async       = require('async'),
        path        = require('path'),
        fs          = require('fs'),
        template    = require('../modules/templates'),
        promise     = this.async(),
        guideData   = this.data.guide,
        files       = this.files,
        statsData   = this.data.stats;

    var options = this.options({
      baseDir: './styleguide/templates/',
      templates: './styleguide/**/*.tpl',
      templateOutput: './build/docs/',
      templateBase: 'base.tpl'
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

        generatePages(datum, datum.sections, dest);

      });

      callback(null, 'done');
    }

    function generatePages(data, sections, dest){


      sections.map(function(section){
        var outputFilePath = dest + section.page,
            templateFilePath = section.template,
        content = {
          project: data.project,
          section: section,
          sections: data.sections
        },
        outputType = 'created',
        old = null,
        output = handlebars.compile(grunt.file.read(templateFilePath))(content);

        if (grunt.file.exists(outputFilePath)) {
          outputType = 'overwritten';
          old = grunt.file.read(outputFilePath);
        }

        if (old !== output) {
          grunt.file.write(outputFilePath, output);
          grunt.log.writeln('✓ Styleguide ' + outputType + ' at: ' + grunt.log.wordlist([outputFilePath], {color: 'cyan'}));
        } else {
          grunt.log.writeln('‣ Styleguide unchanged');
        }
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
