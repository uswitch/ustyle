hljs.initHighlightingOnLoad();

var uSwitch = uSwitch || {};

uSwitch.styleguide = (function(root){

  function init(){
    setupNav();
    $('.js-sortable').tableSort();
  }

  var setupNav = function(){
    var logo = document.getElementById("logo");
    var contentOverlay = document.getElementsByClassName("content__overlay");
    var activeClass = "open-menu";

    logo.addEventListener("click", function(e){
      menuOpen(e, activeClass);
    }, false);

    contentOverlay[0].addEventListener("click", function(e){
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

  root.init = init();

})(this);

var tabs = new Tabs();