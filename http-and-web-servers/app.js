const http = require('http');
//to access the htm document
const fs = require('fs');

//http.createServer requires a callback function which is an event listener
http.createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        fs.createReadStream(__dirname + '/index.htm').pipe(res);
    }
    else if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        var obj = {
            firstname: 'Charles',
            lastname: 'Pustejovsky'
        };
        res.end(JSON.stringify(obj));
    }
    else {
        res.writeHead(404);
        res.end();
    }

}).listen(1337, '127.0.0.1');
