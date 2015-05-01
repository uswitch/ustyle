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

      Utils.requestAnimationFrame ->
        Utils.addClass backdrop, 'us-backdrop--active'

  release: ->
    if --holds is 0
      Utils.requestAnimationFrame ->
        Utils.removeClass backdrop, 'us-backdrop--active'

        setTimeout ->
          Utils.removeClass backdrop, 'us-backdrop--visible'
        , 300

  window.Backdrop = new @
