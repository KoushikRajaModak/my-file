
$(document).ready(function () { DynamickSecduling_View()});
    function DynamickSecduling_View() {
        $("#ViewMaterial_1").show();
        $("#ViewMaterial_2").hide();
        $("#ViewMaterial_3").hide();
        $("#ViewMaterial_4").hide();

        $.ajax({
            type: "POST",
            url: '/HetingControl/DalyData/',
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({}),
            success: function (json1) {

                var tableload = json1.html;
                var dataset = eval("[" + tableload + "]");

                $('#DynamickSecdulingDaily').DataTable({

                    ordering: false,
                    destroy: true,
                    searching: true,
                    filter: true,
                    data: dataset,
                    deferRender: true,
                    //"searching": true,
                    "pageLength": 10,
                    "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                    columns: [
                        { title: 'Oven' }, // Set initial width if needed
                        { title: 'Charging Time' },
                        { title: 'Calculate Pushing Time' },
                        { title: 'Coking Time' },
                        { title: 'Pushing Gap' },
                        { title: 'Pushing Time' },
                        { title: 'Actual Coking Time ' },
                        { title: 'Actual Pushing Time' },
                        { title: 'Delay Time' },
                        { title: 'Manual Calculate Pushing Time' },
                        { title: 'Comment' },
                        { title: 'Action' },

                    ],
                    scrollY: '340px',
                    colReorder: true, // Enable column reordering
                    colResize: {
                        fixedLayout: false, // Enable column resizing
                        // order: 1 // Initial column order (optional)
                    },
                    // dom: '<"top"B<"float-left"l><"float-right"f>><"clearfix">rt<"bottom"ip>', // Place buttons, page length, and search
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

            },
            failure: function (errMsg) {
                alert(errMsg);
                location.reload;
            }

        });
    }
   


function D_lode() {
    $("#ViewMaterial_1").show();
    $("#ViewMaterial_2").hide();
    $("#ViewMaterial_3").hide();
    $("#ViewMaterial_4").hide();
}

//function Param_scheduling () {

//    $.ajax({
//        type: "POST",
//        url: '/HetingControl/Param_scheduling/',
//        datatype: "json",
//        contentType: "application/json; charset=utf-8",
//        data: JSON.stringify({}),
//        success: function (json1) {


//        },
//        failure: function (errMsg) {
//            alert(errMsg);
           
//        }

//    });
//}
function A_lode() {


    $("#ViewMaterial_1").hide();
    $("#ViewMaterial_2").show();
    $("#ViewMaterial_3").hide();
    $("#ViewMaterial_4").hide();
  

    $.ajax({
        type: "POST",
        url: '/HetingControl/Param_scheduling/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json1) {

            var S_ASHIFT_START = json1.S_ASHIFT_START;
            var S_ASHIFT_END = json1.S_ASHIFT_END;
            var S_BSHIFT_START = json1.S_BSHIFT_START;
            var S_BSHIFT_END = json1.S_BSHIFT_END;
            var S_CSHIFT_START = json1.S_CSHIFT_START;
            var S_CSHIFT_END = json1.S_CSHIFT_END;



            $.ajax({
                type: "POST",

                url: '/HetingControl/A_Shift_Data/',

                datatype: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ S_ASHIFT_START: S_ASHIFT_START, S_ASHIFT_END: S_ASHIFT_END, S_BSHIFT_START: S_BSHIFT_START, S_BSHIFT_END: S_BSHIFT_END, S_CSHIFT_START: S_CSHIFT_START, S_CSHIFT_END: S_CSHIFT_END }),
                success: function (json1) {

                    var tableload1 = json1.html;
                    var dataset1 = eval("[" + tableload1 + "]");

                    $('#MaterialsViewValueAShift').DataTable({

                        ordering: false,
                        destroy: true,
                        searching: true,
                        filter: true,
                        data: dataset1,
                        deferRender: true,
                        //"searching": true,
                        "pageLength": 10,
                        "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                        columns: [
                            { title: 'Oven' }, // Set initial width if needed
                            { title: 'Charging Time' },
                            { title: 'Calculate Pushing Time' },
                            { title: 'Coking Time' },
                            { title: 'Pushing Gap' },
                            { title: 'Pushing Time' },
                            { title: 'Actual Coking Time ' },
                            { title: 'Actual Pushing Time' },
                            { title: 'Delay Time' },
                            { title: 'Manual Calculate Pushing Time' },
                            { title: 'Comment' },                          

                        ],
                        scrollY: '340px',
                        colReorder: true, // Enable column reordering
                        colResize: {
                            fixedLayout: false, // Enable column resizing
                            // order: 1 // Initial column order (optional)
                        },
                        // dom: '<"top"B<"float-left"l><"float-right"f>><"clearfix">rt<"bottom"ip>', // Place buttons, page length, and search
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

                },
                failure: function (errMsg) {
                    alert(errMsg);
                    location.reload;
                }

            });


        },
        failure: function (errMsg) {
            alert(errMsg);

        }

    });


}

