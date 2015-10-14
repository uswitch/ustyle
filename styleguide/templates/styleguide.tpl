{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  {{#page}}
    <div id="wrapper" class="container sidebar--push header--push nav--push">
      <div class="styleguide__hero">
        <h1 class="styleguide__hero-heading">{{name}}</h1>
      </div>
      <div class="us-grid-row">
        {{#if blocks}}
          <nav class="nav--sub us-col-md-2">
            <h4>Patterns</h4>
            {{#blocks}}
              <a class="nav__link" href="#{{link}}">{{name}}</a>
            {{/blocks}}
          </nav>
        {{/if}}
      <div class="us-col-md-10 styleguide__content">
        {{#blocks}}
          {{#if partial}}
            {{partial partial}}
          {{else}}
            {{> style_block}}
          {{/if}}
        {{/blocks}}
      </div>
      </div>
    </div>
  {{/page}}
  {{> _footer}}
</body>
</html>
