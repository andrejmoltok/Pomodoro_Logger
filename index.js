//checkbox variables
const pmdr_check = document.getElementById("pmdr_check");
const break_check = document.getElementById("break_check");

//checkbox label variables
const pmdr_label = document.getElementById("pmdr_label");
const break_label = document.getElementById("break_label");

//checkbox child selection
const btn = document.getElementById("myform").children[2];

//setInterval to refresh new Date() every 1 second
const myInterval = setInterval(rightNowDiag, 1000);

//diagnostic function to log time into console after checkbox selection
function rightNowDiag() {
    var dateSelected = new Date();
    var minuteFormat = dateSelected.getMinutes().toString().length === 1 ? '0' + dateSelected.getMinutes().toString() : dateSelected.getMinutes();
    var secondFormat = dateSelected.getSeconds().toString().length === 1 ? '0' + dateSelected.getSeconds().toString() : dateSelected.getSeconds();
    return rightnow = dateSelected.getHours() + ":" + minuteFormat + ":" + secondFormat;
}

//pomodoro checkbox eventlistener
pmdr_check.addEventListener('click', function() {
    const input_create = document.createElement("input");
    const label_25_create = document.createElement("label");
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

//log session after completing selection of checkboxes
function logMySession() {
    var table = document.getElementById("pmdr");
    var row = table.insertRow(-1);
    var start_time = row.insertCell(0);
    var pmdr_type = row.insertCell(1);
    var end_time = row.insertCell(2);
    pmdr_check.checked === true ? console.log("Pomodoro Selected") : 
        break_check.checked === true ? console.log("Break Selected") :
            alert("Please check Pomodoro or Break!");
    start_time.innerHTML = rightNowDiag();
    pmdr_type.innerHTML = pmdr_check.checked === true ? "Pomodoro Session" : "Break Time";
    end_time.innerHTML = "end";
}