'use strict';

var es = require('event-stream');
var gutil = require('gulp-util');
var path = require('path');
var hogan = require('hogan-updated');

module.exports = templates;

/**
 * Pipe for compiling templates, no files output
 *
 * @param {object} templateStore - reference to store templates
 * @return {stream}
 */
function templates(templateStore) {

    return es.map(function(file, cb) {

        if (file.isNull()) {
            return;
        }
        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-styleguide',  'Streaming not supported'));
            return;
        }
        var templateName = path.join(
            path.dirname(file.relative),
            path.basename(file.relative, path.extname(file.relative))
        );
        templateStore[templateName] = hogan.compile(file.contents.toString('utf8'));

        cb(null, file);
    });
}

