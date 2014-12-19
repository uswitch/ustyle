class window.Overlay
  constructor: (userSettings) ->
    @settings = 
      openedClass:   'us-overlay--open'
      container:   $('.us-overlay-parent')
      openButton:  $('.js-open-overlay')
      closeButton: $('.js-close-overlay')
      # FIND ALL THINGS

    $.extend @settings, userSettings
    addEventListeners @settings, this
 
  addEventListeners= (settings,klass)->
    settings.openButton.on 'click', (e)=>
      klass.openOverlay()
    
    settings.closeButton.on 'click', (e)=>
      klass.closeOverlay()
    
  openOverlay: ->
    @settings.container.addClass @settings.openedClass
    @settings.onOpen?()

  closeOverlay: ->
    @settings.container.removeClass @settings.openedClass
    @settings.onClose?()