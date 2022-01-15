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
});

// 7- Find and print the quantity column of the spice 'paprika' in a table called SpiceRack based on its name. names are unique, so you only need to retrieve one row.
db.get("SELECT quantity FROM SpiceRack WHERE name='paprika'", (err, row) => {
  console.log(row.quantity);
});

// 8- Use the genre parameter in the function to find the title of every song in the Song database matching the genre.
const selectByGenre = genre => {
  db.all("SELECT title FROM Song WHERE genre = $genre", 
          {
            $genre: genre
          },
          (error, row) => {})
};

// 9- Use db.all() to find every scientist from the Scientist table whose field is 'biology' and select all columns. Log the list to the console.
db.all("SELECT * From Scientist WHERE field = 'biology'", (error, row) => {
  console.log(row);
});

// 10- Use db.each() to print the height of every character from the CartoonCharacter database where the species is 'mouse'.
db.each("SELECT height FROM CartoonCharacter WHERE species = 'mouse'", (error, row) => {
  console.log(row.height);
});

// 11- Drop the table Furniture if it exists, then create it again (in that order). Don’t worry about defining a schema for Furniture when you create it.
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Furniture;");
  db.run("CREATE TABLE Furniture");
});

// 12- Write a function called logCaffeineLevel that takes the name of a tea and logs its caffeine_level from the Tea table.
const logCaffeineLevel = (name) => {
  db.get("SELECT * FROM Tea WHERE name = $name", 
  { $name: name },
  (err, row) => {
    console.log(row.caffeine_level);
  });
};

// 13- Insert a new bridge into the Bridge table, with the name Brooklyn Bridge and with an established_year value of 1883.
db.run("INSERT INTO Bridge (name, established_year) VALUES ('Brooklyn Bridge', 1883)");

// 14- You want to know the number of people per month that go through the same train station as you use for your commute. 
//     Get the traffic property from the TrainStation table where the station_id is 38 and the month is the current month.
db.get("SELECT traffic FROM TrainStation WHERE station_id = 38 AND month = 'January'", (err, row) => {
  console.log(row.traffic);
});

// 15- Use the parameter to find the number_of_floors column from the Building table at the user-given address.
const logFloorsForAddress = address => {
  // Your code here:
  db.get("SELECT number_of_floors FROM Building WHERE address = $address", { $address: address }, 
  (err, row) => {
    console.log(row.number_of_floors);
  })
};

// 16- Add a row to the BirdOfParadise table with scientific_name Cicinnurus regius and with king bird-of-paradise as its common_name
db.run("INSERT INTO BirdOfParadise (scientific_name, common_name) VALUES  ('Cicinnurus regius', 'king bird-of-paradise')");

// 17- Complete the addMovie function to inserts a movie into the Movie table with columns named title, publication_year, and director. 
//     Use the style of placeholders using named parameter and an object as the second argument of db.run().
const addMovie = (title, publicationYear, director) => {
  db.run("INSERT INTO Movie (title, publication_year, director) VALUES ($title, $publicationYear, $director)", 
  { $title: title,
    $publicationYear: publicationYear,
    $director: director
  })
};

// 18- Use db.each() to list all of the beverage names that have 'soda' as their type from the Minifridge table.
db.each("SELECT * FROM Minifridge WHERE type = 'soda'", (err, row) => {
  console.log(row.name);
});

// 19- Take the day off! Add a new holiday to the Holiday database. Set the name attribute to any name you like and set work to false.
db.run("INSERT INTO Holiday (name, work) VALUES ('Christmas', false)");