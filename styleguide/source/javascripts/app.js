hljs.initHighlightingOnLoad();

;(function(document, $) {

  function Styleguide(){
    setupNav();
    setupAnchors();
    setupTables();
    setupTabs();
  };

  var setupNav = function(){
    var logo = document.getElementById("logo");
    var activeClass = "nav--opened";

    logo.addEventListener("click", function(e){
      menuOpen(e, activeClass);
    }, false);

  };

  var menuOpen = function(elem, activeClass){
    if(document.body.className.indexOf(activeClass) != -1){
      document.body.className = document.body.className.replace(activeClass, "");
    } else {
      document.body.className += " " + activeClass; 
    }
    elem.preventDefault();
  };

  var setupAnchors = function(){
    var exampleAnchor = new Anchor({
      target: document.querySelector(".example-anchor"),
      content: document.querySelector(".example-anchor__target")
    });
  };

  var setupTables = function(){
    $('.js-sortable').tableSort();
  };

  var setupTabs = function(){
    var tabs = new Tabs();
  };

  return new Styleguide();

})(document, $);