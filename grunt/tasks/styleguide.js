"use strict";

// Expose
module.exports = function(grunt){
  grunt.registerMultiTask('styleguide', 'Parse DSS comment blocks', function(){

    var dss             = require('dss'),
        _               = require('lodash'),
        async           = require('async'),
        path            = require('path'),
        fs              = require('fs'),
        underscored     = require('../modules/underscored'),
        dssHelper       = require('../modules/dss-helper'),
        humanize        = require("underscore.string/humanize"),
        promise         = this.async(),
        files           = this.files,
        outputFilePath  = this.data.output,
        staticPages     = this.data.static,
        styleguide      = [];

    var options = this.options({
        baseDir: './styleguide/',
        templates: './styleguide/**/*.tpl',
        templateOutput: './build/docs/',
        templateIndex: 'base.tpl',
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
      generateStaticContent,
      generateStyleguide
    ], completeTask);

    function completeTask(){
      promise();
    }

    function init(callback){
      dssHelper.addParsers(options.parsers);
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
                          template: 'styleguide/templates/styleguide.tpl',
                          blocks: value
                      }
                    })
                    // As it's iterating over files, we don't want files that aren't documented to come through
                    .filter(function(object) { return object.name != "undefined" }).compact().value();
      callback(null, sections);
    }

    function generateStaticContent(sections, callback) {

      var pages = grunt.file.expand(staticPages).map(function(file){
        return {
          name: humanize(path.basename(file, '.tpl')),
          page: path.basename(file, 'tpl') + 'html',
          template: file
        }
      });

      callback(null, _.assign(sections, pages));
    }

    function generateStyleguide(sections, callback){

      var outputType = 'created', old = null;

      var data = {
        sections: sections,
        project: grunt.file.readJSON('package.json')
      }

      var output = JSON.stringify(data);

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
      callback(null, 'done');
    }
  });
};
