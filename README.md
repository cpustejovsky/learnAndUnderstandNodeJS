# Learn and Understand NodeJS

This is a course by Anthony Alicea that I'm taking on Udemy

As much as I love taking handwritten notes, I need to get used to doing most things with my keyboard and computer, so I'll be taking notes on this README file.

Since my two goals after this are to create:

1) An alarm clock butler for my raspberry pi
2) To rebuild my website with Node.JS, Express.JS, and ReactJS/GastsbyJS so I can have a knowledge of the website that we're planning on.

These files will act as solid template to create both of those.

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

**module.exports** is what the require funtion *returns*

this works because your code is actually wrapped in a function* that is given these things as function parameters

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
