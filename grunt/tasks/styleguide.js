"use strict";

// Expose
module.exports = function(grunt){
  grunt.registerMultiTask('styleguide', 'Parse DSS comment blocks', function(){

    var handlebars = require('handlebars'),
        dss        = require('dss'),
        _          = require('lodash'),
        async      = require('async'),
        marked     = require('marked'),
        path       = require('path'),
        crypto     = require('crypto'),
        promise    = this.async(),
        files      = this.files,
        styleguide = [];

    // Merge task-specific and/or target-specific options with defaults
    var options = this.options({
        template: './styleguide/',
        templateOutput: './build/docs/',
        templateIndex: 'template.hbs',
        defaultPartials: {
          style_block: grunt.file.read('./styleguide/partials/style_block.hbs'),
          sidebar: grunt.file.read('./styleguide/partials/sidebar.hbs')
        },
        parsers: {
          variable: variableDssParser(),
          partial: function(i, line, block){
            var partialTag = '{{>' + line + '}}',
                partial = {};
        
            partial[line] = grunt.file.read('./styleguide/partials/'+ line +'.hbs');
            handlebars.registerPartial(partial);
            return line;
          },
          section: function(i, line, block){ return line; },
          description: function(i, line, block, file){
            var nextParserIndex = block.indexOf("@", i+1),
                markupLength = nextParserIndex > -1 ? nextParserIndex - i : block.length,
                markup = block.split('').splice(i, markupLength).join('').replace(/@description/, '');

            return marked(markup);
          }
        }
    });

    function addParsers(parsers){
      for(var key in parsers){
        dss.parser(key, options.parsers[key]);
      }
    }

    addParsers(options.parsers);

    async.waterfall([
      parseDSS,
      groupDSS,
      generateStyleguide
    ], completeTask);

    function completeTask(){
      promise();
    }

    function parseDSS(callback){
      var styleguide = [];
      var srcFiles = files[0].src;

      async.forEach(srcFiles, function(file){

        grunt.log.writeln('• ' + grunt.log.wordlist([file], {color: 'cyan'}));

        dss.parse(grunt.file.read(file), { file: file }, function(parsed) {

          // Continue only if file contains DSS annotation
          if (parsed.blocks.length) {
            // Add comment block to styleguide
            parsed.blocks.map(function(block){
              block['path'] = file;
              block['file'] = path.basename(file);
              // Normalize @state and @variable to array
              ['state', 'variable'].forEach(function(prop) {
                if (block.hasOwnProperty(prop) && typeof block[prop].slice !== 'function') {
                  block[prop] = [block[prop]];
                }
              });

              if(block.markup){
                block.markup.escaped = removeModifiersFromMarkup(block.markup.escaped);  
              }

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
        });
      });
      callback(null, styleguide);
    }

    function groupDSS(styleguide, callback){
      var sections = _.chain(styleguide).flatten().groupBy('section')
                    .map(function(value, key) {
                      return {
                          name: key,
                          page: key.toLowerCase() + '.html',
                          blocks: value
                      }
                    })
                    // As it's iterating over files, we don't want files that aren't documented to come through
                    .filter(function(object) {
                      return object.name != "undefined"
                    })
                    .compact()
                    .value();

      callback(null, sections);
    }

    function generateStyleguide(sections, callback){
      grunt.log.writeln(JSON.stringify(sections))
      sections.map(function(section){

        var templateFilePath = options.template + options.templateIndex,
            outputFilePath = options.templateOutput + section.page,
            partials = handlebars.registerPartial(options.defaultPartials);

        var html = handlebars.compile(grunt.file.read(templateFilePath))({
          project: grunt.file.readJSON('package.json'),
          section: section,
          sections: sections
        });

        var outputType = 'created', output = null;

        if (grunt.file.exists(outputFilePath)) {
          outputType = 'overwritten';
          output = grunt.file.read(outputFilePath);
        }
        // avoid write if there is no change
        if (output !== html) {
          // Render file
          grunt.file.write(outputFilePath, html);
          grunt.log.writeln('✓ Styleguide ' + outputType + ' at: ' + grunt.log.wordlist([outputFilePath], {color: 'cyan'}));
        } else {
          grunt.log.writeln('‣ Styleguide unchanged');
        }
      });
      callback(null, 'done');
    }

    function addStateToExample(markup, state){
      return markup.replace(/{\$modifiers}/g, state);
    }

    function removeModifiersFromMarkup(escaped){
      return escaped.replace(/(\sclass=('|"){\$modifiers}('|")|\s{\$modifiers})/g, "");
    }

    /**
     * Get parser for a file which will extract "@variable {name} - {description}"
     *
     * @param {object} file - The file to extract the variable values from
     * @return {function} A DSS parser
     */
    function variableDssParser() {

        var fileVariables = {},
            fileVariablesRx = /^[\$|@]([a-zA-Z0-9_-]+):([^\;]+)\;/gim,
            lineSplitRx = /(( - )+)/,
            variables = {},
            match, hash, tokens, name;

        return function(i, line, block, css) {
            hash = crypto.createHash('md5').update(css).digest('hex');
            if (!fileVariables[hash]) {
                while ((match = fileVariablesRx.exec(css)) !== null) {
                    variables[match[1].trim()] = match[2].trim();
                }
                fileVariables[hash] = variables;
            }

            // Extract name and any delimiter with description
            tokens = line.split(lineSplitRx, 2);
            name = tokens[0].trim();
            if (variables.hasOwnProperty(name)) {
                return {
                    name: name,
                    // Description is line with name and any delimiter replaced
                    description: line.replace(tokens.join(''), ''),
                    value: variables[name]
                };
            }
        };
    }
    /**
     * Parser to extract "@partial" and add a lambda to the block so you can use that
     * partial in the template for the block with {{#partial}}{{/partial}} (because
     * there is no such thing as variable partial names in Mustache)
     *
     * @param {number} i - Block number
     * @param {string} line - Text after "@partial"
     * @param {string} block - Entire DSS block
     */
    function partialDssParser(i, line, block) {

    }
  });
};