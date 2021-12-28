// Require the 'express' package and save it to a variable named express. Then, create an Express instance and save it to a variable called app.
const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const sausageTypes = ['bratwurst', 'andouille', 'chorizo', 'boudin', 'kielbasa'];

// Write a GET /sausages route that sends back the whole sausageTypes array.
app.get('/sausages', (req, res, next) => {
  res.send(sausageTypes);
})

// Start your server listening on the port defined by the PORT variable.
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});