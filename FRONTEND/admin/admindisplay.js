window.onload = allUsers();
window.onload = getTask();
let users = "";
let tasks = "";
//getting username of admin from local storage and displaying it
function welAdmin() {
	user_name = localStorage.getItem("username");
	let content = ` <h4 id="b">Welcome ${user_name} !!!</h4>`
	document.getElementById("a").innerHTML = content;
}
//get request to get all users from database
function allUsers() {
	const x = new XMLHttpRequest();
	x.open("GET", "http://localhost:3500/users", true);
	x.setRequestHeader("Content-Type", "application/json");
	x.setRequestHeader("x-admin-auth-token", localStorage.getItem("Token"));
	x.send();
	x.onreadystatechange = function () {
		if (x.readyState == 4) {
			if (x.status == 200) {
				users = JSON.parse(x.responseText);
			}
		}
	}
}
//function to show dropdown list
function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		let dropdowns = document.getElementsByClassName("dropdown-content");
		let i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}
//serach bar 
function searchDisplay2() {
	let val;
	val = document.getElementById("name1").value;
	let content = `<tr>
	<th style=" width:20%">S.No</th>
	<th style=" width:20%">User's Name<button type="button" onclick=sortTable() id="sub" ><i class="fa fa-sort" aria-hidden="true"></i></button></th>
	<th style=" width:40%">Email</th>
	<th style=" width:20%">View tasks</th>
</tr>`;
	let k = 0;
	for (let i in users) {
		if (users[i].username == val) {
			k++;
			content += `<tr>
		<td >${k}</td>
		<td >${users[i].username}</td>
		<td >${users[i].email}</td>
		<td><button id="taskbutt${i}" class="alreadyassigned" onclick='assignedTasks("${users[i].username}")'>View already assigned tasks</button></td>
	</tr>`
			document.getElementById("table1").innerHTML = content;
		}
	}
	if (val == "") {
		for (let i in users) {

			k++;
			content += `<tr>
				<td >${k}</td>
				<td >${users[i].username}</td>
				<td >${users[i].email}</td>
				<td><button id="taskbutt${i}" class="alreadyassigned" onclick='assignedTasks("${users[i].username}")'>View already assigned tasks</button></td>
			</tr>`

			document.getElementById("table1").innerHTML = content;
		}
	}
}
//function to display all the users and their details
function displayUsers() {
	document.getElementById("table1").style.display = "block";
	document.getElementById("form3").style.display = "none";
	document.getElementById("table2").style.display = "none";
	document.getElementById("table3").style.display = "none";
	document.getElementById("div1").style.display = "none";
	document.getElementById("sear").style.display = "block";
	document.getElementById("sear1").style.display = "none";
	let content = `<tr>
	<th style=" width:20%">S.No</th>
	<th style=" width:20%">User's Name<button type="button" onclick=sortTable() id="sub" ><i class="fa fa-sort" aria-hidden="true"></i></button></th>
	<th style=" width:40%">Email</th>
	<th style=" width:20%">View tasks</th>
</tr>`;
	let k = 0;
	for (let i in users) {
		k++;
		content += `<tr>
		<td >${k}</td>
		<td >${users[i].username}</td>
		<td >${users[i].email}</td>
		<td><button id="taskbutt${i}" class="alreadyassigned" onclick='assignedTasks("${users[i].username}")'>View already assigned tasks</button></td>
	</tr>`
	}
	document.getElementById("table1").innerHTML = content;
}
//function to sort the table
function sortTable()
{
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table1");
  switching = true;
  while (switching) 
  {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
/**
 * function to display assigned tasks of a specific user
 * @param assignedname represents the specific user's name
 */
function assignedTasks(assignedname) {
	let tasknamearr = [];
	let taskdesarr = [];
	let taskdurarr = [];
	let taskstatus = [];
	let taskid = [];
	for (let h in tasks) {
		if (assignedname == tasks[h].name) {
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
    <h2 class="card-title">TASK:${f + 1}</h2>
    <p class="card-text"><span class="sp">TASK NAME: </span><span>${tasknamearr[f]}</span></p>
    <p class="card-text"><span class="sp">TASK DESCRIPTION: </span><span> ${taskdesarr[f]}</span></p>
    <p class="card-text"><span class="sp">TASK DURATION: </span><span> ${taskdurarr[f]}</span></p>
    <p class="card-text"><span class="sp">CURRENT STATUS: </span><span> ${taskstatus[f]}</span></p>
     </div>`
		}
		document.getElementById("div1").innerHTML = taskcontent;
		document.getElementById("table1").style.display = "none";
		document.getElementById("form3").style.display = "none";
		document.getElementById("table2").style.display = "none";
		document.getElementById("table3").style.display = "none";
		document.getElementById("div1").style.display = "block";
		document.getElementById("sear").style.display = "none";
		document.getElementById("sear1").style.display = "none";
	}
	else {
		let notask = `<h1>No tasks are assigned yet...</h1>`
		document.getElementById("div1").innerHTML = notask;
		document.getElementById("table1").style.display = "none";
		document.getElementById("form3").style.display = "none";
		document.getElementById("table2").style.display = "none";
		document.getElementById("table3").style.display = "none";
		document.getElementById("div1").style.display = "block";
	}
}
//get request for getting all the task details
function getTask() {
	const x = new XMLHttpRequest();
	x.open("GET", "http://localhost:3500/task", true);
	x.send();
	x.onreadystatechange = function () {
		if (x.readyState == 4) {
			if (x.status == 200) {
				tasks = JSON.parse(x.responseText);
			}
		}
	}
}
/**
 * assigning a task to a user
 * @param  vname represents the name of the user
 * @param x represents the id
 */
function addTask(vname, x) {
	let uid;
	let z = document.getElementById("selectss" + x).value;
	for (h in tasks) {
		if (z == tasks[h].task) {
			uid = tasks[h]._id;
		}
	}
	let y = new XMLHttpRequest();
	y.open("PUT", `http://localhost:3500/task/${uid}`, true);
	y.setRequestHeader("Content-Type", "application/json");
	y.send(
		JSON.stringify({
			"name": vname,
			"notification": 1
		}))
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200) {
				alert("Task added..");
			}
		}
	}
}
let taskusers = "";
let content = ""
let content1 = "";
let content2 = "";
let contentin = "";
let c1 = "", c2 = "", c3 = "", c4 = "";
let content3 = "";
//function to display all the task details
function displayTasks() {
	let wholecontent = ""
	document.getElementById("table1").style.display = "none";
	document.getElementById("table2").style.display = "block";
	document.getElementById("form3").style.display = "none";
	document.getElementById("table3").style.display = "none";
	document.getElementById("div1").style.display = "none";
	document.getElementById("sear").style.display = "none";
	document.getElementById("sear1").style.display = "none";
	content = `<tr>
	<th width="100px">S.NO</th>
	<th width="230px">USER NAME</th>
	<th width="430px">FILL TO ASSIGN TASK</th>
	<th width="100px">ADD TASK</th>
</tr>`;
	c4 = `<option  value="view all tasks">View all the available tasks..</option>`
	for (let i in tasks) {
		if (tasks[i].name == "") {
			c2 += `<option id="option${i}" value="${tasks[i].task}">${tasks[i].task}</option>`
		}
	}
	for (let i in users) {
		let k = i;
		k++;
		content1 = `<tr><td>${k}</td>
		<td>${users[i].username}</td>`
		c1 = `<td><form id="form()">
       <select type="dropdown" name="tasks" class="selectbutton" id="selectss${i}">`
		c3 = `</select>
		</form>
		</td>`
		contentin = c1 + c4 + c2 + c3;
		content3 = `<td>
			<button type="button" id="sub" onclick='addTask("${users[i].username}","${i}")'><img src="../images/add2.png" height="35px" width="35px"></button>	
       </td> 
	</tr>`
		wholecontent += content1 + contentin + content3
	}
	document.getElementById("table2").innerHTML = content + wholecontent;
}
//function to update and delete individual tasks 
function separateTasks() {
	getTask();
	console.log("separate")
	document.getElementById("table1").style.display = "none";
	document.getElementById("table2").style.display = "none";
	document.getElementById("form3").style.display = "none";
	document.getElementById("table3").style.display = "block";
	document.getElementById("div1").style.display = "none";
	document.getElementById("sear1").style.display = "block";
	document.getElementById("sear").style.display = "none";
	let content = `<tr>
	<th>Task Id</th>
	<th>Task Name</th>
	<th>Created At</th>
	<th>Assigned to</th>
	<th>Task Description</th>
	<th>Status</th>
	<th>Comments</th>
	<th>Task Duration</th>
	<th>Update Task</th>
	<th>Delete Task</th></tr>`;
	for (let i in tasks) {
		let cre = tasks[i].created_at.substring(0, 10)
		content += `<tr>
		<td>${tasks[i].rannumber}</td>
		<td>${tasks[i].task}</td>
		<td>${cre}</td>
		<td>${tasks[i].name}</td>
		<td>${tasks[i].description}</td>
		<td>${tasks[i].status}</td>
		<td>${tasks[i].comments}</td>
		<td>${tasks[i].duration}</td>
		<td>
			<button type="button" id="sub" onclick='openPopup("${tasks[i]._id}")'><img src="../images/edit.png" height="50px" width="50px"></button>	
       </td> 
		<td>
			<button type="submit" id="sub" onclick='deleteTask("${tasks[i]._id}")'><img src="../images/delete.png" height="30px" width="30px"></button>	
       </td> 
	</tr>`
	}
	document.getElementById("table3").innerHTML = content;
}
//search bar 
function search2() {
	let req = document.getElementById("name2").value;
	let content = `<tr>
	<th>Task Id</th>
	<th>Task Name</th>
	<th>Created At</th>
	<th>Assigned to</th>
	<th>Task Description</th>
	<th>Status</th>
	<th>Comments</th>
	<th>Task Duration</th>
	<th>Update Task</th>
	<th>Delete Task</th>
</tr>`;
	if (req == "") {
		for (let i in tasks) {
			let cre = tasks[i].created_at.substring(0, 10)
			content += `<tr>
		<td>${tasks[i].rannumber}</td>
		<td>${tasks[i].task}</td>
		<td>${cre}</td>
		<td>${tasks[i].name}</td>
		<td>${tasks[i].description}</td>
		<td>${tasks[i].status}</td>
		<td>${tasks[i].comments}</td>
		<td>${tasks[i].duration}</td>		
			<td>
				<button type="button" id="sub" onclick='openPopup("${tasks[i]._id}")'><img src="../images/edit.png" height="50px" width="50px"></button>	
		   </td> 	
			<td>
				<button type="submit" id="sub" onclick='deleteTask("${tasks[i]._id}")'><img src="../images/delete.png" height="30px" width="30px"></button>	
		   </td> 
		</tr>`
			document.getElementById("table3").innerHTML = content;
		}
	}
	for (let i in tasks) {
		if (tasks[i].status == req|| tasks[i].name==req || tasks[i].rannumber==req||tasks[i].duration==req){
			let cre = tasks[i].created_at.substring(0, 10)
			content += `<tr>
		<td>${tasks[i].rannumber}</td>
		<td>${tasks[i].task}</td>
		<td>${cre}</td>
		<td>${tasks[i].name}</td>
		<td>${tasks[i].description}</td>
		<td>${tasks[i].status}</td>
		<td>${tasks[i].comments}</td>
		<td>${tasks[i].duration}</td>			
		<td>
		<button type="button" id="sub" onclick='openPopup("${tasks[i]._id}")'><img src="../images/edit.png" height="50px" width="50px"></button>	
		</td> 
		<td>
		<button type="submit" id="sub" onclick='deleteTask("${tasks[i]._id}")'><img src="../images/delete.png" height="30px" width="30px"></button>	
		</td></tr>`
			document.getElementById("table3").innerHTML = content;
		}
	}
}
/**
 * delete request for deleting a task
 * @param delname represents the id of the user
 */
function deleteTask(delname) {
	let y = new XMLHttpRequest();
	y.open("DELETE", `http://localhost:3500/task/${delname}`, true);
	y.send();
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200) {
				separateTasks();
			}
		}
	}
}
let updateid;
//function to open popup for updating a task
function openPopup(upid) {
	updateid = upid;
	document.getElementById("myPopup").style.display = "block";
	let counts;
	for (let k in tasks) {
		if (updateid == tasks[k]._id) {
			counts = k;
		}
	}
	document.getElementById("tname").value = tasks[counts].task;
	document.getElementById("tdescription").value = tasks[counts].description;
	document.getElementById("tduration").value = tasks[counts].duration;
}
//put request for updating a task
function updateTask() {
	document.getElementById("myPopup").style.display = "none";
	let histask = document.getElementById("tname").value
	let hisdescription = document.getElementById("tdescription").value
	let hisduration = document.getElementById("tduration").value
	let y = new XMLHttpRequest();
	y.open("PUT", `http://localhost:3500/task/${updateid}`, true);
	y.setRequestHeader("Content-Type", "application/json");
	y.send(
		JSON.stringify({
			"task": histask,
			"description": hisdescription,
			"duration": hisduration
		}))
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200) {
				alert("new details are updated");
			}
		}
	}
	separateTasks()
}
//home page of admin
function mainPage() {
	document.getElementById("table1").style.display = "none";
	document.getElementById("table2").style.display = "none";
	document.getElementById("table3").style.display = "none";
	document.getElementById("form3").style.display = "block";
	document.getElementById("div1").style.display = "none";
	document.getElementById("sear").style.display = "none";
	document.getElementById("sear1").style.display = "none";
}
//creation of new task
function addTaskOnly() {
	let y = new XMLHttpRequest();
	let Name = document.getElementById("tname1").value;
	let Description = document.getElementById("tdescription1").value;
	let Duration = document.getElementById("tduration1").value;
	let Status = document.getElementById("select2").value;
	let rannumber = Math.floor(Math.random() * 100000000);
	console.log(rannumber);
	y.open("POST", "http://localhost:3500/task", true);
	y.setRequestHeader("Content-Type", "application/json");
	y.send(
		JSON.stringify({
			"name": "",
			"task": Name,
			"description": Description,
			"status": Status,
			"duration": Duration,
			"notification": 0,
			"rannumber": rannumber,
			"comments": ""
		}))
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200) {
				alert("New Task is created...");
				document.getElementById("form3").reset();
			}
		}
	}
}
//function to close the popup of update form
function closePop() {
	document.getElementById("myPopup").style.display = "none";
}


