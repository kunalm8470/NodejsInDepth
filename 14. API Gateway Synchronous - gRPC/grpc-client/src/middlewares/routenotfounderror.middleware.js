const { RouteNotFoundError } = require('../errors');

const RouteNotFoundErrorMiddleware = (req, res, next) => {
    return next(new RouteNotFoundError(`Path not found: ${req.originalUrl}`));
};

module.exports = RouteNotFoundErrorMiddleware;
