import { authentication } from "./firebase-configuration.js";
import { signInWithEmailAndPassword, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const logMessage = document.getElementById("logMsg");

  try {
    await signInWithEmailAndPassword(authentication, email, password);
    // alert("Login successful!");
    logMessage.textContent = "Login Successful!";
    window.location.href = "./pages/html/home.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});

onAuthStateChanged(authentication, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  }
});
