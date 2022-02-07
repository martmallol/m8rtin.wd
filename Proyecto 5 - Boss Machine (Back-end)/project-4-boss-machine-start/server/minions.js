// Todas las interacciones con al database son hechas mediante funciones escritas en ./db

// Importo librerias
const express = require('express');

// Express router
const minionsRouter = express.Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

// Our GET, PUT, and DELETE route paths will have an :minionId parameter. 
// Add a router param of minionId to the router.
minionsRouter.param('minionId', (req, res, next, minionId) => {
    // SQL query que devuelve el minion con dicho id
    const minion = getFromDatabaseById('minions', minionId);
    // Si se retorna un minion
    if (minion) {
        // Creo un objeto en la request que se llama minion y le asigno el minion que me dio la query
        req.minion = minion;
        next();
    } else {
        res.sendStatus(404); // No se encontro un minion con ese id
    }
});

// GET handler del router (to get an array of all minions)
minionsRouter.get('/', (req, res, next) => {
    // Busco a todos los minions con id en la database
    const minions = getAllFromDatabase('minions');
    // Devuelvo a todos los minions y mando un "status code 200"
    res.status(200).send(minions); 
});

// GET handler del :minionId (to get a single minion by id)
minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(req.minion);
});

// POST handler del router (to create a new minion and save it to the database.)
minionsRouter.post('/', (req, res, next) => {
    // addToDatabase toma dos parametros: la database a la que agrego, 
    // el contenido de lo que agrego (el body de la request en este caso)
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

// PUT handler de /:minionId (to update a single minion by id.)
minionsRouter.put('/:minionId', (req, res, next) => {
    // updateInstanceInDatabase toma dos parametros: la database a la que actualizo, 
    // el contenido de lo que actualizo (el body de la request en este caso)
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updatedMinion);
});

// DELETE handler de /:minionId (to delete a single minion by id)
minionsRouter.delete('/:minionId', (req, res, next) => {
    // deleteFromDatabasebyId toma dos parametros: la database a la que elimino un elemento, 
    // el id del minion que voy a eliminar (el id de los parametros de la request en este caso)
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deletedMinion) {
        res.sendStatus(204); // Si lo elimine
    } else {
        res.sendStatus(500); // Si no lo hice
    }
});

// Lo exporto al router
module.exports = minionsRouter;