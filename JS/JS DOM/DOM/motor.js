$(document).ready(function () {
  generateTable();
});

function generateTable() {
  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  tbl.setAttribute("class", "newTable");
  var check = 0;
  var TableHead = ["Motor SL No", "Color", "Pending Day"];
  var colum = [, 123, 6259, 125, 785, 4552, 1235, 544];
  var colom1 = 0;
  var pendingDay = [, 1, 2, 3, 4, 4, 3, 1, 8];
  var TableBody = [colum[colom1], , pendingDay[colom1]];

  function loadImage(j) {
    if (j == 0) {
      return document.createTextNode(TableBody[0]);
    } else if (j == 1) {
      var div = document.createElement("div");
      div.style.width = "10px";
      div.style.height = "10px";
      function pendingDayColor() {
        if (pendingDay[colom1] < 2) return "#FF8000";
        else if (pendingDay[colom1] > 2 && pendingDay[colom1] < 5)
          return "#330000";
        return "#CC0000";
      }
      div.style.background = pendingDayColor();
      return div;
    } else if (j == 2) {
      return document.createTextNode(TableBody[2]);
    }
  }
  // creating all cells
  for (let i = 0; i < 10; i++) {
    // creates a table row
    const row = document.createElement("tr");
    if (check == 0) {
      for (let j = 0; j < 3; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        if (j == 0) cell.setAttribute("class", "setColumnWidth0");
        if (j == 1) cell.setAttribute("class", "setColumnWidth1");
        const cellText = document.createTextNode(TableHead[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
        check = 1;
      }
    } else {
      for (let j = 0; j < 3; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        // var cellText = ;
        cell.appendChild(loadImage(j));
        row.appendChild(cell);
      }
    }
    colom1++;
    TableBody[0] = colum[colom1];
    TableBody[2] = pendingDay[colom1];
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "5");
}
