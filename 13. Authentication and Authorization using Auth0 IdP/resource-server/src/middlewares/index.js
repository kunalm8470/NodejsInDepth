const CheckAuthenticationHeaderMiddleware = require('./check-authentication-header.middleware');
const CheckPermissionsMiddleware = require('./check-permissions.middleware');
const UnhandledErrorMiddleware = require('./unhandlederror.middleware');
const RouteNotFoundErrorMiddleware = require('./routenotfounderror.middleware');

module.exports = {
    CheckAuthenticationHeaderMiddleware,
    CheckPermissionsMiddleware,
    UnhandledErrorMiddleware,
    RouteNotFoundErrorMiddleware
};
