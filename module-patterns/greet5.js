/*
The Revealing Module Pattern:
    Exposing only the properties and methods you want via a returned object
        A very common and clean way to structure and protect code within modules.
 */
var greeting = 'Hello, World!!!!!';

function greet() {
    console.log(greeting);
}

module.exports = {
    greet: greet
};
