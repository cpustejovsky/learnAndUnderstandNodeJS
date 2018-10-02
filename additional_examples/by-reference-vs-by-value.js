//Run this to see the difference;

var a = 3;

var b = a;

var c;

console.log('a: ' + a);
console.log('b: ' + b);
console.log('c (should be undefined): ' + c);


function testy(variable) {
    c = variable;
    return c;
};
testy(a);
console.log('c after a is passed as a parameter for a function that set c = parameter and then returned c: '+ c);

var a = 5;
console.log("a is now 5 and we'll be logging the values of a, b, and c again;");
console.log('a: ' + a);
console.log('b: ' + b);
console.log('c: ' + c);
