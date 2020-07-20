function adding(){
    //Setup and creation of elements for the function 
    
    const prioritySelection = document.querySelector("#prioritySelector");
    const list = document.querySelector("ul");
    const input = document.querySelector("#textInput");
    const listItem = document.createElement("li");
    const container = document.createElement("div");
    const priority = document.createElement("span");
    const time = document.createElement("span");
    const text = document.createElement("span");
    container.className = "todoContainer";
    priority.className = "todoPriority";
    time.className = "todoCreatedAt";
    text.className = "todoText";
    
    //Bonus-only enter non-empty task (you can delete it if it's bothering)
    
    if(input.value===""){
        alert("What did I want to do?");
        input.focus();
        return;
    }
    
    //Bonus-adding checked option (I used button insted of check box for CSS reasons)
    
    const checkButton = document.createElement("button");
    checkButton.className = "checkButton";
    checkButton.onclick = checked;
    container.appendChild(checkButton);
    
    //Inserting the desired content in to the item and adding it to the list
    
    priority.innerHTML = prioritySelection.value;
    time.innerHTML = sqlDate();
    text.innerHTML = input.value;
    input.value = "";
    container.appendChild(priority);
    container.appendChild(time);
    container.appendChild(text);
    listItem.appendChild(container);
    list.appendChild(listItem);
    
    //updating the counter
    
    const counter = document.querySelector("#counter");
    counter.innerHTML = list.childElementCount;
    input.focus();
}

//converting from js date to SQL date

function sqlDate(){
    const d = new Date();
    const dateArr = [d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    for(let i = 0; i < dateArr.length; i++){
        if(dateArr[i] < 10){
            dateArr[i] = "0" + dateArr[i];
        }
    }
    return `${d.getFullYear()}-${dateArr[0]}-${dateArr[1]} ${dateArr[2]}:${dateArr[3]}:${dateArr[4]}`;
}

//sorting the list by priority

function sorting(){
    const list = document.querySelector("ul");
    const items = list.children;
    for(let i = 1; i < 6 ; i++){
        for (const listItem of items) {
            if(listItem.querySelector(".todoPriority").innerHTML ===  i.toString()){
                list.insertBefore(listItem, list.firstChild);
            }
        }
    }
}

//Bonus- changing the checked atributte and text

function checked(){
    const check = event.target;
    if(check.checked){
        check.checked = false;
        check.innerHTML = "";
    }
    else{
        check.checked = true;
        check.innerHTML = "✔";
    }
}

//Bonus- deleting all finshed tasks

function deleting(){
    const finshed = document.querySelectorAll(".checkButton");
    let boolean = true;
    finshed.forEach( checkButton => {
        if(checkButton.checked)
        {
            if(!confirm("Are you sure you finshed these tasks?") && boolean === true)
            {
                return;//Asking *once* if you want to delete
            }
            const li=checkButton.parentElement.parentElement;
            history.push(li);
            li.remove();
            boolean = false;
        }        
    });
    const counter = document.querySelector("#counter");
    const list = document.querySelector("ul");
    counter.innerHTML = list.childElementCount;
}

//Bonus-undoing deletion one by one

function undo(){
    const list = document.querySelector("ul");
    list.appendChild(history.pop());
}

//Bonus- search tasks

function search(){
    const tasks = document.querySelectorAll(".todoText");
    const list = document.querySelector("ul");
    const search = event.target.value;
    let boolean = false;
    const reg = new RegExp(search,"ig");
    tasks.forEach(text => {
        if(reg.test(text.innerHTML))
        {
            list.insertBefore(text.parentElement.parentElement,list.firstChild);
            boolean = true;
        }
    });
    if(!boolean && search !=="" && list.childElementCount !== 0){
        alert("No such task")
    }
}

//Global scope

const addButton=document.querySelector("#addButton");
addButton.addEventListener("click", adding);
const sortButton=document.querySelector("#sortButton");
sortButton.addEventListener("click", sorting);
const deleteButton=document.querySelector("#deleteButton");
deleteButton.addEventListener("click", deleting);
const undoButton=document.querySelector("#undoButton");
undoButton.addEventListener("click", undo);
const searchInput=document.querySelector("#searchInput");
searchInput.addEventListener("keyup", search);

const history=[];

const textInput=document.querySelector("#textInput");
textInput.focus();

//Bonus- adding task on Enter press

textInput.addEventListener("keypress", () => {
    if(event.key === "Enter"){
        adding();
    }
});