class CodeToggle
  codeBlocks = document.getElementsByClassName "code-block"
  activeClass = "code-block__code--visible"
  showText = "Show code"
  hideText = "Hide code"

  constructor: ->
    for codeBlock in codeBlocks
      toggleBlock = document.createElement("a")
      toggleBlock.href = "#"
      toggleBlock.className = "code-block__reveal"
      toggleText = document.createTextNode(showText)
      toggleBlock.appendChild(toggleText)
      codeBlock.insertBefore(toggleBlock, codeBlock.firstChild)

      toggleBlock.addEventListener "click", (e) -> 
        preElem = this.parentNode
        if preElem.className.indexOf(activeClass) != -1
          preElem.className = preElem.className.replace(activeClass, "")
          this.innerHTML = showText
        else
          preElem.className += " " + activeClass
          this.innerHTML = hideText
        
        e.preventDefault


new CodeToggle