const pmdr_check = document.getElementById("pmdr_check");
const break_check = document.getElementById("break_check");

const pmdr_label = document.getElementById("pmdr_label");
const break_label = document.getElementById("break_label");

const myInterval = setInterval(rightNowDiag, 1000);

function rightNowDiag() {
    var dateSelected = new Date();
    return rightnow = dateSelected.getHours() + ":" + dateSelected.getMinutes();
}

function logMySession() {
    //var table = document.getElementById("pmdr");
    //var row = table.insertRow(0);
    //var starttime = row.insertCell(0);
    //var pmdrtype = row.insertCell(1);
    //var endtime = row.insertCell(2);
    pmdr_check.checked === true ? console.log("Pomodoro Selected") : 
        break_check.checked === true ? console.log("Break Selected") :
            alert("Please check Pomodoro or Break!")
}

pmdr_check.addEventListener('click', function() {
    if (pmdr_check.checked === true) {
        break_check.style.display = "none";
        break_label.style.display = "none";
        console.log("Pomodoro Selected at", rightNowDiag());
    } else {
        break_check.style.display = "initial";
        break_label.style.display = "initial";
    }
});

break_check.addEventListener('click', function() {
    if (break_check.checked === true) {
        pmdr_check.style.display = "none";
        pmdr_label.style.display = "none";
        console.log("Break Selected at", rightNowDiag());
    } else {
        pmdr_check.style.display = "initial";
        pmdr_label.style.display = "initial";
    }
});

