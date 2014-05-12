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
    return unless window.uSwitch.modernBrowser
    {@target} = @options = setOptions options, @defaults
    return if @target is null
    {@content, @arrow, @anchor} = @create()
    @setEvents(@anchor)
    @watchWindow(@arrow)

  setEvents: (anchor) ->
    toggle = (event) =>
      if not @isOpen()
        @show(anchor)
      else
        @hide(anchor)
      event.preventDefault()

    hide = (event) =>
      return if not @isOpen()
      if event.target is anchor or anchor.contains(event.target) 
        return
      if event.target is @target or @target.contains(event.target)
        return

      @hide(anchor)

    @target.addEventListener @options.openEvent, toggle, false
    document.addEventListener @options.openEvent, hide, false

  show: (anchor) ->
    @options.onOpen?.call()
    addClass(anchor, @options.activeClass)
    setTimeout =>
      addClass anchor, @options.afterOpenClass
    @setPosition(getYBounds(@target, @arrow))

  hide: (anchor) ->
    @options.onClose?.call()
    removeClass(anchor, @options.activeClass)
    removeClass(anchor, @options.afterOpenClass)

  isOpen: ->
    hasClass @anchor, @options.activeClass

  create: (options) ->
    # Arrow
    arrow = document.createElement "div"
    arrowInner = document.createElement "div"
    arrow.appendChild arrowInner
    addClass arrowInner, "us-anchor__arrow-inner"
    addClass arrow, "us-anchor__arrow"

    # Content
    content = document.createElement "div"
    addClass content, @options.anchorContentClass
    content.appendChild @options.content
    content.appendChild arrow

    # Container
    anchor = document.createElement "div"
    addClass anchor, @options.anchorClass

    anchorCcss = anchor.style
    anchorCcss.position = 'absolute'
    anchorCcss.zIndex = '9999'
    anchorCcss.top = '0px'
    anchorCcss.left = '0px'
    anchor.appendChild content

    addClass document.documentElement, @options.readyClass
    document.body.appendChild anchor unless anchor.parentNode

    {content, arrow, anchor}
    
  setPosition: (bottomOffset) -> 
    leftOffset = getXBounds(@target, @anchor, @arrow)
   
    style = "translateX(#{Math.round leftOffset}px) translateY(#{Math.round bottomOffset}px)"
    style += " translateZ(0)" unless  transformKey is 'msTransform'

    @anchor.style[transformKey]= style

    targetBounds = @target.getBoundingClientRect()
    leftPos = (targetBounds.left - @anchor.getBoundingClientRect().left) + (@target.offsetWidth/2)

    @arrow.style.left = "#{leftPos}px"
    @content.style["#{transformKey}Origin"] = "#{leftPos}px -12px"

  getXBounds = (target, anchor, arrow) ->
    targetPosition = target.getBoundingClientRect()

    if document.body.offsetWidth < (targetPosition.left + (anchor.offsetWidth / 2) + (target.offsetWidth/2))
      document.body.offsetWidth - anchor.offsetWidth
    else if (anchor.offsetWidth/2 - arrow.offsetWidth) > targetPosition.left
      0
    else
      targetPosition.left - (anchor.offsetWidth / 2) + (target.offsetWidth/2)

  getYBounds = (target, arrow) ->
    targetPosition = target.getBoundingClientRect()
    targetPosition.top + arrow.offsetHeight + target.offsetHeight

  watchWindow: (arrow) ->
    for event in ['resize', 'scroll', 'touchmove']
      window.addEventListener event, (event) =>
        now = +new Date
        throttle = 16
        maxWait = throttle * 3

        if not timer
          if event.type isnt "scroll"
            bottomOffset = getYBounds(@target, arrow)
          else
            bottomOffset = @initialBottomOffset
          if now - lastFired > maxWait
            @setPosition(bottomOffset)
            lastFired = now

          timer = setTimeout (o) =>
            timer = null
            lastFired = +new Date
            @setPosition(bottomOffset)
          , throttle

  window.Anchor = Anchor