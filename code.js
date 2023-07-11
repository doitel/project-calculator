const theinput = document.querySelector("#theinput")
const numbtns = document.querySelectorAll(".nums > button")
const opbtns = document.querySelectorAll(".ops > button")

let operator = "";
let highlight = false;
let dotted = false;
let pastNum = 0;
let equal = document.querySelector("#equal")

for (numbtn of numbtns) {
    numbtn.addEventListener ("click",(event)=>{
        pressnum(event.currentTarget.value);
    })
}

for (opbtn of opbtns){
    opbtn.addEventListener ("click", (event) => {
        pressop(event.currentTarget)
    })
}

equal.addEventListener ("click",()=>{
    if(operator && !highlight) {
        let res = operate (pastNum,Number(theinput.textContent),operator)
        if(Number.isInteger(res)) dotted=false;
        else dotted=true;
        theinput.textContent = res;
        pastNum = 0;
    }
    for (opbtn of opbtns){ 
        opbtn.style.backgroundColor = "#4d4d4d"
    }
    operator = "";

})


function pressnum (value){
    if (highlight&&value!=="-"){
        pastNum = Number(theinput.textContent);
        theinput.textContent = "0";
    }

    if(value!=="-"){
        for (opbtn of opbtns){ 
            opbtn.style.backgroundColor = "#4d4d4d"
        }
        highlight=false;
    }   

    if(theinput.textContent==="ERROR") theinput.textContent = "0";
    if(theinput.textContent === "0"){
        if(value===".") theinput.textContent = theinput.textContent+value
        else if(value!=="-") theinput.textContent = value;
    } else {
        if(value==="."){
            if(!dotted) theinput.textContent = theinput.textContent+value
            dotted = true;
        } else if (value==="-"){
            if(theinput.textContent[0]==="-") theinput.textContent = theinput.textContent.substring(1);
            else theinput.textContent = "-"+theinput.textContent
        } else {
            theinput.textContent = theinput.textContent+value;
        }
    }
}

function pressop (target) {
    for (opbtn of opbtns){ 
        opbtn.style.backgroundColor = "#4d4d4d"
    }
    let value = target.value;
    if(theinput.textContent==="ERROR") theinput.textContent = "0";
    if(value === "cl") {
        dotted = false;
        theinput.textContent = "0"
        pastNum = 0;
        highlight = false;
        operator = "";
    } else if (value === "back"){
        if(theinput.textContent.slice(-1)===".") dotted=false;
        if(theinput.textContent[0]==="-"){
            if (theinput.textContent.length>2) theinput.textContent=theinput.textContent.substring(0,theinput.textContent.length-1)
            else theinput.textContent = "0"
        } else {
            theinput.textContent=theinput.textContent.substring(0,theinput.textContent.length-1);
            if(theinput.textContent==="") theinput.textContent="0";
        }
        highlight = false;
    } else if (value === "sqrt"){
        if(Number(theinput.textContent)<0) theinput.textContent = "ERROR";
        else{ 
            let res = Math.sqrt(Number(theinput.textContent));
            if (Number.isInteger(res)) dotted=false;
            else dotted=true
            theinput.textContent = res;
        }
        highlight = false;
    } else {
        if (operator && !highlight) {
            let res = operate (pastNum,Number(theinput.textContent),operator)
            if(Number.isInteger(res)) dotted=false;
            else dotted=true;
            theinput.textContent = res;
            pastNum = res;
        }
        target.style.backgroundColor="#000000";
        highlight=true;
        operator = value;
    }
}

function operate (a,b,operator) {
    if(operator==="mod") return a%b;
    if(operator==="minus") return a-b;
    if(operator==="div") return a/b;
    if(operator==="plus") return a+b;
    if(operator==="mult") return a*b;
}

