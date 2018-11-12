const fs = require('fs');
const zlib = require('zlib');

var readable = fs.createReadStream(__dirname + '/greet.txt');

var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

var compressed = fs.createWriteStream(__dirname + '/greet.txt.gz');

var gzip = zlib.createGzip();

readable.pipe(writable);
//goes from stream to stream to stream, i.e. chaining
//METHOD CHAINING
//A method returns an object so we can keep calling more methods.
//Sometimes it returns the parent object (called 'cascading') and sometimes it returns some other object.
readable.pipe(gzip).pipe(compressed);
