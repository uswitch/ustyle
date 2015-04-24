;(function(document, $, root){
  "use strict";

  function tabScroll(activeTab, container){
    this.activeTab = activeTab;
    this.container = container;

    var activeTabWidth = this.activeTab.width() + 15;
    var activeTabIndex = this.activeTab.index();
    var scrollLeftDistance = activeTabWidth * activeTabIndex;

    container.animate({
      scrollLeft: scrollLeftDistance
    })
  }

  root.tabScroll = tabScroll

  return tabScroll;

})(document, $, this);
