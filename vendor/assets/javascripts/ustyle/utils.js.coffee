@Utils ?= {modules: []}

addClass = (element, name) ->
    removeClass element, name
    element.className += " #{name} "

removeClass = (element, name) ->
  element.className = element.className.replace new RegExp("(\\s|^)#{name}(\\s|$)" , "gi"), ""

hasClass = (element, name) ->
  new RegExp("(^| )#{ name }( |$)", 'gi').test(element.className)

merge = (target, extensions...) ->
  for extension in extensions
    for own property of extension
      target[property] = extension[property]
  target

setOptions = (options, defaults) ->
  merge {}, defaults, options

transformKey = do ->
  el = document.createElement 'div'
  for key in ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']
    if el.style[key] isnt undefined
      return key

@Utils = {addClass, removeClass, hasClass, merge, setOptions, transformKey}