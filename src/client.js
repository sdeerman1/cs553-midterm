const API_BASE_URL = "http://localhost:3000";

const loadButton = document.querySelector("#load-tasks");
const taskList = document.querySelector("#tasks");
const form = document.querySelector("#add-task-form");
const taskTitleInput = document.querySelector("#task-title");
const taskCourseInput = document.querySelector("#task-course");
const taskCompletedInput = document.querySelector("#task-completed");
const statusBox = document.querySelector("#status");

function setStatus(message) {
  statusBox.textContent = message;
}

function renderTasks(tasks) {
  taskList.replaceChildren();

  for (const task of tasks) {
    const li = document.createElement("li");
    li.textContent = `${task.id}: ${task.title} (${task.course}) (${task.completed})`;
    taskList.appendChild(li);
  }
}

async function loadTasks() {
  setStatus("Loading tasks...");

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`);

    if (!response.ok) {
      throw new Error(`GET /api/tasks failed with status ${response.status}`);
    }

    const data = await response.json();
    renderTasks(data.tasks);
    setStatus("Tasks loaded.");
  } catch (error) {
    setStatus(error.message);
  }
}

async function addTask(title, course, completed) {
  setStatus("Adding task...");

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, course, completed })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message ?? `POST /api/tasks failed with status ${response.status}`);
    }

    setStatus(`Added task: ${data.task.title}`);
    await loadTasks();
  } catch (error) {
    setStatus(error.message);
  }
}

loadButton.addEventListener("click", loadTasks);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = taskTitleInput.value.trim();
  const course = taskCourseInput.value.trim();
  const completed = Boolean(taskCompletedInput);

  if (!title || !course || typeof completed != "boolean") {
    setStatus("Enter a title, course, and a boolean value.");
    return;
  }

  taskTitleInput.value = "";
  taskCourseInput.value = "";
  taskCompletedInput.value = false;
  await addTask(title, course, completed);
});