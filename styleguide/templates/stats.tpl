<!DOCTYPE html>
<html>
<head>
  {{> _head}}
</head>
<body>
  {{> _header}}
  {{> _hero}}
  <div id="wrapper" class="us-container">
    <div class="us-grid-row">
      <div class="us-content styleguide us-col-md-9">
        {{#each page.content.report}}

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
    </div>
  </div>
  {{> _footer}}
</body>
</html>
