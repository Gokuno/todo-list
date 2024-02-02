const appContainer = document.getElementById("app-container");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("list");

taskForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the function to add the task
    addTask();
});

function addTask() {
    // Get the value from the tas input field
    const taskInput = taskForm.querySelector("input");
    //trim removes leading and trailing whitespaces
    const taskText = taskInput.value.trim();

    // Checks if the task text is not empty
    if(taskText !== "") {
        // Creates a new task element (<li>)
        const newTaskElement = document.createElement("li");
        newTaskElement.textContent = taskText;

        // Append the new task element to the task list
        taskList.appendChild(newTaskElement);

        // Clears the task input field for the next task
        taskInput.value =""
    }
}