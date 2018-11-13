const http = require('http');
//to access the htm document
const fs = require('fs');

//http.createServer requires a callback function which is an event listener
http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type' : 'application/json' });
    var obj = {
        firstname: 'Charles',
        lastname: 'Pustejovsky'
    };
    res.end(JSON.stringify(obj));

}).listen(1337, '127.0.0.1');
