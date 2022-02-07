// Todas las interacciones con al database son hechas mediante funciones escritas en ./db

// Importo librerias
const express = require('express');

// Express router
const meetingsRouter = express.Router();

const { 
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase
} = require('./db');

// GET handler del router (to get an array of all meetings)
meetingsRouter.get('/', (req, res, next) => {
    // Busco a todas las meetings de la database
    const meetings = getAllFromDatabase('meetings');
    // Devuelvo a todas las meetings y mando un "status code 200"
    res.status(200).send(meetings); 
});

// POST handler del router (to create a new meeting and save it to the database.)
meetingsRouter.post('/', (req, res, next) => {
    // addToDatabase toma dos parametros: la database a la que agrego, 
    // el contenido de lo que agrego (creo una meeting de cero)
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
})

// DELETE handler del router (to delete all meetings from the database)
meetingsRouter.delete('/', (req, res, next) => {
    // deleteAllFromDatabase toma como parametro a la database de la que elimino todos sus elementos
    const deletedMeetings = deleteAllFromDatabase('meetings');
    res.sendStatus(204); // Devuelvo el codigo de eliminacion
});