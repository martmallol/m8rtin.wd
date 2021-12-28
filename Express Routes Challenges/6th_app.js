const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const puddingFlavors = ['chocolate', 'banana', 'butterscotch', 'pistachio'];

const findPuddingIndex = (name) => {
  return puddingFlavors.indexOf(name);
}

const deletePuddingAtIndex = (index) => {
  puddingFlavors.splice(index, 1);
}

// Write a route to handle DELETE requests to /puddings/:flavor. 
// It should delete the correct pudding and send a 204 response if the pudding name exists 
// and send a 404 response if it does not.
app.delete('/puddings/:flavor', (req, res, next) => {
  const index = findPuddingIndex(req.params.flavor);
  if(index !== -1){
    deletePuddingAtIndex(index);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});