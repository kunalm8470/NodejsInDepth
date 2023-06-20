const UnhandledErrorMiddleware = require('./unhandlederror.middleware');
const RouteNotFoundErrorMiddleware = require('./routenotfounderror.middleware');
const ValidateRequestBodyMiddleware = require('./validaterequestbody.middleware');
const ValidateRequestRouteParameterMiddleware = require('./validaterequestrouteparameter.middleware');
const AuthenticateJWTMiddleware = require('./authenticatejwt.middleware');

module.exports = {
    AuthenticateJWTMiddleware,
    UnhandledErrorMiddleware,
    RouteNotFoundErrorMiddleware,
    ValidateRequestBodyMiddleware,
    ValidateRequestRouteParameterMiddleware
};
