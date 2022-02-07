// Walkthrough del proyecto: https://www.youtube.com/watch?v=7ITfaw7BRKk

// Antes que nada utilizo 'npm install express' para instalar express
// Lo importo y guardo una instancia del 'servidor express' en 'app'
const express = require('express');
const app = express();
// Hago 'npm install body-parser' y 'npm install morgan' y los requiero
const bodyParser = require('body-parser');
const morgan = require('morgan');
//Importo mi SQLite database
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

// Creo el port
const PORT = process.env.PORT || 4001;

// (parse application/json) Uso el metodo json para parsear JSON bodies
app.use(bodyParser.json());
// Uso el metodo 'dev' de morgan para loggear middleware
app.use(morgan('dev'));
// Le sirvo esto al sitio
app.use(express.static('public'));

// Implemento GET STRIPS

// Nueva route. Hago el get handler de un array de todas las strips de la Strip table
app.get('/strips', (req, res, next) => {
	  db.all(`SELECT * FROM Strip`, (err, rows) => {
      // Si hay un error
      if (err) {
        res.sendStatus(500);
      } 
      // Si no
      else {
        res.send( { strips: rows } );
      }
    })
});
// Despues de este get handler, ahora puedo recuperar los scripts que esten guardados en la database ('a great day', 'cosmic jokes', hechos en seed.js)

// Implemento CREATE STRIP (POST REQUEST)

// Las condiciones que debe tener un post request
const validateStrip = (req, res, next) => {
  const stripToCreate = req.body.strip;
  if (!stripToCreate.head || !stripToCreate.body || !stripToCreate.bubbleType || !stripToCreate.background) {
        return res.sendStatus(400) // Si no cumple con lo minimo indispensable de la tabla, tira error
      }
      next();
}

// Hago el post handler de un strip y lo valido. Si es invalido, devuelvo una response 400
app.post('/strips', validateStrip, (req, res, next) => {
  const stripToCreate = req.body.strip;
  // Inserto dentro del database un nuevo strip
  db.run(
    "INSERT INTO Strip (head, body, bubble_type, background, bubble_text, caption) VALUES ($head, $body, $bubbleType, $background, $bubbleText, $caption) "), 
    {
      $head: stripToCreate.head, 
      $body: stripToCreate.body,  
      $bubbleType: stripToCreate.bubbleType,
      $background: stripToCreate.background,  
      $bubbleText: stripToCreate.bubbleText, 
      $caption: stripToCreate.caption
    },
    // Por que no arrow function?
    function(err) {
      if (err) {
        // Si hay un error en la insercion, devuelvo un status 500
        return res.sendStatus(500);
      } else {
        // Si no hay un error en la insercion, obtengo la fila y mando un status 201 y el strip creado con la request
        db.get(`SELECT * FROM Strip WHERE id = ${this.lastID}`, (err, row) => {
          if (!row) {
            return res.sendStatus(500);
          } else {
            res.status(201).send( { strip: row } )
          }
        })
      }
    }
})

// ESCUCHO AL SERVER

// Empiezo el servidor oyendo al PORT (para hacerlo, en la terminal uso 'node app')
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Exporto el server
module.exports = app;