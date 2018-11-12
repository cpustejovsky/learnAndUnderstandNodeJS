var fs = require('fs');

var greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);

var greet2 = fs.readFile(__dirname + '/greet.txt',
    //popular pattern in NodeJS called "Error-First Callbacks"
    //all that means is that callbacks take an error object as their first paramter
    //null if no error; otherwise, it will contain an object defining the error.
    //This is a standard so we know in what order to place our parameter for our callbacks.
    function(err, data) {

    };

