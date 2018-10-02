//PATTERN #3: Function constructor

function Greetr() {
    this.greeting = 'Hello, World! Yet Again!';
    this.greet = function () {
        console.log(this.greeting);
    }
}

/*this is only run once and the results are then cached and that's what is returned;
any subsequent require calls across JS files will reference what is returned;
this allows programmers to create a single object that can be used and referenced in different
ways.
*/
module.exports = new Greetr();
