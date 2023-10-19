
var a_701 = '#1693b1'
$(document).ready(function () { A() })

function A() {
    Highcharts.chart('containerOvenStatus', {
        chart: {
            backgroundColor: 'transparent', // Set background color to transparent
            type: 'column'
        },
        title: {
            text: 'Oven Status'
        },
        xAxis: {
            type: 'category',
            labels: {
                style: {
                    color: '#ff0000', // Change the color of x-axis labels to red (#ff0000)
                    fontSize: '20px'  // Add a font size of 14 pixels to x-axis labels
                }
            },
            gridLineWidth: 0, // Hide the grid lines on the x-axis
            gridLineColor: 'transparent' // Set grid line color to transparent
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                enabled: false // Disable the labels on the y-axis
            }
        },
        legend: {
            enabled: false
        },
        series: [
            {
                name: 'Population',
                colors: [
                    a_701, '#4c46db', '#4551d5', '#3e5ccf',
                    '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1',
                ],
                colorByPoint: true,
                groupPadding: 0,
                data: [
                    ['701', 37.33],
                    ['702', 37.33],
                    ['703', 37.33],
                    ['704', 37.33],
                    ['705', 37.33],
                    ['706', 37.33],
                    ['707', 37.33],
                    ['708', 37.33]
                ],
                dataLabels: {
                    enabled: false
                }
            }
        ],
        exporting: {
            enabled: false // Disable the context menu
        }
    });
}
   



