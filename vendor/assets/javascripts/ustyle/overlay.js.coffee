{setOptions} = @Utils

class window.Overlay
  defaults =
    bodyActiveClass: 'overlay--open'
    visibleClass:    'us-overlay-parent--visible'
    activeClass:     'us-overlay-parent--active'
    overlay:         $('.us-overlay-parent')
    openButton:      '.js-open-overlay'
    closeButton:     '.js-close-overlay'
    escapeKey:       27
    historyStatus:   '#seedeal'
    history:         true
    resetScroll:     true
    preventDefault:  true

  constructor: (options) ->
    {@overlay} = @options = setOptions options, defaults
    @addEventListeners()

  addEventListeners: ->
    $(@options.openButton).on 'click.open-overlay', (e)=>
      if @options.preventDefault
        e.preventDefault()

      @show(e)

    @overlay.on 'click.close-overlay', (e)=>
      targets = [@overlay[0], @overlay.find(@options.closeButton)[0]]

      if @options.preventDefault
        e.preventDefault()

      for target in targets
        if e.target is target
          @hide(e)
          break

    $(document).on 'keyup.close-overlay', (e)=>
      if e.keyCode == @options.escapeKey
        @hide()

    if @hasHistory()
      window.onpopstate = (event)=>
        @hide()

  show: (e)->
    body = $(document.body)
    that = @

    body.addClass @options.bodyActiveClass

    Backdrop.retain()

    Utils.addClass @overlay[0], @options.visibleClass

    Utils.requestAnimationFrame ->
      Utils.addClass that.overlay[0], that.options.activeClass

    @options.onOpen?(e)

    if @options.resetScroll
      @overlay.find('.us-overlay__container').scrollTop(0)
    if @hasHistory()
      history.pushState('open', window.document.title, @options.historyStatus)

  hide: (e)->
    body = $(document.body)
    that = @

    body.removeClass @options.bodyActiveClass

    Backdrop.release()

    Utils.requestAnimationFrame ->
      Utils.removeClass that.overlay[0], that.options.activeClass

      setTimeout ->
        Utils.removeClass that.overlay[0], that.options.visibleClass
      , 300

    @options.onClose?(e)

    if @hasHistory()
      if history.state is 'open'
        history.back()

  hasHistory: ->
    if @options.history && uSwitch.hasHistory then true else false
