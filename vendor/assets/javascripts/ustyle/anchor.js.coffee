# This is a naive implementation of Tether by Hubspot.

{addClass, removeClass, hasClass, merge} = @Utils

class Anchor

  transformKey = do ->
    el = document.createElement 'div'
    for key in ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']
      if el.style[key] isnt undefined
        return key

  defaults:
    anchor: document.querySelector('[data-utarget]')
    anchorClass: "us-anchor"
    openEvent: "click"
    anchorContentClass: "us-anchor__content"
    activeClass: "us-anchor--open"
    hiddenClass: "us-anchor--closed"
    readyClass: "us-anchor--ready"

  constructor: (options) ->
    @setOptions options
    return if @options.anchor is null or not window.uSwitch.modernBrowser
    @isOpen = false
    @create()
    @setEvents()
    @watchWindow()

  setOptions: (options) ->
    @options = merge {}, @defaults, options
    this

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
    addClass(@anchorElem, @options.activeClass)
    @stick()
    @options.onOpen?.call()
    @cssWrite = false
    @isOpen = true

  hide: ->
    return unless @isOpen
    @isOpen = false
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
    @anchorElem.appendChild @arrow
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

  centreArrow: ->
    leftPos = (@targetPosition.left - @anchorElem.getBoundingClientRect().left) + (@options.anchor.offsetWidth/2)
    css = @arrow.style
    css.left = "#{leftPos}px"

  watchWindow: ->
    for event in ['resize', 'scroll']
      window.addEventListener event, (e) => 
        return unless @isOpen
        @stick()

  window.Anchor = Anchor