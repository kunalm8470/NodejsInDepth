const { Transform } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

class UppercaseCharTransform extends Transform {
    constructor() {
        super();
    }

    // _transform will be called multiple times
    _transform(chunk, encoding, callback) {
        const str = chunk.toString().toUpperCase();

        this.push(str);

        callback();
    }

    // Once processing is done, it will call _flush method
    _flush(callback) {
        callback();
    }
}

// Create the read stream
const readStream = createReadStream(`${__dirname}\\big_file.txt`);

// Create the write stream
const writeStream = createWriteStream(`${__dirname}\\big_file_uppercase_copy.txt`);

const upperCaseTransform = new UppercaseCharTransform();

readStream.pipe(upperCaseTransform).pipe(writeStream);
