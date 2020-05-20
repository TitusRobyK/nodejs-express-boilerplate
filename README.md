### Express Framework Boilerplate Code to get started

Clone the repository
```
run the command "npm install"
run the command "npm run dev" to run you express server in local
hit the following url as a GET method in your REST Client  : http://localhost:5000/api/test-api-service/200303
```

#### Project Structure

 
```
src/main.js                                 <--- Entry Point ,basic validation ,authentication etc
---/api-response/response.js
---/routes/api-router.js                    <--- post entry point, control reaches here, various api services are specified here 
---/services/<your-service>.js              <--- Your services should be placed here
---/controllers/<your-controller>.js        <---- You API definitions,business-logic, request validations has to be done here
 
```
