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

    // Populate firstOperand variable
    // We know it is the firstOperand because the operator variable is empty
    if (values.includes(userInput) && equalsOperator === false && operator === "") {
        // Reset firstOperand so we can handle post equals operations
        firstOperand += userInput;
        console.log(`firstOperand: ${Number(firstOperand)}`);
        displayOutput();
    }

    // Populate operator variable if firstOperand is valid but secondOperator is empty
    // Handles all operators except "=""
    if (operators.includes(userInput) && equalsOperator === false && firstOperand !== "" && userInput !== "=") {
        // Set the operator
        operator = userInput;
        console.log(`operator: ${operator}`);
        displayOutput();
    }

    // Populate secondOperand variable
    // We know it is the secondOperand because the operator variable is not empty    
    if (values.includes(userInput) && equalsOperator === false && operator !== "") {
        secondOperand += userInput;
        console.log(`secondOperand: ${Number(secondOperand)}`);
        displayOutput();
    }
});

function displayOutput() {
    screenOutput.innerHTML = `${firstOperand} ${operator} ${secondOperand}`;
}