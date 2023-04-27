const { Readable } = require('stream');
const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');

const app = express();

const storageConnectionString = 'DefaultEndpointsProtocol=https;AccountName=<yourstorageaccountname>;AccountKey=<youraccountkey>;EndpointSuffix=core.windows.net';
const containerName = '<yourcontainername>';

const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

const whitelistedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/bmp'
];

const upload = multer({
    // Define the size of the file
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },

    // Define what type of file should be allowed
    fileFilter: (req, file, callback) => {
        const whitelistedMimeTypesRegex = new RegExp(whitelistedMimeTypes.join('|'));

        // Check the mime type of the incoming file
        if (!whitelistedMimeTypesRegex.test(file.mimetype)) {
            const lf = new Intl.ListFormat('en');

            const errorMessage = `Only file having ${lf.format(whitelistedMimeTypes)} mime types are allowed`;

            const invalidFileTypeError = new multer.MulterError();

            invalidFileTypeError.code = 'INVALID_FILE_FORMAT';

            invalidFileTypeError.field = file.fieldname;

            invalidFileTypeError.message = errorMessage;

            return callback(invalidFileTypeError, false);
        }

        // Validation passed, so upload the file
        return callback(null, true);
    }
});

app.post('/images', upload.single('image'), async (req, res, next) => {
    try {
        const filename = req.file.originalname;

        const fileStream = Readable.from(req.file.buffer);

        const blobClient = containerClient.getBlockBlobClient(filename);

        await blobClient.uploadStream(fileStream);

        return res.status(201).json({
           message: 'File uploaded successfully',
           url: blobClient.url
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({
            message: 'A file upload error has occured, please try again later.',
            code: err.code,
            detail: err.message
        });
    } else {
        return res.status(500).json({
            message: 'An error has occured, please try again later.'
        });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port number: ${port}`);
});
