<div class="styleguide__block">
  <p>
    Our grid is a 12 column grid, with similar sizes to that of Bootstrap. We also adhere to the same naming standards for device breakpoints.
  </p>
  <ul>
    <li>Default gutter width: <strong>15px either side</strong></li>
    <li>Large container width: <strong>1170px</strong></li>
    <li>Desktop container width: <strong>970px</strong></li>
    <li>Tablet container width: <strong>770px</strong></li>
  </ul>
  <ul>
    <li>The parent container is <code>.us-container</code>, you must have this to start building the uSwitch layouts.</li>
    <li><code>.us-grid-row</code> is then used when you are building rows of columns (gives a negative margin to the container so they align correctly)</li>
    <li>All grid class names are prefixed with <code>.us-col-</code></li>
  </ul>
</div>
<div class="styleguide__block">
  <h2 class="styleguide__block-title">Example</h2>
  <p>Here is an example of a grid which will turn into 100% width columns on mobile.</p>
  <div class="grid-example">
    <div class="us-grid-row">
      <div class="col-example us-col-md-2">.us-col-md-2</div>
      <div class="col-example us-col-md-2">.us-col-md-2</div>
      <div class="col-example us-col-md-4">.us-col-md-4</div>
      <div class="col-example us-col-md-4">.us-col-md-4</div>
    </div>
    <div class="us-grid-row">
      <div class="col-example us-col-md-8">.us-col-md-8</div>
      <div class="col-example us-col-md-4">.us-col-md-4</div>
    </div>
    <div class="us-grid-row">
      <div class="col-example us-col-md-6">.us-col-md-6</div>
      <div class="col-example us-col-md-6">.us-col-md-6</div>
    </div>
  </div>
  <pre><code class="html">
&lt;div class=&quot;us-grid-row&quot;&gt;
  &lt;div class=&quot;us-col-md-2&quot;&gt;.us-col-md-2&lt;/div&gt;
  &lt;div class=&quot;us-col-md-2&quot;&gt;.us-col-md-2&lt;/div&gt;
  &lt;div class=&quot;us-col-md-4&quot;&gt;.us-col-md-4&lt;/div&gt;
  &lt;div class=&quot;us-col-md-4&quot;&gt;.us-col-md-4&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;us-grid-row&quot;&gt;
  &lt;div class=&quot;us-col-md-8&quot;&gt;.us-col-md-8&lt;/div&gt;
  &lt;div class=&quot;us-col-md-4&quot;&gt;.us-col-md-4&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;us-grid-row&quot;&gt;
  &lt;div class=&quot;us-col-md-6&quot;&gt;.us-col-md-6&lt;/div&gt;
  &lt;div class=&quot;us-col-md-6&quot;&gt;.us-col-md-6&lt;/div&gt;
&lt;/div&gt;
  </code></pre>
</div>
<div class="styleguide__block">
  <h2 class="styleguide__block-title">Example with mobile columns</h2>
    <div class="grid-example">
      <div class="us-grid-row">
        <div class="col-example us-col-xsm-6 us-col-md-2">.us-col-xsm-6.us-col-md-2</div>
        <div class="col-example us-col-xsm-6 us-col-md-2">.us-col-xsm-6.us-col-md-2</div>
        <div class="col-example us-col-sm-6 us-col-md-4">.us-col-sm-6.us-col-md-4</div>
        <div class="col-example us-col-sm-6 us-col-md-4">.us-col-sm-6.us-col-md-4</div>
      </div>
    </div>
  </div>
</div>
