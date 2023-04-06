const crypto = require('crypto');

const plainText = "Hello world";
const secret = "Some long secret";
const salt = "some super long salt"; // For adding randomness so that attack cannot reverse engineer and guess it

const iterations = 100000;
const keyLength = 64;
const hashingAlgorithm = 'sha512';

// Password based key derivation function 2
crypto.pbkdf2(plainText, salt, iterations, keyLength, hashingAlgorithm, (err, hashedBuffer) => {
    if (err) {
        console.error('Failed to hash using pbkdf2: ', err.message);
        return false;
    }

    console.log('Hash using pbkdf2: ', hashedBuffer.toString('hex'));
});