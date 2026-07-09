# Part 1 - Conceptual Foundations  
  
**1. Sockets vs. HTTP**  
**2. Request / Response**  
**3. Statelessness**  
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
   The documentation and the code can drift apart very easily. The documentation is extremely detailed, so every single change to the code must be updated in the documentation. If the OpenAPI specification is done first, the code can be implemented based on this outline. However, nothing can be changed or updated at all when implementing the code, which is rarely possible during development. If the code is written first and the OpenAPI document created after, the code has no map or direction to lead it, but the OpenAPI file may be more accurate barring any further changes.  
One example is deciding to change one of the error codes from 400 to 404. It would be easy to change this in the code, test the code, and then move on without updating the OpenAPI file.  
Another example would be deciding to add another key to your database table. The examples and schemas would have to be updated in the OpenAPI file to avoid drift.  
**3. Client Impact**  
   The API documentation is the contract that client developers rely on. If it is incorrect, their whole understanding of the server is broken. They may see an error and assume it is with their code when in reality they were simply given outdated information. This wastes debugging time. Additionally, some client developers will use the API documentation to generate tests or other tools automatically, and these will all be incorrect or broken if the API documentation is outdated.  

# Part 8 - Graduate
