{setOptions} = @Utils

class window.Overlay
  defaults =
    bodyOpenedClass: 'overlay--open'
    openedClass:     'us-overlay--open'
    overlay:         $('.us-overlay-parent')
    openButton:      $('.js-open-overlay')
    closeButton:     $('.js-close-overlay')
    escapeKey:       27
    historyStatus:   '#seedeal'
    history:         true
    resetScroll:     true
    preventDefault:  true

  constructor: (options) ->
    {@overlay} = @options = setOptions options, defaults
    @addEventListeners()

  addEventListeners: ->
    @options.openButton.on 'click', (e)=>
      if @options.preventDefault
        e.preventDefault()

      @show(e)

    @options.closeButton.on 'click', (e)=>
      if @options.preventDefault
        e.preventDefault()

      @hide(e)

    @overlay.on 'click', (e)=>
      if @options.preventDefault
        e.preventDefault()

      if e.target is @overlay[0]
        @hide(e)

    $(document).on 'keyup', (e)=>
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
