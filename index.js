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

// setInterval to refresh new Date() every 1 second
const myInterval = setInterval(rightNowDiag, 1000);

// diagnostic function to log and append time into console and table after checkbox selection
function rightNowDiag() {
    var dateSelected = new Date();
    var minuteFormat = dateSelected.getMinutes().toString().length === 1 ? '0' + dateSelected.getMinutes().toString() : dateSelected.getMinutes();
    var secondFormat = dateSelected.getSeconds().toString().length === 1 ? '0' + dateSelected.getSeconds().toString() : dateSelected.getSeconds();
    var monthFormat = dateSelected.getMonth().toString().length === 1 ? '0' + dateSelected.getMonth().toString() : dateSelected.getMonth();
    var daysFormat = dateSelected.getDate().toString().length === 1 ? '0' + dateSelected.getDate().toString() : dateSelected.getDate(); 
    var rightnow = daysFormat.toString() + '.' + monthFormat.toString() + '.' + dateSelected.getFullYear().toString() + ' - ' + dateSelected.getHours().toString() + ':' + minuteFormat.toString() + ':' + secondFormat.toString();
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
        console.log("Break Time Selected 5 minutes");
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
        console.log("Break Time Selected 10 minutes");
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
        console.log("Pomodoro Selected 25 minutes ");
        pmdr_check.disabled = true;
    } else {
        pmdr_check.disabled = false;
    }
});

// end time calculator function
function endTime(session) {

    // convert rightnow time to strings
    // used when hours is 2 digits
    var hours = rightNowDiag().substring(13,15);
    var minutes = rightNowDiag().substring(16,18);
    var seconds = rightNowDiag().substring(19,21);
    // convert string to number for operation
    var numMin = Number(minutes);
    // console.log(numMin);

    // add empty string to fill with data(minutes)
    var mins = "";
    
    // check whether time is 1 digit and 
    // converts accordingly
    if (hours.includes(':')) {
        hours = rightNowDiag().substring(12,14);
    } else if (minutes.includes(':')) {
        minutes = rightNowDiag().substring(16,17);
    } else if (seconds.includes(':')) {
        seconds = rightNowDiag().substring(19,20);
    }
    
    //console.log(rightNowDiag());
    //console.log(hours+":"+minutes+":"+seconds);
 
    if (session == 25) {
        if (numMin + 25 > 60) {
            let temp = numMin + 25; 
            let temp2 = temp - 60;
            hours = Number(hours) + 1;
            minutes = temp2.toString();
            mins = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        } else if (numMin + 25 == 60){
            hours = Number(hours) + 1;
            minutes = "0";
            mins = minutes.toString().length === 1 ? '0' +minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        } else {
            minutes = numMin + 25;
            mins = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        }
    } else if (session == 5) {
        if (numMin + 5 > 60) {
            let temp = numMin + 5; 
            let temp2 = temp - 60;
            // console.log(temp);
            // console.log(temp2);
            hours = Number(hours) + 1;
            minutes = temp2.toString();
            mins = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        } else if (numMin + 5 == 60){
            hours = Number(hours) + 1;
            minutes = "0";
            // console.log(minutes);
            mins = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        } else {
            // console.log(minutes);
            minutes = numMin + 5;
            // console.log(typeof minutes);
            // console.log(minutes);
            mins = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        }
    } else if (session == 10) {
        if (numMin + 10 > 60) {
            let temp = numMin + 10; 
            let temp2 = temp - 60;
            hours = Number(hours) + 1;
            minutes = temp2.toString();
            mins = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        } else if (numMin + 10 == 60){
            hours = Number(hours) + 1;
            minutes = "0";
            mins = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        } else {
            minutes = numMin + 10;
            mins = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
            return hours.toString() + ":" + mins.toString() + ":" + seconds.toString();
        }
    }
}

//console.log(endTime(25));
//console.log(endTime(5));
//console.log(endTime(10));

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

    // console.log for diagnostic purposes
    console.log("Start time: ",rightNowDiag(),
                "Session:",pmdr_check.checked === true ? "25 minutes End time: " + endTime(25) : 
                                min5_check.checked === true ? "5 minutes End time: " + endTime(5) :
                                    min10_check.checked === true ? "10 minutes End time: " + endTime(10) :
                                                "Not selected");

    // pomodoro or break time verification logic
    if (pmdr_check.checked === true && min25_check.checked === true) {
        // do appendChild() for variables and give different background color
        start_time.appendChild(st);
        pmdr_type.appendChild(document.createTextNode("Pomodoro - 25 minutes"));
        end_time.appendChild(document.createTextNode(endTime(25)));
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
        document.getElementById("log").disabled = true;
    } else if (break_check.checked === true && min5_check.checked === true) {
        start_time.appendChild(st);
        pmdr_type.appendChild(document.createTextNode("Break Time - 5 minutes"));
        end_time.appendChild(document.createTextNode(endTime(5)));
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
        document.getElementById("log").disabled = true;
    } else if (break_check.checked === true && min10_check.checked === true) {
        start_time.appendChild(st);
        pmdr_type.appendChild(document.createTextNode("Break Time - 10 minutes"));
        end_time.appendChild(document.createTextNode(endTime(10)));
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
        document.getElementById("log").disabled = true;
    } else {
        // delete row if nothing is selected and button is pressed(delete empty row)
        row = table.deleteRow(-1); 
    }
}

function reset() {
    document.getElementById("log").disabled = false;
}