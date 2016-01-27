var autoprefixer = require("autoprefixer-core");

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);
  grunt.loadTasks("grunt/tasks");

  grunt.initConfig({
    shell: {
      publish: {
        command: "bundle exec rake ustyle:publish"
      }
    },
    version: {
      project: {
        src: ["package.json", "lib/ustyle/version.rb"]
      }
    },
    postcss: {
      options: {
        processors: [
          autoprefixer({ browsers: ["last 5 versions", "Firefox 22", "Explorer 8", "> 1%", "Opera 12.1"] }).postcss
        ]
      },
      dist: { src: ["docs/**/*.css", "dist/**/*.css"] }
    },
    watch: {
      options: {
        spawn: false
      },
      build: {
        files: ["vendor/assets/**/*", "styleguide/**/*", "dist/ustyle.json"],
        tasks: ["copy", "sass", "sassdoc", "postcss", "browserSync-inject", "styleguide", "builder"]
      },
      scripts: {
        files: ["styleguide/**/*.js", "vendor/**/*.js"],
        tasks: ["concat"]
      }
    },
    svg2png: {
      dist: {
        src: "vendor/assets/images/icons/",
        sizes: ["16 144", "32 288", "64 576"]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: "vendor/assets/images/icons/",
          src: "{,*/}*.svg",
          dest: "vendor/assets/images/icons/"
        }]
      }
    },
    styleguide: {
      dist: {
        src: "vendor/assets/stylesheets/ustyle/**/*.scss",
        dir: "styleguide",
        output: "dist/ustyle.json",
        statsFor: "https://assets0.uswitch.com/s3/uswitch-assets-eu/ustyle/{#tag}/ustyle-latest.css",
        tagPlaceholder: "{#tag}",
        tagStartVersion: "0.9.9"
      }
    },
    builder: {
      dist:{
        files: {
          "docs/": "dist/ustyle.json"
        }
      }
    },
    sass: {
      dist: {
        options: {
          loadPath: ["vendor/assets/stylesheets/ustyle", "styleguide/assets/sass"],
          require: "./lib/ustyle.rb",
          style: "compressed",
          sourcemap: "none",
          bundleExec: true
        },
        files: {
          "dist/ustyle-latest.css": "vendor/assets/stylesheets/ustyle.scss",
          "dist/ustyle-content.css": "vendor/assets/stylesheets/ustyle-content.scss",
          "dist/ustyle-icons.css": "vendor/assets/stylesheets/ustyle-icons.scss",
          "docs/css/main.css": "styleguide/assets/sass/main.scss"
        }
      }
    },
    concat: {
      ustyle: {
        src: [
        "vendor/assets/javascripts/ustyle/utils.js",
        "vendor/assets/javascripts/ustyle/anchor.js",
        "vendor/assets/javascripts/ustyle/backdrop.js",
        "vendor/assets/javascripts/ustyle/overlay.js",
        "vendor/assets/javascripts/ustyle/tabs.js",
        "vendor/assets/javascripts/ustyle/classtoggler.js",
        "vendor/assets/javascripts/ustyle/radioToggle.js"
        ],
        dest: "dist/ustyle.js"
      },
      app: {
        src: ["styleguide/assets/javascripts/vendor/*.js", "dist/ustyle.js", "styleguide/assets/javascripts/modules/*.js", "styleguide/assets/javascripts/*.js"],
        dest: "docs/js/app.js"
      }
    },
    uglify: {
      ustyle: {
        files: {
          "dist/ustyle.min.js": ["dist/ustyle.js"]
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ["dist/*.css"], dest: "docs/css/"},
          {expand: true, flatten: true, src: ["styleguide/assets/images/**"], dest: "docs/images/"},
          {expand: true, flatten: true, src: ["styleguide/CNAME"], dest: "docs/"},
        ]
      }
    },
    sassdoc: {
      default: {
        src: "vendor/assets/stylesheets/ustyle/**/*.scss",
        options: {
          dest: "./docs/sass"
        }
      }
    },
    scsslint: {
      allFiles: [
        "./vendor/assets/stylesheets/**/*.scss",
        "./styleguide/assets/sass/**/*.scss"
      ],
      options: {
        bundleExec: true,
        config: "config/scss-lint.yml",
        reporterOutput: null,
        exclude: [
          "./vendor/assets/stylesheets/ustyle/vendor/*",
          "./styleguide/assets/sass/vendor/*"
        ]
      }
    },
    jscs: {
      src: [
        "Gruntfile.js",
        "vendor/assets/javascripts/**/*.js"
      ],
      options: {
        config: "config/.jscsrc"
      }
    },
    env: {
      dev: {
        NODE_ENV: "development"
      },
      build: {
        NODE_ENV: "production"
      }
    },
    buildcontrol: {
      options: {
        dir: "docs/",
        commit: true,
        push: true,
        message: "Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%"
      },
      pages: {
        options: {
          remote: "git@github.com:uswitch/ustyle.git",
          branch: "gh-pages"
        }
      }
    }
  });

  grunt.registerTask("lint", ["scsslint", "jscs"]);
  grunt.registerTask("icons", ["newer:svgmin", "svg2png"]);

  grunt.registerTask("build", ["sass", "sassdoc", "copy", "concat:ustyle", "uglify:ustyle", "concat:app", "lint", "postcss", "styleguide", "builder"]);

  grunt.registerTask("publish", ["env:build", "build", "buildcontrol:pages"]);

  grunt.registerTask("publish:version", "Build and publish ustyle version", function(version) {
    if (version === null) {
      grunt.warn("Version must be specified when publishing ustyle");
    }

    grunt.task.run("env:build", "version::" + version, "build", "shell:publish", "buildcontrol:pages");
  });

  grunt.registerTask("default", ["env:dev", "build", "browserSync-init", "watch"]);
};
