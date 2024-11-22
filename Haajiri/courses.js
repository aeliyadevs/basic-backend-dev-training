// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Import forebase configuration details
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
// display course cards
const courses = await getDocs(collection(db, "courses"));
const coursesDiv = document.getElementById("courses");
courses.forEach((course) => {
  console.log(course.data());
  const card = document.createElement("div");
  card.className = "course-card";
  card.innerHTML = `
    <h3>${course.data().courseTitle}</h3>
    <div class="status running">Running</div>
    <p>${course.data().courseDesc}</p>
    <p><strong>Start Date: ${course.data().startDate}</strong></p>
    <p><strong>Instructor: ${course.data().instructor}</strong></p>
    <div class="options">
      <a href="students.html" class="primary-btn">Manage Students</a>
      <a href="#" class="primary-btn">Take Attendance</a>
    </div>
  `;
  coursesDiv.appendChild(card);
});
