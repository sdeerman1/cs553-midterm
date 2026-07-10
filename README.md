# cs553-midterm


in a terminal, navigate to /cs553-midterm/src and run "npm install"
then run "npm run api"
should respond "Midterm API listening on port 3000"

in a separate bash terminal, navigate to /cs553-midterm/src and run "node client.js"
should return success messages after going through tests

can also run individual curl requests from the second terminal in /cs553-midterm/src

curl http://localhost:3000/health

curl http://localhost:3000/tasks

curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete lab 06", "course": "CS553", "completed": false}'

curl http://localhost:3000/api/tasks/:id

curl -X PUT http://localhost:3000/api/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{"title": "Midterm", "course": "CS553", "completed": false}'

curl -X PATCH http://localhost:3000/api/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

curl -X DELETE http://localhost:3000/api/tasks/:id


POTENTIAL WORKFLOW:

curl http://localhost:3000/health
{"status":"ok"}

curl http://localhost:3000/tasks
[{"id":1,"title":"Watch Week 3 lecture","course":"CS553","completed":false}]

curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete lab 07", "course": "CS553", "completed": false}'
{"id":2,"title":"Complete lab 07","course":"CS553","completed":false}

curl http://localhost:3000/api/tasks/2
{"id":2,"title":"Complete lab 07","course":"CS553","completed":false}

curl -X PUT http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"title": "Midterm", "course": "CS553", "completed": false}'
{"id":2,"title":"Midterm","course":"CS553","completed":false}

curl -X PATCH http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"title": "Final exam"}'
{"id":2,"title":"Final exam","course":"CS553","completed":false}

curl -X PATCH http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"course": "CS453"}'
{"id":2,"title":"Final exam","course":"CS453","completed":false}

curl -X PATCH http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
{"id":2,"title":"Final exam","course":"CS453","completed":true}

curl -X PATCH http://localhost:3000/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"title": "Midterm", "completed": false}'
{"id":2,"title":"Midterm","course":"CS453","completed":false}

curl -X DELETE http://localhost:3000/api/tasks/2
