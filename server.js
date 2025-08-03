<!DOCTYPE html>
<html>
<head>
    <title>My Improved Site</title>
    <style>
        body { font-family: Arial; background: #f8f9fa; }
        .container { max-width: 400px; margin: 50px auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        input, button { width: 100%; padding: 10px; margin: 5px 0; }
        button { background: #007BFF; color: white; border: none; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
<div class="container">
    <h2>Register</h2>
    <input id="regName" placeholder="Name">
    <input id="regEmail" placeholder="Email">
    <input id="regPass" type="password" placeholder="Password">
    <button onclick="signup()">Sign Up</button>
    <hr>
    <h2>Login</h2>
    <input id="logEmail" placeholder="Email">
    <input id="logPass" type="password" placeholder="Password">
    <button onclick="login()">Login</button>
    <p id="msg" style="color:red;"></p>
</div>
<script>
const API = "https://YOUR-BACKEND-URL.onrender.com"; // Replace after hosting

async function signup() {
    const res = await fetch(API + "/signup", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("regName").value,
            email: document.getElementById("regEmail").value,
            password: document.getElementById("regPass").value
        })
    });
    document.getElementById("msg").innerText = (await res.json()).message || "Error";
}

async function login() {
    const res = await fetch(API + "/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("logEmail").value,
            password: document.getElementById("logPass").value
        })
    });
    const data = await res.json();
    document.getElementById("msg").innerText = data.user ? "Welcome " + data.user.name : data.error;
}
</script>
</body>
</html>