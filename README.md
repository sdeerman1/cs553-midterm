# CS 553 MIDTERM

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/tasks` | Return all items |
| GET | `/api/tasks/:id` | Return one item |
| POST | `/api/tasks` | Create one item |
| PUT | `/api/tasks/:id` | Replace one item |
| PATCH | `/api/tasks/:id` | Update one item |
| DELETE | `/api/tasks/:id` | Delete one item |

## How to Setup
In a terminal, navigate to ```/cs553-midterm/src``` and run ```npm install```  

## How to Run
In the terminal, run ```npm run api```  
The server should start up and respond ```Midterm API listening on port 3000```  

In a separate bash terminal, navigate to ```/cs553-midterm/src```. 
From this terminal, run individual curl requests:

To get the health status:
```bash
curl http://localhost:3000/health
```

To return all tasks:
```bash
curl http://localhost:3000/tasks
```

To create a new task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete lab 06", "course": "CS553", "completed": false}'
```

To return a specific task by ID:
```bash
curl http://localhost:3000/api/tasks/:id
```

To replace a task with a specific ID:
```bash
curl -X PUT http://localhost:3000/api/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{"title": "Midterm", "course": "CS553", "completed": false}'
```

To partially update a task with the given ID:
```bash
curl -X PATCH http://localhost:3000/api/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

To delete a task with the given ID:
```bash
curl -X DELETE http://localhost:3000/api/tasks/:id
```

## How to run the client

In a terminal that is in ```/cs553-midterm/src```, run ```node client.js```  
This starts the client, which can be interacted with through the command line.  

Follow the prompts that the client has. The options will be:  
Check health  
Return all items  
Return one item  
Create one item  
Replace one item  
Update one item  
Delete one item  
Quit  

These options are not case sensitive.  

After the prompt is completed, the initial prompt with all the options will be displayed again. The client will continue prompting for input until the user enters "quit".

When replacing an item or updating an item's completion status, any input except "Y" or "y" for completion status will result in completion status being set to "false". If using curl requests, any input that is not a boolean will result in an HTTP error status code 400 with the message "Invalid or missing data", but the client has error handling for completion status built in.  

## Suggested workflow to test each route:  

```bash
Check health
```
Output:  
```{"status":"ok"}```
<br><br><br>
```bash
Create one item
```
Then enter the title and course when prompted. If entering "Midterm" for title and "CS553" for course:  
Output:  
```[{"id":2,"title":"Midterm","course":"CS553","completed":false}]```
<br><br><br>
```bash
Return all items
```
Output: 
```[ { id: 1, title: 'Watch Week 3 lecture', course: 'CS553', completed: false },```
```{ id: 2, title: 'Midterm', course: 'CS553', completed: false } ]```
<br><br><br>
```bash
Return one item
```
Enter in an ID. If entering "2" for ID:  
Output:  
```{"id":2,"title":"Midterm","course":"CS553","completed":false}```
<br><br><br>
```bash
Replace one item
```
Enter in an ID. You will then be prompted for the new title, course, and completion status. If entering "2" for ID, "Final exam" for title, "CS453" for course, and "n" for completion status:  
Output:  
```{"id":2,"title":"Final exam","course":"CS453","completed":false}```
<br><br><br>
```bash
Update one item
```
Enter in an ID. You will then be prompted for which aspect you want to update: title, course, or completion status. Any incorrect input will result in "Input not recognized" and the initial prompt will restart. Once you select an option, you will be prompted for the relevant information. If entering "2" for ID, "course" for which aspect to update, and "CS553" for course:  
Output:  
```{"id":2,"title":"Final exam","course":"CS553","completed":false}```
<br><br><br>
```bash
Delete one item
```
Enter in an ID. There will be no output for this prompt, but if the ID is valid, that item will be deleted. If the ID is not valid, nothing will happen, and the prompts will restart.  
<br><br><br>
```bash
Return all items
```
You should be able to tell that the task was deleted if a valid ID was entered in the last prompt.   
<br><br><br>
```bash
Quit
```
The program will exit.  


## Suggested curl workflow to test each route:

```bash
curl http://localhost:3000/health
```
Output:  
```{"status":"ok"}```
<br><br><br>
```bash
curl http://localhost:3000/tasks
```
Output:  
```[{"id":1,"title":"Watch Week 3 lecture","course":"CS553","completed":false}]```
<br><br><br>
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete lab 07", "course": "CS553", "completed": false}'
```
Output:  
```{"id":2,"title":"Complete lab 07","course":"CS553","completed":false}```
<br><br><br>
```bash
curl http://localhost:3000/api/tasks/2
```
Output:  
```{"id":2,"title":"Complete lab 07","course":"CS553","completed":false}```
<br><br><br>
```bash
curl -X PUT http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"title": "Midterm", "course": "CS553", "completed": false}'
```
Output:  
```{"id":2,"title":"Midterm","course":"CS553","completed":false}```
<br><br><br>
```bash
curl -X PATCH http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"title": "Final exam"}'
```
Output:  
```{"id":2,"title":"Final exam","course":"CS553","completed":false}```
<br><br><br>
```bash
curl -X PATCH http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"course": "CS453"}'
```
Output:  
```{"id":2,"title":"Final exam","course":"CS453","completed":false}```
<br><br><br>
```bash
curl -X PATCH http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```
Output: 
```{"id":2,"title":"Final exam","course":"CS453","completed":true}```
<br><br><br>
```bash
curl -X PATCH http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"title": "Midterm", "completed": false}'
```
Output:  
```{"id":2,"title":"Midterm","course":"CS453","completed":false}```
<br><br><br>
```bash
curl -X DELETE http://localhost:3000/api/tasks/2
```
