var requireDir = require('require-dir');

// Require ALL THE FILES
requireDir('./gulp/tasks', { recurse: true });