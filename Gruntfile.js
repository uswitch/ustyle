var autoprefixer = require('autoprefixer-core');

module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      publish : {
        command: 'bundle exec rake ustyle:publish'
      }
    },
    postcss: {
        options: {
            processors: [
              autoprefixer({ browsers: ['last 5 versions', 'Firefox 22', 'Explorer 8', '> 1%', 'Opera 12.1'] }).postcss
            ]
        },
        dist: { src: 'build/**/*.css' }
    },
    watch: {
      options: {
        spawn: false // Very important, don't miss this
      },
      build: {
        files: ['vendor/assets/stylesheets/ustyle/**/*.scss', 'styleguide/**/*', 'styleguide/output/ustyle.json'],
        tasks: ['styleguide', 'sass', 'sassdoc', 'postcss', 'browserSync-inject', 'cssstats', 'stylegenerator']
      },
      scripts: {
        files: 'styleguide/**/*.js',
        tasks: ['concat']
      }
    },
    styleguide: {
      dist: {
        src: 'vendor/assets/stylesheets/ustyle/**/*.scss',
        output: 'styleguide/output/ustyle.json',
        static: 'styleguide/static/*.tpl'
      }
    },
    cssstats: {
      dist: {
        src: 'build/ustyle-latest.css',
        output: 'styleguide/output/stats.json'
      }
    },
    stylegenerator: {
      dist:{
        files: {
          'build/docs/': 'styleguide/output/ustyle.json',
          'build/': 'styleguide/output/stats.json'
        }
      }
    },
    sass: {
      dist: {
        options: {
          loadPath: ['vendor/assets/stylesheets/ustyle', 'styleguide/assets/sass'],
          require: './lib/ustyle.rb',
          style: 'compressed'
        },
        files: {
          'build/ustyle-latest.css': 'vendor/assets/stylesheets/ustyle.scss',
          'build/ustyle-content.css': 'vendor/assets/stylesheets/ustyle-content.scss',
          'build/docs/css/main.css': 'styleguide/assets/sass/main.scss'
        }
      }
    },
    concat: {
      dist: {
        src: ['styleguide/assets/javascripts/vendor/*.js', 'styleguide/assets/javascripts/*.js'],
        dest: 'build/docs/js/app.js'
      }
    },
    sassdoc: {
      default: {
        src: 'vendor/assets/stylesheets/ustyle',
        dest: 'build/docs/sass',
        options: {
          config: "grunt/sassdoc/view.json"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sassdoc');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadTasks('grunt/tasks');

  grunt.registerTask('build', ['sass', 'sassdoc', 'styleguide', 'concat', 'postcss','cssstats', 'stylegenerator']);
  grunt.registerTask('default', ['build', 'browserSync-init', 'watch']);
  grunt.registerTask('publish', ['build', 'shell:publish']);

};
