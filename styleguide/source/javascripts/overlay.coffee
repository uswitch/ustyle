$("#open-left-overlay").on 'click', ->
  $("#overlay").addClass "us-overlay--open"
  $("#overlay__back-layer, .us-overlay__close").on 'click', ->
    $("#overlay__back-layer, .us-overlay__close").off 'click'
    $("#overlay").removeClass "us-overlay--open"

$("#open-right-overlay").on 'click', ->
  $("#overlay--right").addClass "us-overlay--open"
  $("#overlay--right__back-layer, .us-overlay__close").on 'click', ->
    $("#overlay--right__back-layer, .us-overlay__close").off 'click'
    $("#overlay--right").removeClass "us-overlay--open"

$("#open-modal-overlay").on 'click', ->
  $("#overlay--modal").addClass "us-overlay--open"
  $("#overlay--modal__back-layer, .us-overlay__close").on 'click', ->
    $("#overlay--modal__back-layer, .us-overlay__close").off 'click'
    $("#overlay--modal").removeClass "us-overlay--open"