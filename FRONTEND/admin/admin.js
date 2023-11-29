//validation of username and password
function validation1()
{
    let user_name=document.getElementById("name1").value;
    let pass_word=document.getElementById("password1").value;
    let y = new XMLHttpRequest();
	y.open("POST", "http://localhost:3500/adminlogin", true);
	y.setRequestHeader("Content-type", "application/json"); 
    let newobj = {
        username: user_name,
        password: pass_word
     }
	y.send(JSON.stringify(newobj))
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200) {
                let t=JSON.parse(y.responseText);
                localStorage.setItem("Token",t.token)
                localStorage.setItem("username",t.admin.username)
                loadUser1();
			}
		}
	} 
}
function loadUser1(){
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3500/auth-admin", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("x-admin-auth-token",localStorage.getItem("Token"));
    req.send();
    req.onreadystatechange = function () {
       if (req.readyState == 4) {
         if (req.status == 200) {
         location.replace('http://localhost:3500/admin/admindisplay.html');
         }
         else
         {
            alert("Invalid credentials..")
         }
       }
    }
 
} 