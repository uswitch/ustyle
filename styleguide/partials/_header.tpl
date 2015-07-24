<header class="ustyle__header">
  <a class="logo" href="/">uStyle</a>
  <a class="version us-tablet--block" href="https://github.com/uswitch/ustyle/releases/tag/{{project.version}}">v{{project.version}}</a>
  <div class='nav nav--header'>
    <nav>
      {{#navigation}}
      <a href="/{{this}}/" class="nav__link {{activeClass this 'section'}}">{{humanize this}}</a>
      {{/navigation}}
    </nav>
  </div>
</header>
