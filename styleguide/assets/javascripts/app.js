(function(document, window, cleanWhiteSpace, gumshoe, $, Overlay, ClassToggler, Tabs, Anchor, RadioToggle){
  "use strict";

  function App(){
    gumshoe.init({
      activeClass: 'sidebar__nav-link--active',
      offset: 190
    });

    var toggleLinks = document.querySelectorAll(".js-toggle__link");

    for (var i = toggleLinks.length - 1; i >= 0; i--) {
      var toggleLink = toggleLinks[i];
      toggleLink.addEventListener("click", clickToggle, false);
    };

    cleanWhiteSpace(document.querySelectorAll('pre code'));

    var overlays = [];

    $(".js-open-overlay").each(function(e){
      overlays.push( 
        new Overlay({
          openButton: $(".js-open-overlay[modifier='"+$(this).attr('modifier')+"']"),
          overlay: $(".us-overlay-parent[modifier='"+$(this).attr('modifier')+"']")
        })
      )
    })

    var tooltips = new ClassToggler({
      containerClass: '.us-tooltip',
      $target: $('.us-tooltip__icon'),
      activeClass: "us-tooltip--active"
    });
    
    var tabs = new Tabs();
    var radio = new RadioToggle();
    var anchor = new Anchor({
      target: document.querySelector(".js-example-anchor"),
      content: document.querySelector(".js-example-anchor__target")
    });
  }

  function clickToggle(event){
    var toggleLink = this;
    var target = document.querySelector("." + toggleLink.getAttribute("data-target"));
    var targetActiveClass = getActiveClass(target);
    var activeClass = getActiveClass(toggleLink);
    toggleLink.classList.toggle(activeClass);
    target.classList.toggle(targetActiveClass);
  }

  function getActiveClass(selector){
    return selector.classList[0] + "--active";
  }

  return new App();

})(document, window, cleanWhiteSpace, gumshoe, $, Overlay, ClassToggler, Tabs, Anchor, RadioToggle);
