const { randomBytes } = require('crypto');

const bytesLength = 64;

/*
    bytesLength cannot be more than
    2**31 - 1 bytes
*/
randomBytes(bytesLength, (err, buf) => {
    if (err) {
        console.error('Error in generating random byte array: ', err);
        return false;
    }

    console.log('Random bytes in hex format: ', buf.toString('hex'));

    debugger;
});