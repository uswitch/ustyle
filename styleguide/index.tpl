<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <title>{{project.name}} styleguide</title>  
  <link rel="stylesheet" href="../ustyle-content.css" type="text/css" />
  <link rel="stylesheet" href="css/main.css" type="text/css" />
</head>
<body>
  <div id="wrapper">
    {{> sidebar}}
    <div class="us-hero trailered">
      <div class="container sidebar--push">
        <h1 class="styleguide__title">{{section.name}}</h1>
      </div>
    </div>
    <div class="styleguide container sidebar--push">
      {{#section}}
        {{#blocks}}
          {{#if partial}}
            {{partial partial}}
          {{else}}
            {{> style_block}}
          {{/if}}
        {{/blocks}}
      {{/section}}
    </div>
  </div>
  <script src="js/app.js"></script>
</body>
</html>