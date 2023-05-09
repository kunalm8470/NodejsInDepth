const express = require('express');
const { StatusCodes } = require('http-status-codes');

const app = express();

// Parse the body to req.body
app.use(express.json());

app.use(express.urlencoded({ 
    extended: true 
}));

app.use(require('./routes'));

// Not found route
app.use('*', (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Path not found',
        detail: `Path not found: ${req.originalUrl}`
    });
});

// Unhandled exception middleware
app.use((err, req, res, next) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An error has occured',
        detail: err.message
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});