class window.RadioToggle
  defaults =
    $target: $(".us-toggle")

  constructor: (options) ->
    @options = Utils.setOptions options, defaults
    if @options.$target
      @addEventListeners()
    else
      throw new Error("No target defined")

  addEventListeners: ->
    @options.$target.on "change", "input:radio", (e) ->
      $("input[name='#{this.name}']").removeClass("checked")
      $(this).addClass("checked") if this.checked
      e.stopPropagation()
