{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container">
    <h1 class="styleguide__title">{{page.name}}</h1>
    <div class="us-grid-row">
      <div class="us-content styleguide us-col-md-9">
        {{{page.content}}}
      </div>
    </div>
  </div>
  {{> _footer}}
</body>
</html>
