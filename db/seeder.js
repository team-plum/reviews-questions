const faker = require('faker');
const { db } = require('./index.js');

var getResID = `SELECT rID FROM Restaurants WHERE name = ?`;
var getQesID = `SELECT qID FROM Questions WHERE text = ?`;

for (var i = 0; i < 100; i++) {
  var restaurantName = faker.company.companyName();

  var insertResQuery = `INSERT INTO Restaurants (name) VALUES ('${restaurantName}')`;

  db.run(insertResQuery, (err, response) => {
    if (err) {
      console.log('Error inserting:', err);
    } else {
      console.log('successfully inserted restaurant');

      db.get(getResID, restaurantName, (err, data) => {
        if (err) {
          console.log('Error getting resID: ', err);
        } else {
          var questionCount = Math.floor(Math.random() * 5);

          for (var j = 0; j < questionCount; j++) {
            var question = faker.random.words() + '?';

            var insertResQuest = `INSERT INTO Questions (resID, text) VALUES ( '${
              data.rID
            }' , '${question}')`;

            db.run(insertResQuest, (err, response) => {
              if (err) {
                console.log('Error inserting restaurant question : ', err);
              } else {
                console.log('Restaurant Question Inserted ');

                db.get(getQesID, question, (err, dataQ) => {
                  if (err) {
                    console.log('Error getting question ID: ', err);
                  } else {
                    var answerCount = Math.floor(Math.random() * 5);

                    for (var k = 0; k < answerCount; k++) {
                      var answer = faker.random.words();
                      var insertQuesAns = `INSERT INTO Answers (aID, text) VALUES ('${
                        dataQ.qID
                      }' , '${answer}')`;

                      db.run(insertQuesAns, (err, response) => {
                        if (err) {
                          console.log(
                            'Error inserting Answer for question: ',
                            err
                          );
                        } else {
                          console.log('Answer for question inserted');
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        }
      });
    }
  });
}
