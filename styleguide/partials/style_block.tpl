<div class="styleguide__block" id="{{link}}">
  <h2 class="styleguide__block-title">
    {{name}}
    <a href="https://github.com/uswitch/ustyle/tree/master/{{path}}" class="styleguide__file-link"><svg class="us-icon--small us-icon--github"><use xlink:href="/images/icons.svg#icon-github">Github:</use></svg> <span class="us-tablet--inline">{{file}}</span></a>
  </h2>

  <div class="styleguide__description">
    {{{description}}}
  </div>

  {{#if state}}
    <h4>States</h4>
    <ul class="styleguide__block-states us-clearfix">
      {{#state}}
        <li class="name"><strong>{{name}}</strong> - {{description}}</li>
      {{/state}}
    </ul>
  {{/if}}

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
