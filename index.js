let input = document.getElementById("input")
input.value = "0"
let currentNum = ""
let previousNum = ""
let operator = ""
let answer
let recent = false

const light = document.getElementById("two")
light.addEventListener('click', () => {
    document.body.classList.add("light")
    document.body.classList.remove("darkColor")
})

const dark = document.getElementById("one")
dark.addEventListener('click', () => {
    document.body.classList.remove("light")
    document.body.classList.remove("darkColor")
})

const darkColor = document.getElementById("three")
darkColor.addEventListener('click', () => {
    document.body.classList.add("darkColor")
    document.body.classList.remove("light")
})

function addNum(num) {
    if (input.value === "0") {
        input.value = num
    } else if (recent === true) {
        deleteEverything()
        input.value = num
        recent = false
    } else {
        input.value += num
    }
    currentNum = input.value
}

function addComma() {
    if (input.value.includes('.')) {
        return
    } else if (recent === true) {
        input.value += '.'
        operator = ""
        recent = false
    } else {
        input.value += '.'
        recent = false
    }
}

function chooseOp(oper) {
    if (operator !== "") {
        result()
    }
    previousNum = input.value
    operator = oper
    input.value = "0"
    currentNum = ""
    recent = false
}

function result() {
    let firstNum = parseFloat(previousNum)
    let secondNum = parseFloat(currentNum)

    if (previousNum === "") {
        answer = currentNum
    }
    if (operator === "+") {
        answer = firstNum + secondNum
    } else if (operator === "-") {
        answer = firstNum - secondNum
    } else if (operator === "*") {
        answer = firstNum * secondNum
    } else if (operator === "/") {
        if (secondNum === 0) {
            answer = "Error"
            input.value = answer
            return
        }
        answer = firstNum / secondNum
    } else if (operator === "MOD") {
        answer = firstNum % secondNum
    }
    
    input.value = answer
    recent = true
}

function calcPercent() {
    let answer
    if (recent === true) {
        answer = input.value / 100
        input.value = answer
        operator = ""
        recent = false
    } else {
        answer = input.value / 100
        input.value = answer
    }
    currentNum = input.value
}

function deleteNum() {
    input.value = input.value.slice(0, -1)
    
    if (input.value === "") {
        input.value = "0"
    }
}

function deleteEverything() {
    input.value = "0"
    currentNum = ""
    previousNum = ""
    operator = ""
}

document.addEventListener("keydown", function(event) {
    const keys = event.key
    
    if (keys >= "0" && keys <= "9") {
        addNum(keys)
        return
    }

    if (keys === "+" || keys === "-" || keys === "*" || keys === "/") {
        chooseOp(keys)
        return
    }

    if (keys === "Backspace") {
        deleteNum()
        return
    }

    if (keys === "Escape") {
        deleteEverything()
        return
    }

    if (keys === "Enter") {
        result()
        return
    }

    if (keys === "%") {
        calcPercent()
        return
    }

    if (keys === "M" || keys === "m") {
        chooseOp("MOD")
        return
    }

    if (keys === ".") {
        addComma()
        return
    }
})