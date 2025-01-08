import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Import database
import { db, handleModalClose, showAlert } from "./common.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const courseId = params.get("courseId");
const courseTitle = params.get("courseTitle");
const myStudents = await getDocs(
  query(collection(db, "students"), where("courseId", "==", courseId))
);
document.getElementById("course-title").innerHTML = courseTitle;

let count = 0;
myStudents.forEach((student) => {
  let studentRow = document.createElement("tr");
  let sn = document.createElement("td");
  sn.innerHTML = ++count;
  studentRow.appendChild(sn);
  let studentName = document.createElement("td");
  studentName.className = "name-col";
  studentName.innerHTML =
    student.data().firstName + " " + student.data().lastName;
  studentRow.appendChild(studentName);
  document.getElementById("studentList").appendChild(studentRow);
});

// student modal
const studentModal = document.getElementById("add-student-modal");
document
  .getElementById("new-student-btn")
  .addEventListener("click", function () {
    studentModal.classList.remove("hidden");
    courseDropdown();
    handleModalClose();
  });

async function courseDropdown() {
  const courseDropdown = document.getElementById("course");
  const courses = await getDocs(collection(db, "courses"));
  courses.forEach((course) => {
    // console.log(course.data());
    const option = document.createElement("option");
    option.innerText = course.data().courseTitle;
    option.value = course.id;
    courseDropdown.appendChild(option);
  });
}

// Handle student form submission
const studentForm = document.getElementById("student-form");
studentForm.addEventListener("submit", addStudent);
async function addStudent(e) {
  e.preventDefault();
  const data = {
    firstName: e.target.firstName.value,
    middleName: e.target.middleName.value,
    lastName: e.target.lastName.value,
    courseId: e.target.course.value,
  };
  try {
    addDoc(collection(db, "students"), data);
    console.log("success");
    studentModal.classList.add("hidden");
    showAlert();
  } catch (err) {
    showAlert("failed");
    console.log(err);
  }
}

// Attendance modal
const attendanceModal = document.getElementById("attendance-modal");
document
  .getElementById("attendance-btn")
  .addEventListener("click", function () {
    attendanceModal.classList.remove("hidden");
    attendanceModal.classList.add("active");
    document.getElementById("active-course").value = courseTitle;
    handleModalClose();
    // );
  });

// Handle attendance form submission
const attendanceForm = document.getElementById("attendance-form");
attendanceForm.addEventListener("submit", function (e) {
  e.preventDefault();
  showAlert("success");
});
