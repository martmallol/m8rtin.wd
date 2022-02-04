# Quote Keeper: Model Layer

### What I worked on
I only uploaded the files I worked with, not the entire environment. The files you see in this directory are the ones I put some code on. As for mongoose, I made some Schemas, a model. Meanwhile, regarding testing, I made 3 different tests, and the hooks that go with them aswell.

### Codecademy Explanation
In this project, you will be completing the test suite for the Quote Keeper application. The suite currently has feature and server tests to verify that a user can enter quote information, post it to the server, and view the information in the returned webpage. Those tests are passing, but the app doesn’t organize and store the quote data anywhere.

To test-drive that functionality, we’ve added one failing server test. It will push you to the model layer, where you will begin the red, green, refactor cycle, setting up a database and defining a model using MongoDB, Node’s Mongoose package, and the Chai assertion module.

Your suite will test code at every level of your application. When you write code in a new file, remember to import it to every layer so that your tests have access to it.