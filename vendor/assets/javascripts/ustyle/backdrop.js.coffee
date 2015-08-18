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
    holds++

    if holds is 1
      Utils.addClass backdrop, 'us-backdrop--visible'

      onFrame = ->
        if holds >= 1
          Utils.addClass backdrop, 'us-backdrop--active'

      Utils.requestAnimationFrame.call(window, onFrame)

  release: ->
    if holds is 1
      Utils.removeClass backdrop, 'us-backdrop--active'

      onFrame = ->
        setTimeout ->
          if holds is 0
            Utils.removeClass backdrop, 'us-backdrop--visible'
        , 300

      Utils.requestAnimationFrame.call(window, onFrame)

    holds = Math.max(0, holds - 1)
