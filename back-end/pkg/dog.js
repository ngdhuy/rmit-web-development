const express = require('express');
const router = express.Router();

//? define middleware to log request information
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
}

router.use(timeLog);

router.get('/', (req, res) => {
    res.send('Dog Homepage');
});

router.get('/about', (req, res) => {
    res.send('About Dog');
});

module.exports = router;