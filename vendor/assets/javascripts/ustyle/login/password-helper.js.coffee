(($, window, document) ->

  class passwordHelper
    defaults:
      classPrefix: 'pass-helper'
      veryWeakText: 'very weak'
      minLength: 6
      tests:
        weak: new RegExp('^[a-zA-Z0-9]{6,}$')
        medium: new RegExp('^(?=.*\\d)(?=.*[a-z])(?!.*\\s).{8,}$|^(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,}$')
        strong: new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,}$')
      showHide: true
      showText: "Show"
      hideText: "Hide"

    constructor: (el, options) ->
      {@tests} = @options = $.extend {}, @defaults, options
      @$el = $(el)
      return if @$el.hasClass "#{@options.classPrefix}__input"
      @$el.addClass "#{@options.classPrefix}__input"
      @wrapper = createWrapper(@$el, @options.classPrefix)
      @hiddenPassword = createHiddenPassword(@$el, @options.classPrefix)
      @strengthChecker()
      @showHide() if @options.showHide

    strengthChecker: ->
      @$el.after $("<div class='#{@options.classPrefix}__meter'><div class='#{@options.classPrefix}__meter-bar' /></div>")
      strengthMeter = $(".#{@options.classPrefix}__meter-bar")

      strengthTest = (value) =>
        return strengthMeter.removeClass() unless value.length
        return strengthMeter.removeClass().addClass("very-weak") if value.length < @options.minLength

        $.each @tests, (name, test) =>
          if value.match(test)
            strengthMeter.removeClass().addClass(name)

      $(document).on 'keyup', ".#{@options.classPrefix}__input", (e) =>
        passwordValue = $(e.target).val()
        $(".#{@options.classPrefix}__input").addClass "strength--started"
        $(".#{@options.classPrefix}__input").removeClass "strength--started" unless passwordValue.length
        strengthTest(passwordValue)

    showHide: ->
      @$el.after $("<a class='#{@options.classPrefix}__show-hide' />").text(@options.showText)
      showButton = 
      showClass = "#{@options.classPrefix}__input--pass-shown"

      $(document).on 'click', ".#{@options.classPrefix}__show-hide" ,(e) =>
        e.preventDefault()
        if(!@$el.hasClass(showClass))
          @$el.addClass showClass
          @$el.prop('disabled', true).hide()
          @hiddenPassword.prop('disabled', false).val(@$el.val()).show().focus()
          $(e.target).text(@options.hideText)
        else
          @$el.removeClass showClass
          @$el.prop('disabled', false).val(@hiddenPassword.val()).show().focus()
          @hiddenPassword.prop('disabled', true).hide()
          $(e.target).text(@options.showText)

    createHiddenPassword = (el, classPrefix) ->
      input = $("<input style='display: none' class='#{el.attr('class')} #{classPrefix}__input-hidden' type='text' name='#{el.attr('name')}' placeholder='#{el.attr('placeholder') or ""}' size='#{el.attr('size')}' value='' disabled='disabled' />")
      el.after input
      input

    createWrapper = (el, classPrefix) ->
      wrapperCss =
        position: 'relative'
        height: el.css('height')
        display: el.css('display')

      wrapper = el.wrap($("<div />").addClass("#{classPrefix}__wrapper").css(wrapperCss))

    $.fn.extend passwordHelper: (options, args...) ->
      @each ->
        $this = $(this)
        data = $(this).data('passwordHelper')

        if !data
          $this.data 'passwordHelper', (data = new passwordHelper(this, options))
        if typeof options == 'string'
          data[options].apply(data, args)

) window.jQuery, window, document