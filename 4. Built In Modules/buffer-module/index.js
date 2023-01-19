const { Buffer } = require('buffer');

/*
    Buffers are nothing but byte arrays

    When we allocate a buffer, we allocate a new byte array
*/
const size = 10;

// To create a raw buffer
let buffer1 = Buffer.alloc(size);

// To create a buffer from an existing buffer
const buffer2 = Buffer.from(buffer1);

// To create a buffer from an existing string
// knowing the encoding
const buffer3 = Buffer.from('Hello world', { encoding: 'utf-8' });

/*
    To get how many items are there in the buffer
    we can use the length property
*/
console.log(buffer3.length);

/*
    To get how many bytes are allocated in the buffer
    we can use the byteLength property
*/
console.log(buffer3.byteLength);

/*
    To check encoding of a buffer created from string
    we use Buffer.isEncoding
*/
const isUtf8Encoding = Buffer.isEncoding(buffer3, 'utf-8');

/*
    To whether an object is an instance of Buffer
    use Buffer.isBuffer, it will return a boolean value true/false
*/

const obj1 = null;
const obj2 = undefined;
const obj3 = {};

const isBuffer1 = Buffer.isBuffer(obj1);
const isBuffer2 = Buffer.isBuffer(obj2);
const isBuffer3 = Buffer.isBuffer(obj3);
const isBuffer4 = Buffer.isBuffer(buffer3);

/*
    To fill the buffer with a specified value
    we will use Buffer.fill method
*/
const valueToFill = 4;

const startFillIndex = 0;
const endFillIndex = 4;

// [0, 4)
buffer1.fill(valueToFill, startFillIndex, endFillIndex + 1);

/*
    To access a buffer item randomly
    use the indexing operator []
*/
const randomlyAccessedValue = buffer1[4];


/*
    To concat multiple buffers without mutating
    existing buffers, we will use Buffer.concat
*/
const concatanetedBuffer = Buffer.concat([ buffer1, buffer3 ]);

/*
    If we want to copy a buffer between start and end index
    range, we will use Buffer.copy
*/
const targetStart = 5;
const sourceStart = 0;
const sourceEnd = 5;

buffer3.copy(buffer1, targetStart, sourceStart, sourceEnd);

/*
    To over write contents of one buffer
    we use buffer.write
*/
const updatedString = 'Kunal';
const startPosition = 6;
const length = 5;
const updatedStringEncoding = 'utf-8';

buffer3.write(updatedString, startPosition, length, updatedStringEncoding);

// To print a string representation of the buffer
const updatedStringBuffer = buffer3.toString('utf-8');

// To get a JavaScript object representation of the buffer
// we use buffer.toJSON()

const bufferAsAJavaScriptObject = buffer3.toJSON();
