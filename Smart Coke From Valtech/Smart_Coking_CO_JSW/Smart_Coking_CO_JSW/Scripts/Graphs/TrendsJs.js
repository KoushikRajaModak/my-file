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

    document.getElementById("SelectDate_current").defaultValue = todayDate;
    document.getElementById("SelectDate_Coke_Temp").defaultValue = todayDate;
    document.getElementById("Select_From_Control_Flow_D").defaultValue = todayDate;
    document.getElementById("Select_From_Control_Flow_A").defaultValue = todayDate;
    //document.getElementById("Select_To_Date_Control_Flow").defaultValue = nextDateStr;
    document.getElementById("Select_From_Date_Gas_Flow").defaultValue = todayDate;
    document.getElementById("Select_To_Date_Gas_Flow").defaultValue = nextDateStr;
    document.getElementById("Select_From_Date_Wgast_Gas_Flow").defaultValue = todayDate;
    document.getElementById("Select_To_Date_Wgast_Gas_Flow").defaultValue = nextDateStr;
    document.getElementById("Select_From_Date_Calorific_Value").defaultValue = todayDate;
    document.getElementById("Select_To_Date_Calorific_Value").defaultValue = nextDateStr;
   // document.getElementById("Select_From_Date_Pushings_Per_Week").defaultValue = todayDate;
    //document.getElementById("Select_From_Date_Pushings_Per_Month").defaultValue = MonthOnly;
};





/*Current*/
function Current() {

    var SelectOven = document.getElementById("SelectOven_current").value;
    const date_1 = document.getElementById("SelectDate_current").value;
    $.ajax({
        type: "POST",
        url: '/Analysis/Current/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ SelectOven: SelectOven, date_1: date_1 }),
        success: function (json) {

            var Totalcurrent = json.Totalcurrent;
            const Current1 = json.Current1;
            const Current2 = json.Current2;
            const Current3 = json.Current3;
            let Date1 = json.Date1;
            let Date2 = json.Date2;
            let Date3 = json.Date3;




            if (Current2.length === 0 && Current3.length === 0) {

                //document.getElementById("ListDate").innerText = `${Date1}`;

                Highcharts.chart('container', {

                    chart: {
                        zoomBySingleTouch: true,
                        zoomType: 'x',
                        scrollablePlotArea: {
                            minWidth: 300,
                            scrollPositionX: 1
                        }
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true
                    },

                    title: {
                        text: 'Oven Wise Current: ' + SelectOven
                    },

                    xAxis: {

                        categories: Totalcurrent
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature (°C)'
                        }
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            className: 'popup-on-click',
                            marker: {
                                lineWidth: 1
                            }
                        }
                    },


                    series: [{
                        lineWidth: 2,
                        marker: {
                            radius: 2
                        },

                        name: Date1,
                        data: Current1

                    }]


                });
            } else if (Current3.length === 0) {



                //document.getElementById("ListDate").innerText = `${Date1}
                //                                                 ${Date2}`;



                Highcharts.chart('container', {

                    chart: {
                        zoomBySingleTouch: true,
                        zoomType: 'x',
                        scrollablePlotArea: {
                            minWidth: 300,
                            scrollPositionX: 1
                        }
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true
                    },

                    title: {
                        text: 'Oven Wish Current'
                    },

                    xAxis: {

                        categories: Totalcurrent
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature (°C)'
                        }
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            className: 'popup-on-click',
                            marker: {
                                lineWidth: 1
                            }
                        }
                    },


                    series: [{
                        lineWidth: 2,
                        marker: {
                            radius: 2
                        },

                        name: Date1,
                        data: Current1

                    }, {
                        name: Date2,
                        data: Current2,

                    }]





                });
            } else {

                //document.getElementById("ListDate").innerText = `${Date1}
                //                                                 ${Date2}
                //                                                 ${Date2}`;
                Highcharts.chart('container', {

                    chart: {
                        zoomBySingleTouch: true,
                        zoomType: 'x',
                        scrollablePlotArea: {
                            minWidth: 300,
                            scrollPositionX: 1
                        }
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true
                    },

                    title: {
                        text: 'Oven Wish Current'
                    },

                    xAxis: {

                        categories: Totalcurrent
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature (°C)'
                        }
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            className: 'popup-on-click',
                            marker: {
                                lineWidth: 1
                            }
                        }
                    },



                    series: [{
                        lineWidth: 2,
                        marker: {
                            radius: 2
                        },

                        name: Date1,
                        data: Current1

                    }, {
                        name: Date2,
                        data: Current2,

                    }, {
                        name: Date3,
                        data: Current3,
                    }]


                });
            }




        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    })
};

