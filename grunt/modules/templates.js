"use strict";

var handlebars = require('handlebars');

module.exports = {
  registerHelpers: function(){
    handlebars.registerHelper("partial", function (name, options) {
      // Get the partial with the given name. This is a string.
      var partial = handlebars.partials[name];

      // Return empty string if the partial is not defined
      if (!partial) return "";
      // Compile and call the partial with this as context
      return new handlebars.SafeString(handlebars.compile(partial)(this));
    });

    handlebars.registerHelper('assetUrl', function(development, production){
      if(process.env.NODE_ENV == 'development'){
        return new handlebars.SafeString(development);
      } else {
        return new handlebars.SafeString(production);
      }
    });

    handlebars.registerHelper('isActive', function(name, context) {
      var active = '';
      if(name === context.data.root.page.name) {
        active = 'active'
      }
      return new handlebars.SafeString(active);
    });
  }
};
