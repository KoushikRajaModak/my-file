///Auto Date Set Today And Yesserday 
window.onload = function loadDate() {
    let date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();

    // Calculate the next day
    let nextDate = new Date(year, month - 1, day + 1); // Subtract 1 from month since months are 0-based

    if (nextDate.getMonth() + 1 !== month) {
        // If the next date is in the next month, adjust the month and day
        nextDate = new Date(year, month, 1);
    }

    const todayDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const nextDay = nextDate.getDate();
    const nextMonth = nextDate.getMonth() + 1;
    const nextYear = nextDate.getFullYear();
    const nextDateStr = `${nextYear}-${nextMonth < 10 ? '0' + nextMonth : nextMonth}-${nextDay < 10 ? '0' + nextDay : nextDay}`;
    const MonthOnly = `${year}-${month < 10 ? '0' + month : month}`;

   
    document.getElementById("SelectDate_Avg_coke_Temp").defaultValue = todayDate;
    document.getElementById("Select_From_Date_Pushings_Per_Week").defaultValue = todayDate;
    document.getElementById("Select_From_Control_Flow_Bar").defaultValue = todayDate;
    document.getElementById("Select_Date_MA").defaultValue = todayDate;
};









function Avg_coke_Temp() {
    var From_Date = document.getElementById("SelectDate_Avg_coke_Temp").value;

    $.ajax({
        type: "POST",
        url: '/Analysis/Ave_cokr_Temp/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date }),
        success: function (json) {
            var tableload = json.html;
            var Values = eval("[" + tableload + "]");

            Highcharts.chart('container', {
                chart: {
                    type: 'column',
                     zoomBySingleTouch: true,
                    zoomType: 'x',
                    scrollablePlotArea: {
                        minWidth: 3333,
                        scrollPositionX: 1
                    }
                },
                title: {
                    text: 'AVERAGE COKE TEMPERATURE'

                },
                subtitle: {

                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (millions)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Population in' + From_Date +' : <b>{point.y:.1f} millions</b>'
                },
                series: [{
                    name: 'Population',
                    colors: [
                        '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                        '#03c69b', '#00f194', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf'
                    ],
                    colorByPoint: true,
                    groupPadding: 0,
                    data: Values,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]

            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
}

function Pushings_Per_Week() {
    var Select_Date = document.getElementById("Select_From_Date_Pushings_Per_Week").value;

    $.ajax({
        type: "POST",
        url: '/Analysis/Pushings_Per_Week/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ Select_Date: Select_Date}),
        success: function (json) {
            var AShift = json.AShift;
            var BShift = json.BShift;
            var CShift = json.CShift;
            var Days = json.Days;

            var AShift_M = eval(AShift);
            var BShift_M = eval(BShift);
            var CShift_M = eval(CShift);
            var Days_M = eval(Days);


            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Pushing Per Week',
                    //align: 'left'
                },
                xAxis: {
                    categories: Days_M
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Count trophies'
                    },
                    stackLabels: {
                        enabled: true
                    }
                },
                legend: {
                    align: 'left',
                    x: 70,
                    verticalAlign: 'top',
                    y: 70,
                    floating: true,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: 'A Shift',
                    data: AShift_M
                }, {
                    name: 'B Shift',
                    data: BShift_M,
                  /*  color: '#3bc7c0',*/
                }, {
                    name: 'C Shift',
                    data: CShift_M
                }]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })

   
}
function Pushings_Per_Month() {

    var Select_Month = document.getElementById("Select_From_Date_Pushings_Per_Month").value;
    $.ajax({
        type: "POST",
        url: '/Analysis/Pushings_Per_Month/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ Select_Month: Select_Month }),
        success: function (json1) {

            var Datas = json1.TotaPusing;          
            var CountDate = json1.CountDate;
            var CountDate_C = eval("[" + CountDate + "]");
     

            Highcharts.chart('container', {
                chart: {
                    
                    zoomBySingleTouch: true,
                    zoomType: 'x',
                    scrollablePlotArea: {
                        minWidth: 3333,
                        scrollPositionX: 1
                    }
                },
                title: {
                    text: 'Pushings Per Month',
                    align: 'left'
                },
                subtitle: {

                },
                colors: [
                    '#4caefe',
                    '#3fbdf3',
                    '#35c3e8',
                    '#2bc9dc',
                    '#20cfe1',
                    '#16d4e6',
                    '#0dd9db',
                    '#03dfd0',
                    '#00e4c5',
                    '#00e9ba',
                    '#00eeaf',
                    '#23e274',
                    '#35c3e8',
                    '#2bc9dc',
                    '#20cfe1',
                    '#16d4e6',
                    '#0dd9db',
                    '#03dfd0',
                    '#00e4c5',
                    '#35c3e8',
                    '#2bc9dc',
                    '#20cfe1',
                    '#16d4e6',
                    '#0dd9db',
                    '#03dfd0',
                    '#00e4c5',
                    '#0dd9db',
                    '#03dfd0',
                    '#00e4c5',
                    '#00e9ba',
                    '#00eeaf',
                    '#23e274',
                    '#35c3e8',
                    '#2bc9dc',
                    '#20cfe1',
                    '#16d4e6',
                    '#0dd9db',
                    '#03dfd0',
                    '#00e4c5'
                ],
                xAxis: {
                    categories: CountDate_C
                },
                series: [{
                    type: 'column',
                    name: 'Total Pushing',
                    borderRadius: 5,
                    colorByPoint: true,
                    data: Datas,
                    showInLegend: false
                }]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })

    

}

function Pushing_Per_Year() {
 /*   $("#container").hidden;*/
    var Year = document.getElementById("Select_From_Date_Pushings_Per_Year").value
    $.ajax({
        type: "POST",
        url: '/Analysis/Pushing_Per_Year/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ Year: Year }),
        success: function (json) {
            var January = json.January;
            var February = json.February;
            var March = json.March = json.March;
            var April = json.April;
            var May = json.Maya;
            var June = json.June;
            var July = json.July;
            var August = json.August;
            var September = json.September;
            var October = json.October;
            var November = json.November;
            var December = json.December;
            var Jan_Day = json.Jan_Day;
            var Feb_Day = json.Feb_Day;
            var Mar_Day = json.Mar_Day;
            var Apr_Day = json.Apr_Day;
            var May_Day = json.May_Day;
            var Jun_Day = json.Jun_Day;
            var Jul_Day = json.Jul_Day;
            var Aug_Day = json.Aug_Day;
            var Sep_Day = json.Sep_Day;
            var Oct_Day = json.Oct_Day;
            var Nov_Day = json.Nov_Day;
            var Dec_Day = json.Dec_Day;

            var Jan_Day_M = eval("["+Jan_Day+"]");
            var Feb_Day_M = eval("["+Feb_Day+"]");
            var Mar_Day_M = eval("["+Mar_Day+"]");
            var Apr_Day_M = eval("["+Apr_Day+"]");
            var May_Day_M = eval("["+May_Day+"]");
            var Jun_Day_M = eval("["+Jun_Day+"]");
            var Jul_Day_M = eval("["+Jul_Day+"]");
            var Aug_Day_M = eval("["+Aug_Day+"]");
            var Sep_Day_M = eval("["+Sep_Day+"]");
            var Oct_Day_M = eval("["+Oct_Day+"]");
            var Nov_Day_M = eval("["+Nov_Day+"]");
            var Dec_Day_M = eval("[" + Dec_Day + "]");

            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    //align: 'left',
                    text: 'Pushing Per Year: '+ Year
                },
                subtitle: {
                    //align: 'left',
                    //text: 'Click the columns to view versions. Source: <a href="" target="_blank">statcounter.com</a>'
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Pushing Per Month'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:1f}'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:2f}</b> Total<br/>'
                },

                series: [
                    {
                        name: 'Month',
                        colorByPoint: true,
                        data: [
                            {
                                name: 'January',
                                y: January,
                                drilldown: 'January',
                                 events: {
                                     click: function () {
                                         debugger
                                        updateYAxisTitle(chart, 'Pushing Per Days');
                                    }
                                 }
                            },
                            {
                                name: 'February',
                                y: February,
                                drilldown: 'February'
                            },
                            {
                                name: 'March',
                                y: March,
                                drilldown: 'March'
                            },
                            {
                                name: 'April',
                                y: April,
                                drilldown: 'April'
                            },
                            {
                                name: 'May',
                                y: May,
                                drilldown: 'May'
                            },
                            {
                                name: 'June',
                                y: June,
                                drilldown: 'June'
                            },
                            {
                                name: 'July',
                                y: July,
                                drilldown: 'July'
                            },
                            {
                                name: 'August',
                                y: August,
                                drilldown: 'August'
                            },
                            {
                                name: 'September',
                                y: September,
                                drilldown: 'September'
                            },
                            {
                                name: 'October',
                                y: October,
                                drilldown: 'October'
                            },
                            {
                                name: 'November',
                                y: November,
                                drilldown: 'November'
                            },
                            {
                                name: 'December',
                                y: December,
                                drilldown: 'December'
                            }
                        ]
                    }
                ],
                drilldown: {
                    breadcrumbs: {
                        position: {
                            align: 'right'
                        }
                    },
                    series: [
                        {
                            name: 'January',
                            id: 'January',
                            data: Jan_Day_M
                        },
                        {
                            name: 'February',
                            id: 'February',
                            data: Feb_Day_M
                        },
                        {
                            name: 'March',
                            id: 'March',
                            data: Mar_Day_M
                        },
                        {
                            name: 'April',
                            id: 'April',
                            data: Apr_Day_M
                        },
                        {
                            name: 'May',
                            id: 'May',
                            data: May_Day_M
                        },
                        {
                            name: 'June',
                            id: 'June',
                            data: Jun_Day_M
                        },
                        {
                            name: 'July',
                            id: 'July',
                            data: Jul_Day_M
                        },
                        {
                            name: 'August',
                            id: 'August',
                            data: Aug_Day_M
                        },
                        {
                            name: 'September',
                            id: 'September',
                            data: Sep_Day_M
                        },
                        {
                            name: 'October',
                            id: 'October',
                            data: Oct_Day_M
                        },
                        {
                            name: 'November',
                            id: 'November',
                            data: Nov_Day_M
                        },
                        {
                            name: 'December',
                            id: 'December',
                            data:Dec_Day_M
                        }
                    ]
                }
            });





        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
}

$(document).ready(function () { Pushing_Per_Year() })

function Control_Flue_Temp_Bar() {
    var From_Date = document.getElementById("Select_From_Control_Flow_Bar").value;

    $.ajax({
        type: "POST",
        url: '/Analysis/Control_Flue_Temp_Bar/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date }),
        success: function (json) {
            var tableload = json.html;
            var Values = eval("[" + tableload + "]");

            Highcharts.chart('container', {
               
                chart: {
                    type: 'column',
                    zoomBySingleTouch: true,
                    zoomType: 'x',
                    scrollablePlotArea: {
                        minWidth: 3333,
                        scrollPositionX: 1
                    }
                },
                title: {
                    text: 'Control Flue Temp :' + From_Date

                },
                subtitle: {

                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Temperature(°C)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Temperature: <b>{point.y:.1f} °C</b>'
                },
                series: [{
                    name: 'Temperature',
                    colors: [
                        '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                        '#03c69b', '#00f194', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf'
                    ],
                    colorByPoint: true,
                    groupPadding: 0,
                    data: Values,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]

            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
}






function Mosisturiser_Amount(){
    var From_Date = document.getElementById("Select_Date_MA").value;

    $.ajax({
        type: "POST",
        url: '/Analysis/Mosisturiser_Amount/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date }),
        success: function (json) {
            var TIMEFIELD = json.TIMEFIELD;
            var Oven = json.Oven;
            var AMOUNT = json.AMOUNT;
            var MOISTURE = json.MOISTURE;
           
            //var chart = Highcharts.chart('container', {

            //    chart: {
            //        type: 'column'
            //    },

            //    title: {
            //        text: 'Amount and Moisturiser '
            //    },



            //    legend: {
            //        align: 'right',
            //        verticalAlign: 'middle',
            //        layout: 'vertical'
            //    },

            //    xAxis: {
            //        categories: Oven,
            //        labels: {
            //            x: -10
            //        }
            //    },

            //    yAxis: {
            //        allowDecimals: false,
            //        title: {
            //            text: 'Amount'
            //        }
            //    },

            //    series: [{
            //        name: 'Amount',
            //        data: AMOUNT
            //    }, {
            //        name: 'Moisturiser ',
            //        data: MOISTURE
            //    }],

            //    responsive: {
            //        rules: [{
            //            condition: {
            //                maxWidth: 500
            //            },
            //            chartOptions: {
            //                legend: {
            //                    align: 'center',
            //                    verticalAlign: 'bottom',
            //                    layout: 'horizontal'
            //                },
            //                yAxis: {
            //                    labels: {
            //                        align: 'left',
            //                        x: 0,
            //                        y: -5
            //                    },
            //                    title: {
            //                        text: null
            //                    }
            //                },
            //                subtitle: {
            //                    text: null
            //                },
            //                credits: {
            //                    enabled: false
            //                }
            //            }
            //        }]
            //    }
            //});



            var chart = Highcharts.chart('container', {
                chart: {
                    type: 'column',
                    zoomBySingleTouch: true,
                    zoomType: 'x',
                    scrollablePlotArea: {
                        minWidth: 3333,
                        scrollPositionX: 1
                    }
                },
                title: {
                    text: 'Moisturizers & Amount'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical'
                },
                xAxis: {
                    categories: Oven,
                    labels: {
                        x: -10
                    }
                },
                yAxis: [{
                    title: {
                        text: 'Amount'
                    },
                    allowDecimals: false
                }, {
                    max: 20,
                    title: {
                       
                        text: 'Moisturizers '
                    },
                    allowDecimals: false,
                    opposite: true // Place this yAxis on the right side
                }],
                series: [{
                    name: 'Amount',
                    data: AMOUNT,
                    yAxis: 0 // Associate this series with the first yAxis (Ava)
                }, {
                    name: 'Moisturizers',
                    data: MOISTURE,
                    yAxis: 1 // Associate this series with the second yAxis (Dina)
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            yAxis: [{
                                labels: {
                                    align: 'left',
                                    x: 0,
                                    y: -5
                                },
                                title: {
                                    text: null
                                }
                            }, {
                                labels: {
                                    align: 'right', // Adjust alignment for the right yAxis
                                    x: 0,
                                    y: -5
                                },
                                title: {
                                    text: null
                                }
                            }],
                            subtitle: {
                                text: null
                            },
                            credits: {
                                enabled: false
                            }
                        }
                    }]
                }
            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })

}