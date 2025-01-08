// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Import forebase configuration details
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Export database
export { db };

export function showAlert(status) {
  const alertPopup = document.getElementById("alert-popup");
  if (status == "success") {
    alertPopup.children[0].classList.add("success");
  } else {
    alertPopup.children[0].classList.add("failed");
  }
  alertPopup.classList.remove("hidden");
  const alertTimeout = setTimeout(function () {
    alertPopup.classList.add("hidden");
    clearTimeout(alertTimeout);
  }, 4000);
}

export function handleModalClose() {
  // Handle modal close button click event
  const modalCloseBtns = document.querySelectorAll(".close-icon");
  modalCloseBtns.forEach((icon) => {
    icon.addEventListener("click", function () {
      icon.parentElement.parentElement.classList.add("hidden");
    });
  });
}
