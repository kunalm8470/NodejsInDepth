const { randomInt } = require('crypto');

// [1, 11)
const min = 100000;
const max = 999999;

randomInt(min, max, (err, randomNumber) => {
    if (err) {
        console.error('Random number generation failed ', err);
        return false;
    }

    console.log('Random number', randomNumber);
});

try {
    const randomNums = [];

    for (let i = 0; i < 100; i++) {
        randomNums.push(randomInt(min, max));
    }

    debugger;
} catch (err) {
    console.error('Random number generation failed ', err);
}
