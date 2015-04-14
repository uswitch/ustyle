<!DOCTYPE html>
<html>
<head>
  {{> _head}}
</head>
<body>
  {{> _header}}
  <div id="wrapper">
    {{> sidebar}}
    <div class="us-hero trailered">
      <div class="container sidebar--push styleguide__header">
        <h1 class="styleguide__title">{{page.name}}</h1>
      </div>
    </div>
    <div class="styleguide container sidebar--push">
      {{{page.content}}}
    </div>  
  </div>
  {{> _footer}}
</body>
</html>
