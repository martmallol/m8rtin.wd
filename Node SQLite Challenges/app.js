const db = require('./db');

// 1- Using db.each(), select all the rows from a table from Flower. In the callback, check if the petal_color is ‘blue’ and console.log the row if it is.
db.each('SELECT * FROM Flower', (err, row) => {
  if (row.petal_color === 'blue') {
    console.log(row);
  }
});

// 2- Use db.run() to create a new empty table called City.
db.run("CREATE TABLE City");

// 3- SELECT the superpower column of the superhero in the Superhero table with an id of 12 and console.log() that superpower in the callback function. 
db.get("SELECT superpower FROM Superhero WHERE id=12", (error, row) => {
  console.log(row.superpower);
});

// 4- The query in the workspace is going to return an error! Log the error to the console if it exists, otherwise log the retrieved rows.
db.all('SELECT * from NonexistentTable', (err, rows) => {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});

// 5- Use db.each() to find the totalPrice if you bought every shirt from the Clothing database. Select the price from each row where item is 'shirt' and add 
//    the prices to totalPrice. Log totalPrice after they have all been added. Each row’s price property is already a number, so you do not need to use Number() to convert it.
let totalPrice = 0;

db.each(
  `SELECT price FROM Clothing WHERE item = 'shirt' `,
  (err, row) => {
    totalPrice += row.price;
  },
  (err, numRows) =>{
    console.log(totalPrice);
  }
);

// 6- Find a way to wrap the queries in the workspace so that they run synchronously.
db.serialize(() => 
{
  db.run('CREATE TABLE Popcorn (id INTEGER PRIMARY KEY, type TEXT)');
  db.run('INSERT INTO POPCORN (type) VALUES ("cheddar")');
  db.run('INSERT INTO POPCORN (type) VALUES ("kettle corn")');
})

// 7- Find and print the quantity column of the spice 'paprika' in a table called SpiceRack based on its name. names are unique, so you only need to retrieve one row.
db.get("SELECT quantity FROM SpiceRack WHERE name='paprika'", (err, row) => {
  console.log(row.quantity);
});

// 8-