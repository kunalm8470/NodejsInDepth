const { createReadStream } = require('fs');

// Create the read stream
const readStream = createReadStream(`${__dirname}\\large_video.mp4`);

// "data" will signal that more data is there
// and this event handler will repeatedly get fired
readStream.on('data', (chunk) => {
    console.log('Chunk length: ', chunk.length);
    console.log('Chunk: ', chunk);
});

// "end" will signal that file reading is complete
readStream.on('end', () => {
    console.log('Done reading the file!');
});

readStream.on('error', (error) => {
    console.error('Some error happened, while reading the file: ', error);
});
