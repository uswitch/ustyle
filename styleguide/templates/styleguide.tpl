<!DOCTYPE html>
<html>
<head>
  {{> _header}}
</head>
<body>
  <div id="wrapper">
    {{> sidebar}}
    <div class="us-hero trailered">
      <div class="container sidebar--push">
        <h1 class="styleguide__title">{{page.name}}</h1>
        <div class='us-grid-row'>
          <nav class="styleguide__nav us-col-md-8">
            {{#page}}
              {{#blocks}}
                <div class="us-col-md-4">
                  <a class="styleguide__nav-link" href="/docs/{{../page}}#{{link}}">{{name}}</a>
                </div>
              {{/blocks}}
            {{/page}}
          </nav>
        </div>
      </div>
    </div>
    <div class="styleguide container sidebar--push">
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
  <script src="js/app.js"></script>
</body>
</html>
