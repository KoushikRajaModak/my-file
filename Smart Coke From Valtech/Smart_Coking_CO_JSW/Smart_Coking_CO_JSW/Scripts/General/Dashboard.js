

// pushing oven
function PushOven() {
    $.ajax({
        url: '/General/All',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            var LastPushOven_N = json.LastPushOven_N;
            var NextOven = json.NextOven;
            var TotalCount = json.TotalCount;
            var AShiftTotalCount = json.AShiftTotalCount;
            var BShiftTotalCount = json.BShiftTotalCount;
            var CShiftTotalCount = json.CShiftTotalCount;
            var DailyTotalCount = json.DailyTotalCount;
            var Target = json.Target;
            var RunningNPT = json.RunningNPT;
            var PActualNPT = json.Actual_NPT;
            var CokegasCV = json.CokegasCV;
            var MixedgasCV = json.MixedgasCV;
            var CokegasFlow_PS = json.CokegasFlow_PS;
            var CokegasFlow_CS = json.CokegasFlow_CS;
            var MIXGASFlow_PS = json.MIXGASFlow_PS;
            var MIXGASFlow_CS = json.MIXGASFlow_CS;
            var WGASTEMP1 = json.WGASTEMP1;
            var WGASTEMP2 = json.WGASTEMP2;

            // Update HTML elements with fetched data
            //$("#LastOven").val(LastPushOven_N);
            //$("#NextOven").val(NextOven);PActualNPT
            document.getElementById("LastOven").textContent = LastPushOven_N;     
            document.getElementById("NextOven").textContent = NextOven;
            document.getElementById("PRunningNPT").textContent = RunningNPT;
            document.getElementById("CokeGasCV").textContent = CokegasCV;
            document.getElementById("MixGasCV").textContent = MixedgasCV;
            document.getElementById("CokeGasFlow_PS").textContent = CokegasFlow_PS;
            document.getElementById("CokeGasFlow_CS").textContent = CokegasFlow_CS;
            document.getElementById("MixGasFlow_PS").textContent = MIXGASFlow_PS;
            document.getElementById("MixGasFlow_CS").textContent = MIXGASFlow_CS;
            document.getElementById("PActualNPT").textContent = PActualNPT;
            //document.getElementById("WGASTEMP_2").textContent = WGASTEMP2;

            //$("#RunningNPT").val(RunningNPT);
            //$("#CokeGasCV").val(CokegasCV);
            //$("#MixGasCV").val(MixedgasCV);
            //$("#CokeGasFlow_PS").val(CokegasFlow_PS);
            //$("#CokeGasFlow_CS").val(CokegasFlow_CS);
            //$("#MixGasFlow_PS").val(MIXGASFlow_PS);
            //$("#MixGasFlow_CS").val(MIXGASFlow_CS);
            //$("#WGASTEMP_1").val(WGASTEMP1);
            //$("#WGASTEMP_2").val(WGASTEMP2);

           

            // Fetch live data again after a certain interval (e.g., every 5 seconds)
            setTimeout(function () {
                PushOven();
            }, 1000);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error fetching live data:', errorThrown);
        }
    });
}

// Call the PushOven function to start fetching live data
PushOven();


var chart;

function Target_Live(data) {

         

            const gaugeOptions = {
                chart: {
                    backgroundColor: '#3a2d2d00',
                   /* backgroundColor: '#00000000',*/
                    type: 'solidgauge'
                },

                title: null,

                pane: {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },

                exporting: {
                    enabled: false
                },

                tooltip: {
                    enabled: false
                },

                // the value axis
                yAxis: {
                    stops: [
                        [0.2, '#ff6b15e8'], // Orange
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#4aff00'] // red
                    ],
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 2,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    }
                },

                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            };
    var targetCompleteMessage = data.TotalCount >= data.TotalTarget ? 'Target Complete' : 'Pushing Complete';
            // The speed gauge
    chart = Highcharts.chart('container', Highcharts.merge(gaugeOptions, {

                yAxis: {
                    min: 0,
                    max: data.TotalTarget,
                    tickPositions: [0, data.TotalTarget],
                    labels: {
                       /* y: 5,*/
                        style: {
                            color: 'yellow',
                            fontSize:'17px',
                        }
                    },
                    title: {
                        text: 'Pushing Target :  ' + data.TotalTarget ,
                        style: {
                            fontSize: '19px', // Change the font size
                            color: '#333333' // Change the font color
                        }
                    },
                     endOnTick: false // Prevent rounding up the maximum value
                },

                credits: {
                    enabled: false
                },

                series: [{
                    name: 'Target',
                    data: [data.TotalCount],
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:25px">{y}</span><br/>' +
                            '<span style="font-size:16px;opacity:0.8">' + (data.TotalCount >= data.TotalTarget ? 'Target Complete' : 'Pushing Complete') + '</span>' +
                            '</div>',
                        style: { // Adjust the font size for the "Target Complete" text
                            fontSize: '16px'
                        }
                    
                    },
                   
                    tooltip: {
                        valueSuffix: 'Pushing Complete'
                    }
                }]

    }));


            
          


       

}


