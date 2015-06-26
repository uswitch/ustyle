---
template: styleguide-home.tpl
---
<div class="us-content-group mobile-bordered">
  <div class="us-container">
    <h2 class="trailered">Distribution methods</h2>
    <div class="us-grid-row">
      <div class="us-col-md-6 trailered">
        <img src="/images/ruby-logo.png" alt="Ruby logo" class="distro-image">
        <h3>Ruby gem</h3>
        <p>Ustyle was initially created as a gem. Some of the Sass functions rely on Ruby to run. You can install it via any Gemfile and it will install the required dependencies.</p>
        <pre><code class="ruby">gem 'ustyle', git: "git@github.com:uswitch/ustyle.git"</code></pre>
      </div>
      <div class="us-col-md-6 trailered">
        <img src="/images/bower-logo.png" alt="Bower logo" class="distro-image">
        <h3>Bower package</h3>
        <p>Install is as a bower package. This will pull down the original <code>.scss</code> files and compiled static CSS + JS.</p>
        <pre><code class="javascript">
          "dependencies": {
            "ustyle": "git@github.com:uswitch/ustyle.git#~0.19.1"  
          }
        </code></pre>
      </div>
    </div>
  </div>
</div>
<div class="us-content-group mobile-bordered">
  <div class="us-container">
    <div class="us-grid-row">
      <div class="us-col-md-6 trailered">
        <img src="/images/cloudfront-logo.png" alt="Cloudfront logo" class="distro-image">
        <h3>Cloudfront</h3>
        <p>Every time ustyle gets a new version, the version gets updated across our Cloudfront distributions.
        <pre><code class="html">
          &lt;!-- get latest --&gt;
          &lt;link href='//assets0.uswitch.com/s3/uswitch-assets-eu/ustyle/ustyle-latest.css' media='all' rel='stylesheet' type='text/css' /&gt;
          &lt;!-- get versioned --&gt;
          &lt;link href='//assets0.uswitch.com/s3/uswitch-assets-eu/ustyle/VERSION/ustyle-latest.css' media='all' rel='stylesheet' type='text/css' /&gt;
        </code></pre>
      </div>
      <div class="us-col-md-6">
        <img src="/images/npm-logo.png" alt="NPM logo" class="distro-image">
        <h3>NPM Package</h3>
        <p>Similar installation method to Bower</p>
      </div>
    </div>
  </div>  
</div>
