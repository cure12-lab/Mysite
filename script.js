function openAuth() {
  document.getElementById("authPopup").style.display = "flex";
}
function submitLogin() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  fetch("/log", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, pass})
  });
  alert("Something went wrong. Please try again.");
  document.getElementById("authPopup").style.display = "none";
}
