"use strict";

module.exports = function(grunt){
  grunt.registerMultiTask('svg2png', 'Convert SVG to PNGs', function(){
    var svg_to_png = require('svg-to-png'),
        path       = require('path'),
        files      = this.data.src,
        async      = this.async(),
        sizes = ["20 180", "32 288", "60 540"];

    sizes.forEach(function(size){
      var sizing = size.split(" ");
      var sizeX = sizing[0];
      var sizeY = sizing[1];

      svg_to_png.convert(path.join( files), path.join( files + sizeX + "px"), {defaultWidth: sizeX, defaultHeight: sizeY})
      .then( function(){
        done();
      })
    });
  });
}