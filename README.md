# Learn and Understand NodeJS

This is a course by Anthony Alicea that I'm taking on Udemy

As much as I love taking handwritten notes, I need to get used to doing most things with my keyboard and computer, so I'll be taking notes on this README file.

Since my two goals after this are to create:

1) An alarm clock **butler** for my raspberry pi
2) To rebuild my website with Node.JS, Express.JS, and ReactJS/GastsbyJS so I can have a knowledge of the website that we're planning on.

These files will act as solid template to create both of those.

#To-Do List
```javascript
//TODO: Read Over and Understand NodeJS Core Modules
//TODO: Look deeper into Events and the Event Emitter
```

## Conceptual Aside: Modules

* Modules: A reusable block of code whose existence does not accidentally impact other code
* JS didn't have this until ES6
* So NodeJS needed to create this

* CommonJS modules: an agreed upon standard on how code modules should be structured.

## JavaScript Aside: First-Class Functions and Function Expressions

* Everything you can with other types, you can do with functions.
* Function expression
* `var foo = function(bar){};`
* You can create functions on the fly
* Invoke == call == run (double equals used intentionally)
* Example:

```javascript
function index() {
    console.log('hi');
}

// functions are first-class
function logGreeting(fn) {
    fn();
};
logGreeting(index);

//function expression
var greetMe = function () {
    console.log('Howdy, World!');
}
greetMe();

// it's first-class
logGreeting(greetMe);

// use a function expression on the fly
logGreeting(function () {
    console.log('Howdy, yet again, world!');
});
```

## Modules

Modules not only should encapsulate the code, but also ensures that the code does not affect other code.

So you have to explicitly make the functions of modules explicitly available to the js file that is requiring that module.

`module.export =` exposes functions to the requiring file

This is why you do `var index = ...` to require a NodeJS file.

The `.js` ending is unecessary because Node.JS assumes.

Require and Export are from the NodeJS Core

## By Value vs. By Reference

Running this JavaScript code is a handy way of demonstrating the distinction:

```javascript
var a = 3;

var b = a;

var c;

console.log(b);

function testy(variable) {
    c = variable;
    return c;
};
testy(a);
console.log(c);

var a = 5;

console.log(a);
console.log(b);
console.log(c);

```

So is this [gif](https://media.giphy.com/media/xUPGcLrX5NQgooYcG4/giphy.gif), while we're at it.

## IIFEs

basically an old school JS hack to make modules without modules

## How do Node Modules Really Work?: module.exports and require

**require** is a function, that you pass a 'path' to

**module.exports** is what the require function *returns*

this works because your code is actually wrapped in a **function** that is given these things as function parameters

## More on Require

If require can't find the name in a `.js` file, it will look for a folder with that name.

So you create other `.js` files within that folder in addition to an `index.js` file.

Then inside the index file, you do something like this:

```javascript
var english = require('./english');
var spanish = require('./spanish');

module.exports = {
    english: english,
    spanish: spanish
};
```

Say this is all within the folder **greet**. You'll call it like you normally would (`var greet = require('./greet);`) and then you'll run the functions like:

```javascript
greet.english();
greet.spanish();
```

You can also add `.json` files and the `require` function will do that for us as long as you specifically require `<file>.json`. This will allow you pass in JSON as JavaScript objects.

## exports vs module.exports

```javascript
(function (exports, require, module, __filename, __dirname) {
    var greet = function() {
        console.log('Hello!');
    };
    module.exports = greet;
});

fn(module.exports, require, module, filename, dirname);

return module.exports;
```

exports is short-hand for module.exports, they are both pointing towards the same point in memory.

Why the two names then? Related to a quirk in JS about how Objects are passed within memory.

require function returns module.exports which is a separate variable from exports which receives that value.

Exports does not work for all the patterns we've seen so far.

```javascript
exports = function () {
    console.log('What Hath God Wrought?');
}

console.log(exports);
console.log(module.exports);
```
^ That code produces

```javascript
[Function]
{}
```

So exports is a function now, but module.exports is still an empty object

**So what's really happening?**
![](exports-vs-module.exports/what-is-really-happening.png)

So when the assignment operator is used on exports, it takes on that new value, leading to two different objects pointing to two different spots in memory.

So what's returned from require? module.exports, so that's a problem. And you'll get an error if you try and invoke it like normal.

So you can't change exports, but there is a way to mutate it without having this problem.

Whatya wanna do is...

```javascript
exports.greet = function () {
    console.log('What Hath God Wrought?');
}

