import { authentication } from "./firebase-configuration.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value.trim();
    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }


    try {
        const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        alert("Signup successful! 🎉");
        window.location.href = "../html/home.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
});
