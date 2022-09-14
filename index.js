// checkbox variables
const pmdr_check = document.getElementById("pmdr_check");
const break_check = document.getElementById("break_check");
const min25_check = document.getElementById("min25_check");
const min5_check = document.getElementById("min5_check");
const min10_check = document.getElementById("min10_check");

// checkbox label variables
const pmdr_label = document.getElementById("pmdr_label");
const break_label = document.getElementById("break_label");
const min25_label = document.getElementById("min25_label");
const min5_label = document.getElementById("min5_label");
const min10_label = document.getElementById("min10_label");

// start_time field value
const start_time = document.getElementById("start_time");

// setInterval to refresh new Date() every 1 second
const myInterval = setInterval(rightNowDiag, 1000);

// diagnostic function to log and append time into console and table after checkbox selection
function rightNowDiag() {
    var dateSelected = new Date();
    var minuteFormat = dateSelected.getMinutes().toString().length === 1 ? '0' + dateSelected.getMinutes().toString() : dateSelected.getMinutes();
    var secondFormat = dateSelected.getSeconds().toString().length === 1 ? '0' + dateSelected.getSeconds().toString() : dateSelected.getSeconds();
    var rightnow = dateSelected.getHours().toString() + ":" + minuteFormat + ":" + secondFormat;
    return rightnow;
}

// pomodoro checkbox eventlistener
pmdr_check.addEventListener('click', function() {
    if (pmdr_check.checked === true) {
        // log for diagnostics the time selected
        console.log("Pomodoro Selected at", rightNowDiag());
        // hide the label and checkbox for the Break option
        // adjusting the other checkboxes and labels
        document.getElementById("myform").style.justifyContent = "flex-start";
        break_check.style.display = "none";
        break_label.style.display = "none";
        min25_label.style.display = "inline-block";
        min25_label.style.marginLeft = "100px";
        min25_check.style.display = "inline-block";
    } else {
        // show the label and checkbox for the Break option
        break_check.style.display = "inline-block";
        break_label.style.display = "inline-block";
        min25_label.style.display = "none";
        min25_check.style.display = "none";
        document.getElementById("myform").style.justifyContent = "space-between";
    }
});

// break checkbox eventlistener
break_check.addEventListener('click', function() {
    if (break_check.checked === true) {
        // log for diagnostics the time selected
        console.log("Break Selected at", rightNowDiag());
        // hide the label and checkbox for the Pomodoro option
        document.getElementById("myform").style.justifyContent = "flex-end";
        pmdr_check.style.display = "none";
        pmdr_label.style.display = "none";
        min5_label.style.display = "inline-block";
        min5_label.style.marginLeft = "100px";
        min5_check.style.display = "inline-block";
        min10_label.style.display = "inline-block";
        min10_label.style.marginLeft = "100px";
        min10_check.style.display = "inline-block";
    } else {
        // show the label and checkbox for the Pomodoro option
        pmdr_check.style.display = "inline-block";
        pmdr_label.style.display = "inline-block";
        min5_label.style.display = "none";
        min5_check.style.display = "none";
        min10_label.style.display = "none";
        min10_check.style.display = "none";
        document.getElementById("myform").style.justifyContent = "space-between";
    }
});

// 5 minutes checkbox EventListener, disabled = true/false
min5_check.addEventListener('click', function() {
    if (min5_check.checked === true) {
        console.log("5 minute Break Time Selected");
        min10_check.disabled = true;
        break_check.disabled = true;
    } else {
        min10_check.disabled = false;
        break_check.disabled = false;
    }
});

// 10 minutes checkbox EventListener, disabled = true/false
min10_check.addEventListener('click', function() {
    if (min10_check.checked === true) {
        console.log("10 minute Break Time Selected");
        min5_check.disabled = true;
        break_check.disabled = true;
    } else {
        min5_check.disabled = false;
        break_check.disabled = false;
    }
});

// 25 minutes checkbox EventListener, disabled = true/false
min25_check.addEventListener('click', function() {
    if (min25_check.checked === true) {
        console.log("25 minute Pomodoro Selected");
        pmdr_check.disabled = true;
    } else {
        pmdr_check.disabled = false;
    }
});

