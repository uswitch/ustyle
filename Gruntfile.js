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
        files: ['vendor/assets/stylesheets/ustyle/**/*.scss', 'styleguide/**/*'],
        tasks: ['styleguide', 'sass', 'sassdoc', 'postcss', 'browserSync-inject']
      },
      scripts: {
        files: 'styleguide/**/*.js',
        tasks: ['concat']
      }
    },
    styleguide: {
      docs: {
        files: {
          'docs/': 'vendor/assets/stylesheets/ustyle/**/*.scss'
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
  
  grunt.registerTask('build', ['sass', 'sassdoc', 'styleguide', 'concat', 'postcss']);
  grunt.registerTask('default', ['build', 'browserSync-init', 'watch']);
  grunt.registerTask('publish', ['build', 'shell:publish']);
  
};