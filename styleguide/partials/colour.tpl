<div class="us-content-group">
  <h2 class="styleguide__block-small-title">{{name}}</h2>
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
