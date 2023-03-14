const process = require('process');

// Listen to the "message" event sent by the parent process
process.on('message', (msg) => {
    console.log(msg);
});

// Send messages to parent process
process.send('Message from child process');
process.send('Message2 from child process');
process.send('Message3 from child process');