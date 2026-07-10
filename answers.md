# Part 1 - Conceptual Foundations  
  
**1. Sockets vs. HTTP**  
TCP messages are simply a way of moving bytes. All the socket does is send and receive bytes, with virtually no structure. HTTP uses TCP to deliver the bytes, but HTTP is built up more on top. HTTP requests have structure and specifically define request and response messages. There are different HTTP methods that give context to what the request is asking for, making HTTP requests much more powerful. There are many reasons why web APIs do not expose the socket protocols, but a main one is that the developer would have to parse each request and write specific code for any format the user may send the request in. This would be horrible to debug, while HTTP gives a universal structure which allows the API to be expanded across different types of systems and serve many more users at once.  
**2. Request / Response**  
The general request/response pattern is the client sends a request, the server then processes the request, and the server finally sends a response.  
In a TCP command server, the data is a raw byte stream, meaning strings are sent back and forth. The system has no way of understanding the strings, so the programmer must write logic to read in, parse, and understand the strings that are sent by the client. For example, if the server is meant to read in user text and make it all caps:  
Request: > hello  
Response: HELLO  
In an HTTP API, this pattern is achieved by using HTTP methods to tell the server which task should be completed. In a basic app with users assigned to IDs:  
Request: GET /users/1  
Response: { "id": 1, "name": "Alice" }  
In an Express route handler, the request object is read into a function which performs business logic and then sends back a response object. In our example, these use HTTP methods and typically send back JSON objects or HTTP error codes. The pattern is achieved like app.method(path, handler):  
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
with the request being the "req" object and the response being the "res" object.  
**3. Statelessness**  
A stateless system is one in which each request contains all the context needed to complete it, so the server does not need to remember prior requests. A pro of stateless systems is that they are easier to scale horizontally and there is easier recovery after failure. A con of stateless systems is that it is less natural for workflows. A stateful system can handle longer tasks and recover from errors easier.   
**4. HTTP Status Codes**  
   | Situation | Status Code | Justification |
   | --- | --- | --- |
   | A new resource was successfully created | 201 | This is a success code and is typically understood to mean “Created”. |
   | The client requested an item that does not exist | 404 | This is an error code and is typically understood to mean “Not Found”, so would be a good code to communicate the item was not found. |
   | The client sent JSON missing  a required field | 400 | This is an error code and is typically understood to mean “Bad Request”, so this would let the client know that there was an error with the client’s request. We can ensure the error message tells the client why the request was “bad”, which is a missing required field in this case. |
   | The server had an unexpected error | 500 | This is an error code and is typically understood to mean “Internal Server Error”, meaning something is wrong with the server, not with the client. |
   | A successful request returns JSON data | 200 | This is a success code and is typically understood to mean “OK”. This would communicate that everything was successful, and the returned JSON data would include the requested information. |
  
# Part 2 - API Design

**1. Resource URIs**
   | Situation | URI |
   | --- | --- |
   | getting all tasks | GET /api/tasks |
   | getting one task by id | GET /api/tasks/:id |
   | creating a task | POST/api /tasks |
   | replacing a task | PUT /api/tasks/:id |
   | partially updating a task | PATCH /api/tasks/:id |
   | deleting a task | DELETE /api/tasks/:id |

**2. Method Semantics**  
In reference to methods, safe means that executing the request does not change the server state, meaning nothing changes on the backend of the information. The only safe method is GET.  
Idempotent means that the same request can be repeated multiple times and the final state of the server will be the same as if the request was only run once. GET, PUT, and DELETE are all idempotent.  
&emsp;a. GET  
&emsp;&emsp;Nothing is updated, only data is returned, so GET is safe.  
&emsp;&emsp;The server does not change at while returning data, so it must be idempotent as well.  
&emsp;b. POST  
&emsp;&emsp;Creating data will change the server state so POST is not safe.  
&emsp;&emsp;Repeating the POST command will create many identical resources so POST is not idempotent.  
&emsp;c. PUT  
&emsp;&emsp;Replacing a resource will change the server state, so PUT is not safe.  
&emsp;&emsp;Replacing a specific resource over and over again with the same data will have the same effect as replacing the resource once, so PUT is idempotent.  
&emsp;d. PATCH  
&emsp;&emsp;Updating a field of the resource will change the server state, so PATCH is not safe.  
&emsp;&emsp;PATCH is usually used by sending a set of change instructions, such as “increment age by 1”. If this instruction is sent 10 times, the final age will be incremented by 10 instead of by 1, meaning PATCH is usually not idempotent.  
&emsp;&emsp;PATCH could be idempotent the instruction was instead “update age to 35”, but this would typically be a PUT instruction completely replacing the resource.  
&emsp;e. DELETE  
&emsp;&emsp;Data is deleted here, so the server changes states and DELETE is not safe.  
&emsp;&emsp;Given an id, a resource can only be deleted once (and the ID will simply not match any existing resource for any of the other requests so no additional deletes will be made) so DELETE is idempotent.  

