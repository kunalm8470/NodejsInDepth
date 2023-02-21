const { EventEmitter } = require('events');
const fs = require('fs');

const testEmitter = new EventEmitter();

/*
    To listen on any event we use EventEmitter.on
*/
testEmitter.on('test', function(a, b, c) {
    console.log('Test event emitted with args ', a, b, c);
});

// To fire/emit the event we EventEmitter.emit
testEmitter.emit('test', 1, 'a', 3.14);
testEmitter.emit('test', 1.2, 'ab', 6.28);

/*
    You can listen to this event only once
    using EventEmitter.once
*/
testEmitter.once('one-time-event', function(a) {
    console.log('One time event called', a);
});

testEmitter.emit('one-time-event', 1);
testEmitter.emit('one-time-event', 2);
testEmitter.emit('one-time-event', 3);

testEmitter.addListener('test2', function(arg) {
    console.log('Test2 event was called with args', arg);
});

testEmitter.emit('test2', 1);
testEmitter.emit('test2', 2);
testEmitter.emit('test2', 3);

/* 
    * We can unsubscribe to the event by 
    * using EventEmitter.removeListener or EventEmitter.off
*/
testEmitter.removeListener('test2', function() {
    console.log('Removing listener for test2 event');
});

testEmitter.off('test', function() {
    console.log('Removing listener for test event');
});

// SetMaxListeners methos will help to set the number of active listeners
testEmitter.setMaxListeners(3);

// Example: Make a countdown function and emitting events from that

testEmitter.on('update-time', function(t) {
    console.log('update-time was called with ', t);
});

testEmitter.on('update-time-end', function(t) {
    console.log('update-time was called with ', t);
});

const stopwatch = (countdownTime) => {
    let currentCountDownTime = 0;

    const timerId = setInterval(() => {
        if (currentCountDownTime === countdownTime) {
            testEmitter.emit('update-time-end', new Date());    
            clearInterval(timerId);
        }

        testEmitter.emit('update-time', new Date());

        currentCountDownTime++;
    }, 1000);
};

stopwatch(4);


const writer = fs.createWriteStream(`${__dirname}\\events.txt`);

for (let i = 0; i < 100; i++) {
    writer.write(`Current Number ${i}\r\n`);
}

writer.on('finish', function() {
    console.log('Writer has finished writing to the file');
});

writer.end('Finishing writing');