/*@* Coke Temp.*@*/
function COKETEMP() {

    var SelectOven = document.getElementById("SelectOven_COKETEMP").value;
    const date_1 = document.getElementById("SelectDate_Coke_Temp").value;
    $.ajax({
        type: "POST",
        url: '/Analysis/COKETEMP/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ SelectOven: SelectOven, date_1: date_1 }),
        success: function (json) {

            var Totalcurrent = json.Totalcurrent;
            const Current1 = json.Current1;
            const Current2 = json.Current2;
            const Current3 = json.Current3;
            let Date1 = json.Date1;
            let Date2 = json.Date2;
            let Date3 = json.Date3;




            if (Current2.length === 0 && Current3.length === 0) {

                //document.getElementById("ListDate").innerText = `${Date1}`;

                Highcharts.chart('container', {

                    chart: {
                        zoomBySingleTouch: true,
                        zoomType: 'x',
                        scrollablePlotArea: {
                            minWidth: 330,
                            scrollPositionX: 1
                        }
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true
                    },

                    title: {
                        text: 'Coke Temperature Profile' + ':' + SelectOven
                    },

                    xAxis: {

                        categories: Totalcurrent
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature (°C)'
                        },
                        //min: 500,  // Set the minimum value for the Y-axis
                        //max: 1000,  // Set the maximum value for the Y-axis
                    },
                    plotOptions: {
                        //line: {
                        //    dataLabels: {
                        //        enabled: true
                        //    },
                        //    enableMouseTracking: false
                        //},


                        series: {
                            cursor: 'pointer',
                            className: 'popup-on-click',
                            marker: {
                                lineWidth: 1
                            }
                        }
                    },


                    series: [{
                        lineWidth: 2,
                        marker: {
                            radius: 2
                        },

                        name: Date1,
                        data: Current1

                    }]


                });
            } else if (Current3.length === 0) {



                //document.getElementById("ListDate").innerText = `${Date1}
                //                                                 ${Date2}`;



                Highcharts.chart('container', {

                    chart: {
                        zoomBySingleTouch: true,
                        zoomType: 'x',
                        scrollablePlotArea: {
                            minWidth: 300,
                            scrollPositionX: 1
                        }
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true
                    },

                    title: {
                        text: SelectOven + ' :' + 'Oven'
                    },

                    xAxis: {

                        categories: Totalcurrent
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature (°C)'
                        }
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            className: 'popup-on-click',
                            marker: {
                                lineWidth: 1
                            }
                        }
                    },


                    series: [{
                        lineWidth: 2,
                        marker: {
                            radius: 2
                        },

                        name: Date1,
                        data: Current1

                    }, {
                        name: Date2,
                        data: Current2,

                    }]





                });
            } else {

                document.getElementById("ListDate").innerText = `${Date1}
                                                                 ${Date2}
                                                                 ${Date2}`;
                Highcharts.chart('container', {

                    chart: {
                        zoomBySingleTouch: true,
                        zoomType: 'x',
                        scrollablePlotArea: {
                            minWidth: 300,
                            scrollPositionX: 1
                        }
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true
                    },

                    title: {
                        text: SelectOven + ' :' + 'Oven'
                    },

                    xAxis: {

                        categories: Totalcurrent
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature (°C)'
                        }
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            className: 'popup-on-click',
                            marker: {
                                lineWidth: 1
                            }
                        }
                    },



                    series: [{
                        lineWidth: 2,
                        marker: {
                            radius: 2
                        },

                        name: Date1,
                        data: Current1

                    }, {
                        name: Date2,
                        data: Current2,

                    }, {
                        name: Date3,
                        data: Current3,
                    }]


                });
            }




        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    })
};

