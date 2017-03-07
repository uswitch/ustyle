<div class="styleguide__block styleguide__block--icons" id="{{link}}">
  <h2 class="styleguide__block-title">
    {{name}}
    <a href="https://github.com/uswitch/ustyle/tree/master/{{path}}" class="styleguide__file-link"><svg class="us-icon--small us-icon--github"><use xlink:href="/images/icons.svg#icon-github">Github:</use></svg> <span class="us-tablet--inline">{{file}}</span></a>
  </h2>

  <div class="styleguide__description">
    {{{description}}}
  </div>

  <h3 class="styleguide__block-small-title">Example</h3>
  <div class="styleguide__block-examples">
    <pre><code class="html">
    {{#markup}}
      {{~{escaped}}}
    {{/markup}}
    </code></pre>
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
