// Importo librerias
const express = require('express');
const sqlite3 = require('sqlite3');

// Express router
const seriesRouter = express.Router();

// Instancia de database.sqlite
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

// GET handler
seriesRouter.get('/', (req, res, next) => {
    
})

// Lo exporto
module.exports = seriesRouter;