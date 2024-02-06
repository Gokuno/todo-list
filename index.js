// Get references to HTML elements
const appContainer = document.getElementById("app-container");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("list");

// Load tasks from local storage when the page loads
window.addEventListener("load", loadTasksFromLocalStorage);

// Event listener for form submission
taskForm.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Call the function to add a task
  addTask();
});

// Function to add a new task
function addTask() {
  // Get the task input element
  const taskInput = taskForm.querySelector("input");
  // Trim and get the value from the input field
  const taskText = taskInput.value.trim();

  // Check if the task text is not empty
  if (taskText !== "") {
    // Create a new task element
    const newTaskElement = createTaskElement(taskText);
    // Append the new task element to the task list
    taskList.appendChild(newTaskElement);
    // Clear the task input field for the next task
    taskInput.value = "";
    // Update local storage after adding a task
    updateLocalStorage();
  }
}

// Function to create a new task element
function createTaskElement(taskText) {
  // Create a new list item (task element)
  const newTaskElement = document.createElement("li");
  // Create a span element for the task text
  const taskTextElement = document.createElement("span");
  // Create a button element for deleting the task
  const deleteButton = document.createElement("button");

  // Set the text content for the task span
  taskTextElement.textContent = taskText;
  // Set the text content for the delete button
  deleteButton.textContent = "Delete";

  // Event listener for the delete button
  deleteButton.addEventListener("click", function () {
    // Call the function to delete the task
    deleteTask(newTaskElement);
    // Update local storage after deleting a task
    updateLocalStorage();
  });

  // Append the task text and delete button to the new task element
  newTaskElement.appendChild(taskTextElement);
  newTaskElement.appendChild(deleteButton);

  return newTaskElement;
}

// Event listener for marking a task as completed or incomplete
taskList.addEventListener("click", function (event) {
  // Calls the function to mark the completed task
  markAsCompleted(event.target);
  // Update local storage after marking a task as completed or incomplete
  updateLocalStorage();
});

// Function to mark a task as completed or incomplete
function markAsCompleted(targetElement) {
  // Check if the clicked element is an actual task (<li>)
  if (targetElement.tagName.toLowerCase() === "li") {
    // Toggle a CSS class to update the appearance
    targetElement.classList.toggle("completed");
  }
}

// Function to delete a task
function deleteTask(taskElement) {
  // Remove the task element from the task list
  taskList.removeChild(taskElement);
}

// Function to update local storage with the current tasks
function updateLocalStorage() {
  // Convert the task list items to an array of task objects
  const tasks = Array.from(taskList.children).map(task => ({
    text: task.querySelector("span").textContent,
    completed: task.classList.contains("completed"),
  }));

  // Store the tasks in local storage as a JSON string
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage when the page loads
function loadTasksFromLocalStorage() {
  // Retrieve the stored tasks from local storage
  const storedTasks = localStorage.getItem("tasks");

  // Check if there are stored tasks
  if (storedTasks) {
    // Parse the JSON string to get an array of tasks
    const tasks = JSON.parse(storedTasks);

    // Iterate through the tasks and add them to the task list
    tasks.forEach(task => {
      // Create a new task element
      const newTaskElement = createTaskElement(task.text);

      // Add the "completed" class if the task is marked as completed
      if (task.completed) {
        newTaskElement.classList.add("completed");
      }

      // Append the new task element to the task list
      taskList.appendChild(newTaskElement);
    });
  }
}