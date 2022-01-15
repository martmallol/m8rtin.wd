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

// Empiezo el servidor oyendo al PORT (para hacerlo, en la terminal uso 'node app')
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Exporto el server
module.exports = app;