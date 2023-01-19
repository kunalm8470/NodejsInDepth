/*
    If we want to do a one time action
    after a certain delay.

    We will use setTimeout

    and setTimeout is run in the first phase/step of event loop
*/
const delay = 5000;

const greet = (firstName, lastName) => {
    console.log(`Hello ${firstName} ${lastName}.`);
};

const timerId = setTimeout(greet, delay, 'John', 'Doe');

/*
    Passing timerId to clearTimeout
    will cancel the callback function
*/
// clearTimeout(timerId);

/*
    If we want to schedule a callback function
    repeatedly after a certain delay, we will use
    setInterval
*/

const delay2 = 1000;

let timerId2;

timerId2 = setInterval(() => {
    console.log('Called repeatedly', new Date());
}, delay2);

/*
    To cancel execution of repeated callback execution
    we will use clearInterval
*/
// clearInterval(timerId2);

/*
    If we want to schedule a callback function
    without waiting for the next phase of Event loop 
    to complete and schedule the callback function in between

    Then we can use setImmediate
*/
const immediateObj = setImmediate(() => {
    console.log('From setImmediate');
});

/*
    Store the value of setImmediate
    and we can cancel it from running in the
    event loop
*/
// clearImmediate(immediateObj);