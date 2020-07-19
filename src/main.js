function adding(){
    const list=document.querySelector("ul");
    const prioritySelection=querySelector("#prioritySelector");
    const input=document.querySelector("#textInput");
    const listItem=document.createElement("li");
    const container=document.createElement("div");
    const priority=document.createElement("span");
    const time=document.createElement("time");
    const text=document.createElement("p");
    container.className="todoContainer";
    priority.className="todoPriority";
    time.className="todoCreatedAt";
    text.className="todoText";
    priority.innerHTML=prioritySelection.value;
    time.innerHTML=sqlDate();
    text.innerHTML=input.value;
}