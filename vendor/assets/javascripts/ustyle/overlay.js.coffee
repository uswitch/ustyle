{setOptions, hasClass, addClass, removeClass, requestAnimationFrame} = @Utils

class window.Overlay
  defaults =
    bodyActiveClass: 'overlay--open'
    activeClass:     'us-overlay-parent--active'
    visibleClass:    'us-overlay-parent--visible'
    overlay:         $('.us-overlay-parent')
    openButton:      '.js-open-overlay'
    closeButton:     '.js-close-overlay'
    historyStatus:   '#seedeal'
    history:         false
    preventDefault:  true
    animationSpeed:  300

  constructor: (options) ->
    {@overlay} = @options = setOptions options, defaults
    if @overlay? and Backdrop?
      @backdrop = new Backdrop()
      @addEventListeners()
    else
      throw new Error("There's no overlay or you haven't included Backdrop")

  addEventListeners: ->
    $(@options.openButton).on 'click.open-overlay', (e) =>
      e.preventDefault() if @options.preventDefault
      @show(e)

    @overlay.on 'click.close-overlay', (e) =>
      targets = [
        @overlay[0],
        @overlay.find(@options.closeButton)[0]
      ]

      for target in targets
        if e.target is target
          e.preventDefault() if @options.preventDefault
          @hide(e)
          break

    if @hasHistory()
      window.onpopstate = (e) =>
        @hide(e) if @isOpen()

  show: (e) ->
    that = @

    $(document.body).addClass @options.bodyActiveClass

    @backdrop.retain()

    addClass @overlay[0], @options.visibleClass

    requestAnimationFrame ->
      addClass that.overlay[0], that.options.activeClass

      setTimeout ->
        that.options.onOpen?(e)
      , that.options.animationSpeed

    if @hasHistory()
      history.pushState('open', window.document.title, @options.historyStatus)

  hide: (e) ->
    that = @

    $(document.body).removeClass @options.bodyActiveClass

    @backdrop.release()

    requestAnimationFrame ->
      removeClass that.overlay[0], that.options.activeClass

      setTimeout ->
        removeClass that.overlay[0], that.options.visibleClass
        that.options.onClose?(e)
      , that.options.animationSpeed

    if @hasHistory()
      if history.state is 'open'
        history.back()

  isOpen: ->
    hasClass @overlay[0], @options.activeClass

  hasHistory: ->
    @options.history and window.history and window.history.pushState
