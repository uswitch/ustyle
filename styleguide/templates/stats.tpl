{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container header--push sidebar--push">
    <h1 class="styleguide__title">{{page.name}}</h1>
    <div class="us-grid-row">
      <div class="us-content styleguide report us-col-md-12">
        <script>
          var reportData = {{{json page.content.report}}};
        </script>
        <div id="simplicity_chart" style="width: 100%; height: 500px;" class='us-container' ></div>
        <div id="size_chart" style="width: 100%; height: 500px;" class='us-container'></div>
        <h2>Breakdown of stats by uStyle release</h2>
        {{#each page.content.report}}

        <div class="report--entry">
          {{#each this}}
            {{#isString this}}
              <div class="stat__entry us-col-md-4 stat--string">
                <div class="stat__value">{{this}}</div>
                <div class="stat__title">{{@key}}</div>
              </div>
            {{/isString}}

            {{#isNumber this @key}}
            <div class="stat__entry us-col-md-4 stat--number">
              <div class="stat__value">{{this}}</div>
              <div class="stat__title">{{@key}}</div>
            </div>
            {{/isNumber}}

            {{#isArray this}}
            <div class="stat__list us-col-md-4 stat--array">
              <div class="stat__value">{{this}}</div>
              <div class="stat__title">{{@key}}</div>
            </div>
            {{/isArray}}
          {{/each}}

        </div>

        {{/each}}
      </div>
    </div>
  </div>
  {{> _footer}}
</body>
</html>
