(function() {
  var addClass, deleteUndefined, hasClass, merge, removeClass, requestAnimationFrame, setOptions, transformKey,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

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
    var extension, extensions, property, target, _i, _len;
    target = arguments[0], extensions = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = extensions.length; _i < _len; _i++) {
      extension = extensions[_i];
      for (property in extension) {
        if (!__hasProp.call(extension, property)) continue;
        target[property] = extension[property];
      }
    }
    return target;
  };

  setOptions = function(options, defaults) {
    return merge({}, defaults, options);
  };

  deleteUndefined = function(obj) {
    var key, value, _results;
    _results = [];
    for (key in obj) {
      value = obj[key];
      if (value === null || value === void 0) {
        _results.push(delete obj[key]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  transformKey = (function() {
    var el, key, transforms, _i, _len;
    el = document.createElement('div');
    transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
    for (_i = 0, _len = transforms.length; _i < _len; _i++) {
      key = transforms[_i];
      if (el.style[key] !== void 0) {
        return key;
      }
    }
  })();

  requestAnimationFrame = ((function(window) {
    var vendor, _i, _len, _ref;
    _ref = ['ms', 'moz', 'webkit', 'o'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vendor = _ref[_i];
      if (window.requestAnimationFrame) {
        break;
      }
      window.requestAnimationFrame = window["" + vendor + "RequestAnimationFrame"];
    }
    return window.requestAnimationFrame || (window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 1000 / 60);
    });
  })(window)).bind(window);

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

}).call(this);

