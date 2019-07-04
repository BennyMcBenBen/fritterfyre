const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/svg', function (req, res, next) {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, '../public/node.svg'));
});

module.exports = router;
