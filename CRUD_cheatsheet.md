# CRUD Cheatsheet

### CRUD Practice Questions
For each CRUD operation, write out answers to the following questions:

+ What routes would you need to implement to provide your workout class model with this CRUD functionality and what are their corresponding HTTP verbs?
+ What effect would each route have on the database?
+ What response body would each route return?
+ What response code would each route return?

### CRUD Practice Answers
1. **Create**
   **Route**: POST /classes
   **Effect on Database**: Adds the class provided in the request body to the database
   **Response Body**: `{ "class": The Newly-Created Class }`
   **Success Response Code**: 201

2. **Read (All Classes)**
   **Route**: GET /classes
   **Effect on Database**: None
   **Response Body**: `{ "classes": [ Array of All Saved Classess ] }`
   **Success Response Code**: 200

3. **Read (One Class)**
   **Route**: GET /classes/:id
   **Effect on Database**: None
   **Response Body**: `{ "class": The class with the specified ID }`
   **Success Response Code**: 200

4. **Update**
   **Route**: PUT /classes/:id
   **Effect on Database**: Updates the class with the specified ID to have the class information provided in the request body
   **Response Body**: `{ "class": The updated class now saved in the database }`
   **Success Response Code**: 200

5. **Delete**
   **Route**: DELETE /classes/:id
   **Effect on Database**: Removes the class with the specified ID from the database
   **Response Body**: None
   **Success Response Code**: 204