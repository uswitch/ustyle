<div class="styleguide__block" id="{{link}}">
  <div class="styleguide__block-info">
    <h2 class="styleguide__block-title">
      {{name}}
      <a href="https://github.com/uswitch/ustyle/tree/master/{{path}}" class="styleguide__file-link"><span class="us-icon--small us-icon--github us-icon--notext us-icon--custom">Github:</span> {{file}}</a>
    </h2>
    
    {{{description}}}
    <div class="us-grid-row">
      {{#variable}}
        <div class="colour us-col-md-4">
          <div class="colour__block">
            <div class="colour__hex" style='background: {{value}}; color: white;'>
            </div>
            <div class="colour__description">
              <h4 class="colour__title">{{name}} - {{value}}</h4>
              <span>{{description}}</span>
            </div>
          </div>
        </div>
      {{/variable}}
    </div>
  </div>
</div>
