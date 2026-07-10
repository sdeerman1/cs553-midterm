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

-- KEEP GOING HERE


# Suggested workflow to test each route:

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
