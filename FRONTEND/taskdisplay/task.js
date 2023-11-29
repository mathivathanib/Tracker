window.onload = getForDisplay();
//function to display the username of the logged in user
function display() {
    let user_name;
    user_name = localStorage.getItem("Username");
    let content = ` <p id="b">Welcome ${user_name} !!!</p>`
    document.getElementById("a").innerHTML = content;
}
var tasks = "";
//get request for getting all the task details
function getForDisplay() {
    const x = new XMLHttpRequest();
    x.open("GET", "http://localhost:3500/task", true);
    x.send();
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            if (x.status == 200) {
                tasks = JSON.parse(x.responseText);
                displaySepTasks();
            }
        }
    }
}
//displaying the specific task of the user
function displaySepTasks() {
    var thisuser = localStorage.getItem("Username")
    let tasknamearr = [];
    let taskdesarr = [];
    let taskdurarr = [];
    let taskstatus = [];
    let taskid = [];
    let notification = [];
    let taskcontent = "";
    for (let h in tasks) {
        if (thisuser == tasks[h].name) {
            tasknamearr.push(tasks[h].task)
            taskdesarr.push(tasks[h].description)
            taskdurarr.push(tasks[h].duration)
            taskstatus.push(tasks[h].status)
            taskid.push(tasks[h]._id);
            notification.push(tasks[h].notification)
        }
    }
        if (tasknamearr.length > 0) {

            for (let f = 0; f < tasknamearr.length; f++) {
                if (notification[f] > 0) {
                    var tasname;
                    var tasid;
                    document.getElementById("toasts").style.display = "block"
                    tasname = tasknamearr[f]
                    for (let g in tasks) {
                        if (tasname == tasks[g].task) {
                            tasid = tasks[g]._id;

                        }
                    }
                    let y = new XMLHttpRequest();
                    y.open("PUT", `http://localhost:3500/task/${tasid}`, true);
                    y.setRequestHeader("Content-Type", "application/json");
                    y.send(
                        JSON.stringify({
                            "notification": 0
                        }))
                    y.onreadystatechange = function () {
                        if (y.readyState == 4) {
                            if (y.status == 200) {

                            }
                        }
                    }  
            }
        }
    }
    if (tasknamearr.length > 0) {
        for (let f = 0; f < tasknamearr.length; f++) {
            taskcontent += `<div class="fle">
    <h2 class="card-title">YOUR TASK:${f + 1}</h2>
    <p class="card-text"><span class="sp">TASK NAME: </span><span>${tasknamearr[f]}</span></p>
    <p class="card-text"><span class="sp">TASK DESCRIPTION: </span><span> ${taskdesarr[f]}</span></p>
    <p class="card-text"><span class="sp">TASK DURATION: </span><span> ${taskdurarr[f]}</span></p>
    <p class="card-text"><span class="sp">CURRENT STATUS: </span><span> ${taskstatus[f]}</span></p>
    <hr>
    <label for="tasks"class="card-text"><span class="sp">TASK STATUS: </span></label>
    <select type="dropdown" name="tasks" class="sel" id="select${f}">
        <option value="not">Update Status</option>
        <option value="not completed">Not Completed</option>
        <option value="in progress">In progress</option>
        <option value="completed">Completed</option>
    </select><br><br>
    <input type="text" class="com" id="comt" name="comments" placeholder="Comments(optional)" required/><br>
     <button type="button" id="upbutt" onclick='updateIt("${taskid[f]}","${f}")'>Update</button>
     </div>`
        }
        document.getElementById("div1").innerHTML = taskcontent;
    }
    else {
        let notask = `<h1>No tasks are assigned yet...</h1>`
        document.getElementById("div1").innerHTML = notask;
    }
}
/**
 * function to update the task details
 * @param upids represents the id of the task to be updated
 * @param v represents the id of the specific element
 */
