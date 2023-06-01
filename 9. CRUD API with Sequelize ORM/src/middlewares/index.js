const UnhandledErrorMiddleware = require('./unhandlederror.middleware');
const RouteNotFoundErrorMiddleware = require('./routenotfounderror.middleware');
const ValidateRequestBodyMiddleware = require('./validaterequestbody.middleware');
const ValidateRequestRouteParameterMiddleware = require('./validaterequestrouteparameter.middleware');

module.exports = {
    UnhandledErrorMiddleware,
    RouteNotFoundErrorMiddleware,
    ValidateRequestBodyMiddleware,
    ValidateRequestRouteParameterMiddleware
};
