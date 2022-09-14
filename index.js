// checkbox variables
const pmdr_check = document.getElementById("pmdr_check");
const break_check = document.getElementById("break_check");

// checkbox label variables
const pmdr_label = document.getElementById("pmdr_label");
const break_label = document.getElementById("break_label");

// start_time field value
const start_time = document.getElementById("start_time");

// setInterval to refresh new Date() every 1 second
const myInterval = setInterval(rightNowDiag, 1000);

// diagnostic function to log time into console after checkbox selection
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
        //log for diagnostics the time selected
        console.log("Pomodoro Selected at", rightNowDiag());
        //hide the label and checkbox for the Break option
        break_check.style.display = "none";
        break_label.style.display = "none";
    } else {
        //show the label and checkbox for the Break option
        break_check.style.display = "initial";
        break_label.style.display = "initial";
    }
});

// break checkbox eventlistener
break_check.addEventListener('click', function() {
    if (break_check.checked === true) {
        //log for diagnostics the time selected
        console.log("Break Selected at", rightNowDiag());
        //hide the label and checkbox for the Pomodoro option
        pmdr_check.style.display = "none";
        pmdr_label.style.display = "none";
    } else {
        //show the label and checkbox for the Pomodoro option
        pmdr_check.style.display = "initial";
        pmdr_label.style.display = "initial";
    }
});

// end time calculator function
function endTime() {
    var hours = rightNowDiag().substring(0,2);
    var minutes = rightNowDiag().substring(2,4);
    var seconds = rightNowDiag().substring(5,7);
    var numMin = Number(minutes);
    var mins = "";
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

console.log(endTime());

// log session after completing selection of checkboxes
function logMySession() {
    var table = document.getElementById("pmdr");
    var row = table.insertRow(-1);
    var start_time = row.insertCell(0);
    var pmdr_type = row.insertCell(1);
    var end_time = row.insertCell(2);
    console.log("Start time:",rightNowDiag(),
                "Session:",pmdr_check.checked === true ? pmdr_type.innerHTML = "Pomodoro" : 
                                break_check.checked === true ? pmdr_type.innerHTML = "Break Time" :
                                                                        "Not selected","End time:",endTime());
    if (pmdr_check.checked === true) {
        pmdr_type.innerHTML = "Pomodoro Session";
        start_time.innerHTML = rightNowDiag();
        end_time.innerHTML = endTime();
    } else if (break_check.checked === true) {
        pmdr_type.innerHTML = "Break Session";
        start_time.innerHTML = rightNowDiag();
        end_time.innerHTML = endTime();
    } else {
        return;
    }
}