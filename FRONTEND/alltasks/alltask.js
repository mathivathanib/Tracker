window.onload=getDisplay();
let user_name;
//function to get and display the username from localstorage
function display()
{
user_name=localStorage.getItem("Username");
let content=` <p id="b">Welcome ${user_name} !!!</p>`
document.getElementById("a").innerHTML=content;
}
let tasks="";
//get request for getting the task details
function getDisplay()
{
       const x = new XMLHttpRequest();
       x.open("GET", "http://localhost:3500/task", true);
       x.send();
       x.onreadystatechange = function () {
           if (x.readyState == 4) {
               if (x.status == 200) {
                   tasks = JSON.parse(x.responseText);
                   alltDisplay();
               }
           }
       }
}
//displaying all the tasks and its details
function alltDisplay()
{	let content = `<tr>
	<th style=" width:20%">S.No</th>
	<th style=" width:20%">User's Name</th>
	<th style=" width:20%">Assigned Task</th>
	<th style=" width:40%">Description</th>
    <th style=" width:40%">Status</th>
</tr>`;
let k=0;
	for (let i in tasks) {
        if(tasks[i].name!="" && tasks[i].name!=user_name)
        {
		k++;
		content += `<tr>
		<td >${k}</td>
		<td >${tasks[i].name}</td>
		<td>${tasks[i].task}</td>
        <td>${tasks[i].description}</td>
        <td>${tasks[i].status}</td>
	</tr>`
	}
}
	document.getElementById("table1").innerHTML = content;
}
