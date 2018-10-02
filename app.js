var greet = require('./greet1');
greet();

//var greet2 = require('./greet2');
// you could run `greet2.greet();`
//instead, the better practice is:

var greet2 = require('./greet2').greet;
greet2();


var greet3 = require('./greet3');
greet3.greet();
greet3.greeting = 'Changed hello, world!';

//because they are both pointing at an object, it will be passed by reference and not by value
var greet3b = require('./greet3');
greet3b.greet();

var Greet4 = require('./greet4');
//can create new greeters that will be different objects from one another
var grtr = new Greet4();
grtr.greet();

