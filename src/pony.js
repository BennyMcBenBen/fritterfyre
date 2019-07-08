// TODO add hot deploy
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/svg', function (req, res, next) {
  // TODO use a pony image
  var svg = fs.readFileSync(path.join(__dirname, '../public/node.svg'), 'utf8')
    .replace(new RegExp('#8CC84B', 'g'), '#'+((1<<24)*Math.random()|0).toString(16));
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

router.get('/name', function (req, res, next) {
  // TODO randomize name. maybe fold this into the svg via a title element
  res.send('Fritterfyre')
});

module.exports = router;
