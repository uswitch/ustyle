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
        {{{page.content}}}
      </div>
    </div>
  </div>
  {{> _footer}}
</body>
</html>
