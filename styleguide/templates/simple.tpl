{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container header--push sidebar--push">
    <h1 class="styleguide__title">{{page.name}}</h1>
    <div class="us-content styleguide">
      {{{page.content}}}
    </div>
  </div>
  {{> _footer}}
</body>
</html>
