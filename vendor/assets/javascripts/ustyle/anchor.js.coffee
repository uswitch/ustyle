# This is a naive implementation of Tether by Hubspot.

{addClass, removeClass, hasClass, merge, setOptions, transformKey} = @Utils

class Anchor

  defaults:
    target: document.querySelector('[data-utarget]')
    anchorClass: "us-anchor"
    openEvent: "click"
    anchorContentClass: "us-anchor__content"
    activeClass: "us-anchor--open"
    hiddenClass: "us-anchor--closed"
    readyClass: "us-anchor--ready"
    afterOpenClass: "us-anchor--after-open"

  constructor: (options) ->
    @options = setOptions options, @defaults
    return if @options.target is null or not window.uSwitch.modernBrowser
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

      if event.target is @anchor or @anchor.contains(event.target)
        return
      if event.target is @options.target or @options.target.contains(event.target)
        return

      @hide()

    @options.target.addEventListener @options.openEvent, showHandler, false
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
    unless @anchor.parentNode
      document.body.appendChild @anchor
    addClass(@anchor, @options.activeClass)
    setTimeout =>
      addClass @anchor, @options.afterOpenClass
    @stick()
    @options.onOpen?.call()
    @cssWrite = false
    @isOpen = true

  hide: ->
    return unless @isOpen
    @isOpen = false
    @options.onClose?.call()
    removeClass(@anchor, @options.activeClass)
    removeClass(@anchor, @options.afterOpenClass)

  create: ->
    # Container
    @anchor = document.createElement "div"
    addClass @anchor, @options.anchorClass
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
    # We attach the content on the stick so that we allow for several anchor to contain
    # the same content
    @content.appendChild @options.content
    @anchor.appendChild @content

    @targetPosition = @options.target.getBoundingClientRect()
    css = @anchor.style

    unless @cssWrite  
      css.position = 'absolute'
      css.zIndex = '9999'
      css.top = '0px'
      css.left = '0px'
      cssWrite = true

    if document.body.offsetWidth < (@targetPosition.left + (@anchor.offsetWidth / 2) + (@options.target.offsetWidth/2))
      leftOffset = document.body.offsetWidth - @anchor.offsetWidth
    else if @anchor.offsetWidth/2 > @targetPosition.left
      leftOffset = 0
    else
      leftOffset = @targetPosition.left - (@anchor.offsetWidth / 2) + (@options.target.offsetWidth/2)

    bottomOffset = @targetPosition.bottom + @arrow.offsetHeight
    
    css[transformKey] = "translateX(#{Math.round leftOffset}px) translateY(#{Math.round bottomOffset}px)"

    if transformKey isnt 'msTransform'
        css[transformKey] += " translateZ(0)"

    @centreArrow()
    @setTransformOrigin()

  centreArrow: ->
    @leftPos = (@targetPosition.left - @anchor.getBoundingClientRect().left) + (@options.target.offsetWidth/2)
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