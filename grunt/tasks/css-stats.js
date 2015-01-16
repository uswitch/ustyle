'use strict';

var fs = require('fs');
var cssstats = require('cssstats');
var StyleStats = require('stylestats');

module.exports = function(grunt){

  grunt.registerTask("css-stats", function() {
    var done = this.async();
    var cssFile = 'build/ustyle-latest.css';
    var cssFileContent = fs.readFileSync(cssFile, {
      encoding: 'utf8'
    });

    var result = {};

    result.CSSStat = new cssstats(cssFileContent, {
      safe: true
    });

    (new StyleStats(cssFile, {})).parse(function(error, data){
      result.StyleStats = data;
      showStats();
    });

    function showStats(){
      console.log(result);
    }

  });
}
