var createContext;
var setOptions = this.Utils.setOptions;

createContext = function(options) {
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
      var url = window.location.pathname + window.location.search;
      if (!this.options.changeUrls) {
        return;
      }

      return typeof history.replaceState === "function" ? history.replaceState("", document.title, url) : void 0;
    };

    Tabs.prototype.navigateTo = function(target) {
      var $selected = $(selector);
      var selector = getSelector(target);
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
      var $selected = $(getSelector(target));
      if (!(this.isAccordion() && this.options.autoScroll)) {
        return;
      }

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
};

window.Tabs = createContext();