function Live_Terget() {
    $.ajax({
        url: '/General/Target_T',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (!chart) {
                Target_Live(data);
            } else {
                try {
                    if (chart.series && chart.series[0] && chart.series[0].data && chart.series[0].data[0]) {
                        chart.series[0].data[0].update({
                        
                            y: data.TotalCount
                        });
                    }
                    if (chart.series && chart.series[0] && chart.series[0].data && chart.series[0].data[1]) {
                        chart.series[0].data[1].update({
                          
                            y: data.TotalTarget
                        });
                    }
                } catch (error) {
                    console.error('Error updating chart:', error);
                }
            }
            setTimeout(Live_Terget, 10000);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error fetching live data:', errorThrown);
            setTimeout(Live_Terget, 10000); // Retry the request after a delay
        }
    });
}

// Call the function initially
Live_Terget();




/////MIX GAS FLOW

//var MixGas;

//function MixGasFlow_LiveLine(json) {
//    MixGas = Highcharts.chart('MixGasFlow', {
//        chart: {
//            type: 'spline'
//        },
//        title: {
//            text: 'Monthly Average Temperature'
//        },
//        xAxis: {
//            categories: json.TIMEFIELD,
//            max: 9 // Display only the latest 10 categories
//        },
//        yAxis: {
//            title: {
//                text: 'Temperature (°C)'
//            }
        
//        },
//        plotOptions: {
//            line: {
//                dataLabels: {
//                    enabled: true
//                },
//                enableMouseTracking: false
//            }
//        },
//        series: [{
//            name: 'MIXGASFlow_PS',
//            data: json.MIXGASFlow_PS,
//           /* yAxis: 0 // Assign the series to the first y-axis*/
//        }, {
//            name: 'MIXGASFlow_CS',
//            data: json.MIXGASFlow_CS,
//           /* yAxis: 1 // Assign the series to the second y-axis*/
//        }]
//    });
//}

//function MixGasFlow_Live() {
//    $.ajax({
//        url: '/General/MixGasFlow',
//        type: 'GET',
//        dataType: 'json',
//        success: function (json) {
//            if (!MixGas) {
//                MixGasFlow_LiveLine(json);
//            } else {
//                MixGas.xAxis[0].setCategories(json.TIMEFIELD);
//                MixGas.series[0].setData(json.MIXGASFlow_PS);
//                MixGas.series[1].setData(json.MIXGASFlow_CS);
//            }
//            setTimeout(MixGasFlow_Live, 10000);
//        },
//        error: function (xhr, textStatus, errorThrown) {
//            console.error('Error fetching live data:', errorThrown);
//            setTimeout(MixGasFlow_Live, 10000);
//        }
//    });
//}

//MixGasFlow_Live();



//COKE GAS FLOW

var cokeGas;
///Coking GasFlow
function CokeGasFlow_LiveLine(json) {
    cokeGas = Highcharts.chart('CokeGasFlows', {
        chart: {
            backgroundColor: '#3a2d2d00',
            //backgroundColor: '#00000000',
            type: 'spline'
        },
        title: {
            text: 'Gas Flow'
        },
        xAxis: {
            reversed: true,
            categories: json.TIMEFIELD,
            max: 9, // Display only the latest 10 categories
            //labels: {
            //    style: {
            //        fontWeight: 'bold',
            //        color: 'white'
            //    }
            //}
           
        },
        yAxis: {
            //title: {
            //    text: 'Temperature (°C)'
            //} 
            //labels: {
            //    style: {
            //       // fontWeight: 'bold',
            //        color: 'white'
            //    }
            //}

        },
        tooltip: {
            valueSuffix: '',
             crosshairs: true,
            shared: true
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        legend: false, /// pointer not show
        marker: {
                enabled: false
            },
        series: [{
            name: 'CokegasFlow_PS',
            data: json.CokegasFlow_PS,
            //yAxis: 0 // Assign the series to the first y-axis
        }, {
            name: 'CokegasFlow_CS',
            data: json.CokegasFlow_CS,
            //yAxis: 1 // Assign the series to the second y-axis
        }, {
            name: 'MIXGASFlow_PS',
            data: json.MIXGASFlow_PS,
        }, {
            name: 'MIXGASFlow_CS',
            data: json.MIXGASFlow_CS,
        }],
        exporting: {
        enabled: false // Disable the context menu and exporting options
        }
    });
}

function CokeGasFlow_Live() {
    $.ajax({
        url: '/General/CokeGasFlow',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            if (!cokeGas) {
                CokeGasFlow_LiveLine(json);
            } else {
                cokeGas.xAxis[0].setCategories(json.TIMEFIELD);
                cokeGas.series[0].setData(json.CokegasFlow_PS);
                cokeGas.series[1].setData(json.CokegasFlow_CS);
                cokeGas.series[2].setData(json.MIXGASFlow_PS);
                cokeGas.series[3].setData(json.MIXGASFlow_CS);
            }
            setTimeout(CokeGasFlow_Live, 10000);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error fetching live data:', errorThrown);
            setTimeout(CokeGasFlow_Live, 10000);
        }
    });
}

