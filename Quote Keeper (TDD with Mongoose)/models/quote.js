// models/quote.js
//El modelo no esta definido, asi que lo hago en este archivo

// Importo mongoose
const {mongoose} = require('../../database');

// Creo un Schema
const quoteSchema = new mongoose.Schema({
	  quote: String,
    attributed: String,
    source: String
})

// Compilo el Schema a un modelo
const Quote = mongoose.model(quoteSchema);

// Exporto el modelo
module.exports = Quote;