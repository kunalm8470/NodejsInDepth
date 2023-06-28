const JwtExpiredError = require('./jwt-expired-error');
const RouteNotFoundError = require('./route-not-found.error');
const PermissionNotFoundError = require('./permissions-not-found.error');
const InsufficientPermissionError = require('./insufficient-permission.error');

module.exports = {
    RouteNotFoundError,
    JwtExpiredError,
    PermissionNotFoundError,
    InsufficientPermissionError
};
