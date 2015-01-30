<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <title>{{project.name}} styleguide</title>
  <link rel="stylesheet" href="ustyle-content.css" type="text/css" />
</head>
<body>
  <h1><a class='logo' href='/docs' id='logo'>Styleguide</a></h1>
  <div id="wrapper">
    <div class="us-hero trailered">
      <div class="container sidebar--push">
        <h1 class="styleguide__title">{{section.name}}</h1>
      </div>
    </div>
    <div class="styleguide container sidebar--push">
      {{#content}}
        <div class="styleguide__block">
          {{report.published}}
        </div>
      {{/content}}
    </div>
  </div>
  <script src="js/app.js"></script>
</body>
</html>
