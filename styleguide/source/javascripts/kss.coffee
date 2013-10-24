# This class scans your stylesheets for pseudo classes, then inserts a new CSS
# rule with the same properties, but named 'psuedo-class-{{name}}'.
#
# Supported pseudo classes: hover, disabled, active, visited, focus, target.
#
# Example:
#
#   a:hover{ color:blue; }
#   => a.pseudo-class-hover{ color:blue; }
class KssStateGenerator
  psuedo_selectors = [
    'hover',
    'enabled',
    'disabled',
    'active',
    'visited',
    'focus',
    'target',
    'checked',
    'empty',
    'first-of-type',
    'last-of-type',
    'first-child',
    'last-child']

  constructor: ->
    pseudos = new RegExp "(\\:#{psuedo_selectors.join('|\\:')})", "g"

    try
      for stylesheet in document.styleSheets
        if stylesheet.href and stylesheet.href.indexOf(document.domain) >= 0
          idxs = []
          for rule, idx in stylesheet.cssRules
            console.log rule
            @buildRule(rule, pseudos)

            if (rule.type == CSSRule.MEDIA_RULE)
              for mediaRule, idx in rule.cssRules
                @buildRule(mediaRule, pseudos)

            pseudos.lastIndex = 0

  buildRule: (rule, pseudos) ->
    if (rule.type == CSSRule.STYLE_RULE) and pseudos.test(rule.selectorText)
      if rule.parentRule is null
        ruleText = rule.cssText.replace(pseudos, @replaceRule)
      else
        ruleText = "@media #{rule.parentRule.media[0]} { #{rule.cssText.replace(pseudos, @replaceRule)} }"

      @insertRule(ruleText)

  replaceRule: (matched, stuff) ->
    return matched.replace(/\:/g, '.pseudo-class-')

  insertRule: (rule) ->
    headEl = document.getElementsByTagName('head')[0]
    styleEl = document.createElement('style')
    styleEl.type = 'text/css'
  
    styleEl.appendChild(document.createTextNode(rule))
      
    headEl.appendChild(styleEl)

new KssStateGenerator