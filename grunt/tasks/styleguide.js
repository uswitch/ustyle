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
        semver          = require('semver'),
        exec            = require('child_process').exec,
        simpleGit       = require('simple-git')( path.resolve('.') ),
        promise         = this.async(),
        files           = this.files,
        outputFilePath  = this.data.output,
        styleguidePath  = this.data.dir,
        contentPath     = path.join(styleguidePath, "content"),
        templatePath    = path.join(styleguidePath, "templates"),
        cssStatsFile    = this.data.statsFor,
        tagStartVersion = this.data.tagStartVersion,
        tagPlaceholder  = this.data.tagPlaceholder,
        styleguide      = [];

    var options = this.options({
        template: "styleguide.tpl",
        contentTemplate: "simple.tpl",
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
                          template: _getTemplate(options.template),
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
              template: _getTemplate(data.data.template || options.contentTemplate),
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
      var cssFileData, selectors, cssParser,
          omitEntries, statsPage, cachedStatsFile;

      cachedStatsFile = 'tmp/.stats-cache';

      statsPage = {
        name: 'Stats',
        page: 'stats.html',
        section: 'pattern-library',
        content: {report: []},
        template: 'styleguide/templates/stats.tpl',
      };

      //Get the latest tag, if the tag is different from the cached one
      //fetch new data.
      exec('git describe --tags `git rev-list --tags --max-count=1`',
        function(error, stdout, sterr) {
          var latestTag = semver.clean(stdout);
          var data;

          try {
            data = grunt.file.readJSON(cachedStatsFile);
            var latestVersion = data[0].version;
            if(data[0] && data[0].version && semver.eq(latestVersion, latestTag)) {
              statsPage.content.report = data;
              next();
            }else {
              fetchNewStatsData();
            }
          }
          catch(err) {
            // File does't exist or wrong format.
            fetchNewStatsData()
          }
        }
      );

      function fetchNewStatsData() {
        async.waterfall([
          getTags,
          getStylesListing,
          getStats,
        ], next);
      }

      function getTags(callback) {
        simpleGit.tags(function(err, tags) {
          callback(null, tags);
        });
      }

      function getStylesListing(tags, callback) {
        var styleListing = tags.all.map(function(tag){
          var cleanTag = semver.clean(tag);
          if(cleanTag!=null && semver.gt(cleanTag, tagStartVersion)) {
            return {
                    version: cleanTag,
                    path: cssStatsFile.replace(tagPlaceholder, cleanTag)
                   }
          }
        });
        callback(null, _.compact(styleListing));
      }

      function getStats(styleListing, callback) {
        omitEntries = [
          'dataUriSize', 'ratioOfDataUriSize','lowestCohesion',
          'lowestCohesionSelector', 'uniqueFontSize', 'uniqueFontFamily',
          'propertiesCount', 'published', 'paths', 'mostIdentifierSelector',
          'totalUniqueFontSizes', 'mostIdentifier', 'totalUniqueFontFamilies',
          'totalUniqueColors', 'unqualifiedAttributeSelectors', 'floatProperties',
          'uniqueColor'
        ];

        async.map(styleListing,
          function(entry, cb){
            cssParser = new StyleStats(entry.path, {});
            cssParser.parse(function(err, styleStatsData){
              var generalReport = _.omit(styleStatsData,omitEntries);
              if(Object.keys(generalReport).length) {
                generalReport.version = entry.version;
                statsPage.content.report.push(generalReport);
              }
              cb();
            });
          },
          function(){
            //Sort array
            var sortedReport = statsPage.content.report.sort(function(a,b){
              return semver.rcompare(a.version, b.version);
            });
            statsPage.content.report = sortedReport;
            fileHelper.writeFile(JSON.stringify(sortedReport), cachedStatsFile, "Cached stats");
            callback();
          }
        );
      }

      function next(){
        model.pages.push(statsPage);
        callback(null, model);
      }
    }

    function _getSection(sections){
      return _.chain(sections).map(function(data){ return slugify(data.section) }).compact().uniq().value();
    }

    function _sortyByIndex(sections){
      return sections.sort(function(a, b){
        return (a.page == "index.html" ? -1 : 1);
      })
    }

    function _getTemplate(name){
      return path.join(templatePath, name);
    }

    function writeFile(model, callback){
      fileHelper.writeFile(JSON.stringify(model), outputFilePath, "Styleguide");
      callback(null, 'done');
    }
  });
};
