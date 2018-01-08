var setOptions = this.Utils.setOptions;

window.Tabs = (function(options) {
  var Tabs;
  return Tabs = (function() {
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

      this.activeTabEvent = new CustomEvent('ustyle.tab.active');
      this.tabs = document.querySelectorAll(tabContainer + ' ' + tabLinks);
      this.filter = this.tabs.item(0).getAttribute("data-target") ? "data-target" : "href";
      this.init();

      var handleClick = (function (_this) {
        return function (e) {
          var target = e.currentTarget;
          if (_this.isAccordion() && _this.options.collapsible && _this.isActive(target)) {
            _this.collapse(target);
            _this.hashClear();
          } else {
            _this.navigateTo(target);
            _this.scrollToTab(target);
            _this.hashChange(target);
          }

          return e.preventDefault();
        }
      })(this);

      forEach(this.tabs, function (index, tab) {
        tab.addEventListener('click', handleClick);
      });
    }

    Tabs.prototype.init = function() {
      var activeTab = this.activeTab();
      var initialHash = this.tabFromHash();

      if (initialHash) {
        return this.navigateTo(initialHash);
      } else if (activeTab) {
        return this.navigateTo(activeTab);
      } else if (!this.options.collapsible || !this.isAccordion()) {
        return this.navigateTo(this.tabs.item(0));
      }
    };

    Tabs.prototype.hashChange = function(target) {
      if (!this.options.changeUrls) return;

      return window.location.replace("#!" + (getSelector(target).replace(/#/, "")));
    };

    Tabs.prototype.hashClear = function() {
      if (!this.options.changeUrls) return;

      var url = window.location.pathname + window.location.search;
      return typeof history.replaceState === "function" ? history.replaceState("", document.title, url) : void 0;
    };

    Tabs.prototype.navigateTo = function(target) {
      var selector = getSelector(target);
      var selected = document.querySelector(selector);
      var activeClass = this.options.activeClass;
      var filter = this.filter;

      forEach(this.tabs, function (index, tab) {
        tab.classList.remove(activeClass);
      });

      forEach(this.tabs, function (index, tab) {
        if (tab.getAttribute(filter) === selector) {
          tab.classList.add(activeClass);
        }
      });

      [].filter.call(selected.parentNode.children, function (child) {
        if (child !== selected) {
          child.classList.remove(activeClass);
        }
      });

      selected.classList.add(activeClass);

      return selected.dispatchEvent(this.activeTabEvent);
    };

    Tabs.prototype.collapse = function(target) {
      var selected = document.querySelector(getSelector(target));
      var activeClass = this.options.activeClass;

      forEach(this.tabs, function (index, tab) {
        tab.classList.remove(activeClass);
      });

      return selected.classList.remove(activeClass);
    };

    Tabs.prototype.scrollToTab = function(target) {
      if (!(this.isAccordion() && this.options.autoScroll)) {
        return;
      }

      var selected = document.querySelector(getSelector(target));

      return selected.scrollIntoView();
    };

    Tabs.prototype.activeTab = function() {
      var activeTab = null;
      var activeClass = this.options.activeClass;

      forEach(this.tabs, function (index, tab) {
        if (tab.classList.contains(activeClass)) {
          return tab;
        }
      });
    };

    Tabs.prototype.tabFromHash = function() {
      var tabId = window.location.hash.replace("!", "");
      var filter = this.filter;

      forEach(this.tabs, function (index, tab) {
        if (tab.getAttribute(filter) === tabId) {
          return tab;
        }
      });
    };

    Tabs.prototype.isActive = function(target) {
      return getSelector(target) === getSelector(this.activeTab());
    };

    Tabs.prototype.isAccordion = function() {
      var tabNav = document.querySelector(this.options.tabNav);

      return !(tabNav.offsetWidth > 0 || tabNav.offsetHeight > 0);
    };

    var getSelector = function(clicked) {
      return clicked.getAttribute("data-target") || clicked.getAttribute("href");
    };

    var forEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    };

    return Tabs;
  })();
})();
