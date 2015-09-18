var slice = [].slice;

(function($, window, document) {
  var PasswordHelper;
  return PasswordHelper = (function() {
    var createHiddenPassword;
    var createWrapper;
    var regMediumExp = "^(?=.*\\d)(?=.*[a-z])(?!.*\\s).{8,}$|" + "^(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,}$";

    PasswordHelper.prototype.defaults = {
      classPrefix: "pass-helper",
      veryWeakText: "very weak",
      minLength: 6,
      tests: {
        weak: new RegExp("^[a-zA-Z0-9]{6,}$"),
        medium: new RegExp(regMediumExp),
        strong: new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,}$")
      },
      showHide: true,
      showText: "Show",
      hideText: "Hide"
    };

    function PasswordHelper(el, options) {
      this.tests = (this.options = $.extend({}, this.defaults, options)).tests;
      this.$el = $(el);

      if (this.$el.hasClass(this.options.classPrefix + "__input")) {
        return;
      }

      this.$el.addClass(this.options.classPrefix + "__input");
      this.wrapper = createWrapper(this.$el, this.options.classPrefix);
      this.hiddenPassword = createHiddenPassword(this.$el, this.options.classPrefix);
      this.strengthChecker();

      if (this.options.showHide) {
        this.showHide();
      }
    }

    PasswordHelper.prototype.strengthChecker = function() {
      var html = "<div class='" + this.options.classPrefix + "__meter'>";
      html += "<div class='" + this.options.classPrefix + "__meter-bar' /></div>";
      this.$el.after($(html));
      var strengthMeter = $("." + this.options.classPrefix + "__meter-bar");

      var strengthTest = (function(_this) {
        return function(value) {
          var condition;
          if (!value.length) {
            return strengthMeter.removeClass();
          }

          condition = value.length < _this.options.minLength;

          if (condition) {
            return strengthMeter.removeClass().addClass("very-weak");
          }

          return $.each(_this.tests, function(name, test) {
            if (value.match(test)) {
              return strengthMeter.removeClass().addClass(name);
            }
          });
        };
      })(this);

      return $(document).on("keyup", "." + this.options.classPrefix + "__input", (function(_this) {
        return function(e) {
          var passwordValue;
          passwordValue = $(e.target).val();
          $("." + _this.options.classPrefix + "__input").addClass("strength--started");

          if (!passwordValue.length) {
            $("." + _this.options.classPrefix + "__input").removeClass("strength--started");
          }

          return strengthTest(passwordValue);
        };
      })(this));
    };

    PasswordHelper.prototype.showHide = function() {
      var exp = "<a class='" + this.options.classPrefix + "__show-hide' />";
      this.$el.after($(exp).text(this.options.showText));
      var showClass = this.options.classPrefix + "__input--pass-shown";
      return $("." + this.options.classPrefix + "__show-hide").on("click", (function(_this) {
        return function(e) {
          e.preventDefault();

          if (!_this.$el.hasClass(showClass)) {
            _this.$el.addClass(showClass);
            _this.$el.prop("disabled", true).hide();
            _this.hiddenPassword.prop("disabled", false).val(_this.$el.val()).show().focus();
            return $(e.target).text(_this.options.hideText);
          } else {
            _this.$el.removeClass(showClass);
            _this.$el.prop("disabled", false).val(_this.hiddenPassword.val()).show().focus();
            _this.hiddenPassword.prop("disabled", true).hide();
            return $(e.target).text(_this.options.showText);
          }
        };
      })(this));
    };

    createHiddenPassword = function(el, classPrefix) {
      var expression = "<input style='display: none' class='" + (el.attr("class")) + " ";
      expression += classPrefix + "__input-hidden' type='text' ";
      expression += "name='" + (el.attr("name")) + "' ";
      expression += "placeholder='" + (el.attr("placeholder") || "") + "' ";
      expression += "size='" + (el.attr("size")) + "' value='' disabled='disabled' />";
      var input = $(expression);
      el.after(input);
      return input;
    };

    createWrapper = function(el, classPrefix) {
      var wrapperCss = {
        position: "relative",
        height: el.css("height"),
        display: el.css("display")
      };

      return el.wrap($("<div />").addClass(classPrefix + "__wrapper").css(wrapperCss));
    };

    $.fn.extend({
      passwordHelper: function() {
        var options = arguments[0];
        var args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        return this.each(function() {
          var helper;
          var $this = $(this);
          var data = $(this).data("passwordHelper");

          if (!data) {
            helper = (data = new PasswordHelper(this, options));
            $this.data("passwordHelper", helper);
          }

          if (typeof options === "string") {
            return data[options].apply(data, args);
          }
        });
      }
    });

    return PasswordHelper;
  })();
})(window.jQuery, window, document);
