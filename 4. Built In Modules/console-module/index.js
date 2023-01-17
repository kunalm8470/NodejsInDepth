const console = require('console');

/*
    Will print a message and a newline
    after the message to the stdout
*/
console.log('Hello world');

/*
    Will be logged in the stderr
    a new line will be added after the message
*/
console.error('Message in stderr');

const obj = {
    name: 'John Doe',
    address: [
        {
            city: 'Pointe-à-Pitre',
            state: 'Guadeloupe',
            country: 'Guadeloupe',
            pin: '97171 CEDEX'
        },
        {
            city: 'Vyritsa',
            state: null,
            country: 'Russia',
            pin: '188382'
        }
    ]
};

/*
    To inspect the properties of an object
    we can use console.dir
*/
console.dir(obj, {
    showHidden: true, // Show non enumerable properties also
    depth: null, // null for infinite depth, and specific number for specific depth
    colors: true
});

/*
    To calculate approxiate time elapsed (milliseconds) we can use
    console.time and console.timeEnd

    You can give some optional label to mark the boundary of
    console.time and console.timeEnd
*/

console.time('Start');

for (let i = 0; i < 1000000; i++) {
    ;
}

console.timeEnd('Start');

/*
    console.trace is used to print the stacktrace
    of the method
*/

function d() {
    console.trace();
    return 43;
}

function c() {
    return d();
}

function b() {
    return c();
}

function a() {
    return b();
}

a();