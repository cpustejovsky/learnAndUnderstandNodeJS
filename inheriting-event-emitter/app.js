'use strict';

var EventEmitter = require('events');

class Greetr extends EventEmitter {
    constructor() {
        //has the same functionality as `EventEmitter.call(this);` provided you add `extends EventEmitter` after `class Greetr`
        super();
        this.greeting = 'Hello, world!';
    }
    greet(data) {
        console.log(`${ this.greeting } \nnow for the data: ${ data }`);
        this.emit('greet', data);
    }
}

var greeter1 = new Greetr();

greeter1.on('greet', function (data) {
    console.log(`a greeting occurred! \nalso some data: ${ data }`);
});

greeter1.greet("testing, testing");

    //This is the OG way of creating an object
    var util = require('util');
    function Greetr() {
        //ensures that Greetr inherits everything from EventEmitter i.e. all its properties and methods that object has.
        EventEmitter.call(this);
        this.greeting = 'Hello, world!';
    }
    // any objects created from Greetr should also have access to the methods and properties of EventEmitter
    // this line gives Greetr complete access to EventEmitter
    util.inherits(Greetr, EventEmitter);

    Greetr.prototype.greet = function () {
        console.log(this.greeting);
        this.emit('greet');
    };

    var greeter1 = new Greetr();

    greeter1.on('greet', function () {
        console.log('a greeting occurred!');
    });

    greeter1.greet();

    //Now with passing data in parameters!

    Greetr.prototype.greetWithData = function (data) {
        console.log(this.greeting);
        console.log("now for some data! " + data);
        this.emit('greet', data);
    };

    var greeter2 = new Greetr();

    greeter2.on('greet', function (data) {
        console.log('a greeting occurred!');
        console.log("now we're going to use that data passed to the event emitter " + data)
    });

    greeter2.greetWithData("testing, testing, 1,2,3");
