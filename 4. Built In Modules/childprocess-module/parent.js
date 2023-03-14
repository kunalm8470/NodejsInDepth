const { fork } = require('child_process');

// 4. To generate a child process using fork function
const child = fork(`${__dirname}/child.js`);

// Send some data to child process
child.send('Message from parent process');
child.send('Message2 from parent process');
child.send('Message3 from parent process');

// Listen to "message" event on the child process
child.on('message', (msg) => {
    console.log(msg);
});