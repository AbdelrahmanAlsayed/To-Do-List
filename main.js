let lis = document.querySelectorAll("header ul li");

lis.forEach(function (li) {
    li.addEventListener("click", function(e) {
        window.localStorage.setItem("color", e.target.dataset.color);
        document.body.style.backgroundColor =  window.localStorage.getItem("color");
    })
});

//checking if there's a color in the localStorage and setting to the body
if (window.localStorage.getItem("color")) {
    document.body.style.backgroundColor =  window.localStorage.getItem("color");
};

document.querySelector("section").onclick = function () {

    if (document.querySelector(".first")) {

        document.querySelector(".first").remove();
        document.querySelector(".last").style.display = "flex";
    }
};

// <<----------------------------------------------------------------------------------->>

const taskInput  = document.querySelector(".input");
taskSubmit = document.querySelector(".add"),
taskBox = document.querySelector(".last .task-box"),
filters = document.querySelectorAll(".last .controls .filters span"),
clearAllButton = document.querySelector(".clear-btn");

let edited,
isEditedTask = false;

let todoS = JSON.parse(localStorage.getItem("todo-list"));

taskSubmit.addEventListener("click", function () {
    let userTask = taskInput.value.trim();
    if (taskInput.value != "" && userTask) { // i added userTask to make the input not spaces
    
        if (!isEditedTask) { 
        
            // If todoS isn't exist , pass an empty array to todoS
            if(!todoS) { 
                todoS = [];
            }
            let taskInfo = new Object({
                name : userTask,
                status : "pending"
            });
            todoS.push(taskInfo); 
        }
        else {
            todoS[edited].name = userTask;
            isEditedTask = false;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todoS));
        showTodoS("all");
    };
});

filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
        document.querySelector(".filters .active").classList.remove("active");
        btn.classList.add("active");
        showTodoS(btn.id);
    });
});

function showTodoS (filter) {
    let div = "";
    if(todoS) {
        todoS.forEach(function (todo, id) {
            //if todo status is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                div +=
                `<div class="tasks">
                    <div class="div11">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} >
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                    </div>
                    <div class="div22">
                        <i  onclick="editTask(${id},'${todo.name}')"class="fa-solid fa-file-pen edit"></i>
                        <i onclick="deleteTask(this)" class="fa-solid fa-trash-can delete"></i>
                    </div>
                </div>`;
            }
        });
    }
    // if the div is empty, insert this value inside taskBox else insert span
    taskBox.innerHTML = div || `<span>You don't have any tasks here.</span>`;
};

showTodoS("all");

function updateStatus(selectedTask) {
    // getting the paragraph that contains the task name
    let taskName = selectedTask.parentElement.lastElementChild; 
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todoS[selectedTask.id].status = "completed";
    }
    else {
        taskName.classList.remove("checked");
        todoS[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todoS));
};

function editTask(taskId, taskName) {
    edited = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
    taskInput.focus();
};

function deleteTask(selectedTask) {
    //removing selected task from array/todoS
    todoS.splice(selectedTask, 1)
    localStorage.setItem("todo-list", JSON.stringify(todoS));
    showTodoS("all");
};

clearAllButton.addEventListener("click", function () {
    if (taskBox.children.length > 1 && taskBox.lastElementChild != "span") {
        if (confirm("Are you sure you wanna delete all tasks ? ")) {
            // //removing all items from array/todoS
            todoS.splice(0 , todoS.length )
            localStorage.setItem("todo-list", JSON.stringify(todoS));
            showTodoS("all");
        }
    }
});

