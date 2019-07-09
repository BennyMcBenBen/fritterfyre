const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res, next) {
  let randomColor = () => '#'+((1<<24)*Math.random()|0).toString(16);
  let lightenDarkenColor = (col, amt) => {
    let usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
    const num = parseInt(col,16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    let g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  };
  let randomName = () => {
    let randomNameFromFile = (filename) => {
      const names = fs.readFileSync(filename).toString().split("\n");
      return names[Math.floor(Math.random() * names.length)];
    };
    const givenName = randomNameFromFile(path.join(__dirname, '../public/names-start.txt'));
    const familyName = randomNameFromFile(path.join(__dirname, '../public/names-end.txt'));
    return `${givenName} ${familyName}`;
  };
  const body = randomColor();
  const bodyDarker = lightenDarkenColor(body, -20);
  const hair = randomColor();
  const hairLighter = lightenDarkenColor(hair, 20);
  const ponyName = randomName();
  // TODO change cutie mark
  // TODO more pony images? unicorn? pegasus? etc.
  const svg = fs.readFileSync(path.join(__dirname, '../public/pony.svg'), 'utf8')
      .replace(new RegExp('#F791F6', 'gi'), body)
      .replace(new RegExp('#C76CCD', 'gi'), bodyDarker)
      .replace(new RegExp('#6D2AB7', 'gi'), hair)
      .replace(new RegExp('#A85EE0', 'gi'), hairLighter)
      .replace(new RegExp('Fritterfyre', 'gi'), ponyName);
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
        <script type="text/javascript">
          function download() {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:image/svg+xml;base64,' + btoa('${svg.replace(/\n/g, "")}'));
            element.setAttribute('download', '${ponyName}.svg');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }
        </script>
      </head>
      <body>
        <div>
          <button onclick="download();">Download</button>
          <button onclick="window.location.reload();">Refresh</button>
        </div>
        <h1>${ponyName}</h1>
        <div class="container">
          ${svg}
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

module.exports = router;
