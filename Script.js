const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButtons = document.querySelectorAll("[data-equals]");
const deleteButtons = document.querySelectorAll("[data-delete]");
const previousOperandTextElement = document.querySelectorAll(
  "[data-previous-operand]"
);
const allClearButton = document.querySelector("[data-all-clear");
const currentOperandTextElement = document.querySelectorAll(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const intergerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(intergerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = intergerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits === null) {
      return `${intergerDigits}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "/":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
for (const numberButton of numberButton) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButton) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButtons.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButtons.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
