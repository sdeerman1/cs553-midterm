import express from "express";

export function createApp() {
  const app = express();

  app.use(express.json());

  // Starter data. This data is stored in memory and will reset when the
  // server restarts.
  let nextId = 2;
  const tasks = [
    { id: 1, title: "Watch Week 3 lecture", course: "CS553", completed: false },
  ];

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/tasks", (req, res) => {
    res.json(tasks);
  });

  app.get("/api/tasks/:id", (req, res) => {
    const requestedID = Number(req.params.id);
    const requestedTask = tasks.find(task => task.id === requestedID);
    if (requestedTask) {
      res.json(requestedTask);
    }
    else {
      res.status(404).json({ error: "Task not found"})
    }
  });

  app.post("/api/tasks", (req, res) => {
    const taskTitle = req.body.title;
    const taskCourse = req.body.course;
    const taskCompleted = Boolean(req.body.completed);
    if ( (taskTitle.trim().length > 0) && (taskCourse.trim().length > 0 ) && (typeof taskCompleted == "boolean") ) {
      const newTask = { id: nextId, title: taskTitle, course: taskCourse, completed: taskCompleted };
      tasks.push(newTask);
      nextId = nextId + 1;
      res.status(201).json(newTask);
    }
    else {
      res.status(400).json({ error: "Invalid or missing data." });
    }
  });

  app.put("/api/tasks/:id", (req, res) => {
    const requestedID = Number(req.params.id);
    const requestedTask = tasks.find(task => task.id == requestedID);
    if (requestedTask) {
      const taskTitle = req.body.title;
      const taskCourse = req.body.course;
      const taskCompleted = Boolean(req.body.completed);
      if ( (taskTitle.trim().length > 0) && (taskCourse.trim().length > 0 ) && (typeof taskCompleted == "boolean") ) {
        requestedTask.title = taskTitle;
        requestedTask.course = taskCourse;
        requestedTask.completed = taskCompleted;
        res.json(requestedTask);
      }
      else {
        res.status(400).json({ error: "Invalid or missing data." });
      }
    }
    else {
      res.status(404).json({ error: "Task not found."})
    }
  });

  app.patch("/api/tasks/:id", (req, res) => {
    const requestedID = Number(req.params.id);
    const requestedTask = tasks.find(task => task.id == requestedID);
    // const data = JSON.stringify(req.body);
    if (requestedTask) {
      if ("title" in req.body) {
        const taskTitle = req.body.title;
        if (taskTitle.trim().length > 0) {
          requestedTask.title = taskTitle;
        }
        else {
          res.status(400).json({ error: "Invalid or missing data." });
        }
      }
      if ("course" in req.body) {
        const taskCourse = req.body.course;
        if (taskCourse.trim().length > 0 ) {
          requestedTask.course = taskCourse;
        }
        else {
          res.status(400).json({ error: "Invalid or missing data." });
        }
      }
      if ("completed" in req.body) {
        const taskCompleted = Boolean(req.body.completed);
        if (typeof taskCompleted == "boolean") {
          requestedTask.completed = taskCompleted;
        }
        else {
          res.status(400).json({ error: "Invalid or missing data." });
        }
      }
    res.status(200).json(requestedTask);
    }
    else {
      res.status(404).json({ error: "Task not found."})
    }
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const requestedID = Number(req.params.id);
    const requestedTask = tasks.find(task => task.id == requestedID);
    if (requestedTask) {
      const index = tasks.indexOf(requestedTask);
      if (index > -1) {
        tasks.splice(index, 1);
      }
      res.status(204).json({ status: "Successfully deleted" });
    }
    else {
      res.status(404).json({ error: "Task not found."})
    }
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

// if (isMainModule) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Midterm API listening on port ${PORT}`);
  });
// }