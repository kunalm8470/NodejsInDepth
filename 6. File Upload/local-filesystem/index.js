const fs = require('fs');
const express = require('express');
const multer = require('multer');

const app = express();

const uploadDirectory = `${__dirname}/images`;

// Check if directory exists
if (!fs.existsSync(uploadDirectory)) {
  // If it doesn't exist, create it synchronously
  fs.mkdirSync(uploadDirectory);
}

const fileStorageEngine = multer.diskStorage({
    // Configure upload directory
    destination: (req, file, callback) => {
        return callback(null, uploadDirectory);
    },
    // Configure the name of the uploaded file
    filename: (req, file, callback) => {
        const fileName = Date.now() + '--' + file.originalname;

        return callback(null, fileName);
    }
});

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

    // Define the storage
    storage: fileStorageEngine,
    
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

app.post('/singleFile', upload.single('image'), (req, res, next) => {
    console.log(req.file);

    return res.status(201).json({
        message: 'File has been created!'
    });
});

app.post('/multipleFiles', upload.array('images', 3), (req, res, next) => {
    console.log(req.files);

    return res.status(201).json({
        message: 'Files have been created!'
    });
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
    console.log(`Server is listening on port: ${port}`);
});
