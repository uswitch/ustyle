var uSwitch = uSwitch || {};

uSwitch.buttons = (function($){

  var init = function() {
    initButtonSpinners();
  }

  var initButtonSpinners = function() {
    // we're only maintaining this for transitions capable browsers
    if (!Modernizr.csstransitions)
      return;
    // jquery method to add the spinner DOM to a button
    $.fn.addButtonSpinner = function() {
      var elArray = this;
      var elArrayLength = elArray.length;
      var $el = false;
      for( var i=0 ; i < elArrayLength ; i++) {
        $el = $(elArray[i]);
        if ($el.prop("tagName").toUpperCase() == 'INPUT')
          continue;
        if ($el.find('.us-btn__loader--inner').length)
          continue;
        $el.html("<span class='us-btn__loader--inner'>" + $el.html() + "</span>");
      }
    }
    // on page ready, prep any required buttons with spinners
    $(".js-us-btn__loader").addButtonSpinner();
    // on click event
    $(document).on('click','.js-us-btn__loader',function initButtonSpinnersClick(ev) {
      //ev.preventDefault();
      var $this = $(this);
      if (!$this.find('.us-btn__loader--inner').length) { // here just specifically for ajaxed-in buttons that missed out on the
        $this.addButtonSpinner();
      }
      if (!$this.hasClass('us-btn__loader--go')) {
        showButtonSpinner($this);
      }
    });
    // back button on iOS just shows the last cached page state (ie, the spinner in the button, post click). This hack clears it.
    (function() {
      if ((/iphone|ipod|ipad/gi).test(navigator.appVersion)) {
        window.onpageshow = function(evt) {
          if (evt.persisted) {
            document.body.style.display = "none";
            clearAllButtonSpinners();
            document.body.style.display = "block";
          }
        };
      }
    })();
  }

  var showButtonSpinner = function($el) {
    $el.addClass('us-btn__loader--go');
  }

  var clearButtonSpinner = function($el) {
    $el.removeClass('us-btn__loader--go');
  }

  var clearAllButtonSpinners = function() {
    $('.js-us-btn__loader').removeClass('us-btn__loader--go');
  }

  $(init);

  return {
    initButtonSpinners: initButtonSpinners,
    showButtonSpinner: showButtonSpinner,
    clearButtonSpinner: clearButtonSpinner,
    clearAllButtonSpinners: clearAllButtonSpinners
  };

}(jQuery));