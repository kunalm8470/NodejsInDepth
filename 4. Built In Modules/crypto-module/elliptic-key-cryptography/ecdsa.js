// 1. Choose a curve
// ECDSA NIST P-256 (Bitcoin)
// ECDSA NIST P-384
// ECDSA NIST P-512
// ED25519 (GitHub)

// OpenSSL will help to generate the keys in this format -
// 1. PEM format
// 2. DER format (Binary format)

// Generate a private key with ECDSA NIST P-512 curve
// openssl ecparam -genkey -name secp521r1 -noout -out private-key.pem

// Extract the public key from the private key PEM file
// openssl ec -in private-key.pem -pubout -out public-key.pem

const crypto = require('crypto');
const fs = require('fs');

const privateKey = fs.readFileSync(`${__dirname}\\private-key.pem`, 'utf8');
const publicKey = fs.readFileSync(`${__dirname}\\public-key.pem`, 'utf8');

const plainText = 'Hello world!!!!';

const sign = (plainText, privateKey) => {
    // 1. Hash the plain text bytes using SHA-512 hashing algorithm
    const signer = crypto.createSign('SHA512');
    signer.write(plainText);
    signer.end();

    // 2. Encrypt the hash and generate the signature using ECDSA P-512 private key
    const privateKeyBuffer = Buffer.from(privateKey, 'utf8');
    const digitalSignatureBytes = signer.sign(privateKeyBuffer)

    // 3. Convert the digital signature bytes to string 
    const digitalSignature = digitalSignatureBytes.toString('hex');

    return digitalSignature;
};

const verify = (plainText, signature, publicKey) => {
    const verifier = crypto.createVerify('SHA512');
    verifier.write(plainText);
    verifier.end();

    const publicKeyBuffer = Buffer.from(publicKey, 'utf8');
    const isVerified = verifier.verify(publicKeyBuffer, signature, 'hex');

    return isVerified;
};

const signature = sign(plainText, privateKey);

const isVerified = verify(plainText, signature, publicKey);

debugger;