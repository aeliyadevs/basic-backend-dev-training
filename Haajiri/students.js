import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Import database
import { db, handleModalClose, showAlert } from "./common.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
// console.log(params);
const courseId = params.get("courseId");
const courseTitle = params.get("courseTitle");
document.getElementById("course-title").innerHTML = courseTitle;

// function to get students who are enrolled to the selected course
async function enrolledStudents() {
  const students = await getDocs(
    query(collection(db, "students"), where("courseId", "==", courseId))
  );
  return students;
}
const enrolled = await enrolledStudents();

let count = 0;
enrolled.forEach((student) => {
  let studentRow = document.createElement("tr");
  let sn = document.createElement("td");
  sn.innerHTML = ++count;
  studentRow.appendChild(sn);
  let studentName = document.createElement("td");
  studentName.className = "name-col";
  studentName.innerHTML =
    student.data().firstName +
    " " +
    student.data().middleName +
    " " +
    student.data().lastName;
  studentRow.appendChild(studentName);
  document.getElementById("studentList").appendChild(studentRow);
});

// function to get students who are not yet enrolled to the selected course
async function notEnrolledStudents() {
  const students = await getDocs(
    query(collection(db, "students"), where("courseId", "!=", courseId))
  );
  return students;
}
const notEnrolled = await notEnrolledStudents();

// add notEnrolled students to the add student dropdown
function studentDropdown() {
  notEnrolled.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.id;
    option.innerHTML =
      student.data().firstName +
      " " +
      student.data().middleName +
      " " +
      student.data().lastName;
    document.getElementById("student-dropdown").appendChild(option);
  });
}

// student modal
const studentModal = document.getElementById("add-student-modal");
document
  .getElementById("add-student-btn")
  .addEventListener("click", function () {
    studentModal.classList.remove("hidden");
    studentDropdown();
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

//
document.getElementById("new-student").addEventListener("click", function () {
  document.getElementById("select-student").classList.add("hidden");
  document.getElementById("create-student").classList.remove("hidden");
});

document.getElementById("go-back").addEventListener("click", function () {
  document.getElementById("select-student").classList.remove("hidden");
  document.getElementById("create-student").classList.add("hidden");
});

// Handle adding existing student
const addExisting = document.getElementById("choose-student-form");
addExisting.addEventListener("submit", addExistingStudent);
async function addExistingStudent(e) {
  e.preventDefault();
  console.log(e.target.studentId.value);
  const studentId = e.target.studentId.value;
  // const newStudent = await addDoc(collection(db, "students"), data);
  await updateDoc(doc(db, "students", studentId), {
    courseIDs: arrayUnion(courseId),
  });
}

// Handle new student form submission
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

async function addToArray() {
  await updateDoc(doc(db, "students", "uH3S0yfdXtstKpV8yMgM"), {
    courses: arrayUnion("uTViiSPy4nwTqGkOoRnW", "HBJTutptq9LN1hTMGuJY"),
  });
  // console.log("added");
}
addToArray();

async function removeFromArray() {
  await updateDoc(doc(db, "students", "uH3S0yfdXtstKpV8yMgM"), {
    courses: arrayRemove("uTViiSPy4nwTqGkOoRnW"),
  });
  // console.log("removed");
}
removeFromArray();
