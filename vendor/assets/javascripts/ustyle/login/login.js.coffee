{addClass, merge, setOptions, deleteUndefined} = @Utils

createContext = (options) ->
  class Login

    defaults:
      origin: window.location.href
      target: document.querySelector('[data-utarget]')
      removeableClass: "us-login--removeable"
      state: "signin"

    constructor: (options) ->
      @options = setOptions options, @defaults
      return if @options.target is null

      @target = $(@options.target)

      @formData = 
        source: @target.data('source')
        origin: @target.data('origin') or @options.origin
        email: @target.data('email')
        opt_in: @target.data('opt-in') 

      deleteUndefined(@formData)

      @title = @target.data('title') or @options.title
      @description = @target.data('description')

      @content = @fetch()      

    setupAnchors: ->
      if @options.target.length > 1
        @anchorInstance(target) for target in @options.target
      else
        @anchorInstance(@options.target)
      
    anchorInstance: (target) ->
      @anchor = new Anchor
        target: target
        content: @content
        
        onOpen: =>
          @setContent()
          passwordHelp(@loginForm)
          @options.onOpen?.call()

        onClose: =>
          @options.onClose?.call()
          @resetForm()

    fetch: ->
      container = document.createElement 'div'
      addClass container, "us-anchor__target"
      addClass container, "us-login__target"

      jqxhr = $.ajax
        url: "#{window.uSwitch.Accounts.baseUrl}/signin-popup?#{$.param(@formData)}"
        dataType: 'jsonp'

      .done (html) =>
        $(container).append( html )
        @loginForm = $(container).find(".us-login__form")
        @loginContainer = $(container).find(".us-login")
        @setState()
        @setupAnchors()

      container

    setState: ->
      activeState = @loginForm.filter ".us-login__form--#{@options.state}"
      activeState.addClass "login-state--active"
      @toggle()

    toggle: ->
      $(document).on "click", ".login-state__toggle", (e) ->
        $currentState = $(this).parents(".us-login__form")
        $nextState = if $currentState.next().length then $currentState.next() else $currentState.prev()
        $nextState.addClass("login-state--active")
        $currentState.removeClass("login-state--active")

        e.preventDefault()

    setContent: ->
      return unless @title
      loginTitle = $("<h2 class='us-login__title #{@options.removeableClass}'>#{@title}</h2>")
      @loginContainer.prepend(loginTitle)
      return unless @description
      loginTitle.after "<p class='us-login__description #{@options.removeableClass}'>#{@description}</p>"

    resetForm: ->
      $(".#{@options.removeableClass}").remove()

    passwordHelp = (form) ->
      form.find(".password-strength").passwordHelper
        showText: 'Show',
        hideText: 'Hide'
        
    Login

window.Login = createContext()