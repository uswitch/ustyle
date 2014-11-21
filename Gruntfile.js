var handlebars = require('handlebars');
var dss        = require('dss');
var _          = require('lodash');

module.exports = function(grunt) {
  grunt.initConfig({
    dss: {
      docs: {
        files: {
          'docs/': 'vendor/assets/stylesheets/ustyle/**/*.sass'
        }
      }
    }
  });
  grunt.loadTasks('grunt/tasks');
  grunt.registerTask('default', ['dss']);
};