/*@* Control Flue Temp.Daily *@*/
function Control_Flue_Temp_D() {
    var From_Date = document.getElementById("Select_From_Control_Flow_D").value;
    

    $.ajax({
        type: "POST",
        url: '/Analysis/Control_Flue_Temp_Daily/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date}),
        success: function (json) {

            var TimeStamp = json.TimeStamp;
            var Oven = json.Oven;
            var AvgCFT_PS = json.AvgCFT_PS;
            var AvgCFT_CS = json.AvgCFT_CS;
          
            Highcharts.chart('container', {
                ///Zoom  nd scrollPositionX
                //chart: {
                //    zoomBySingleTouch: true,
                //    zoomType: 'x',
                //    scrollablePlotArea: {
                //        minWidth: 3333,
                //        scrollPositionX: 1
                //    }
                //},
                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                title: {
                    text: 'Control Flue Temperatures : ' + From_Date
                },

                xAxis: {

                    categories: Oven
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        className: 'popup-on-click',
                        marker: {
                            lineWidth: 1
                        }
                    }
                },


                series: [{
                    lineWidth: 2,
                    marker: {
                        radius: 2
                    },

                    name: "PUSHER SIDE",
                    data: AvgCFT_PS,
                }, {
                    name: "COKE SIDE",
                    data: AvgCFT_CS,

                }]


            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
}
//@* Control Flue Temp.All Oven *@
function Control_Flue_Temp_A() {
    var From_Date = document.getElementById("Select_From_Control_Flow_A").value;
    var SelectOven = document.getElementById("SelectOven_ControlFlue_A").value;
    var ToDaes = document.getElementById("Select_Day_Control_Flow_A").value;

    $.ajax({
        type: "POST",
        url: '/Analysis/Control_Flue_Temp_AllOven/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date, SelectOven: SelectOven, ToDaes: ToDaes }),
        success: function (json) {

            var TimeStamp = json.TimeStamp;
            var Oven = json.Oven;
            var AvgCFT_PS = json.AvgCFT_PS;
            var AvgCFT_CS = json.AvgCFT_CS;

            Highcharts.chart('container', {
                ///Zoom  nd scrollPositionX
                chart: {
                    zoomBySingleTouch: true,
                    zoomType: 'x',
                    scrollablePlotArea: {
                        minWidth: 3333,
                        scrollPositionX: 1
                    }
                },
                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                title: {
                    text: 'Control Flue Temperatures :' + SelectOven
                },

                xAxis: {

                    categories: TimeStamp
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        className: 'popup-on-click',
                        marker: {
                            lineWidth: 1
                        }
                    }
                },


                series: [{
                    lineWidth: 2,
                    marker: {
                        radius: 2
                    },

                    name: "PUSHER SIDE",
                    data: AvgCFT_PS,
                }, {
                    name: "COKE SIDE",
                    data: AvgCFT_CS,

                }]


            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
}


//@* Gas Flow *@
function Gas_Flow() {

    var From_Date = document.getElementById("Select_From_Date_Gas_Flow").value;
    var To_Date = document.getElementById("Select_To_Date_Gas_Flow").value;

    $.ajax({
        type: "POST",
        url: '/Analysis/Gas_Flow/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date, To_Date: To_Date }),
        success: function (json) {

            var TIMEFIELD = json.TIMEFIELD;
            var MIXGASFlow_PS = json.MIXGASFlow_PS;
            var MIXGASFlow_CS = json.MIXGASFlow_CS;
            var CokegasFlow_PS = json.CokegasFlow_PS;
            var CokegasFlow_CS = json.CokegasFlow_CS;
            Highcharts.chart('container', {

                chart: {
                    zoomBySingleTouch: true,
                    zoomType: 'x',
                    scrollablePlotArea: {
                        minWidth: 3333,
                        scrollPositionX: 1
                    }
                },
                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                title: {
                    text: 'Gas Flow Mixed Gas'
                },

                xAxis: {

                    categories: TIMEFIELD
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        className: 'popup-on-click',
                        marker: {
                            lineWidth: 1
                        }
                    }
                },


                series: [{
                    lineWidth: 2,
                    marker: {
                        radius: 2
                    },

                    name: "Mixed Gas Pusher Side",
                    data: MIXGASFlow_PS,
                }, {
                    name: "Mixed Gas Coke Side",
                    data: MIXGASFlow_CS,

                }, {
                    name: "Coke Gas Pusher Side",
                    data: CokegasFlow_PS,
                }, {
                    name: "Coke Gas Coke Side",
                    data: CokegasFlow_CS,


                }]


            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
}

//@* Wgast Gas Temp *@
function Wgast_Gas_Flow() {

    var From_Date = document.getElementById("Select_From_Date_Wgast_Gas_Flow").value;
    var To_Date = document.getElementById("Select_To_Date_Wgast_Gas_Flow").value;

    $.ajax({
        type: "POST",
        url: '/Analysis/Wgast_Gas_Flow/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date, To_Date: To_Date }),
        success: function (json) {

            var TIMEFIELD = json.TIMEFIELD;
            var WGASTEMP1 = json.WGASTEMP1;
            var WGASTEMP2 = json.WGASTEMP2;

            Highcharts.chart('container', {

                chart: {
                    zoomBySingleTouch: true,
                    zoomType: 'x',
                    scrollablePlotArea: {
                        minWidth: 3333,
                        scrollPositionX: 1
                    }
                },
                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                title: {
                    text: 'Wast Gas Flow '
                },

                xAxis: {

                    categories: TIMEFIELD
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        className: 'popup-on-click',
                        marker: {
                            lineWidth: 1
                        }
                    }
                },


                series: [{
                    lineWidth: 2,
                    marker: {
                        radius: 2
                    },

                    name: "Wast Gas Temperature 1",
                    data: WGASTEMP1
                }, {
                    name: "Wast Gas Temperature 2",
                    data: WGASTEMP2,

                }]


            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
}

//@* Calorific Value *@
function Calorific_Value() {

    var From_Date = document.getElementById("Select_From_Date_Calorific_Value").value;
    var To_Date = document.getElementById("Select_To_Date_Calorific_Value").value;

    $.ajax({
        type: "POST",
        url: '/Analysis/Calorific_Value/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date, To_Date: To_Date }),
        success: function (json) {

            var TIMEFIELD = json.TIMEFIELD;
            var CokegasCV = json.CokegasCV;
            var MixedgasCV = json.MixedgasCV;

            Highcharts.chart('container', {

                chart: {
                    zoomBySingleTouch: true,
                    zoomType: 'x',
                    scrollablePlotArea: {
                        minWidth: 3333,
                        scrollPositionX: 1
                    }
                },
                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                title: {
                    text: 'Calorific Value'
                },

                xAxis: {

                    categories: TIMEFIELD
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        className: 'popup-on-click',
                        marker: {
                            lineWidth: 1
                        }
                    }
                },


                series: [{
                    lineWidth: 2,
                    marker: {
                        radius: 2
                    },

                    name: "Cokegas CV",
                    data: CokegasCV,
                }, {
                    name: "Mixedgas CV",
                    data: MixedgasCV,

                }]


            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
}



$(document).ready(function () { Gas_Flow() })


