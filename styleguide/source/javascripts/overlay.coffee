$("#open-left-overlay").on 'click', ->
  $("#overlay").addClass "overlay--opened"
  $("#overlay__back-layer").on 'click', ->
    $("#overlay").removeClass "overlay--opened"

$("#open-right-overlay").on 'click', ->
  $("#overlay--right").addClass "overlay--opened"
  $("#overlay--right__back-layer").on 'click', ->
    $("#overlay--right").removeClass "overlay--opened"

$("#open-modal-overlay").on 'click', ->
  $("#overlay--modal").addClass "overlay--opened"
  $("#overlay--modal__back-layer").on 'click', ->
    $("#overlay--modal").removeClass "overlay--opened"