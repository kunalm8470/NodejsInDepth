/*
    Key size -

    Fast encryption, but slightly less security - RSA 2048 bit key size
    Moderately fast encryption, but slightly less security - RSA 4096 bit key size
    Moderately slow encryption, but slightly better security - RSA 7168 bit key size
    Slowest encryption, best class security - RSA 15360 bit key size
*/

// Text file - 150 KB, encrypt with RSA 2048 - 2048 bit. (Output size)

// To generate RSA 4096 bit private key
// openssl genrsa -out private.key 4096
// openssl genrsa -out <private_key_file.key> <keysize>

// To generate RSA 4096 bit public key
// openssl rsa -in private.key -out public.key -pubout

const crypto = require('crypto');
const fs = require('fs');

const privateKey = fs.readFileSync(`${__dirname}\\private.key`, 'utf8');
const publicKey = fs.readFileSync(`${__dirname}\\public.key`, 'utf8');

const plainText = 'Hello world!!!';

// Function for encrypting a plain text
const encrypt = (plainText, privateKey) => {
    // 1. Convert the plain text into byte array (buffer)
    const plainTextBytes = Buffer.from(plainText, 'utf8');

    // 2. Convert plain text bytes into cipher text
    const cipherTextBytes = crypto.privateEncrypt(privateKey, plainTextBytes);

    // 3. Convert the buffer to a string to send across Internet
    const cipherText = cipherTextBytes.toString('base64');

    return cipherText;
};

const decrypt = (cipherText, publicKey) => {
    // 1. Convert the cipher text from Base64 to byte array (buffer)
    const cipherTextBytes = Buffer.from(cipherText, 'base64');

    // 2. Convert the cipher text bytes into plain text bytes
    const plainTextBytes = crypto.publicDecrypt(publicKey, cipherTextBytes);

    // 3. Get the original string from the plain text bytes
    const decryptedText = plainTextBytes.toString('utf8');

    return decryptedText;
};


// Encrypt the plain text
const cipherText = encrypt(plainText, privateKey);

// Decrypt the cipher text
const decryptedText = decrypt(cipherText, publicKey);

debugger;