<!DOCTYPE html>
<html class="no-js svg">
<head>
  {{> _head}}
</head>
<body>
  {{> _header}}
  {{> _hero}}
  <div id="wrapper" class="us-container">
    <div class="us-grid-row">
      {{> sidebar}}
      <div class="styleguide us-col-md-10">
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
  </div>
  {{> _footer}}
</body>
</html>
