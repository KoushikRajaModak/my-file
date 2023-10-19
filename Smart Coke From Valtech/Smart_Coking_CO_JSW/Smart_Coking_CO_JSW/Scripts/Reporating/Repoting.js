//Charging And Pushing
$(document).ready(function () {
    //var SelectOven = document.getElementById("SelectOven_current").value;

    $("#View_AutoData_1").show();
    $("#View_AutoData_2").show();
    $("#View_SelectionData_1").hide();
    $("#View_SelectionData_2").hide();

    $.ajax({
        type: "POST",
        url: '/Reporting/Reporting_Data_View/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload_Cr = json1.html_Cr;
            var dataset_Cr = eval("[" + tableload_Cr + "]");

            // Initialize DataTable with options
            $('#View_Charging').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_Cr,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                columns: [
                    { title: 'Charging Time', width: '10%' }, // Set initial width if needed
                    { title: 'Oven', width: '5%' },
                    { title: 'Charging Car', width: '2%' }

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
                //bPaginate: false, 
            });


            var tableload_Pr = json1.html_Pr;
            var dataset_Pr = eval("[" + tableload_Pr + "]");
            // Initialize DataTable with options
            $('#View_Pushing').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_Pr,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],

                columns: [
                    { title: 'Pushing Time', width: '10%' }, // Set initial width if needed
                    { title: 'Oven', width: '10%' },
                    { title: 'Pusher Car', width: '2%' }
                
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
                ]
            });

        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload;
        }
    });

})

function btnSearch() {
   

    var SelectToday = document.getElementById("M_TodayN").value;
    var SelectYesterday = document.getElementById("M_YesterdayN").value;
    $("#View_AutoData_1").hide();
    $("#View_AutoData_2").hide();
    $("#View_SelectionData_1").show();
    $("#View_SelectionData_2").show();
    $("#Table_Views_P").hide();
    $("#Table_Views_D").hide();
    $("#Table_Views_M").hide();
    $("#Table_Views_CF").hide();
    $("#Table_Views_Npt").hide();
    var xcointainer = document.getElementById("Xcointainer");
    xcointainer.style.display = "flex"; 
    $.ajax({
        type: "POST",
        url: '/Reporting/Reporting_DateSelection_View/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ SelectToday: SelectToday, SelectYesterday: SelectYesterday }),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload_Cr = json1.html_Cr;
            var dataset_Cr = eval("[" + tableload_Cr + "]");

            // Initialize DataTable with options
            $('#View_Charging_s').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_Cr,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                columns: [
                    { title: 'Charging Time', width: '10%' }, // Set initial width if needed
                    { title: 'Oven', width: '10%' },
                    { title: 'Charging Car', width: '2%' }

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
                ]
            });
            var tableload_Pr = json1.html_Pr;
            var dataset_Pr = eval("[" + tableload_Pr + "]");
            // Initialize DataTable with options
            $('#View_Pushing_s').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_Pr,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],

                columns: [
                    { title: 'Pushing Time', width: '10%' }, // Set initial width if needed
                    { title: 'Oven', width: '10%' },
                    { title: 'Pusher Car', width: '2%' }

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
                ]

            });
            $('#refreshButton').on('click', function () {
                // Reload the page when the button is clicked
                location.reload();
            });
        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload(); // You need to call the reload function
        }
    });

}

//Production
function btn_Production() {
    $("#Table_Views_P").show();
    $("#Table_Views_D").hide();
    $("#Table_Views_M").hide();
    $("#Table_Views_CF").hide();
    $("#Table_Views_Npt").hide();
  
    var From_Date = document.getElementById("Yesterday_Production").value;
    var To_Date = document.getElementById("Today_Production").value;

    var xcointainer = document.getElementById("Xcointainer");
    xcointainer.style.display = "none"; 

    // Destroy the old DataTable (if it exists)
   
    $.ajax({
        type: "POST",
        url: '/Reporting/Proction_View/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date, To_Date: To_Date }),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload_Pc = json1.html_Pc;
            var dataset_Pc = eval("[" + tableload_Pc + "]");

            // Initialize DataTable with options
            $('#DataTables_P').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_Pc,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                columns: [
                    { title: 'Charging Time'}, // Set initial width if needed
                    { title: 'Oven'},
                    { title: 'Pushing Time'},
                    { title: 'Coking Gap' },
                    { title: 'Pushing Gap' }
                ],
                scrollY: '500px',
                colReorder: true, // Enable column reordering
                colResize: {
                    fixedLayout: false, // Enable column resizing
                    // order: 1 // Initial column order (optional)
                },
                //dom: '<"top"B<"float-left"l><"float-right"f>><"clearfix">rt<"bottom"ip>', // Place buttons, page length, and search
                //buttons: [
                //    {
                //        extend: 'excel',
                //        text: 'Export to Excel',
                //        title: 'Custom_Sheet_Name', // Set your custom sheet name here
                //        filename: 'custom_excel_file', // Set the file name if needed
                //    },
                //     'csv', 'excel'
                //]
            });
          
        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload(); // You need to call the reload function
        }
    });


}

