const toggleTheme = document.querySelector("#ball");
const container = document.querySelector(".container");
const screen = document.querySelector(".screen");
const keypad = document.querySelector(".keypad");
const allKeys = document.querySelectorAll(".keypad > button");
// const upperCon = document.querySelector(".upper-con");

const button = document.querySelector(".button");
const numKeys = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operator");

const inputValue = document.querySelector(".screen > h4");
const currentValue = document.querySelector("#currentValue");
const operatorSign = document.querySelector("#sign");
const secondValue = document.querySelector("#secondValue");
const equalCon = document.querySelector(".equalSign");
let selectedOperation = "";

let dotBtn = document.getElementById("dot");
let deleteBtn = document.getElementById("delete");
let num = 1;

// theme changer
button.addEventListener("click", () => {
  num++;
  switch (num) {
    case 1:
      // remove
      toggleTheme.classList.remove("theme-3");
      toggleTheme.classList.remove("theme-3");
      toggleTheme.classList.remove("ball-theme3");
      container.classList.remove("theme-3-container");
      screen.classList.remove("theme-3-screen");
      keypad.classList.remove("theme-3-keypad");
      button.classList.remove("button-theme3");
      allKeys.forEach((keys) => {
        if (keys.id === "reset" || keys.id === "delete") {
          keys.classList.remove("reset-delete-theme3");
          keys.classList.remove("hover-reset-delete-theme3");
        } else if (keys.id === "equal") {
          keys.classList.remove("equal-theme3");
          keys.classList.remove("hover-equal-theme3");
        } else {
          keys.classList.remove("theme-3-allKeys");
          keys.classList.remove("hover-theme3-btn");
        }
      });
      // add
      toggleTheme.classList.add("theme-1");
      break;
    case 2:
      // remove
      toggleTheme.classList.remove("theme-1");
      toggleTheme.classList.add("theme-2");
      // add
      container.classList.add("theme-2-container");
      screen.classList.add("theme-2-screen");
      keypad.classList.add("theme-2-keypad");
      button.classList.add("button-theme2");
      allKeys.forEach((keys) => {
        if (keys.id === "reset" || keys.id === "delete") {
          keys.classList.add("reset-delete-theme2");
          keys.classList.add("hover-reset-delete-theme2");
          keys.classList.remove("hover-reset-delete-theme3");
        } else if (keys.id === "equal") {
          keys.classList.add("equal-theme2");
          keys.classList.add("hover-equal-theme2");
        } else {
          keys.classList.add("theme-2-allKeys");
          keys.classList.add("hover-theme2-btn");
        }
      });

      break;
    case 3:
      // remove
      toggleTheme.classList.remove("theme-2");
      container.classList.remove("theme-2-container");
      screen.classList.remove("theme-2-screen");
      keypad.classList.remove("theme-2-keypad");
      button.classList.remove("button-theme2");
      // add
      toggleTheme.classList.add("theme-3");
      toggleTheme.classList.add("ball-theme3");
      container.classList.add("theme-3-container");
      screen.classList.add("theme-3-screen");
      keypad.classList.add("theme-3-keypad");
      button.classList.add("button-theme3");
      allKeys.forEach((keys) => {
        if (keys.id === "reset" || keys.id === "delete") {
          keys.classList.remove("reset-delete-theme2");
          keys.classList.remove("hover-reset-delete-theme2");
          keys.classList.add("reset-delete-theme3");
          keys.classList.add("hover-reset-delete-theme3");
        } else if (keys.id === "equal") {
          keys.classList.remove("equal-theme2");
          keys.classList.remove("hover-equal-theme2");
          keys.classList.add("equal-theme3");
          keys.classList.add("hover-equal-theme3");
        } else {
          keys.classList.remove("theme-2-allKeys");
          keys.classList.remove("hover-theme2-btn");
          keys.classList.add("theme-3-allKeys");
          keys.classList.add("hover-theme3-btn");
        }
      });
      num = 0;
      break;
  }
});
let ctr = 0;