function updateIt(upids, v) {
    let output, coment;
    selectElement = document.getElementById("select" + v);
    output = selectElement.value;
    coment = document.getElementById("comt").value;
    let y = new XMLHttpRequest();
    y.open("PUT", `http://localhost:3500/task/${upids}`, true);
    y.setRequestHeader("Content-Type", "application/json");
    y.send(
        JSON.stringify({
            "status": output,
            "comments": coment
        }))
    y.onreadystatechange = function () {
        if (y.readyState == 4) {
            if (y.status == 200) {
                alert("Task updated")
                window.location.reload();
            }
        }
    }
}
//function for searching 
function searchBar() {
    let thisuser = localStorage.getItem("Username");
    let name_to_search = document.getElementById("name1").value;
    if (name_to_search  == "Completed" || name_to_search  == "completed" || name_to_search  == "completed tasks" || name_to_search  == "Completed tasks") {
        searchinput = "completed"
    }
    else {
        searchinput = name_to_search ;
    }
    if (!searchinput) {
        let tasknamearr = [];
        let taskdesarr = [];
        let taskdurarr = [];
        let taskstatus = [];
        let taskid = [];
        for (let h in tasks) {
            if (thisuser == tasks[h].name) {
                tasknamearr.push(tasks[h].task)
                taskdesarr.push(tasks[h].description)
                taskdurarr.push(tasks[h].duration)
                taskstatus.push(tasks[h].status)
                taskid.push(tasks[h]._id);
            }
        }
        if (tasknamearr.length > 0) {
            let taskcontent = "";
            for (let f = 0; f < tasknamearr.length; f++) 
            {
                taskcontent += `<div class="fle">
    <h2 class="card-title">YOUR TASK:${f + 1}</h2>
    <p class="card-text"><span class="sp">TASK NAME: </span><span>${tasknamearr[f]}</span></p>
    <p class="card-text"><span class="sp">TASK DESCRIPTION: </span><span> ${taskdesarr[f]}</span></p>
    <p class="card-text"><span class="sp">TASK DURATION: </span><span> ${taskdurarr[f]}</span></p>
    <p class="card-text"><span class="sp">CURRENT STATUS: </span><span> ${taskstatus[f]}</span></p>
    <label for="tasks"class="card-text"><span class="sp">TASK STATUS: </span></label>
    <select type="dropdown" name="tasks" id="select${f}">
        <option value="not completed">Not Completed</option>
        <option value="in progress">In progress</option>
        <option value="completed">Completed</option>
    </select><br>
     <button type="button" id="upbutt" onclick='updateIt("${taskid[f]}","${f}")'>Update</button>
     </div>`

            }
            document.getElementById("div1").innerHTML = taskcontent;
        }
        else {
            let notask = `<h1>No tasks are in this status...</h1>`
            document.getElementById("div1").innerHTML = notask;
        }
    }
    else {
        let tasknamearr = [];
        let taskdesarr = [];
        let taskdurarr = [];
        let taskstatus = [];
        let taskid = [];
        for (let h in tasks) {
            if (thisuser == tasks[h].name && searchinput == tasks[h].status) {
                tasknamearr.push(tasks[h].task)
                taskdesarr.push(tasks[h].description)
                taskdurarr.push(tasks[h].duration)
                taskstatus.push(tasks[h].status)
                taskid.push(tasks[h]._id);
            }
        }
        if (tasknamearr.length > 0) {
            let taskcontent = "";
            for (let f = 0; f < tasknamearr.length; f++) {
                taskcontent += `<div class="fle">
    <h2 class="card-title">YOUR TASK:${f + 1}</h2>
    <p class="card-text"><span class="sp">TASK NAME: </span><span>${tasknamearr[f]}</span></p>
    <p class="card-text"><span class="sp">TASK DESCRIPTION: </span><span> ${taskdesarr[f]}</span></p>
    <p class="card-text"><span class="sp">TASK DURATION: </span><span> ${taskdurarr[f]}</span></p>
    <p class="card-text"><span class="sp">CURRENT STATUS: </span><span> ${taskstatus[f]}</span></p>
    <label for="tasks"class="card-text"><span class="sp">TASK STATUS: </span></label>
    <select type="dropdown" name="tasks" id="select${f}">
        <option value="not completed">Not Completed</option>
        <option value="in progress">In progress</option>
        <option value="completed">Completed</option>
    </select><br>
     <button type="button" id="upbutt" onclick='updateIt("${taskid[f]}","${f}")'>Update</button>
     <form>
     <input type="text" class="com" name="comments" placeholder="Comments(optional)" required/>
     </form>
     </div>`

            }
            document.getElementById("div1").innerHTML = taskcontent;
        }
        else {
            let notask = `<h1>No tasks are in this status...</h1>`
            document.getElementById("div1").innerHTML = notask;
        }
    }
}
function notiClose() {
    document.getElementById("toasts").style.display = "none"
}