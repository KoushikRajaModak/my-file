//ActualNPT
//function NTPShow() {
//    $.ajax({
//        type: "POST",
//        url: '/NPTControl/NPTValuShow/',
//        datatype: "json",
//        contentType: "application/json: charset=utf-8",
//        data: JSON.stringify({}),
//        success: function (json) {
//            var NPTValue = json.NPTValue;
//            $("#ActualNPT").val(NPTValue);
//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }

//    });
//    setTimeout(NTPShow, 10000);

//}
//NTPShow();

//$(document).ready(function () { NTPShow() })

var chart; // Variable to hold the chart object

// Function to create the chart
function createChart(data) {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'spline',
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
            }
        },
        title: {
            text: 'Nutral Pause Time Trend ',
            align: 'left'
        },

        xAxis: {
            reversed: true,
            categories: data.CokeDate,
        },
        yAxis: {

            title: {

                text: 'Nutral Pause Time'
            },
            min: 0, // Set the minimum value for the y-axis
            max: 100, // Set the maximum value for the y-axis
            // other yAxis properties...
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            opposite: true,
            plotBands: [{ // Critically Low
                from: 0,
                to: 10,
                color: 'rgba(228, 112, 30, 0.94)',
                label: {
                    text: 'Critically Low',
                    style: {
                        //color: '#606060',
                        color: '#1a0807',
                        textAlign: 'right' // Align the text to the right
                        
                    }
                }
            }, { // Very Low
                from: 10,
                to: 20,
                color: 'rgba(212, 61, 61, 0.88)',
                label: {
                    text: 'Very Low',
                    style: {
                        color: '#1a0807',
                           textAlign: 'right' // Align the text to the right
                    }
                }
            }, { // Low
                from: 20,
                to: 30,
                color: 'rgb(255 211 83 / 88%)',
                label: {
                    text: 'Low',
                    style: {
                        color: '#1a0807',
                        textAlign: 'right' // Align the text to the right

                    }
                }
                }, { // Operating Zone
                from: 30,
                to: 70,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Operating Zone',
                    style: {
                        color: '#1a0807',
                        textAlign: 'right' // Align the text to the right

                    }
                }
                }, { //High
                from: 70,
                to: 80,
                color: 'rgb(255 211 83 / 88%)',
                label: {
                    text: 'High',
                    style: {
                        color: '#1a0807',
                        textAlign: 'right' // Align the text to the right
                       
                    }
                }
                }, { // Very High
                from: 80,
                to: 90,
                color: 'rgba(212, 61, 61, 0.88)',
                label: {
                    text: 'Very High',
                    style: {
                        color: '#1a0807',
                        textAlign: 'right' // Align the text to the right

                    }
                }
                }, { // Critically High
                from: 90,
                to: 100,
                color: 'rgba(228, 112, 30, 0.94)',
                label: {
                    text: 'Critically High',
                    style: {
                        color: '#1a0807',
                        textAlign: 'right' // Align the text to the right
                        
                    }
                }
            }]
        },
        tooltip: {
           /* valueSuffix: ' m/s',*/
            shared: true,
            crosshairs: true,
        },

        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
               
            }
        },

        series: [{
            name: 'Actual NPT',
            data: data.NPTValue,
            zones: [{
                value: 10,
                //color: 'blue'
            }, {
                value: 20,
                //color: '#2e0e80'
            }, {
                value: 30,
                //color: '#166ba1'
            }, {
                value: 40,
                //color: '#1e16a1'
            }, {
                value: 50,
                //color: 'yellow'
            }, {
                value: 60,
                //color: 'blue'
            }, {
                /*color: 'red' // Color for values greater than the last zone*/
            }],
            // ...
        }, {

            name: 'Estimat NPT',
            data: data.Estimation_NPT,
            zones: [{
                value: 10,
                //color: 'blue'
            }, {
                value: 20,
                //color: '#2e0e80'
            }, {
                value: 30,
                //color: '#166ba1'
            }, {
                value: 40,
                //color: '#1e16a1'
            }, {
                value: 50,
                //color: 'yellow'
            }, {
                value: 60,
                //color: 'blue'
            }, {
                /*color: 'red' // Color for values greater than the last zone*/
            }],

        }],
        // ...
    });
}

// Function to fetch live data from the server and update the chart
function fetchLiveData() {
    $.ajax({
        url: '/NPTControl/NPTAnalityes',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (!chart) {
                // If the chart doesn't exist, create it with the initial data
                createChart(data);
            } else {
                // Update the existing chart with the new data
                chart.xAxis[0].setCategories(data.CokeDate);
                chart.series[0].setData(data.NPTValue);
                chart.series[1].setData(data.Estimation_NPT);
            }

            // Fetch data again after a certain interval (e.g., every 5 seconds)
            setTimeout(fetchLiveData, 10000);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Error fetching live data:', errorThrown);
        }
    });
}

// Fetch the initial data and start updating the chart
fetchLiveData();


$(document).ready(function () { fetchLiveData() })




function NPTView() {
    $.ajax({
        type: "POST",
        url: '/NPTControl/NPT_Data_View/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload = json1.html;
            var dataset = eval("[" + tableload + "]");

            // Initialize DataTable with options
            $('#NptViewTable').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                columns: [
                    { title: 'Coke Date Time', with:'5%' }, // Set initial width if needed
                    { title: 'Running NPT', with: '5%' },
                    { title: 'Estimat NPT', with: '5%' },
                    { title: 'Comments', with: '25%' },
                    { title: 'Note', with: '45%' }
                   
                ],
                scrollY: '340px',
                colReorder: true, // Enable column reordering
                colResize: {
                    fixedLayout: false, // Enable column resizing
                    // order: 1 // Initial column order (optional)
                },
                //dom: '<"top"B<"float-left"l><"float-right"f>><"clearfix">rt<"bottom"ip>', // Place buttons, page length, and search
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Export to Excel',
                        title: 'Custom_Sheet_Name', // Set your custom sheet name here
                        filename: 'custom_excel_file', // Set the file name if needed
                    },
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],

            });

            // Call the NPTView function again after a delay of 5000 milliseconds (5 seconds)
           setTimeout('NPTView()', 10000);
        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload;
        }
    });
}

// Call the NPTView function initially to start the data retrieval process
NPTView();
$(document).ready(function () { NPTView() })