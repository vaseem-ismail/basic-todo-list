// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAt-95lJWeRZ6ki-oJgPfo17kpQOzM5nls",
  authDomain: "todo-list-a9aba.firebaseapp.com",
  projectId: "todo-list-a9aba",
  storageBucket: "todo-list-a9aba.firebasestorage.app",
  messagingSenderId: "766711719505",
  appId: "1:766711719505:web:686aa64c0262f9b1a4fa70",
  measurementId: "G-XH5EL281C9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const database = getFirestore(app);
