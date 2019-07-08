const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/svg', function (req, res, next) {
  const svg = fs.readFileSync(path.join(__dirname, '../public/pony.svg'), 'utf8')
    .replace(new RegExp('#F791F6', 'gi'), '#'+((1<<24)*Math.random()|0).toString(16));
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

router.get('/name', function (req, res, next) {
  // TODO randomize name. maybe fold this into the svg via a title element
  res.send('Fritterfyre')
});

router.get('/', function (req, res, next) {
  // TODO implement SVG download
  // TODO randomize name
  // TODO change leg color too
  // TODO change cutie mark
  // TODO more pony images? unicorn? pegasus? etc.
  const svg = fs.readFileSync(path.join(__dirname, '../public/pony.svg'), 'utf8')
      .replace(new RegExp('#F791F6', 'gi'), '#'+((1<<24)*Math.random()|0).toString(16));
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Fritterfyre</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
          body {
            text-align: center;
            margin: auto auto 10px;
          }
          .container {
            height: 0;
            width: 100%;
            padding-top: 90%;
            position: relative;
          }
          svg {
            position: absolute;
            top: 0;
            left: 0;
          }
        </style>
      </head>
      <body>
        <h1>Fritterfyre</h1>
        <div class="container">
          ${svg}
        </div>
        <button>Download</button>
      </body>
    </html>
  `;
  res.send(html);
});

module.exports = router;
