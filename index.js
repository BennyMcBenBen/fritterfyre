const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const pony = require('./src/pony.js');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/foo', function(req, res) {
    res.send('Hello World!');
  })
  .use('/pony', pony)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

