(function(document, window, cleanWhiteSpace, $, Overlay, ClassToggler, Tabs, Anchor, RadioToggle){
  "use strict";

  function App(){

    var toggleLinks = document.querySelectorAll(".js-toggle__link");

    for (var i = toggleLinks.length - 1; i >= 0; i--) {
      var toggleLink = toggleLinks[i];
      toggleLink.addEventListener("click", clickToggle, false);
    };

    var sidebarNavLinks = document.querySelectorAll(".js-sidebar-nav-link");

    for (var i = sidebarNavLinks.length - 1; i >= 0; i--) {
      var sidebarNavLink = sidebarNavLinks[i];
      sidebarNavLink.addEventListener("click", sideBarToggle, false);
    };

    if(!$("html").hasClass("ie8")) {
      cleanWhiteSpace(document.querySelectorAll('pre code'));
    }

    var stickySidebar = function() {
      var $sidebar = $(".js-sticky");
      if(!$sidebar.length) return;
      var offset = $sidebar.offset();

      $(window).on("scroll", function(){
        var winTop = $(window).scrollTop();
        set(winTop);
      });

      function set(winTop){
        if (offset.top < winTop) {
          $sidebar.addClass("stuck");
        } else {
          $sidebar.removeClass("stuck");
        }
      }
    }

    stickySidebar();

    var overlays = [];

    $(".js-open-overlay").each(function(e){
      overlays.push(
        new Overlay({
          openButton: $(".js-open-overlay[modifier='"+$(this).attr('modifier')+"']"),
          overlay: $(".us-overlay-parent[modifier='"+$(this).attr('modifier')+"']")
        })
      )
    });

    var tooltips = new ClassToggler({
      containerClass: '.us-tooltip',
      $target: $('.us-tooltip__icon'),
      activeClass: "us-tooltip--active"
    });

    var tabs = new Tabs({collapsible: true, autoScroll: false});
    var radio = new RadioToggle();
    var anchor = new Anchor({
      target: document.querySelector(".js-example-anchor"),
      content: document.querySelector(".js-example-anchor__target")
    });
  }

  function clickToggle(event){
    var toggleLink = event.currentTarget;
    var target = document.querySelector("." + toggleLink.getAttribute("data-target"));
    var targetActiveClass = getActiveClass(target);
    var activeClass = getActiveClass(toggleLink);
    toggleLink.classList.toggle(activeClass);
    target.classList.toggle(targetActiveClass);
  }

  function sideBarToggle(event){
    event.preventDefault();
    var sidebarSubNav = event.currentTarget.parentElement;
    sidebarSubNav.classList.toggle("active");
  }

  function getActiveClass(selector){
    return selector.classList[0] + "--active";
  }

  return new App();

})(document, window, cleanWhiteSpace, $, Overlay, ClassToggler, Tabs, Anchor, RadioToggle);
