var handlebars = require('handlebars');
var dss        = require('dss');
var _          = require('lodash');

module.exports = function(grunt) {
  grunt.initConfig({
    dss: {
      docs: {
        files: {
          'docs/': 'vendor/assets/stylesheets/ustyle/basics/_typography.{sass,css,scss}'
        },
        options: {
          parsers: {
            section: function(i, line, block){ return line; }
          }
        }
      }
    }
  });
  grunt.registerMultiTask('dss', 'Parse DSS comment blocks', function(){
    // Setup async promise
    var promise = this.async();

    // Merge task-specific and/or target-specific options with defaults
    var options = this.options({
      template: __dirname + '/template/',
      template_index: 'index.handlebars',
      output_index: 'index.html',
      include_empty_files: true
    });

    var addStateToExample = function(markup, state){
      return markup.replace("{$modifiers}", state);
    };
    // Output options if --verbose cl option is passed
    grunt.verbose.writeflags(options, 'Options');

    // Describe custom parsers
    for(key in options.parsers){
      dss.parser(key, options.parsers[key]);
    }

    var styleguide = [];

    // Build Documentation
    this.files.forEach(function(f){

      // Filter files based on their existence
      var src = f.src.filter(function(filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if(!grunt.file.exists(filepath)){
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      // Setup
      var files = src,
          template_dir = options.template,
          output_dir = f.dest,
          length = files.length;

      // Parse files
      files.map(function(filename){

        // Report file
        grunt.verbose.writeln('• ' + grunt.log.wordlist([filename], {color: 'cyan'}));

        // Parse
        dss.parse(grunt.file.read(filename), { file: filename }, function(parsed) {

          // Continue only if file contains DSS annotation
          if (options.include_empty_files || parsed.blocks.length) {
            // Add filename
            parsed['file'] = filename;
            // Add comment block to styleguide
            parsed.blocks.map(function(block){
              block['file'] = filename;
               // Normalize @state and @variable to array
                ['state', 'variable'].forEach(function(prop) {
                    if (block.hasOwnProperty(prop) && typeof block[prop].slice !== 'function') {
                        block[prop] = [block[prop]];
                    }
                });
              if(block.hasOwnProperty('state')){
                block.state.map(function(state){
                  state.markup = {
                    example: addStateToExample(block.markup.example, state.escaped)
                  }
                })
              }
            });

            styleguide.push(parsed.blocks);
          }

          // Check if we're done
          if (length > 1) {
            length--;
          }
          else {
            // Set output template and file
            var template_filepath = template_dir + options.template_index,
                output_filepath = output_dir + options.output_index;

            // if (!grunt.file.exists(template_filepath)) {
            //   grunt.fail.fatal('Cannot read the template file');
            // }

            // // copy template assets (except index.handlebars)
            // grunt.file.expandMapping([
            //   '**/*',
            //   '!' + options.template_index
            // ], output_dir, { cwd: template_dir }).forEach(function(filePair) {
            //   filePair.src.forEach(function(src) {
            //     if (grunt.file.isDir(src)) {
            //       grunt.verbose.writeln('Creating ' + filePair.dest.cyan);
            //       grunt.file.mkdir(filePair.dest);
            //     } else {
            //       grunt.verbose.writeln('Copying ' + src.cyan + ' -> ' + filePair.dest.cyan);
            //       grunt.file.copy(src, filePair.dest);
            //     }
            //   });
            // });

            // // Create HTML ouput
            // var html = handlebars.compile(grunt.file.read(template_filepath))({
            //   project: grunt.file.readJSON('package.json'),
            //   files: styleguide
            // });

            // var output_type = 'created', output = null;
            // if (grunt.file.exists(output_filepath)) {
            //   output_type = 'overwrited';
            //   output = grunt.file.read(output_filepath);
            // }
            // // avoid write if there is no change
            // if (output !== html) {
            //   // Render file
            //   grunt.file.write(output_filepath, html);

            //   // Report build
            //   grunt.log.writeln('✓ Styleguide ' + output_type + ' at: ' + grunt.log.wordlist([output_dir], {color: 'cyan'}));
            // }
            // else {
            //   // no change
            //   grunt.log.writeln('‣ Styleguide unchanged');
            // }

          }
        });

      });

    });

    
    var sections =      _.chain(styleguide)
                        .flatten()
                        .groupBy('section')
                        .map(function(value, key) {
                            return {
                                name: key,
                                blocks: value
                            }
                        })
                        .compact()
                        .value();

    sections.map(function(section){
      grunt.log.writeln(JSON.stringify(section))
      // Return promise
      var template_filepath = options.template + options.template_index,
          output_filepath = 'docs/' + section.name.toLowerCase() + '.html';

      var html = handlebars.compile(grunt.file.read(template_filepath))({
        project: grunt.file.readJSON('package.json'),
        section: section
      });

      var output_type = 'created', output = null;

      if (grunt.file.exists(output_filepath)) {
        output_type = 'overwrited';
        output = grunt.file.read(output_filepath);
      }
      // avoid write if there is no change
      if (output !== html) {
        // Render file
        grunt.file.write(output_filepath, html);
      }
      promise();
    });

  });
  grunt.registerTask('default', ['dss']);
};