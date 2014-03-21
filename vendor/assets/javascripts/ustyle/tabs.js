var uSwitch = uSwitch || {};

uSwitch.tabs = (function($){

  var settings = {};

  settings.tab = $(".us-tabs").find(".us-tabs-nav a, .us-tab-title a");
  settings.filter = settings.tab.data("target") ? "data-target" : "href";
  settings.hash = window.location.hash;

  var init = function(){
    var $first = settings.tab.first();
    var $initialHash = settings.tab.filter("["+ settings.filter +"='"+ settings.hash.replace("!", "") +"']");

    if($initialHash.length){
      navigateTo($initialHash, settings);
    } else {
      navigateTo($first, settings);
    }
  };

  var hashChange = function(selector){
    location.replace("#!" + getSelector(selector).replace(/#/, ""));
  };

  var navigateTo = function(active, settings){
      var selector = getSelector(active),
          $selected = $(getSelector(active));

      settings.tab.removeClass("active").end();
      settings.tab.filter("["+ settings.filter +"='"+ selector +"']").addClass("active");

      $selected
        .siblings(".active").removeClass("active").end()
        .addClass("active");

      if(active.parent().hasClass("us-tab-title")){
        accordionScroll($selected);
      };
  };

  var getSelector = function(clicked){
    return clicked.data("target") || clicked.attr("href");
  };

  var accordionScroll = function(activeTab){
    setTimeout(function(){
      $("html, body").stop().animate({
        scrollTop: activeTab.offset().top
      }, 300)
    },10)

  };

  init();

  $(document).on("click.ustyle.tab", ".us-tabs .us-tabs-nav a, .us-tabs .us-tab-title a", function(e){
    e.preventDefault();
    navigateTo($(this), settings);
    hashChange($(this));
  });

})($);