CokeGasFlow_Live();

// Secduling

// Rest of the code remains the same...
var ChargingCar_1, ChargingCar_2, PushgingCar_1, PushgingCar_2;
// Define an array of colors for each bar
var colors = ['#0000FF', '#0000FF', '#0000FF', '#0000FF'];

function CreateBarChart(containerId, chartTitle, chartData, colorIndex) {
    return Highcharts.chart(containerId, {
        chart: {
            type: 'bar',
            height: 80,
            margin: 18,
            backgroundColor: 'transparent',
            
        },
        title: {
            text: chartTitle,
            align: 'center',
            style: {
                fontSize: '14px'
            },
            margin: 0
        },
        credits: false,
        legend: false,
        tooltip: false,
        plotOptions: {
            bar: {
                borderWidth: 0,
                borderRadius: 3
            }
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: true,
            min: 0,
            max: 100,
            tickPositions: [0, 100],
            title: {
                text: null
            },
            gridLineWidth: 0,
            labels: {
                y: 5,
                style: {
                    color: 'yellow',

                }
            }
        },
        series: [
            {
                name: "Fill",
                data: [100],
                color: '#ffffff',
                grouping: false
            },
            {
                name: "Percentage",
                data: [chartData],
                color: colors[colorIndex],
                dataLabels: {
                    enabled: true,
                    inside: true,
                    align: 'right',
                    format: '{point.y}%',
                    style: {
                        color: 'white',
                        textOutline: false,
                        //fontSize: '10px' // Adjust the font size here
                    }
                }
            }
        ]
    });
}

function UpdateBarChart(chart, chartData, colorIndex) {
    chart.series[1].setData([chartData]);
    chart.series[1].update({ color: colors[colorIndex] });
}


///BerCahrt Section...........
//FetchDataAndUpdateCharts();
//function FetchDataAndUpdateCharts() {
//    $.ajax({
//        url: '/General/DalySecduling',
//        type: 'GET',
//        dataType: 'json',
//        success: function (json1) {


//            if (!ChargingCar_1) {
//                ChargingCar_1 = CreateBarChart('ChargingCar1', 'Charging car 1 :' + json1.CC1Count, json1.ChargingCar1, 0);
//            } else {
//                UpdateBarChart(ChargingCar_1, json1.ChargingCar1, 0);
//            }

//            if (!ChargingCar_2) {
//                ChargingCar_2 = CreateBarChart('Chargingcar2', 'Charging car 2 :' + json1.CC2Count, json1.ChargingCar2, 1);
//            } else {
//                UpdateBarChart(ChargingCar_2, json1.ChargingCar2, 1);
//            }

//            if (!PushgingCar_1) {
//                PushgingCar_1 = CreateBarChart('PushingCar1', 'Pushing Car 1 :' + json1.PC1Count, json1.PushgingCar1, 2);
//            } else {
//                UpdateBarChart(PushgingCar_1, json1.PushgingCar1, 2);
//            }

//            if (!PushgingCar_2) {
//                PushgingCar_2 = CreateBarChart('PushingCar2', 'Pushing Car 2 :' + json1.PC2Count, json1.PushgingCar2, 2);
//            } else {
//                UpdateBarChart(PushgingCar_2, json1.PushgingCar2, 2);
//            }

//            const colors = Highcharts.getOptions().colors.map((c, i) =>
//                // Start out with a darkened base color (negative brighten), and end
//                // up with a much brighter color
//                Highcharts.color(Highcharts.getOptions().colors[0])
//                    .brighten((i - 3) / 7)
//                    .get()

