const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})