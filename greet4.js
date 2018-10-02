function Greetr() {
    this.greeting = 'Hello, World! Fourth Time is a Charm?';
    this.greet = function () {
        console.log(this.greeting);
    }
}

//pass the function constructor into exports
module.exports = Greetr;
