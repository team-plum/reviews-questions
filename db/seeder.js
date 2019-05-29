const faker = require('faker');
const { db } = require('./index.js');

let data = [];
let ques = [];

let insertRestaurants = new Promise((resolve, reject) => {
  //console.log('1');
  for (let i = 0; i < 100; i++) {
    let restaurantName = faker.company.companyName().replace(/\'/g, "''");
    let insertResQuery = `INSERT INTO Restaurants (name) VALUES ('${restaurantName}')`;

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
  for (let j = 0; j < 100; j++) {
    let resIndex = Math.floor(Math.random() * 101);
    if (data.indexOf(resIndex) === -1) {
      data.push(resIndex);
    }
  }
  resolve('Success picking indexes');
});

let populateQuestions = new Promise((resolve, reject) => {
  //console.log('3');
  for (let k = 0; k < data.length; k++) {
    ques.push(k);

    let questionCount = Math.floor(Math.random() * 5);
    let helpfulCount = Math.floor(Math.random() * 4);
    let time = JSON.stringify(faker.date.past(5));
    let avatar = faker.image.avatar();
    let name = faker.name.findName().replace(/\'/g, "''");

    for (let l = 0; l < questionCount; l++) {
      let question = faker.random.words() + '?'.replace(/\'/g, "''");
      let insertResQuest = `INSERT INTO Questions (resID, text, time, helpful, imgUrl , name) VALUES ('${
        data[k]
      }' , '${question}' , '${time}' , '${helpfulCount}' , '${avatar}' , '${name}')`;
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
  for (let m = 0; m < ques.length; m++) {
    if (ques[m] > 0) {
      let answerCount = Math.floor(Math.random() * 5);

      for (let n = 0; n < answerCount; n++) {
        let answer = JSON.stringify(faker.random.words());
        let aTime = JSON.stringify(faker.date.past(3));
        let aName = faker.name.findName().replace(/\'/g, "''");
        let aAvatar = faker.image.avatar();
        let starCount = Math.floor(Math.random() * 300);
        let friendCount = Math.floor(Math.random() * 50);

        let insertQuesAns = `INSERT INTO Answers (aID, text, name ,time, imgUrl, stars, friendCount) VALUES ('${
          ques[m]
        }' , '${answer}' , '${aName}' , '${aTime}' , '${aAvatar}', '${starCount}', '${friendCount}')`;

        db.run(insertQuesAns, err => {
          if (err) {
            console.log('Error inserting answer:', err);
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
