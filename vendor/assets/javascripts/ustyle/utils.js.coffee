@Utils ?= {modules: []}

addClass = (element, name) ->
    removeClass element, name
    element.className += " #{name}"

removeClass = (element, name) ->
  element.className = element.className.replace(name, "")

hasClass = (element, name) ->
  new RegExp("(^| )#{ name }( |$)", 'gi').test(element.className)

merge = (target, extensions...) ->
  for extension in extensions
    for own property of extension
      target[property] = extension[property]
  target

@Utils = {addClass, removeClass, hasClass, merge}