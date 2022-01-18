// Importo librerias
const express = require('express');
const sqlite3 = require('sqlite3');

// Express router
const artistsRouter = express.Router();

// Instancia de database.sqlite
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

// Our GET, PUT, and DELETE route paths will have an :artistId parameter. 
// Add a router param of artistId to the router.
artistsRouter.param('artistId', (req, res, next, artistId) => {
    // SQL query que devuelve el artista con dicho id
    db.get(`SELECT * FROM Artist WHERE id = ${artistId}`, (err, row) => {
        // Envio errores al middleware chain 
        if (err) {
            next(err);
        } 
        // Si se retorna un artista
        else if (row) {
            // Creo un objeto en la request que se llama artist y le asigno el artista que me dio la query
            req.artist = row; 
            next();
        } else {
            res.sendStatus(404); // No se encontro un artista con ese id
        }
    });
})



// GET handler del router
artistsRouter.get('/', (req, res, next) => {
    // Devuelvo todas las filas que cumplan con lo siguiente.
    // Me devuelve todos los artistas con laburo
    db.all("SELECT * FROM Artist WHERE is_currently_employed = 1", (err,row) => {
        if (err) {
            next(err);  // Se encarga el middleware 'errorhandler'
        }
        // Devuelvo a todos los artistas que cumplieron en formato JSON y mando un "status code 200"
        res.status(200).json({ artists: row }); 
    })
});

// GET handler del :artistId 
artistsRouter.get('/:artistId', (req, res, next) => {
    // El router param se encarga de la logica de este GET handler
    // Asi que aca solo me encargo de enviar la respuesta
    res.status(200).json({ artist: req.artist }) // Devuelvo el artista (que le asigne a req) como valor del objeto
});

// POST handler de / (si quiero anadir un artista)
artistsRouter.post('/', (req, res, next) => {
    // Si la request no lleva los campos obligatorios de la tabla, no se puede incluir
    const name = req.body.artist.name;
    const dateOfBirth = req.body.artist.dateOfBirth;
    const biography = req.body.artist.biography;
    // Si existe el campo empleado, y es 0, se devuelve 0. Si no, se devuelve 1 (valor default de la tabla)
    const isCurrentlyEmployed = req.body.artist === 0 ? 0 : 1;
    if (!name || !dateOfBirth || !biography) {
        return res.sendStatus(400);
    }

    // La query que tendra la request de agregar un artista
    const sqlQuery = `INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed)
                VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)`
    // Objeto con los datos del artista de la request
    const objectRequest = {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed
    }
    // Ejecuto la query a la database
    db.run(sqlQuery, objectRequest, function(error) {
        // Si hay un error...
        if (error) {
            next(error); // errorhandler middleware
        }
        // Si no hay, recupero al artista recien creado de la database y lo devuelvo como respuesta
        db.get(`SELECT * FROM Artist WHERE id = ${this.lastID}`, (err, row) => {
            res.status(201).json({ artist: row });
        })
        
    })
})

// PUT handler de /:artistId (ACTUALIZO LA INFO DE UN ARTISTA CON UN DETERMINADO ID)
artistsRouter.put('/:artistId', (req, res, next) => {
    // Nuevamente (como en el POST) chequeo que el cuerpo de la instruccion respete las restricciones de la tabla Artist
    // Si la request no lleva los campos obligatorios de la tabla, no se puede incluir
    const name = req.body.artist.name;
    const dateOfBirth = req.body.artist.dateOfBirth;
    const biography = req.body.artist.biography;
    // Si existe el campo empleado, y es 0, se devuelve 0. Si no, se devuelve 1 (valor default de la tabla)
    const isCurrentlyEmployed = req.body.artist === 0 ? 0 : 1;
    if (!name || !dateOfBirth || !biography) {
        return res.sendStatus(400);
    }

    // Contenido del Query en SQLite (actualizo al artista con MI ID)
    const sqlQuery = `UPDATE Artist SET name = $name, date_of_birth = $dateOfBirth, biography = $biography
                    is_currently_employed = $isCurrentlyEmployed WHERE Artist.id = $artistId`
    // Objeto con los datos del artista de la request
    const objectRequest = {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed,
        $artistId: req.params.artistId // Id de la request
    };

    db.run(sqlQuery, objectRequest, function(error) {
        // Si hay un error...
        if (error) {
            next(error); // errorhandler middleware
        }
        // Si no hay, recupero al artista recien creado de la database y lo devuelvo como respuesta
        db.get(`SELECT * FROM Artist WHERE id = ${this.lastID}`, (err, row) => {
            res.status(200).json({ artist: row });
        })
        
    });
});

// DELETE handler de /:artistId (ACTUALIZO LA INFO DE UN ARTISTA CON UN DETERMINADO ID)
artistsRouter.delete('/:artistId', (req, res, next) => {
    
})



// Lo exporto
module.exports = artistsRouter;