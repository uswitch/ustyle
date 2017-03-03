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

var createContext;
var ref = this.Utils;
var merge = ref.merge;
var addClass = ref.addClass;
var hasClass = ref.hasClass;
var setOptions = ref.setOptions;
var removeClass = ref.removeClass;
var transformKey = ref.transformKey;

var indexOf = [].indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) {
      return i;
    }
  } return -1;
};

createContext = function(options) {
  var Anchor;
  return Anchor = (function() {
    var documentYBoundary;
    var getXBounds;
    var getYBounds;

    Anchor.prototype.defaults = {
      classPrefix: "us-anchor",
      openEvent: "click",
      showClose: true,
      isAjax: false
    };

    function Anchor(options) {
      var ref1 = this.options = setOptions(options, this.defaults);
      var ref2;
      this.target = ref1.target;
      this.classPrefix = ref1.classPrefix;

      if (this.target === null) {
        return;
      }

      this._boundEvents = [];
      this._closeTargets = [];
      ref2 = this.create(),
      this.anchor = ref2.anchor,
      this.arrow = ref2.arrow,
      this.content = ref2.content;
      this.setEvents(this.anchor);
      this.watchWindow();
    }

    Anchor.prototype.setEvents = function(anchor) {
      var toggle = (function(_this) {
        return function(event) {
          event.preventDefault();
          event.stopPropagation();
          if (!_this.isOpen()) {
            return _this.show(anchor);
          } else {
            return _this.hide(anchor);
          }
        };
      })(this);

      var hide = (function(_this) {
        return function(event) {
          var ref1;
          if (!_this.isOpen()) {
            return;
          }

          if (ref1 = event.target, indexOf.call(_this._closeTargets, ref1) >= 0) {
            event.preventDefault();
            event.stopPropagation();
            _this.hide(anchor);
          }

          if (event.target === anchor || anchor.contains(event.target)) {
            return;
          }

          if (event.target === _this.target || _this.target.contains(event.target)) {
            return;
          }

          return _this.hide(anchor);
        };
      })(this);

      this._on(this.target, this.options.openEvent, toggle);

      return this._on(document, this.options.openEvent, hide);
    };

    Anchor.prototype._on = function(element, event, handler) {
      this._boundEvents.push({
        element: element,
        event: event,
        handler: handler
      });

      return element.addEventListener(event, handler, false);
    };

    Anchor.prototype.show = function(anchor) {
      var ref1;
      var ref2;

      var fire = (function(_this) {
        return function() {
          _this.content.appendChild(_this.options.content);

          if (!anchor.parentNode) {
            document.body.appendChild(anchor);
          }

          addClass(anchor, _this.classPrefix + "--open");
          setTimeout(function() {
            return addClass(anchor, _this.classPrefix + "--after-open");
          });

          return _this.setPosition();
        };
      })(this);

      if (this.options.isAjax) {
        return (ref1 = this.options.onOpen) != null ? ref1.call().done(function() {
          return fire();
        }) : void 0;
      } else {
        fire();
        return (ref2 = this.options.onOpen) != null ? ref2.call() : void 0;
      }
    };

    Anchor.prototype.hide = function(anchor) {
      var ref1;
      removeClass(anchor, this.classPrefix + "--open");
      removeClass(anchor, this.classPrefix + "--after-open");
      return (ref1 = this.options.onClose) != null ? ref1.call() : void 0;
    };

    Anchor.prototype.isOpen = function() {
      return hasClass(this.anchor, this.classPrefix + "--open");
    };

    Anchor.prototype.create = function() {
      var anchor;
      var anchorCss;
      var closeButton;
      var arrow = document.createElement("div");
      var content = document.createElement("div");
      var arrowInner = document.createElement("div");

      addClass(content, this.classPrefix + "__content");
      addClass(arrowInner, this.classPrefix + "__arrow-inner");
      addClass(arrow, this.classPrefix + "__arrow");
      arrow.appendChild(arrowInner);
      content.appendChild(arrow);

      if (this.options.showClose) {
        closeButton = document.createElement("a");
        closeButton.href = "#";
        addClass(closeButton, this.classPrefix + "__close-button");
        content.appendChild(closeButton);
        this._closeTargets.push(closeButton);
      }

      anchor = document.createElement("div");
      addClass(anchor, this.classPrefix);
      anchorCss = anchor.style;
      anchorCss.position = "absolute";
      anchorCss.zIndex = "9999";
      anchorCss.top = "0px";
      anchorCss.left = "0px";
      anchor.appendChild(content);
      addClass(document.documentElement, this.classPrefix + "--ready");

      return {
        anchor: anchor,
        arrow: arrow,
        content: content
      };
    };

    Anchor.prototype.setPosition = function() {
      var style;
      var bottomOffset;
      var transformXOrigin;
      var transformYOrigin;
      var leftOffset = getXBounds(this.target, this.anchor, this.arrow);
      var targetBounds = this.target.getBoundingClientRect();

      if (documentYBoundary(targetBounds, this.anchor)) {
        addClass(this.anchor, this.classPrefix + "--bottom");
        removeClass(this.anchor, this.classPrefix + "--top");
        transformYOrigin = "calc(100% + 12px)";
        bottomOffset = getYBounds(this.target, this.anchor, this.arrow);
      } else {
        addClass(this.anchor, this.classPrefix + "--top");
        removeClass(this.anchor, this.classPrefix + "--bottom");
        transformYOrigin = "-12px";
        bottomOffset = getYBounds(this.target, this.anchor, this.arrow);
      }

      style = "translateX(" + (Math.round(leftOffset)) + "px) ";
      style += "translateY(" + (Math.round(bottomOffset)) + "px)";

      if (transformKey !== "msTransform") {
        style += " translateZ(0)";
      }

      this.anchor.style[transformKey] = style;
      transformXOrigin = (targetBounds.left - this.anchor.getBoundingClientRect().left) + (this.target.offsetWidth / 2);
      this.arrow.style.left = transformXOrigin + "px";
      return this.content.style[transformKey + "Origin"] = transformXOrigin + "px " + transformYOrigin;
    };

    getXBounds = function(target, anchor, arrow) {
      var targetBounds = target.getBoundingClientRect();
      var calculatedWidth = targetBounds.left + (anchor.offsetWidth / 2) + (target.offsetWidth / 2);
      var centerPoint = targetBounds.left + target.offsetWidth / 2;

      if (document.body.offsetWidth < calculatedWidth) {
        return document.body.offsetWidth - anchor.offsetWidth;
      } else if (centerPoint - anchor.offsetWidth / 2 < 0) {
        return 0;
      } else {
        return targetBounds.left - (anchor.offsetWidth / 2) + (target.offsetWidth / 2);
      }
    };

    getYBounds = function(target, anchor, arrow) {
      var targetBounds = target.getBoundingClientRect();

      if (documentYBoundary(targetBounds, anchor)) {
        return targetBounds.top - (anchor.offsetHeight - window.pageYOffset) + arrow.offsetHeight - target.offsetHeight;
      } else {
        return targetBounds.top + arrow.offsetHeight + target.offsetHeight + window.pageYOffset;
      }
    };

    documentYBoundary = function(target, anchor) {
      if (target.top < anchor.offsetHeight) {
        return;
      }

      return (window.innerHeight - target.top) < anchor.offsetHeight;
    };

    Anchor.prototype.watchWindow = function() {
      var event;
      var i;
      var len;
      var ref1 = ["resize", "scroll", "touchmove"];
      var results = [];

      for (i = 0, len = ref1.length; i < len; i++) {
        event = ref1[i];
        results.push(window.addEventListener(event, (function(_this) {
          return function(event) {
            var lastFired;
            var maxWait;
            var now;
            var throttle;
            var timer;

            if (!_this.isOpen()) {
              return;
            }

            now = +(new Date);
            throttle = 16;
            maxWait = throttle * 3;

            if (!timer) {
              if (now - lastFired > maxWait) {
                _this.setPosition();
                lastFired = now;
              }

              return timer = setTimeout(function(o) {
                timer = null;
                lastFired = +(new Date);
                return _this.setPosition();
              }, throttle);
            }
          };
        })(this), false));
      }

      return results;
    };

    return Anchor;

  })();
};