const numList = [];
let total = null;
let pastOperation = null;
// keys event
allKeys.forEach((keys) =>
  keys.addEventListener("click", (e) => {
    switch (e.currentTarget.className) {
      case "numbers":
        // limit
        console.log("testing");
        if (inputValue.textContent.length === 10) {
          numKeys.forEach((numberKeys) => (numberKeys.disabled = true));
        }
        operators.forEach((operands) => operands.classList.remove("isAlive"));
        if (currentValue.textContent !== "" && inputValue.textContent !== "") {
          while (ctr < 1) {
            if (inputValue.textContent === ".") {
              ctr++;
            } else {
              inputValue.textContent = "";
              ctr++;
            }
          }
        }
        // dot
        if (!inputValue.textContent.includes(".")) {
          dotBtn.disabled = false;
        } else {
          dotBtn.disabled = true;
        }
        // inputs
        if (inputValue.textContent === "0") {
          inputValue.textContent = e.currentTarget.textContent;
        } else {
          inputValue.textContent += e.currentTarget.textContent;
        }
        deleteBtn.disabled = false;
        break;
      case "operator":
        // // re-enable
        numKeys.forEach((numberKeys) => (numberKeys.disabled = false));
        console.log(inputValue.textContent.length);
        ctr = 0;
        // tells when to remove all numbers in array
        if (
          operatorSign.textContent !== e.currentTarget.textContent &&
          e.currentTarget.id !== "equal"
        ) {
          numList.length = 0;
        }
        // branch out equal sign to others
        if (e.currentTarget.id !== "equal") {
          operatorSign.classList.add("show");
          operatorSign.textContent = e.currentTarget.textContent;
        } else {
          equalCon.classList.add("show");
        }
        currentValue.classList.add("show");
        selectedOperation = e.currentTarget.id;
        currentValue.textContent = inputValue.textContent;
        // pre calculation pushing numbers in numlist
        if (numList.length === 0 && selectedOperation !== "equal") {
          numList.push(parseFloat(currentValue.textContent));
          switch (selectedOperation) {
            case "plus":
              pastOperation = "plus";
              break;
            case "minus":
              pastOperation = "minus";
              break;
            case "multiply":
              pastOperation = "multiply";
              break;
            case "divide":
              pastOperation = "divide";
              break;
          }
        }
        // calculation process
        else if (numList.length > 0) {
          if (
            e.currentTarget.className === "operator" &&
            e.currentTarget.id !== "equal"
          ) {
            numList.push(parseFloat(inputValue.textContent));
            performCalculation(selectedOperation);
          } else if (selectedOperation === "equal" && pastOperation !== null) {
            numList.push(parseFloat(inputValue.textContent));
            performCalculation(pastOperation);
            pastOperation = null;
          }
        }
        console.log(numList);
        break;
      case "others":
        if (e.currentTarget.id === "reset") {
          numKeys.forEach((numberKeys) => (numberKeys.disabled = false));
          numList.length = 0;
          inputValue.textContent = 0;
          currentValue.classList.remove("show");
          operatorSign.classList.remove("show");
          secondValue.classList.remove("show");
          equalCon.classList.remove("show");
          pastOperation = null;
          total = null;
        } else if (e.currentTarget.id === "dot") {
          if (!inputValue.textContent.includes(".")) {
            inputValue.textContent += e.currentTarget.textContent;
            // e.currentTarget.disabled = true;
            dotBtn.disabled = true;
          } else if (
            inputValue.textContent !== "" &&
            currentValue.textContent !== ""
          ) {
            inputValue.textContent = "";
          }
        }
        if (e.currentTarget.id === "delete") {
          inputValue.textContent = inputValue.textContent.slice(0, -1);
          numList.splice(numList.length - 1, 1);
          console.log(numList);
        }
        break;
    }
  })
);

// allow only one click per operation and open again if  number clicked
let count = 0;
let previous;
operators.forEach((operands) => {
  operands.addEventListener("click", (e) => {
    if (count === 1) {
      previous.classList.remove("isAlive");
      count = 0;
    }
    e.currentTarget.classList.toggle("isAlive");
    previous = e.currentTarget;
    count++;
  });
  if (currentValue.textContent === "") {
    operands.classList.add("isAlive");
  } else {
    operands.classList.remove("isAlive");
  }
});
let processTotal;
let operatorCtr = 0;
// function for operation
function performCalculation(condition) {
  switch (condition) {
    case "plus":
      // add conditional here maybe a counter can help you
      total = numList.reduce((all, current) => all + current);
      processTotal = checkDecimalLength(total);
      inputValue.textContent = processTotal;
      if (operatorCtr === 0) {
        currentValue.textContent = numList[numList.length - 2];
      } else {
        currentValue.textContent = total - numList[numList.length - 1];
      }
      secondValue.classList.add("show");
      secondValue.textContent = numList[numList.length - 1];
      operatorCtr++;
      break;
    case "minus":
      total = numList.reduce((all, current) => all - current);
      processTotal = checkDecimalLength(total);
      inputValue.textContent = processTotal;
      if (operatorCtr === 0) {
        currentValue.textContent = numList[numList.length - 2];
      } else {
        currentValue.textContent = total + numList[numList.length - 1];
      }
      secondValue.classList.add("show");
      secondValue.textContent = numList[numList.length - 1];
      operatorCtr++;
      break;
    case "multiply":
      total = numList.reduce((all, current) => all * current);
      processTotal = checkDecimalLength(total);
      inputValue.textContent = processTotal;
      if (operatorCtr === 0) {
        currentValue.textContent = numList[numList.length - 2];
      } else {
        currentValue.textContent = total / numList[numList.length - 1];
      }
      secondValue.classList.add("show");
      secondValue.textContent = numList[numList.length - 1];
      operatorCtr++;
      break;
    case "divide":
      if (numList[1] !== 0) {
        total = numList.reduce((all, current) => all / current);
        processTotal = checkDecimalLength(total);
        processTotal = checkDecimalLength(total);
        inputValue.textContent = processTotal;
        if (operatorCtr === 0) {
          currentValue.textContent = numList[numList.length - 2];
        } else {
          currentValue.textContent = total * numList[numList.length - 1];
        }
        secondValue.classList.add("show");
        secondValue.textContent = numList[numList.length - 1];
        operatorCtr++;
      } else {
        inputValue.textContent = "ERROR";
        numList.length = 0;
      }
      break;
  }
}
// checks decimal length
function checkDecimalLength(val) {
  let x = val.toString();
  if (x.includes(".") && x.split(".")[1].length > 2) {
    return val.toFixed(2);
  } else {
    return val;
  }
}
