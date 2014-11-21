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
          'docs/': 'vendor/assets/stylesheets/ustyle/components/_button.sass'
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
            watchTask: true // < VERY important
        }
    }
  });
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadTasks('grunt/tasks');
  grunt.registerTask('default', ['browserSync', 'watch']);
};