var ref = this.Utils;
var addClass = ref.addClass;
var hasClass = ref.hasClass;
var removeClass = ref.removeClass;
var setOptions = ref.setOptions;
var requestAnimationFrame = ref.requestAnimationFrame;

window.Overlay = (function() {
  var defaults = {
    bodyActiveClass: "overlay--open",
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
        var i;
        var len;
        var target;
        var results = [];
        var targets = [_this.overlay[0], _this.overlay.find(_this.options.closeButton)[0]];

        for (i = 0, len = targets.length; i < len; i++) {
          target = targets[i];
          if (e.target === target) {
            if (_this.options.preventDefault) {
              e.preventDefault();
            }

            _this.hide(e);
            break;
          } else {
            results.push(void 0);
          }
        }

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
    if (this.hasHistory()) {
      if (history.state === "open") {
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
