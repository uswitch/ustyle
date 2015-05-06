{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container">
    <h1 class="styleguide__title">{{page.name}}</h1>
    <div class="us-content styleguide">
      {{{page.content}}}
    </div>
  </div>
  {{> _footer}}
</body>
</html>
