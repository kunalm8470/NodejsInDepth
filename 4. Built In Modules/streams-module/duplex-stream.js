const { Duplex } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

class DelayStream extends Duplex {
    constructor(ms) {
        super();

        this.delay = ms;
    }

    _read() {

    }

    _write(chunk, encoding, callback) {
        // Pushing the value into write stream
        this.push(chunk);

        console.log(`Waiting for ${this.delay}`);

        setTimeout(callback, this.delay);
    }

    _final() {
        // Indicate there is no more data to write
        this.push(null);
    }
}

// Create the read stream
const readStream = createReadStream(`${__dirname}\\big_file.txt`);

// Create the write stream
const writeStream = createWriteStream(`${__dirname}\\big_file_copy.txt`);

const delayDuplexStream = new DelayStream(100);

readStream.pipe(delayDuplexStream).pipe(writeStream);