(function(root, document, window){
  "use strict";

  function stickySidebar(){
    var elem = document.querySelector(".js-sticky");
    
    if (elem === null) return;

    var box = elem.getBoundingClientRect();
    var targetOffset = box.top + window.pageYOffset - document.documentElement.clientTop;

    _listenToScroll(targetOffset, elem);

    window.addEventListener("scroll", function(e){
      _listenToScroll(targetOffset, elem)
    });
  }

  function _listenToScroll(targetOffset, elem){
    var winTop = window.pageYOffset;
    if (targetOffset < winTop){
      elem.classList.add("sticky");
    } else {
      elem.classList.remove("sticky");
    }
  }

  return new stickySidebar();

})(this, document, window);
