const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.resolve(__dirname, 'FEC');
// const db = new sqlite.Database(dbPath);

const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

module.exports.db = db;