// end time calculator function
function endTime() {

    // convert rightnow time to strings
    var hours = rightNowDiag().substring(0,2);
    var minutes = rightNowDiag().substring(3,5);
    var seconds = rightNowDiag().substring(6,8);

    // convert string to number for operation
    var numMin = Number(minutes);

    // add empty string to fill with data(minutes)
    var mins = "";

    // check whether time is 1 or 2 digits, then 
    // convert accordingly
    if (hours.includes(':')) {
        hours = rightNowDiag().substring(0,1);
        minutes = rightNowDiag().substring(2,4);
        seconds = rightNowDiag().substring(5,7);
    }
    //TODO `IF` SECTION - choose between pomodoro or break session time options
    
        if (numMin + 25 > 60) {
            let temp = numMin + 25; 
            let temp2 = temp - 60;
            hours = Number(hours) + 1;
            minutes = temp2.toString();
            mins += minutes.length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        } else if (numMin + 25 == 60){
            hours = Number(hours) + 1;
            minutes = "0";
            mins += minutes.length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        } else {
            minutes = numMin + 25;
            mins += minutes.length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        }   
}

// log session after completing selection of checkboxes
function logMySession() {

    // create variable for table and row insertion
    var table = document.getElementById("pmdr");
    var row = table.insertRow(-1);

    // create variables to insert data into table row cells
    var start_time = row.insertCell(0);
    var pmdr_type = row.insertCell(1);
    var end_time = row.insertCell(2);

    // create textnodes for start time, session type and end time
    var st = document.createTextNode(rightNowDiag());
    var pomodoro = document.createTextNode("Pomodoro");
    var breaktime = document.createTextNode("Break Time");
    var et = document.createTextNode(endTime());

    // console.log for diagnostic purposes
    console.log("Start time:",rightNowDiag(),
                "Session:",pmdr_check.checked === true ? "Pomodoro (25min)" : 
                                min5_check.checked === true ? "Break Time (5min)" :
                                    min10_check.checked === true ? "BreakTime (10min)" :
                                                "Not selected","End time:",endTime());

    // pomodoro or break time verification logic
    // do appendChild() variables and give different background color
    if (pmdr_check.checked === true && min25_check.checked === true) {
        start_time.appendChild(st);
        pmdr_type.appendChild(pomodoro);
        end_time.appendChild(et);
        row.style.backgroundColor = "#B10F06"; // contrast verified with webaim
        pmdr_check.style.display = "inline-block";
        pmdr_check.checked = false;
        pmdr_check.disabled = false;
        pmdr_label.style.display = "inline-block";
        break_check.style.display = "inline-block";
        break_label.style.display = "inline-block";
        min25_label.style.display = "none";
        min25_check.style.display = "none";
        min25_check.checked = false;
        min25_check.disabled = false;
        min5_label.style.display = "none";
        min5_check.style.display = "none";
        min5_check.checked = false;
        min5_check.disabled = false;
        min10_label.style.display = "none";
        min10_check.style.display = "none";
        min10_check.checked = false;
        min10_check.disabled = false;
        document.getElementById("myform").style.justifyContent = "space-between";
    } else if (break_check.checked === true && min5_check.checked === true) {
        start_time.appendChild(st);
        pmdr_type.appendChild(breaktime);
        end_time.appendChild(et);
        row.style.backgroundColor = "#007A00"; // contrast verified with webaim
        break_check.style.display = "inline-block";
        break_label.style.display = "inline-block";
        break_check.checked = false;
        break_check.disabled = false;
        min25_label.style.display = "none";
        min25_check.style.display = "none";
        min25_check.checked = false;
        min25_check.disabled = false;
        min5_label.style.display = "none";
        min5_check.style.display = "none";
        min5_check.checked = false;
        min5_check.disabled = false;
        min10_label.style.display = "none";
        min10_check.style.display = "none";
        min10_check.checked = false;
        min10_check.disabled = false;
        pmdr_check.style.display = "inline-block";
        pmdr_label.style.display = "inline-block";
        document.getElementById("myform").style.justifyContent = "space-between";
    } else if (break_check.checked === true && min10_check.checked === true) {
        start_time.appendChild(st);
        pmdr_type.appendChild(breaktime);
        end_time.appendChild(et);
        row.style.backgroundColor = "#007A00"; // contrast verified with webaim
        break_label.style.display = "inline-block";
        break_check.style.display = "inline-block";
        break_check.checked = false;
        break_check.disabled = false;
        min25_label.style.display = "none";
        min25_check.style.display = "none";
        min25_check.checked = false;
        min25_check.disabled = false;
        min5_label.style.display = "none";
        min5_check.style.display = "none";
        min5_check.checked = false;
        min5_check.disabled = false;
        min10_label.style.display = "none";
        min10_check.style.display = "none";
        min10_check.checked = false;
        min10_check.disabled = false;
        pmdr_check.style.display = "inline-block";
        pmdr_label.style.display = "inline-block";
        document.getElementById("myform").style.justifyContent = "space-between";
    } else {
        // delete row if nothing is selected and button is pressed
        row = table.deleteRow(-1); 
    }
}