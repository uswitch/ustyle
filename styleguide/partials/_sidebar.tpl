<a href="javascript:void(0);" class="nav-mobile js-toggle__link us-desktop--hidden" data-target="sidebar"><span class="nav-mobile__hamburger">Sidebar</span></a>
<div class='sidebar'>
  <nav class='sidebar__nav' data-gumshoe>
    {{#pages}}
      {{#isActive this.section "section"}}
        <a class="sidebar__nav-link {{activeClass this.name 'name'}}" href="{{page}}">{{name}}</a>
        {{#isActive this.name "name"}}
          {{#if blocks}}
            <nav class="sidebar__sub-nav" data-ghumshoe>
              {{#blocks}}
                <a class="sidebar__nav-link sidebar__nav-link--sub" href="#{{link}}">{{name}}</a>
              {{/blocks}}
            </nav>
          {{/if}}
        {{/isActive}}
      {{/isActive}}
    {{/pages}}
    {{#isActive "code" "section"}}
      <a class="sidebar__nav-link" href="/sass/">Sass doc</a>
    {{/isActive}}
  </nav>
</div>
