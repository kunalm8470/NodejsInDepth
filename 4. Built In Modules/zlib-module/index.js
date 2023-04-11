const { createReadStream, createWriteStream } = require('fs');
const { createGzip, createGunzip } = require('zlib');

// 1. To compress a file, we will create a read stream, pipe the gzip stream and finally write it.
const inputReadStream = createReadStream(`${__dirname}\\large_video.mp4`);
const outputWriteStream = createWriteStream(`${__dirname}\\large_video.mp4.gz`);

inputReadStream.pipe(createGzip()).pipe(outputWriteStream);

// 2. To decompress a file, we will create a read stream, pipe the gunzip stream and finally write it.
const zippedReadStream = createReadStream(`${__dirname}\\large_video.mp4.gz`);
const zippedWriteStream = createWriteStream(`${__dirname}\\large_video-copy.mp4`);

zippedReadStream.pipe(createGunzip()).pipe(zippedWriteStream);
