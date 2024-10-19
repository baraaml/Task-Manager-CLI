const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = new Map();
let taskIdCounter = 0;

const addTask = (task) => {
    taskIdCounter++;
    const TaskObj = {id: taskIdCounter, name: task};
    tasks.set(taskIdCounter, TaskObj);
    console.log('task added with ID: ', taskIdCounter);
    CLI();
}

const removeTask = (taskId)=>{
    if (tasks.has(taskId)){ 
        tasks.delete(taskId);
        console.log(`Task with ID: ${taskId} removed`);
    }
    else {
        console.log(`Task with ID: ${taskId} not found`);
    }
    CLI();
}
const UpdateTask = (taskId, newTask)=>{
    if (tasks.has(taskId)) {
        let taskObj = tasks.get(taskId);
        taskObj.name = newTask;
        tasks.set(taskId, taskObj);
        console.log(`Task with ID: ${taskId} updated`);
    }
    else {
        console.log(`Task with ID: ${taskId} not found`);
    }
    CLI();
}

const ListTask = ()=>{
    if (tasks.size === 0) {
        console.log('No tasks available.');
    }
    console.log('List of tasks:');
    for (let [key, value] of tasks) {
        console.log(`${key}: ${value.name}`);
    }
    CLI();
}

function CLI(){
    rl.question('Enter a command (add, remove, update, list, exit): ', (command) => {
        switch (command.toLowerCase()) {
            case 'add':
                rl.question('Enter task: ', (task) => {
                    addTask(task);
                });
                break;
            case 'remove':
                rl.question('Enter task ID: ', (taskId) => {
                    removeTask(parseInt(taskId));
                });
                break;
            case 'update':
                rl.question('Enter task ID: ', (taskId) => {
                    rl.question('Enter new task: ', (task) => {
                        UpdateTask(parseInt(taskId), task);
                    });
                });
                break;
            case 'list':
                ListTask();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log('Invalid command');
                CLI();
        }
    });
}
CLI();
