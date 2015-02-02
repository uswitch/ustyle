<!DOCTYPE html>
<html class="svg">
<head>
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <title>{{project.name}} styleguide</title>
  <link rel="stylesheet" href="../ustyle-content.css" type="text/css" />
  <link rel="stylesheet" href="css/main.css" type="text/css" />
</head>
<body>
  <div id="wrapper">
    <a href="javascript:void(0)" class="nav-mobile us-desktop--hidden js-toggle__link" data-target="sidebar"><span class="nav-mobile__hamburger">Open menu</span></a>
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
