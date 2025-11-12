import { authentication, database } from "./firebase-configuration.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const logoutBtn = document.getElementById("logoutBtn");
const loaderOverlay = document.getElementById("loaderOverlay");
const todoContainer = document.getElementById("todoContainer");

let currentUser = null;
let unsubscribeTasks = null;

// ✅ Handle authentication
onAuthStateChanged(authentication, (user) => {
  if (user) {
    currentUser = user;
    console.log("User logged in:", user.email);
    loadRealtimeTasks();
  } else {
    console.log("No user logged in, redirecting...");
    window.location.href = "../../index.html";
  }
});

// ✅ Real-time listener for tasks
function loadRealtimeTasks() {
  if (!currentUser) return;

  if (unsubscribeTasks) unsubscribeTasks();

  const q = query(collection(database, "tasks"), where("uid", "==", currentUser.uid));

  // Show loader while fetching
  loaderOverlay.style.display = "flex";
  todoContainer.style.display = "none";

  unsubscribeTasks = onSnapshot(
    q,
    (snapshot) => {
      taskList.innerHTML = "";

      snapshot.forEach((taskDoc) => {
        const data = taskDoc.data();
        const li = document.createElement("li");
        li.textContent = data.text;

        const del = document.createElement("button");
        del.textContent = "❌";
        del.classList.add("delete-btn");

        del.onclick = async () => {
          await deleteDoc(doc(database, "tasks", taskDoc.id));
        };

        li.appendChild(del);
        taskList.appendChild(li);
      });

      // Hide loader once tasks loaded
      loaderOverlay.style.display = "none";
      todoContainer.style.display = "block";
    },
    (error) => {
      console.error("Error loading tasks:", error);
      loaderOverlay.innerHTML = "<p>Failed to load tasks 😢</p>";
    }
  );
}

// ✅ Add new task
addTaskBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (!text || !currentUser) return;

  await addDoc(collection(database, "tasks"), {
    text,
    uid: currentUser.uid,
    createdAt: new Date()
  });

  taskInput.value = "";
});

// ✅ Logout
logoutBtn.addEventListener("click", async () => {
  if (unsubscribeTasks) unsubscribeTasks();
  await signOut(authentication);
  window.location.href = "../../index.html";
});
