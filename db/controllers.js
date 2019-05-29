const { db } = require('./index.js');

//Un-comment console.logs for debugging use

// TODO:
// SQLite Function that with given an id for a given restaurant, returns all of a restaurants given  questions and answers
// Pre: Integer(Res)
// Post: Object
function getQandA(id, callback) {
  let results = {};
  results['name'] = '';
  results['questions'] = [];
  results['answers'] = [];
  let ids = '';
  let resIdQuery = 'SELECT Name FROM Restaurants WHERE rID = ?';

  db.get(resIdQuery, [id], (err, data) => {
    if (err) {
      console.log(
        'There was an error in attempting to query database for restaurantName based on the resID: ',
        err
      );
      callback(err);
    } else {
      //console.log('Obtained Restaurant Name : ', data.Name);
      results['name'] = data.Name;
      db.serialize(() => {
        db.serialize(() => {
          let quesIdQuery = 'SELECT qID, text FROM Questions WHERE resID = ?';
          db.all(quesIdQuery, [id], (err, data) => {
            if (err) {
              console.log(
                'There was an error in attempting to query database for questions based on the redID: ',
                err
              );
              callback(err);
            } else {
              data.forEach(item => {
                ids += item.qID + ',';
                results['questions'].push(item);
              });
              // Remove trailing comma in ids string
              ids = ids.replace(/(^\s*,)|(,\s*$)/g, '');

              //console.log(ids);

              let ansIdQuery = `SELECT aId , text FROM ANSWERS WHERE aID in (${ids})`;
              db.all(ansIdQuery, (err, data) => {
                if (err) {
                  console.log(
                    'There was an error in attempting to query database for answers based on questioniDs: ',
                    err
                  );
                  callback(err);
                } else {
                  //console.log(data)
                  data.forEach(item => {
                    results.answers.push(item);
                  });

                  callback(null, results);
                }
              });
            }
          });
        });
      });
    }
  });
}

module.exports = { getQandA };
