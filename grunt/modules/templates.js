"use strict";

var handlebars = require('handlebars'),
    humanize   = require('underscore.string/humanize');

function humanFileSize(size) {
    if(size < 1024) return size;
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return new handlebars.SafeString( ( size / Math.pow(1024, i) ).toFixed(2) * 1 + '<span> ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]+'</span>');
};

module.exports = {
  registerHelpers: function(){
    handlebars.registerHelper("humanize", function(name, options) {
      return new handlebars.SafeString(humanize(name));
    });

    handlebars.registerHelper("partial", function (name, options) {
      // Get the partial with the given name. This is a string.
      var partial = handlebars.partials[name];

      // Return empty string if the partial is not defined
      if (!partial) return "";
      // Compile and call the partial with this as context
      return new handlebars.SafeString(handlebars.compile(partial)(this));
    });

    handlebars.registerHelper('isActive', function(name, context) {
      var active = '';
      if(name === context.data.root.page.name) {
        active = 'active'
      }
      return new handlebars.SafeString(active);
    });

    handlebars.registerHelper('assetUrl', function(development, production){
      if(process.env.NODE_ENV == 'development'){
         return new handlebars.SafeString(development);
       } else {
         return new handlebars.SafeString(production);
       }
    });

    handlebars.registerHelper('isSection', function(name, context) {
      if(name === context.data.root.page.section){
        return context.fn(this);  
      }
      return context.inverse(this);
    });

    handlebars.registerHelper('isString', function(obj, context) {
      if (typeof obj === 'string') {
          return context.fn(this);
      } else {
          return context.inverse(this);
      }
    });

    handlebars.registerHelper('isNumber', function(obj, type, context) {
      var sizeString = 'size';
      if (typeof obj === 'number') {
          var isDecimal = this % 1 != 0;
          return context.fn(isDecimal ? this.toPrecision(2) : type == sizeString ? humanFileSize(this) : this);
      } else {
          return context.inverse(this);
      }
    });

    handlebars.registerHelper('isArray', function(obj, context) {
      if (obj instanceof Array) {
          return context.fn(this);
      } else {
          return context.inverse(this);
      }
    });

    handlebars.registerHelper('classSanitizer', function(klass){
      return new handlebars.SafeString(klass.split('.')[1]);
    });

  }
};
