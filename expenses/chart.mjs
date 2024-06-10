document.addEventListener('DOMContentLoaded', async function () {
    // Call your functions once the DOM is ready
    const my_chart = document.getElementById('my-chart').getContext('2d');
    const expenseChart = new ExpenseChart(my_chart); // Create a new instance of ExpenseChart
    try {
        const expensedata = await fetchExpenseByMonthForAreaChart(2024);
        expenseChart.createChart(expensedata);
        expenseChart.updateChart();
    } catch (error) {
        console.error('Error:', error);
    }
});
//export { bar_chart };
async function fetchExpenseByMonthForAreaChart(year) {
    const response = await fetch(`http://localhost:2001/expenses/chartdata/${year}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

class ExpenseChart {
    constructor(my_chart) {
        Chart.defaults.global.defaultFontSize = 16;
        this.my_chart = my_chart;
        this.chart;
        this.previousFetchedData = [];
    }

    createChart(expenseData) {
        if (!Array.isArray(expenseData)) {
            console.error('Invalid data format:', expenseData);
            return; // Exit the function early
        }
        const Amount2024 = expenseData.map((entry) => entry.currentYearExpense);
        this.chart = new Chart(this.my_chart, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: 'Amount (VND)',
                    data: Amount2024,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#000'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Monthly amount of expenses',
                    fontSize: 28
                },
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        top: 50
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 20
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Amount (VND)',
                            fontSize: 20
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 18
                        },
                    }]
                }
            }
        });
        this.previousFetchedData = expenseData;
    }
    updateChart() {
        const newData = this.previousFetchedData;
        if (!Array.isArray(newData)) {
            console.error('Invalid data format:', newData);
            return; // Exit the function early
        }

        const Amount2024 = newData.map((entry) => entry.currentYearExpense);

        // Cập nhật dữ liệu trực tiếp trong mảng dữ liệu của biểu đồ
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data = Amount2024;
        });

        // Update the chart
        this.chart.update();
    }

}


export { ExpenseChart };