const { randomUUID } = require('crypto');

try {
    const randomUUIDArr = [];

    for (let i = 0; i < 100; i++) {
        randomUUIDArr.push(randomUUID());
    }

    debugger;
} catch (err) {
    console.error('Error generating random UUID: ', err);
}
