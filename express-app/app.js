const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//using environment variables
var port = process.env.PORT = 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false});
var jsonParser = bodyParser.json();

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

//how to use, well, app.use
app.use('/', function (req, res, next) {
    console.log(`Request URL: ${req.url}`);
    next();//run the next middleware
});

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/person/:id', function (req, res) {
    res.render('person', { ID: req.params.id, Qstr: req.query.qstr });
});

app.post('/person', urlencodedParser, function (req, res) {
    res.send('Thank you!');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});

app.post('/personjson', jsonParser, function (req, res) {
    res.send('Thanks for the JSON data!');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});

app.get('/api', function (req, res) {
    res.json({ firstname: 'Charles', lastname: 'Pustejovsky' });
});

app.listen(port);
