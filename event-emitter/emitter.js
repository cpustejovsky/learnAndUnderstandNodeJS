//built to show how event emitters work
//similar to the NodeJS event emitter but not as robust

function Emitter() {
    this.events = {};
}
// event listener: the code that responds to an event
Emitter.prototype.on = function(type, listener) {
    //create a new property on the object, make sure that property is an array
    this.events[type] = this.events[type] || [];
    //then start adding functions into that array
    this.events[type].push(listener);
};

Emitter.prototype.emit = function (type) {
    //check to see if ____ is a property on the object
    if (this.events[type]) {
        //if it is, I loop through to see if there are any functions to execute
        this.events[type].forEach(function(listener) {
            listener();
        });
    }
};

module.exports = Emitter;