(function() {
  var addClass, createContext, hasClass, merge, removeClass, setOptions, transformKey, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = this.Utils, addClass = _ref.addClass, removeClass = _ref.removeClass, hasClass = _ref.hasClass, merge = _ref.merge, setOptions = _ref.setOptions, transformKey = _ref.transformKey;

  createContext = function(options) {
    var Anchor;
    return Anchor = (function() {
      var documentYBoundary, getXBounds, getYBounds;

      Anchor.prototype.defaults = {
        classPrefix: "us-anchor",
        openEvent: "click",
        showClose: true,
        isAjax: false
      };

      function Anchor(options) {
        var _ref1, _ref2;
        _ref1 = this.options = setOptions(options, this.defaults), this.target = _ref1.target, this.classPrefix = _ref1.classPrefix;
        if (this.target === null) {
          return;
        }
        this._boundEvents = [];
        this._closeTargets = [];
        _ref2 = this.create(), this.anchor = _ref2.anchor, this.arrow = _ref2.arrow, this.content = _ref2.content;
        this.setEvents(this.anchor);
        this.watchWindow();
      }

      Anchor.prototype.setEvents = function(anchor) {
        var hide, toggle;
        toggle = (function(_this) {
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
        hide = (function(_this) {
          return function(event) {
            var _ref1;
            if (!_this.isOpen()) {
              return;
            }
            if (_ref1 = event.target, __indexOf.call(_this._closeTargets, _ref1) >= 0) {
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
        var fire, _ref1, _ref2;
        fire = (function(_this) {
          return function() {
            _this.content.appendChild(_this.options.content);
            if (!anchor.parentNode) {
              document.body.appendChild(anchor);
            }
            addClass(anchor, "" + _this.classPrefix + "--open");
            setTimeout(function() {
              return addClass(anchor, "" + _this.classPrefix + "--after-open");
            });
            return _this.setPosition();
          };
        })(this);
        if (this.options.isAjax) {
          return (_ref1 = this.options.onOpen) != null ? _ref1.call().done(function() {
            return fire();
          }) : void 0;
        } else {
          fire();
          return (_ref2 = this.options.onOpen) != null ? _ref2.call() : void 0;
        }
      };

      Anchor.prototype.hide = function(anchor) {
        var _ref1;
        removeClass(anchor, "" + this.classPrefix + "--open");
        removeClass(anchor, "" + this.classPrefix + "--after-open");
        return (_ref1 = this.options.onClose) != null ? _ref1.call() : void 0;
      };

      Anchor.prototype.isOpen = function() {
        return hasClass(this.anchor, "" + this.classPrefix + "--open");
      };

      Anchor.prototype.create = function() {
        var anchor, anchorCss, arrow, arrowInner, closeButton, content;
        content = document.createElement("div");
        addClass(content, "" + this.classPrefix + "__content");
        arrow = document.createElement("div");
        arrowInner = document.createElement("div");
        arrow.appendChild(arrowInner);
        addClass(arrowInner, "" + this.classPrefix + "__arrow-inner");
        addClass(arrow, "" + this.classPrefix + "__arrow");
        content.appendChild(arrow);
        if (this.options.showClose) {
          closeButton = document.createElement("a");
          closeButton.href = "#";
          addClass(closeButton, "" + this.classPrefix + "__close-button");
          content.appendChild(closeButton);
          this._closeTargets.push(closeButton);
        }
        anchor = document.createElement("div");
        addClass(anchor, this.classPrefix);
        anchorCss = anchor.style;
        anchorCss.position = 'absolute';
        anchorCss.zIndex = '9999';
        anchorCss.top = '0px';
        anchorCss.left = '0px';
        anchor.appendChild(content);
        addClass(document.documentElement, "" + this.classPrefix + "--ready");
        return {
          anchor: anchor,
          arrow: arrow,
          content: content
        };
      };

      Anchor.prototype.setPosition = function() {
        var bottomOffset, leftOffset, style, targetBounds, transformXOrigin, transformYOrigin;
        leftOffset = getXBounds(this.target, this.anchor, this.arrow);
        targetBounds = this.target.getBoundingClientRect();
        if (documentYBoundary(targetBounds, this.anchor)) {
          addClass(this.anchor, "" + this.classPrefix + "--bottom");
          removeClass(this.anchor, "" + this.classPrefix + "--top");
          transformYOrigin = "calc(100% + 12px)";
          bottomOffset = getYBounds(this.target, this.anchor, this.arrow);
        } else {
          addClass(this.anchor, "" + this.classPrefix + "--top");
          removeClass(this.anchor, "" + this.classPrefix + "--bottom");
          transformYOrigin = "-12px";
          bottomOffset = getYBounds(this.target, this.anchor, this.arrow);
        }
        style = "translateX(" + (Math.round(leftOffset)) + "px) ";
        style += "translateY(" + (Math.round(bottomOffset)) + "px)";
        if (transformKey !== 'msTransform') {
          style += " translateZ(0)";
        }
        this.anchor.style[transformKey] = style;
        transformXOrigin = (targetBounds.left - this.anchor.getBoundingClientRect().left) + (this.target.offsetWidth / 2);
        this.arrow.style.left = "" + transformXOrigin + "px";
        return this.content.style["" + transformKey + "Origin"] = "" + transformXOrigin + "px " + transformYOrigin;
      };

      getXBounds = function(target, anchor, arrow) {
        var calculatedWidth, centerPoint, targetBounds;
        targetBounds = target.getBoundingClientRect();
        centerPoint = targetBounds.left + target.offsetWidth / 2;
        calculatedWidth = targetBounds.left + (anchor.offsetWidth / 2) + (target.offsetWidth / 2);
        if (document.body.offsetWidth < calculatedWidth) {
          return document.body.offsetWidth - anchor.offsetWidth;
        } else if (centerPoint - anchor.offsetWidth / 2 < 0) {
          return 0;
        } else {
          return targetBounds.left - (anchor.offsetWidth / 2) + (target.offsetWidth / 2);
        }
      };

      getYBounds = function(target, anchor, arrow) {
        var targetBounds;
        targetBounds = target.getBoundingClientRect();
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
        var event, _i, _len, _ref1, _results;
        _ref1 = ['resize', 'scroll', 'touchmove'];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          event = _ref1[_i];
          _results.push(window.addEventListener(event, (function(_this) {
            return function(event) {
              var lastFired, maxWait, now, throttle, timer;
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
        return _results;
      };

      Anchor;

      return Anchor;

    })();
  };

  window.Anchor = createContext();

}).call(this);

(function() {
  window.Backdrop = (function() {
    var backdrop, createBackdrop, holds;

    backdrop = null;

    holds = 0;

    function Backdrop() {
      backdrop = document.querySelector('.us-backdrop');
      if (backdrop == null) {
        backdrop = createBackdrop();
      }
    }

    Backdrop.prototype.element = backdrop;

    createBackdrop = function() {
      backdrop = document.createElement('div');
      Utils.addClass(backdrop, 'us-backdrop');
      return document.body.appendChild(backdrop);
    };

    Backdrop.prototype.retain = function() {
      if (++holds === 1) {
        Utils.addClass(backdrop, 'us-backdrop--visible');
        return Utils.requestAnimationFrame(function() {
          return Utils.addClass(backdrop, 'us-backdrop--active');
        });
      }
    };

    Backdrop.prototype.release = function() {
      if (--holds === 0) {
        return Utils.requestAnimationFrame(function() {
          Utils.removeClass(backdrop, 'us-backdrop--active');
          return setTimeout(function() {
            return Utils.removeClass(backdrop, 'us-backdrop--visible');
          }, 300);
        });
      }
    };

    return Backdrop;

  })();

}).call(this);

(function() {
  var addClass, hasClass, removeClass, requestAnimationFrame, setOptions, _ref;

  _ref = this.Utils, setOptions = _ref.setOptions, hasClass = _ref.hasClass, addClass = _ref.addClass, removeClass = _ref.removeClass, requestAnimationFrame = _ref.requestAnimationFrame;

  window.Overlay = (function() {
    var defaults;

    defaults = {
      bodyActiveClass: 'overlay--open',
      activeClass: 'us-overlay-parent--active',
      visibleClass: 'us-overlay-parent--visible',
      overlay: $('.us-overlay-parent'),
      openButton: '.js-open-overlay',
      closeButton: '.js-close-overlay',
      historyStatus: '#seedeal',
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
      $(this.options.openButton).on('click.open-overlay', (function(_this) {
        return function(e) {
          if (_this.options.preventDefault) {
            e.preventDefault();
          }
          return _this.show(e);
        };
      })(this));
      this.overlay.on('click.close-overlay', (function(_this) {
        return function(e) {
          var target, targets, _i, _len, _results;
          targets = [_this.overlay[0], _this.overlay.find(_this.options.closeButton)[0]];
          _results = [];
          for (_i = 0, _len = targets.length; _i < _len; _i++) {
            target = targets[_i];
            if (e.target === target) {
              if (_this.options.preventDefault) {
                e.preventDefault();
              }
              _this.hide(e);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
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
      var that, _base;
      that = this;
      $(document.body).addClass(this.options.bodyActiveClass);
      this.backdrop.retain();
      addClass(this.overlay[0], this.options.visibleClass);
      requestAnimationFrame(function() {
        return addClass(that.overlay[0], that.options.activeClass);
      });
      if (typeof (_base = this.options).onOpen === "function") {
        _base.onOpen(e);
      }
      if (this.hasHistory()) {
        return history.pushState('open', window.document.title, this.options.historyStatus);
      }
    };

    Overlay.prototype.hide = function(e) {
      var that, _base;
      that = this;
      $(document.body).removeClass(this.options.bodyActiveClass);
      this.backdrop.release();
      requestAnimationFrame(function() {
        removeClass(that.overlay[0], that.options.activeClass);
        return setTimeout(function() {
          return removeClass(that.overlay[0], that.options.visibleClass);
        }, that.options.animationSpeed);
      });
      if (typeof (_base = this.options).onClose === "function") {
        _base.onClose(e);
      }
      if (this.hasHistory()) {
        if (history.state === 'open') {
          return history.back();
        }
      }
    };

    Overlay.prototype.isOpen = function() {
      return hasClass(this.overlay[0], this.options.activeClass);
    };

    Overlay.prototype.hasHistory = function() {
      return this.options.history && window.history && window.history.pushState;
    };

    return Overlay;

  })();

}).call(this);

(function() {
  var createContext, setOptions;

  setOptions = this.Utils.setOptions;

  createContext = function(options) {
    var Tabs;
    return Tabs = (function() {
      var getSelector, isAccordion;

      Tabs.prototype.defaults = {
        tabContainer: ".us-tabs",
        tabLinks: ".us-tabs-nav-mainlink",
        tabTitle: "us-tab-title",
        changeUrls: true,
        activeClass: "active",
        collapsible: false,
        autoScroll: true
      };

      function Tabs(options) {
        var tabContainer, tabLinks, _ref;
        _ref = this.options = setOptions(options, this.defaults), tabContainer = _ref.tabContainer, tabLinks = _ref.tabLinks;
        this.tabs = $(tabContainer).find(tabLinks);
        this.filter = this.tabs.data("target") ? "data-target" : "href";
        this.init();
        this.tabs.on("click.ustyle.tab", (function(_this) {
          return function(e) {
            var $target;
            $target = $(e.currentTarget);
            if (isAccordion() && _this.options.collapsible && _this.isActive($target)) {
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
        var $activeTab, $initialHash;
        $initialHash = this.tabFromHash();
        $activeTab = this.activeTab();
        if ($initialHash.length) {
          return this.navigateTo($initialHash);
        } else if ($activeTab.length) {
          return this.navigateTo($activeTab);
        } else if (!this.options.collapsible || !isAccordion()) {
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
        var url;
        if (!this.options.changeUrls) {
          return;
        }
        url = window.location.pathname + window.location.search;
        return typeof history.replaceState === "function" ? history.replaceState("", document.title, url) : void 0;
      };

      Tabs.prototype.navigateTo = function(target) {
        var $selected, selector;
        selector = getSelector(target);
        $selected = $(selector);
        this.tabs.removeClass(this.options.activeClass).end();
        this.tabs.filter("[" + this.filter + "='" + selector + "']").addClass(this.options.activeClass);
        $selected.siblings("." + this.options.activeClass).removeClass(this.options.activeClass).end().addClass(this.options.activeClass);
        return $selected.trigger("ustyle.tab.active");
      };

      Tabs.prototype.collapse = function(target) {
        var $selected;
        $selected = $(getSelector(target));
        this.tabs.removeClass(this.options.activeClass).end();
        return $selected.removeClass(this.options.activeClass);
      };

      Tabs.prototype.scrollToTab = function(target) {
        var $selected;
        if (!(isAccordion() && this.options.autoScroll)) {
          return;
        }
        $selected = $(getSelector(target));
        return $("html,body").scrollTop($selected.offset().top);
      };

      Tabs.prototype.activeTab = function() {
        return this.tabs.filter("." + this.options.activeClass);
      };

      Tabs.prototype.tabFromHash = function() {
        var tabId;
        tabId = location.hash.replace("!", "");
        return this.tabs.filter("[" + this.filter + "='" + tabId + "']");
      };

      Tabs.prototype.isActive = function(target) {
        return getSelector(target) === getSelector(this.activeTab());
      };

      getSelector = function(clicked) {
        return clicked.data("target") || clicked.attr("href");
      };

      isAccordion = function() {
        return !$(".us-tabs-nav").is(":visible");
      };

      Tabs;

      return Tabs;

    })();
  };

  window.Tabs = createContext();

}).call(this);

(function() {
  window.ClassToggler = (function() {
    var defaults;

    defaults = {
      containerClass: null,
      $target: null,
      activeClass: "active",
      inactiveClass: null,
      toggleOn: 'click'
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
          var $togglableElement;
          $togglableElement = _this.options.containerClass ? $(e.target).closest(_this.options.containerClass) : $(e.delegateTarget);
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
      var _base;
      if (typeof (_base = this.options).onShow === "function") {
        _base.onShow($togglableElement, e);
      }
      return $togglableElement.addClass(this.options.activeClass);
    };

    ClassToggler.prototype.hide = function($togglableElement, e) {
      var _base;
      if (typeof (_base = this.options).onHide === "function") {
        _base.onHide($togglableElement, e);
      }
      return $togglableElement.removeClass(this.options.activeClass);
    };

    return ClassToggler;

  })();

}).call(this);

(function() {
  window.RadioToggle = (function() {
    var defaults;

    defaults = {
      $target: $(".us-toggle")
    };

    function RadioToggle(options) {
      this.options = Utils.setOptions(options, defaults);
      if (this.options.$target) {
        this.addEventListeners();
      } else {
        throw new Error("No target defined");
      }
    }

    RadioToggle.prototype.addEventListeners = function() {
      return this.options.$target.on("change", "input:radio", function(e) {
        $("input[name=" + this.name + "]").removeClass("checked");
        if (this.checked) {
          $(this).addClass("checked");
        }
        return e.stopPropagation();
      });
    };

    return RadioToggle;

  })();

}).call(this);
