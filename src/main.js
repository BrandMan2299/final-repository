function adding(){
    const list=document.querySelector("ul");
    const prioritySelection=document.querySelector("#prioritySelector");
    const input=document.querySelector("#textInput");
    const listItem=document.createElement("li");
    const container=document.createElement("div");
    const priority=document.createElement("span");
    const time=document.createElement("span");
    const text=document.createElement("span");
    container.className="todoContainer";
    priority.className="todoPriority";
    time.className="todoCreatedAt";
    text.className="todoText";
    priority.innerHTML=prioritySelection.value;
    time.innerHTML=sqlDate();
    text.innerHTML=input.value;
    input.value="";
    container.appendChild(priority);
    container.appendChild(time);
    container.appendChild(text);
    listItem.appendChild(container);
    list.appendChild(listItem);
    const counter=document.querySelector("#counter");
    counter.innerHTML=list.childElementCount;
}

function sqlDate(){//converting from js date to SQL date
    const d=new Date();
    const dateArr=[d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    for(let i = 0; i < dateArr.length; i++){
        if(dateArr[i]<10){
            dateArr[i]="0"+dateArr[i];
        }
    }
    return `${d.getFullYear()}-${dateArr[0]}-${dateArr[1]} ${dateArr[2]}:${dateArr[3]}:${dateArr[4]}`;
}

function sorting(){
    const list=document.querySelector("ul");
    const items=list.children;
    for(let i = 5; i > 0 ; i--){
        for (const listItem of items) {
            if(listItem.querySelector(".todoPriority").innerHTML ===  i.toString()){
                list.insertBefore(listItem, list.firstChild);
            }
        }
    }
}

const addButton=document.querySelector("#addButton");
addButton.addEventListener("click", adding);
const sortButton=document.querySelector("#sort");
sortButton.addEventListener("click", sorting);