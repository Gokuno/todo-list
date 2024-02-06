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
    // Get the value from the task input field
    const taskInput = taskForm.querySelector("input");
    const taskText = taskInput.value.trim();
  
    if (taskText !== "") {
      // Create a new task element (e.g., <li>)
      const newTaskElement = document.createElement("li");
  
      // Create a span element for the task text
      const taskTextElement = document.createElement("span");
      taskTextElement.textContent = taskText;
  
      // Create a button for deleting the task
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function (event) {
        deleteTask(event.target);
      });
  
      // Append the task text and delete button to the new task element
      newTaskElement.appendChild(taskTextElement);
      newTaskElement.appendChild(deleteButton);
  
      // Append the new task element to the task list
      taskList.appendChild(newTaskElement);
  
      // Optionally, clear the task input field for the next task
      taskInput.value = "";
    }
  }

taskList.addEventListener("click", function (event) {
    // Calls the function to mark the completed task
    markAsCompleted(event.target);
});

function markAsCompleted(targetElement) {
    // Check if the clicked element is an actual task (<li>)
    if (targetElement.tagName.toLowerCase() === "li") {
        // Toggle a CSS class to update the appearance
        targetElement.classList.toggle("completed");
    }
}

taskList.addEventListener("click", function (event) {
    // Calls the function to delete task
    deleteTask(event.target);
});

function deleteTask(targetElement) {
    // Check if the clicked element is a delete button within a task
    if (targetElement.tagName.toLowerCase() === "button" && targetElement.parentElement.tagName.toLowerCase() === "li") {
        // Remove the parent task element from the task list
        const taskToRemove = targetElement.parentElement;
        taskList.removeChild(taskToRemove);
    }
}