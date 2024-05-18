const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const mw = require('./middleware');
app.use(mw({option_1: 1, option_2: "Hello"}));

//! Error Handler
app.use((err, req, res, next) => {
    console.error('Error handller: ', err.message);
    res.status(500).send(err.message);
})

app.get('/', (req, res, next) => {
    res.send('Hello World!');
});

app.get('/', (req, res) => {
    res.send('Next ROUTE');
});

//------------------------------------------------------------

const userRouter = require('./user.router');
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});