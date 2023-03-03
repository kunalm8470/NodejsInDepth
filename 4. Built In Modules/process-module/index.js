const process = require('process');

// To know the process id of a process we use process.pid
console.log('Process id', process.pid);

// We can access the standard input, output and error of a process using the below properties
/*
    process.stdout.write('Writing to process standard output');
    process.stdin;
    process.stderr;
*/

// To read the arguments passed to a process use process.argv
for (const arg of process.argv.slice(2)) {
    console.log('Arg ', arg);
}

// We can read environment variables scoped to a process using process.env.TESTENV
console.log(process.env.TESTENV);

// To get the absolute path of the current executing script we use process.execPath
console.log(process.execPath);

// To get the arguments passed to the current executing script we use process.execArgv
console.log(process.execArgv);

// To get the current architecture of the processor where Node.js is installed on we use process.arch
console.log(process.arch);

// To get the configuration used to compile Node.js executable we use process.config
console.log(JSON.stringify(process.config, null, 4));

/*
    To get the current OS where Node.js is installed on we use process.platform

        win32 is Windows OS
        darwin is macOS
        linux is linux flavoured OS
*/
console.log(process.platform);

// To get the current process title we use process.title
console.log(process.title);

// To know the installed Node.js version we use process.version
console.log(process.version);

let i = false;

if (i) {
    // If you don't want execution to continue because of bad condition
    // process.abort();

    //process.exit(0); // 0 code is for successful exiting of the process
}

/*
    To kill the process via the process id we use process.kill
    
    its same as the unix command kill -9 <pid>
*/
// process.kill(process.pid);

// To get the directory of current running process we use process.getCwd()
console.log(process.cwd());

// To get the amount of memory consumed by current process we use process.memoryUsage()
console.log(JSON.stringify(process.memoryUsage(), null, 4));

// To run a function in the between the next event loop phase we use process.nextTick
process.nextTick(() => {
    console.log('This code will be run in between the Node.js event loop phases');
});

// To get the duration from which point the process is up we use process.uptime()
console.log(process.uptime());

/*
    To get a high resolution timer we use process.hrtime.bigint()
*/
// Start time in nanoseconds
const start = process.hrtime.bigint();

for (let i = 0; i < 10000; i++) {
    // Do complex operation multiple times
}

// End time in nanoseconds
const end = process.hrtime.bigint();

const elapsedSecs = (end - start);

// Invalid operation: Multiply bigint with regular number
const a = 1n * 100;

// To handle unhandled exception which is synchronous in nature we use process.on('uncaughtException')
process.on('uncaughtException', (err) => {
    console.log(err);
});

// To handle unhandled exception which is aynchronous and originating from promises we use process.on('unhandledRejection')
process.on('unhandledRejection', (reason, promise) => {

});
