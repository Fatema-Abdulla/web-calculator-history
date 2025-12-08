///// Global variable
let calculationNumber = []
let clickedItem = []
let currentNumber = ""
let stringResult = ""
let result = 0
let checkIsProcess = false

let screenResult = document.querySelector(".result")
let clearButton = document.querySelector(".clear-result")
let number = document.querySelector(".button-number")

const itemCalculator = [
  1,
  2,
  3,
  "÷",
  4,
  5,
  6,
  "×",
  7,
  8,
  9,
  "-",
  0,
  ".",
  "=",
  "+",
]

const operators = ["+", "-", "×", "÷"]

// display the number in array
for (let i = 0; i < itemCalculator.length; i++) {
  const allNumber = document.createElement("span")
  allNumber.setAttribute("class", "numbers")
  allNumber.setAttribute("id", `n${i}`)
  allNumber.innerText = itemCalculator[i]
  number.appendChild(allNumber)
}

let calculator = document.querySelectorAll(".numbers")
let equalButton = document.querySelector("#n14")

///// Function

const clickButton = (index) => {
  let indexNumber = calculator[index].innerText
  let lastItem = clickedItem[clickedItem.length - 1]

  const specificNumber = document.createElement("span")
  specificNumber.setAttribute("class", "number-calculator")
  specificNumber.setAttribute("id", `${index}`)

  if (operators.includes(indexNumber) && operators.includes(lastItem)) {
    return
  } else if (
    clickedItem.length === 0 &&
    operators.includes(indexNumber) &&
    checkIsProcess === false &&
    calculationNumber.length === 0
  ) {
    clickedItem.push(0)
    calculationNumber.push(0)
    specificNumber.innerText = 0 + indexNumber
  } else if (indexNumber === "." && currentNumber.includes(".")) {
    return
  } else {
    specificNumber.innerText = indexNumber
  }
  clickedItem.push(indexNumber)

  if (checkIsProcess === true && currentNumber === "") {
    stringResult = result.toString()
  }

  if (!isNaN(indexNumber)) {
    currentNumber += indexNumber
    stringResult = ""
    checkIsProcess = false
  } else if (indexNumber === ".") {
    if (stringResult.includes(".")) {
        return
      }
    else if (!currentNumber.includes(".")) {
      if (currentNumber === "") {
        if (checkIsProcess === false) {
          currentNumber = "0."
          specificNumber.innerText = 0 + indexNumber
        }
      } else {
        currentNumber += "."
        specificNumber.innerText = "."
      }
    }
  } else {
    if (currentNumber !== "") {
      calculationNumber.push(parseFloat(currentNumber))
      currentNumber = ""
    }
    calculationNumber.push(indexNumber)
  }
  screenResult.appendChild(specificNumber)
}

const finalResult = () => {
  screenResult.innerHTML = ""
  let itemBeforeEqual = clickedItem[clickedItem.length - 2]
  const operator = calculationNumber.find((item) => operators.includes(item))

  // reference: https://stackoverflow.com/questions/69816276/javascript-arrays-filter-by-type
  const onlyNumbers = calculationNumber.filter((num) => typeof num === "number")

  const showResult = document.createElement("span")
  showResult.setAttribute("class", "solve")
  screenResult.appendChild(showResult)

  if (
    !operator ||
    onlyNumbers.length === 0 ||
    itemBeforeEqual === "." ||
    operators.includes(itemBeforeEqual)
  ) {
    showResult.innerText = "Syntax Error"
    return
  }

  result = onlyNumbers[0]
  for (let i = 1; i < onlyNumbers.length; i++) {
    const num = onlyNumbers[i]

    switch (operator) {
      case "+":
        result += num
        break

      case "-":
        result -= num
        break

      case "×":
        result *= num
        break

      case "÷":
        result /= num
        break
    }
  }

  showResult.innerText = result
  calculationNumber = [result]
  clickedItem = []
  currentNumber = ""
  stringResult  = ""
  checkIsProcess = true
}

const clearNumber = () => {
  screenResult.innerHTML = ""
  currentNumber = ""
  stringResult  = ""
  calculationNumber = []
  clickedItem = []
  result = 0
  checkIsProcess = false
}

///// Events
for (let i = 0; i < calculator.length; i++) {
  calculator[i].addEventListener("click", () => {
    clickButton(i)
  })
}

clearButton.addEventListener("click", clearNumber)
equalButton.addEventListener("click", finalResult)
