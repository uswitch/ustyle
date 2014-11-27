var handlebars = require('handlebars');
var dss        = require('dss');
var _          = require('lodash');

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ["vendor/assets/stylesheets/ustyle/**/*.sass", "styleguide/**/*"],
      tasks: ['dss',  'sass']
    },
    dss: {
      docs: {
        files: {
          'docs/': 'vendor/assets/stylesheets/ustyle/**/*.sass'
        }
      }
    },
    sass: {
      dist: {
        options: {
          loadPath: 'vendor/assets/stylesheets/ustyle',
          require: './lib/ustyle.rb'
        },
        files: {
          'build/ustyle-latest.css': 'vendor/assets/stylesheets/ustyle.sass',
          'build/ustyle-content.css': 'vendor/assets/stylesheets/ustyle-content.sass'
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
            },
            watchTask: true
        }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadTasks('grunt/tasks');
  grunt.registerTask('default', ['browserSync', 'watch']);
};