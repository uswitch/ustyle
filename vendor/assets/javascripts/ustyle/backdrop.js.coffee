class Backdrop
  backdrop = null
  holds = 0

  constructor: ->
    backdrop = document.createElement('div')
    Utils.addClass backdrop, 'us-backdrop'
    document.body.appendChild backdrop

  element: backdrop

  retain: ->
    if ++holds is 1
      Utils.addClass backdrop, 'us-backdrop--visible'

  release: ->
    if --holds is 0
      Utils.removeClass backdrop, 'us-backdrop--visible'

  window.Backdrop = new @
