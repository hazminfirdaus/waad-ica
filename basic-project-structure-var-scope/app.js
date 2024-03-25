// // VARIABLES SCOPE EXPERIMENT

// // var vs let/const
var varVariable = 'I am var';
let letVariable = 'I am let';
const constVariable = 'I am const';

(function() {
    console.log(varVariable); // Output: I am var
    console.log(letVariable); // Output: I am let
    console.log(constVariable); // Output: I am const
})();

// // Variables inside if block
// if (true) {
//     var varInsideIf = 'Var inside if';
//     let letInsideIf = 'Let inside if';
//     const constInsideIf = 'Const inside if';
// }

// console.log(varInsideIf); // Output: Var inside if
// // console.log(letInsideIf); // Throws ReferenceError: letInsideIf is not defined
// // console.log(constInsideIf); // Throws ReferenceError: constInsideIf is not defined

// // FUNCTION DECLARATION AND CALLING

// // Function Declaration
// hello();

// // Function Expression
// // var hello = function () {}; // This declaration should be commented out for the first call to work
// // let hello = () => {}; // This declaration should be commented out for the first call to work
// // const hello = () => {}; // This declaration should be commented out for the first call to work

// hello();

// function hello() {
//     console.log('Hello from function declaration');
// }

// hello();

// // Function Expression
// var hello = function () {
//     console.log('Hello from function expression');
// };

// hello();

///////////////////////////////

// EVENT HANDLING METHODS

// Method 1: Using addEventListener with regular function
hello.addEventListener('click', function() {
    console.log(this); // Refers to the button element
});

// Method 2: Using addEventListener with arrow function
// hello.addEventListener('click', () => {
//     console.log(this); // Refers to the lexical scope (window/global)
// });

// // Method 3: Using onclick with regular function
// hello.onclick = function() {
//     console.log(this); // Refers to the button element
// };

// // Method 4: Using onclick with arrow function
// hello.onclick = () => {
//     console.log(this); // Refers to the lexical scope (window/global)
// };

// Self-invoking function
// (()=>{
//     // local variable
//      let i = 0;
//      hello.addEventListener('click', function(){
//      i++;
//      console.log('Hello World!', i);
//      });
//     })();
    
//     // global variable
//     var i = "I am global variable";
//     console.log(window.i);



// FINDINDS

// var has function-level scope, while let and const have block-level scope.
// Variables declared inside if (true) {} block with var are accessible outside the block, 
// but with let or const, they are not.
// Function declarations are hoisted, so they can be called before they are declared.
// Function expressions are not hoisted, so they cannot be called before they are declared.
// Arrow functions do not have their own this, so they inherit the this value from the parent scope.
// Regular functions have their own this, so they refer to the object that called them.
// Regular functions are called using addEventListener or onclick, while arrow functions are not.
// Event listeners with regular functions (function(){}) and traditional event assignments 
// (object.onclick = function(){}) dynamically bind this to the object the event listener is attached to. 
// Arrow functions (() => {}) maintain the lexical this, which is the this value from the enclosing 
// lexical context.