function B_lode() {


    $("#ViewMaterial_1").hide();
    $("#ViewMaterial_2").hide();
    $("#ViewMaterial_3").show();
    $("#ViewMaterial_4").hide();
   
    $.ajax({
        type: "POST",
        url: '/HetingControl/Param_scheduling/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json1) {

            var S_ASHIFT_START = json1.S_ASHIFT_START;
            var S_ASHIFT_END = json1.S_ASHIFT_END;
            var S_BSHIFT_START = json1.S_BSHIFT_START;
            var S_BSHIFT_END = json1.S_BSHIFT_END;
            var S_CSHIFT_START = json1.S_CSHIFT_START;
            var S_CSHIFT_END = json1.S_CSHIFT_END;

            $.ajax({
                type: "POST",

                url: '/HetingControl/B_Shift_Data/',

                datatype: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ S_ASHIFT_START: S_ASHIFT_START, S_ASHIFT_END: S_ASHIFT_END, S_BSHIFT_START: S_BSHIFT_START, S_BSHIFT_END: S_BSHIFT_END, S_CSHIFT_START: S_CSHIFT_START, S_CSHIFT_END: S_CSHIFT_END }),
                success: function (json1) {

                    var tableload = json1.html;
                    var dataset = eval("[" + tableload + "]");

                    $('#MaterialsViewValueBShift').DataTable({
                        ordering: false,
                        destroy: true,
                        searching: true,
                        filter: true,
                        data: dataset,
                        deferRender: true,
                        //"searching": true,
                        "pageLength": 10,
                        "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                        scrollY: '340px',
                        columns: [
                            { title: 'Oven' }, // Set initial width if needed
                            { title: 'Charging Time' },
                            { title: 'Calculate Pushing Time' },
                            { title: 'Coking Time' },
                            { title: 'Pushing Gap' },
                            { title: 'Pushing Time' },
                            { title: 'Actual Coking Time ' },
                            { title: 'Actual Pushing Time' },
                            { title: 'Delay Time' },
                            { title: 'Manual Calculate Pushing Time' },
                            { title: 'Comment' },
                           
                        ],
                        colReorder: true, // Enable column reordering
                        colResize: {
                            fixedLayout: false, // Enable column resizing
                            // order: 1 // Initial column order (optional)
                        },
                        // dom: '<"top"B<"float-left"l><"float-right"f>><"clearfix">rt<"bottom"ip>', // Place buttons, page length, and search
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

                },
                failure: function (errMsg) {
                    alert(errMsg);
                    location.reload;
                }

            });


        },
        failure: function (errMsg) {
            alert(errMsg);

        }

    });

   
}
function C_lode() {
   
    $("#ViewMaterial_1").hide();
    $("#ViewMaterial_2").hide();
    $("#ViewMaterial_3").hide();
    $("#ViewMaterial_4").show();
   
    $.ajax({
        type: "POST",
        url: '/HetingControl/Param_scheduling/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        success: function (json1) {

            var S_ASHIFT_START = json1.S_ASHIFT_START;
            var S_ASHIFT_END = json1.S_ASHIFT_END;
            var S_BSHIFT_START = json1.S_BSHIFT_START;
            var S_BSHIFT_END = json1.S_BSHIFT_END;
            var S_CSHIFT_START = json1.S_CSHIFT_START;
            var S_CSHIFT_END = json1.S_CSHIFT_END;

            $.ajax({
                type: "POST",

                url: '/HetingControl/C_Shift_Data/',

                datatype: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ S_ASHIFT_START: S_ASHIFT_START, S_ASHIFT_END: S_ASHIFT_END, S_BSHIFT_START: S_BSHIFT_START, S_BSHIFT_END: S_BSHIFT_END, S_CSHIFT_START: S_CSHIFT_START, S_CSHIFT_END: S_CSHIFT_END }),
                success: function (json1) {

                    var tableload = json1.html;
                    var dataset = eval("[" + tableload + "]");

                    $('#MaterialsViewValueCShift').DataTable({

                        ordering: false,
                        destroy: true,
                        searching: true,
                        filter: true,
                        data: dataset,
                        deferRender: true,
                        //"searching": true,
                        "pageLength": 10,
                        "lengthMenu": [[10, 30, 45, 60, 75, 90, -1], [10, 30, 45, 60, 75, 90, "All"]],
                        columns: [
                            { title: 'Oven' }, // Set initial width if needed
                            { title: 'Charging Time' },
                            { title: 'Calculate Pushing Time' },
                            { title: 'Coking Time' },
                            { title: 'Pushing Gap' },
                            { title: 'Pushing Time' },
                            { title: 'Actual Coking Time ' },
                            { title: 'Actual Pushing Time' },
                            { title: 'Delay Time' },
                            { title: 'Manual Calculate Pushing Time' },
                            { title: 'Comment' },
                         
                        ],
                        scrollY: '340px',
                        colReorder: true, // Enable column reordering
                        colResize: {
                            fixedLayout: false, // Enable column resizing
                            // order: 1 // Initial column order (optional)
                        },
                        // dom: '<"top"B<"float-left"l><"float-right"f>><"clearfix">rt<"bottom"ip>', // Place buttons, page length, and search
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

                },
                failure: function (errMsg) {
                    alert(errMsg);
                    location.reload;
                }

            });


        },
        failure: function (errMsg) {
            alert(errMsg);

        }

    });




  
}

