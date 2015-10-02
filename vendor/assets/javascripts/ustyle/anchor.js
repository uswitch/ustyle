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
