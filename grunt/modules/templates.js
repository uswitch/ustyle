const handlebars = require('handlebars')
const humanize = require('underscore.string/humanize')

function humanFileSize (size) {
  if (size < 1024) return size
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return new handlebars.SafeString((size / Math.pow(1024, i)).toFixed(2) * 1 + '<span> ' + ['B', 'kB', 'MB', 'GB', 'TB'][i] + '</span>')
};

module.exports = {
  registerHelpers: function () {
    handlebars.registerHelper('humanize', function (name, options) {
      return new handlebars.SafeString(humanize(name))
    })

    handlebars.registerHelper('json', function (context) {
      return JSON.stringify(context)
    })

    handlebars.registerHelper('partial', function (name, options) {
      // Get the partial with the given name. This is a string.
      var partial = handlebars.partials[name]

      // Return empty string if the partial is not defined
      if (!partial) return ''
      // Compile and call the partial with this as context
      return new handlebars.SafeString(handlebars.compile(partial)(this))
    })

    handlebars.registerHelper('activeClass', function (name, attribute, context) {
      var active = ''
      if (name === context.data.root.page[attribute]) {
        active = 'active'
      }
      return new handlebars.SafeString(active)
    })

    handlebars.registerHelper('isActive', function (name, attribute, context) {
      if (name === attribute) {
        return context.fn(this)
      }
      return context.inverse(this)
    })

    handlebars.registerHelper('humanFileSize', function (size, context) {
      return new handlebars.SafeString(humanFileSize(size))
    })

    handlebars.registerHelper('number', function (number, context) {
      return new handlebars.SafeString(number.toPrecision(2))
    })

    handlebars.registerHelper('classSanitizer', function (klass) {
      return new handlebars.SafeString(klass.split('.')[1])
    })
  }
}
