const express = require('express');
const app = express();

const port = 3000; 

const bodyParser = require('body-parser');

const logError = require('./middleware/log-error');
const clientErrorHandler = require('./middleware/client-error-handler');
const errorHandler = require('./middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    console.log('This is the first middleware');
    try {
        fs.readFile('file-does-not-exist', (err, data) => {
            if (err) {
                next(err);
            } else {
                res.send(data);
            }
        });
    } catch {
        next(new Error('Something went wrong!'));
    }
});

app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});