'use strict';


module.exports = function(grunt){

  grunt.registerTask("css-stats", function() {

    var fs          = require('fs'),
        async       = require('async'),
        cssstats    = require('cssstats'),
        StyleStats  = require('stylestats'),
        done        = this.async(),
        cssFile     = grunt.config(['stats', 'src']) || 'build/ustyle-latest.css';

    function readFile(callback) {
      fs.readFile(cssFile, 'utf8', callback);
    }

    function extractCssStats(data, callback) {
      var stats = new cssstats(data, {
        safe: true
      });
      callback(null,stats);
    }

    function extractStyleStats(stats, callback) {
      (new StyleStats(cssFile, {})).parse(function(err, styleStatsData){
        callback(null, stats, styleStatsData);
      })
    }

    function createModel(err, cssData, styleStatsData) {
      var model = {
        Css: cssData,
        Style: styleStatsData
      }
      processData(model);
    }

    function processData(model) {
      console.log('Float properties', model.Style.floatProperties);
      done();
    }

    async.waterfall([
      readFile,
      extractCssStats,
      extractStyleStats
    ], createModel );

  });
}
