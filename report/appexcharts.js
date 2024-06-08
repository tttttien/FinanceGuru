var options = {
    series: [{
        name: 'Total Revenue - 2024',
        type: 'area',
        data: [30000, 80000, 1000000, 47, 31, 43, 26, 41, 31, 47, 33]
    }, {
        name: 'Total Expenditure - 2024',
        type: 'line',
        data: [50000, 90000, 1200000, 61, 43, 54, 37, 52, 44, 61, 43]
    }, {
        name: 'Total Revenue - 2025',
        type: 'area',
        data: [35000, 75000, 950000, 50, 35, 45, 30, 50, 40, 55, 38]
    }, {
        name: 'Total Expenditure - 2025',
        type: 'line',
        data: [55000, 85000, 1150000, 65, 48, 58, 43, 57, 49, 66, 48]
    }],
    chart: {
        height: 350,
        type: 'line',
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: [0.35, 1],
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
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
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " VND";
                }
                return y;
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#areachart"), options);
chart.render();
document.querySelector('.apexcharts-menu-item.exportCSV').addEventListener('click', function () {
    // Prepare CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Month,Total Revenue - 2024,Total Expenditure - 2024,Total Revenue - 2025,Total Expenditure - 2025\n";

    // Assuming you have monthly data for both 2024 and 2025
    for (let i = 0; i < 12; i++) {
        csvContent += `${options.labels[i]},${options.series[0].data[i]},${options.series[1].data[i]},${options.series[2].data[i]},${options.series[3].data[i]}\n`;
    }

    // Create a link element to trigger download
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "report.csv");
    document.body.appendChild(link); // Required for FF

    // // Trigger download
    // link.click();
});