var _ = require('underscore');
var fs = require('fs');
var glob = require('glob');
var dss = require('dss');
var hogan = require('hogan-updated');
var handlebars = require('handlebars');
var markdown = require('marked');
var template = fs.readFileSync('templates/index.html', 'utf8');
template = handlebars.compile(template);

dss.parser('section', function(i, line) { return line; });
var options = {};
var blocks = [];

glob('./vendor/assets/stylesheets/ustyle/**/*.{sass,css}', function(err, files){
  files.forEach(function(file){
    fs.readFile(file, function(err, data){
      dss.parse(data.toString('utf8'), options, function(parsed){    
        blocks.push(parsed);
      });
    });
  });
});


var kss = require('kss'),
    options = {
        markdown: false,

    };

// Compile the Handlebars template
template = fs.readFileSync(argv.template + '/index.html', 'utf8');
template = handlebars.compile(template);

kss.traverse('./vendor/assets/stylesheets/ustyle/', options, function(err, styleguide) {
    if (err) throw err;
    
});
