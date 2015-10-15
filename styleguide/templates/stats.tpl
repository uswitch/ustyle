{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container header--push sidebar--push">
    <div class="styleguide__hero">
      <h1 class="styleguide__hero-heading">{{page.name}}</h1>
    </div>
    <div class="styleguide report">
      <script>
        var reportData = {{{json page.content.report}}};
      </script>
      <div id="simplicity_chart" style="width: 100%; height: 500px;"></div>
      <div id="size_chart" style="width: 100%; height: 500px;"></div>
      <div class="us-content-group">
        <h2>Breakdown of stats by uStyle release</h2>
        <table class="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th>Version</th>
              <th>Selectors</th>
              <th>Simplicity</th>
              <th>Rules</th>
              <th>Universal selectors</th>
              <th>Media queries</th>
              <th>Important keywords</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {{#each page.content.report}}
              <tr>
                <td><strong class="us-color--typecyan">{{this.version}}</strong></td>
                <td>{{this.selectors}}</td>
                <td>{{number this.simplicity}}</td>
                <td>{{this.rules}}</td>
                <td>{{this.universalSelectors}}</td>
                <td>{{this.mediaQueries}}</td>
                <td>{{this.importantKeywords}}</td>
                <td>{{humanFileSize this.size}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  {{> _footer}}
</body>
</html>
