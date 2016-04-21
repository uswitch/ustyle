{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container header--push sidebar--push">
    <div class="styleguide__hero">
      <h1 class="styleguide__hero-heading">{{page.name}}</h1>
    </div>
    {{#if page.subNav}}
      <nav class="nav--sub us-col-lg-2">
        <div class="js-sticky">
          <h4>Table of contents</h4>
          {{#page.subNav}}
            <a class="nav__link" href="{{link}}">{{name}}</a>
          {{/page.subNav}}
        </div>
      </nav>
    {{/if}}
    <div class="styleguide__content markdown styleguide us-col-lg-10 {{#if page.subNav}}styleguide__content--w-sidebar{{/if}}">
      {{{page.content}}}
    </div>
  </div>
  {{> _footer}}
</body>
</html>
