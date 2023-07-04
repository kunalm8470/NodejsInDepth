const { StatusCodes } = require('http-status-codes');
const { RouteNotFoundError } = require('../errors');

const UnhandledErrorMiddleware = (err, req, res, next) => {
    let errorMessage = err.message;
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    if (err instanceof RouteNotFoundError) {
        statusCode = StatusCodes.NOT_FOUND;
        errorMessage = err.message;
    }

    const errorResponse = {
        message: errorMessage,
        stack: err.stack
    };

    return res.status(statusCode).json(errorResponse);
};

module.exports = UnhandledErrorMiddleware;
