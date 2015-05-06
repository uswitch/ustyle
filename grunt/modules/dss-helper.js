"use strict";

var dss        = require("dss"),
    crypto     = require("crypto"),
    marked     = require('marked'),
    escaped    = require("underscore.string/escapeHTML");

module.exports = {

    /**
     * Register DSS parsers
     * 
     * @param {object} parsers - An object containing the declared parsers to register
     */
    
    addParsers: function(parsers){
      for(var key in parsers){
        dss.parser(key, parsers[key]);
      }
    },

    /**
     * Removing ${modifiers} text from markup
     *
     * @param {string} escaped markup - The file to extract the variable values from
     * @return {string} Escaped string without ${modifiers}
     */
    
    addStateToExample: function(markup, state){
      return markup.replace(/{\$modifiers}/g, state);
    },

    /**
     * Removing ${modifiers} text from markup
     *
     * @param {string} escaped markup - The file to extract the variable values from
     * @return {string} Escaped string without ${modifiers}
     */
    removeModifiersFromMarkup: function(escaped){
      return escaped.replace(/(\sclass=('|"){\$modifiers}('|")|\s{\$modifiers})/g, "");
    },

    /**
     * Get parser for a file which will extract "@variable {name} - {description}"
     *
     * @param {object} file - The file to extract the variable values from
     * @return {function} A DSS parser
     */
    variableDssParser: function() {

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
    },
    /**
     * Read over multiple description lines and return a markdown version
     *
     * @param {number} i - line number
     * @param {string} line - Line matching parser
     * @param {string} block - Entire block of text matching
     * @return {string} A markdown version of the description
     */
    descriptionDssParser: function(i, line, block){
      var nextParserIndex = block.indexOf("@", i+1),
          markupLength = nextParserIndex > -1 ? nextParserIndex - i : block.length,
          markup = block.split('')
                        .splice(i, markupLength)
                        .join('')
                        .replace(/\n/g, '\n\n')
                        .replace(/@description/, '');

          return marked(markup);
    },

    /**
     * Read over multiple lines and return a javascript code snippet
     *
     * @param {number} i - line number
     * @param {string} line - Line matching parser
     * @param {string} block - Entire block of text matching
     * @return {string} Javascript code snipper
     */
    javascriptParser: function(i, line, block){
      var nextParserIndex = block.indexOf("@", i+1),
          markupLength = nextParserIndex > -1 ? nextParserIndex - i : block.length,
          markup = block.split('')
                        .splice(i, markupLength)
                        .join('')
                        .replace(/@javascript/, '');

          return escaped(markup);
    }
};