UpdateValu();
function UpdateValu(){
    $.ajax({
        type: "POST",
        url: '/HetingControl/LastPushOven/',
        datatype: "json",
        contentType: "application/json: charset=utf-8", 
        data: JSON.stringify({}),
        success: function (json) {
            document.addEventListener("DOMContentLoaded", function () {
                var LastPushOven = json.LastPushOven_N;
                var NextOven = json.NextOven;
                var TotalCount = json.TotalCount;
                var AShiftTotalCount = json.AShiftTotalCount;
                var BShiftTotalCount = json.BShiftTotalCount;
                var CShiftTotalCount = json.CShiftTotalCount;
                var DailyTotalCount = json.DailyTotalCount;
                var Target = json.Target;
             
                document.getElementById("LastOven").textContent = LastPushOven;
                document.getElementById("NextOven").textContent = NextOven;
                document.getElementById("Production").textContent = TotalCount;
                document.getElementById("AShiftTotalCount").textContent = AShiftTotalCount;
                document.getElementById("BShiftTotalCount").textContent = BShiftTotalCount;
                document.getElementById("CShiftTotalCount").textContent = CShiftTotalCount;
                document.getElementById("DailyTotalCount").textContent = DailyTotalCount;
                $("#Terget").val(Target);
            });

           
            setTimeout(" UpdateValu();", 10000);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
      
    });
    
   
}



function TergetPush(val) {
    var TergetValue = document.getElementById("Terget").value;

    if (confirm("Are you Want to Change the Target ?")) {
        //If user say 'yes' to confirm
    
        $.ajax({
            type: "POST",
            url: '/HetingControl/TergetPush/',
            datatype: "json",
            contentType: "application/json: charset=utf-8",
            data: JSON.stringify({ Terget: TergetValue }),
            success: function (json) {

            },
            failure: function (errMsg) {
                alert(errMsg);
            }

        });
    } else {
       
        $("#Terget").val(Terget);
    }

    
}




//Edite Section /Manual secduling
function fnEdit(ID) {
    //Popup page Open
    document.getElementById("popup").style.display = "block";
    $.ajax({
        type: "POST",
        url: '/HetingControl/Mnual_Editedate/',
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ID:ID}),
        success: function (json1) {
            var CalPushTime_M = json1.CalculatePushingTime_M;
            var M_ID = json1.M_ID;
            document.getElementById("Required_date").value = CalPushTime_M;
            document.getElementById("Data_Id").value = M_ID;
            //date time picker After30Mint
            document.getElementById("Manual_date").value = json1.After10Mint;

            const dateTimePicker = document.getElementById("Manual_date");
            const UpdateButton = document.getElementById("btnupdate");
            const validationMessage = document.getElementById("validationMessage");

            dateTimePicker.min = json1.After10Mint;
            dateTimePicker.max = json1.After30Mint;

            document.getElementById("Limistion_Date").textContent = "Select a Date & Time Between " + json1.After10Mint + " And " + json1.After30Mint ;

            dateTimePicker.addEventListener("input", function () {
                const selectedDateTime = new Date(dateTimePicker.value);
                const minDateTime = new Date(json1.After10Mint);
                const maxDateTime = new Date(json1.After30Mint);

                const minHours = minDateTime.getHours();
                const minMinutes = minDateTime.getMinutes();

                const formattedMinTime = `${minHours.toString().padStart(2, '0')}:${minMinutes.toString().padStart(2, '0')}`;

                const maxHours = maxDateTime.getHours();
                const maxMinutes = maxDateTime.getMinutes();

                const formattedmaxTime = `${maxHours.toString().padStart(2, '0')}:${maxMinutes.toString().padStart(2, '0')}`;



                if (selectedDateTime < minDateTime) {
                    validationMessage.textContent = "Selected time is earlier than :" + formattedMinTime;
                    UpdateButton.disabled = true;
                } else if (selectedDateTime > maxDateTime) {
                    validationMessage.textContent = "Selected time is later than :" + formattedmaxTime;
                    UpdateButton.disabled = true;
                } else {
                    validationMessage.textContent = "";
                    UpdateButton.disabled = false;
                }
            });

          
           
        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    });
 
}

