const previousOperand = document.getElementById("previous-operand");
const currentOperand = document.getElementById("current-operand");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const decPoint = document.getElementById("dec-point");
const equality = document.getElementById("equality");
const allClear = document.getElementById("all-clear")
const del = document.getElementById("del")
let allowDecPoint = false;


const handleClick = (element, handler) => element.addEventListener("click", handler);

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener("click", () => {
        currentOperand.textContent += number.textContent;
    })
}

function isOperatorAvail() {
    let operatorsArray = ["-", "+", "/", "*"];
    return operatorsArray.some(operator => currentOperand.textContent.endsWith(operator))
}

decPoint.addEventListener("click", () => {    
    let decPointCanBePut = () => {
        return (currentOperand.textContent && !currentOperand.textContent.includes(".")) || allowDecPoint;
    }

    let decPointCantBePut = () => {
        return currentOperand.textContent === "" && previousOperand.textContent === ""
    }

    if (decPointCanBePut()) {
        currentOperand.textContent += decPoint.textContent
        allowDecPoint = false
    } 
    if (decPointCantBePut()) {
        allowDecPoint = false
    }
})

equality.addEventListener("click", () => {
    currentOperand.textContent = eval(previousOperand.textContent + currentOperand.textContent)
    previousOperand.textContent = ""
})

allClear.addEventListener("click", () => {
    previousOperand.textContent = "";
    currentOperand.textContent = "";
})

del.addEventListener("click", () => {
    let refactoredValue = currentOperand.textContent.slice(0, -1)
    if (currentOperand.textContent === "") {
        currentOperand.textContent += previousOperand.textContent
        previousOperand.textContent = ""
        allowDecPoint = true;
    } else {
        currentOperand.textContent = refactoredValue
    }

    function isDecAvail() {
        let count = 0
        for (let i = 0; i < currentOperand.textContent.length; i++) {
            if (currentOperand.textContent[i] === ".") {
                count++
            }
        }
        allowDecPoint = (count === 1)
    }
    isDecAvail()
})

for (let i = 0; i < operators.length; i++) {
    let operator = operators[i];

    operator.addEventListener("click", () => {
        if (currentOperand.textContent && !isOperatorAvail()) {
            currentOperand.textContent += " " + operator.textContent;
            previousOperand.textContent += " " + currentOperand.textContent;

            if (previousOperand.textContent.length > 5) {
                let refactoredValue = previousOperand.textContent.slice(0, -1);
                previousOperand.textContent = eval(refactoredValue) + " " + (previousOperand.textContent[previousOperand.textContent.length - 1])
            }

            currentOperand.textContent = ""
        }
    })
}
