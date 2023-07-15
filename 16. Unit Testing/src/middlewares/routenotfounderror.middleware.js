const { StatusCodes } = require('http-status-codes');

const RouteNotFoundErrorMiddleware = (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Path not found',
        detail: `Path not found: ${req.originalUrl}`
    });
};

module.exports = RouteNotFoundErrorMiddleware;
