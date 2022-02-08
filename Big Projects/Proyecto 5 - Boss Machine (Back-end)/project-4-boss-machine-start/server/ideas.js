// Todas las interacciones con al database son hechas mediante funciones escritas en ./db

// Importo librerias
const express = require('express');

// Express router
const ideasRouter = express.Router();

const { 
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

// Our GET, PUT, and DELETE route paths will have an :ideaId parameter. 
// Add a router param of ideaId to the router.
ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    // SQL query que devuelve la idea con dicho id
    const idea = getFromDatabaseById('ideas', ideaId);
    // Si se retorna una idea
    if (idea) {
        // Creo un objeto en la request que se llama idea y le asigno la idea que me dio la query
        req.idea = idea;
        next();
    } else {
        res.sendStatus(404); // No se encontro un minion con ese id
    }
});

// GET handler del router (to get an array of all ideas)
ideasRouter.get('/', (req, res, next) => {
    // Busco a todas las ideas con id en la database
    const ideas = getAllFromDatabase('ideas');
    // Devuelvo a todas las ideas y mando un "status code 200"
    res.status(200).send(ideas); 
});

// GET handler del :ideaId (to get a single idea by id)
ideasRouter.get('/:ideaId', (req, res, next) => {
    // Devuelve la idea de la request
    res.status(200).send(req.idea);
});

// POST handler del router (to create a new idea and save it to the database)
minionsRouter.post('/', (req, res, next) => {
    // addToDatabase toma dos parametros: la database a la que agrego, 
    // el contenido de lo que agrego (el body de la request en este caso)
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// PUT handler de /:ideaId (to update a single idea by id)
minionsRouter.put('/:ideaId', (req, res, next) => {
    // updateInstanceInDatabase toma dos parametros: la database a la que actualizo, 
    // el contenido de lo que actualizo (el body de la request en este caso)
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(updatedIdea);
});

// DELETE handler de /:ideaId (to delete a single idea by id)
minionsRouter.delete('/:ideaId', (req, res, next) => {
    // deleteFromDatabasebyId toma dos parametros: la database a la que elimino un elemento, 
    // el id de la idea que voy a eliminar (el id de los parametros de la request en este caso)
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
        res.sendStatus(204); // Si la elimine
    } else {
        res.sendStatus(500); // Si no lo hice
    }
});

// Lo exporto al router
module.exports = ideasRouter;