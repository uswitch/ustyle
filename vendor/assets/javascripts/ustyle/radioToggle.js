window.RadioToggle = (function() {
  var defaults;

  defaults = {
    $target: $(".us-toggle")
  };

  function RadioToggle(options) {
    this.options = Utils.setOptions(options, defaults);
    if (this.options.$target) {
      this.addEventListeners();
    } else {
      throw new Error("No target defined");
    }
  }

  RadioToggle.prototype.addEventListeners = function() {
    return this.options.$target.on("change", "input:radio", function(e) {
      $("input[name='" + this.name + "']").removeClass("checked");
      if (this.checked) {
        $(this).addClass("checked");
      }

      return e.stopPropagation();
    });
  };

  return RadioToggle;

})();
