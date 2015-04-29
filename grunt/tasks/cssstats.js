'use strict';


module.exports = function(grunt){

  grunt.registerMultiTask("cssstats", function() {

    var fs              = require('fs'),
        async           = require('async'),
        _               = require('lodash'),
        cssstats        = require('cssstats'),
        StyleStats      = require('stylestats'),
        handlebars      = require('handlebars'),
        fileHelper      = require('../modules/file'),
        done            = this.async(),
        cssFile         = this.data.src,
        outputFilePath  = this.data.output;


    function readFile(callback) {
      fs.readFile(cssFile, 'utf8', callback);
    }

    function extractCssStats(data, callback) {
      var stats = new cssstats(data, {
        safe: true
      });
      callback(null, stats);
    }

    function extractStyleStats(stats, callback) {
      var omitEntries = [
        'dataUriSize', 'ratioOfDataUriSize','lowestCohesion',
        'lowestCohesionSelector', 'uniqueFontSize', 'uniqueFontFamily',
        'propertiesCount', 'published', 'paths'
      ];


      (new StyleStats(cssFile, {})).parse(function(err, styleStatsData){
        var result = _.omit(styleStatsData,omitEntries);
        callback(null, stats, result);
      })
    }

    function createModel(cssData, styleStatsData, callback) {

      var data = _.chain(cssData.selectors).map(function(key, value) {
        return {
          selector: key.selector,
          specificity: key.specificity_10
        }
      }).compact().value();

      var model = {
        name: 'Stats',
        section: 'code',
        page: 'stats.html',
        template: 'styleguide/templates/stats.tpl',
        content: {
          report: styleStatsData,
          complexity: data
        }
      };
      callback(null, model);
    }

    function writeToFile(err, model) {
      var content = grunt.file.readJSON(outputFilePath);
      content.pages.push(model)
      fileHelper.writeFile(JSON.stringify(content), outputFilePath, "css stats");
      done();
    }

    async.waterfall([
      readFile,
      extractCssStats,
      extractStyleStats,
      createModel
    ], writeToFile );

  });
}
