(function (document, window, $, Overlay, ClassToggler, Tabs, RadioToggle) {
  'use strict'

  function cleanWhiteSpace (codeBlocks) {
    if (!codeBlocks) return

    for (var i = codeBlocks.length - 1; i >= 0; i--) {
      var codeBlock = codeBlocks[i]
      var offset
      var text = codeBlock.textContent || codeBlock.innerText
      var lines = text.split('\n')

      if (lines.length > 1 && lines[ lines.length - 1 ].trim() === '') {
        lines.pop()
      }

      var canClean = lines[1] !== undefined

      if (canClean) {
            // how much white-space do we need to remove form each line?
        offset = lines[ 1 ].match(/^\s*/)[ 0 ].length

          // remove the excess white-space from the beginning of each line
        lines = lines.map(function (line) {
          return line.slice(offset)
        })

        lines.shift()

        codeBlock.textContent = lines.join('\n')
      }

      hljs.highlightBlock(codeBlock)
    };
  }

  function App () {
    var toggleLinks = document.querySelectorAll('.js-toggle__link')

    for (var i = toggleLinks.length - 1; i >= 0; i--) {
      var toggleLink = toggleLinks[i]
      toggleLink.addEventListener('click', clickToggle, false)
    };

    var sidebarNavLinks = document.querySelectorAll('.js-sidebar-nav-link')

    for (var j = sidebarNavLinks.length - 1; j >= 0; j--) {
      var sidebarNavLink = sidebarNavLinks[j]
      sidebarNavLink.addEventListener('click', sideBarToggle, false)
    };

    if (!$('html').hasClass('ie8')) {
      cleanWhiteSpace(document.querySelectorAll('pre code'))
    }

    var stickySidebar = function () {
      var $sidebar = $('.js-sticky')
      if (!$sidebar.length) return
      var offset = $sidebar.offset()

      $(window).on('scroll', function () {
        var winTop = $(window).scrollTop()
        set(winTop)
      })

      function set (winTop) {
        if (offset.top < winTop) {
          $sidebar.addClass('stuck')
        } else {
          $sidebar.removeClass('stuck')
        }
      }
    }

    stickySidebar()
    svg4everybody()

    /* eslint-disable no-new */
    $('.js-open-overlay').each(function (e) {
      new Overlay({
        openButton: $(".js-open-overlay[modifier='" + $(this).attr('modifier') + "']"),
        overlay: $(".us-overlay-parent[modifier='" + $(this).attr('modifier') + "']")
      })
    })

    new ClassToggler({
      containerClass: '.us-tooltip',
      $target: $('.us-tooltip__icon'),
      activeClass: 'us-tooltip--active'
    })

    new Tabs({collapsible: true, autoScroll: false})
  }

  function clickToggle (event) {
    var toggleLink = event.currentTarget
    var target = document.querySelector('.' + toggleLink.getAttribute('data-target'))
    var targetActiveClass = getActiveClass(target)
    var activeClass = getActiveClass(toggleLink)
    toggleLink.classList.toggle(activeClass)
    target.classList.toggle(targetActiveClass)
  }

  function sideBarToggle (event) {
    event.preventDefault()
    var sidebarSubNav = event.currentTarget.parentElement
    sidebarSubNav.classList.toggle('active')
  }

  function getActiveClass (selector) {
    return selector.classList[0] + '--active'
  }

  return new App()
})(document, window, $, Overlay, ClassToggler, Tabs)
