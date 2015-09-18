var addClass, deleteUndefined, hasClass, merge, removeClass, requestAnimationFrame, setOptions, transformKey,
  slice = [].slice,
  hasProp = {}.hasOwnProperty;

if (this.Utils == null) {
  this.Utils = {
    modules: []
  };
}

addClass = function(element, name) {
  removeClass(element, name);
  return element.className += " " + name + " ";
};

removeClass = function(element, name) {
  var regExp;
  regExp = new RegExp("(\\s|^)" + name + "(\\s|$)", "gi");
  return element.className = element.className.replace(regExp, "");
};

hasClass = function(element, name) {
  return new RegExp("(^| )" + name + "( |$)", 'gi').test(element.className);
};

merge = function() {
  var extension, extensions, i, len, property, target;
  target = arguments[0], extensions = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  for (i = 0, len = extensions.length; i < len; i++) {
    extension = extensions[i];
    for (property in extension) {
      if (!hasProp.call(extension, property)) continue;
      target[property] = extension[property];
    }
  }
  return target;
};

setOptions = function(options, defaults) {
  return merge({}, defaults, options);
};

deleteUndefined = function(obj) {
  var key, results, value;
  results = [];
  for (key in obj) {
    value = obj[key];
    if (value === null || value === void 0) {
      results.push(delete obj[key]);
    } else {
      results.push(void 0);
    }
  }
  return results;
};

transformKey = (function() {
  var el, i, key, len, transforms;
  el = document.createElement('div');
  transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (i = 0, len = transforms.length; i < len; i++) {
    key = transforms[i];
    if (el.style[key] !== void 0) {
      return key;
    }
  }
})();

requestAnimationFrame = (function(window) {
  var i, len, ref, vendor;
  ref = ['ms', 'moz', 'webkit', 'o'];
  for (i = 0, len = ref.length; i < len; i++) {
    vendor = ref[i];
    if (window.requestAnimationFrame) {
      break;
    }
    window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
  }
  return window.requestAnimationFrame || (window.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 1000 / 60);
  });
})(window);

this.Utils = {
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  merge: merge,
  setOptions: setOptions,
  deleteUndefined: deleteUndefined,
  transformKey: transformKey,
  requestAnimationFrame: requestAnimationFrame
};