**3. JSON Representation**  
POST /tasks:  
&emsp;{  
&emsp;&emsp;"title": "Lab 03"  
&emsp;&emsp;"course": "CS553"  
&emsp;&emsp;"completed": true  
&emsp;}  

# Part 4 - Middleware  

Middleware is software that sits between components and helps them communicate, coordinate, or share common behavior. It helps to reduce duplicated logic and is able to connect the aspects of an application (clients, servers, and data systems). Validation logic would have to be repeated over and over again for each distinct route, so it is much more efficient to only write the validation logic once and use it for multiple routes.  

# Part 7 - Reflection

**1. Code vs Contract**  
   The express server actually runs and handles the request logic. the OpenAPI is a specification written to explain how the server works and what all it does. With OpenAPI, the routes are listed, schemas are defined, and there are written examples the user can reference to learn how to use the server. Without this written specification, the user would be guessing at each step. Overall though, OpenAPI is not the API, and the Express routes are what actually implement the behavior defined in the documentation.  
**2. Drift**    
One example is deciding to change one of the error codes from 400 to 404. It would be easy to change this in the code, test the code, and then move on without updating the OpenAPI file.  
Another example would be deciding to add another key to your database table. The examples and schemas would have to be updated in the OpenAPI file to avoid drift.  
**3. Client Impact**  
   The API documentation is the contract that client developers rely on. If it is incorrect, their whole understanding of the server is broken. They may see an error and assume it is with their code when in reality they were simply given outdated information. This wastes debugging time. Additionally, some client developers will use the API documentation to generate tests or other tools automatically, and these will all be incorrect or broken if the API documentation is outdated.  

# Part 8 - Graduate  
**Explain the advantages and disadvantages of designing the OpenAPI specification before writing the Express code.**  
  The main advantage of designing the OpenAPI specification first is that there is a clear map or direction to take when moving into development. This is crucial for teams of any size. The team can first come together to discuss exactly what the code should do and how they should implement the features. After collaborating on the OpenAPI documentation, each developer can reference the document to understand exactly how they should write their code and which errors to account for. They would have a Bible-like document to tell them how to name their variables, what types they should be, which HTTP error codes to do, and much more. It would help with coding conventions to ensure consistency across the code base. Writing the OpenAPI specification first would also help the team members in charge of client development and testing. When writing the tests, the developer knows exactly what errors to look out for, which error codes they should have, which objects are required, and have clear examples of inputs, outputs, and errors. It will help the client developer to know exactly what the server is capable of so they can ensure the client is aligned with each task. They also should know which objects are required and have clear examples of everything.
  The main disadvantage of designing the OpenAPI specification first is that the code will have no map or direction to lead it. The team will all be writing their code chunks with no guarantee that it will all work together. They could all have different ideas for error codes, function naming protocols, and variable names. The tests and client cannot be developed until after the backend code is finished. The tests and the client will also be much more difficult to complete without an OpenAPI specification, as the developers must be extremely familiar with all the code base. The specification puts all the necessary information in one easy-to-read place so these developers do not need to hunt for every bit of information they need.
   The documentation and the code can drift apart very easily. The documentation is extremely detailed, so every single change to the code must be updated in the documentation. If the OpenAPI specification is done first, the code can be implemented based on this outline. However, nothing can be changed or updated at all when implementing the code, which is rarely possible during development. If anything is changed, the OpenAPI specification must be changed as well, and that affects the tests, the client, and potentially the rest of the backend code. Any changes must immediately be updated in the OpenAPI specification and be clearly communicated to the entire team. Each team member must be constantly checking the specification for changes to ensure their code still aligns perfectly. If the code is written first and the OpenAPI document created after, the code has no map or direction to lead it, but the OpenAPI file may be more accurate barring any further changes.
