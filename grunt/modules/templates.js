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

    handlebars.registerHelper('isActive', function(name, context) {
      var active = '';
      if(name === context.data.root.section.name) {
        active = 'active'
      }
      return new handlebars.SafeString(active);
    });
  }
};
