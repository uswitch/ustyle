"use strict";

var cheerio = require('cheerio');

module.exports = {
  extractSubNav: function(content){
    var $ = cheerio.load(content),
            contents = [];

    function buildHashOfContents(i, el) {
      contents.push({name: $(el).text(), link: $(el).attr('href')});
    }

    $('ul.table-of-contents a').map(buildHashOfContents);
    return contents;
  },

  removeSubNav: function(content){
    var $ = cheerio.load(content);

    $('ul.table-of-contents').remove();
    return $.html();
  }
}
