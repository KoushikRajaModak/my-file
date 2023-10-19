$(document).ready(function () {
    //var SelectOven = document.getElementById("SelectOven_current").value;

  
    $.ajax({
        type: "POST",
        url: '/Alarm/About/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json1) {
            // Handle the successful response from the server

            var tableload = json1.html;
            var dataset = eval("[" + tableload + "]");

            // Initialize DataTable with options
            $('#View_Charging').DataTable({
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
                    { title: 'X1', width: '10%' }, // Set initial width if needed
                    { title: 'X2', width: '10%' },
                    { title: 'X3', width: '10%' },
                    { title: 'X4', width: '10%' }, // Set initial width if needed
                    { title: 'X5', width: '15%' },
                    { title: 'X6', width: '10%' }

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


        },
        failure: function (errMsg) {
            // Handle the failure/error response
            alert(errMsg);
            location.reload;
        }
    });

})