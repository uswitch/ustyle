'use strict';

var dss        = require('dss');
var es         = require('event-stream');
var gutil      = require('gulp-util');
var path       = require('path');
var handlebars = require('handlebars');
var markdown   = require('marked');
var crypto     = require('crypto');
var _          = require('lodash');
var config     = require('../config').styleguide;

module.exports = styleguide;

/**
 * Pipe for extracting DSS and adding to the file's properties
 *
 * @return {stream}
 */
function styleguide() {

    var styleguide = [],
        template, firstBlock;

    for(key in config.parsers){
        dss.parser(key, options[parsers[key]]);
    }

    dss.parser('template', function(i, line, block) { return line; });
    dss.parser('partial', partialDssParser);
    dss.parser('variable', variableDssParser());

    return es.map(function(file, cb) {

        if (file.isNull()) {
            return;
        }
        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-styleguide',  'Streaming not supported'));
            return;
        }
        file.meta = {};

        var styleguide = [];

        var basename = path.basename(file.relative, path.extname(file.path));

        dss.parse(file.contents.toString('utf8'), {}, function(dss) {

          // Continue only if file contains DSS annotation
          if (dss.blocks.length) {
            // Add filename
            dss['file'] = file;
            // Add comment block to styleguide
            dss.blocks.map(function(block){
              block['file'] = file;
              // Normalize @state and @variable to array
              ['state', 'variable'].forEach(function(prop) {
                if (block.hasOwnProperty(prop) && typeof block[prop].slice !== 'function') {
                  block[prop] = [block[prop]];
                }
              });

              block.markup.escaped = removeModifiersFromMarkup(block.markup.escaped);

              if(block.hasOwnProperty('state')){
                block.state.map(function(state){
                  state.markup = {
                    example: addStateToExample(block.markup.example, state.escaped)
                  }
                })
              }
            });
            styleguide.push(dss.blocks);
          }
        });
       var sections = _.chain(styleguide)
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

        grunt.log.writeln(JSON.stringify(sections))
        sections.map(function(section){
          // Return promise
          var templateFilePath = options.template + options.templateIndex,
              outputFilePath = options.templateOutput + section.name.toLowerCase() + '.html';

          var partials = handlebars.registerPartial(options.defaultPartials);

          var html = handlebars.compile(grunt.file.read(templateFilePath))({
            project: grunt.file.readJSON('package.json'),
            section: section
          });

          var outputType = 'created', output = null;

          if (grunt.file.exists(outputFilePath)) {
            outputType = 'overwrited';
            output = grunt.file.read(outputFilePath);
          }
          // avoid write if there is no change
          if (output !== html) {
            // Render file
            grunt.file.write(outputFilePath, html);
            grunt.log.writeln('✓ Styleguide ' + outputType + ' at: ' + grunt.log.wordlist([output_dir], {color: 'cyan'}));
          } else {
            grunt.log.writeln('‣ Styleguide unchanged');
          }
          promise();
        });
      cb(null, file);
    });
}

/**
 * Get parser for a file which will extract "@variable {name} - {description}"
 *
 * @param {object} file - The file to extract the variable values from
 * @return {function} A DSS parser
 */
function variableDssParser() {

    var fileVariables = {},
        fileVariablesRx = /^[\$|@]([a-zA-Z0-9_]+):([^\;]+)\;/gim,
        lineSplitRx = /((\s|-)+)/,
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
    var partialTag = '{{>' + line + '}}';
    return function() {
        return function() {
            return partialTag;
        };
    };
}

function addStateToExample(markup, state){
    return markup.replace(/{\$modifiers}/g, state);
}

function removeModifiersFromMarkup(escaped){
    return escaped.replace(/(\sclass='{\$modifiers}'|\s{\$modifiers})/g, "");
}