
function applyOperation(op,num1, num2){
    if (op == "+"){
        return num1 + num2;
    }
    if (op == "-"){
        if (num1 === undefined){
            return -num2;
        }
        return num1 - num2;
    }
    if (op == "x"){
        return num1 * num2;
    }
    if (op == "/"){
        return num1 / num2;
    }
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

function precendence(op){
    if (op == "+" || op == "-"){
        return 1;
    }
    if (op == "x" || op == "/"){
        return 2;
    }
    return 0;
}

function solve(eq){
    //Create stack for integer values and operators
    let values = [];
    let ops = [];
    i = 0;

    while (i < eq.length){
        if (eq[i] == " "){
            i+= 1;
            continue;
        }
        // If the operator is an opening bracket push it to ops
        else if (eq[i] == "("){
            ops.push(eq[i]);
        }
        // If the the value is a number, push it to the stack of numbers
        else if (isInt(eq[i])){
            val = 0;

            while (i < eq.length && isInt(eq[i])){
                val = (val * 10) + parseInt(eq[i]);
                i+=1;
            }
            values.push(val);
            i-=1;
        }
        //If the operator is a closing bracket solve it
        else if (eq[i] == ")"){
            while (ops.length != 0 && ops[ops.length-1] != "("){
                let val2 = values.pop();
                let val1 = values.pop();
                let op = ops.pop();

                values.push(applyOperation(op, val1, val2));
            }
            ops.pop();
        }
        //If the value is one of the 4 operators solve precendence and push to operator stack
        else{
            while(ops.length != 0 && precendence(ops[ops.length-1]) >= precendence(eq[i])){
                let val2 = values.pop();
                let val1 = values.pop();
                let op = ops.pop();

                values.push(applyOperation(op, val1, val2));
            }
            ops.push(eq[i]);
        }
        i+=1;
    }
    //Solve equation
    while (ops.length != 0){
        let val2 = values.pop();
        let val1 = values.pop();
        let op = ops.pop();
        values.push(applyOperation(op,val1,val2));
    }
    //Return top of values as it is equal to result
    return values[values.length-1];
}


let equation = "";
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
            equation += id;
            
        }
    }
    if (id == "delete"){
        //Deletes last character 
        button.onclick = function(){
            outScreen.innerHTML = (outScreen.innerHTML).slice(0,-1);
            equation = equation.slice(0,-1);
        }
    }
    if (id =="decimal"){
        button.onclick = function(){
            outScreen.innerHTML += ".";
            equation += ".";
        }
    }
    if (id == "reset"){
        button.onclick = function(){
            outScreen.innerHTML = "";
            equation = "";
        }
    }
    if (id == "division"||
        id == "multiplication" ||
        id == "addition" ||
        id == "subtraction"){
            button.onclick = function(){
                outScreen.innerHTML += button.innerHTML;
                equation += button.innerHTML;
            }
        }
    if (id == "equals"){
        button.onclick = function(){
            equation = solve(equation);
            outScreen.innerHTML = equation;
        }
    }
    if (id == "plusMinus"){
        button.onclick = function(){
            if (isInt(equation)){
                let num = parseInt(equation);
                if (num < 0){
                    equation = equation.slice(1);
                }
            }
        }
    }
    if (id == "openingBracket" || id == "closingBracket"){
        button.onclick = function(){
            outScreen.innerHTML += button.innerHTML;
            equation += button.innerHTML;
        }
    }
});
