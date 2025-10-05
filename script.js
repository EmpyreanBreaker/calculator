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
let divByZero = false;

// Add event listeners to keypad digits and controls
keypad.addEventListener("click", e => {

    // Grab the inner html if the user clicks a button    
    if (e.target.classList.contains("calculator__input")) {
        const button = e.target;
        userInput = button.innerHTML;
    }

    // If the user hits "C" reset everything
    if (userInput === "C") {
        firstOperand = "";
        operator = "";
        secondOperand = "";
        output = 0;
        equalsOperator = false;
        divByZero = false;
        screenOutput.innerHTML = 0;
    }

    // If the user divides by 0 reset everything or clears
    if (divByZero === true) {
        firstOperand = "";
        operator = "";
        secondOperand = "";
        output = 0;
        equalsOperator = false;
        divByZero = false;
    }

    // Scenario Two: A result is displayed & the user presses a digit
    // This if block must come first so the reset scenario goes well
    if (equalsOperator === true && values.includes(userInput)) {
        firstOperand = "";
        operator = "";
        secondOperand = "";
        output = 0;
        equalsOperator = false;
    }

    // Scenario Four: User chooses an operator after we display a result
    if (equalsOperator === true && operators.includes(userInput) && userInput !== "=") {
        firstOperand = output.toString();
        operator = userInput;
        secondOperand = "";
        equalsOperator = false;
    }

    // Populate firstOperand variable
    // We know it is the firstOperand because the operator variable is empty
    if (values.includes(userInput) && equalsOperator === false && operator === "") {
        // Reset firstOperand so we can handle post equals operations
        firstOperand += userInput;
        display();
    }

    // Handles operation condition when the user presses an operator after all operands and operators have valid values
    // Calls the function and sets output to firstOperand
    // If the user presses an operator multiple times post calculation then the Populate operator if block kicks in
    if (operators.includes(userInput) && firstOperand !== "" && secondOperand !== "" && userInput !== "=" && operator !== "" && equalsOperator === false) {
        output = calculator(firstOperand, operator, secondOperand);
        firstOperand = output.toString();
        operator = userInput;
        // Empty secondOperand so it can take the next value - secondOperand if block kicks in
        secondOperand = "";
        display();
    }

    // Populate operator variable if firstOperand is valid but secondOperator is empty
    // Handles all operators except "=""
    if (operators.includes(userInput) && equalsOperator === false && firstOperand !== "" && userInput !== "=") {
        // Set the operator
        operator = userInput;
        display();
    }

    // Populate secondOperand variable
    // We know it is the secondOperand because the operator variable is not empty    
    if (values.includes(userInput) && equalsOperator === false && operator !== "") {
        secondOperand += userInput;
        display();
    }

    // Handle equality operations
    // Edge case: User has a valid firstOperand, empty secondOperator and a valid operator when they hit the equals sign
    if (firstOperand !== "" && operator !== "" && secondOperand === "" && userInput === "=") {
        secondOperand = firstOperand;
        output = calculator(firstOperand, operator, secondOperand);
        firstOperand = output.toString();
        equalsOperator = true;
        screenOutput.innerHTML = output;
    }
    // Scenario One: User has a valid operator and operands and hits the equals sign
    // Scenario Three: A result is displayed and the user presses the equality operator again
    else if (firstOperand !== "" && operator !== "" && secondOperand !== "" && userInput === "=") {
        output = calculator(firstOperand, operator, secondOperand);
        firstOperand = output.toString();
        equalsOperator = true;
        screenOutput.innerHTML = output;
    }
});

function display() {
    screenOutput.innerHTML = `${firstOperand} ${operator} ${secondOperand}`;
}

function calculator(firstOperand, operator, secondOperand) {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    let result = 0;

    if (secondOperand === 0 && operator === "/") {
        divByZero = true;
        return "Cannot divide by 0";
    }

    switch (operator) {
        case "+":
            result = firstOperand + secondOperand;
            break;
        case "-":
            result = firstOperand - secondOperand;
            break;
        case "*":
            result = firstOperand * secondOperand;
            break;
        case "/":
            result = firstOperand / secondOperand;
            break;
        default:
            divByZero = true;
            return "Invalid Operator"
    }
    return result = Math.round((result + Number.EPSILON) * 1e10) / 1e10;
}