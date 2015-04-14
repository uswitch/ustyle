"use strict";

var fs              = require('fs'),
    async           = require('async'),
    _               = require('lodash'),
    cssstats        = require('cssstats'),
    StyleStats      = require('stylestats'),
    handlebars      = require('handlebars'),
    fileHelper      = require('../modules/file'),
    done            = this.async(),
    cssFile         = this.data.src,
    outputFilePath  = this.data.output;

function CssStats(file){
    
}

module.exports = CssStats;
