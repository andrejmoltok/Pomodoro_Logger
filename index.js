const pmdr_check = document.getElementById("pmdr_check");
const break_check = document.getElementById("break_check");

const pmdr_label = document.getElementById("pmdr_label");
const break_label = document.getElementById("break_label");

const myInterval = setInterval(rightNowDiag, 1000);

function rightNowDiag() {
    var dateSelected = new Date();
    return rightnow = dateSelected.getHours() + ":" + dateSelected.getMinutes() + ":" + dateSelected.getSeconds();
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
    const input_create = document.createElement("input");
    const label_25_create = document.createElement("label");
    if (pmdr_check.checked === true) {
        //log for diagnostics the time selected
        console.log("Pomodoro Selected at", rightNowDiag());
        //hide the label and checkbox for the Break option
        break_check.style.display = "none";
        break_label.style.display = "none";
        //set label for the input created
        label_25_create.htmlFor = "choose";
        label_25_create.appendChild(document.createTextNode("25min"))
        //set attributes for the input created
        input_create.setAttribute("type","checkbox");
        input_create.id = "choose";
        input_create.defaultValue = "25";
        document.body.appendChild(label_25_create);
        document.body.appendChild(input_create);
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