//            );
//            setTimeout(FetchDataAndUpdateCharts, 10000);
//        }, 
//        error: function (xhr, textStatus, errorThrown) {
//            console.error('Error fetching live data:', errorThrown);
//            setTimeout(FetchDataAndUpdateCharts, 10000);
//        }
//         //

//    });
//}

//FetchDataAndUpdateCharts();

var PicChart;
function ShiftPicChart(json) {
    const colors = Highcharts.getOptions().colors.map((c, i) =>
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        Highcharts.color(Highcharts.getOptions().colors[0])
            .brighten((i - 3) / 7)
            .get()
    );
    PicChart = Highcharts.chart('PieContainer', {
        chart: {

            //width: 250,
            backgroundColor: '#3a2d2d00',
            //plotBorderWidth: null,
            //plotShadow: false,
            type: 'pie'
        },
        title: {
            verticalAlign: 'middle',
            floating: true,
            text: '<span style="color: Black;">Total:</span><span style="color: yellow;">' + json.TotalCount + '</span>',
            
            align: 'center'
        },
        
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors,
                borderRadius: 5,
                innerSize: '50%',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br> {point.y}',
                    distance: -20,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        series: [{
            name: 'Share',
            data: [
                { name: 'AShift', y: json.AShift, color: '#063604' },
                { name: 'BShift', y: json.BShift, color: '#00078f' },
                { name: 'CShift', y: json.CShift, color: '#720447' }

            ]
        }],
        exporting: {
            enabled: false // Disable the context menu
        }
    });
}

function ShiftPicChart_Live() {
    $.ajax({
        url: '/General/DalySecduling',
        type: 'GET',
        dataType: 'json',
        success: function (json) {

           //AShift, BShift, CShift, Days
            // Now parse the JSON data
            json.AShift = JSON.parse(json.AShift);
            json.BShift = JSON.parse(json.BShift);
            json.CShift = JSON.parse(json.CShift);
            json.TotalCount = JSON.parse(json.TotalCount);

            if (!PicChart) {
                ShiftPicChart(json);
            } else {
                // Update the chart data here
                PicChart.xAxis[0].setCategories(json.TotalCount);
                PicChart.series[0].setData([
                    { name: 'AShift', y: json.AShift, color:'#063604'},
                    { name: 'BShift', y: json.BShift, color:'#00078f'},
                    { name: 'CShift', y: json.CShift, color:'#720447'}
                ]);
            }


            Highcharts.setOptions({
                exporting: {
                    enabled: false
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                }
            });

            // Or to disable individual menu items, you can use the following code:
            Highcharts.setOptions({
                exporting: {
                    menuItems: {
                        printChart: null,
                        downloadPNG: null,
                        downloadJPEG: null,
                        downloadPDF: null,
                        downloadSVG: null,
                        downloadCSV: null,
                        downloadXLS: null,
                        viewData: null
                    }
                }
            });



            if (!ChargingCar_1) {
                ChargingCar_1 = CreateBarChart('ChargingCar1', 'Charging Car-1: ' + json.CC1Count, json.ChargingCar1, 0);
            } else {
                UpdateBarChart(ChargingCar_1, json.ChargingCar1, 0);
            }

            if (!ChargingCar_2) {
                ChargingCar_2 = CreateBarChart('Chargingcar2', 'Charging Car-2: ' + json.CC2Count, json.ChargingCar2, 1);
            } else {
                UpdateBarChart(ChargingCar_2, json.ChargingCar2, 1);
            }

            if (!PushgingCar_1) {
                PushgingCar_1 = CreateBarChart('PushingCar1', 'Pushing Car-1: ' + json.PC1Count, json.PushgingCar1, 2);
            } else {
                UpdateBarChart(PushgingCar_1, json.PushgingCar1, 2);
            }

            if (!PushgingCar_2) {
                PushgingCar_2 = CreateBarChart('PushingCar2', 'Pushing Car-2: ' + json.PC2Count, json.PushgingCar2, 2);
            } else {
                UpdateBarChart(PushgingCar_2, json.PushgingCar2, 2);
            }

            const colors = Highcharts.getOptions().colors.map((c, i) =>
                // Start out with a darkened base color (negative brighten), and end
                // up with a much brighter color
                Highcharts.color(Highcharts.getOptions().colors[0])
                    .brighten((i - 3) / 7)
                  .get()

            );






            setTimeout(ShiftPicChart_Live, 10000);
            // setTimeout(FetchDataAndUpdateCharts, 10000);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error fetching live data:', errorThrown);
            setTimeout(ShiftPicChart_Live, 10000);
        }
    });
}
ShiftPicChart_Live()

