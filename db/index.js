const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('FEC', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

const createRestaurants = `CREATE TABLE Restaurants (
  rID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name VARCHAR NOT NULL DEFAULT 'NULL'
)`;

const createQuestions = `CREATE TABLE Questions (
  qID INTEGER PRIMARY KEY AUTOINCREMENT ,
  text VARCHAR NOT NULL DEFAULT NULL,
  resID INT NOT NULL DEFAULT NULL,
  FOREIGN KEY (resID) REFERENCES Restaurants (rID))`;

const createAnswers = `CREATE TABLE Answers (
  aID INTEGER,
  text VARCHAR NOT NULL DEFAULT NULL,
  FOREIGN KEY (aID) REFERENCES Questions (qID))`;

// db.run(createRestaurants, (err, response) => {
//   if (err) {
//     console.log('ERROR: ', err);
//   } else {
//     console.log('Restaurants Table Created');
//   }
// });

// db.run(createQuestions, (err, response) => {
//   if (err) {
//     console.log('ERROR: ', err);
//   } else {
//     console.log('Questions Table Created');
//   }
// });

// db.run(createAnswers, (err, response) => {
//   if (err) {
//     console.log('ERROR: ', err);
//   } else {
//     console.log('Answers Table Created');
//   }
// });

module.exports.db = db;