function btnUpdate_D() {
    const selectDatetime_M = document.getElementById("Manual_date").value;
    const selectedDateTime = new Date(selectDatetime_M);

    // Check if a valid date and time are selected
    if (isNaN(selectedDateTime)) {
        validationMessage.textContent = "Please select a valid date and time.";
   
    }
    else {
    
        var UM_ID = document.getElementById("Data_Id").value;
        var Select_MDate = document.getElementById("Manual_date").value;
        var Comment_M = document.getElementById("Comment_M").value;
        $.ajax({
            type: "POST",
            url: '/HetingControl/Mnual_Update/',
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: UM_ID, Select_MDate: Select_MDate, Comment_M: Comment_M }),
            success: function (json) {
                document.getElementById("Comment_M").value = " ";
                ClosePopup();
                DynamickSecduling_View();
            },
            failure: function (errMsg) {
                alert(errMsg);
            }

        });

    }
}

///update section





//Popup page close
function ClosePopup() {
    document.getElementById("popup").style.display = "none";
}


//Update Section
function Laboraty_Update() {
    var Shift = document.getElementById("idShift").value;
    var Silo_No_of_the_CCS = document.getElementById("Silo_No_of_the_CCS").value;
    var Coal_Grade = document.getElementById("Coal_Grade").value;
    var Current_balance = document.getElementById("Current_balance").value;
    var Income = document.getElementById("Income").value;
    var Consumption = document.getElementById("Consumption").value;
    var Wtr = document.getElementById("Wtr").value;
    var Ad = document.getElementById("Ad").value;
    var Vd = document.getElementById("Vd").value;
    var Vdaf = document.getElementById("Vdaf").value;
    var PR_KY = document.getElementById("fnid").value;
    $.ajax({
        type: "POST",

        url: '/Home/Control_panel_update/',
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        data: JSON.stringify({ Shift: Shift, Silo_No_of_the_CCS: Silo_No_of_the_CCS, Coal_Grade: Coal_Grade, Current_balance: Current_balance, Income: Income, Consumption: Consumption, Wrt: Wtr, Ad: Ad, Vd: Vd, Vdaf: Vdaf, ID: PR_KY }),

        success: function ChoosMaterials() {

            $.ajax({
                type: "POST",

                url: '/Home/Control_pane_ViewData/',
                datatype: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({}),
                success: function (json1) {
                    var tableload = json1.html;

                    var dataset = eval("[" + tableload + "]");

                    $('#MaterialsViewValue').DataTable({

                        ordering: false,
                        destroy: true,
                        searching: false,
                        data: dataset,


                    });

                },
                failure: function (errMsg) {
                    alert(errMsg);
                    location.reload;
                }


            }); Relode();
            $("#insert").show();
            $("#Update").hide();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    });
    Relode();
    document.getElementById("Choos").value = "Update Successful...";

}








function A_Relode() {

    var ASHIFT_BREAK_START = document.getElementById("BATS").value;
    var ASHIFT_BREAK_END = document.getElementById("BATE").value;
    $.ajax({
        type: "POST",
        url: '/HetingControl/Break_time_A_Shift/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ ASHIFT_BREAK_START: ASHIFT_BREAK_START, ASHIFT_BREAK_END: ASHIFT_BREAK_END }),
        success: function (json) {

        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    });
}

function B_Relode() {

    var BSHIFT_BREAK_START = document.getElementById("BBTS").value;
    var BSHIFT_BREAK_END = document.getElementById("BBTE").value;
    $.ajax({
        type: "POST",
        url: '/HetingControl/Break_time_B_Shift/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ BSHIFT_BREAK_START: BSHIFT_BREAK_START, BSHIFT_BREAK_END: BSHIFT_BREAK_END }),
        success: function (json) {

        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    });
}

function C_Relode() {

    var CSHIFT_BREAK_START = document.getElementById("BCTS").value;
    var CSHIFT_BREAK_END = document.getElementById("BCTE").value;
    $.ajax({
        type: "POST",
        url: '/HetingControl/Break_time_C_Shift/',
        datatype: "json",
        contentType: "application/json: charset=utf-8",
        data: JSON.stringify({ CSHIFT_BREAK_START: CSHIFT_BREAK_START, CSHIFT_BREAK_END: CSHIFT_BREAK_END }),
        success: function (json) {

        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    });
}