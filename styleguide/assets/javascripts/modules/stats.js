function humanFileSize(size) {
  if(size < 1024) return size;
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1  + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

google.charts.load('43', {packages: ['line']});

if (typeof reportData !== 'undefined' && reportData) {
  google.charts.setOnLoadCallback(drawChart);
}

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
      subtitle: 'Evolution of rules and selectors over uStyle releases',
      vAxis: {
        format: ''
      }
    }
  };

  sizeData = reportData.map(function(e){return [e.version, e.size]});
  sizeData.unshift(['Version', 'Size (bytes)']);
  sizeTable = google.visualization.arrayToDataTable(sizeData);

  sizeOptions = {
    chart: {
      title: 'Size chart',
      subtitle: 'Evolution of uStyle size over releases',
      vAxis: {
        format: ''
      }
    }
  };

  simplicityChart = new google.charts.Line(document.getElementById('simplicity_chart'));
  simplicityChart.draw(simplicityTable, simplicityOptions);

  sizeChart = new google.charts.Line(document.getElementById('size_chart'));
  sizeChart.draw(sizeTable, sizeOptions);
};
