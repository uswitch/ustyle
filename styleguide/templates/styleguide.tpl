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
          <nav class="nav--sub us-col-lg-2">
            <div class="js-sticky">
              <h4>Patterns</h4>
              {{#blocks}}
                <a class="nav__link" href="#{{link}}">{{name}}</a>
              {{/blocks}}
            </div>
          </nav>
        {{/if}}
      <div class="us-col-lg-10 styleguide__content styleguide__content--w-sidebar">
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
