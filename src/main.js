window.addEventListener('load', () => {
    init();
});

function init() {
    const taskList = new TaskList();
    taskList.addTask();

    const btnAdd = document.querySelector('.btn-add');
    btnAdd.addEventListener('click', () => {
        taskList.addTask();
    });

    const btnSort = document.querySelector('.btn-sort');
    btnSort.addEventListener('click', () => {
        btnSort.classList.toggle('down');
        btnSort.classList.toggle('up');
        taskList.sortTask(
            btnSort.classList.contains('down') ? 'down' : 'up'
        );
    });
}

class TaskList {
    constructor() {
        this.taskList = [];
        this.container = document.querySelector('.task-list-cont');
    }
    addTask() {
        const task = new Task(
            task => this.deleteTask(task)
        );
        this.taskList.push(task);
        this.container.append(task.container);
    }
    deleteTask(task) {
        const index = this.taskList.indexOf(task);
        this.taskList.splice(index, 1);
        task.container.remove();
    }
    sortTask(sortStatus) {
        this.taskList.sort((a, b) => {
            if (sortStatus === 'down') {
                return a.input.value - b.input.value;
            } else {
                return b.input.value - a.input.value;
            }
        });
        this.taskList.forEach(task => {
            this.container.append(task.container);
        });
    }
}
 
class Task {
    constructor(deleteTask) {
        this.container = document.createElement('div');
        this.container.classList.add('task');
        this.container.innerHTML = `
            <input placeholder="Введите задачу">
            <div class="btn-delete">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
                    <path d="M6 6L14 14" stroke="#C4C4C4"/>
                    <path d="M6 14L14 6" stroke="#C4C4C4"/>
                </svg>
            </div>
        `;

        this.input = this.container.querySelector('input');

        const btnDelete = this.container.querySelector('.btn-delete');
        btnDelete.addEventListener('click', () => {
            deleteTask(this);
        });
    }
}