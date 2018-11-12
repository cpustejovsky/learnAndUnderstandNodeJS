var util = require('util');

function Person() {
    this.firstname = 'John';
    this.lastname = 'Doe';
}

Person.prototype.greet = function () {
    console.log(`Hello, ${this.firstname} ${this.lastname}`);
}

function Policeman() {
    Person.call(this);
    this.badgenumber = '1234';
}

util.inherits(Policeman, Person);
var officer = new Policeman();
officer.greet(); // without line 13, this produces "Hello, undefined undefined"
/*
this is because util.inherits just connects the prototypes of Policeman and Person,
not the properties and methods that are directly attached to the object being created.
This is what you add Person.call(this);
*/
