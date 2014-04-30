;(function(root){
  "use strict";

  root.Tabs = Tabs;

  function Tabs(opts){
    var opts = opts || {};
    var _this = this;

    this.tabContainer = opts.tabContainer || ".us-tabs";
    this.tabLinks = opts.tabLinks || ".us-tabs-nav-mainlink";
    this.changeUrls = opts.changeUrls === false ? false : true;

    this.tabs = $(this.tabContainer);
    this.tab = this.tabs.find(this.tabLinks);

    this.filter = this.tab.data("target") ? "data-target" : "href";
    this.activeClass = opts.activeClass || "active";
    this.hash = window.location.hash;

    _this.init();

    $(document).on("click.ustyle.tab", this.tabLinks, function(e){
      e.preventDefault();
      _this.navigateTo($(this));
      _this.hashChange($(this));
    });
  };

  Tabs.prototype.init = function(){
    var $first = this.tab.hasClass(this.activeClass) ? this.tab.filter("." + this.activeClass) : this.tab.first();
    var $initialHash = this.tab.filter("["+ this.filter +"='"+ this.hash.replace("!", "") +"']");

    if($initialHash.length){
      this.navigateTo($initialHash);
    } else {
      this.navigateTo($first);
    }
  };

  Tabs.prototype.hashChange = function(selector){
    if(!this.changeUrls){ return; };
    location.replace("#!" + this.getSelector(selector).replace(/#/, ""));
  };

  Tabs.prototype.navigateTo = function(activeSelector){
    var selector = this.getSelector(activeSelector),
        $selected = $(this.getSelector(activeSelector));

    this.tab.removeClass(this.activeClass).end();
    this.tab.filter("["+ this.filter +"='"+ selector +"']").addClass(this.activeClass);

    $selected
      .siblings("." + this.activeClass).removeClass(this.activeClass).end()
      .addClass(this.activeClass);

    if(activeSelector.parent().hasClass("us-tab-title")){
      this.accordionScroll($selected);
    };
  };

  Tabs.prototype.getSelector = function(clicked){
    return clicked.data("target") || clicked.attr("href");
  };
 
  Tabs.prototype.accordionScroll = function(activeTab){
    setTimeout(function(){
      $("html, body").stop().animate({
        scrollTop: activeTab.offset().top
      }, 300)
    },10);
  };

  return Tabs;

})(this);