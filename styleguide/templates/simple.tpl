{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container header--push sidebar--push">
    <div class="styleguide__hero">
      <h1 class="styleguide__hero-heading">{{page.name}}</h1>
    </div>
    <div class="styleguide__content markdown styleguide">
      {{{page.content}}}
    </div>
  </div>
  {{> _footer}}
</body>
</html>
