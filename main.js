function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operator(op,num1, num2){
    if (op == "+"){
        result = add(num1, num2);
    }
    if (op == "-"){
        result = subtract(num1, num2);
    }
    if (op == "x"){
        result = multiply(num1, num2);
    }
    if (op == "/"){
        result = divide(num1, num2);
    }
    return result;
}

function solve(){

    //solves equation 
    do{
        let num1 = numbers[0];
        let num2 = numbers[1]; 
        let op = operators[0];
        let outNum = operator(op, num1, num2);
        numbers.shift();
        numbers[0] = String(outNum);
        operators.shift();
    }while(operators.length > 0);
    currentNum == "";
    return numbers;
}


function isInt(str){
    //Checks if a string can be an int i.e if '7' can be 7 not 'a' can be int.
    let check = parseInt(str);
    if (isNaN(check)){
        return false;
    }else{
        return true;
    }
}


let numbers = [];
let operators = [];
const outScreen = document.querySelector("#outScreen");
const buttonContainer = Array.from(document.querySelector("#buttonContainer").children);
let currentNum = "";

//Iterate over buttons and create onclick events to display and log the button press
buttonContainer.forEach(button => {
    let id = button.id;
    if (isInt(id)){
        // Creates button logic for numerical buttons
        button.onclick = function(){
            outScreen.innerHTML += id;
        }
    }
    if (id == "delete"){
        //Deletes last character 
        button.onclick = function(){
            outScreen.innerHTML = (outScreen.innerHTML).slice(0,-1);
        }
    }
    if (id =="decimal"){
        button.onclick = function(){
            outScreen.innerHTML += ".";
        }
    }
    if (id == "reset"){
        button.onclick = function(){
            outScreen.innerHTML = "";
        }
    }
    if (id == "division"||
        id == "multiplication" ||
        id == "addition" ||
        id == "subtraction"){
            button.onclick = function(){
                outScreen.innerHTML += button.innerHTML;
            }
        }
});
