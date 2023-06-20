const UnhandledErrorMiddleware = require('./unhandlederror.middleware');
const RouteNotFoundErrorMiddleware = require('./routenotfounderror.middleware');
const ValidateRequestBodyMiddleware = require('./validaterequestbody.middleware');

module.exports = {
    UnhandledErrorMiddleware,
    RouteNotFoundErrorMiddleware,
    ValidateRequestBodyMiddleware
};
