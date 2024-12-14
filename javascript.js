// HTML - Website Bare Bone
// CSS - Style/Design/Decoration/Structure
// JavaScript - Functionality/Interaction

// Things to cover in JavaScript
// 1. Variables
// 2. Datatypes
// 3. Operators
// 4. Functions
// 5. Conditional Statements
// 6. Loops
// 7. Event Handling
// 8. Form Validation
// 9. DOM and DOM Manipulation

// Variables & Datatypes
// Example - Multiply two numbers
let num1 = 45; // number datatype
let num2 = 7;
let product = num1 * num2;
let firstName = "Hari"; // string datatype
let status = true; // boolean datatype
let height = 5.6; // float datatype
let myArray = ["Narniya", "Thomas Title", "Purpose Driven Life", "Bible"]; // Array - collection of similar datatypes
let book = {
  name: "Narniya",
  author: "CS Lewis",
  publishedYear: 1926,
  genre: "Fantasy",
};
console.log(product);

// Datatypes - number, string, boolean, array, object

// Operators
// 1. Assignment = == ===
// 2. Arithmetic + - * / ** ++ --
// 3. Logical > < <= >=

// if speed(100) > limit(70), then "Fine Him"
// else "let him go"
let speed = 90;
let limit = 70;
if (speed > limit) {
  console.log("Fine");
} else {
  console.log("Let go");
}

function speedCheck(sp, li) {
  if (sp > li) {
    console.log(sp + " - Fine");
  } else {
    console.log(sp + " - Let go");
  }
}

speedCheck(45, 60);
speedCheck(25, 60);
speedCheck(95, 60);
speedCheck(102, 60);
