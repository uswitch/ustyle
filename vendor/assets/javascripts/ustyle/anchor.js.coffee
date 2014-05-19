# This is a naive implementation of Tether by Hubspot.

{addClass, removeClass, hasClass, merge, setOptions, transformKey} = @Utils

createContext = (options) ->
  class Anchor

    defaults:
      target: document.querySelector('[data-utarget]')
      classPrefix: "us-anchor"
      openEvent: "click"
      showClose: true

    constructor: (options) ->
      return unless window.uSwitch.modernBrowser
      {@target, @classPrefix} = @options = setOptions options, @defaults
      return if @target is null
      @closeTargets = [document]
      {@anchor, @arrow, @content} = @create()
      @setEvents(@anchor)
      @watchWindow()

    setEvents: (anchor) ->
      toggle = (event) =>
        if not @isOpen()
          @show(anchor)
        else
          @hide(anchor)

        event.preventDefault()

      hide = (event) =>
        return if not @isOpen()

        if event.target in @closeTargets
          @hide(anchor)
          event.preventDefault()

        return if event.target is anchor or anchor.contains(event.target)
        return if event.target is @target or @target.contains(event.target)

        @hide(anchor)

      @target.addEventListener @options.openEvent, toggle, false

      for closeTarget in @closeTargets
        closeTarget.addEventListener @options.openEvent, hide, false

    show: (anchor) ->
      @content.appendChild @options.content
      document.body.appendChild anchor unless anchor.parentNode

      addClass anchor, "#{@classPrefix}--open"
      setTimeout =>
        addClass anchor, "#{@classPrefix}--after-open"

      @setPosition()
      # Callback
      @options.onOpen?.call()

    hide: (anchor) ->
      removeClass anchor, "#{@classPrefix}--open"
      removeClass anchor, "#{@classPrefix}--after-open"
      # Callback
      @options.onClose?.call()

    isOpen: ->
      hasClass @anchor, "#{@classPrefix}--open"

    create: (options) ->
      # Content
      content = document.createElement "div"
      addClass content, "#{@classPrefix}__content"

      # Arrow
      arrow = document.createElement "div"
      arrowInner = document.createElement "div"
      arrow.appendChild arrowInner
      addClass arrowInner, "#{@classPrefix}__arrow-inner"
      addClass arrow, "#{@classPrefix}__arrow"
      content.appendChild arrow

      # Close element
      if @options.showClose
        closeButton = document.createElement "a"
        closeButton.href = "#"
        addClass closeButton, "#{@classPrefix}__close-button"
        content.appendChild closeButton
        @closeTargets.push closeButton

      # Container
      anchor = document.createElement "div"
      addClass anchor, @classPrefix

      anchorCss = anchor.style
      anchorCss.position = 'absolute'
      anchorCss.zIndex = '9999'
      anchorCss.top = '0px'
      anchorCss.left = '0px'
      anchor.appendChild content

      addClass document.documentElement, "#{@classPrefix}--ready"

      {anchor, arrow, content}
      
    setPosition: ->
      leftOffset = getXBounds(@target, @anchor, @arrow)
      targetBounds = @target.getBoundingClientRect()

      if documentYBoundary(targetBounds, @anchor)
        addClass @anchor, "#{@classPrefix}--bottom"
        removeClass @anchor, "#{@classPrefix}--top"
        transformYOrigin = "calc(100% + 12px)"
        bottomOffset = getYBounds(@target, @anchor, @arrow)
      else
        addClass @anchor, "#{@classPrefix}--top"
        removeClass @anchor, "#{@classPrefix}--bottom"
        transformYOrigin = "-12px"
        bottomOffset = getYBounds(@target, @anchor, @arrow)

      style = "translateX(#{Math.round leftOffset}px) translateY(#{Math.round bottomOffset}px)"
      style += " translateZ(0)" unless  transformKey is 'msTransform'

      @anchor.style[transformKey] = style

      transformXOrigin = (targetBounds.left - @anchor.getBoundingClientRect().left) + (@target.offsetWidth/2)

      @arrow.style.left = "#{transformXOrigin}px"
      @content.style["#{transformKey}Origin"] = "#{transformXOrigin}px #{transformYOrigin}"

    getXBounds = (target, anchor, arrow) ->
      targetBounds = target.getBoundingClientRect()

      if document.body.offsetWidth < (targetBounds.left + (anchor.offsetWidth / 2) + (target.offsetWidth/2))
        document.body.offsetWidth - anchor.offsetWidth
      else if (anchor.offsetWidth/2 - arrow.offsetWidth) > targetBounds.left
        0
      else
        targetBounds.left - (anchor.offsetWidth / 2) + (target.offsetWidth/2)

    getYBounds = (target, anchor, arrow) ->
      targetBounds = target.getBoundingClientRect()

      if documentYBoundary(targetBounds, anchor)
        targetBounds.top - (anchor.offsetHeight - window.scrollY) + arrow.offsetHeight - target.offsetHeight
      else
        targetBounds.top + arrow.offsetHeight + target.offsetHeight + window.scrollY

    documentYBoundary = (target, anchor) ->
      return if target.top < anchor.offsetHeight
      (window.innerHeight - target.top) < anchor.offsetHeight

    watchWindow: ->
      for event in ['resize', 'scroll', 'touchmove']
        window.addEventListener event, (event) =>
          return unless @isOpen()
          now = +new Date
          throttle = 16
          maxWait = throttle * 3

          if not timer
            if now - lastFired > maxWait
              @setPosition()
              lastFired = now

            timer = setTimeout (o) =>
              timer = null
              lastFired = +new Date
              @setPosition()
            , throttle

    Anchor

window.Anchor = createContext()