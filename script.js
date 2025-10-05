// Create Values & Operators
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '='];

// Grab screen display and keypad elements
const screenOutput = document.querySelector(".calculator__display");
const keypad = document.querySelector(".calculator__keypad");

// Create & grab variables for calculations
let userInput = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";
let output = 0;
let equalsOperator = false;

// Add event listeners to keypad digits and controls
keypad.addEventListener("click", e => {

    // Grab the inner html if the user clicks a button    
    if (e.target.classList.contains("calculator__input")) {
        const button = e.target;
        userInput = button.innerHTML;
    }
});