console.log(exports);
console.log(module.exports);
```

**T.Alicea's recommendation is**

# JUST USE MODULE.EXPORTS! BE LAZY, FOR CRYING OUT LOUD!

## Requiring Native (Core) Modules

```javascript
var util = require('util');

var name = 'Tony';
var greeting = util.format('Hello, %s', name);
util.log(greeting);
```

Lots of interesting stuff that is already there. Definitely worth reading through the documentation.

## Modules and ES6

ES6 now has modules built-in.

We should see things move from node modules to ES6 modules

**For Example**
greet.js
```javascript
export function greet() {
    console.log('Hello');
}
```
app.js
```javascript
import * as greetr from 'greet';
greetr.greet();
```

## Conceptual Aside: Events

**Event:** Something that has happened in our app that we can respond to.
This is not limited to NodeJS. Found in many areas of software architecture and on many platforms.

In Node, we actually talk about two different kinds of events, but we tend to conflate the two.
On one hand you have
* **System Events** from the C++ Core (libuv): files, data from the internet, things that are !JavaScript
* **Custom Events** from the Event Emitter inside the JavasScript Core.

The Event Emitter is where we have custom events

 System Events is dealing with lower-level stuff that is closer to the metal.
 
 Very often the C++ core wraps its code in JS to make things easier.
 
### The JavaScript is faking events!!!

## So What Is Actually Going On?

We're attaching properties that are arrays of functions to an object and calling those events.
We're calling them events because it makes it easier to think about them.

## The Node Event Emitter

**Event Listener:** The code that responds to an event. In JavaScript's case, the listener will be a function.


events.js s where the Node.JS event emitter is

#### The Event Emitter relies on **magic strings**: A strong has some special meaning in our code
This is bad because it makes it easy to for a typo to cause a bug, and hard for tools to help us find it.

**how to deal with this!**

create a config.js
```javascript
module.exports = {
    events: {
        GREET: 'greet',
        FILESAVED: 'filesaved',
        FILEOPENED: 'fileopened'
    }
};
```

and add it to your code.

Many NodeJS modules are built on events.js

#JavaScript Aside:
## Object.create and Prototypes

```javascript
//how prototypes works

var person = {
    firstname: 'Name',
    lastname: 'Name',
    greet: function () {
        return "hello, " + this.firstname + ' ' + this.lastname;
    }
}

var john = Object.create(person);
john.firstname = 'John';
john.lastname = 'Doe';

var jane = Object.create(person);
jane.firstname = 'Jane';
jane.lastname = 'Smith';

var john2 = Object.create(person);
// john2.firstname = 'John';
john2.lastname = 'Doe';

var jane2 = Object.create(person);
jane2.firstname = 'Jane';
// jane2.lastname = 'Smith';

console.log(person.greet());
console.log(john.greet());
console.log(jane.greet());
console.log(john2.greet());
console.log(jane2.greet());
```

**The key concept in node is that many of the things in NodeJS have events.js down their prototype chain!!!**


#JavaScript Aside
##Node, ES6, and Template Literals

Will I need a `jsconfig.json` file with

```json
{
    "compilerOptions": {
        "target": "ES6"
    }
}
```

in it?

Anyways a template literal works like this:

```javascript
var name = 'Charles';
var hello = `Howdy, ${name}`;
console.log(hello);
```

#JavaScript Aside
##.call and .apply
```javascript
var obj = {
    name: 'Charles',
    greet: function (param1, param2) {
        console.log(`Howdy, ${this.name}! \n here is a parameter: ${param1} \n okay, now here is another: ${param2}!`);
    }
}

obj.greet("hello", "hola");
//.call allows you to change props on the object; you add parameters at the end like so
obj.greet.call({name: 'Catherine'}, "hello", "hola");
//.apply works just like .call except you add an array of the parameters
obj.greet.apply({name: 'User'}, ["hello", "hola"]);

