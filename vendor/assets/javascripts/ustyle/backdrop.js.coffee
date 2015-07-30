class window.Backdrop
  backdrop = null
  holds = 0

  constructor: ->
    backdrop = document.querySelector('.us-backdrop')

    unless backdrop?
      backdrop = createBackdrop()

  element: backdrop

  createBackdrop = ->
    backdrop = document.createElement('div')
    Utils.addClass backdrop, 'us-backdrop'
    document.body.appendChild backdrop

  retain: ->
    if ++holds is 1
      Utils.addClass backdrop, 'us-backdrop--visible'

      onFrame = ->
        Utils.addClass backdrop, 'us-backdrop--active'

      Utils.requestAnimationFrame.call(window, onFrame)

  release: ->
    if --holds is 0
      onFrame = ->
        Utils.removeClass backdrop, 'us-backdrop--active'

        setTimeout ->
          Utils.removeClass backdrop, 'us-backdrop--visible'
        , 300

      Utils.requestAnimationFrame.call(window, onFrame);
