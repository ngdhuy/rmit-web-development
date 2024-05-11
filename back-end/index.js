const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//! Set static resource
app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

//? Pre-Proccessing APT
app.all('/api', (req, res, next) => {
    console.log(req.method + ' - Request is received!');
    next();
})

app.get('/api', (req, res) => {
    res.send('Hello World from API!');
})

app.post('/api', (req, res) => {
    console.log(req.body);
    res.send('Object is created!');
})

//------------------------------------------------------------
//! Create API to access the data from data.json file

//? Step 1: Import data file
var data = require  ('./data.json')

//? Step 2: Create API to access the all data
app.get('/products/all', (req, res) => {
    res.statusCode = 200;
    res.header('Content-Type', 'application/json');
    res.send(data);
})

//? Step 3: Create API to access the data by id
app.get('/products/:id', (req, res) => {
    var id = req.params.id;
    console.log(`ID of PRODUCT to request: ${id}`);

    var product = data.find((element) => element.id == id);

    if(product){
        res.statusCode = 200;
        res.header('Content-Type', 'application/json');
        res.send(product);
    } else {
        res.statusCode = 404;
        res.send('Product not found!');
    }
})

//? Step 4: Create API to add new object to data
app.post('/products/', (req, res) => {
    var newProduct = req.body;
    console.log(newProduct);

    var lastId = data[data.length - 1].id;
    var product = {
        id: lastId + 1,
        name: newProduct.name
    }

    data.push(product);

    res.statusCode = 200;
    res.send('Product is added!');
})

//? Step 5: Create API to update object in data
app.put('/products/:id', (req, res) => {
    var id = req.params.id;
    console.log(`ID of PRODUCT to update: ${id}`);

    var product = data.find((element) => element.id == id);

    if(product){
        product.name = req.body.name;
        res.statusCode = 200;
        res.send('Product is updated!');
    } else {
        res.statusCode = 404;
        res.send('Product not found!');
    }
})

//? Step 6: Create API to delete object from data
app.delete('/products/:id', (req, res) => {
    var id = req.params.id;
    console.log(`ID of PRODUCT to delete: ${id}`);

    var index = data.findIndex((element) => element.id == id);

    if(index != -1){
        data.splice(index, 1);
        res.statusCode = 200;
        res.send('Product is deleted!');
    } else {
        res.statusCode = 404;
        res.send('Product not found!');
    }
})

//------------------------------------------------------------
//! Define Route Handler

app.get('/about/a', (req, res) => {
    res.send('About Us');
})

app.get('/about/b', (req, res, next) => {
    console.log('Request is received!');
    next();
}, (req, res) => {
    res.send('About Us');
})

//? define multiple handler function
const func_01 = (req, res, next) => {
    console.log('Function 01');
    next();
}

const func_02 = (req, res, next) => {
    console.log('Function 02');
    next();
}

const func_03 = (req, res) => {
    console.log('Function 03');
    res.send('END');
}

app.get('/about/c', [func_01, func_02, func_03]);

//! Application ROUTE
app.route('/book')
    .get((req, res) => {
        res.send('GET: Book');
    })
    .post((req, res) => {
        res.send('POST: Book');
    })
    .put((req, res) => {
        res.send('PUT: Book');
    })
    .delete((req, res) => {
        res.send('DELETE: Book');
    })

//------------------------------------------------------------
//! Express Router
const dogRouter = require('./pkg/dog');
app.use('/dog', dogRouter);


//------------------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})