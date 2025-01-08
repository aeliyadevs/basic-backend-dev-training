// Import the functions you need from the SDKs you need
import {
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Initialize Firestore
import { db, handleModalClose, showAlert } from "./common.js";

// display course cards
const courses = await getDocs(collection(db, "courses"));
const coursesDiv = document.getElementById("courses");
courses.forEach((course) => {
  // console.log(course.data());
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
  manageBtn.href =
    "./students.html?courseId=" +
    course.id +
    "&courseTitle=" +
    course.data().courseTitle;
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

const courseModal = document.getElementById("add-course-modal");
document
  .getElementById("new-course-btn")
  .addEventListener("click", function () {
    courseModal.classList.remove("hidden");
    handleModalClose();
  });

// Handle new course form submission
const courseForm = document.getElementById("course-form");
courseForm.addEventListener("submit", addCourse);
async function addCourse(event) {
  event.preventDefault();

  const data = {
    courseTitle: event.target.courseTitle.value,
    courseDesc: event.target.courseDesc.value,
    startDate: event.target.startDate.value,
    instructor: event.target.instructor.value,
    status: event.target.status.value,
  };

  console.log(data);
  try {
    await addDoc(collection(db, "courses"), data);
    console.log("Success");
    showAlert("success");
  } catch (error) {
    console.log(error);
    showAlert("failed");
  }
}

const modalClose = document.querySelectorAll(".close-icon");
modalClose.forEach((icon) => {
  icon.addEventListener("click", function () {
    icon.parentElement.parentElement.classList.add("hidden");
  });
});
