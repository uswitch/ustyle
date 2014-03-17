hljs.initHighlightingOnLoad();

var uSwitch = uSwitch || {};

uSwitch.styleguide = (function(){

  var init = function(){
    setupNav();
    $('.js-sortable').tableSort();
  };

  var setupNav = function(){
    var logo = document.getElementById("logo");
    var activeClass = "open-menu";

    logo.addEventListener("click", function(e){

      if(document.body.className.indexOf(activeClass) != -1){
        document.body.className = document.body.className.replace(activeClass, "");
      } else {
        document.body.className += " " + activeClass; 
      }
      e.preventDefault();
    }, false);

  };

  init();

})();