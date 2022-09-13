//checkbox variables
const pmdr_check = document.getElementById("pmdr_check");
const break_check = document.getElementById("break_check");

//checkbox label variables
const pmdr_label = document.getElementById("pmdr_label");
const break_label = document.getElementById("break_label");

//start_time field value
const start_time = document.getElementsById("start_time");

//setInterval to refresh new Date() every 1 second
const myInterval = setInterval(rightNowDiag, 1000);

//diagnostic function to log time into console after checkbox selection
function rightNowDiag() {
    var dateSelected = new Date();
    var minuteFormat = dateSelected.getMinutes().toString().length === 1 ? '0' + dateSelected.getMinutes().toString() : dateSelected.getMinutes();
    var secondFormat = dateSelected.getSeconds().toString().length === 1 ? '0' + dateSelected.getSeconds().toString() : dateSelected.getSeconds();
    var rightnow = dateSelected.getHours().toString() + ":" + minuteFormat + ":" + secondFormat;
    return rightnow.toString();
}

//pomodoro checkbox eventlistener
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

//break checkbox eventlistener
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

//end time calculator function
function endTime() {
    var hours = rightNowDiag().substring(0,2);
    var minutes = rightNowDiag().substring(3,5);
    var numMin = Number(minutes);
    var mins;
    //<--TODO `IF` SECTION-->
        if (numMin + 25 > 60) {
            let temp = numMin + 25; 
            let temp2 = temp - 60;
            hours = Number(hours) + 1;
            minutes = temp2;
            mins = minutes.length === 1 ? '0' + minutes : minutes;
            return hours + ":" + mins;
        } else if (numMin + 25 == 60){
            hours = Number(hours) + 1;
            minutes = "0";
            mins = minutes.length === 1 ? '0' + minutes : minutes;
            return hours + ":" + mins;
        } else {
            minutes = numMin + 25;
            mins = minutes.length === 1 ? '0' + minutes : minutes;
            return hours + ":" + mins;
        }
    
}

//log session after completing selection of checkboxes
function logMySession() {
    var table = document.getElementById("pmdr");
    var row = table.insertRow(-1);
    var start_time = row.insertCell(0);
    var pmdr_type = row.insertCell(1);
    var end_time = row.insertCell(2);
    pmdr_check.checked === true ? pmdr_type.innerHTML = "Pomodoro Session" : 
        break_check.checked === true ? pmdr_type.innerHTML = "Break Session" :
            alert("Please check Pomodoro or Break!");
    start_time.innerHTML = rightNowDiag();
    end_time.innerHTML = endTime();
}