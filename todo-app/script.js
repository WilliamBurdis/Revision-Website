// Initialize tasks array from localStorage or empty if none exists
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const counter = document.getElementById('counter');

// Initial render
renderTasks();

// --- Event Listeners ---

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// --- Functions ---

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    taskInput.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    // 1. Clear current list
    taskList.innerHTML = "";

    // 2. Build list items
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'task-completed' : ''}`;

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        
        taskList.appendChild(li);
    });

    // 3. Update Counter
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    counter.textContent = `Total: ${total} | Completed: ${completed}`;
}