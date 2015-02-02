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
        files: ['vendor/assets/stylesheets/ustyle/**/*.scss', 'styleguide/**/*', 'styleguide/build/ustyle.json'],
        tasks: ['styleguide', 'sass', 'sassdoc', 'postcss', 'browserSync-inject', 'cssstats', 'builder']
      },
      scripts: {
        files: 'styleguide/**/*.js',
        tasks: ['concat']
      }
    },
    svg2png: {
      dist: {
        src: 'vendor/assets/images/icons/',
        sizes: ["20 180", "32 288", "64 576"]
      }
    },
    svgmin: {
        dist: {
            files: [{
                expand: true,     // Enable dynamic expansion.
                cwd: 'vendor/assets/images/icons/',      // Src matches are relative to this path.
                src: ['**/*.svg'], // Actual pattern(s) to match.
                dest: 'vendor/assets/images/icons/',   // Destination path prefix.
                ext:  '.svg',   // Dest filepaths will have this extension.
                extDot: 'first'   // Extensions in filenames begin after the first dot
            }]
        }
    },
    styleguide: {
      dist: {
        src: 'vendor/assets/stylesheets/ustyle/**/*.scss',
        output: 'build/ustyle.json',
        static: 'styleguide/static/*.tpl'
      }
    },
    cssstats: {
      dist: {
        src: 'build/ustyle-latest.css',
        output: 'build/stats.json'
      }
    },
    builder: {
      dist:{
        files: {
          'build/docs/': 'build/ustyle.json',
          'build/': 'build/stats.json'
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
          'build/ustyle-icons.css': 'vendor/assets/stylesheets/ustyle-icons.scss',
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
    },
    env : {
      dev : {
        NODE_ENV : 'development'
      },
      build : {
        NODE_ENV : 'production'
      }
    }
  });

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-sassdoc');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadTasks('grunt/tasks');

  grunt.registerTask('build', ['sass', 'sassdoc', 'styleguide', 'concat', 'postcss','cssstats', 'builder']);
  grunt.registerTask('default', ['env:dev','build', 'browserSync-init', 'watch']);
  grunt.registerTask('publish', ['env:build','svgmin', 'svg2png', 'build', 'shell:publish']);

};
