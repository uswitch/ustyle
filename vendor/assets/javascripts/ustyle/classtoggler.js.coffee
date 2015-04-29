class window.ClassToggler
  defaults = 
    containerClass: null
    $target: null
    activeClass: "active"
    inactiveClass: null
    toggleOn: 'click'

  constructor:(options) ->
    @options = Utils.setOptions options, defaults
    if @options.$target then @addEventListeners() else console.trace "ClassToggle", @options

  addEventListeners:->
    @options.$target.on @options.toggleOn, (e)=>
      $togglableElement = if @options.containerClass then $(e.target).closest(@options.containerClass) else $(e.delegateTarget) 

      if @isActive $togglableElement
        @hide $togglableElement,e
      else
        @show $togglableElement,e
  
  isActive: ($togglableElement)->
    $togglableElement.hasClass @options.activeClass

  show: ($togglableElement,e)->
    @options.onShow?($togglableElement,e)
    $togglableElement.addClass @options.activeClass

  hide: ($togglableElement,e)->
    @options.onHide?($togglableElement,e)
    $togglableElement.removeClass @options.activeClass
