const crypto = require('crypto');

/*
    List of AES algorithms include -
    aes-128-gcm -> Key size 16 bytes
    aes-192-gcm -> Key size 24 bytes
    aes-256-gcm -> Key size 32 bytes
*/
const algorithm = 'aes-256-gcm';

// Each byte is 2 hex characters
// So to make 32 bytes we have to use 16 bytes in hex
const key = crypto.randomBytes(16).toString('hex');

// Initialization vector, this is used for adding randomness
const iv = crypto.randomBytes(16).toString('hex');

const encryptText = (plainText) => {
    // Create the cipher object
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    // Create byte array from plain text
    // because algorithms need byte array to work on
    const plainTextBytes = Buffer.from(plainText, 'utf-8');

    const encryptedBuff = Buffer.concat([
        cipher.update(plainTextBytes), // Convert plain text bytes to encrypted bytes
        cipher.final()
    ]);

    const authTagBytes = cipher.getAuthTag();

    const authTag = authTagBytes.toString('hex');

    const encryptedText = encryptedBuff.toString('hex');

    return {
        plainText,
        encryptedText,
        authTag
    };
};

const decryptText = (encryptedText, key, iv, authTag) => {
    // Create decipher object based on AES algorithm
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    // Set the auth tag recieved in encryption step
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    const encryptedBytes = Buffer.from(encryptedText, 'hex');

    const decryptedBytes = Buffer.concat([
        decipher.update(encryptedBytes),
        decipher.final()
    ]);

    const decryptedText = decryptedBytes.toString('utf-8');

    return {
        encryptedText,
        decryptedText
    };
};

//1. Encrypt the plain text using AES-256
const plainText = 'Hello world';

const { encryptedText, authTag } = encryptText(plainText);

// 2. Decrypt the encrypted text using AES-256
const { decryptedText } = decryptText(encryptedText, key, iv, authTag);

console.log('Plain text: ', plainText);
console.log('Encrypted text: ', encryptedText);
console.log('Decrypted text: ', decryptedText);

debugger;