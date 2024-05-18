const express = require('express');
const router = express.Router();

//? Define middleware for logging time
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

//? Define middleware for logging request information
router.use('/', (req, res, next) => {
    console.log('User request: ', req.originalUrl);
    next();
}, (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});

//------------------------------------------------------------
//? Define middleware for getting path /user/:id
router.get('/:id', (req, res, next) => {
    if(req.params.id === '0'){
        next('route');
    } else {
        next();
    }
}, (req, res) => {
    res.send('Regular');
});

//? Handle route for path /user/:id which special page
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.send('special');
});


module.exports = router;