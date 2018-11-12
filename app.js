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
