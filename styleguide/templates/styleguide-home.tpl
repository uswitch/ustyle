{{> _head}}
<body>
  {{> _header}}
  <div class="us-hero header--push hero--pattern">
    <div class="us-hero-container">
      <h1 class="us-hero-title">Pattern library</h1>
      <p class="us-standfirst">
        Our pattern library comes as a easily distributed package, ready to use in multiple programming environments.
      </p>
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
  {{{page.content}}}
  {{> _footer}}
</body>
</html>
