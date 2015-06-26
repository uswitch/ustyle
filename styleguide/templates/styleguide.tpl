{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container sidebar--push header--push">
    <div class="styleguide">
      {{#page}}
        {{#blocks}}
          {{#if partial}}
            {{partial partial}}
          {{else}}
            {{> style_block}}
          {{/if}}
        {{/blocks}}
      {{/page}}
    </div>
  </div>
  {{> _footer}}
</body>
</html>
