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
    overlay: document.querySelector('.us-overlay-parent'),
    openButton: ".js-open-overlay",
    closeButton: ".js-close-overlay",
    historyStatus: "#seedeal",
    history: false,
    preventDefault: true,
    animationSpeed: 300
  };

  function Overlay(options) {
    this.overlay = (this.options = setOptions(options, defaults)).overlay;

    if (this.overlay instanceof jQuery) {
      this.overlay = document.querySelector(this.overlay.selector);
    }

    if (this.options.openButton instanceof jQuery) {
      this.options.openButton = document.querySelector(this.options.openButton.selector);
    }

    if ((this.overlay != null) && (typeof Backdrop !== "undefined" && Backdrop !== null)) {
      this.backdrop = new Backdrop();
      this.addEventListeners();
    } else {
      throw new Error("There's no overlay or you haven't included Backdrop");
    }
  }

  Overlay.prototype.addEventListeners = function () {
    var openOverlayEvent = new CustomEvent('click.open-overlay');
    var closeOverlayEvent = new CustomEvent('click.close-overlay');
    var openButton = typeof this.options.openButton === 'string' ? document.querySelector(this.options.openButton) : this.options.openButton;

    var onOpenButtonClick = (function (_this) {
      return function (e) {
        if (_this.options.preventDefault) {
          e.preventDefault();
        }

        openButton.dispatchEvent(openOverlayEvent);

        return _this.show(e);
      }
    })(this);

    if (openButton) {
      openButton.addEventListener('click', onOpenButtonClick);
    }

    var onCloseOverlay = (function (_this) {
      return function (e) {
        var results = [];
        var closeTargets = _this.overlay.querySelectorAll(_this.options.closeButton);
        var targets = [_this.overlay].concat(Array.prototype.slice.call(closeTargets));

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

        _this.overlay.dispatchEvent(closeOverlayEvent);

        return results;
      };
    })(this);

    this.overlay.addEventListener('click', onCloseOverlay);

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

  Overlay.prototype.show = function (e) {
    var onFrame;
    var _this = this;

    addClass(document.body, this.options.bodyActiveClass);
    this.backdrop.retain();
    addClass(this.overlay, this.options.visibleClass);

    onFrame = function() {
      addClass(_this.overlay, _this.options.activeClass);
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

    removeClass(document.body, this.options.bodyActiveClass);
    this.backdrop.release();

    onFrame = function() {
      removeClass(_this.overlay, _this.options.activeClass);
      return setTimeout(function() {
        var base;
        removeClass(_this.overlay, _this.options.visibleClass);
        return typeof (base = _this.options).onClose === "function" ? base.onClose(e) : void 0;
      }, _this.options.animationSpeed);
    };

    requestAnimationFrame.call(window, onFrame);
    if (this.hasHistory() && history.state === "open") return history.back();
  };

  Overlay.prototype.isOpen = function() {
    return hasClass(this.overlay, this.options.activeClass);
  };

  Overlay.prototype.hasHistory = function() {
    return this.options.history && window.history && window.history.pushState;
  };

  return Overlay;

})(this.Utils);
