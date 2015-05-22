{{> _head}}
<body>
  {{> _header}}
  {{> _sidebar}}
  <div id="wrapper" class="container header--push sidebar--push">
    <h1 class="styleguide__title">{{page.name}}</h1>
    <div class="us-grid-row">
      <div class="us-content styleguide report us-col-md-12">
        <script>
          var reportData = {{{json page.content.report}}};
        </script>
        <div id="simplicity_chart" style="width: 100%; height: 500px;" class='us-container' ></div>
        <div id="size_chart" style="width: 100%; height: 500px;" class='us-container'></div>
        <h2>Breakdown of stats by ustyle release</h2>
        {{#each page.content.report}}

        <div class="report--entry">
          {{#each this}}
            {{#isString this}}
              <div class="stat__entry us-col-md-4 stat--string">
                <div class="stat__value">{{this}}</div>
                <div class="stat__title">{{@key}}</div>
              </div>
            {{/isString}}

            {{#isNumber this @key}}
            <div class="stat__entry us-col-md-4 stat--number">
              <div class="stat__value">{{this}}</div>
              <div class="stat__title">{{@key}}</div>
            </div>
            {{/isNumber}}

            {{#isArray this}}
            <div class="stat__list us-col-md-4 stat--array">
              <div class="stat__value">{{this}}</div>
              <div class="stat__title">{{@key}}</div>
            </div>
            {{/isArray}}
          {{/each}}

        </div>

        {{/each}}
      </div>
    </div>
  </div>
  {{> _footer}}
  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
  <script type="text/javascript">

    function humanFileSize(size) {
        if(size < 1024) return size;
        var i = Math.floor( Math.log(size) / Math.log(1024) );
        return ( size / Math.pow(1024, i) ).toFixed(2) * 1  + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };

    google.load('visualization', '1.1', {packages:['line']});
    google.setOnLoadCallback(drawChart);

    function drawChart() {
      var simplicityData, simplicityTable, simplicityOptions, simplicityChart,
      sizeData, sizeTable, sizeOptions, sizeChart,
      formatter;

      simplicityData = reportData.reverse().map(function(e){return [e.version, e.rules, e.selectors]});
      simplicityData.unshift(['Version', 'Rules', 'Selectors']);
      simplicityTable = google.visualization.arrayToDataTable(simplicityData);

      simplicityOptions = {
        chart: {
          title: 'Simplicity chart',
          subtitle: 'Evolution of rules and selectors over ustyle releases',
          vAxis: {
            format: ''
          }
        }
      };

      simplicityChart = new google.charts.Line(document.getElementById('simplicity_chart'));
      simplicityChart.draw(simplicityTable, simplicityOptions);

      sizeData = reportData.map(function(e){return [e.version, e.size]});
      sizeData.unshift(['Version', 'Size (bytes)']);
      sizeTable = google.visualization.arrayToDataTable(sizeData);

      sizeOptions = {
        chart: {
          title: 'Size chart',
          subtitle: 'Evolution of ustyle size over releases',
          vAxis: {
            format: ''
          }
        }
      };

      sizeChart = new google.charts.Line(document.getElementById('size_chart'));
      sizeChart.draw(sizeTable, sizeOptions);

    };
  </script>
</body>
</html>
