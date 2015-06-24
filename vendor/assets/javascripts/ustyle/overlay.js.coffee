{setOptions} = @Utils

class window.Overlay
  defaults =
    bodyActiveClass: 'overlay--open'
    activeClass:     'us-overlay-parent--active'
    visibleClass:    'us-overlay-parent--visible'
    overlay:         $('.us-overlay-parent')
    openButton:      '.js-open-overlay'
    closeButton:     '.js-close-overlay'
    historyStatus:   '#seedeal'
    history:         true
    preventDefault:  true

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
        @hide(e)

  show: (e) ->
    that = @

    $(document.body).addClass @options.bodyActiveClass

    @backdrop.retain()

    Utils.addClass @overlay[0], @options.visibleClass

    Utils.requestAnimationFrame ->
      Utils.addClass that.overlay[0], that.options.activeClass

    @options.onOpen?(e)

    if @hasHistory()
      history.pushState('open', window.document.title, @options.historyStatus)

  hide: (e) ->
    that = @

    $(document.body).removeClass @options.bodyActiveClass

    @backdrop.release()

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
