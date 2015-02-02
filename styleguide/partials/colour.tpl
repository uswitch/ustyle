<div class="styleguide__block" id="{{link}}">
  <div class="styleguide__block-info">
    <h2 class="styleguide__block-title">
      {{name}}
      <a href="https://github.com/uswitch/ustyle/tree/master/{{path}}" class="styleguide__file-link"><span>Github:</span> {{file}}</a>
    </h2>
    
    {{{description}}}
    <div class="us-grid-row">
      {{#variable}}
        <div class="colour us-col-md-3">
          <div class="colour__block">
            <div class="colour__hex" style='background: {{value}}; color: white;'>
            </div>
            <div class="colour__description">{{name}} - {{value}}</div>
          </div>
        </div>
      {{/variable}}
    </div>
  </div>
</div>
