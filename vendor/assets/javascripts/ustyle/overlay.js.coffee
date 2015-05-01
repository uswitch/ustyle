{setOptions} = @Utils

class window.Overlay
  defaults =
    bodyOpenedClass: 'overlay--open'
    openedClass:     'us-overlay--open'
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

    body.addClass @options.bodyOpenedClass

    Backdrop.retain()

    @overlay.addClass @options.openedClass
    @options.onOpen?(e)

    if @options.resetScroll
      @overlay.find('.us-overlay__container').scrollTop(0)
    if @hasHistory()
      history.pushState('open', window.document.title, @options.historyStatus)

  hide: (e)->
    body = $(document.body)

    body.removeClass @options.bodyOpenedClass

    Backdrop.release()

    @overlay.removeClass @options.openedClass
    @options.onClose?(e)

    if @hasHistory()
      if history.state is 'open'
        history.back()

  hasHistory: ->
    if @options.history && uSwitch.hasHistory then true else false
