const toDoList = [];

const body = document.querySelector('body');
const formAddTask = document.querySelector('form.addTask');
const ul = document.querySelector('ul');
const input = document.querySelector('.addTask input');
const numberTasks = document.querySelector('h2 span');
const listItems = document.getElementsByClassName('task');
const formSearch = document.querySelector('form.search');
const searchInput = document.querySelector('.search input');
const clearBtn = document.querySelector('.clear');
const dateH1 = document.querySelector('.actualDate');
const dayH3 = document.querySelector('.actualDay');


const d = new Date();
const day = d.getDate().toString();

const weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December']

dateH1.textContent = `${weekday[d.getDay() - 1]}, ${day}th`
dayH3.textContent = months[d.getMonth()];


const renderList = () => {
    ul.textContent = "";
    toDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        ul.appendChild(toDoElement);
    })
    if (toDoList.length !== 0) {
        document.querySelector('.panel .emptyList').style.opacity = '0';
    }
    else {
        document.querySelector('.panel .emptyList').style.opacity = '1';
    }
}

const editTask = (e) => {
    e.target.classList.toggle('active');
    const input = e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling;
    input.disabled = false;
    input.select();
    input.focus();
    input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            e.target.classList.toggle('active');
            input.disabled = true;
            toDoList[e.target.parentNode.dataset.key] = input.value;
        }
    })
}

const removeTask = (e) => {
    searchInput.value = '';
    const li = e.target.parentNode.parentNode;
    li.classList.remove('show');
    setTimeout(function () {
        li.remove();
        const index = li.dataset.key;
        toDoList.splice(index, 1);
        renderList();
        numberTasks.textContent = listItems.length;
    }, 500)

}

const addTask = (e) => {
    e.preventDefault();
    searchInput.value = '';
    const titleTask = input.value;
    input.value = '';
    if (titleTask === '') return;
    if (document.querySelector('.panel').clientHeight > 0.7 * window.clientHeight) {
        alert('No more tasks can be added!\n' +
            'Delete previous in order to add a new one!');
        return;
    }
    const task = document.createElement('li');
    const time = new Date();
    const hour = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()).toString();
    const minute = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()).toString();
    task.className = 'task';
    task.innerHTML = `<i class="fas fa-check"></i> <input class="titleTask" spellcheck="false" value="${titleTask}" disabled><span class="hour">${hour}:${minute}</span> <button class="edit"><i class="fas fa-edit"></i></button> <button class="delete"><i class="fas fa-times"></i></button>`;
    toDoList.push(task);
    renderList();
    ul.appendChild(task)
    setTimeout(function () {
        task.classList.add('show');
    }, 500);

    numberTasks.textContent = listItems.length;
    task.querySelector('.delete').addEventListener('click', removeTask);
    task.querySelector('.edit').addEventListener('click', editTask);
    task.querySelector('i').addEventListener('click', checkTask);
    document.querySelector('.addTask button i').classList.add('fa-redo-alt');
    document.querySelector('.addTask button i').classList.add('active');
    setTimeout(function () {
        document.querySelector('.addTask button').style.opacity = '0'
    }, 490);

    setTimeout(function () {
        document.querySelector('.addTask button i').classList.remove('fa-redo-alt');
        document.querySelector('.addTask button i').classList.remove('active');
    }, 700);
}

const checkTask = (e) => {
    e.target.parentNode.querySelector('i').classList.toggle("fa-check-double")
    e.target.parentNode.querySelector('i').classList.toggle("grayText");
    e.target.parentNode.querySelector('.titleTask').classList.toggle("checked");
}

const searchTask = (e) => {
    e.preventDefault();
    for (let i=0; i<ul.children.length; i++) {
        ul.children[i].classList.remove('show');
    }
    const searchText = e.target.value.toLowerCase();
    let tasks = [...toDoList];
    setTimeout(function () {
        tasks = tasks.filter(li => li.firstChild.nextSibling.nextSibling.value.toLowerCase().includes(searchText));
        numberTasks.textContent = tasks.length;
        ul.textContent = '';
        tasks.forEach(task => ul.appendChild(task).classList.add('show'));
    }, 300);
}

const clearTasks = () => {
    for (let i=0; i<ul.children.length; i++) {
        ul.children[i].classList.remove('show');
    }
    setTimeout(function () {
        toDoList.length = 0;
        renderList();
        numberTasks.textContent = '0';
    }, 500)
}

const displayButton = (e) => {
    if (e.target.value) {
        document.querySelector('.addTask button').style.opacity = '1';
    }
}


formAddTask.addEventListener('input', displayButton);
formAddTask.addEventListener('submit', addTask);
formSearch.addEventListener('input', searchTask)
clearBtn.addEventListener('click', clearTasks);


