document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskForm = document.getElementById("taskForm");
    const taskNameInput = document.getElementById("taskNameInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const amPmSelect = document.getElementById("amPmSelect");
    const submitTaskBtn = document.getElementById("submitTaskBtn");
    const taskList = document.getElementById("taskList");

    // Initialize a task counter
    let taskCounter = 1;

    // Show/hide task form
    addTaskBtn.addEventListener("click", function () {
        taskForm.style.display = taskForm.style.display === "block" ? "none" : "block";
    });

    // Add a new task
    submitTaskBtn.addEventListener("click", function () {
        const taskName = taskNameInput.value.trim();
        const dueDate = dueDateInput.value.trim();
        const amPm = amPmSelect.value;

        if (taskName !== "" && dueDate !== "") {
            // Format the date and time
            const formattedDueDate = new Date(dueDate).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });

            // Create a new task item with a number and a delete icon
            const taskItem = document.createElement("li");
            taskItem.className = "task-item";
            taskItem.innerHTML = `<span>${taskCounter}. ${taskName} - Due: ${formattedDueDate} ${amPm}</span><i class="delete-icon far fa-trash-alt"></i>`;

            // Add a click event listener to the delete icon for removal
            const deleteIcon = taskItem.querySelector(".delete-icon");
            deleteIcon.addEventListener("click", function () {
                taskItem.remove(); // Remove the task item when the delete icon is clicked
                updateTaskNumbers(); // Update task numbers after deletion
            });

            // Add the task item to the task list
            taskList.appendChild(taskItem);

            // Increment the task counter
            taskCounter++;

            // Clear the input fields
            taskNameInput.value = "";
            dueDateInput.value = "";
            amPmSelect.value = "AM"; // Reset AM/PM to AM after submission
        }
    });

    // Function to update task numbers after deletion
    function updateTaskNumbers() {
        const taskItems = taskList.querySelectorAll(".task-item");
        taskCounter = 1;
        taskItems.forEach((taskItem) => {
            const taskText = taskItem.querySelector("span").textContent;
            taskItem.querySelector("span").textContent = `${taskCounter}. ${taskText.substring(taskText.indexOf(". ") + 2)}`;
            taskCounter++;
        });
    }
});
