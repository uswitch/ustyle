{addClass, removeClass, merge, now, setOptions} = @Utils

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

      @title = @target.data('title') or @options.title
      @description = @target.data('description')
      @email = @target.data('email')

      @content = @fetch()      

    setupAnchor: ->
      @anchor = new Anchor
        target: @options.target
        content: @content
        onOpen: =>
          @setData()
          @setContent()
          @setEmail()
          @loginForm.find(".password-strength").passwordHelper
            showText: 'Show',
            hideText: 'Hide'
          @options.onOpen?.call()

        onClose: =>
          @options.onClose?.call()
          @resetForm()

    fetch: ->
      container = document.createElement 'div'
      addClass container, "us-anchor__target"
      addClass container, "us-login__target"

      jqxhr = $.ajax
        url: "#{window.uSwitch.Accounts.baseUrl}/signin-popup"
        dataType: 'jsonp'

      .done (html) =>
        $(container).append( html )
        @loginForm = $(container).find(".us-login__form")
        @loginContainer = $(container).find(".us-login")
        @setState()
        @setupAnchor()

      container

    isEnabled: ->
      @anchor.isEnabled()

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

    setData: ->
      $.map @formData, (val, key) =>
        hiddenInput = createHiddenInput(key, val, @options.removeableClass, @loginForm)

      @loginForm.find(".us-social__btn").each (i, e) =>
        e.href += "?#{$.param(@formData)}"

    setContent: ->
      return unless @title
      loginTitle = $("<h2 class='us-login__title #{@options.removeableClass}'>#{@title}</h2>")
      @loginContainer.prepend(loginTitle)
      return unless @description
      loginTitle.after "<p class='us-login__description #{@options.removeableClass}'>#{@description}</p>"

    setEmail: ->
      @loginForm.find("input[type='email']").val(@email)

    resetForm: ->
      $(".#{@options.removeableClass}").remove()
      # Clean our origin and source url links
      @loginForm.find(".us-social__btn").each (i, e) =>
        e.href = e.href.replace(/\?(.*)/, "")

    createHiddenInput = (name, value, className, formParent) ->
      input = $("<input type='hidden' name='#{name}' class='#{className}' />")
      input.val(value)
      formParent.append input
        
    Login

window.Login = createContext()