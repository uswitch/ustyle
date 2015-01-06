<div class="styleguide__block">
  
  <a href="https://github.com/uswitch/ustyle/tree/master/{{path}}" class="filename">{{file}}</a>

  <div class="styleguide__block-info">
    <h2 class="styleguide__block-title">{{name}}</h2>
    {{description}}
  </div>
    
  <div class="styleguide__block-examples">
    <div class="styleguide__block-example">
      {{markup.example}}
    </div>
  
    {{#state}}
      <div class="styleguide__block-example state">
        {{markup.example|s}}
        <div class="name">{{name}} - {{description}}</div>
      </div>
    {{/state}}

    <pre><code class="html">
    {{#markup}}
      {{~{escaped}}}
    {{/markup}}
    </code></pre>
  </div>

</div>