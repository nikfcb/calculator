let displayValue = "";
let displayNum = "";
let result = null;
let lastOperation = "";
let haveDot = false;

const history = document.querySelector("#history");
const input = document.querySelector("#input");

const operands = document.querySelectorAll(".operand");

operands.forEach((operand) => {
  operand.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    displayNum += e.target.innerText;
    input.textContent = displayNum;
    console.log(displayNum);
  });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!displayNum) return;
    haveDot = false;
    const operation = e.target.innerText;

    if (displayValue && displayNum && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(displayNum);
    }
    clear(operation);
    lastOperation = operation;
    console.log(result);
  });
});

function clear(name = "") {
  displayValue += displayNum + " " + name + " ";
  history.innerText = displayValue;
  input.innerText = "";
  displayNum = "";
}

function mathOperation() {
  if (lastOperation === "*") {
    result = parseFloat(result) * parseFloat(displayNum);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(displayNum);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(displayNum);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(displayNum);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(displayNum);
  }
}

const equal = document.querySelector(".equals");

equal.addEventListener("click", (e) => {
  if (!displayValue || !displayNum) return;
  haveDot = false;
  mathOperation();
  clear();
  input.innerText = result;
  displayNum = result;
  displayValue = "";
});

const clearIt = document.querySelector(".clear");

clearIt.addEventListener("click", (e) => {
  input.innerText = "";
  history.innerText = "";
  displayNum = "";
  displayValue = "";
  result = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
    // console.log(e.key)
  } else if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "/" ||
    e.key === "%" ||
    e.key === "*"
  ) {
    clickOperation(e.key);
  } else if (e.key === "Delete") {
    clickClear();
  }
  // console.log(e.key)
  else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});

function clickButtonEl(key) {
  operands.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operators.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equal.click();
}

function clickClear() {
  clearIt.click();
}
