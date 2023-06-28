const UnhandledErrorMiddleware = require('./unhandlederror.middleware');
const RouteNotFoundErrorMiddleware = require('./routenotfounderror.middleware');
const Auth0ConfigurationMiddleware = require('./auth0-configuration.middleware');
const AttachUserMiddleware = require('./attach-user-object.middleware');

module.exports = {
    UnhandledErrorMiddleware,
    RouteNotFoundErrorMiddleware,
    Auth0ConfigurationMiddleware,
    AttachUserMiddleware
};