```



#JavaScript Aside
##ES6 Classes

A new way to build objects syntactically but not under the hood which is why it is **syntatic sugar**

It's important to understand when something is syntatic sugar because it can lead to flawed assumptions about what is going on under the hood

So here's the old way:
```javascript
function Person(firstname, lastname) {

    this.firstname = firstname;
    this.lastname = lastname;

}

Person.prototype.greet = function () {
    console.log(`Hello ${this.firstname} ${this.lastname}`)
};

var john = new Person('John', 'Doe');
john.greet();

var jane = new Person('Jane', 'Doe');
jane.greet();

console.log(john.__proto__);
console.log(jane.__proto__);
console.log(john.__proto__ === jane.__proto__);
```

and here's the way using ES6 Classes:
```javascript
'use strict';

class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    
    greet(){
        console.log(`Hello ${this.firstname} ${this.lastname}`)
    }
}

var john = new Person('John', 'Doe');
john.greet();

var jane = new Person('Jane', 'Doe');
jane.greet();

console.log(john.__proto__);
console.log(jane.__proto__);
console.log(john.__proto__ === jane.__proto__);

```

**But just make sure you understand what is ACTUALLY GOING ON!**

You can see another example in `inheriting-event-emitter/app.js`

You can also use class with modules. just do something like:
```javascript
module.exports = class Foo extends EventEmitter {
    constructor() {
        super();
        this.foo = "bar";
    }

    bar(data) {
        console.log(`foobar with some data: ${ data}`);
        this.emit('bar', data);
    }
}    
```


#Asynchronous Code,libuv, the event loop, streams, and more...

##JavaScript Aside
###JavaScript is Synchronous

The V8 engine runs one process at a time just like JavaScript which executes one line of code at a time.
NodeJS is asynchronous. It can do other things at a time.

The run-time environment allow for asynchronous coding.

Like the browser or, in this case, NodeJS

##Conceptual Aside: Callbacks
A functon passed to some other function, which we assume will be invoked at some point.
The function calls back' invoking the function you give it when it is done doing its work.

##libuv, the event loop, and non-blocking asynchronous code execution

Event Emitter is an object with properties which are arrays of functions.

System Events
handled by a C library called "libuv"

Inside libuv is an event loop where libuv checks to see if the queue is empty to do something.

**Insert Picture Diagram Here**

This also allows NodeJS code to be **non-blocking**: does other things without stopping your program from running. This is made possible by Node's asynchronous nature.

##Conceptual Aside:
###Streams and Buffers
**Buffer:** A temporary holding spot for data being moved from one place to another. It is intentionally limited in size because you don't want the data to be too big.

You just want to get some data and then move it along. 

Usually this data is being moved through a...

**Stream**: A sequence of data made available over time or pieces of data that eventually combine into a whole.

It is broken into **chunks**(pieces of data that are sent through a stream)

This allows us to process data as we go instead of waiting for it all to arrive.

Example: streaming a video vs downloading a video.

Usually it works like this:

Data comes down the stream, x amt is gathered in the buffer, and then that amount is processed
and then it happens again until the stream is complete. 

**Think about when a YouTube video is buffering!!!**

##Conceptual Aside:
###Binary Data, Character Sets, and Encoding

**Binary Data**: Data stored in binary (sets of 1s and 0s);
The core of the math that computers are based on. Each one or zero is called a bit or *'binary digit'*.

0101 is 5 because: 
`0*2^3 + 1*2^2 + 0*2^1b+ 1*2^0`

This is Base 2

Computers can easily recognize binary (electricity, ticker tape, etc.)

To store data other than numbers in computers, we need ways to represent other things which leads to...

**Character Sets:**
A representation of characters and numbers
Each character gets a number. Unicode and ASCII are character sets.

AND

**Character Encoding:**
How characters are stored in binary.
The numbers of (*code points*) are converted and stored in binary.

how many bits will we use to represent a number? In UTF-8, it represents 8 bits available to it.

**Historically, JavaScript has lacked a great deal of features for character encoding.** So NodeJS and V8 expands this and allows JavaScript to handle this better.

##Buffers

```javascript
var buf = new Buffer('Hello', 'utf8');
//outputs the binary data in hexadecimal data
console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()); // Hello
//.toJSON converts the binary to a unicode character set
console.log(buf.toJSON()); // { type: 'Buffer', data: [ 72, 101, 108, 108, 111 ] }

