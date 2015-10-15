<a href="javascript:void(0);" class="nav-mobile js-toggle__link us-tablet--hidden" data-target="sidebar"><span class="nav-mobile__hamburger">Sidebar</span></a>
<div class='sidebar'>
  {{#navigation}}
    <nav class="sidebar__nav {{activeClass this 'section'}}">
      <a href="/{{this}}/" class="sidebar__nav-link {{activeClass this 'section'}}">{{humanize this}}</a>
      <nav class="sidebar__sub-nav">
        {{#each ../pages}}
          {{#isActive this.section ../this}}
            <a class="sidebar__nav-link sidebar__nav-link--sub {{activeClass this.name 'name'}}" href="/{{../../this}}/{{page}}">{{name}}</a>
          {{/isActive}}
        {{/each}}
        {{#isActive "pattern-library" this}}
          <a class="sidebar__nav-link sidebar__nav-link--sub" href="/sass/" target="_blank">Sass doc</a>
        {{/isActive}}
      </nav>
    </nav>
  {{/navigation}}
</div>
