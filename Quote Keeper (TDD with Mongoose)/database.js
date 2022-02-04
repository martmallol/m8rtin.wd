// database.js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const databaseUrl = process.env.DATABASE_URL || `mongodb://localhost/quote-keeper_${env}`;
const options= {
  useMongoClient: true,
};

// Los hooks que voy a usar en el testeo, los declaro aca y defino aca como funciones
const connectAndDrop = async () => {
  // Conecta a la database
  await mongoose.connect(databaseUrl, options);
  // Elimina la data existente para que no haya 'overlapping' de info
  await mongoose.connection.db.dropDatabase(); 
};

const disconnect = async () => {
  // Se desconecta de la database
  await mongoose.disconnect();
};

// Exporto mis hooks
module.exports = {
  mongoose,
  databaseUrl,
  options,
  connectAndDrop,
  disconnect
};