buf.write('wo');
console.log(buf.toString());// wollo
//because the default length is set to those five characters in 'Hello', the 'wo' overrode the 'He'
```

##JavaScript Aside
###ES6 Typed Arrays

```javascript
//a byte is 8 bits; 8 bytes is 64 bits
var buffer = new ArrayBuffer(8);
//Int32, an integer stored with 32 bits; so you can store two numbers
var view = new Int32Array(buffer);
view[0] = 5;
view[1] = 15;
console.log(view);//Int32Array [ 5, 15 ]
view[2] = 45;
console.log(view);//still Int32Array [ 5, 15 ] because it only has room for those two numbers
```

##JavaScript Aside
###Callbacks
A function passed to some other function, which we assume will be invoked at some point.
The function 'calls back' by invoking the function you give it when it is done doing its work.

```javascript
function greet(callback) {
    console.log('Hello');
    var data = {
        name: 'Charles Pustejovsky'
    }
    callback(data);
}

function callbackFuntion(data) {
    console.log(`the function was invoked thanks to ${data.name}`);
}

greet(callbackFuntion);
//RESULTS
//Hello
//the function was invoked thanks to Charles Pustejovsky
```

##fs and read and write

```javascript
var fs = require('fs');

var greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);

var greet2 = fs.readFile(__dirname + '/greet.txt',  'utf8',
    //popular pattern in NodeJS called "Error-First Callbacks"
    //all that means is that callbacks take an error object as their first paramter
    //null if no error; otherwise, it will contain an object defining the error.
    //This is a standard so we know in what order to place our parameter for our callbacks.
    function(err, data) {
        console.log(data);
    });

console.log("Done");
```

##Streams

Streams **are** event emitters
streams.js requires events and util and have Stream inherit from events

Different types of streams:
* Readable: can read data coming through
* Writable: can send data to the stream, but can't read
* Duplex: can do both
* Transform: let's you change the data as it moves through the stream
* PassThrough: *"a trivial implemtnation of a Transform stream simply passes the input bytes across to the output. Its purpose is primarily for examples and testing, but there are some use cases where stream.PassThrough is useful as a building block for novel sorts of streams."*

Streams are merely an **Abstract (or Base) Class**:
    A type of contructor you never work directly with, but inherit from.
    We create new custom objects which inherit from the abstract class.
    ...Like a platonic ideal?

**NOTE:** Writable and Readable from the perspective of NodeJS!

JavaScript Example:
```javascript
var fs = require('fs');

var readable = fs.createReadStream(__dirname + '/greet.txt', {encoding: 'utf8', highWaterMark: 1024});

var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

readable.on('data', function(chunk) {
    console.log(chunk);
    writable.write(chunk);
});
```

##Pipes

Pipes are how you connect two streams by writing to one stream what is being rad from another.
In NodeJS, you pipe from a Readable stream to a Writable stream.

If the Writable stream is also Readable, you pipe to another Writable stream, allowing you to create a flow of streams.

Pipe function writes to a stream (using the event listener) and returns the destination stream.

Example:
```javascript
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
```

Both asynchronous methods and streams are performant.
You should only do otherwise for thoughtful and intentional reasons!

#HTTP and being a Web Server
##Conceptual Aside:
###TCP/IP
**Protocol:** A set of rules two sides aree on to use when communicating.
Both the client and server are programmed to understand and use that particular set of rules.
It's similar to a lingua franca.

How do the client and server identify each other? how do they transfer stuff?

**IP:** Will be the identifier for how we connect two computer systems together.

Opens a **socket**. It's the line across which information flows from one computer to another.

That information is usually structured within its own protocol (HTTP for web, FTP for files, SMTP for email, etc.)

**TCP:** (Transmission Control Protocol) How data is transferred. 

Take the information and split it and send it one piece at a time through the socket. The individual piece is called a **packet**.

NodeJS can be used for any kind of server. The heart of any server is TCP/IP.

This all looks similar to a stream because it's the same concept.

NodeJS treats packets as a stream.

##Conceptual Aside
###Addresses and Ports
**Port:** Once a computr receives a packet, how it knows what program to send it to.
When a program is set up on the OS to receive packets from a particular port, it is said that the program is 'listening' to that port.

###HTTP
A set of rules (and a format) for data being transferred on the web. stands for 'HyperTest Transfer Protocol'. 
It's a format (of various) defining data being transferred via TCP/IP.

This is how we format a message. Like formatting a specific kind of document (resume, business letter, etc.)
Example of HTTP request:
```
Connect www.google.com:443 HTTP/1.1
Host: www.google.com
Connection: keep-alive
```
 **Headers:** name values pairs that provide standards for the server and the browser
Example of HTTP response:
```
(Status)HTTP/1.1 200 OK
(Header)Content-Length: 44
(Header)Content-Type: text/html

