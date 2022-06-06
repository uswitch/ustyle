---
template: simple.tpl
name: Introduction
---
<p>
  Our pattern library comes as an easily distributed package, ready to use in multiple programming environments. It contains our basic CSS components and correct usage, as well as JavaScript components that are widely used across the website.
</p>
<a class="us-btn us-btn--small" href="https://github.com/uswitch/ustyle">View on GitHub</a>
<div class="us-content-group mobile-bordered">
  <h2 class="trailered">Distribution methods</h2>
  <div class="us-grid-row">
    <div class="us-col-md-6 trailered">
      <img src="/images/ruby-logo.png" alt="Ruby logo" class="distro-image">
      <h3>Ruby gem</h3>
      <p>uStyle was initially created as a gem. Some of the Sass functions rely on Ruby to run. You can install it via any Gemfile and it will install the required dependencies.</p>
      <pre><code class="ruby">gem 'ustyle', git: "git@github.com:uswitch/ustyle.git"</code></pre>
    </div>
    <div class="us-col-md-6 trailered">
      <img src="/images/bower-logo.png" alt="Bower logo" class="distro-image">
      <h3>Bower package</h3>
      <p>Install it as a bower package. This will pull down the original <code>.scss</code> files and compiled static CSS + JS.</p>
      <pre><code class="javascript">
        "dependencies": {
          "ustyle": "git@github.com:uswitch/ustyle.git#~0.19.1"
        }
      </code></pre>
    </div>
  </div>
</div>
<div class="us-content-group mobile-bordered">
  <div class="us-grid-row">
    <div class="us-col-md-6 trailered">
      <img src="/images/cloudfront-logo.png" alt="Cloudfront logo" class="distro-image">
      <h3>Cloudfront</h3>
      <p>Every time uStyle gets a new version, the version gets updated across our Cloudfront distributions.
      <pre><code class="html">
        &lt;!-- get latest --&gt;
        &lt;link href='//www.uswitch.com/s3/uswitch-assets-eu/ustyle/ustyle-latest.css' media='all' rel='stylesheet' type='text/css' /&gt;
        &lt;!-- get versioned --&gt;
        &lt;link href='//www.uswitch.com/s3/uswitch-assets-eu/ustyle/VERSION/ustyle-latest.css' media='all' rel='stylesheet' type='text/css' /&gt;
      </code></pre>
    </div>
    <div class="us-col-md-6">
      <img src="/images/npm-logo.png" alt="NPM logo" class="distro-image">
      <h3>NPM Package</h3>
      <pre><code class="javascript">
        "devDependencies": {
          "ustyle": "git@github.com:uswitch/ustyle.git#~0.19.1"
        }
      </code></pre>
    </div>
  </div>
</div>
<div class="us-content-group mobile-bordered">
  <h2>Browser support</h2>
  <p>We use <a href="https://github.com/postcss/autoprefixer">Autoprefixer + Browserlist</a> to decide what vendor prefixes to apply to our <code>Sass</code> files. We have a slightly wider browser support than the default (<a href="https://github.com/ai/browserslist#browserslist-">here</a>). Currently we support all the way to IE9.</p>
  <p>Below is what we support. Each line is the minimum version or % use based on CanIUse metrics</p>
  <table class="pure-table pure-table-bordered">
    <thead>
      <tr>
        <th>Browser</th>
        <th>Minimum version supported</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Safari, Chrome, Opera</td>
        <td>Last 5 versions</td>
      </tr>
      <tr>
        <td>Firefox</td>
        <td>ESR</td>
      </tr>
      <tr>
        <td>Internet Explorer</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Global usage</td>
        <td>> 1%</td>
      </tr>
    </tbody>
  </table>
</div>
<div class="us-content-group mobile-bordered">
  <h2>Installation</h2>
  <p>See our <a href="https://github.com/uswitch/ustyle">GitHub</a> for documentation on installing this across applications.</p>
</div>
