"use strict";

module.exports = function(grunt){
  grunt.registerMultiTask('svg2png', 'Convert SVG to PNGs', function(){

    var svg_to_png = require('svg-to-png'),
        path       = require('path'),
        async      = require('async'),
        fileHelper = require('../modules/file'),
        Promise    = require('bluebird'),
        files      = grunt.file.expand(this.data.src + "**/*.svg"),
        dest       = this.data.src,
        done       = this.async(),
        sizes      = this.data.sizes,
        promises   = [];

    files.forEach(function(file){
      var svg = grunt.file.read(file);
      var newSvg = svg.replace(/width=\"[0-9]+\" height=\"[0-9]+\"/, '');
      fileHelper.writeFile(newSvg, "tmp/" + path.basename(file), "Icon");
    });

    sizes.forEach(function(size){
      var sizing = size.split(" ");
      var sizeX = sizing[0];
      var sizeY = sizing[1];
      var tmpFiles = grunt.file.expand("tmp/" + "**/*.svg");
      promises.push(convert(tmpFiles, sizeX, sizeY))
    });

    Promise.all(promises).then(function(){
      done();
    });

    function convert(files, sizeX, sizeY){
      return svg_to_png.convert(files, path.join( dest + sizeX + "px"), {defaultWidth: sizeX, defaultHeight: sizeY, compress: true})
    }
  });
}