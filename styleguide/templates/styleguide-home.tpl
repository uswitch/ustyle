{{> _head}}
<body>
  {{> _header}}
  <div id="wrapper" class="header--push">
    <div class="us-hero">
      <div class="us-hero-container">
        <h1 class="us-hero-title">Pattern library</h1>
        <p class="us-standfirst">
          Our pattern library comes as a easily distributed package, ready to use in multiple programming environments.
        </p>
        <div class="us-clearfix hero__nav-container">
          {{#pages}}
            {{#isActive this.section "section"}}
              <a class="hero__nav-link" href="{{page}}">{{name}}</a>
            {{/isActive}}
          {{/pages}}
          {{#isActive "pattern-library" "section"}}
            <a class="hero__nav-link" href="/sass/">Sass doc</a>
          {{/isActive}}
        </div>
      </div>
    </div>
    {{{page.content}}}
  </div>
  {{> _footer}}
</body>
</html>
