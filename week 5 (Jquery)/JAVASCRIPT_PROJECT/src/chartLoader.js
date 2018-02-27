require('chart.js')

export const activeChartLoader = (() => {
    let barChartLoader = (ctx, label, values) => {
        console.log("bar Chart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    label: 'USD Value',
                    data: values,
                    backgroundColor: [
                        'red',
                        'green',
                        'blue',
                        'red',
                        'green',
                        'blue',
                        'red',
                        'green',
                        'blue',
                        'red'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }
    let areaChartLoader = () => {
        console.log("area Chart");

    }
    return {
        loadChart: (ctx, type, labels, data) => {
            switch (type) {
                case "bar":
                    barChartLoader(ctx, labels, data);
                    break;
                case "area":
                    areaChartLoader(ctx, labels, data);
                    break;

                default:
                    break;
            }
        }
    }
})();