(Body)<html><head>...</head></html>
```

The Content-Type is a **MIME type:** A standard for specifying the type of data being sent.
Standard for *Multipurpose Internet Mail Extensions*
Examples: application/json, text/html, image/jpeg

##Hello World NodeJS

```javascript
const http = require('http');

//http.createServer requires a callback function which is an event listener

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.end('What hath God wrought?\n');

}).listen(1337, '127.0.0.1');
```

##Outputting HTML and Templates

**Template:** Text designed to be the basis for final text or content after being processed.
There's usually some specific template language, so the template system knows how to replace placeholders with real values.

```javascript
const http = require('http');
//to access the htm document
const fs = require('fs');

//http.createServer requires a callback function which is an event listener
http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type' : 'text/html' });
    var html = fs.readFileSync(__dirname + '/index.htm', 'utf8');
    var message = 'Hello world...';
    html = html.replace('{Message}', message);
    res.end(html);

}).listen(1337, '127.0.0.1');
```

##Streams and Performance

Using pipes!

```javascript
const http = require('http');
//to access the htm document
const fs = require('fs');

//http.createServer requires a callback function which is an event listener
http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type' : 'text/html' });
    fs.createReadStream(__dirname + '/index.htm').pipe(res);

}).listen(1337, '127.0.0.1');
```

Since TCP/IP is a stream already, the browser is already used to this kind of thing.

##Conceptual Aside:
###APIs and Endpoints

**API (Application Programming Interface):** 
A set of tools for building a software application
On the web, APIs are usually made available via a set of URLs which accept and send only data via HTTP and TCP/IP

**Endpoint:** One url in a web API. Somtimes that endpoint does multiple things by making choices based on the HTTP
request headers.

##Outputting JSON

**Serialize:** Translating an object into a format that can be store or transferred.
JSON, CSV, XML, and other are popular.
*Deserialize* is the opposite (converting the format back into an object).

```javascript
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
```

##Routing

**Routing:** Mapping HTTP requests to content (whether the content exists on the server or not)

The above examples only output one thing for any request because it defines just one response for any request.

```javascript
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        fs.createReadStream(__dirname + '/index.htm').pipe(res);
    }
    else if (req.url === '/api') {
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
```

#NPM: the Node Package Manager
##Conceptual Aside: Packages and Package Managers
A package is just code, a collection of code that works and that you can use in your code.
It is managed and maintained by a... 
**package management system:** Software that automates installing and updating packages. Deals with version you have or need, also helps you manage...
**Dependencies:** Code that another set of code depends on to function. If you use that code in your app, it is a dependency. Your app depends on it.
##Conceptual Aside: Semantic Versioning (semver)
**Versioning:** Specifying what version of a set of code this is
so others can track is a new version has come out. This allows software like NPM to watch for new features, or to watch for 'breaking changes'.
The word 'semantic' implies that something conveys meaning.

* **MAJOR.MINOR.PATCH**
* **1.7.2 to 1.7.3**: Fixed some bugs. Your code will work fine
* **1.7.2 to 1.8.0**: Added new features. Your code will work fine
* **1.7.2 to 2.0.0**: Big changes. Your code will break (maybe).

##npm and the npm registry: Other People's Code
You can use npm to install packages that come from npmjs.com, the npm registry

##init, nodemon, and package.json

* `npm install <npm module> --save`
* --save saves a reference in package.json to the dependency being installed
* `"moment": "^2.22.2"` means update until a breaking change update
* `~2.22.2` would just mean to only update patches but neither minor nor major updates
* This is code doesn't store node_modules, just package.json
* you just need to use require to access these npm modules.

# Express
## Installing and Initial Use
* **Environment Variables:** global variables specific to the environment (server) our code is living in.
    * Different servers can have different variable settings, and we can access those values in code.
* **HTTP Method:** specifies the type of action the request wishes to make:
    * GET, POST, DELETE, and others.
    * Also called verbs.   

## Static Files and Middleware
* **Middleware:** Code that sits between two layers of software.
    * In the case of Express, sitting between the request and the response.
* **Static Files:** Files not processed by code in any way.

## Templates and Template Engines

Honestly... no use recreating [this guide](https://expressjs.com/en/guide/using-template-engines.html)

The templating language Tony uses in these lectures is [EJS](https://ejs.co/)

```
<script src="ejs.js"></script>
<script>
  let people = ['geddy', 'neil', 'alex'],
      html = ejs.render('<%= people.join(", "); %>', {people: people});
</script>
```

## Querystring and Post Parameters

`GET /?key=value&...`

##RESTful APIs and JSON
* **REST:** Representational State Transfer => We decide that HTTP verbs and URLs mean something!
* standardization FTW!!!
```javascript
app.get({'some-url/:id'});
app.post({'some-url'});
app.delete({'some-url/:id'});
```

##Structuring an App
* [Express Application Generator](http://expressjs.com/en/starter/generator.html) is one option

#JavaScript, JSON, and Databases

##Conceptual Aside: NoSQL and Documents

NOSQL: A variety of technologies that are alternatives to tables and SQL
One of those types is a *document* database and MongoDB is one of those models.
Storing JSON as records in the database.

SQL was very concerned with repeated information. Now that is less of a concern.

Bigger concern is how often we need to change software.
Adding new fields and the like. Hard for SQL databases.

But when it's like storing data as if it were JSON, then adding fields and changing structure would be easier to do on the fly or in a pinch.

We're going to sacrifice hard-drive space in order to...

##MongoDB and Mongoose
Learned by doing check out the directory

##MEAN Stack!
* **Stack:**The combination of all technologies used to build a piece of software. Your database, your server side code, your client site code, and everything else.
* the MEAN stack is an acronym
  * MongoDB
  * Express
  * AngularJS
  * NodeJS
* They are all JavaScript or JavaScript-like
* So these four technologies work together very naturally
* 

##AngularJS: Managing the Client
* Establish some things about web browsers:
  * Just like NodeJS, Browsers are written in C++
    * Also JS engines whch allow extra features
  * DOM:
    * The structre browsers use to store and manage web pages
    * 'Document Object Mode'
      * Browsers give JS engine the ability to manipulate the DOM
    * DOM does not live in the JS engine, it lives in the browser.
  * Browser:
    * Reads the HTML in the HTTP request as a string and converts it into a hierarchy called the DOM tree
    * HTML is structure in a tree-like fashion, so this works well!
    * the browser then renders the DOM, not the HTML string
    * Also executes JavaScript with its JavaScript Engine
    * **Browsers can have different expectations which makes it cumbersome to do client-side programming**
      * Made worse when things get even bigger!
      * Soooo much plumbing code (code just there to make the thing happen)
* AngularJS helps devs structure our apps and also deal with that plumbing crap
  * It's just a bunch of JavaScript code that someone else wrote.
  * Angular is a course unto itself
  * But we'll be using this to help understand the A in the MEAN stack and how javascript works on the browser vs on the server
* `../public/js/app.js` is where browser JavaScript will live
* CDNs can help with the load our server is dealing with.
* the Angular script tag loads AngularJS on the browser, not on the server
* In Tony's example, he sets it up where whatever you enter into a text-box is also displayed below. All he did was bind the HTML to an Angular controller (I think...). The point being is that this ability to manipulate the DOM is painless and easy for AngularJS, a client-side framework
  * This would be much, much more difficult for NodeJS because when you enter the text, it would have to send a request to the server and the server would have to respond with the change to the DOM.
  * 

