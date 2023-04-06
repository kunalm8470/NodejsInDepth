const bcrypt = require('bcrypt');

const generateSalt = async () => {
    // Salt rounds specified as 15 to generate a strong salt
    const saltRounds = 15;
    
    return await bcrypt.genSalt(saltRounds);
};

// Use cases: To store password/CVV/Card Number in database
const generateHash = async (plainText) => {
    const salt = await generateSalt();

    // Hash the plain text using Bcrypt
    const hash = await bcrypt.hash(plainText, salt);

    return {
        hash,
        salt
    };
};

const verifyHash = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
};

(async () => {

    try {
        const plainText = "Hello world";

        const { hash, salt } = await generateHash(plainText);

        const isHashVerified = await verifyHash(plainText, hash);

        debugger;
    } catch (err) {
        console.error('Hash/Verify hash failed', err.message);

        return false;
    }
})();
