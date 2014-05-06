# This is a naive implementation of Tether by Hubspot.

{addClass, removeClass, hasClass, merge, setOptions, transformKey} = @Utils

class Anchor

  defaults:
    anchor: document.querySelector('[data-utarget]')
    anchorClass: "us-anchor"
    openEvent: "click"
    anchorContentClass: "us-anchor__content"
    activeClass: "us-anchor--open"
    hiddenClass: "us-anchor--closed"
    readyClass: "us-anchor--ready"

  constructor: (options) ->
    @options = setOptions options, @defaults
    return if @options.anchor is null or not window.uSwitch.modernBrowser
    @isOpen = false
    @create()
    @setEvents()
    @watchWindow()

  setEvents: ->
    showHandler = (event) =>
      @toggle()
      event.preventDefault()

    hideHandler = (event) =>
      return unless @isOpen

      if event.target is @anchorElem or @anchorElem.contains(event.target)
        return
      if event.target is @options.anchor or @options.anchor.contains(event.target)
        return

      @hide()

    @options.anchor.addEventListener @options.openEvent, showHandler, false
    document.addEventListener @options.openEvent, hideHandler, false

  toggle: ->
    if not @isOpen
      @show()
    else
      @hide()

  isEnabled: ->
    hasClass document.documentElement, @options.readyClass

  show: ->
    return if @isOpen
    unless @anchorElem.parentNode
      document.body.appendChild @anchorElem
    removeClass(@anchorElem, @options.hiddenClass)
    addClass(@anchorElem, @options.activeClass)
    @stick()
    @options.onOpen?.call()
    @cssWrite = false
    @isOpen = true

  hide: ->
    return unless @isOpen
    @isOpen = false
    @options.onClose?.call()
    removeClass(@anchorElem, @options.activeClass)
    addClass(@anchorElem, @options.hiddenClass)

  create: ->
    # Container
    @anchorElem = document.createElement "div"
    addClass @anchorElem, @options.anchorClass
    # Content
    @content = document.createElement "div"
    addClass @content, @options.anchorContentClass
    # Arrow
    @arrow = document.createElement "div"
    arrowInner = document.createElement "div"
    @arrow.appendChild arrowInner
    addClass arrowInner, "us-anchor__arrow-inner"
    addClass @arrow, "us-anchor__arrow"
    @content.appendChild @arrow
    addClass document.documentElement, @options.readyClass

  stick: -> 
    @content.appendChild @options.content
    @anchorElem.appendChild @content
    @targetPosition = @options.anchor.getBoundingClientRect()
    css = @anchorElem.style
    unless @cssWrite  
      css.position = 'absolute'
      css.zIndex = '9999'
      css.top = '0px'
      css.left = '0px'
      cssWrite = true

    if document.body.offsetWidth < (@targetPosition.left + (@anchorElem.offsetWidth / 2) + (@options.anchor.offsetWidth/2))
      leftPosition = document.body.offsetWidth - @anchorElem.offsetWidth
    else
      leftPosition = @targetPosition.left - (@anchorElem.offsetWidth / 2) + (@options.anchor.offsetWidth/2)

    css[transformKey] = "translateX(#{leftPosition}px) translateY(#{@targetPosition.bottom + @arrow.offsetHeight}px)"

    if transformKey isnt 'msTransform'
        css[transformKey] += " translateZ(0)"

    @centreArrow()
    @setTransformOrigin()

  centreArrow: ->
    @leftPos = (@targetPosition.left - @anchorElem.getBoundingClientRect().left) + (@options.anchor.offsetWidth/2)
    css = @arrow.style
    css.left = "#{@leftPos}px"

  setTransformOrigin: ->
    css = @content.style
    css["#{transformKey}Origin"] = "#{@leftPos}px -12px"

  watchWindow: ->
    for event in ['resize', 'scroll', 'touchmove']
      window.addEventListener event, (e) => 
        return unless @isOpen
        @stick()

  window.Anchor = Anchor