//Daily Report
function btn_DailyR() {
    $("#Table_Views_P").hide();
    $("#Table_Views_D").show();
    $("#Table_Views_M").hide();
    $("#Table_Views_CF").hide();
    $("#Table_Views_Npt").hide();

    var From_Date = document.getElementById("Yesterday_DailyR").value;

    var xcointainer = document.getElementById("Xcointainer");
    xcointainer.style.display = "none";

    // Destroy the old DataTable (if it exists)
   
       
    

    $.ajax({
        type: "POST",
        url: '/Reporting/Daily_Report/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date }),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload_Daily = json1.html_Daily;
            var dataset_Daily = eval("[" + tableload_Daily + "]");

            // Initialize DataTable with options
            $('#DataTables_D').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_Daily,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                columns: [
                    { title: 'Date' }, // Set initial width if needed
                    { title: 'Category' },
                    { title: 'A Shift' },
                    { title: 'B Shift' },
                    { title: 'C Shift' },
                    { title: 'Total' },
                    { title: 'Target' },
                    { title: 'Performance' }
                ],
                scrollY: '500px',
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
                    'csv', 'excel'
                ]
            });

        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload(); // You need to call the reload function
        }
    });
}
//Maintenance
function btn_Maintenance() {

    $("#Table_Views_P").hide();
    $("#Table_Views_D").hide();
    $("#Table_Views_M").show();
    $("#Table_Views_CF").hide();
    $("#Table_Views_Npt").hide();
    var From_Date = document.getElementById("Yesterday_Maintenance").value;
    var To_Date = document.getElementById("Today_Maintenance").value;

    var xcointainer = document.getElementById("Xcointainer");
    xcointainer.style.display = "none";


    $.ajax({
        type: "POST",
        url: '/Reporting/Moisturiser_Report/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date, To_Date: To_Date }),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload_Ms = json1.html_Ms;
            var dataset_Ms = eval("[" + tableload_Ms + "]");

            // Initialize DataTable with options
            $('#DataTables_M').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_Ms,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                columns: [
                    { title: 'Time Stamp' }, // Set initial width if needed
                    { title: 'Oven' },
                    { title: 'Moisturizer Status' }
                   

                ],
                scrollY: '500px',
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
                    'csv', 'excel'
                ]
            });

        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload(); // You need to call the reload function
        }
    });
}
//Control fruit temperature 
function btn_CFlue() {
    $("#Table_Views_P").hide();
    $("#Table_Views_D").hide();
    $("#Table_Views_M").hide();
    $("#Table_Views_CF").show();
    $("#Table_Views_Npt").hide();
    var From_Date = document.getElementById("Yesterday_CFlue").value;
    var To_Date = document.getElementById("Today_CFlue").value;

    var xcointainer = document.getElementById("Xcointainer");
    xcointainer.style.display = "none";   

    $.ajax({
        type: "POST",
        url: '/Reporting/ControlFlueTemp_Report/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date, To_Date: To_Date }),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload_CFlue = json1.html_CFlue;
            var dataset_CFlue = eval("[" + tableload_CFlue + "]");

            // Initialize DataTable with options
            $('#DataTables_CF').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_CFlue,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                columns: [
                    { title: 'Time Stamp',width: '15%'}, // Set initial width if needed
                    { title: 'Oven' },
                    { title: 'Avrage Control Flue Temperature '  },
                    { title: 'Avrage Control Flue Temperature Pusher Side' },
                    { title: 'Avrage Control Flue Temperature Coke Side' },
                    { title: 'Deviation Control Flue Temperature' },
                    { title: 'Deviation Control Flue Temperature Pusher Side' },
                    { title: 'Deviation Control Flue Temperature Coke Side' }
                ],
                scrollY: '500px',
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
                    'csv', 'excel'
                ]
            });

        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload(); // You need to call the reload function
        }
    });


}
//NPT
function btn_NPT() {
    $("#Table_Views_P").hide();
    $("#Table_Views_D").hide();
    $("#Table_Views_M").hide();
    $("#Table_Views_CF").hide();
    $("#Table_Views_Npt").show();
    var From_Date = document.getElementById("Yesterday_NPT").value;
    var To_Date = document.getElementById("Today_NPT").value;

    var xcointainer = document.getElementById("Xcointainer");
    xcointainer.style.display = "none";

    // Destroy the old DataTable (if it exists)
   
       
    

    $.ajax({
        type: "POST",
        url: '/Reporting/Npt_Report/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ From_Date: From_Date, To_Date: To_Date }),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload_Npt = json1.html_Npt;
            var dataset_Npt = eval("[" + tableload_Npt + "]");

            // Initialize DataTable with options
            $('#DataTables_Npt').DataTable({
                ordering: false,
                destroy: true,
                searching: false,
                data: dataset_Npt,
                filter: true,
                deferRender: true,
                "searching": true,
                "pageLength": 10,
                "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                columns: [
                    { title: 'Coke Date' }, // Set initial width if needed
                    { title: 'Estimation NPT' },
                    { title: 'Running NPT' },
                    { title: 'Comment' },
                    { title: 'Note' }
                   
                ],
                scrollY: '500px',
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
                    'csv', 'excel'
                ]
            });

        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload(); // You need to call the reload function
        }
    });
}