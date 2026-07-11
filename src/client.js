const API_BASE_URL = "http://localhost:3000";

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function callHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function loadTasks() {

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function addTask(input) {

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    const data = await response.json();

    console.log(data);

  } catch (error) {
    console.error(error.message);
  }
}

async function loadTaskByID(id) {

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function replaceTask(id, input) {

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    const data = await response.json();

    console.log(data);

  } catch (error) {
    console.error(error.message);
  }
}

async function updateTask(id, input) {

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    const data = await response.json();

    console.log(data);

  } catch (error) {
    console.error(error.message);
  }
}

async function deleteTask(id) {

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });

  } catch (error) {
    console.error(error.message);
  }
}

const rl = readline.createInterface({ input, output });

async function prompt() {
  let userInput = '';
  try {
    while (userInput !== 'quit') {
      userInput = (await rl.question('\nWhat action do you want to take?\nCheck health\nReturn all items\nReturn one item\nCreate one item\nReplace one item\nUpdate one item\nDelete one item\nQuit\n\n')).trim().toLowerCase();
      switch (userInput) {
        case 'check health':
          await callHealth();
          break;
        case 'return all items':
          await loadTasks();
          break;
        case 'return one item':
          const id = (Number)(await rl.question('Enter the requested task ID: '));
          await loadTaskByID(id);
          break;
        case 'create one item':
          const title = (await rl.question('Enter title of task: ')).trim();
          const course = (await rl.question('Enter the course associated with the task: ')).trim();
          const userObject = {
            title: title,
            course: course,
            completed: false
          };
          await addTask(userObject);
          break;
        case 'replace one item':
          const replaceID = (Number)(await rl.question('Enter the ID of the task to replace: '));
          const replaceTitle = (await rl.question('Enter new title of task: ')).trim();
          const replaceCourse = (await rl.question('Enter new course associated with the task: ')).trim();
          const replaceCompleted = (await rl.question('Has the task already been completed? Y/N ')).trim();
          if (replaceCompleted == 'Y' || replaceCompleted == 'y') {
            const userObject = {
              title: replaceTitle,
              course: replaceCourse,
              completed: true
            };
            await replaceTask(replaceID, userObject);
          } else {
            const userObject = {
              title: replaceTitle,
              course: replaceCourse,
              completed: false
            };
            await replaceTask(replaceID, userObject);
          }
          break;
        case 'update one item':
          const updateId = (Number)(await rl.question('Enter the ID of the task to update: '));
          const updatedKey = (await rl.question('Which aspect of the task do you want to update? title, course, or completion status: ')).trim().toLowerCase();
          switch (updatedKey) {
            case 'title':
              const updateTitle = (await rl.question('Enter new title of task: ')).trim();
              const titleObject = {
                title: updateTitle
              };
              await updateTask(updateId, titleObject);
              break;
            case 'course':
              const updateCourse = (await rl.question('Enter new course associated with the task: ')).trim();
              const courseObject = {
                course: updateCourse
              };
              await updateTask(updateId, courseObject);
              break;
            case 'completion status':
              const replaceCompleted = (await rl.question('Has the task already been completed? Y/N ')).trim();
              if (replaceCompleted == 'Y' || replaceCompleted == 'y') {
                const userObject = {
                  completed: true
                };
                await updateTask(updateId, userObject);
              } else {
                const userObject = {
                  completed: false
                };
                await updateTask(updateId, userObject);
              }
              break;
            default:
              console.log("Input not recognized");
          }
          break;
        case 'delete one item':
          const deleteId = (Number)(await rl.question('Enter the ID of the task to delete: '));
          await deleteTask(deleteId);
          break;
        case 'quit':
          break;
        default:
          console.log('\nInput not recognized. Try again.\n')
      }
    }
  } finally {
    rl.close();
  }
}

await prompt();