import {
  collection,
  getDocs,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { db } from "./common.js";

// const myStudents = await getDocs(collection(database, "students"));
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
  // console.log(student.data());
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

// get data
// const getData = await getDocs(collection(db, "students"));

// let students = document.getElementById("students");
// getData.forEach((student) => {
//   let name = document.createElement("li");
//   name.innerHTML = student.data().firstName + " " + student.data().lastName;
//   students.appendChild(name);
// });

// async function addStudent(e) {
//   e.preventDefault();
//   // save data
//   // console.log(e);
//   try {
//     const docRef = await addDoc(collection(db, "students"), {
//       firstName: e.target.firstName.value,
//       middleName: e.target.middleName.value,
//       lastName: e.target.lastName.value,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// document.getElementById("student-form").addEventListener("submit", addStudent);

// const myUrl = new URL(window.location.href);
// const parameters = new URLSearchParams(myUrl.search);
// console.log(myUrl);
// console.log(parameters.get("courseId"));
// const selectedCourse = parameters.get("courseId");
