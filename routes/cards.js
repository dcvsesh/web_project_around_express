const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  return fs.readFile(
    path.join(__dirname, '../data/cards.json'),
    'utf-8',
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const cards = JSON.parse(data);
      res.send(cards)
    }
  );
});

module.exports = router;
