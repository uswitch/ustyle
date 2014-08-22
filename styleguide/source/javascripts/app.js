hljs.initHighlightingOnLoad();

var uSwitch = uSwitch || {};

uSwitch.styleguide = (function(root){

  function init(){
    setupNav();
    setupAnchors();
    $('.js-sortable').tableSort();
  }

  var setupNav = function(){
    var logo = document.getElementById("logo");
    var contentOverlay = document.getElementsByClassName("content__overlay");
    var activeClass = "open-menu";

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

  root.init = init();

})(this);

var tabs = new Tabs();