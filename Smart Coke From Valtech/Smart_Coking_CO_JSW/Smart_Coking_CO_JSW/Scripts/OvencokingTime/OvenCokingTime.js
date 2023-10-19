function updateData() {
    $.ajax({
        type: "POST",
        url: '/General/OvenTime1',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json1) {

            var tableload = json1.html1;
            var dataset = eval("[" + tableload + "]");

            $('#OvenCokingTime1').DataTable({

                ordering: false,
                info: false,
                paging: false,
                searching: false,
                data: dataset,
                lengthChange: false,


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
            location.reload;
        }

    });
    $.ajax({
        type: "POST",
        url: '/General/OvenTime2',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json2) {

            var tableload2 = json2.html2;
            var dataset2 = eval("[" + tableload2 + "]");

            $('#OvenCokingTime2').DataTable({

                ordering: false,
                info: false,
                paging: false,
                searching: false,
                data: dataset2,
                lengthChange: false,


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
            location.reload;
        }

    });
    $.ajax({
        type: "POST",
        url: '/General/OvenTime3',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json3) {

            var tableload3 = json3.html3;
            var dataset3 = eval("[" + tableload3 + "]");

            $('#OvenCokingTime3').DataTable({

                ordering: false,
                info: false,
                paging: false,
                searching: false,
                data: dataset3,
                lengthChange: false,


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
            location.reload;
        }

    });
    $.ajax({
        type: "POST",
        url: '/General/OvenTime4',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json4) {

            var tableload4 = json4.html4;
            var dataset4 = eval("[" + tableload4 + "]");

            $('#OvenCokingTime4').DataTable({

                ordering: false,
                info: false,
                paging: false,
                searching: false,
                data: dataset4,
                lengthChange: false,


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
            location.reload;
        }

    });
    $.ajax({
        type: "POST",
        url: '/General/OvenTime5',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json5) {

            var tableload5 = json5.html5;
            var dataset5 = eval("[" + tableload5 + "]");

            $('#OvenCokingTime5').DataTable({

                ordering: false,
                info: false,
                paging: false,
                searching: false,
                data: dataset5,
                lengthChange: false,


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
            location.reload;
        }

    });
    $.ajax({
        type: "POST",
        url: '/General/OvenTime6',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json6) {

            var tableload6 = json6.html6;
            var dataset6 = eval("[" + tableload6 + "]");

            $('#OvenCokingTime6').DataTable({

                ordering: false,
                info: false,
                paging: false,
                searching: false,
                data: dataset6,
                lengthChange: false,


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
            location.reload;
        }

    });
    $.ajax({
        type: "POST",
        url: '/General/OvenTime7',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json7) {

            var tableload7 = json7.html7;
            var dataset7 = eval("[" + tableload7 + "]");

            $('#OvenCokingTime7').DataTable({

                ordering: false,
                info: false,
                paging: false,
                searching: false,
                data: dataset7,
                lengthChange: false,


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
            location.reload;
        }

    });
    $.ajax({
        type: "POST",
        url: '/General/OvenTime8',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json8) {

            var tableload8 = json8.html8;
            var dataset8 = eval("[" + tableload8 + "]");

            $('#OvenCokingTime8').DataTable({

                ordering: false,
                info: false,
                paging: false,
                searching: false,
                data: dataset8,
                lengthChange: false,


            });

        },
        failure: function (errMsg) {
            alert(errMsg);
            location.reload;
        }

    });
}

$(document).ready(function () {
    // Initial data load
    updateData();

    // Refresh data every 10 seconds
    setInterval(function () {
        // Clear existing DataTables
        $('#OvenCokingTime1').DataTable().clear().destroy();
        $('#OvenCokingTime2').DataTable().clear().destroy();
        $('#OvenCokingTime3').DataTable().clear().destroy();
        $('#OvenCokingTime4').DataTable().clear().destroy();
        $('#OvenCokingTime5').DataTable().clear().destroy();
        $('#OvenCokingTime6').DataTable().clear().destroy();
        $('#OvenCokingTime7').DataTable().clear().destroy();
        $('#OvenCokingTime8').DataTable().clear().destroy();

        // Call the functions to update data and re-initialize DataTables
        updateData();
    }, 3000000); // 
});






//$(document).ready(function () {


//    $.ajax({
//        type: "POST",
//        url: '/General/Pushings_Per_Week/',
//        datatype: "json",
//        contentType: "application/json: charset=utf-8",
//        data: JSON.stringify({}),
//        success: function (json) {
//            var AShift = json.AShift;
//            var BShift = json.BShift;
//            var CShift = json.CShift;
//            var Days = json.Days;

//            var AShift_M = eval(AShift);
//            var BShift_M = eval(BShift);
//            var CShift_M = eval(CShift);
//            var Days_M = eval(Days);


//            Highcharts.chart('containerPerWeek', {
//                chart: {
//                    type: 'column'
//                },
//                title: {
//                    text: 'Pushing Per Week',
//                    align: 'left'
//                },
//                xAxis: {
//                    categories: Days_M
//                },
//                yAxis: {
//                    min: 0,
//                    title: {
//                        text: 'Count trophies'
//                    },
//                    stackLabels: {
//                        enabled: true
//                    }
//                },
//                legend: {
//                    align: 'left',
//                    x: 70,
//                    verticalAlign: 'top',
//                    y: 70,
//                    floating: true,
//                    backgroundColor:
//                        Highcharts.defaultOptions.legend.backgroundColor || 'white',
//                    borderColor: '#CCC',
//                    borderWidth: 1,
//                    shadow: false
//                },
//                tooltip: {
//                    headerFormat: '<b>{point.x}</b><br/>',
//                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
//                },
//                plotOptions: {
//                    column: {
//                        stacking: 'normal',
//                        dataLabels: {
//                            enabled: true,
//                            style: {
//                                fontSize: '10px' // Adjust the font size here
//                            }
//                        }
//                    }
//                },
//                series: [{
//                    name: 'A Shift',
//                    data: AShift_M
//                }, {
//                    name: 'B Shift',
//                    data: BShift_M,
//                    /*  color: '#3bc7c0',*/
//                }, {
//                    name: 'C Shift',
//                    data: CShift_M
//                }]
//            });
//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    })


//})



var Week;
function Pushing_Per_Week_Live(json) {
    Week = Highcharts.chart('containerPerWeek', {
        chart: {
            backgroundColor: '#3a2d2d00',
            type: 'bar',
        },
        title: {
            text: 'Pushing Per Week',
            align: 'left'
        },
        xAxis: {
            categories: json.Days,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'One Week'
            },
            stackLabels: {
                enabled: true
            }
        },
        legend: {
            align: 'left',
            x: 240,// Move 30 pixels to the right
            verticalAlign: 'top',
            y: 2,// Adjust the vertical position
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
            series: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '10px' // Adjust the font size here
                    }
                }
            }
        },
        series: [{
            name: 'A Shift',
            data: json.AShift,
        }, {
            name: 'B Shift',
            data: json.BShift,
            /*  color: '#3bc7c0',*/
        }, {
            name: 'C Shift',
            data: json.CShift,
        }],
        exporting: {
            enabled: false // Disable the context menu and exporting options
        }
    });


}
function Pushing_Per_Week() {
    $.ajax({
        type: "POST",
        url: '/General/Pushings_Per_Week/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({}),
        success: function (json) {
            json.Days = json.Days.replace(/'/g, "\"");

            // Now parse the JSON data
            json.AShift = JSON.parse(json.AShift);
            json.BShift = JSON.parse(json.BShift);
            json.CShift = JSON.parse(json.CShift);
            json.Days = JSON.parse(json.Days);

            if (!Week) {
                Pushing_Per_Week_Live(json);
            } else {
                Week.xAxis[0].setCategories(json.Days);
                Week.series[0].setData(json.AShift);
                Week.series[1].setData(json.BShift);
                Week.series[2].setData(json.CShift);
            }
            setTimeout(Pushing_Per_Week, 10000);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error fetching live data:', errorThrown);
            setTimeout(Pushing_Per_Week, 10000);
        }
    });
}
Pushing_Per_Week();


           
        