window.Anchor = createContext();

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
    var getSelector;

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

      this.tabs = $(tabContainer).find(tabLinks);
      this.filter = this.tabs.data("target") ? "data-target" : "href";
      this.init();
      this.tabs.on("click.ustyle.tab", (function(_this) {
        return function(e) {
          var $target = $(e.currentTarget);
          if (_this.isAccordion() && _this.options.collapsible && _this.isActive($target)) {
            _this.collapse($target);
            _this.hashClear();
          } else {
            _this.navigateTo($target);
            _this.scrollToTab($target);
            _this.hashChange($target);
          }

          return e.preventDefault();
        };
      })(this));
    }

    Tabs.prototype.init = function() {
      var $activeTab = this.activeTab();
      var $initialHash = this.tabFromHash();

      if ($initialHash.length) {
        return this.navigateTo($initialHash);
      } else if ($activeTab.length) {
        return this.navigateTo($activeTab);
      } else if (!this.options.collapsible || !this.isAccordion()) {
        return this.navigateTo(this.tabs.first());
      }
    };

    Tabs.prototype.hashChange = function(target) {
      if (!this.options.changeUrls) {
        return;
      }

      return location.replace("#!" + (getSelector(target).replace(/#/, "")));
    };

    Tabs.prototype.hashClear = function() {
      if (!this.options.changeUrls) {
        return;
      }

      var url = window.location.pathname + window.location.search;
      return typeof history.replaceState === "function" ? history.replaceState("", document.title, url) : void 0;
    };

    Tabs.prototype.navigateTo = function(target) {
      var selector = getSelector(target);
      var $selected = $(selector);
      this.tabs.removeClass(this.options.activeClass).end();
      this.tabs.filter("[" + this.filter + "='" + selector + "']").addClass(this.options.activeClass);
      $selected.siblings("." + this.options.activeClass).removeClass(this.options.activeClass).end().addClass(this.options.activeClass);
      return $selected.trigger("ustyle.tab.active");
    };

    Tabs.prototype.collapse = function(target) {
      var $selected = $(getSelector(target));
      this.tabs.removeClass(this.options.activeClass).end();
      return $selected.removeClass(this.options.activeClass);
    };

    Tabs.prototype.scrollToTab = function(target) {
      if (!(this.isAccordion() && this.options.autoScroll)) {
        return;
      }

      var $selected = $(getSelector(target));
      return $("html,body").scrollTop($selected.offset().top);
    };

    Tabs.prototype.activeTab = function() {
      return this.tabs.filter("." + this.options.activeClass);
    };

    Tabs.prototype.tabFromHash = function() {
      var tabId = location.hash.replace("!", "");
      return this.tabs.filter("[" + this.filter + "='" + tabId + "']");
    };

    Tabs.prototype.isActive = function(target) {
      return getSelector(target) === getSelector(this.activeTab());
    };

    Tabs.prototype.isAccordion = function() {
      return !$(this.options.tabNav).is(":visible");
    };

    getSelector = function(clicked) {
      return clicked.data("target") || clicked.attr("href");
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

window.RadioToggle = function () {
  var message = 'RadioToggle is now depricated';
  if (window.Raven) window.Raven.captureMessage(message);
  console.warn(message);
};
