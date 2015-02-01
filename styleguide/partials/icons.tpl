<div class="styleguide__block styleguide__block--icons" id="{{link}}">
  <div class="styleguide__block-info">
    <h2 class="styleguide__block-title">{{name}}</h2>
    <a href="https://github.com/uswitch/ustyle/tree/master/{{path}}" class="filename">{{file}}</a>
    {{{description}}}    
  </div>
  
  <h3 class="styleguide__block-small-title">Example</h3>
  <div class="styleguide__block-examples">
    <pre><code class="html">
    {{#markup}}
      {{~{escaped}}}
    {{/markup}}
    </code></pre>
    <div class="styleguide__block-example">
      {{{markup.example}}}
    </div>
    
    <div class="us-clearfix">
      {{#state}}
        <div class="styleguide__block-example us-col-md-3 state">
          {{{markup.example}}}
          <div class="styleguide__block-example-class">{{name}}</div>
        </div>
      {{/state}}
    </div>
  </div>

</div>