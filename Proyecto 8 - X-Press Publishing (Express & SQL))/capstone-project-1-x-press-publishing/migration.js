// Importo librerias
const database = require('mime-db');
const sqlite3 = require('sqlite3');

// Voy a crear la tabla 'Artist'. Primero, creo el database
const db = new sqlite3.Database('./database.sqlite')

// Creo la tabla 'Artist'
db.run(`CREATE TABLE IF NOT EXISTS 'Artist' (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    biography TEXT NOT NULL,
    is_currently_employed INTEGER NOT NULL DEFAULT 1
)`)

// Corro 'node migration.js' y se crea el database con la tabla
// Abro el database con DB Browser y chequeo que la tabla 'Artist' este bien

//Creo la tabla 'Series'
db.run(`CREATE TABLE IF NOT EXISTS 'Series' (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
)`)

// Corro 'node migration.js' y se crea el database con la tabla
// Abro el database con DB Browser y chequeo que la tabla 'Series' este bien

//Creo la tabla 'Issue'
db.run(`CREATE TABLE IF NOT EXISTS 'Issue' (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    issue_number INTEGER NOT NULL,
    publication_date TEXT NOT NULL,
    artist_id NOT NULL,
    series_id NOT NULL,
    FOREIGN KEY(artist_id) REFERENCES Artist(id),
    FOREIGN KEY(series_id) REFERENCES Series(id)
)`)

// Corro 'node migration.js' y se crea el database con la tabla
// Abro el database con DB Browser y chequeo que la tabla 'Issue' este bien