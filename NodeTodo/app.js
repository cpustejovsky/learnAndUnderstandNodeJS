const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes/routes');
const port = process.env.PORT = 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true });

routes(app);

app.listen(port, () => {
    console.log('Running on port 3000. Hello, world!')
});

//TODO: add a front-end to this
//TODO: add authentication
