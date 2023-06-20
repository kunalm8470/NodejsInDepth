const Ajv = require('ajv');
const { StatusCodes } = require('http-status-codes');

const {
    UserNotFoundError,
    DuplicateUserEmailError,
    DuplicateUserUsernameError,
    PasswordNotMatchingError,
    RefreshTokenNotFoundError,
    RefreshTokenExpiredError,
    RefreshTokenRevokedError
} = require('../errors');

const config = require('../config');

const UnhandledErrorMiddleware = (err, req, res, next) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let type = 'Server error';
    let message = 'An error has occured, please try again later.';
    let details;
    
    if (err instanceof UserNotFoundError) {
        statusCode = StatusCodes.NOT_FOUND;
        type = 'Resource not found error';
        message = err.message || 'User not found.';
    }

    else if (err instanceof DuplicateUserEmailError) {
        statusCode = StatusCodes.CONFLICT;
        type = 'Conflicting entry found';
        message = err.message || 'User with same email already exists.'; 
    }

    else if (err instanceof DuplicateUserUsernameError) {
        statusCode = StatusCodes.CONFLICT;
        type = 'Conflicting entry found';
        message = err.message || 'User with same username already exists.'; 
    }

    else if (err instanceof PasswordNotMatchingError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        type = 'Authentication error';
        message = 'Invalid username/password.';
    }

    else if (err instanceof RefreshTokenNotFoundError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        type = 'Resource not found error';
        message = err.message || 'Refresh token not found.';
    }

    else if (err instanceof RefreshTokenExpiredError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        type = 'Authentication error';
        message = err.message || 'Refresh token has expired.';
    }

    else if (err instanceof RefreshTokenRevokedError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        type = 'Authentication error';
        message = err.message || 'Refresh token has already been revoked.';
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
