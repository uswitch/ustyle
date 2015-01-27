{setOptions} =  @Utils

class window.Overlay
  defaults = 
    openedClass:    'us-overlay--open'
    overlay:        $('.us-overlay-parent')
    openButton:     $('.js-open-overlay')
    closeButton:    $('.js-close-overlay')
    historyStatus:  '#seedeal'
    history:        true
    resetScroll:    true

  constructor: (options) ->
    {@overlay} = @options = setOptions options, defaults
    @addEventListeners()
 
  addEventListeners: ->
    @options.openButton.on 'click', (e)=>
      @show()
    @options.closeButton.on 'click', (e)=>
      @hide()
    if @hasHistory()  
      window.onpopstate = (event)=>
        @hide()
    
  show: ->
    @overlay.addClass @options.openedClass
    @options.onOpen?()
    
    if @options.resetScroll
      @overlay.find('.us-overlay__container').scrollTop(0)
    if @hasHistory()
      history.pushState('open', window.document.title, @options.historyStatus)

  hide: ->
    @overlay.removeClass @options.openedClass
    @options.onClose?()
    if @hasHistory()
      if history.state is 'open'
        history.back()

  hasHistory: ->
    if @options.history && uSwitch.hasHistory then true else false