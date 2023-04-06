const fs = require('fs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');

const privateKey = fs.readFileSync(`${__dirname}\\private-key.pem`, 'utf8');
const publicKey = fs.readFileSync(`${__dirname}\\public-key.pem`, 'utf8');

const generateToken = () => {
    const claims = {
        sub: randomUUID(),
        exp: Math.floor(Date.now() / 1000) + 86400,
        jti: randomUUID()
    };

    // 1. Hash the claims using SHA-512
    // 2. Encrypt the hash digest using ECDSA NIST P-512
    const token = jwt.sign(claims, privateKey, {
        algorithm: 'ES512'
    });

    return token;
};

const verifyToken = (token) => {
    try {
        const decodedClaims = jwt.verify(token, publicKey, {
            complete: true // Will output header.payload.signature
        });

        return decodedClaims;
    } catch (err) {
        console.error('JWT verification failed: ', err.message);
    }
};

const token = generateToken();

const decodedClaims = verifyToken(token);

debugger;