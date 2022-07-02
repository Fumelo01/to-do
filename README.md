 
 # **To-do**
 
---
![alt text](./public/image/lp.jpeg)

---
  
  
> **'/'** 
   >>Home page.                       `GET/`  
>  ---
> **'/todo'** 
   >>Create a Task.                   `POST/todo`  
   
     - to navigate pages, add the query ```?page=x```(replace 'x' with your preferred page of choice)
     - example => ```localhost:3000/todo/?page=2```  
      
   >>Fetch all existing Tasks.        `GET/todo`
  
   >> Fetch a single Task.            `GET/todo/:id` 
  
   >>Update an existing Task.         `PATCH/todo/:id`
  
   >>Delete a Task.                   `DELETE/book/:id`
    
---

 #### Dependency
> *mongoose*  , *express* 
  >>
     - After installing, from the root folder, run ```node ./src/index.js``` 
  
  
 
  
  ---
  
  
 #### Template for creating new tasks
  
  ``` 
  
  { 
  
    "title": "", 
  
    "description": ""
  
  } 
  
  ```  
---
