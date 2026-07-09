const API_BASE_URL = "http://localhost:3000";

async function callHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error(`/health failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log("/health successful");
  } catch (error) {
    console.error(error.message);
  }
}

async function loadTasks() {

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);

    if (!response.ok) {
      throw new Error(`GET /tasks failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("GET /tasks successful");
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function addTask() {

  const input = {
    "title": "Complete lab 05",
    "course": "CS553",
    "completed": false
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message ?? `POST /api/tasks failed with status ${response.status}`);
    }

    console.log("POST /api/tasks successful: added task \"" + data.title + "\"");

  } catch (error) {
    console.error(error.message);
  }
}

async function loadTaskByID(id) {

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`);

    if (!response.ok) {
      throw new Error(`GET /api/tasks/:id failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("GET /tasks/:id successful");
  } catch (error) {
    console.error(error.message);
  }
}

async function updateTask(id) {

  const input = {
    "title": "Complete lab 06",
    "course": "CS553",
    "completed": false
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message ?? `PUT /api/tasks/:id failed with status ${response.status}`);
    }

    console.log("PUT /api/tasks/:id successful: updated task 2 to : \"" + data.title + "\"");

  } catch (error) {
    console.error(error.message);
  }
}

async function deleteTask(id) {

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(data.message ?? `DELETE /api/tasks/:id failed with status ${response.status}`);
    }

    console.log("DELETE /api/tasks/:id successful");

  } catch (error) {
    console.error(error.message);
  }
}

await callHealth();
await addTask();
await loadTasks();
await loadTaskByID(1);
await updateTask(2);
await deleteTask(1);