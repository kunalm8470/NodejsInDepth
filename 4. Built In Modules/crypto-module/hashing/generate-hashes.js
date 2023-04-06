const crypto = require('crypto');

const plainText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu tempus risus, vel posuere erat. Curabitur risus orci, sollicitudin sed urna a, efficitur aliquam ipsum. Morbi id lectus ultrices, rhoncus lorem non, eleifend justo. Mauris eget enim ac erat pulvinar accumsan vitae in ante. Donec aliquet tincidunt pretium. Integer aliquam.`;

// WARNING: Insecure hashing algorithm, don't use in production
const md5Hash = crypto.createHash('md5')
.update(plainText) // Pass what need to be hashed
.digest('hex'); // Generate a hash in the specified encoding

console.log('Plain Text ', plainText);
console.log('MD5 hash', md5Hash);

const secretKey = 'Super secret key';

const sha256Hash = crypto.createHash('sha256', secretKey)
.update(plainText)
.digest('hex');

console.log('SHA256 hash: ', sha256Hash);

const sha384Hash = crypto.createHash('sha384', secretKey)
.update(plainText)
.digest('hex');

console.log('SHA384 hash: ', sha384Hash);

const sha512Hash = crypto.createHash('sha512', secretKey)
.update(plainText)
.digest('hex');

console.log('SHA512 hash: ', sha512Hash);

debugger;

