const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('express-jwt');

const config = require('../config');
const { RouteNotFoundError, JwtExpiredError, InsufficientPermissionError, PermissionNotFoundError } = require('../errors');

const UnhandledErrorMiddleware = (err, req, res, next) => {
    let errorMessage = err.message;
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    if (err instanceof RouteNotFoundError) {
        statusCode = StatusCodes.NOT_FOUND;
        errorMessage = err.message;
    }

    else if (err instanceof JwtExpiredError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        errorMessage = err.message;
    }

    else if (err instanceof UnauthorizedError) {
        statusCode = StatusCodes.UNAUTHORIZED;

        errorMessage = err.message;

        if (err.code === 'invalid_token') {
            errorMessage = `Couldn't verify the token because: ${err.message}`;
        }
    }

    else if (err instanceof InsufficientPermissionError || err instanceof PermissionNotFoundError) {
        statusCode = StatusCodes.FORBIDDEN;
        errorMessage = err.message;
    }

    const errorResponse = {
        message: errorMessage,
        detailed: config.environment === 'development' ? err: undefined,
        stack: config.environment === 'development' ? err.stack : undefined
    };

    return res.status(statusCode).json(errorResponse);
};

module.exports = UnhandledErrorMiddleware;
