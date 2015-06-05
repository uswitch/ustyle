{addClass, merge, setOptions, deleteUndefined} = @Utils

createContext = (options) ->
  class Login
    defaults:
      origin: window.location.href
      removeableClass: "us-login--removeable"
      state: "signin"

    constructor: (options) ->
      @options = setOptions options, @defaults
      return if @options.target is null
      return unless @options.target.length is undefined or
        @options.target.length
      @target = $(@options.target)

      @formData =
        source: @target.data('source')
        origin: @target.data('origin') or @options.origin
        email: @target.data('email')
        opt_in: @target.data('opt-in')

      deleteUndefined(@formData)

      @title = @target.data('title') or @options.title
      @description = @target.data('description')

      container = document.createElement 'div'
      addClass container, "us-anchor__target"
      addClass container, "us-login__target"

      @setupAnchors(container)

    setupAnchors: (container) ->
      if @options.target.length >= 1
        @anchorInstance(target, container) for target in @options.target
      else
        @anchorInstance(@options.target, container)

    anchorInstance: (target, container) ->
      @anchor = new Anchor
        target: target
        content: container
        isAjax: true

        onOpen: =>
          @fetch()
            .done (html) =>
              unless $(container).find(".us-login__form").length
                $(container).append( html )
              @loginForm = $(container).find(".us-login__form")
              @loginContainer = $(container).find(".us-login")
              @setState()
              @setContent()
              passwordHelp(@loginForm)
              @options.onOpen(target)?.call(target)

        onClose: =>
          @options.onClose?.call(target)
          @resetForm()

    fetch: ->
      jqxhr = $.ajax
        url: "#{window.uSwitch.Accounts.popupUrl()}?#{$.param(@formData)}"
        dataType: 'jsonp'

    setState: ->
      activeState = @loginForm.filter ".us-login__form--#{@options.state}"
      @loginForm.removeClass "login-state--active"
      activeState.addClass "login-state--active"
      @toggle()

    toggle: ->
      $(document).on "click", ".login-state__toggle", (e) ->
        $currentState = $(this).parents(".us-login__form")
        $nextState =
          if $currentState.next().length
            $currentState.next()
          else
            $currentState.prev()
        $nextState.addClass("login-state--active")
        $currentState.removeClass("login-state--active")

        e.preventDefault()

    setContent: ->
      return unless @title
      selector = "<h2 class='us-login__title "
      selector += "#{@options.removeableClass}'>#{@title}</h2>"
      loginTitle = $(selector)
      @loginContainer.prepend(loginTitle)
      return unless @description
      descriptionElm = "<p class='us-login__description "
      descriptionElm += "#{@options.removeableClass}'>#{@description}</p>"
      loginTitle.after descriptionElm

    resetForm: ->
      $(".#{@options.removeableClass}").remove()

    passwordHelp = (form) ->
      window.setTimeout ->
        form.find(".password-strength").passwordHelper()
      , 1

    Login

window.Login = createContext()
