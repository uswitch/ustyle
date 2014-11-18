module.exports = {
  styleguide: {
    src: 'vendor/assets/stylesheets/ustyle/components/_button.{sass,css,scss}',
    dest: 'docs/'
    parsers: {
      section: function(i, line, block){ return line; }
    }
  }
}