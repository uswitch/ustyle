var handlebars = require('handlebars');
var dss        = require('dss');
var _          = require('lodash');

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: "vendor/assets/stylesheets/ustyle/**/*.sass",
      tasks: ['dss']
    },
    dss: {
      docs: {
        files: {
          'docs/': 'vendor/assets/stylesheets/ustyle/**/*.sass'
        }
      }
    },
    browserSync: {
        bsFiles: {
            src : 'assets/css/*.css'
        },
        options: {
            server: {
                baseDir: "./build/"
            }
        }
    }
  });
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadTasks('grunt/tasks');
  grunt.registerTask('default', ['dss']);
};