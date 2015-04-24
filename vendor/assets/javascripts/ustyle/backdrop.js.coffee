class Backdrop
  backdrop = $('<div class="us-backdrop">')
  holds = 0

  constructor: ->
    document.body.appendChild backdrop[0]

  element: backdrop

  retain: ->
    if ++holds is 1
      backdrop.addClass 'us-backdrop--visible'

  release: ->
    if --holds is 0
      backdrop.removeClass 'us-backdrop--visible'

  window.Backdrop = new @
