const express = require('express');
const app = express();

//using environment variables
var port = process.env.PORT = 3000;

app.use('/assets', express.static(__dirname + '/public'));

//how to use, well, app.use
app.use('/', function (req, res, next) {
    console.log(`Request URL: ${req.url}`);
    next();//run the next middleware
})

app.get('/', function (req, res) {
    res.send(`<html><head><link rel="stylesheet" href="assets/style.css"></head><body><h1>This is the home page!</h1></body></html>`);
});

app.get('/person/:id', function (req, res) {
    res.send(`<html><head></head><body><h1><strong>Person: </strong>${req.params.id}</h1></body></html>`);
});

app.get('/api', function (req, res) {
    res.json({ firstname: 'Charles', lastname: 'Pustejovsky' });
})

app.listen(port);
