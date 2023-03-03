// Search element
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
// 3 кнопки all Active Completed
const allBut = document.querySelector('#all');
const activeBut = document.querySelector('#noComplite');
const completedBut = document.querySelector('#complite');




let tasks = [];

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach( (task) => renderTask(task));
}



checkEmptyList();


// Показываю все элементы
allBut.addEventListener('click', ()=> {
    const deLi = document.querySelectorAll('li');
    deLi.forEach((item)=> {
        item.remove()
    })
    if (localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.forEach( (task) => renderTask(task))}
})

// Показываю Active элементы
activeBut.addEventListener('click', ()=> {
    const deLi = document.querySelectorAll('li');
    deLi.forEach((item)=> {
        item.remove()
    })
    if (localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.forEach( (task) => {
            if (task.done === false){
                renderTask(task)
            }
    }
)}
})

// Показываю выполненые элементы
completedBut.addEventListener('click', ()=> {
    const deLi = document.querySelectorAll('li');
    deLi.forEach((item)=> {
        item.remove()
    })
    if (localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.forEach( (task) => {
            if (task.done === true){
                renderTask(task)
            }
    }
)}
})


// if (localStorage.getItem('tasksHTML')){
//     taskList.innerHTML = localStorage.getItem('tasksHTML');
// }

//AddTask
form.addEventListener('submit', addTask);
//DeleteTask
taskList.addEventListener('click', deleteTask);
//Mark a task as completed
taskList.addEventListener('click', doneTask);





function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;

    // Description of the task in the form of an object
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    // Add task in array "tasks"
    tasks.push(newTask)

    // Формируем css класс
    renderTask(newTask)

    // Clear Input and return focus
    taskInput.value = '';
    taskInput.focus();

    // Убираем надпись "Список дел пуст"

    checkEmptyList()
    saveToLocalStorage()
    // saveHTMLtoLS();
}
function deleteTask(event){ // css pointer-event: none
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');

    const id = +parentNode.id;

   const index = tasks.findIndex(function (task) {
        return task.id === id
    });


    // Удаляем из массива
    tasks.splice(index, 1);

    // Удаляем из разметки
    parentNode.remove();

    checkEmptyList()

    saveToLocalStorage()
    // saveHTMLtoLS();
}
function doneTask(event){
    if (event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('.list-group-item');

    //Опред id
    const id = +parentNode.id;

    const task = tasks.find(function (task) {
        if (task.id === id) {
            return true
        }
    })

    task.done = !task.done;


    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    // saveHTMLtoLS();
    saveToLocalStorage()
}

// function saveHTMLtoLS(){
//     localStorage.setItem('tasksHTML', taskList.innerHTML);
// }

function checkEmptyList() {
    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
<div class="empty-list__title">Список дел пуст</div>
</li>`;

        taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}


function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task){
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const taskHTML = `
<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
<span class="${cssClass}">${task.text}</span>
<div class="task-item__buttons">
<button type="button" data-action="done" class="btn-action">
<img src="./img/tick.svg" alt="Done" width="18" height="18">
</button>
<button type="button" data-action="delete" class="btn-action">
<img src="./img/cross.svg" alt="Done" width="18" height="18">
</button>
</div>
</li>
`;

    taskList.insertAdjacentHTML('beforeend', taskHTML);
}