<a href="javascript:void(0);" class="nav-mobile js-toggle__link us-tablet--hidden" data-target="sidebar"><span class="nav-mobile__hamburger">Sidebar</span></a>
<div class='sidebar'>
  {{#navigation}}
    <nav class="sidebar__nav {{activeClass this 'section'}}">
      <a href="/{{this}}/" class="sidebar__nav-link js-sidebar-nav-link {{activeClass this 'section'}}">{{humanize this}}</a>
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

  <div class="made-at">
    <a href="http://www.uswitch.com/tech/" target="_blank" class="us-icon--before us-icon--uswitch--before us-icon--custom--before us-icon--small--before--mobile us-icon--medium--before"><span class="us-color--blue">uSwitch tech creation.</span></a>
  </div>
</div>
