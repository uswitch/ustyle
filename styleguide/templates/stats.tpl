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
      {{#section.content}}
        <div class="styleguide__block">
          <dl>
            <dt>Size</dt>
            <dd>{{report.size}}</dd>
            <dt>Rules</dt>
            <dd>{{report.rules}}</dd>
            <dt>Selectors</dt>
            <dd>{{report.selectors}}</dd>
            <dt>Lowest cohesion</dt>
            <dd>{{report.lowestCohesion}}</dd>

            <dt>Longest identifier</dt>
            <dd>{{report.mostIdentifier}}</dd>

            <dt>Longest identifier selector</dt>
            <dd>{{report.mostIdentifierSelector}}</dd>


            <dt>Lowest cohesion</dt>
            <dd>{{report.lowestCohesion}}</dd>

            <dt>Lowest cohesion selector</dt>
            <dd>{{report.lowestCohesionSelector}}</dd>

            <dt>Lowest cohesion selector</dt>
            <dd>{{report.lowestCohesionSelector}}</dd>
            <dt>Unique font sizes</dt>
            <dd>{{report.uniqueFontSize}}</dd>
            <dt>Unique colours</dt>
            <dd>{{report.uniqueColor}}</dd>
            <dt>Id selectors</dt>
            <dd>{{report.idSelectors}}</dd>
            <dt>Universal selectors</dt>
            <dd>{{report.universalSelectors}}</dd>
            <dt>Important keywords</dt>
            <dd>{{report.importantKeywords}}</dd>
          </dl>
        </div>
      {{/section.content}}
    </div>
  </div>
  <script src="js/app.js"></script>
</body>
</html>
