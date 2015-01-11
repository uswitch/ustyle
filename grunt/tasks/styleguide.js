"use strict";

// Expose
module.exports = function(grunt){
  grunt.registerMultiTask('styleguide', 'Parse DSS comment blocks', function(){

    var handlebars  = require('handlebars'),
        dss         = require('dss'),
        _           = require('lodash'),
        async       = require('async'),
        path        = require('path'),
        fs          = require('fs'),
        underscored = require('../modules/underscored'),
        dssHelper   = require('../modules/dss-helper'),
        template    = require('../modules/templates'),
        promise     = this.async(),
        files       = this.files,
        styleguide  = [];

    var options = this.options({
        baseDir: './styleguide/',
        templates: './styleguide/**/*.tpl',
        templateOutput: './build/docs/',
        templateIndex: 'index.tpl',
        parsers: {
          variable: dssHelper.variableDssParser(),
          partial: function(i, line, block){ return line; },
          section: function(i, line, block){ return line; },
          description: dssHelper.descriptionDssParser
        }
    });

    async.waterfall([
      init,
      parseDSS,
      groupDSS,
      generateStyleguide
    ], completeTask);

    function completeTask(){
      promise();
    }

    function init(callback){
      template.registerHelpers();
      dssHelper.addParsers(options.parsers);
      generateTemplates(options.templates);

      callback(null);
    }

    function parseDSS(callback){
      var styleguide = [];
      var srcFiles = files[0].src;

      srcFiles.forEach(function(file){
        dss.parse(grunt.file.read(file), { file: file }, function(parsed) {

          // Continue only if file contains DSS annotation
          if (parsed.blocks.length) {
            // Add comment block to styleguide
            parsed.blocks.map(function(block){

              block['path'] = file;
              block['file'] = path.basename(file);
              block['link'] = underscored(block['name']);

              // Normalize @state and @variable to array
              ['state', 'variable'].forEach(function(prop) {
                if (block.hasOwnProperty(prop) && typeof block[prop].slice !== 'function') {
                  block[prop] = [block[prop]];
                }
              });

              if(block.markup){
                block.markup.escaped = dssHelper.removeModifiersFromMarkup(block.markup.escaped);  
              }

              if(block.hasOwnProperty('state')){
                block.state.map(function(state){
                  state.markup = {
                    example: dssHelper.addStateToExample(block.markup.example, state.escaped)
                  }
                })
              }
            });
            styleguide.push(parsed.blocks);
          }
        });
      });
      callback(null, styleguide);
    }

    function groupDSS(styleguide, callback){
      var sections = _.chain(styleguide).flatten().groupBy('section')
                    .map(function(value, key) {
                      return {
                          name: key,
                          page: key.toLowerCase() + '.html',
                          blocks: value
                      }
                    })
                    // As it's iterating over files, we don't want files that aren't documented to come through
                    .filter(function(object) { return object.name != "undefined" }).compact().value();

      callback(null, sections);
    }

    function generateStyleguide(sections, callback){
      var templateFilePath = options.baseDir + options.templateIndex;

      sections.map(function(section){
        var outputFilePath = options.templateOutput + section.page,
            data = {
              project: grunt.file.readJSON('package.json'),
              section: section,
              sections: sections
            };

        var output     = handlebars.compile(grunt.file.read(templateFilePath))(data);

        var outputType = 'created', old = null;

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

      callback(null, 'done');
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
};