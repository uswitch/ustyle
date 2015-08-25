{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container sidebar--push header--push">
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
  {{> _footer}}
</body>
</html>
