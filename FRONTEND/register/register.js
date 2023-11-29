//function to add a new registered user in the database
function addUser()
{
    let Name = document.getElementById("name").value;
    let Email=document.getElementById("email").value;
    let Password=document.getElementById("password").value;
	let y = new XMLHttpRequest();
	y.open("POST", "http://localhost:3500/register", true);
	y.setRequestHeader("Content-Type", "application/json");
	y.send(
        JSON.stringify({
		"username": Name,
        "email":Email,
        "role":"user",
        "password":Password
	}))
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200)
             {
			}
		}
	}
    alert("Registration is successful....");
    document.getElementById("regform").reset();
    window.location.reload();
}







