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
        spawn: false
      },
      build: {
        files: ['vendor/assets/**/*', 'styleguide/**/*', 'styleguide/build/ustyle.json'],
        tasks: ['styleguide', 'copy', 'sass', 'coffee', 'sassdoc', 'postcss', 'browserSync-inject', 'cssstats', 'builder']
      },
      scripts: {
        files: ['styleguide/**/*.js', 'vendor/**/*.coffee'],
        tasks: ['concat']
      }
    },
    svg2png: {
      dist: {
        src: 'vendor/assets/images/icons/',
        sizes: ["16 144", "32 288", "64 576"]
      }
    },
    svgmin: {
        dist: {
            files: [{
                expand: true,
                cwd: 'vendor/assets/images/icons/',
                src: "{,*/}*.svg",
                dest: 'vendor/assets/images/icons/'
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
          'build/docs/stats/': 'build/stats.json'
        }
      }
    },
    sass: {
      dist: {
        options: {
          loadPath: ['vendor/assets/stylesheets/ustyle', 'styleguide/assets/sass'],
          require: './lib/ustyle.rb',
          style: 'compressed',
          sourcemap: 'none',
          bundleExec: true
        },
        files: {
          'build/ustyle-latest.css': 'vendor/assets/stylesheets/ustyle.scss',
          'build/ustyle-content.css': 'vendor/assets/stylesheets/ustyle-content.scss',
          'build/ustyle-icons.css': 'vendor/assets/stylesheets/ustyle-icons.scss',
          'build/docs/css/main.css': 'styleguide/assets/sass/main.scss'
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'build/ustyle.js': [
            'vendor/assets/javascripts/ustyle/utils.js.coffee',
            'vendor/assets/javascripts/ustyle/anchor.js.coffee',
            'vendor/assets/javascripts/ustyle/tabs.js.coffee',
            'vendor/assets/javascripts/ustyle/overlay.js.coffee',
          ]
        }
      },
    },
    concat: {
      dist: {
        src: ['styleguide/assets/javascripts/vendor/*.js', 'build/ustyle.js', 'styleguide/assets/javascripts/*.js'],
        dest: 'build/docs/js/app.js'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['styleguide/assets/images/**'], dest: 'build/docs/images/'},
        ]
      }
    },
    sassdoc: {
      default: {
        src: 'vendor/assets/stylesheets/ustyle/**/*.scss',
        options: {
          dest: './build/docs/sass'
        }
      }
    },
    scsslint: {
      allFiles: [
        './vendor/assets/stylesheets/**/*.scss',
      ],
      options: {
        bundleExec: true,
        config: 'config/scss-lint.yml',
        reporterOutput: null,
        exclude: [
          './vendor/assets/stylesheets/ustyle/vendor/*'
        ]
      }
    },
    env : {
      dev : {
        NODE_ENV : 'development'
      },
      build : {
        NODE_ENV : 'production'
      }
    },
    buildcontrol: {
      options: {
        dir: 'build/docs',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:uswitch/ustyle.git',
          branch: 'gh-pages'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-sassdoc');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadTasks('grunt/tasks');


  grunt.registerTask('build', ['sass', 'sassdoc', 'styleguide', 'copy', 'coffee', 'concat', 'lint', 'postcss', 'cssstats', 'builder']);

  grunt.registerTask('lint', ['scsslint']);

  grunt.registerTask('icons', ['newer:svgmin', 'svg2png']);

  grunt.registerTask('publish', ['env:build', 'build', 'buildcontrol:pages']);
  grunt.registerTask('publish:version', ['publish', 'shell:publish']);

  grunt.registerTask('default', ['env:dev', 'build', 'browserSync-init', 'watch']);
};
