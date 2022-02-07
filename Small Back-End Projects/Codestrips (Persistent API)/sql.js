// Importo sqlite3
const sqlite3 = require('sqlite3');
// Creo una nueva database llamada 'db.sqlite'
const db = new sqlite3.Database('./db.sqlite');

// Creo una tabla llamada Strip
db.serialize(
  db.run("DROP TABLE IF EXISTS Strip"),
  db.run(`CREATE TABLE Strip ( 
          id INTEGER PRIMARY KEY, 
          head TEXT NOT NULL, 
          body TEXT NOT NULL,
          background TEXT NOT NULL,
          bubble_type TEXT NOT NULL,
          bubble_text TEXT NOT NULL DEFAULT '',
          caption TEXT NOT NULL DEFAULT ''
      )`)
);

// After creating the database, you can add two test strips to the database by running node seed.js