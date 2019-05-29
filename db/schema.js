const { db } = require('./index.js');

// Run this file as a node script to create sqlite tables || use npm script found in package.json

// TODO: Refacor schema and visualization to include an image/name/star count for every question/Answer

// Schema visualization here: https://imgur.com/a/CgMAt7O

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

db.run(createRestaurants, (err, response) => {
  if (err) {
    console.log('ERROR: ', err);
  } else {
    console.log('Restaurants Table Created');
  }
});

db.run(createQuestions, (err, response) => {
  if (err) {
    console.log('ERROR: ', err);
  } else {
    console.log('Questions Table Created');
  }
});

db.run(createAnswers, (err, response) => {
  if (err) {
    console.log('ERROR: ', err);
  } else {
    console.log('Answers Table Created');
  }
});
