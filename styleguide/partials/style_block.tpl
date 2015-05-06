<div class="styleguide__block" id="{{link}}">
  <div class="styleguide__block-info">
    <h2 class="styleguide__block-title">
      {{name}}
      <a href="https://github.com/uswitch/ustyle/tree/master/{{path}}" class="styleguide__file-link"><span class="us-icon--small us-icon--github us-icon--notext us-icon--custom">Github:</span> <span class="us-tablet--inline">{{file}}</span></a>
    </h2>
    
    {{{description}}}
    {{#if state}}
      <ul class="styleguide__block-states">
        {{#state}}
          <li class="name"><strong>{{name}}</strong> - {{description}}</li>
        {{/state}}
      </ul>
    {{/if}}
    
  </div>
  
  <div class="styleguide__block-examples">
    <h3 class="styleguide__block-small-title">Example</h3>
    <div class="styleguide__block-example">
      {{{markup.example}}}
    </div>
  
    {{#state}}
      <div class="styleguide__block-example state-{{classSanitizer name}}">
        {{{markup.example}}}
        <div class="styleguide__block-example-class">{{name}}</div>
      </div>
    {{/state}}

    <pre><code class="html">
    {{#markup}}
      {{~{escaped}}}
    {{/markup}}
    </code></pre>
    {{#if javascript}}
      <pre><code class="javascript">
      {{~{javascript}}}
      </code></pre>
    {{/if}}
  </div>

</div>
