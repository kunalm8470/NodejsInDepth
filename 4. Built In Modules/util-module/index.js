const util = require('util');

/*
    If we want to do string format like
    C-language's printf function we can use util.format
*/

console.log(
    util.format('%s %s!!!', 'Hello', 'World')
);

/*
    If we don't pass positional parameters
    it will just print the %s as a literal string.
*/
console.log(
    util.format('%s.%s.%s', 'def', '3')
);

/*
    %s is the replacement for string
    and %d is the replacement of numbers
*/
console.log(
    util.format('%s.%s.%d', 'def', '3', 5)
);

/*
    Similar to console.log and console.err we have
    util.log and util.error which prints in stdout and stderr
    respectively
*/
// util.log('From util log');

// util.error('From util error');

/*
    util.isArray behaves similar to
    Array.prototype.isArray

    it will give a boolean value as response
*/
const arr1 = undefined;
const arr2 = null;
const arr3 = [1, 2, 3];
const arr4 = {};

const isArray1 = util.isArray(arr1);
const isArray2 = util.isArray(arr2);
const isArray3 = util.isArray(arr3);
const isArray4 = util.isArray(arr4);

/*
    util.isDate
    it will give a boolean value as response

    internally it checks if the passed parameter
    is instanceof Date.prototype
*/
const date1 = undefined;
const date2 = null;
const date3 = new Date();
const date4 = {};
const date5 = Date.now();

const isDate1 = util.isDate(date1);
const isDate2 = util.isDate(date2);
const isDate3 = util.isDate(date3);
const isDate4 = util.isDate(date4);
const isDate5 = util.isDate(date5); // Since number doesn't belong to Date.prototype

/*
    util.isRegExp
    it will give a boolean value as response

    internally it checks if the passed parameter
    is instanceof RegExp.prototype
*/
const regex1 = undefined;
const regex2 = null;
const regex3 = /[0-9]/; // -> Literal regex
const regex4 = {};
const regex5 = new RegExp('[0-9]'); // -> Regex constructor

const isRegex1 = util.isRegExp(regex1);
const isRegex2 = util.isRegExp(regex2);
const isRegex3 = util.isRegExp(regex3);
const isRegex4 = util.isRegExp(regex4);
const isRegex5 = util.isRegExp(regex5);

/*
    util.isError
    it will give a boolean value as response

    internally it checks if the passed parameter
    is instanceof Error.prototype
*/
const error1 = undefined;
const error2 = null;
const error3 = new Error('Test error');

const isError1 = util.isError(error1);
const isError2 = util.isError(error2);
const isError3 = util.isError(error3);

const sleep = (seconds) => {
    return new Promise((resolve, reject) => {

        // Because setTimeout is a callback
        // We wrapped it around a Promise prototype constructor
        setTimeout(() => {
            return resolve();
        }, seconds * 1000);
    });
};

/*
    util.promisify will return a promise function
    from the specified callback function
*/
const setTimeoutPromise = util.promisify(setTimeout);

(async () => {
    console.log('Sleeping for 1 second');
    await sleep(1);
    console.log('Sleeping for 1 second');
    await setTimeoutPromise(1);
})();

/*
    util.callbackify will return a callback from a
    function which returns a promise
*/
const setTimeoutCb = util.callbackify(setTimeoutPromise);

setTimeoutCb((err) => {
    return function() {
        console.log('From set timeout cb');
    };
});
