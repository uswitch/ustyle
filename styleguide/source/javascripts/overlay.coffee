$("#overlay .modifier-block").on 'click', (e)->
  if $(e.target).hasClass('js-open-overlay')
    $(e.delegateTarget).find(".us-overlay-parent").addClass "us-overlay--open"

  if $(e.target).hasClass('js-close-overlay')
    $(e.delegateTarget).find(".us-overlay-parent").removeClass "us-overlay--open"

  if $(e.target).hasClass('js-turn-into-modal')
    if $(e.delegateTarget).find(".us-overlay-parent").hasClass "us-overlay-modal-parent"
      $(e.delegateTarget).find(".us-overlay-parent").removeClass "us-overlay-modal-parent"
    else
      $(e.delegateTarget).find(".us-overlay-parent").addClass "us-overlay-modal-parent"