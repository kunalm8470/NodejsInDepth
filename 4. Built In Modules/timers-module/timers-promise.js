const { setTimeout, setInterval, setImmediate } = require('timers/promises');

(async () => {
    console.log('Before');

    await setTimeout(5000);

    console.log('After');
})();

(async () => {
    for await(const startTime of setInterval(1000)) {
        console.log(new Date());
    }
})();

(async () => {
    const res = await setImmediate('result');

    console.log(res);  // Prints 'result'
})();
