const faker = require('faker');
const { db } = require('./index.js');

let data = [];
let ques = [];

let insertRestaurants = new Promise((resolve, reject) => {
  //console.log('1');
  for (var i = 0; i < 100; i++) {
    var restaurantName = faker.company.companyName();
    var insertResQuery = `INSERT INTO Restaurants (name) VALUES ("${restaurantName}")`;

    db.run(insertResQuery, err => {
      if (err) {
        reject(err);
      } else {
        resolve('Restaurants Created');
      }
    });
  }
});

let pickRestaurants = new Promise((resolve, reject) => {
  // console.log('2');
  for (var j = 0; j < 100; j++) {
    var resIndex = Math.floor(Math.random() * 101);
    if (data.indexOf(resIndex) === -1) {
      data.push(resIndex);
    }
  }
  resolve('Success picking indexes');
});

let populateQuestions = new Promise((resolve, reject) => {
  //console.log('3');
  for (var k = 0; k < data.length; k++) {
    ques.push(k);

    let questionCount = Math.floor(Math.random() * 5);

    for (var l = 0; l < questionCount; l++) {
      var question = JSON.stringify(faker.random.words() + '?');
      var insertResQuest = `INSERT INTO Questions (resID, text) VALUES ('${
        data[k]
      }' , '${question}')`;
      db.run(insertResQuest, err => {
        if (err) {
          console.log('Error inserting question: ');
          reject(err);
        } else {
          resolve('Question successfully inserted');
        }
      });
    }
  }
});

let pickQuestions = new Promise((resolve, reject) => {
  for (var m = 0; m < ques.length; m++) {
    if (ques[m] > 0) {
      let answerCount = Math.floor(Math.random() * 5);

      for (var n = 0; n < answerCount; n++) {
        var answer = JSON.stringify(faker.random.words());
        var insertQuesAns = `INSERT INTO Answers (aID, text) VALUES ('${
          ques[m]
        }' , '${answer}')`;

        db.run(insertQuesAns, err => {
          if (err) {
            console.log('ERROR ', err);
            reject(err);
          } else {
            resolve('SUCCESS');
          }
        });
      }
    }
  }
});

insertRestaurants
  .then(pickRestaurants)
  .then(populateQuestions)
  .then(pickQuestions)
  .then(console.log('COMPLETED SEEDING'))
  .catch(err => {
    console.log(err);
  });
