<a href="javascript:void(0);" class="nav-mobile js-toggle__link us-desktop--hidden" data-target="sidebar"><span class="nav-mobile__hamburger">Sidebar</span></a>
<div class='sidebar'>
  <nav class='sidebar__nav'>
    {{#navigation}}
      <a href="/{{this}}/" class="nav__link {{activeClass this 'section'}}">{{humanize this}}</a>
      <nav class="sidebar__sub-nav">
        {{#each ../pages}}
          {{#isActive this.section ../this}}
            <a class="sidebar__nav-link sidebar__nav-link--sub {{activeClass this.name 'name'}}" href="/{{../../this}}/{{page}}">{{name}}</a>
          {{/isActive}}
        {{/each}}
        {{#isActive "pattern-library" this}}
          <a class="sidebar__nav-link sidebar__nav-link--sub" href="/sass/">Sass doc</a>
        {{/isActive}}
      </nav>
    {{/navigation}}
  </nav>
</div>
