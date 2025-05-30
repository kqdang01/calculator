const inputField = document.querySelector(".inputField");
const numButtons = document.querySelectorAll(".num");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const operateButton = document.querySelector(".operate");
const toggleButton = document.querySelector(".toggleSign");

let num1 = null;
let num2 = null;
let result = "";
let currentOperator = "";
let operatorChain = 0;
let decimalPlaces = 9;
let e = 0;

numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!parseInt(inputField.textContent) 
        || parseFloat(inputField.textContent) === result 
        || inputField.textContent === result.toString()
        || result === "bruh")
        {
            inputField.textContent = "";
            result = "";
        }
        if (inputField.textContent.length < 9)
        {
            if (!(button.textContent === "." && inputField.textContent.includes("."))) inputField.textContent += button.textContent;
            operatorButtons.forEach(button => button.style.filter = "brightness(1)");
        }
    })
});

operatorButtons.forEach(button => {
    button.addEventListener("click", operatorButton)
});

clearButton.onclick = () => {
    inputField.textContent = "0";
    num1 = null;
    num2 = null;
    result = "";
    operatorChain = 0;
    operatorButtons.forEach(button => button.style.filter = "brightness(1)");
};

operateButton.onclick = operate;
toggleButton.onclick = () => {
    inputField.textContent *= -1;
    if (result != "") result *= -1;
    num1 = parseFloat(inputField.textContent);
};

function operatorButton()
{
    
    if (operatorChain === 1)
    {
        operate();
        num2 = null;
    }
    currentOperator = this.textContent;
    operatorButtons.forEach(button => button.style.filter = "brightness(1)");
    this.style.filter = "brightness(1.4)";
    if (inputField.textContent != "" && inputField.textContent !== "bruh") num1 = parseFloat(inputField.textContent);
    if (inputField.textContent.includes("%")) num1 *= 0.01;
    if (num1 != null && result === null && operatorChain) inputField.textContent = result;
    if (result === "") inputField.textContent = "";
    operatorChain++;
    if (operatorChain > 1) operatorChain = 1;
}

function operate()
{
    if (num1 !== null && inputField.textContent != "" && inputField.textContent !== "bruh")
    {
        num2 = parseFloat(inputField.textContent);
        if (inputField.textContent.includes("%"))
        {
            num2 *= 0.01;
        }
    }
    operatorButtons.forEach(button => button.style.filter = "brightness(1)");
    if (num1 !== null && num2 !== null)
    {
        switch(currentOperator)
        {
            case "+":
                result = num1 + num2;
                break;
            case "–":
                result = num1 - num2;
                break;
            case "×":
                result = num1 * num2;
                break;
            case "÷":
                result = num1/num2;
                if (num1 === 0 && num2 === 0) result = "bruh";
                break;
        }
        while (result.toString().length > 9)
        {
            while (result >= 1000000)
            {
                result = Math.floor(result/10);
                e+= 1;
            }
            result = Math.round(result * (10**decimalPlaces))/(10**decimalPlaces);
            decimalPlaces--;
        }
        if (e) result += `E${e}`;
        inputField.textContent = result;
        operatorChain = 0;
        e = 0;
        decimalPlaces = 9;
        num1 = null;
    }
}