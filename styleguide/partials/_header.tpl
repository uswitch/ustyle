<header class="ustyle__header">
  <a class="logo" href="/">ustyle</a>
  <span class="version us-tablet--block">v{{project.version}}</span>
  <div class='nav nav--header'>
    <nav>
      {{#navigation}}
        <a href="/{{this}}/" class="nav__link">{{humanize this}}</a>
      {{/navigation}}    
    </nav>
  </nav>
</header>
<div class='us-clearfix nav-container'>
  <div class='nav nav--sub'>
    <nav>
      {{#pages}}
        {{#isSection this.section}}
          <a class="nav__link nav__main-link {{isActive this.name}}" href="{{page}}">{{name}}</a>
        {{/isSection}}
      {{/pages}}
      {{#isSection "code"}}
        <a class="nav__link nav__main-link" href="/sass/">Sass doc</a>
      {{/isSection}}
    </nav>
  </div>
</div>
