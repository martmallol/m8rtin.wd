// Importo librerias
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const morgan = require('morgan');

// Importo el router de Express
const apiRouter = require('./api/api')

// Creo una instancia de una Express app
const app = express();

// Creo el PORT donde va a escuchar mi servidor
const PORT = 4001 || process.env.PORT;

// Seteo el uso del body-parser JSON middleware 
app.use(bodyParser.json())
// Seteo el uso del cors middleware
app.use(cors());
// Seteo el uso del errorhandler middleware
app.use(errorhandler());
// Seteo el uso del morgan logging ('dev' setting )middleware
app.use(morgan('dev'));

// Mount del router
app.use('/api', apiRouter);

// Empiezo el servidor oyendo al PORT (para hacerlo, en la terminal uso 'node server')
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

// Exporto la Express app (para usarlo en el test file)
module.exports = app;