// Importo librerias
const express = require('express');
const sqlite3 = require('sqlite3');

// Express router
//Since you’ll need to access information about the specified series from the 
// issues router, you’ll need to merge parameters. You'll need to add the 
// approporiate parameter to your issue router instantiation to enable merging parameters.
const issuesRouter = express.Router({mergeParams: true});

// Instancia de database.sqlite
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

// Anado el router param que se va a encargar del parametro 'issueId'
issueRouter.param('issueId', (req, res, next, issueId) => {
    // SQL query que devuelve la issue con dicho id
    db.get(`SELECT * FROM Issue WHERE Issue.id = ${issueId}`, (err, row) => {
        // Envio errores al middleware chain 
        if (err) {
            next(err);
        } 
        // Si se retorna una issue
        else if (row) {
            // Creo un objeto en la request que se llama issue y le asigno la issue que me dio la query
            req.issue = row; 
            next();
        } else {
            res.sendStatus(404); // No se encontro una serie con ese id
        }
    });
})

// GET handler (devuelve todas las issues de la database de determinada serie)
issuesRouter.get('/', (req, res, next) => {
    db.all("SELECT * FROM Issue WhHERE Issue.series_id = $seriesId", 
    { $seriesId: req.params.seriesId }, 
    (err, series) => {
        if (err) {
            next(err); // Si hay un error, se encarga el middleware 'errorhandler'
        } else {
            // Devuelve todas las filas de la tabla de Issue
            res.status(200).json({ series: series });
        }
    })
})

// POST handler de / (si quiero anadir una issue)
issuesRouter.post('/', (req, res, next) => {
    // Si la request no lleva los campos obligatorios de la tabla, no se puede incluir
    const name = req.body.issue.name;
    const issueNumber = req.body.issue.issueNumber;
    const publicationDate = req.body.issue.publicationDate;
    const artistId = req.body.issue.artistId;

    // La query para escoger al artista 
    const artistSql = `SELECT * FROM Artist WHERE Artist.id = $artistId`
    const artistValues = { $artistId: artistId };
    
    db.get(artistSql, artistValues, (error, artist) => {
        if (error) {
            next(error);
        } else {
            if(!name || !issueNumber || !publicationDate || !artistId ) {
                // Si no se cumple con los requerimientos basicos de la tabla
                return res.sendStatus(400); 
            }

            const sqlQuery = `INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id)
                            VALUES ($name, $issueNumber, $publicationDate, $artistId, $seriesId)`
            const objectRequest = {
                $name: name, 
                $issueNumber: issueNumber, 
                $publicationDate: publicationDate, 
                $artistId: artistId, 
                $seriesId: req.params.seriesId
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
        }
    })
})

// PUT handler de /:issueId (ACTUALIZO LA INFO DE UNA ISSUE CON UN DETERMINADO ID)
issuesRouter.put('/:issueId ', (req, res, next) => {
    // Nuevamente (como en el POST) chequeo que el cuerpo de la instruccion respete las restricciones de la tabla Series
    // Si la request no lleva los campos obligatorios de la tabla, no se puede incluir
    const name = req.body.issue.name;
    const issueNumber = req.body.issue.issueNumber;
    const publicationDate = req.body.issue.publicationDate;
    const artistId = req.body.issue.artistId;
    
    // La query para escoger al artista 
    const artistSql = `SELECT * FROM Artist WHERE Artist.id = $artistId`
    const artistValues = { $artistId: artistId };

    db.get(artistSql, artistValues, (error, artist) => {
        if(error) {
            next(error); // errorhandler middleware
        } else {
            if(!name || !issueNumber || !publicationDate || !artist ) {
                return res.sendStatus(400); 
            }
            const sql = `UPDATE Issue SET name = $name, issue_number = $issueNumber, publication_date = $publicationDate,
            artist_id = $artistId WHERE Issue.id = $issueId`;
            const objectValues = {
                $name: name,
                $issueNumber: issueNumber,
                $publicationDate: publicationDate,
                $artistId: artistId,
                $issueId: req.params.issueId
            }

            db.run(sql, values, function(error) {
                if(error) {
                    next(error); // Se encarga el middleware 'errorhandler'
                } else {
                    db.get(`SELECT * FROM Issue WHERE Issue.id = ${req.params.issueId}`,
                    (error, issue) => {
                        res.status(201).json({ issue: issue });
                    })
                }
            });
        }
    });
    
});

// DELETE handler de /:issueId (ELIMINO LA INFO DE UNA ISSUE CON UN DETERMINADO ID)
issuesRouter.delete('/:issueId', (req, res, next) => {
    const sqlQuery = `DELETE FROM Issue WHERE Issue.id = $issueId`
    const objectQuery = { $issueId: req.params.issueId};

    db.run(sqlQuery, objectQuery, function (error) {
        // Si hay un error...
        if (error) {
            next(error); // errorhandler middleware
        } else {
            res.sendStatus(204);
        }
        
    })
})

module.exports = issuesRouter;