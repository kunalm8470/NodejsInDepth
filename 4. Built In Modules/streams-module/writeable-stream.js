const { createReadStream, createWriteStream } = require('fs');

// Create the read stream
const readStream = createReadStream(`${__dirname}\\large_video.mp4`, {
    highWaterMark: 1000 // Whenever read operation happens, the buffer size is 1000 Bytes
});

// Create the write stream
const writeStream = createWriteStream(`${__dirname}\\large_video_copy.mp4`, {
    highWaterMark: 10000  // Whenever write operation happens, the buffer size is 10000 Bytes
});

// Data event will be fired whenever there is more data to read
readStream.on('data', (chunk) => {
    const isHighWaterMarkReached = writeStream.write(chunk);

    // By default the high-watermark is 16 KB

    if (!isHighWaterMarkReached) {
        console.log('Backpressure and pausing');

        // Pause the read stream until writeStream doesn't invoke the "drain" event
        readStream.pause();
    }
});

writeStream.on('drain', (err) => {
    if (err) {
        console.error('Drain error: ', err);
    }

    console.log('Drained');

    // Resume reading after the pause, to reduce backpressure
    readStream.resume();
});

readStream.on('end', () => {
    console.log('Done reading the file!');

    // End the write stream by signalling there is no more data to write
    writeStream.end();
});

// "close" event will be invoked when the write stream has finished processing
writeStream.on('close', () => {
    console.log('The file has been copied');
});
