const inputField = document.querySelector(".inputField");
const numButtons = document.querySelectorAll(".num");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const operateButton = document.querySelector(".operate");
const toggleButton = document.querySelector(".toggleSign");
let num1 = null;
let num2 = null;
let result = null;
let currentOperator = "";
let operatorChain = 0;

numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (inputField.textContent.length < 9)
        {
            if (!parseInt(inputField.textContent) || parseFloat(inputField.textContent) === result){inputField.textContent = ""}
            inputField.textContent += button.textContent;
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
    result = null;
    operatorButtons.forEach(button => button.style.filter = "brightness(1)");
};

operateButton.onclick = operate;
toggleButton.onclick = () => {
    inputField.textContent *= -1;
    if (result != null)
    {
        result *= -1;
    }
};

function operatorButton()
{
    if (operatorChain === 1)
    {
        operate();
        num2 = null;
    }
    currentOperator = this.textContent;
    this.style.filter = "brightness(1.4)";
    num1 = parseFloat(inputField.textContent);
    if (inputField.textContent.includes("%"))
    {
        num1 *= 0.01;
    }
    inputField.textContent = result;
    operatorChain++;
}

function operate()
{
    if (num1 !== null)
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
                inputField.textContent = result;
                break;
            case "–":
                result = num1 - num2;
                inputField.textContent = result;
                break;
            case "×":
                result = num1 * num2;
                inputField.textContent = result;
                break;
            case "÷":
                result = num1/num2;
                inputField.textContent = result;
                break;
        }
        operatorChain = 0;
    }
}