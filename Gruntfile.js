var autoprefixer = require('autoprefixer-core');

module.exports = function(grunt) {
  grunt.initConfig({
    postcss: {
        options: {
            processors: [
              autoprefixer({ browsers: ['last 5 versions', 'Firefox 22', 'Explorer 8', '> 1%', 'Opera 12.1'] }).postcss
            ]
        },
        dist: { src: 'build/**/*.css' }
    },
    watch: {
      files: ['vendor/assets/stylesheets/ustyle/**/*.scss', 'styleguide/**/*', 'build/**/*.css'],
      tasks: ['dss',  'sass', 'postcss']
    },
    dss: {
      docs: {
        files: {
          'docs/': 'vendor/assets/stylesheets/ustyle/**/*.scss'
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
          'build/ustyle-latest.css': 'vendor/assets/stylesheets/ustyle.scss',
          'build/ustyle-content.css': 'vendor/assets/stylesheets/ustyle-content.scss'
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
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadTasks('grunt/tasks');
  grunt.registerTask('default', ['browserSync', 'watch']);
};