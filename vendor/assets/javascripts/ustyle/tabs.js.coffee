{setOptions} = @Utils

createContext = (options) ->
  class Tabs
    defaults:
      tabContainer: ".us-tabs"
      tabLinks: ".us-tabs-nav-mainlink"
      tabTitle: "us-tab-title"
      changeUrls: true
      activeClass: "active"
      collapsible: false
      autoScroll: true

    constructor: (options) ->
      {tabContainer, tabLinks} = @options = setOptions options, @defaults
      @tabs   = $(tabContainer).find(tabLinks)
      @filter = if @tabs.data "target" then "data-target" else "href"

      @init()

      @tabs.on "click.ustyle.tab", (e) =>
        $target = $(e.currentTarget)
        if isAccordion() && @options.collapsible && @isActive($target)
          @collapse($target)
          @hashClear()
        else
          @navigateTo($target)
          @hashChange($target)
        e.preventDefault()

    init: ->
      $initialHash = @tabFromHash()
      $activeTab   = @activeTab()
      if $initialHash.length
        @navigateTo($initialHash)
      else if $activeTab.length
        @navigateTo($activeTab)
      else if !@options.collapsible || !isAccordion()
        @navigateTo(@tabs.first())

    hashChange: (target) ->
      return unless @options.changeUrls
      location.replace("#!#{getSelector(target).replace(/#/, "")}")

    hashClear: ->
      return unless @options.changeUrls
      url = window.location.pathname + window.location.search
      history.replaceState?("", document.title, url)

    navigateTo: (target) ->
      selector  = getSelector(target)
      $selected = $(selector)

      @tabs.removeClass(@options.activeClass).end()
      @tabs.filter("[#{@filter}='#{selector}']").addClass(@options.activeClass)

      $selected
        .siblings(".#{@options.activeClass}")
        .removeClass(@options.activeClass).end()
        .addClass(@options.activeClass)

      if isAccordion() && @options.autoScroll
        scrollToTab($selected)

      $selected.trigger("ustyle.tab.active")

    collapse: (target) ->
      $selected = $(getSelector(target))
      @tabs.removeClass(@options.activeClass).end()
      $selected.removeClass(@options.activeClass)

    activeTab: ->
      @tabs.filter(".#{@options.activeClass}")

    tabFromHash: ->
      tabId = location.hash.replace("!", "")
      @tabs.filter("[#{@filter}='#{tabId}']")

    isActive: (target) ->
      getSelector(target) == getSelector(@activeTab())

    getSelector = (clicked) ->
      return clicked.data("target") or clicked.attr("href")

    scrollToTab = (activeTab) ->
      $("html,body").scrollTop(activeTab.offset().top)

    isAccordion = ->
      !$(".us-tabs-nav").is(":visible")

    Tabs

window.Tabs = createContext()
