document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Load tasks from localStorage
    const loadTasks = () => {
      try {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => addTaskToDOM(task));
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
  
    // Save tasks to localStorage
    const saveTask = (task) => {
      try {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving task:", error);
      }
    };
  
    // Remove task from localStorage
    const removeTask = (taskText) => {
      try {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter((task) => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error removing task:", error);
      }
    };
  
    // Add task to DOM
    const addTaskToDOM = (taskText) => {
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = `
        <span>${sanitizeInput(taskText)}</span>
        <button class="delete-btn">Delete</button>
      `;
      taskList.appendChild(li);
  
      // Add delete functionality
      li.querySelector(".delete-btn").addEventListener("click", () => {
        taskList.removeChild(li);
        removeTask(taskText);
      });
    };
  
    // Sanitize user input to prevent XSS
    const sanitizeInput = (input) => {
      const tempDiv = document.createElement("div");
      tempDiv.textContent = input;
      return tempDiv.innerHTML;
    };
  
    // Add task event
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Task cannot be empty!");
        return;
      }
  
      addTaskToDOM(taskText);
      saveTask(taskText);
      taskInput.value = "";
    });
  
    // Load tasks on page load
    loadTasks();
  });