//function to validate username and password
function validation()
{
    let login_name=document.getElementById("name").value;
    let login_password=document.getElementById("password").value;
    let y = new XMLHttpRequest();
	y.open("POST", "http://localhost:3500/login", true);
	y.setRequestHeader("Content-Type", "application/json");
	y.send(
        JSON.stringify({
		"username": login_name,
        "password":login_password
	}))
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200) {
                let t=JSON.parse(y.responseText);
                console.log(t)
                localStorage.setItem("Token",t.token)
                localStorage.setItem("Username",t.user.username)
                loadUser();
			}
            else
            {
             alert("Your credentials are wrong...")
            }
		}
	}  
}
function loadUser(){
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3500/auth-user", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("x-user-auth-token",localStorage.getItem("Token"));
    req.send();
    req.onreadystatechange = function () {
       if (req.readyState == 4) {
         if (req.status == 200) {
         location.replace('http://localhost:3500/taskdisplay/task.html');
         }
       }
    }
} 