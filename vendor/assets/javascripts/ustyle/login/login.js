var ref             = this.Utils;
var addClass        = ref.addClass;
var merge           = ref.merge;
var setOptions      = ref.setOptions;
var deleteUndefined = ref.deleteUndefined;

window.Login = function(options) {
  var Login;
  return Login = (function() {
    var passwordHelp;

    Login.prototype.defaults = {
      origin: window.location.href,
      removeableClass: "us-login--removeable",
      state: "signin"
    };

    function Login(options) {
      var container;
      this.options = setOptions(options, this.defaults);
      if (this.options.target === null) {
        return;
      }

      if (!(this.options.target.length === void 0 || this.options.target.length)) {
        return;
      }

      this.target = $(this.options.target);
      this.formData = {
        source: this.target.data("source"),
        origin: this.target.data("origin") || this.options.origin,
        email: this.target.data("email"),
        opt_in: this.target.data("opt-in")
      };

      deleteUndefined(this.formData);
      this.title = this.target.data("title") || this.options.title;
      this.description = this.target.data("description");
      container = document.createElement("div");
      addClass(container, "us-anchor__target");
      addClass(container, "us-login__target");
      this.setupAnchors(container);
    }

    Login.prototype.setupAnchors = function(container) {
      var i;
      var len;
      var ref1;
      var results;
      var target;
      if (this.options.target.length >= 1) {
        ref1 = this.options.target;
        results = [];

        for (i = 0, len = ref1.length; i < len; i++) {
          target = ref1[i];
          results.push(this.anchorInstance(target, container));
        }

        return results;
      } else {
        return this.anchorInstance(this.options.target, container);
      }
    };

    Login.prototype.anchorInstance = function(target, container) {
      return this.anchor = new Anchor({
        target: target,
        content: container,
        isAjax: true,
        onOpen: (function(_this) {
          return function() {
            return _this.fetch().done(function(html) {
              var ref1;

              if (!$(container).find(".us-login__form").length) {
                $(container).append(html);
              }

              _this.loginForm = $(container).find(".us-login__form");
              _this.loginContainer = $(container).find(".us-login");
              _this.setState();
              _this.setContent();
              passwordHelp(_this.loginForm);
              return (ref1 = _this.options.onOpen(target)) != null ? ref1.call(target) : void 0;
            });
          };
        })(this),
        onClose: (function(_this) {
          return function() {
            if (_this.options.onClose != null) {
              ref1.call(target);
            }

            return _this.resetForm();
          };
        })(this)
      });
    };

    Login.prototype.fetch = function() {
      var jqxhr;
      return jqxhr = $.ajax({
        url: (window.uSwitch.Accounts.popupUrl()) + "?" + ($.param(this.formData)),
        dataType: "jsonp"
      });
    };

    Login.prototype.setState = function() {
      var activeState = this.loginForm.filter(".us-login__form--" + this.options.state);
      this.loginForm.removeClass("login-state--active");
      activeState.addClass("login-state--active");
      return this.toggle();
    };

    Login.prototype.toggle = function() {
      return $(document).on("click", ".login-state__toggle", function(e) {
        var $currentState = $(this).parents(".us-login__form");
        var $nextState = $currentState.next().length ? $currentState.next() : $currentState.prev();
        $nextState.addClass("login-state--active");
        $currentState.removeClass("login-state--active");
        return e.preventDefault();
      });
    };

    Login.prototype.setContent = function() {
      var descriptionElm;
      var loginTitle;
      var selector;

      if (!this.title) {
        return;
      }

      selector = "<h2 class='us-login__title ";
      selector += this.options.removeableClass + "'>" + this.title + "</h2>";
      loginTitle = $(selector);
      this.loginContainer.prepend(loginTitle);

      if (!this.description) {
        return;
      }

      descriptionElm = "<p class='us-login__description ";
      descriptionElm += this.options.removeableClass + "'>" + this.description + "</p>";
      return loginTitle.after(descriptionElm);
    };

    Login.prototype.resetForm = function() {
      return $("." + this.options.removeableClass).remove();
    };

    passwordHelp = function(form) {
      return window.setTimeout(function() {
        return form.find(".password-strength").passwordHelper();
      }, 1);
    };

    Login;

    return Login;

  })();
};
