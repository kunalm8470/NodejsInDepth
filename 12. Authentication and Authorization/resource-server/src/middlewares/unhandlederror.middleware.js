const Ajv = require('ajv');
const { StatusCodes } = require('http-status-codes');
const { TokenExpiredError, NotBeforeError, JsonWebTokenError } = require('jsonwebtoken');

const { ArticleNotFoundError, AuthorizationHeaderNotFoundError, InsufficientPermissionsError } = require('../errors');
const config = require('../config');

const UnhandledErrorMiddleware = (err, req, res, next) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let type = 'Server error';
    let message = 'An error has occured, please try again later.';
    let details;
    
    if (err instanceof ArticleNotFoundError) {
        statusCode = StatusCodes.NOT_FOUND;
        type = 'Article not found error';
        message = err.message;
    }

    else if (err instanceof AuthorizationHeaderNotFoundError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        type = 'Authorization header not found error';
        message = err.message;
    }
    
    else if (err instanceof InsufficientPermissionsError) {
        statusCode = StatusCodes.FORBIDDEN;
        type = 'Insufficient permissions error';
        message = err.message;
    }

    else if (err instanceof TokenExpiredError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        type = `Unauthorized! Access Token was expired at ${err.expiredAt.toJSON()}`;
        message = err.message;
    }

    else if (err instanceof NotBeforeError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        type = 'JWT Token is not active';
        message = err.message; 
    }

    else if (err instanceof JsonWebTokenError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        type = 'JWT Token is malformed';
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
