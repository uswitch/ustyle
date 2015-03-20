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
      $togglableElement = if @options.containerClass then $(e.target).parent(@options.containerClass) else $(e.delegateTarget) 

      if @isActive $togglableElement
        @hide $togglableElement,e
      else
        @show $togglableElement,e
  
  isActive: ($target)->
    $target.hasClass @options.activeClass

  show: ($container,e)->
    @options.onShow?($container,e)
    $container.addClass @options.activeClass

  hide: ($container,e)->
    @options.onHide?($container,e)
    $container.removeClass @options.activeClass