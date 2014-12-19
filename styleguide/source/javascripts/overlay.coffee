$ ->
  window.overlayExamples = []

  $("#overlay .modifier-block").each ->
    window.overlayExamples.push new Overlay
      container:   $(this).find(".us-overlay-parent")
      openButton:  $(this).find(".js-open-overlay")
      closeButton: $(this).find(".js-close-overlay")
      onOpen: ->
        console.log 123
  
  # button toggle just to show how it can look as a modal:
  $("#overlay .modifier-block").on 'click', (e)->
    if $(e.target).hasClass 'js-turn-into-modal'
      if $(e.delegateTarget).find(".us-overlay-parent").hasClass "us-overlay-modal-parent"
        $(e.delegateTarget).find(".us-overlay-parent").removeClass "us-overlay-modal-parent"
      else
        $(e.delegateTarget).find(".us-overlay-parent").addClass "us-overlay-modal-parent"
