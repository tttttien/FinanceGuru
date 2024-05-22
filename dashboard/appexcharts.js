
var options = {
    series: [{
    name: 'Total Revenue',
    type: 'area',
    data: [30000, 80000, 1000000, 47, 31, 43, 26, 41, 31, 47, 33]
  }, {
    name: 'Total Expenditure',
    type: 'line',
    data: [50000, 90000, 1200000, 61, 43, 54, 37, 52, 44, 61, 43]
  }],
    chart: {
    height: 500,
    type: 'line',
  },
  stroke: {
    curve: 'smooth'
  },
  fill: {
    type:'solid',
    opacity: [0.35, 1],
  },
  labels: ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: '2024',
      },
    },
    {
      opposite: true,
      title: {
        text: '2025',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if(typeof y !== "undefined") {
          return  y.toFixed(0) + " VND";
        }
        return y;
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#areachart"), options);
  chart.render();