const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds227664.mlab.com:27664/addressbook')
//mongoose provides the Schema which allows us to provide the structure of a document
const Schema = mongoose.Schema
//names of the properties and the types of data they will store
const personSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String
});
//essentially a function constructor
const Person = mongoose.model('Person', personSchema);
//new instances/versions of this type of object
const charles = Person({
    firstname: 'Charles',
    lastname: 'Pustejovsky',
    address: 'Georgia'
});

//save the user
charles.save(function (err) {
    if (err) throw err;

    console.log('person saved!')
});

const catherine = Person({
    firstname: 'Catherine',
    lastname: 'Pustejovsky',
    address: 'Georgia'
});

//save the user
catherine.save(function (err) {
    if (err) throw err;

    console.log('person saved!')
});

const apiController = require('./controllers/apiController');
const htmlController = require('./controllers/htmlController');

const port = process.env.PORT = 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
    console.log(`Request URL: ${req.url}`);

    //get all users
    Person.find({}, function (err, users) {
        if (err) throw err;

        //object of al the users
        console.log(users);
    });

    next();
});

htmlController(app);

    Person.find
})
