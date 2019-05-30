const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getQandA } = require('../db/controllers.js');

const app = express();
const PORT = 3009;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));
app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/questions/:num', (req, res) => {
  //Assuming that :num is a Number
  let resID = req.params.num;

  getQandA(resID, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
