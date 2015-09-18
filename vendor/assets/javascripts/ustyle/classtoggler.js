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
