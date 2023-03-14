const { exec, execFile, spawn } = require('child_process');
const process = require('process');

const execOptions = {
    cwd: process.cwd(),
    env: null, // Environment variables need to pass to child process
    encoding: 'utf8', // Result of the child process' execution
    timeout: 0, // Time out for child process execution in seconds
    maxBuffer: 200 * 1024, // Buffer size used to hold the response generated from child process (this in bytes),
    //killSignal: 'SIGTERM'
};

// 1. Generate a child process using exec function
exec('dir', execOptions, (error, stdout, stderr) => {
    if (error) {
        console.error('Invalid command', error);
        return false;
    }

    if (stderr) {
        console.error('The command was valid, but the parameters were incorrect', stderr);
        return false;
    }

    console.log('Output of exec', stdout);
});

// 2. Generate a child process using execFile function
execFile(`${__dirname}\\test.bat`, (err, stdout, stderr) => {
    if (err) {
        console.error('Invalid command', err);
        return false;
    }

    if (stderr) {
        console.error('The command was valid, but the parameters were incorrect', stderr);
        return false;
    }

    console.log('Output of execFile', stdout);
});

execFile(`Notepad.exe`, (err, stdout, stderr) => {
    if (err) {
        console.error('Invalid command', err);
        return false;
    }

    if (stderr) {
        console.error('The command was valid, but the parameters were incorrect', stderr);
        return false;
    }

    console.log('Output of execFile', stdout);
});

// 3. Generate a child process using "spawn"

const spawnOptions = {
    cwd: __dirname, // Run the child process from the current working directory
    env: null, // Pass some environment variables to child process
    detached: true // By default detached is false, detached means child process will keep on executing even after parent process has died
};

const sp = spawn('node', ['test.js'], spawnOptions);

sp.stdout.on('data', stdout => {
    console.log('Output of spawn command', stdout.toString());
});

sp.stderr.on('data', stderr => {
    console.error('Error has happened while executing the child process using spawn function', stderr.toString());
});

// Control will come always to the close event
sp.on('close', (code) => {
    console.log('Code: ', code);
});

// Generate a process you want to kill
const k = spawn('Notepad.exe');

// You can a child process using kill function
setTimeout(() => {
    k.kill('SIGTERM');
}, 2000);
