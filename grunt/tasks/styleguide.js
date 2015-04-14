"use strict";

// Expose
module.exports = function(grunt){
  grunt.registerMultiTask('styleguide', 'Parse DSS comment blocks', function(){

    var dss             = require('dss'),
        _               = require('lodash'),
        async           = require('async'),
        path            = require('path'),
        fs              = require('fs'),
        dssHelper       = require('../modules/dss-helper'),
        fileHelper      = require('../modules/file'),
        humanize        = require("underscore.string/humanize"),
        underscored     = require("underscore.string/underscored"),
        slugify         = require("underscore.string/slugify"),
        matter          = require("gray-matter"),
        marked          = require('marked'),
        promise         = this.async(),
        files           = this.files,
        outputFilePath  = this.data.output,
        staticPages     = this.data.static,
        styleguide      = [];

    var options = this.options({
        template: 'styleguide/templates/styleguide.tpl',
        parsers: {
          variable: dssHelper.variableDssParser(),
          partial: function(i, line, block){ return line; },
          page: function(i, line, block){ return line; },
          description: dssHelper.descriptionDssParser
        }
    });

    async.waterfall([
      init,
      parseDSS,
      groupDSS,
      generateStaticContent,
      generateStyleguide,
      writeFile
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
      var sections = _.chain(styleguide).flatten().groupBy('page')
                    .map(function(value, key) {

                      var structure = key.split("/"),
                          section = structure[0],
                          page = structure[1];

                      return {
                          name: page,
                          page: slugify(page) + '.html',
                          template: options.template,
                          section: section,
                          blocks: value
                      }
                    })
                    // As it's iterating over files, we don't want files that aren't documented to come through
                    .filter(function(object) { return object.section != "undefined" }).compact().value();
      callback(null, sections);
    }

    function generateStaticContent(sections, callback) {
      var pages = grunt.file.expand("./styleguide/**/*")
          .filter(function(dir){
            var stats = fs.lstatSync(dir);
            return !/assets|templates|partials/.test(dir) && !stats.isDirectory();
          })
          .map(function(file){

            var data = matter.read(file),
                extension = path.extname(file),
                filename = path.basename(file, extension);

            return {
              name: data.data.name || humanize(filename),
              page: filename + '.html',
              template: data.data.template || "styleguide/templates/simple.tpl",
              section: data.data.section || "",
              content: marked(data.content)
            }
          });

      callback(null, pages.concat(sections));
    }

    function generateStyleguide(sections, callback){
      var model = {
        pages: sections,
        navigation: _getSection(sections),
        project: grunt.file.readJSON('package.json')
      }

      callback(null, model);
    }

    function _getSection(sections){
      return _.chain(sections).map(function(data){ return data.section }).compact().uniq().value();
    }

    function writeFile(model, callback){
      fileHelper.writeFile(JSON.stringify(model), outputFilePath, "Styleguide");
      callback(null, 'done');
    }
  });
};
