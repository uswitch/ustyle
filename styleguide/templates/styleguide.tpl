{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container sidebar--push header--push">
    {{#page}}
      {{#if blocks}}
        <nav class="sidebar__sub-nav">
          {{#blocks}}
            <a class="sidebar__nav-link sidebar__nav-link--sub" href="#{{link}}">{{name}}</a>
          {{/blocks}}
        </nav>
      {{/if}}
      {{#blocks}}
        {{#if partial}}
          {{partial partial}}
        {{else}}
          {{> style_block}}
        {{/if}}
      {{/blocks}}
    {{/page}}
  </div>
  {{> _footer}}
</body>
</html>
