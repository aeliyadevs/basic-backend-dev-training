// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
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
  const courseDiv = document.createElement("div");
  courseDiv.className = "course-card";

  const h3 = document.createElement("h3");
  h3.innerHTML = course.data().courseTitle;
  courseDiv.appendChild(h3);

  const status = document.createElement("span");
  status.className = "status " + course.data().status;
  status.innerHTML = course.data().status;
  courseDiv.appendChild(status);

  const desc = document.createElement("p");
  desc.innerHTML = course.data().courseDesc;
  courseDiv.appendChild(desc);

  const startDate = document.createElement("p");
  startDate.className = "bold";
  startDate.innerHTML = "Start Date: " + course.data().startDate;
  courseDiv.appendChild(startDate);

  const instructor = document.createElement("p");
  instructor.className = "bold";
  instructor.innerHTML = "Instructor: " + course.data().instructor;
  courseDiv.appendChild(instructor);

  const controls = document.createElement("div");
  controls.className = "controls";
  const manageBtn = document.createElement("a");
  manageBtn.innerHTML = "Manage Students";
  controls.appendChild(manageBtn);
  const attendanceBtn = document.createElement("a");
  attendanceBtn.innerHTML = "Take Attendance";
  controls.appendChild(attendanceBtn);
  courseDiv.appendChild(controls);

  document.getElementById("courses").appendChild(courseDiv);
});
// courses.forEach((course) => {
//   const card = document.createElement("div");
//   card.className = "course-card";
//   card.innerHTML = `
//     <h3>${course.data().courseTitle}</h3>
//     <div class="status running">Running</div>
//     <p>${course.data().courseDesc}</p>
//     <p><strong>Start Date: ${course.data().startDate}</strong></p>
//     <p><strong>Instructor: ${course.data().instructor}</strong></p>
//     <div class="options">
//       <a href="students.html" class="primary-btn">Manage Students</a>
//       <a href="#" class="primary-btn">Take Attendance</a>
//     </div>
//   `;
//   coursesDiv.appendChild(card);
// });

// Steps for form submission
// 1. Create a form
// 2. Add eventlistener "submit" and display data in the console
// 3. Submit the data to firebase using "addDoc"
