const Ajv = require('ajv');
const { StatusCodes } = require('http-status-codes');
const { CourseNotFoundError, StudentNotFoundError } = require('../errors');
const config = require('../config/config');

const UnhandledErrorMiddleware = (err, req, res, next) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let type = 'Server error';
    let message = 'An error has occured, please try again later.';
    let details;
    
    if (err instanceof CourseNotFoundError) {
        statusCode = StatusCodes.NOT_FOUND;
        type = 'Resource not found error';
        message = err.message;
    }

    else if (err instanceof StudentNotFoundError) {
        statusCode = StatusCodes.NOT_FOUND;
        type = 'Resource not found error';
        message = err.message;
    }

    else if (err instanceof Ajv.ValidationError && err.errors && err.errors.length) {
        statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
        type = 'Validation error';
        message = 'Invalid request';

        details = err.errors.map((schemaError) => ({
            instancePath: schemaError.instancePath,
            params: schemaError.params,
            message: schemaError.message
        }));
    }

    const errorResponse = {
        type,
        message,
        details,
        detailed: config.environment === 'development' ? err.message: undefined,
        stack: config.environment === 'development' ? err.stack : undefined
    };

    return res.status(statusCode).json(errorResponse);
};

module.exports = UnhandledErrorMiddleware;
