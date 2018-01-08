var slice = [].slice;
var hasProp = {}.hasOwnProperty;

if (this.Utils == null) {
  this.Utils = {
    modules: []
  };
}

var addClass = function(element, name) {
  removeClass(element, name);
  return element.className += " " + name + " ";
};

var removeClass = function(element, name) {
  var regExp = new RegExp("(\\s|^)" + name + "(\\s|$)", "gi");
  return element.className = element.className.replace(regExp, "");
};

var hasClass = function(element, name) {
  return new RegExp("(^| )" + name + "( |$)", "gi").test(element.className);
};

var merge = function() {
  var extension;
  var i;
  var len;
  var property;
  var target = arguments[0];
  var extensions = 2 <= arguments.length ? slice.call(arguments, 1) : [];

  for (i = 0, len = extensions.length; i < len; i++) {
    extension = extensions[i];
    for (property in extension) {
      if (!hasProp.call(extension, property)) continue;
      target[property] = extension[property];
    }
  }

  return target;
};

var setOptions = function(options, defaults) {
  return merge({}, defaults, options);
};

var deleteUndefined = function(obj) {
  var key;
  var value;
  var results = [];
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

var transformKey = (function() {
  var i;
  var key;
  var len;
  var el = document.createElement("div");
  var transforms = ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"];
  for (i = 0, len = transforms.length; i < len; i++) {
    key = transforms[i];
    if (el.style[key] !== void 0) {
      return key;
    }
  }
})();

var requestAnimationFrame = (function(window) {
  var i;
  var len;
  var vendor;
  var ref =  ["ms", "moz", "webkit", "o"];

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

window.Backdrop = (function() {
  var holds = 0;
  var backdrop = null;
  var createBackdrop;

  function Backdrop() {
    backdrop = document.querySelector(".us-backdrop");
    if (backdrop == null) {
      backdrop = createBackdrop();
    }
  }

  Backdrop.prototype.element = backdrop;

  createBackdrop = function() {
    backdrop = document.createElement("div");
    Utils.addClass(backdrop, "us-backdrop");
    return document.body.appendChild(backdrop);
  };

  Backdrop.prototype.retain = function() {
    var onFrame;
    holds++;
    if (holds === 1) {
      Utils.addClass(backdrop, "us-backdrop--visible");
      onFrame = function() {
        if (holds >= 1) {
          return Utils.addClass(backdrop, "us-backdrop--active");
        }
      };

      return Utils.requestAnimationFrame.call(window, onFrame);
    }
  };

  Backdrop.prototype.release = function() {
    var onFrame;
    if (holds === 1) {
      Utils.removeClass(backdrop, "us-backdrop--active");
      onFrame = function() {
        return setTimeout(function() {
          if (holds === 0) {
            return Utils.removeClass(backdrop, "us-backdrop--visible");
          }
        }, 300);
      };

      Utils.requestAnimationFrame.call(window, onFrame);
    }

    return holds = Math.max(0, holds - 1);
  };

  return Backdrop;

})();

window.Overlay = (function(Utils) {
  var addClass = Utils.addClass;
  var hasClass = Utils.hasClass;
  var removeClass = Utils.removeClass;
  var setOptions = Utils.setOptions;
  var requestAnimationFrame = Utils.requestAnimationFrame;

  var defaults = {
    bodyActiveClass: "us-overlay--open",
    activeClass: "us-overlay-parent--active",
    visibleClass: "us-overlay-parent--visible",
    overlay: $(".us-overlay-parent"),
    openButton: ".js-open-overlay",
    closeButton: ".js-close-overlay",
    historyStatus: "#seedeal",
    history: false,
    preventDefault: true,
    animationSpeed: 300
  };

  function Overlay(options) {
    this.overlay = (this.options = setOptions(options, defaults)).overlay;
    if ((this.overlay != null) && (typeof Backdrop !== "undefined" && Backdrop !== null)) {
      this.backdrop = new Backdrop();
      this.addEventListeners();
    } else {
      throw new Error("There's no overlay or you haven't included Backdrop");
    }
  }

  Overlay.prototype.addEventListeners = function() {
    $(this.options.openButton).on("click.open-overlay", (function(_this) {
      return function(e) {
        if (_this.options.preventDefault) {
          e.preventDefault();
        }

        return _this.show(e);
      };
    })(this));

    this.overlay.on("click.close-overlay", (function(_this) {
      return function(e) {
        var results = [];
        var closeTargets = _this.overlay.find(_this.options.closeButton).toArray();
        var targets = [_this.overlay[0]].concat(closeTargets);

        for (var i = targets.length - 1; i >= 0; i--) {
          var target = targets[i];
          if (e.target === target) {
            if (_this.options.preventDefault) {
              e.preventDefault();
            }

            _this.hide(e);
            break;
          } else {
            results.push(void 0);
          }
        };

        return results;
      };
    })(this));

    if (this.hasHistory()) {
      return window.onpopstate = (function(_this) {
        return function(e) {
          if (_this.isOpen()) {
            return _this.hide(e);
          }
        };
      })(this);
    }
  };

  Overlay.prototype.show = function(e) {
    var onFrame;
    var _this = this;
    $(document.body).addClass(this.options.bodyActiveClass);
    this.backdrop.retain();
    addClass(this.overlay[0], this.options.visibleClass);
    onFrame = function() {
      addClass(_this.overlay[0], _this.options.activeClass);
      return setTimeout(function() {
        var base;
        return typeof (base = _this.options).onOpen === "function" ? base.onOpen(e) : void 0;
      }, _this.options.animationSpeed);
    };

    requestAnimationFrame.call(window, onFrame);
    if (this.hasHistory()) {
      return history.pushState("open", window.document.title, this.options.historyStatus);
    }
  };

  Overlay.prototype.hide = function(e) {
    var onFrame;
    var _this = this;
    $(document.body).removeClass(this.options.bodyActiveClass);
    this.backdrop.release();
    onFrame = function() {
      removeClass(_this.overlay[0], _this.options.activeClass);
      return setTimeout(function() {
        var base;
        removeClass(_this.overlay[0], _this.options.visibleClass);
        return typeof (base = _this.options).onClose === "function" ? base.onClose(e) : void 0;
      }, _this.options.animationSpeed);
    };

    requestAnimationFrame.call(window, onFrame);
    if (this.hasHistory() && history.state === "open") return history.back();
  };

  Overlay.prototype.isOpen = function() {
    return hasClass(this.overlay[0], this.options.activeClass);
  };

  Overlay.prototype.hasHistory = function() {
    return this.options.history && window.history && window.history.pushState;
  };

  return Overlay;

})(this.Utils);

var setOptions = this.Utils.setOptions;

window.Tabs = (function(options) {
  var Tabs;
  return Tabs = (function() {
    Tabs.prototype.defaults = {
      tabContainer: ".us-tabs",
      tabLinks: ".us-tabs-nav-mainlink",
      tabNav: ".us-tabs-nav",
      changeUrls: true,
      activeClass: "active",
      collapsible: false,
      autoScroll: true
    };

    function Tabs(options) {
      var ref = this.options = setOptions(options, this.defaults);
      var tabContainer = ref.tabContainer;
      var tabLinks = ref.tabLinks;

      this.activeTabEvent = new CustomEvent('ustyle.tab.active');
      this.tabs = document.querySelectorAll(tabContainer + ' ' + tabLinks);
      this.filter = this.tabs.item(0).getAttribute("data-target") ? "data-target" : "href";
      this.init();

      var handleClick = (function (_this) {
        return function (e) {
          var target = e.currentTarget;
          if (_this.isAccordion() && _this.options.collapsible && _this.isActive(target)) {
            _this.collapse(target);
            _this.hashClear();
          } else {
            _this.navigateTo(target);
            _this.scrollToTab(target);
            _this.hashChange(target);
          }

          return e.preventDefault();
        }
      })(this);

      forEach(this.tabs, function (index, tab) {
        tab.addEventListener('click', handleClick);
      });
    }

    Tabs.prototype.init = function() {
      var activeTab = this.activeTab();
      var initialHash = this.tabFromHash();

      if (initialHash) {
        return this.navigateTo(initialHash);
      } else if (activeTab) {
        return this.navigateTo(activeTab);
      } else if (!this.options.collapsible || !this.isAccordion()) {
        return this.navigateTo(this.tabs.item(0));
      }
    };

    Tabs.prototype.hashChange = function(target) {
      if (!this.options.changeUrls) return;

      return window.location.replace("#!" + (getSelector(target).replace(/#/, "")));
    };

    Tabs.prototype.hashClear = function() {
      if (!this.options.changeUrls) return;

      var url = window.location.pathname + window.location.search;
      return typeof history.replaceState === "function" ? history.replaceState("", document.title, url) : void 0;
    };

    Tabs.prototype.navigateTo = function(target) {
      var selector = getSelector(target);
      var selected = document.querySelector(selector);
      var activeClass = this.options.activeClass;
      var filter = this.filter;

      forEach(this.tabs, function (index, tab) {
        tab.classList.remove(activeClass);
      });

      forEach(this.tabs, function (index, tab) {
        if (tab.getAttribute(filter) === selector) {
          tab.classList.add(activeClass);
        }
      });

      [].filter.call(selected.parentNode.children, function (child) {
        if (child !== selected) {
          child.classList.remove(activeClass);
        }
      });

      selected.classList.add(activeClass);

      return selected.dispatchEvent(this.activeTabEvent);
    };

    Tabs.prototype.collapse = function(target) {
      var selected = document.querySelector(getSelector(target));
      var activeClass = this.options.activeClass;

      forEach(this.tabs, function (index, tab) {
        tab.classList.remove(activeClass);
      });

      return selected.classList.remove(activeClass);
    };

    Tabs.prototype.scrollToTab = function(target) {
      if (!(this.isAccordion() && this.options.autoScroll)) {
        return;
      }

      var selected = document.querySelector(getSelector(target));

      return selected.scrollIntoView();
    };

    Tabs.prototype.activeTab = function() {
      var activeTab = null;
      var activeClass = this.options.activeClass;

      forEach(this.tabs, function (index, tab) {
        if (tab.classList.contains(activeClass)) {
          return tab;
        }
      });
    };

    Tabs.prototype.tabFromHash = function() {
      var tabId = window.location.hash.replace("!", "");
      var filter = this.filter;

      forEach(this.tabs, function (index, tab) {
        if (tab.getAttribute(filter) === tabId) {
          return tab;
        }
      });
    };

    Tabs.prototype.isActive = function(target) {
      return getSelector(target) === getSelector(this.activeTab());
    };

    Tabs.prototype.isAccordion = function() {
      var tabNav = document.querySelector(this.options.tabNav);

      return !(tabNav.offsetWidth > 0 || tabNav.offsetHeight > 0);
    };

    var getSelector = function(clicked) {
      return clicked.getAttribute("data-target") || clicked.getAttribute("href");
    };

    var forEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    };

    return Tabs;
  })();
})();

window.ClassToggler = (function() {
  var defaults;

  defaults = {
    containerClass: null,
    $target: null,
    activeClass: "active",
    inactiveClass: null,
    toggleOn: "click"
  };

  function ClassToggler(options) {
    this.options = Utils.setOptions(options, defaults);
    if (this.options.$target) {
      this.addEventListeners();
    } else {
      console.trace("ClassToggle", this.options);
    }
  }

  ClassToggler.prototype.addEventListeners = function() {
    return this.options.$target.on(this.options.toggleOn, (function(_this) {
      return function(e) {
        var $togglableElement = _this.options.containerClass ? $(e.target).closest(_this.options.containerClass) : $(e.delegateTarget);
        if (_this.isActive($togglableElement)) {
          return _this.hide($togglableElement, e);
        } else {
          return _this.show($togglableElement, e);
        }
      };
    })(this));
  };

  ClassToggler.prototype.isActive = function($togglableElement) {
    return $togglableElement.hasClass(this.options.activeClass);
  };

  ClassToggler.prototype.show = function($togglableElement, e) {
    var base;
    if (typeof (base = this.options).onShow === "function") {
      base.onShow($togglableElement, e);
    }

    return $togglableElement.addClass(this.options.activeClass);
  };

  ClassToggler.prototype.hide = function($togglableElement, e) {
    var base;
    if (typeof (base = this.options).onHide === "function") {
      base.onHide($togglableElement, e);
    }

    return $togglableElement.removeClass(this.options.activeClass);
  };

  return ClassToggler;

})();

window.RadioToggle = function() {
  var message = "RadioToggle is now deprecated";
  if (window.Raven) window.Raven.captureMessage(message);
  console.warn(message);
};
