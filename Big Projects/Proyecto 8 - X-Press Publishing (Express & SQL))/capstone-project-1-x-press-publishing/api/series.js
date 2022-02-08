// Importo librerias
const express = require('express');
const sqlite3 = require('sqlite3');

// Express router
const seriesRouter = express.Router();

// Instancia de database.sqlite
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

// Anado el router param que se va a encargar del parametro 'seriesId'
seriesRouter.param('seriesId', (req, res, next, seriesId) => {
    // SQL query que devuelve la serie con dicho id
    db.get(`SELECT * FROM Series WHERE Series.id = ${seriesId}`, (err, row) => {
        // Envio errores al middleware chain 
        if (err) {
            next(err);
        } 
        // Si se retorna una serie
        else if (row) {
            // Creo un objeto en la request que se llama series y le asigno la serie que me dio la query
            req.series = row; 
            next();
        } else {
            res.sendStatus(404); // No se encontro una serie con ese id
        }
    });
})

// GET handler (devuelve todas las series de la database)
seriesRouter.get('/', (req, res, next) => {
    db.all("SELECT * FROM Series", (err, series) => {
        if (err) {
            next(err); // Si hay un error, se encarga el middleware 'errorhandler'
        } else {
            // Devuelve todas las filas de la tabla de series
            res.status(200).json({ series: series });
        }
    })
})

// GET handler del :seriesId 
seriesRouter.get('/:seriesId', (req, res, next) => {
    // El router param se encarga de la logica de este GET handler
    // Asi que aca solo me encargo de enviar la respuesta
    res.status(200).json({ series: req.series }) // Devuelvo la serie (que le asigne a req) como valor del objeto
});

// POST handler de / (si quiero anadir una serie)
seriesRouter.post('/', (req, res, next) => {
    // Si la request no lleva los campos obligatorios de la tabla, no se puede incluir
    const name = req.body.series.name;
    const description = req.body.series.description;
    if (!name || !description) {
        // Si no se cumple con los requerimientos basicos de la tabla
        return res.sendStatus(400); 
    }

    // La query que tendra la request de agregar una serie
    const sqlQuery = `INSERT INTO Series (name, description)
                VALUES ($name, $description)`
    // Objeto con los datos del artista de la request
    const objectRequest = {
        $name: name,
        $description: description
    }
    // Ejecuto la query a la database
    db.run(sqlQuery, objectRequest, function(error) {
        // Si hay un error...
        if (error) {
            next(error); // errorhandler middleware
        }
        // Si no hay, recupero la serie recien creada de la database y la devuelvo como respuesta
        db.get(`SELECT * FROM Series WHERE Series.id = ${this.lastID}`, (err, row) => {
            res.status(201).json({ series: row });
        })
        
    })
})

// PUT handler de /:seriesId (ACTUALIZO LA INFO DE UNA SERIE CON UN DETERMINADO ID)
seriesRouter.put('/:seriesId', (req, res, next) => {
    // Nuevamente (como en el POST) chequeo que el cuerpo de la instruccion respete las restricciones de la tabla Series
    // Si la request no lleva los campos obligatorios de la tabla, no se puede incluir
    const name = req.body.series.name;
    const description = req.body.series.description;
    if (!name || !description) {
        // Si no se cumple con los requerimientos basicos de la tabla
        return res.sendStatus(400);
    }

    // Contenido del Query en SQLite (actualizo a la serie con MI ID)
    const sqlQuery = `UPDATE Series SET name = $name, description = $description
                    WHERE Series.id = $seriesId`
    // Objeto con los datos de la serie de la request
    const objectRequest = {
        $name: name,
        $description: description,
        $seriesId: req.params.seriesId // Id de la request
    };

    db.run(sqlQuery, objectRequest, function(error) {
        // Si hay un error...
        if (error) {
            next(error); // errorhandler middleware
        }
        // Si no hay, recupero al artista recien creado de la database y lo devuelvo como respuesta
        db.get(`SELECT * FROM Series WHERE Series.id = ${this.lastID}`, (err, row) => {
            res.status(200).json({ series: row });
        })
        
    });
});

// DELETE handler de /:seriesId (ELIMINO LA INFO DE UNA SERIE CON UN DETERMINADO ID)
seriesRouter.delete('/:seriesId', (req, res, next) => {
    const sqlQuery = `SELECT * FROM Issue WHERE Issue.series_id = $seriesId`
    const objectQuery = { $seriesId: req.params.seriesId};

    db.get(sqlQuery, objectQuery, (error, issue) => {
        // Si hay un error...
        if (error) {
            next(error); // errorhandler middleware
        } else if (issue) {
            res.sendStatus(400);
        } else {
            const deleteSql = `DELETE FROM Series WHERE Series.id = $seriesId`;
            const objectDelete = { $seriesId: req.params.seriesId};

            db.run(deleteSql, objectDelete, (error) => {
                if (error) {
                    next(error);
                } else {
                    res.sendStatus(204);
                }
            })
        }       
    })
})


// Lo exporto
module.exports = seriesRouter;