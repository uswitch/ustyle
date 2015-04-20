<!DOCTYPE html>
<html>
<head>
  {{> _head}}
</head>
<body>
  {{> _header}}
  {{> _hero}}
  <div id="wrapper" class="us-container">
    <div class="styleguide">
      {{{page.content}}}
    </div>  
  </div>
  {{> _footer}}
</body>
</html>
