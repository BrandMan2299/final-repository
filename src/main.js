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
    //Bonus-adding checked option
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
}

function sqlDate(){//converting from js date to SQL date
    const d = new Date();
    const dateArr = [d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    for(let i = 0; i < dateArr.length; i++){
        if(dateArr[i] < 10){
            dateArr[i] = "0" + dateArr[i];
        }
    }
    return `${d.getFullYear()}-${dateArr[0]}-${dateArr[1]} ${dateArr[2]}:${dateArr[3]}:${dateArr[4]}`;
}

function sorting(){//sorting the list by priority
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

const addButton=document.querySelector("#addButton");
addButton.addEventListener("click", adding);
const sortButton=document.querySelector("#sortButton");
sortButton.addEventListener("click", sorting);