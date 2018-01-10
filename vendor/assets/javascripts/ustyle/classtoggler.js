window.ClassToggler = (function(Utils) {
  var addClass = Utils.addClass;
  var hasClass = Utils.hasClass;
  var removeClass = Utils.removeClass;
  var forEach = Utils.forEach;

  var defaults = {
    containerClass: null,
    target: null,
    activeClass: "active",
    inactiveClass: null,
    toggleOn: "click"
  };

  var findAncestor = function (el, cls) {
    while ((el = el.parentElement) && ! hasClass(el, cls));
    return el;
  }

  function ClassToggler(options) {
    this.options = Utils.setOptions(options, defaults);

    if (!this.options.target && this.options.$target && this.options.$target instanceof jQuery) {
      this.options.target = document.querySelectorAll(this.options.$target.selector);
    }

    if (this.options.target) {
      this.addEventListeners();
    } else {
      console.trace("ClassToggle", this.options);
    }
  }

  ClassToggler.prototype.addEventListeners = function() {
    var toggleEvent = this.options.toggleOn;
    var onToggle = (function (_this) {
      return function(e) {
        var togglableElement = _this.options.containerClass ? findAncestor(e.target, _this.options.containerClass) : (e.delegateTarget);
        if (_this.isActive(togglableElement)) {
          return _this.hide(togglableElement, e);
        } else {
          return _this.show(togglableElement, e);
        }
      };
    })(this);

    forEach(this.options.target, function (i, t) {
      t.addEventListener(toggleEvent, onToggle);
    });
  };

  ClassToggler.prototype.isActive = function(togglableElement) {
    return hasClass(togglableElement, this.options.activeClass);
  };

  ClassToggler.prototype.show = function(togglableElement, e) {
    var base;
    if (typeof (base = this.options).onShow === "function") {
      base.onShow(togglableElement, e);
    }

    return togglableElement.addClass(this.options.activeClass);
  };

  ClassToggler.prototype.hide = function(togglableElement, e) {
    var base;
    if (typeof (base = this.options).onHide === "function") {
      base.onHide(togglableElement, e);
    }

    return removeClass(togglableElement, this.options.activeClass);
  };

  return ClassToggler;

})(this.Utils);
