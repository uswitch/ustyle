(function ($) {

  $('.js-us-btn__loader').click(function() {
    $this = $(this);
    if ($this.hasClass("us-btn__loader--go")) {
      setTimeout(function(){
        $this.removeClass("us-btn__loader--go").attr("title","");
      },100);
    } else {
      $this.attr("title","Click to clear again");
    }
  });

}(jQuery));