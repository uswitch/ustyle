"use strict";

module.exports = function underscored(str) {
  return str != undefined ? 
    str.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase() : undefined;
};