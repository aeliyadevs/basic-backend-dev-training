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

const courseDropdown = document.getElementById("course");
const courses = await getDocs(collection(db, "courses"));
courses.forEach((course) => {
  // console.log(course.data());
  const option = document.createElement("option");
  option.innerText = course.data().courseTitle;
  option.value = course.id;
  courseDropdown.appendChild(option);
});

const form = document.getElementById("student-form");
form.addEventListener("submit", addStudent);
function addStudent(e) {
  e.preventDefault();
  const data = {
    firstName: e.target.firstName.value,
    middleName: e.target.middleName.value,
    lastName: e.target.lastName.value,
    courseId: e.target.course.value,
  };
  //   console.log(data);
  try {
    addDoc(collection(db, "students"), data);
    alert("Student added successfully.");
  } catch (err) {
    console.log(err);
  }
}
