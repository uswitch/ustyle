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
        cssstats        = require('cssstats'),
        StyleStats      = require('stylestats'),
        marked          = require('marked'),
        promise         = this.async(),
        files           = this.files,
        outputFilePath  = this.data.output,
        styleguidePath  = this.data.dir,
        contentPath     = this.data.dir + "/content",
        cssStatsFile    = this.data.statsFor,
        styleguide      = [];

    var options = this.options({
        template: styleguidePath + '/templates/styleguide.tpl',
        contentTemplate: styleguidePath + '/templates/simple.tpl',
        parsers: {
          variable: dssHelper.variableDssParser(),
          partial: function(i, line, block){ return line; },
          page: function(i, line, block){ return line; },
          description: dssHelper.descriptionDssParser,
          javascript: dssHelper.javascriptParser
        }
    });

    async.waterfall([
      init,
      parseDSS,
      groupDSS,
      generateStaticContent,
      generateStyleguide,
      generateStats,
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
              block['link'] = underscored(slugify(block['name']));

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
                          section = slugify(structure[0]),
                          page = structure[1];

                      return {
                          name: page,
                          page: slugify(page) + '.html',
                          template: options.template,
                          section: slugify(section),
                          blocks: value
                      }
                    })
                    // As it's iterating over files, we don't want files that aren't documented to come through
                    .filter(function(object) { return object.section != "undefined" }).compact().value();
      callback(null, sections);
    }

    function generateStaticContent(sections, callback) {

      var pages = grunt.file.expand(contentPath + "/**/*")
          .filter(function(dir){
            var stats = fs.lstatSync(dir);
            return !stats.isDirectory();
          })
          .map(function(file){
            var data = matter.read(file),
                extension = path.extname(file),
                section = path.dirname(file).replace((new RegExp(contentPath + "\/?", "g")), ""),
                filename = path.basename(file, extension);

            return {
              name: data.data.name || humanize(filename),
              page: filename + '.html',
              template: data.data.template || options.contentTemplate,
              section: section,
              content: (fileHelper.isMarkdown(extension) ? marked(data.content) : data.content)
            }
          });

      var data = _sortyByIndex(pages).concat(sections);

      callback(null, _sortyByIndex(data));
    }

    function generateStyleguide(sections, callback){
      var model = {
        pages: sections,
        navigation: _getSection(sections),
        project: grunt.file.readJSON('package.json')
      }

      callback(null, model);
    }

    function generateStats(model, callback) {
      var cssFileData, selectors, cssParser, omitEntries, statsPage;

      omitEntries = [
        'dataUriSize', 'ratioOfDataUriSize','lowestCohesion',
        'lowestCohesionSelector', 'uniqueFontSize', 'uniqueFontFamily',
        'propertiesCount', 'published', 'paths'
      ];

      statsPage = {
        name: 'Stats',
        section: 'code',
        page: 'stats.html',
        template: 'styleguide/templates/stats.tpl',
        content: {}
      };

      cssFileData = fs.readFileSync(cssStatsFile, 'utf8');
      cssParser   = new StyleStats(cssStatsFile, {});
      selectors   = (new cssstats(cssFileData, {safe: true})).selectors;

      cssParser.parse(function(err, styleStatsData){
        var generalReport     = _.omit(styleStatsData,omitEntries);
        var complexityReport  = _.chain(selectors).map(function(key, value) {
          return {
            selector: key.selector,
            specificity: key.specificity_10
          }
        }).compact().value();

        statsPage.content.report      = generalReport;
        statsPage.content.complexity  = complexityReport;
      })

      model.pages.push(statsPage);
      callback(null, model);
    }

    function _getSection(sections){
      return _.chain(sections).map(function(data){ return slugify(data.section) }).compact().uniq().value();
    }

    function _sortyByIndex(sections){
      return sections.sort(function(a, b){
        return (a.page == "index.html" ? -1 : 1);
      })
    }

    function writeFile(model, callback){
      fileHelper.writeFile(JSON.stringify(model), outputFilePath, "Styleguide");
      callback(null, 'done');
    }
  });
};
